export interface ParsedCommand {
  command: string;
  args: string[];
  raw: string;
  pipe?: ParsedCommand;
}

export function parseCommand(input: string): ParsedCommand | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Handle pipes
  const pipeIndex = findPipeIndex(trimmed);
  if (pipeIndex !== -1) {
    const left = trimmed.slice(0, pipeIndex).trim();
    const right = trimmed.slice(pipeIndex + 1).trim();
    const leftParsed = parseCommand(left);
    const rightParsed = parseCommand(right);
    if (leftParsed && rightParsed) {
      leftParsed.pipe = rightParsed;
    }
    return leftParsed;
  }

  // Tokenize - handle quoted strings
  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return null;

  return {
    command: tokens[0].toLowerCase(),
    args: tokens.slice(1),
    raw: trimmed,
  };
}

function findPipeIndex(input: string): number {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    if (ch === '"' && !inSingle) inDouble = !inDouble;
    if (ch === '|' && !inSingle && !inDouble) return i;
  }
  return -1;
}

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let inSingle = false;
  let inDouble = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
      continue;
    }
    if (ch === '"' && !inSingle) {
      inDouble = !inDouble;
      continue;
    }
    if (ch === ' ' && !inSingle && !inDouble) {
      if (current) {
        tokens.push(current);
        current = '';
      }
      continue;
    }
    current += ch;
  }
  if (current) tokens.push(current);
  return tokens;
}
