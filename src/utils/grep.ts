export function grepFilter(lines: string[], pattern: string): string[] {
  if (!pattern) return lines;
  try {
    const regex = new RegExp(pattern, 'i');
    return lines.filter((line) => regex.test(line));
  } catch {
    // If invalid regex, do plain text search
    const lower = pattern.toLowerCase();
    return lines.filter((line) => line.toLowerCase().includes(lower));
  }
}
