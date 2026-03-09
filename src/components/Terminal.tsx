import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTerminalStore } from '../hooks/useTerminal';
import Prompt from './Prompt';
import CommandOutput from './CommandOutput';
import { getCompletions, applyCompletion } from '../utils/autocomplete';

const Terminal: React.FC = () => {
  const lines = useTerminalStore((s) => s.lines);
  const currentInput = useTerminalStore((s) => s.currentInput);
  const setCurrentInput = useTerminalStore((s) => s.setCurrentInput);
  const executeCommand = useTerminalStore((s) => s.executeCommand);
  const navigateHistory = useTerminalStore((s) => s.navigateHistory);
  const theme = useTerminalStore((s) => s.theme);
  const registry = useTerminalStore((s) => s.registry);
  const cwd = useTerminalStore((s) => s.cwd);
  const recruiterMode = useTerminalStore((s) => s.recruiterMode);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [tabCompletions, setTabCompletions] = useState<string[]>([]);
  const [showCompletions, setShowCompletions] = useState(false);

  // Auto-scroll to bottom whenever lines change or input changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [lines, currentInput]);

  // Focus input on click anywhere
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput, lines]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setShowCompletions(false);
        executeCommand(currentInput);
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateHistory('up');
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateHistory('down');
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        handleTab();
        return;
      }

      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        // Cancel current input
        executeCommand('');
        setCurrentInput('');
        setShowCompletions(false);
        return;
      }

      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        useTerminalStore.getState().clearLines();
        return;
      }

      // Hide completions on any other key
      setShowCompletions(false);
    },
    [currentInput, executeCommand, navigateHistory, setCurrentInput]
  );

  const handleTab = useCallback(() => {
    const vfs = registry.getVFS();
    const completions = getCompletions(currentInput, registry, vfs, cwd);

    if (completions.length === 0) return;

    if (completions.length === 1) {
      setCurrentInput(applyCompletion(currentInput, completions[0]));
      setShowCompletions(false);
    } else {
      setTabCompletions(completions);
      setShowCompletions(true);
    }
  }, [currentInput, registry, cwd, setCurrentInput]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentInput(e.target.value);
      setShowCompletions(false);
    },
    [setCurrentInput]
  );

  const recruiterSuggestions = [
    { cmd: 'about', desc: 'Learn about Alex' },
    { cmd: 'projects', desc: 'View projects' },
    { cmd: 'skills', desc: 'See skills' },
    { cmd: 'experience', desc: 'View experience' },
    { cmd: 'download resume', desc: 'Get resume' },
  ];

  return (
    <div
      className="h-screen flex flex-col font-mono text-sm overflow-hidden"
      style={{
        background: theme.bg,
        color: theme.fg,
      }}
      onClick={focusInput}
    >
      {/* Terminal header bar */}
      <div
        className="flex items-center px-4 py-2 gap-2 select-none shrink-0"
        style={{ background: theme.selection }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-2 text-xs opacity-60">
          alexOS — Terminal
        </span>
      </div>

      {/* Scrollable terminal body */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 pb-2"
        style={{ minHeight: 0 }}
      >
        {/* Rendered output lines */}
        {lines.map((line) => (
          <CommandOutput key={line.id} line={line} />
        ))}

        {/* Current input line */}
        <div className="flex items-center flex-wrap">
          <Prompt />
          <div className="relative flex-1 min-w-0 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none border-none w-full caret-transparent"
              style={{ color: theme.fg, fontFamily: 'inherit', fontSize: 'inherit' }}
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
            {/* Custom blinking cursor */}
            <span
              className="absolute pointer-events-none"
              style={{
                left: `${currentInput.length}ch`,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <span
                className="inline-block w-[0.6em] h-[1.15em] animate-blink"
                style={{ background: theme.fg }}
              />
            </span>
          </div>
        </div>

        {/* Tab completions */}
        {showCompletions && tabCompletions.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 ml-1">
            {tabCompletions.map((c) => (
              <span
                key={c}
                className="cursor-pointer hover:underline"
                style={{ color: theme.accent }}
                onClick={() => {
                  setCurrentInput(applyCompletion(currentInput, c));
                  setShowCompletions(false);
                  focusInput();
                }}
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {/* Recruiter mode suggestions */}
        {recruiterMode && (
          <div className="mt-3 flex flex-wrap gap-2">
            {recruiterSuggestions.map((s) => (
              <button
                key={s.cmd}
                className="px-3 py-1 rounded text-xs border transition-colors hover:opacity-80"
                style={{
                  borderColor: theme.accent,
                  color: theme.accent,
                  background: 'transparent',
                }}
                onClick={() => {
                  executeCommand(s.cmd);
                  focusInput();
                }}
              >
                {s.desc}
              </button>
            ))}
          </div>
        )}

        {/* Scroll sentinel */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;
