import { Reveal } from "./Reveal";

/**
 * Native <details> accordion — keyboard accessible and functional without JS.
 * The marker is suppressed and replaced with a rotating hairline cross.
 */
export function Faq({
  items,
}: {
  items: ReadonlyArray<{ q: string; a: string }>;
}) {
  return (
    <div className="border-t border-rule">
      {items.map((item, i) => (
        <Reveal key={item.q} delay={i * 45}>
          <details className="group border-b border-rule">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 text-xl leading-snug text-navy transition-colors duration-300 hover:text-blue md:text-2xl [&::-webkit-details-marker]:hidden">
              <span className="max-w-3xl">{item.q}</span>
              <span
                aria-hidden="true"
                className="relative mt-2.5 block h-3.5 w-3.5 shrink-0 text-blue"
              >
                <span className="absolute top-1/2 left-0 block h-px w-3.5 -translate-y-1/2 bg-current" />
                <span className="absolute top-1/2 left-0 block h-px w-3.5 -translate-y-1/2 rotate-90 bg-current transition-transform duration-400 group-open:rotate-0" />
              </span>
            </summary>
            <div className="max-w-2xl pr-8 pb-8 text-lg leading-relaxed text-ink-soft">
              {item.a}
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
