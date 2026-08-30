"use client";

/**
 * Ask ArthIQ — the part of the product that is not a dashboard.
 *
 * Deliberately not a form. Nothing here is computed from reader input, and
 * pretending otherwise would be a demo that lies. It shows five worked
 * examples over invented data: a question, the number it resolves to, and the
 * lines underneath that number. The point being made is that an answer names
 * its sources.
 */

import { useState } from "react";
import { askAnswers, askDisclosure, type AskAnswer } from "@/lib/lines";
import { VIZ } from "./panel";

function rowColour(a: AskAnswer, dir: "up" | "down") {
  if (a.tone === "cost") return VIZ.blue;
  if (a.tone === "saving") return VIZ.mint;
  return dir === "up" ? VIZ.coral : VIZ.mint;
}

export function AskArthiq() {
  const [index, setIndex] = useState(0);
  const answer = askAnswers[index];
  const widest = Math.max(...answer.rows.map((r) => r.amount));

  return (
    <div className="panel on-panel overflow-hidden">
      <header className="flex items-center gap-3 border-b border-[color:var(--color-panel-rule)] px-4 py-3.5 sm:px-6 sm:py-4">
        <h3 className="label text-white/70">Ask ArthIQ</h3>
        <span
          className="label-sm ml-auto rounded-full px-2.5 py-1.5"
          style={{
            color: answer.scope === "Personal" ? VIZ.mint : VIZ.blue,
            backgroundColor:
              answer.scope === "Personal" ? "rgba(58,208,164,0.12)" : "rgba(88,166,255,0.12)",
          }}
        >
          {answer.scope}
        </span>
      </header>

      <div className="p-4 sm:p-6">
        {/* The question, presented the way it was typed. */}
        <p className="flex items-start gap-3 rounded-xl bg-white/6 px-4 py-3.5 text-[0.9375rem] leading-snug text-white sm:text-base">
          <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-white/40" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13.6 13.6L18 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
          {answer.q}
        </p>

        {/* Re-keyed so a new answer animates in rather than swapping silently. */}
        <div key={answer.q} className="panel-in mt-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="tnum display text-3xl leading-none text-white sm:text-4xl">
              {answer.headline}
            </span>
            <span className="text-sm text-white/45">{answer.unit}</span>
          </div>

          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-white/70">
            {answer.summary}
          </p>

          <ul className="mt-6 space-y-3">
            {answer.rows.map((r) => (
              <li key={r.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0 text-sm text-white/75">{r.label}</span>
                  <span className="tnum shrink-0 text-sm font-semibold text-white">{r.value}</span>
                </div>
                {answer.bars && (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(4, (r.amount / widest) * 100)}%`,
                        backgroundColor: rowColour(answer, r.dir),
                      }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-center gap-2 border-t border-[color:var(--color-panel-rule)] pt-4 text-xs text-white/40">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
              <path
                d="M3.5 2.5h6l3 3v8h-9z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path d="M9.5 2.5v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            Sources: {answer.source}
          </p>
        </div>

        {/* Other questions. */}
        <div className="mt-6 border-t border-[color:var(--color-panel-rule)] pt-5">
          <p className="label-sm text-white/40">Try another</p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {askAnswers.map((a, i) => (
              <button
                key={a.q}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className={[
                  "tap rounded-full border px-3.5 text-left text-[0.8125rem] leading-snug transition-colors duration-300",
                  i === index
                    ? "border-white/25 bg-white/12 text-white"
                    : "border-[color:var(--color-panel-rule)] text-white/55 hover:border-white/25 hover:text-white",
                ].join(" ")}
              >
                {a.q}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-white/35">{askDisclosure}</p>
      </div>
    </div>
  );
}
