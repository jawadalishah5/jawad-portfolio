import { experience } from "@/content/site";
import { SectionHeading } from "@/components/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto w-full max-w-[1100px] px-5 py-16 md:py-24">
        <SectionHeading eyebrow="Experience" title="Roles and what I owned" />
        <ol className="mt-12 divide-y divide-border border-y border-border">
          {experience.map((role) => (
            <li
              key={`${role.company}-${role.dates}`}
              className="grid gap-4 py-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10"
            >
              <div className="font-mono text-xs leading-relaxed text-muted">
                <p>{role.dates}</p>
                <p className="mt-2">{role.location}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium tracking-tight">{role.title}</h3>
                <p className="mt-1 text-accent">{role.company}</p>
                <ul className="mt-4 space-y-3">
                  {role.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="border-l border-border pl-3 text-sm leading-relaxed text-muted"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
