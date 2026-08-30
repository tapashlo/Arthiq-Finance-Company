import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to ArthIQ to save and reopen the scenarios you build.",
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <section className="relative overflow-hidden bg-canvas pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 left-1/2 h-[38rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue-wash blur-3xl"
      />
      <div className="shell relative">
        <div className="mx-auto max-w-md">
          <Link href="/" aria-label="ArthIQ — home" className="mx-auto block w-40 text-navy">
            <Wordmark />
          </Link>

          <h1 className="display mt-10 text-center text-3xl leading-tight text-navy md:text-4xl">
            Save your model.
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-center leading-relaxed text-ink-soft">
            An account keeps the scenarios you build, and nothing else. We do not email you unless you ask us to.
          </p>

          <div className="mt-10 rounded-xl border border-rule bg-white p-7 shadow-lift md:p-8">
            <Suspense fallback={<p className="text-sm text-ink-faint">Loading…</p>}>
              <SignInForm />
            </Suspense>
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-ink-faint">
            By signing in you agree that the scenarios you save are stored on our behalf by Supabase. See the{" "}
            <Link href="/disclosures#privacy" className="link-reveal text-ink-soft">
              privacy notice
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
