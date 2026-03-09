import React, { useEffect, useState } from 'react';
import { useTerminalStore } from '../hooks/useTerminal';

const BootSequence: React.FC = () => {
  const config = useTerminalStore((s) => s.config);
  const setBooting = useTerminalStore((s) => s.setBooting);
  const theme = useTerminalStore((s) => s.theme);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showAscii, setShowAscii] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const logBootLine = (line: string) => {
      console.log(`[boot] ${line}`);
    };

    const run = async () => {
      // Show ASCII art first
      setShowAscii(true);
      await delay(600);
      if (cancelled) return;
      config.welcomeAscii.forEach(logBootLine);

      const messages = config.bootMessages;
      for (let i = 0; i < messages.length; i++) {
        if (cancelled) return;
        await delay(messages[i].delay);
        if (cancelled) return;
        logBootLine(messages[i].text);
        setVisibleLines((prev) => [...prev, messages[i].text]);
      }

      // Brief pause after all messages
      await delay(500);
      if (cancelled) return;
      if (!cancelled) {
        setBooting(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [config.bootMessages, setBooting]);

  return (
    <div
      className="min-h-screen p-6 font-mono text-sm"
      style={{ background: theme.bg, color: theme.fg }}
    >
      {showAscii && (
        <div className="mb-4" style={{ color: theme.success, whiteSpace: 'pre' }}>
          {config.welcomeAscii.map((line, i) => (
            <div key={i} style={{ whiteSpace: 'pre' }}>{line}</div>
          ))}
        </div>
      )}
      {visibleLines.map((line, i) => (
        <div
          key={i}
          style={{
            color: line.includes('OK')
              ? theme.success
              : line === 'System ready.' || line.startsWith('Welcome')
                ? theme.accent
                : theme.fg,
          }}
        >
          {line}
        </div>
      ))}
      <span
        className="inline-block w-2 h-4 animate-pulse"
        style={{ background: theme.fg }}
      />
    </div>
  );
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default BootSequence;
