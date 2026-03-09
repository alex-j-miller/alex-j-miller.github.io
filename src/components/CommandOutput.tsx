import React from 'react';
import type { TerminalLine } from '../types';
import { useTerminalStore } from '../hooks/useTerminal';
import Prompt from './Prompt';

interface CommandOutputProps {
  line: TerminalLine;
}

const CommandOutput: React.FC<CommandOutputProps> = ({ line }) => {
  const theme = useTerminalStore((s) => s.theme);

  if (line.type === 'input') {
    return (
      <div className="flex flex-wrap">
        <Prompt text={line.prompt} />
        <span style={{ color: theme.fg }}>{line.content}</span>
      </div>
    );
  }

  if (line.type === 'error') {
    return (
      <div style={{ color: theme.error }}>{line.content}</div>
    );
  }

  if (line.type === 'system') {
    return (
      <div style={{ color: theme.accent }}>{line.content}</div>
    );
  }

  // output or ascii
  return (
    <div style={{ color: theme.fg, whiteSpace: line.type === 'ascii' ? 'pre' : 'normal' }}>
      {line.content === '' ? (
        <span>&nbsp;</span>
      ) : (
        <span
          dangerouslySetInnerHTML={{
            __html: linkify(escapeHtml(line.content)),
          }}
        />
      )}
    </div>
  );
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function linkify(text: string): string {
  // Convert URLs to clickable links
  return text.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80" style="color: inherit">$1</a>'
  );
}

export default CommandOutput;
