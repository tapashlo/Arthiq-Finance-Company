"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";
import { nav } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel on navigation, and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-rule bg-cream/88 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="shell flex h-20 items-center justify-between gap-8 md:h-24">
        <Link
          href="/"
          aria-label="ArthIQ — home"
          className="-my-2 shrink-0 py-2 text-forest transition-opacity duration-300 hover:opacity-70"
        >
          <Wordmark simplified className="h-8 w-auto md:h-9" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "label link-reveal tap transition-colors duration-300",
                  active ? "text-green" : "text-ink-soft hover:text-forest",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/portal"
            className="label tap text-ink-soft transition-colors duration-300 hover:text-forest"
          >
            Client login
          </Link>
          <Link
            href="/contact"
            className="label rounded-xs bg-forest px-5 py-3.5 text-cream transition-colors duration-300 hover:bg-green"
          >
            Book a call
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="label -mr-2 flex items-center gap-3 px-3 py-4 text-forest lg:hidden"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={[
                "absolute left-0 block h-px w-5 bg-current transition-transform duration-300",
                open ? "top-1.5 rotate-45" : "top-0",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 block h-px w-5 bg-current transition-transform duration-300",
                open ? "top-1.5 -rotate-45" : "top-3",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="grain relative h-[calc(100dvh-5rem)] overflow-y-auto border-t border-rule bg-cream lg:hidden"
      >
        <div className="shell flex flex-col py-8">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="fade-up border-b border-rule-soft py-5 text-3xl text-forest"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/contact"
              className="label rounded-xs bg-forest px-6 py-4.5 text-center text-cream"
            >
              Book a call
            </Link>
            <Link
              href="/portal"
              className="label rounded-xs border border-rule px-6 py-4.5 text-center text-forest"
            >
              Client login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
