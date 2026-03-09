import type { CommandRegistry } from '../commands/commandRegistry';
import type { VirtualFileSystem } from '../filesystem/virtualFileSystem';

export function getCompletions(
  input: string,
  registry: CommandRegistry,
  vfs: VirtualFileSystem,
  cwd: string
): string[] {
  const trimmed = input.trimStart();

  // If no space yet, complete commands
  if (!trimmed.includes(' ')) {
    return registry.getCompletions(trimmed);
  }

  // Complete arguments based on command
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const lastArg = parts[parts.length - 1];

  // For file/path commands, complete paths
  const pathCommands = ['cd', 'ls', 'cat', 'open', 'run'];
  if (pathCommands.includes(command)) {
    if (command === 'open' || command === 'run') {
      // Complete project IDs
      const config = registry.getConfig();
      const projectIds = config.projects.map((p) => p.id);
      return projectIds.filter((id) =>
        id.toLowerCase().startsWith(lastArg.toLowerCase())
      );
    }
    return vfs.getCompletions(lastArg, cwd);
  }

  // For theme, complete theme names
  if (command === 'theme') {
    const config = registry.getConfig();
    const themeNames = Object.keys(config.themes);
    return themeNames.filter((t) =>
      t.toLowerCase().startsWith(lastArg.toLowerCase())
    );
  }

  // For help, complete command names
  if (command === 'help') {
    return registry.getCompletions(lastArg);
  }

  // For github, complete subcommands
  if (command === 'github') {
    const subcommands = ['repos'];
    return subcommands.filter((subcommand) =>
      subcommand.toLowerCase().startsWith(lastArg.toLowerCase())
    );
  }

  return [];
}

export function applyCompletion(
  input: string,
  completion: string
): string {
  const parts = input.trimStart().split(/\s+/);
  if (parts.length <= 1 && !input.includes(' ')) {
    return completion + ' ';
  }
  parts[parts.length - 1] = completion;
  return parts.join(' ') + ' ';
}
