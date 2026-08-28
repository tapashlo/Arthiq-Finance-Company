import Link from "next/link";
import { Wordmark } from "./Logo";
import { nav, services, site } from "@/lib/site";

const legal = [
  { href: "/disclosures", label: "Disclosures" },
  { href: "/disclosures#privacy", label: "Privacy" },
  { href: "/disclosures#adv", label: "Form ADV & CRS" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest text-cream/80">
      <div className="shell relative py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Wordmark className="w-full max-w-sm text-cream" />
            <p className="mt-8 max-w-sm text-xl leading-relaxed text-cream/70">
              Fee-only fiduciary wealth management for families across the
              United States.
            </p>

            <address className="mt-10 space-y-1 text-base not-italic leading-relaxed text-cream/60">
              <div>{site.address.line1}</div>
              <div>
                {site.address.city}, {site.address.state} {site.address.zip}
              </div>
            </address>

            <div className="mt-4 flex flex-col text-base">
              <a
                href={site.phoneHref}
                className="link-reveal tap w-fit tnum text-cream/80 hover:text-cream"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="link-reveal tap w-fit text-cream/80 hover:text-cream"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            <FooterCol title="Firm">
              {nav.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
              <FooterLink href="/portal">Client login</FooterLink>
            </FooterCol>

            <FooterCol title="Services">
              {services.map((s) => (
                <FooterLink key={s.slug} href={`/services#${s.slug}`}>
                  {s.title.replace("Portfolio & investment management", "Investment management")}
                </FooterLink>
              ))}
              <FooterLink href="/about#process">Working together</FooterLink>
              <FooterLink href="/about#the-mark">The mark</FooterLink>
            </FooterCol>

            <FooterCol title="Legal">
              {legal.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterCol>
          </div>
        </div>

        <div className="mt-20 border-t border-rule-invert pt-10">
          <p className="max-w-4xl text-sm leading-relaxed text-cream/45">
            {site.legalName} is a registered investment adviser. Registration
            does not imply a certain level of skill or training. Investing
            involves risk, including possible loss of principal. Past
            performance does not guarantee future results. Nothing on this site
            is investment, tax or legal advice, or an offer to buy or sell any
            security.{" "}
            <Link href="/disclosures" className="link-reveal text-cream/70">
              Read the full disclosures
            </Link>
            .
          </p>

          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-gold-pale/70">
            Demonstration site. All figures, holdings, names, biographies and
            testimonials shown are illustrative placeholders created for design
            purposes and do not represent real accounts, people or results.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="label-sm text-cream/40">
              © {new Date().getFullYear()} {site.legalName}
            </p>
            <p className="label-sm text-cream/40">
              San Francisco, California
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="label text-cream/40">{title}</h2>
      <ul className="mt-5 space-y-1">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="link-reveal tap text-base text-cream/70 transition-colors duration-300 hover:text-cream"
      >
        {children}
      </Link>
    </li>
  );
}
