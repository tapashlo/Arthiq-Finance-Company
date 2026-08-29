import { Reveal } from "./Reveal";
import { Arrow, Button, Eyebrow } from "./ui";

export function CtaBand() {
  return (
    <section className="border-t border-rule bg-canvas">
      <div className="shell py-24 md:py-32">
        <Reveal>
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Next step</Eyebrow>
              <h2 className="mt-6 text-4xl leading-[1.06] text-navy sm:text-5xl md:text-[3.5rem]">
                Forty-five minutes,
                <br />
                and no documents.
              </h2>
              <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink-soft">
                The first call is about what you are deciding and what your current
                numbers can and cannot answer. If we are not the right team for
                it, we will say so and point you somewhere better.
              </p>
            </div>
            <div className="flex flex-col gap-3.5 sm:flex-row lg:col-span-5 lg:justify-end">
              <Button href="/contact">
                Book a diagnostic call
                <Arrow />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
