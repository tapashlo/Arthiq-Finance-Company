import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCallback } from "@/components/auth/AuthCallback";

export const metadata: Metadata = {
  title: "Signing in",
  robots: { index: false, follow: false },
};

export default function AuthCallbackPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-canvas px-6 pt-24">
      <Suspense fallback={<p className="text-ink-faint">Signing you in…</p>}>
        <AuthCallback />
      </Suspense>
    </section>
  );
}
