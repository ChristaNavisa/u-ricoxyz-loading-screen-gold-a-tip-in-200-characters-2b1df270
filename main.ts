import { mkdirSync, writeFileSync } from "node:fs";

const TIP =
  "Tip: Your agent doesn't need more context. It needs you to stop pasting the entire repo into every message.";

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function validateLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (line.trim().length === 0 || line.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
}

function writeEntry(outDir: string, line: string): void {
  validateLine(line);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, line, "utf8");
}

writeEntry(resolveOutDir(), TIP);
