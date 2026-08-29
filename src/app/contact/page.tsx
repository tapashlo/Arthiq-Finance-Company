import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Figure } from "@/components/Media";
import { images } from "@/lib/images";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { process, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 45-minute diagnostic call with ArthIQ. No documents required, and no obligation.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-rule bg-canvas pt-36 pb-20 md:pt-48 md:pb-24">
        <div className="shell relative">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-7 max-w-4xl text-5xl leading-[1.04] text-navy sm:text-6xl md:text-7xl">
            Start with a conversation.
          </h1>
          <p className="mt-9 max-w-2xl text-xl leading-relaxed text-ink-soft md:text-2xl">
            Forty-five minutes, no documents, no obligation. If we are not the
            right firm for what you are deciding, we will say so and point you
            somewhere better.
          </p>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <aside className="lg:col-span-5 lg:pl-6">
            <Figure
              image={images.workshop}
              aspect="aspect-4/3"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="mb-12 rounded-lg"
            />
            <Reveal delay={120}>
              <div className="border-t border-rule pt-8">
                <h2 className="label text-ink-faint">Directly</h2>
                <div className="mt-5 text-2xl">
                  <div>
                    <a
                      href={site.phoneHref}
                      className="link-reveal tap tnum text-navy hover:text-blue"
                    >
                      {site.phone}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`mailto:${site.email}`}
                      className="link-reveal tap text-navy hover:text-blue"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>

                <address className="mt-10 space-y-1 text-lg not-italic leading-relaxed text-ink-soft">
                  <div>{site.address.line1}</div>
                  <div>
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </div>
                </address>

                <p className="mt-8 text-base leading-relaxed text-ink-faint">
                  Monday to Friday, 8am–5pm Pacific. Calls are answered by the
                  team, not a service.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-14 border-t border-rule pt-8">
                <h2 className="label text-ink-faint">What happens next</h2>
                <ol className="mt-8 space-y-7">
                  {process.slice(0, 3).map((step) => (
                    <li key={step.step} className="flex gap-5">
                      <span className="label-sm tnum mt-1.5 text-blue">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="text-lg text-navy">{step.title}</h3>
                        <p className="mt-2 text-base leading-relaxed text-ink-soft">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-14 rounded-lg border border-rule bg-canvas p-7">
                <h2 className="label text-blue">Existing clients</h2>
                <p className="mt-5 text-base leading-relaxed text-ink-soft">
                  Reach your team directly, or sign in to the dashboard for the
                  latest model, board pack and close checklist.
                </p>
                <a
                  href="/portal"
                  className="label link-reveal tap mt-3 text-navy hover:text-blue"
                >
                  Client login
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
