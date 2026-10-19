"use client";

import { useState } from "react";

async function writeEmail(email: string) {
  try {
    window.focus();
    await navigator.clipboard.writeText(email);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = email;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const ok = await writeEmail(email);
    setCopied(ok);
    if (ok) {
      window.setTimeout(() => setCopied(false), 1600);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="inline-flex h-7 items-center rounded-full border border-border px-3 font-mono text-[11px] tracking-[0.12em] text-accent uppercase transition-colors hover:border-accent"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
