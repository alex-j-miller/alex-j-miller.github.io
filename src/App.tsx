import { useTerminalStore } from './hooks/useTerminal';
import BootSequence from './components/BootSequence';
import Terminal from './components/Terminal';

function App() {
  const isBooting = useTerminalStore((s) => s.isBooting);
  const theme = useTerminalStore((s) => s.theme);

  return (
    <div style={{ background: theme.bg, height: '100%' }}>
      {isBooting ? <BootSequence /> : <Terminal />}
    </div>
  );
}

export default App;
