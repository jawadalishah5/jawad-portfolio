import { skillGroups } from "@/content/site";
import { SectionHeading } from "@/components/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto w-full max-w-[1100px] px-5 py-16 md:py-24">
        <SectionHeading eyebrow="Capabilities" title="How the work is grouped" />
        <ul className="mt-12 divide-y divide-border border-y border-border">
          {skillGroups.map((group) => (
            <li
              key={group.label}
              className="grid gap-4 py-6 md:grid-cols-[220px_minmax(0,1fr)] md:items-start md:gap-10"
            >
              <h3 className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
