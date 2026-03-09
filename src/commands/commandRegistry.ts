import type { CommandHandler, CommandResult, CommandContext, Config } from '../types';
import { parseCommand } from './commandParser';
import { VirtualFileSystem } from '../filesystem/virtualFileSystem';
import Fuse from 'fuse.js';
import { getGithubRepos, type GithubRepo } from '../api/github';

function resolvePublicAssetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}

export class CommandRegistry {
  private commands = new Map<string, CommandHandler>();
  private config: Config;
  private vfs: VirtualFileSystem;

  constructor(config: Config) {
    this.config = config;
    this.vfs = new VirtualFileSystem(config);
    this.registerBuiltinCommands();
  }

  register(name: string, handler: CommandHandler) {
    this.commands.set(name, handler);
  }

  getCommandNames(): string[] {
    return Array.from(this.commands.keys()).sort();
  }

  getVFS(): VirtualFileSystem {
    return this.vfs;
  }

  getConfig(): Config {
    return this.config;
  }

  async execute(input: string, context: CommandContext): Promise<CommandResult> {
    // Check for hidden commands (exact match on full input)
    const trimmedInput = input.trim();
    const hiddenMatch = this.config.hiddenCommands[trimmedInput];
    if (hiddenMatch) {
      return { output: hiddenMatch.output };
    }

    // Check for aliases
    const aliased = this.config.aliases[trimmedInput];
    if (aliased) {
      return this.execute(aliased, context);
    }

    const parsed = parseCommand(trimmedInput);
    if (!parsed) {
      return { output: [] };
    }

    // Also check aliases on the command alone
    const aliasedCmd = this.config.aliases[parsed.command];
    if (aliasedCmd) {
      return this.execute(aliasedCmd + ' ' + parsed.args.join(' '), context);
    }

    const handler = this.commands.get(parsed.command);
    if (!handler) {
      // Fuzzy match suggestion
      const suggestion = this.fuzzyMatch(parsed.command);
      const lines = [`Command not found: ${parsed.command}`];
      if (suggestion) {
        lines.push(`Did you mean: ${suggestion}?`);
      }
      lines.push(`Type 'help' for available commands.`);
      return { output: lines, isError: true };
    }

    let result = await handler(parsed.args, context);

    // Handle pipe
    if (parsed.pipe) {
      if (parsed.pipe.command === 'grep') {
        const pattern = parsed.pipe.args[0] ?? '';
        if (pattern) {
          const regex = new RegExp(pattern, 'i');
          result = {
            ...result,
            output: result.output.filter((line) => regex.test(line)),
          };
        }
      }
    }

    return result;
  }

  private fuzzyMatch(input: string): string | null {
    const commandNames = this.getCommandNames();
    const fuse = new Fuse(commandNames, {
      threshold: 0.4,
    });
    const results = fuse.search(input);
    if (results.length > 0) {
      return results[0].item;
    }
    return null;
  }

  getCompletions(partial: string): string[] {
    const names = this.getCommandNames();
    // Also include hidden command triggers (first word)
    const allNames = [
      ...names,
      ...Object.keys(this.config.hiddenCommands).map((k) => k.split(' ')[0]),
    ];
    const unique = [...new Set(allNames)];
    return unique.filter((n) => n.startsWith(partial.toLowerCase()));
  }

  private registerBuiltinCommands() {
    // ===== help =====
    this.register('help', (args, ctx) => {
      if (args.length > 0) {
        const cmd = args[0];
        const desc = ctx.config.commandDescriptions[cmd];
        if (desc) {
          return { output: ['', `  ${cmd} — ${desc}`, ''] };
        }
        return { output: [`No help available for '${cmd}'.`], isError: true };
      }
      
      const lines: string[] = [''];
      lines.push('  ╭─ Available Commands ──────────────────────╮');
      
      const categories = ctx.config.commandCategories || {};
      let isFirst = true;
      
      for (const [categoryName, commands] of Object.entries(categories)) {
        if (!isFirst) {
          lines.push('  │                                           │');
        }
        isFirst = false;
        
        lines.push(`  │  ${categoryName}:`);
        for (const cmd of commands) {
          const desc = ctx.config.commandDescriptions[cmd] ?? '';
          const short = desc.split('.')[0] || cmd;
          lines.push(`  │    ${cmd.padEnd(12)} - ${short}`);
        }
      }
      
      lines.push('  ╰────────────────────────────────────────────╯');
      lines.push('');
      lines.push('  Type "help <command>" for detailed information');
      lines.push('');
      return { output: lines };
    });

    // ===== about =====
    this.register('about', (_args, ctx) => {
      return { output: ['', ...ctx.config.user.bio, ''] };
    });

    // ===== projects =====
    this.register('projects', (args, ctx) => {
      const detail = args.includes('--detail');
      const lines: string[] = [''];
      for (const p of ctx.config.projects) {
        if (detail) {
          lines.push(`  ┌─ ${p.name} (${p.id})`);
          lines.push(`  │  ${p.description}`);
          lines.push(`  │  Stack: ${p.stack.join(', ')}`);
          if (p.demo) lines.push(`  │  Demo:  ${p.demo}`);
          const lastLine = p.repo ? `  └─ Repo:  ${p.repo}` : `  └─`;
          lines.push(lastLine);
          lines.push('');
        } else {
          lines.push(`  ${p.id.padEnd(20)} ${p.description.slice(0, 60)}`);
        }
      }
      if (!detail) {
        lines.push('');
        lines.push('  Use "open <project>" for details or "projects --detail" for full info.');
      }
      lines.push('');
      return { output: lines };
    });

    // ===== skills =====
    this.register('skills', (_args, ctx) => {
      const lines: string[] = [''];
      for (const cat of ctx.config.skills) {
        lines.push(`  ${cat.category}:`);
        const bar = cat.items.map((i) => `[${i}]`).join(' ');
        lines.push(`    ${bar}`);
        lines.push('');
      }
      return { output: lines };
    });

    // ===== experience =====
    this.register('experience', (_args, ctx) => {
      const lines: string[] = [''];
      for (const item of ctx.config.experience) {
        lines.push(`  ${item.role} — ${item.company}`);
        lines.push(`  ${item.period} | ${item.location}`);
        for (const highlight of item.highlights) {
          lines.push(`  - ${highlight}`);
        }
          lines.push('');
        }
      return { output: lines };
    });

    // ===== ls =====
    this.register('ls', (args, ctx) => {
      const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
      const targetArgs = args.filter((a) => !a.startsWith('-'));
      const path = targetArgs[0] ?? '.';
      const target = path === '.' ? ctx.cwd : path;

      if (!this.vfs.exists(target, ctx.cwd)) {
        return { output: [`ls: cannot access '${path}': No such file or directory`], isError: true };
      }
      if (!this.vfs.isDir(target, ctx.cwd)) {
        return { output: [path] };
      }

      const entries = this.vfs.listDir(target, ctx.cwd, showHidden);
      if (entries.length === 0) {
        return { output: [] };
      }

      const lines: string[] = [];
      for (const entry of entries) {
        const abs = this.vfs.resolve(
          (target === '.' ? '' : target + '/') + entry,
          ctx.cwd
        );
        const isDir = this.vfs.isDir(abs, '~');
        lines.push(isDir ? `  ${entry}/` : `  ${entry}`);
      }
      return { output: lines };
    });

    // ===== cd =====
    this.register('cd', (args, ctx) => {
      const target = args[0] ?? '~';
      if (!this.vfs.exists(target, ctx.cwd)) {
        return {
          output: [`cd: no such file or directory: ${target}`],
          isError: true,
        };
      }
      if (!this.vfs.isDir(target, ctx.cwd)) {
        return { output: [`cd: not a directory: ${target}`], isError: true };
      }
      const newPath = this.vfs.resolve(target, ctx.cwd);
      ctx.setCwd(newPath);
      return { output: [] };
    });

    // ===== cat =====
    this.register('cat', (args, ctx) => {
      if (args.length === 0) {
        return { output: ['cat: missing file operand'], isError: true };
      }
      const path = args[0];
      if (!this.vfs.exists(path, ctx.cwd)) {
        return {
          output: [`cat: ${path}: No such file or directory`],
          isError: true,
        };
      }
      if (this.vfs.isDir(path, ctx.cwd)) {
        return { output: [`cat: ${path}: Is a directory`], isError: true };
      }
      const content = this.vfs.readFile(path, ctx.cwd);
      if (!content) {
        return { output: [`cat: ${path}: Unable to read file`], isError: true };
      }
      return { output: content };
    });

    // ===== pwd =====
    this.register('pwd', (_args, ctx) => {
      const display = ctx.cwd === '~' ? '/' : '/' + ctx.cwd.slice(2);
      return { output: [display] };
    });

    // ===== open =====
    this.register('open', (args, ctx) => {
      if (args.length === 0) {
        return { output: ['Usage: open <project-id>'], isError: true };
      }
      const id = args[0].toLowerCase();
      const project = ctx.config.projects.find(
        (p) => p.id.toLowerCase() === id
      );
      if (!project) {
        const ids = ctx.config.projects.map((p) => p.id).join(', ');
        return {
          output: [
            `Project '${args[0]}' not found.`,
            `Available projects: ${ids}`,
          ],
          isError: true,
        };
      }
      const lines = [
        '',
        `  Name:        ${project.name}`,
        `  Description: ${project.description}`,
        `  Stack:       ${project.stack.join(', ')}`,
      ];
      if (project.demo) lines.push(`  Demo:        ${project.demo}`);
      if (project.repo) lines.push(`  Repo:        ${project.repo}`);
      lines.push('');
      if (project.demo) {
        lines.push(`  Use "run ${project.id}" to open the demo in your browser.`);
      }
      lines.push('');
      return { output: lines, type: 'ascii' };
    });

    // ===== run =====
    this.register('run', (args, ctx) => {
      if (args.length === 0) {
        return { output: ['Usage: run <project-id>'], isError: true };
      }
      const id = args[0].toLowerCase();
      const project = ctx.config.projects.find(
        (p) => p.id.toLowerCase() === id
      );
      if (!project) {
        return {
          output: [`Project '${args[0]}' not found.`],
          isError: true,
        };
      }
      window.open(project.demo, '_blank');
      return {
        output: [
          '',
          `  Launching ${project.name}...`,
          `  Opening ${project.demo} in a new tab.`,
          '',
        ],
      };
    });

    // ===== grep =====
    this.register('grep', (args) => {
      if (args.length === 0) {
        return {
          output: [
            'Usage: <command> | grep <pattern>',
            'Example: projects | grep react',
          ],
          isError: true,
        };
      }
      // If invoked standalone, tell user to pipe
      return {
        output: ['grep requires piped input. Example: projects | grep react'],
      };
    });

    // ===== history =====
    this.register('history', (_args, ctx) => {
      const lines = ctx.history.map(
        (cmd, i) => `  ${String(i + 1).padStart(4)}  ${cmd}`
      );
      return { output: ['', ...lines, ''] };
    });

    // ===== man =====
    this.register('man', (args, ctx) => {
      if (args.length === 0 || args[0].toLowerCase() !== 'alex') {
        return {
          output: [
            `What manual page do you want?`,
            `Try: man alex`,
          ],
          isError: true,
        };
      }
      return { output: ['', ...ctx.config.manPage, ''] };
    });

    // ===== which =====
    this.register('which', (args, ctx) => {
      if (args.length === 0) {
        return { output: ['Usage: which <name>'], isError: true };
      }
      if (args[0].toLowerCase() === 'alex') {
        return {
          output: [
            '',
            `  ${ctx.config.user.name}`,
            `  ${ctx.config.user.title}`,
            `  Found at: ${ctx.config.user.github}`,
            `  Contact:  ${ctx.config.user.email}`,
            '',
          ],
        };
      }
      if (this.commands.has(args[0])) {
        return { output: [`/usr/local/bin/${args[0]}`] };
      }
      return { output: [`${args[0]} not found`] };
    });

    // ===== download =====
    this.register('download', (args, ctx) => {
      if (args.length === 0 || args[0].toLowerCase() !== 'resume') {
        return { output: ['Usage: download resume'], isError: true };
      }
      // Trigger download
      const resumeUrl = resolvePublicAssetUrl(ctx.config.resumeUrl);
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Alex_Miller_Resume.pdf';
      link.click();
      return {
        output: [
          '',
          '  📄 Downloading resume...',
          `  File: ${resumeUrl}`,
          '',
        ],
      };
    });

    // ===== recruiter =====
    this.register('recruiter', (_args, ctx) => {
      ctx.setRecruiterMode(!ctx.recruiterMode);
      if (ctx.recruiterMode) {
        // Was turned off (toggled)
        return {
          output: [
            '',
            '  Recruiter mode disabled. Welcome back to the terminal!',
            '',
          ],
        };
      }
      return {
        output: [
          '',
          '  ╔═══════════════════════════════════════════════════╗',
          '  ║           👋 Welcome to Recruiter Mode!          ║',
          '  ╠═══════════════════════════════════════════════════╣',
          '  ║                                                   ║',
          '  ║  Here are some commands to get you started:       ║',
          '  ║                                                   ║',
          '  ║  about          - Learn about Alex                ║',
          '  ║  projects       - View portfolio projects         ║',
          '  ║  skills         - See technical skills            ║',
          '  ║  experience     - View job experience             ║',
          '  ║  download resume - Download Alex\'s resume         ║',
          '  ║  open <project> - View project details            ║',
          '  ║  recruiter      - Toggle recruiter mode off       ║',
          '  ║                                                   ║',
          '  ╚═══════════════════════════════════════════════════╝',
          '',
        ],
      };
    });

    // ===== github =====
    this.register('github', async (args) => {
      if (args.length === 0) {
        return {
          output: [
            '',
            '  Usage: github repos',
            '  Show cached GitHub repository data',
            '',
          ],
          isError: true,
        };
      }

      const subcommand = args[0].toLowerCase();

      if (subcommand === 'repos') {
        const repos = await getGithubRepos();
        const lines: string[] = ['', '  Loading cached GitHub data...', ''];

        if (repos.length === 0) {
          lines.push('  No repositories available in cache.');
          lines.push('');
          return { output: lines };
        }

        repos.forEach((repo: GithubRepo, index: number) => {
          lines.push(`  ${index + 1}. ${repo.name}`);
          if (repo.description) {
            lines.push(`     ${repo.description}`);
          }
          lines.push(`     ${repo.language ?? 'Unknown'} | ⭐ ${repo.stargazers_count} stars`);
          lines.push(`     ${repo.html_url}`);
          lines.push('');
        });

        return { output: lines };
      }

      return {
        output: [
          `Unknown github subcommand: ${args[0]}`,
          'Usage: github repos',
        ],
        isError: true,
      };
    });

    // ===== clear =====
    this.register('clear', (_args, ctx) => {
      ctx.clearLines();
      return { output: [] };
    });

    // ===== echo =====
    this.register('echo', (args) => {
      return { output: [args.join(' ')] };
    });

    // ===== whoami =====
    this.register('whoami', (_args, ctx) => {
      return { output: [ctx.config.user.username] };
    });

    // ===== date =====
    this.register('date', () => {
      return { output: [new Date().toString()] };
    });

    // ===== exit =====
    this.register('exit', () => {
      return {
        output: [
          '',
          '  Nice try. There is no escape.',
          '  But you can hire Alex instead. 😄',
          '',
        ],
      };
    });

    // ===== theme =====
    this.register('theme', (args, ctx) => {
      if (args.length === 0) {
        const themeNames = Object.keys(ctx.config.themes).join(', ');
        return {
          output: [
            '',
            `  Available themes: ${themeNames}`,
            '  Usage: theme <name>',
            '',
          ],
        };
      }
      const themeName = args[0].toLowerCase();
      const theme = ctx.config.themes[themeName];
      if (!theme) {
        const themeNames = Object.keys(ctx.config.themes).join(', ');
        return {
          output: [
            `  Theme '${args[0]}' not found.`,
            `  Available: ${themeNames}`,
          ],
          isError: true,
        };
      }
      ctx.setTheme(theme);
      return {
        output: ['', `  Theme changed to '${themeName}'.`, ''],
      };
    });
  }
}
