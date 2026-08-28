import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/ui";
import { disclosures, site, testimonialDisclosure } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclosures",
  description:
    "Regulatory disclosures, privacy practices and Form ADV information for Arthiq Wealth Management, LLC.",
  robots: { index: false, follow: true },
};

const sections = [
  ...disclosures.map((d) => ({ ...d, id: undefined as string | undefined })),
  {
    id: "testimonials",
    title: "Testimonials",
    body: testimonialDisclosure,
  },
  {
    id: "privacy",
    title: "Privacy",
    body: "This demonstration site sets no cookies, runs no analytics and transmits no form data. In production, information you provide would be used solely to respond to your enquiry and to deliver advisory services, and would not be sold or shared with third parties for marketing. A full privacy notice is delivered at onboarding and annually thereafter.",
  },
  {
    id: "adv",
    title: "Form ADV & Form CRS",
    body: "Our Form ADV Part 2A brochure, Part 2B supplements and Form CRS relationship summary describe our services, fees, conflicts of interest and disciplinary history. They are provided before any advisory agreement is signed, and are available on request at any time. Current filings are also available through the SEC's Investment Adviser Public Disclosure website.",
  },
];

export default function DisclosuresPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclosures"
        lede={`Regulatory, privacy and content disclosures for ${site.legalName}.`}
      />

      <section className="grain relative py-20 md:py-28">
        <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-12">
          <nav aria-label="Disclosures" className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="label text-ink-faint">On this page</h2>
              <ul className="mt-6 space-y-3.5">
                {sections.map((s) => (
                  <li key={s.title}>
                    <a
                      href={`#${s.id ?? slugify(s.title)}`}
                      className="link-reveal text-base text-ink-soft hover:text-forest"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="lg:col-span-8">
            <div className="max-w-2xl">
              <Reveal>
                <div className="rounded-xs border border-gold/30 bg-gold/6 p-7">
                  <h2 className="label text-gold">Demonstration site</h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">
                    Arthiq is a fictional firm created for a website design.
                    Every name, figure, biography, holding and testimonial on
                    this site is an illustrative placeholder. Nothing here has
                    been reviewed for regulatory compliance, and it must not be
                    published as-is by a real advisory firm.
                  </p>
                </div>
              </Reveal>

              {sections.map((s, i) => (
                <Reveal key={s.title} delay={Math.min(i, 4) * 50}>
                  <section
                    id={s.id ?? slugify(s.title)}
                    className="scroll-mt-32 border-t border-rule pt-8 mt-14"
                  >
                    <h2 className="text-2xl leading-snug text-forest md:text-3xl">
                      {s.title}
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                      {s.body}
                    </p>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
