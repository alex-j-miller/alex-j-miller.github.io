import React from 'react';
import { useTerminalStore } from '../hooks/useTerminal';

interface PromptProps {
  text?: string;
}

const Prompt: React.FC<PromptProps> = ({ text }) => {
  const getPrompt = useTerminalStore((s) => s.getPrompt);
  const theme = useTerminalStore((s) => s.theme);
  const promptText = text ?? getPrompt();

  // Parse prompt: user@host:path$
  const match = promptText.match(/^(.+?)@(.+?):(.+?)\$$/);
  if (!match) {
    return <span style={{ color: theme.prompt }}>{promptText} </span>;
  }

  const [, user, host, path] = match;

  return (
    <span className="whitespace-nowrap mr-2 select-none">
      <span style={{ color: theme.success }}>{user}@{host}</span>
      <span style={{ color: theme.fg }}>:</span>
      <span style={{ color: theme.prompt }}>{path}</span>
      <span style={{ color: theme.fg }}>$ </span>
    </span>
  );
};

export default Prompt;
