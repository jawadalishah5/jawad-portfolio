import type { ReactNode } from "react";
import Link from "next/link";

type BrandMarkProps = {
  suffix?: ReactNode;
  className?: string;
  size?: "sm" | "md";
};

export function BrandMark({ suffix, className = "", size = "sm" }: BrandMarkProps) {
  const textClass = size === "md" ? "text-base" : "text-sm";

  return (
    <span className={`inline-flex min-w-0 items-baseline gap-0 font-mono tracking-tight ${textClass} ${className}`}>
      <Link href="/" className="group inline-flex items-baseline transition-opacity hover:opacity-90">
        <span className="font-normal text-muted lowercase">ask</span>
        <span className="font-semibold text-accent">Jawad</span>
      </Link>
      {suffix}
    </span>
  );
}
