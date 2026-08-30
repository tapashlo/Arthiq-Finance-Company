"use client";

/**
 * The model studio: assumptions on the left, a live three-statement projection
 * on the right.
 *
 * All computation happens in the browser. Nothing typed here is sent anywhere
 * unless the visitor signs in and saves a scenario on purpose — which is worth
 * saying plainly on a page that asks a founder for their revenue.
 */

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/ui";
import { allScenarios, DEFAULTS, modelStart, project, type Assumptions } from "@/lib/model";
import { Controls } from "./Controls";
import { Outputs } from "./Outputs";
import { SaveScenario } from "./SaveScenario";

export function ModelStudio() {
  const [a, setA] = useState<Assumptions>(DEFAULTS);

  // Fixed for the life of the component so every recomputation lines up on the
  // same calendar, and a scenario saved now reloads onto the same months.
  const [start] = useState(() => modelStart());

  const set = useCallback(<K extends keyof Assumptions>(key: K, value: Assumptions[K]) => {
    setA((prev) => ({ ...prev, [key]: value }));
  }, []);

  const base = useMemo(() => project(a, start), [a, start]);
  const scenarios = useMemo(() => allScenarios(a, start), [a, start]);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
      {/* On a phone the outputs come first. Eleven sliders before any result
          is a page you scroll past; the point is to see the answer move. The
          DOM keeps assumptions-then-results, which is the order that reads
          correctly to a screen reader and to the tab key. */}
      <div className="order-2 lg:order-1 lg:col-span-4 xl:col-span-3">
        <div className="rounded-xl border border-rule bg-white p-6 shadow-lift lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto md:p-7">
          <Controls a={a} set={set} onReset={() => setA(DEFAULTS)} />
        </div>
      </div>

      <div className="order-1 min-w-0 lg:order-2 lg:col-span-8 xl:col-span-9">
        <Outputs base={base} scenarios={scenarios} />

        <div className="mt-6 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <SaveScenario assumptions={a} onLoad={setA} />
          </div>

          <div className="rounded-xl border border-rule bg-canvas p-6 md:col-span-5">
            <h3 className="display text-lg text-navy">Want this on your real numbers?</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              This is the shape of the model we build for clients — driver-based, tied out, and yours to keep. On a
              real engagement it runs on your ledger rather than eleven sliders.
            </p>
            <Link href="/contact" className="label link-reveal tap mt-4 gap-3 text-blue hover:text-navy">
              Talk it through with us
              <Arrow />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-faint">
          <span className="label-sm mr-2">Note</span>
          Everything here is computed in your browser. Nothing you type is sent to us, or to anyone else, unless you
          sign in and save a scenario. This is a planning aid for illustration, not investment, tax or accounting
          advice.
        </p>
      </div>
    </div>
  );
}
