// The Best Meal You Ever Had — one original sentence, written to /output/entry.txt.
//
// The sentence is fixed text, so the program is fully deterministic: every
// run produces byte-identical output, and the gate below proves the text
// fits the bounty rules (1-200 characters, not whitespace-only) before
// writing. Revised once: the ending was tightened from "and nobody said a
// word" to "too full to speak", so the sentence lands on the eater's
// silence instead of the room's.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My grandmother's rendang simmered six hours until the beef surrendered, and I ate it cross-legged on the floor while rain drummed the tin roof, too full to speak.";

// Fail loudly if the entry text breaks the bounty gate. Length is measured
// in Unicode code points via Array.from, so a character like the apostrophe
// counts once even though it may take more than one byte in UTF-8.
function validateEntry(text: string): number {
  const codePoints = Array.from(text);
  const count = codePoints.length;
  const hasVisibleText = codePoints.some((ch) => ch.trim() !== "");
  if (count === 0 || count > 200) {
    throw new Error(
      `entry must be 1-200 characters long, but it is ${count}`,
    );
  }
  if (!hasVisibleText) {
    throw new Error("entry must contain more than whitespace");
  }
  return count;
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validateEntry(ENTRY);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
