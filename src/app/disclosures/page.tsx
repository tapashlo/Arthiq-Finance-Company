import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/ui";
import { disclosures, site, testimonialDisclosure } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclosures",
  description:
    "Disclosures, privacy practices and the limits of the examples shown on this site.",
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
    id: "security",
    title: "Security",
    body: "Account connections are read-only and token-based, so ArthIQ never stores your banking credentials. Data is encrypted in transit and at rest, access is limited to the people assigned to your account, and nothing is sold or shared with data brokers, advertisers or lead buyers. You can disconnect an institution or request deletion of your data at any time. This demonstration site connects to nothing and stores nothing.",
  },
  {
    id: "privacy",
    title: "Privacy",
    body: "This demonstration site sets no cookies, runs no analytics and transmits no form data. In production, information you provide through the contact form would be used solely to respond to your enquiry and would not be sold or shared for marketing.",
  },
];

export default function DisclosuresPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclosures"
        lede={`Disclosures, privacy practices and the limits of what is on this site, for ${site.legalName}.`}
      />

      <section className="relative py-20 md:py-28">
        <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-12">
          <nav aria-label="Disclosures" className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="label text-ink-faint">On this page</h2>
              <ul className="mt-5 space-y-0.5">
                {sections.map((s) => (
                  <li key={s.title}>
                    <a
                      href={`#${s.id ?? slugify(s.title)}`}
                      className="link-reveal tap text-base text-ink-soft hover:text-navy"
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
                <div className="rounded-lg border border-warn/30 bg-warn/6 p-7">
                  <h2 className="label text-warn">Demonstration site</h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">
                    ArthIQ is a fictional firm created for a website design.
                    Every name, figure, biography and testimonial on this site is
                    an illustrative placeholder, including every chart in the work
                    examples. Nothing here has been reviewed by
                    a lawyer or an accountant, and it must not be published as-is
                    by a real firm.
                  </p>
                </div>
              </Reveal>

              {sections.map((s, i) => (
                <Reveal key={s.title} delay={Math.min(i, 4) * 50}>
                  <section
                    id={s.id ?? slugify(s.title)}
                    className="scroll-mt-32 border-t border-rule pt-8 mt-14"
                  >
                    <h2 className="text-2xl leading-snug text-navy md:text-3xl">
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
