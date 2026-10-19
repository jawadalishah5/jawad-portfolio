import Image from "next/image";
import Link from "next/link";
import { nav, profile } from "@/content/site";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";

type SiteHeaderProps = {
  variant: "ask" | "portfolio";
};

export function SiteHeader({ variant }: SiteHeaderProps) {
  const onAsk = variant === "ask";
  const sectionHref = (hash: string) => (onAsk ? `/portfolio${hash}` : hash);

  return (
    <header className="sticky top-0 z-20 shrink-0 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="relative shrink-0">
            <Image
              src={profile.profileImage}
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full border border-border object-cover"
              priority
            />
          </Link>
          <BrandMark
            suffix={
              !onAsk ? (
                <span className="ml-1.5 font-normal text-muted">/ Portfolio</span>
              ) : null
            }
          />
        </div>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:order-none"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={sectionHref(item.href)}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.resumePath}
            download={profile.resumeFilename}
            className="font-mono text-xs tracking-[0.14em] text-accent uppercase"
          >
            Résumé
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
