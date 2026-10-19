"use client";

import { useEffect, useState } from "react";
import type { ProjectTrace } from "@/content/traces";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function SystemTrace({ trace }: { trace: ProjectTrace }) {
  const reducedMotion = usePrefersReducedMotion();
  const [scenarioId, setScenarioId] = useState(trace.scenarios[0]?.id ?? "");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const scenario =
    trace.scenarios.find((item) => item.id === scenarioId) ?? trace.scenarios[0];
  const hops = scenario?.hops ?? [];
  const hop = hops[step];

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current >= hops.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 900);

    return () => window.clearInterval(timer);
  }, [playing, hops.length]);

  function selectScenario(id: string) {
    setScenarioId(id);
    setStep(0);
    setPlaying(false);
  }

  function selectHop(index: number) {
    setStep(index);
    setPlaying(false);
  }

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (step >= hops.length - 1) {
      setStep(0);
    }
    setPlaying(true);
  }

  if (!scenario || !hop) return null;

  return (
    <div className="mt-6 border-t border-border pt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
          Trace the system
        </p>
        <button
          type="button"
          onClick={togglePlay}
          aria-pressed={playing}
          className="inline-flex h-8 items-center rounded-full bg-accent px-4 font-mono text-[11px] tracking-[0.12em] text-background uppercase"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      {trace.scenarios.length > 1 ? (
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Mode">
          {trace.scenarios.map((item) => {
            const selected = item.id === scenario.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => selectScenario(item.id)}
                className={`h-8 rounded-full border px-4 font-mono text-[11px] tracking-[0.12em] uppercase ${
                  selected
                    ? "border-accent text-accent"
                    : "border-border text-muted hover:border-accent/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="relative mt-5 hidden md:block">
        <div className="absolute top-[11px] right-[8%] left-[8%] h-px bg-border" />
        <span
          aria-hidden
          className="absolute top-[6px] z-10 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_#72e6b5]"
          style={{
            left: `calc(${((step + 0.5) / hops.length) * 100}% - 5px)`,
            transition: reducedMotion ? "none" : "left 700ms ease",
          }}
        />
        <ol
          className="relative grid"
          style={{ gridTemplateColumns: `repeat(${hops.length}, minmax(0, 1fr))` }}
        >
          {hops.map((item, index) => {
            const active = index === step;
            return (
              <li key={item.label} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => selectHop(index)}
                  aria-current={active ? "step" : undefined}
                  className="flex w-full flex-col items-center gap-2"
                >
                  <span
                    className={`h-[22px] w-[22px] rounded-full border bg-background ${
                      active ? "border-accent" : "border-border"
                    }`}
                  />
                  <span
                    className={`px-1 text-center font-mono text-[10px] leading-tight tracking-[0.08em] uppercase ${
                      active ? "text-accent" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <ol className="mt-4 space-y-2 md:hidden">
        {hops.map((item, index) => {
          const active = index === step;
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => selectHop(index)}
                aria-current={active ? "step" : undefined}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left ${
                  active ? "border-accent" : "border-border"
                }`}
              >
                <span
                  className={`font-mono text-[11px] ${active ? "text-accent" : "text-muted"}`}
                >
                  0{index + 1}
                </span>
                <span className={`text-sm ${active ? "text-foreground" : "text-muted"}`}>
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 border border-border bg-background px-4 py-3" aria-live="polite">
        <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
          {hop.label}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{hop.detail}</p>
        <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
          Example payload
        </p>
        <dl className="mt-2 space-y-1">
          {hop.payload.map((field) => (
            <div
              key={field.key}
              className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 font-mono text-xs"
            >
              <dt className="text-muted">{field.key}</dt>
              <dd className="text-foreground">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
        Illustrative trace. Payloads are examples, not production logs.
      </p>
    </div>
  );
}
