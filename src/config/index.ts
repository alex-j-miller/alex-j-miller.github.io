import type { Config } from '../types';
import personalConfig from './personal.json';
import commandsConfig from './commands.json';
import terminalConfig from './terminal.json';
import filesystemConfig from './filesystem.json';

function getTodayIsoLocalDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const today = getTodayIsoLocalDate();
const manPage = personalConfig.manPage.map((line) =>
  line
    .replace(/YYYY-MM-DD/g, today)
    .replace(/\d{4}-\d{2}-\d{2}/g, today)
);

const config = {
  ...personalConfig,
  manPage,
  ...commandsConfig,
  ...terminalConfig,
  ...filesystemConfig,
} as Config;

export default config;