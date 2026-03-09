import type { Config, FSNode } from '../types';

export class VirtualFileSystem {
  private fs: Record<string, FSNode>;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    this.fs = config.filesystem;
  }

  private resolvePath(path: string, cwd: string): string {
    if (path === '~' || path === '') return '~';
    if (path.startsWith('~/')) {
      return this.normalizePath('~/' + path.slice(2));
    }
    if (path.startsWith('/')) {
      return this.normalizePath('~' + path);
    }
    // Relative path
    const base = cwd === '~' ? '~' : cwd;
    return this.normalizePath(base + '/' + path);
  }

  private normalizePath(path: string): string {
    const parts = path.split('/').filter(Boolean);
    const resolved: string[] = [];
    for (const part of parts) {
      if (part === '.') continue;
      if (part === '..') {
        if (resolved.length > 1 || (resolved.length === 1 && resolved[0] !== '~')) {
          resolved.pop();
        }
      } else {
        resolved.push(part);
      }
    }
    if (resolved.length === 0) return '~';
    return resolved.join('/');
  }

  private getNode(absolutePath: string): FSNode | null {
    if (absolutePath === '~') {
      return this.fs['~'] ?? null;
    }
    const parts = absolutePath.split('/');
    let current: FSNode | undefined = this.fs[parts[0]];
    if (!current) return null;

    for (let i = 1; i < parts.length; i++) {
      if (current.type !== 'dir' || !current.children) return null;
      current = current.children[parts[i]];
      if (!current) return null;
    }
    return current;
  }

  resolve(path: string, cwd: string): string {
    return this.resolvePath(path, cwd);
  }

  getDisplayPath(absolutePath: string): string {
    if (absolutePath === '~') return '~';
    if (absolutePath.startsWith('~/')) return absolutePath;
    return absolutePath;
  }

  getPromptPath(absolutePath: string): string {
    if (absolutePath === '~') return '~';
    if (absolutePath.startsWith('~/')) {
      return '/' + absolutePath.slice(2);
    }
    return absolutePath;
  }

  exists(path: string, cwd: string): boolean {
    const abs = this.resolvePath(path, cwd);
    return this.getNode(abs) !== null;
  }

  isDir(path: string, cwd: string): boolean {
    const abs = this.resolvePath(path, cwd);
    const node = this.getNode(abs);
    return node?.type === 'dir';
  }

  isFile(path: string, cwd: string): boolean {
    const abs = this.resolvePath(path, cwd);
    const node = this.getNode(abs);
    return node?.type === 'file';
  }

  listDir(path: string, cwd: string, showHidden = false): string[] {
    const abs = this.resolvePath(path, cwd);
    const node = this.getNode(abs);
    if (!node || node.type !== 'dir' || !node.children) return [];
    return Object.keys(node.children).filter(
      (name) => showHidden || !name.startsWith('.')
    );
  }

  readFile(path: string, cwd: string): string[] | null {
    const abs = this.resolvePath(path, cwd);
    const node = this.getNode(abs);
    if (!node || node.type !== 'file') return null;

    const content = node.content ?? '';

    // Handle special content references
    if (content === 'bio') {
      return this.config.user.bio;
    }
    if (content === 'skills') {
      return this.renderSkills();
    }
    if (content === 'experience') {
      return this.renderExperience();
    }
    if (content === 'contact') {
      return this.renderContact();
    }
    if (content === 'resume') {
      return [`Resume available for download. Use 'download resume' to get it.`];
    }
    if (content.startsWith('project:')) {
      const projectId = content.split(':')[1];
      return this.renderProjectFile(projectId);
    }

    // Plain string content
    return content.split('\n');
  }

  private renderSkills(): string[] {
    const lines: string[] = [''];
    for (const cat of this.config.skills) {
      lines.push(`  ${cat.category}:`);
      lines.push(`    ${cat.items.join(', ')}`);
      lines.push('');
    }
    return lines;
  }

  private renderContact(): string[] {
    const u = this.config.user;
    return [
      '',
      `  Name:     ${u.name}`,
      `  Title:    ${u.title}`,
      `  Email:    ${u.email}`,
      `  GitHub:   ${u.github}`,
      `  LinkedIn: ${u.linkedin}`,
      '',
    ];
  }

  private renderExperience(): string[] {
    const lines: string[] = [''];

    for (const item of this.config.experience) {
      lines.push(`  ${item.role} — ${item.company}`);
      lines.push(`  ${item.period} | ${item.location}`);
      for (const highlight of item.highlights) {
        lines.push(`  - ${highlight}`);
      }
      lines.push('');
    }

    return lines;
  }

  private renderProjectFile(projectId: string): string[] {
    const project = this.config.projects.find((p) => p.id === projectId);
    if (!project) return ['Project not found.'];
    const lines = [
      '',
      `  # ${project.name}`,
      '',
      `  ${project.description}`,
      '',
      `  Stack: ${project.stack.join(', ')}`,
    ];
    if (project.demo) lines.push(`  Demo:  ${project.demo}`);
    if (project.repo) lines.push(`  Repo:  ${project.repo}`);
    lines.push('');
    return lines;
  }

  getCompletions(partial: string, cwd: string): string[] {
    const lastSlash = partial.lastIndexOf('/');
    let dirPath: string;
    let prefix: string;

    if (lastSlash === -1) {
      dirPath = cwd;
      prefix = partial;
    } else {
      dirPath = partial.slice(0, lastSlash) || '/';
      prefix = partial.slice(lastSlash + 1);
    }

    const entries = this.listDir(dirPath, cwd, partial.startsWith('.'));
    const matches = entries.filter((e) =>
      e.toLowerCase().startsWith(prefix.toLowerCase())
    );

    if (lastSlash === -1) {
      return matches;
    }
    const base = partial.slice(0, lastSlash + 1);
    return matches.map((m) => base + m);
  }
}
