export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  demo: string;
  repo: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface FSNode {
  type: 'file' | 'dir';
  content?: string;
  children?: Record<string, FSNode>;
}

export interface BootMessage {
  text: string;
  delay: number;
}

export interface Theme {
  bg: string;
  fg: string;
  prompt: string;
  accent: string;
  error: string;
  success: string;
  selection: string;
}

export interface Config {
  user: {
    name: string;
    title: string;
    username: string;
    hostname: string;
    email: string;
    github: string;
    linkedin: string;
    bio: string[];
  };
  projects: Project[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  filesystem: Record<string, FSNode>;
  hiddenCommands: Record<string, { output: string[] }>;
  commandDescriptions: Record<string, string>;
  commandCategories: Record<string, string[]>;
  aliases: Record<string, string>;
  resumeUrl: string;
  bootMessages: BootMessage[];
  themes: Record<string, Theme>;
  manPage: string[];
  welcomeAscii: string[];
  terminalWelcome: string[];
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'ascii';
  content: string;
  prompt?: string;
}

export interface CommandResult {
  output: string[];
  isError?: boolean;
  type?: 'ascii' | 'output' | 'system';
}

export type CommandHandler = (
  args: string[],
  context: CommandContext
) => CommandResult | Promise<CommandResult>;

export interface CommandContext {
  cwd: string;
  history: string[];
  config: Config;
  setCwd: (path: string) => void;
  setRecruiterMode: (on: boolean) => void;
  recruiterMode: boolean;
  setTheme: (t: Theme) => void;
  clearLines: () => void;
}
