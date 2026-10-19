import { SectionHeading } from "@/components/SectionHeading";
import { SystemTrace } from "@/components/SystemTrace";
import { projects } from "@/content/site";

export function Projects() {
  return (
    <section id="work" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto w-full max-w-[1100px] px-5 py-16 md:py-24">
        <SectionHeading eyebrow="Selected work" title="Projects I can talk through" />
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.name}
              className={`flex flex-col border border-border bg-surface p-6 transition-colors hover:border-accent/50 ${
                project.trace ? "md:col-span-2" : ""
              }`}
            >
              <h3 className="text-lg font-medium tracking-tight">{project.name}</h3>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex font-mono text-xs text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  {project.linkLabel ?? project.href}
                </a>
              ) : null}
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {project.summary}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.details}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {project.trace ? <SystemTrace trace={project.trace} /> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
