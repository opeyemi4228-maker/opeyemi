"use client";

// Copy-to-clipboard with a confirming state. Organisers paste bios into
// programmes and CMS fields; removing the select-and-copy step is a small
// courtesy that makes the kit feel considered.

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
    >
      {copied ? (
        <>
          <Check aria-hidden="true" className="h-3.5 w-3.5" /> Copied
        </>
      ) : (
        <>
          <Copy aria-hidden="true" className="h-3.5 w-3.5" /> {label}
        </>
      )}
    </button>
  );
}
