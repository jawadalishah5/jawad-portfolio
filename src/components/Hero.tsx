import { experience, profile } from "@/content/site";

const current = experience[0];

export function Hero() {
  return (
    <section id="top" className="border-b border-border">
      <div className="mx-auto grid w-full max-w-[1100px] gap-12 px-5 py-16 md:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.75fr)] md:py-24">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
            {profile.role}
          </p>
          <p className="mt-2 font-mono text-xs tracking-[0.14em] text-muted">
            {profile.focus}
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.08]">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
            >
              View work
            </a>
            <a
              href={profile.resumePath}
              download={profile.resumeFilename}
              className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm text-foreground transition-colors hover:border-accent"
            >
              Résumé
            </a>
            <a
              href="#email"
              className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm text-foreground transition-colors hover:border-accent"
            >
              Email
            </a>
          </div>
        </div>
        <aside className="self-end border border-border bg-surface p-6">
          <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            Now
          </p>
          <p className="mt-4 text-lg font-medium">{current.title}</p>
          <p className="mt-1 text-accent">{current.company}</p>
          <p className="mt-3 font-mono text-xs text-muted">
            {current.dates}
            <span className="mx-2 text-border">/</span>
            {current.location}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {current.bullets[0]}
          </p>
        </aside>
      </div>
    </section>
  );
}
