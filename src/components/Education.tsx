import { education } from "@/content/site";
import { SectionHeading } from "@/components/SectionHeading";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto w-full max-w-[1100px] px-5 py-16 md:py-24">
        <SectionHeading eyebrow="Education" title={education.school} />
        <p className="mt-6 text-muted">{education.degree}</p>
        <p className="mt-2 font-mono text-xs text-muted">
          {education.dates}
          <span className="mx-2 text-border">/</span>
          {education.location}
        </p>
      </div>
    </section>
  );
}
