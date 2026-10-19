import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export const metadata: Metadata = {
  title: "Jawad Bukhari — Portfolio",
  description:
    "Portfolio of Jawad Bukhari, a senior AI engineer who ships agentic systems, reliable backend services, and cloud infrastructure.",
};

export default function PortfolioPage() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-30 focus:bg-accent focus:px-3 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <SiteHeader variant="portfolio" />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
