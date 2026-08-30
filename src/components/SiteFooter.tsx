import Link from "next/link";
import { Wordmark } from "./Logo";
import { lines } from "@/lib/lines";
import { site } from "@/lib/site";

const company = [
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/work", label: "Our work" },
  { href: "/contact", label: "Contact" },
  { href: "/portal", label: "Sign in" },
];

const legal = [
  { href: "/disclosures", label: "Disclosures" },
  { href: "/disclosures#security", label: "Security" },
  { href: "/disclosures#privacy", label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="on-navy relative overflow-hidden bg-navy text-white/80">
      <div className="shell relative py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Wordmark className="w-full max-w-xs" />
            <p className="mt-8 max-w-sm text-xl leading-relaxed text-white/70">
              {site.subtitle}
            </p>

            <p className="mt-9 text-base leading-relaxed text-white/60">{site.based}</p>

            <div className="mt-4 flex flex-col text-base">
              <a
                href={site.phoneHref}
                className="link-reveal tap w-fit tnum text-white/80 hover:text-white"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="link-reveal tap w-fit text-white/80 hover:text-white"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            <FooterCol title="Product">
              {lines.map((l) => (
                <FooterLink key={l.slug} href={l.href}>
                  {l.name}
                </FooterLink>
              ))}
              <FooterLink href="/pricing">Pricing</FooterLink>
            </FooterCol>

            <FooterCol title="Company">
              {company.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
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
          <p className="max-w-4xl text-sm leading-relaxed text-white/45">
            {site.legalName} provides accounting, financial planning and
            analysis, management reporting and personal money-management
            services. We are not a bank, a custodian, a registered investment
            adviser, a licensed public accounting firm or a law firm. All account
            connections are read-only, and nothing on this site is investment,
            accounting, tax or legal advice.{" "}
            <Link href="/disclosures" className="link-reveal text-white/70">
              Read the full disclosures
            </Link>
            .
          </p>

          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-blue-pale/70">
            Demonstration site. Every dashboard, figure, price, company name,
            biography and testimonial shown is an illustrative placeholder
            created for design purposes and does not represent real clients,
            people or results.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="label-sm text-white/40">
              © {new Date().getFullYear()} {site.legalName}
            </p>
            <p className="label-sm text-white/40">United States</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label text-white/40">{title}</h2>
      <ul className="mt-5 space-y-1">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="link-reveal tap text-base text-white/70 transition-colors duration-300 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
