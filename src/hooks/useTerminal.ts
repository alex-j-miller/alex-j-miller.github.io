import { create } from 'zustand';
import type { TerminalLine, Theme, Config } from '../types';
import { CommandRegistry } from '../commands/commandRegistry';
import config from '../config';

const typedConfig = config as unknown as Config;
const registry = new CommandRegistry(typedConfig);
const defaultTheme = typedConfig.themes['default'];

let lineIdCounter = 0;
function nextLineId(): string {
  return `line-${++lineIdCounter}`;
}

interface TerminalState {
  lines: TerminalLine[];
  cwd: string;
  history: string[];
  historyIndex: number;
  currentInput: string;
  isBooting: boolean;
  recruiterMode: boolean;
  theme: Theme;
  config: Config;
  registry: CommandRegistry;

  addLine: (line: Omit<TerminalLine, 'id'>) => void;
  addLines: (lines: Omit<TerminalLine, 'id'>[]) => void;
  clearLines: () => void;
  setCwd: (cwd: string) => void;
  setCurrentInput: (input: string) => void;
  executeCommand: (input: string) => Promise<void>;
  navigateHistory: (direction: 'up' | 'down') => void;
  setBooting: (booting: boolean) => void;
  setRecruiterMode: (on: boolean) => void;
  setTheme: (theme: Theme) => void;
  getPrompt: () => string;
}

const initialWelcomeLines: Omit<TerminalLine, 'id'>[] = [
  ...typedConfig.welcomeAscii.map(
    (text) => ({ type: 'ascii' as const, content: text })
  ),
  ...typedConfig.terminalWelcome.map(
    (text) => ({ type: 'system' as const, content: text })
  ),
];

export const useTerminalStore = create<TerminalState>((set, get) => ({
  lines: initialWelcomeLines.map((l) => ({ ...l, id: nextLineId() })),
  cwd: '~',
  history: [],
  historyIndex: -1,
  currentInput: '',
  isBooting: true,
  recruiterMode: false,
  theme: defaultTheme,
  config: typedConfig,
  registry,

  addLine: (line) => {
    set((state) => ({
      lines: [...state.lines, { ...line, id: nextLineId() }],
    }));
  },

  addLines: (newLines) => {
    set((state) => ({
      lines: [
        ...state.lines,
        ...newLines.map((l) => ({ ...l, id: nextLineId() })),
      ],
    }));
  },

  clearLines: () => {
    set({ lines: [] });
  },

  setCwd: (cwd) => {
    set({ cwd });
  },

  setCurrentInput: (input) => {
    set({ currentInput: input, historyIndex: -1 });
  },

  executeCommand: async (input) => {
    const state = get();
    const prompt = state.getPrompt();
    const trimmed = input.trim();

    // Add input line
    set((s) => ({
      lines: [
        ...s.lines,
        { id: nextLineId(), type: 'input', content: trimmed, prompt },
      ],
      currentInput: '',
      history: trimmed ? [...s.history, trimmed] : s.history,
      historyIndex: -1,
    }));

    if (!trimmed) return;

    const context = {
      cwd: get().cwd,
      history: get().history,
      config: typedConfig,
      setCwd: (newCwd: string) => set({ cwd: newCwd }),
      setRecruiterMode: (on: boolean) => set({ recruiterMode: on }),
      recruiterMode: get().recruiterMode,
      setTheme: (theme: Theme) => set({ theme }),
      clearLines: () => set({ lines: [] }),
    };

    const result = await registry.execute(input, context);

    if (result.output.length > 0) {
      const newLines: Omit<TerminalLine, 'id'>[] = result.output.map(
        (content) => ({
          type: (result.isError ? 'error' : result.type ?? 'output') as TerminalLine['type'],
          content,
        })
      );
      set((s) => ({
        lines: [
          ...s.lines,
          ...newLines.map((l) => ({ ...l, id: nextLineId() })),
        ],
      }));
    }
  },

  navigateHistory: (direction) => {
    set((state) => {
      const { history } = state;
      if (history.length === 0) return {};

      let newIndex: number;
      if (direction === 'up') {
        if (state.historyIndex === -1) {
          newIndex = history.length - 1;
        } else {
          newIndex = Math.max(0, state.historyIndex - 1);
        }
      } else {
        if (state.historyIndex === -1) return {};
        newIndex = state.historyIndex + 1;
        if (newIndex >= history.length) {
          return { historyIndex: -1, currentInput: '' };
        }
      }

      return {
        historyIndex: newIndex,
        currentInput: history[newIndex],
      };
    });
  },

  setBooting: (booting) => {
    set({ isBooting: booting });
  },

  setRecruiterMode: (on) => {
    set({ recruiterMode: on });
  },

  setTheme: (theme) => {
    set({ theme });
  },

  getPrompt: () => {
    const state = get();
    const { username, hostname } = state.config.user;
    const vfs = registry.getVFS();
    const pathDisplay = vfs.getPromptPath(state.cwd);
    return `${username}@${hostname}:${pathDisplay}$`;
  },
}));
