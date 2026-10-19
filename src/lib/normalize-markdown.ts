const SECTION_STRONG = "**Strong alignment:**";
const SECTION_CLOSEST = "**Closest related experience:**";

function boldSectionHeaders(text: string) {
  let s = text;
  s = s.replace(/([.!?])\s+Strong alignment:\s*/gi, `$1\n\n${SECTION_STRONG}\n\n`);
  s = s.replace(/^\s*Strong alignment:\s*/i, `${SECTION_STRONG}\n\n`);
  s = s.replace(/\*\*Strong alignment:\*\*\s*(?!\n)/gi, `${SECTION_STRONG}\n\n`);

  s = s.replace(/([.!?])\s+Closest related experience:\s*/gi, `$1\n\n${SECTION_CLOSEST}\n\n`);
  s = s.replace(/^\s*Closest related experience:\s*/i, `${SECTION_CLOSEST}\n\n`);
  s = s.replace(/\*\*Closest related experience:\*\*\s*(?!\n)/gi, `${SECTION_CLOSEST}\n\n`);

  return s;
}

/** Fix common model markdown so react-markdown renders lists and sections cleanly. */
export function normalizeAssistantMarkdown(text: string, options?: { formatHiringSections?: boolean }) {
  const formatHiringSections = options?.formatHiringSections ?? false;
  let s = text.trim().replace(/\r\n/g, "\n");

  if (formatHiringSections) {
    s = boldSectionHeaders(s);
  }

  // Turn inline "sentence. - next item" into proper list lines.
  s = s.replace(/\.\s+-\s+/g, ".\n- ");

  if (formatHiringSections) {
    s = s.replace(/\*\*Strong alignment:\*\*\n\n([A-Z])/g, `${SECTION_STRONG}\n\n- $1`);
  }

  // Ensure a blank line before list blocks that follow prose on the same line.
  s = s.replace(/([^\n])\n(- )/g, "$1\n\n$2");

  s = s.replace(/\n{3,}/g, "\n\n");

  return s.trim();
}
