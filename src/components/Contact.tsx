import { CopyEmailButton } from "@/components/CopyEmailButton";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/site";

const links = [
  {
    label: "Phone",
    value: profile.phoneDisplay,
    href: `tel:${profile.phoneTel}`,
  },
  {
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: profile.githubLabel,
    href: profile.github,
    external: true,
  },
  {
    label: "Résumé",
    value: "Download PDF",
    href: profile.resumePath,
    download: profile.resumeFilename,
  },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1100px] px-5 py-16 md:py-24">
        <SectionHeading eyebrow="Contact" title="Let’s talk about the work" />
        <p className="mt-6 max-w-xl text-muted">
          Email, phone, LinkedIn, and GitHub are the fastest ways to reach me.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          <li id="email" className="scroll-mt-28 sm:col-span-2">
            <div className="flex h-full flex-col border border-border bg-surface px-5 py-4">
              <span className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
                Email
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {profile.email}
                </a>
                <CopyEmailButton email={profile.email} />
              </div>
            </div>
          </li>
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                download={link.download}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-full flex-col border border-border bg-surface px-5 py-4 transition-colors hover:border-accent"
              >
                <span className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
                  {link.label}
                </span>
                <span className="mt-2 text-sm text-foreground">{link.value}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 font-mono text-xs text-muted">
          {profile.name} · {profile.role}
        </p>
      </div>
    </section>
  );
}
