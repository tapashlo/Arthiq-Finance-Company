"use client";

/**
 * Where the OAuth provider and the confirmation email land.
 *
 * The exchange happens in the browser rather than in a route handler, which
 * keeps every route on this site statically prerendered. supabase-js completes
 * a PKCE exchange itself when it sees `?code=`; the explicit call below is the
 * fallback for when it has not, so a slow provider does not leave the visitor
 * on a spinner forever.
 */

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authConfigured, supabase } from "@/lib/supabase/client";

function safeNext(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/model";
  return value;
}

export function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = supabase();
    if (!client) {
      setError("Sign-in is not configured on this deployment.");
      return;
    }

    // A provider that refuses reports it in the query string, not as a code.
    const denied = params.get("error_description") ?? params.get("error");
    if (denied) {
      setError(denied);
      return;
    }

    const next = safeNext(params.get("next"));
    let cancelled = false;

    (async () => {
      const { data } = await client.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        router.replace(next);
        return;
      }

      const code = params.get("code");
      if (code) {
        const { error } = await client.auth.exchangeCodeForSession(code);
        if (cancelled) return;
        if (error) {
          setError(error.message);
          return;
        }
        router.replace(next);
        return;
      }

      setError("That sign-in link has expired or was already used.");
    })();

    return () => {
      cancelled = true;
    };
  }, [params, router]);

  if (error) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="display text-2xl text-navy">Could not sign you in</h1>
        <p className="mt-4 leading-relaxed text-ink-soft">{error}</p>
        <Link href="/signin" className="label link-reveal tap mt-6 text-blue">
          Try again
        </Link>
      </div>
    );
  }

  return (
    <p className="text-ink-faint" aria-live="polite">
      {authConfigured ? "Signing you in…" : "Sign-in is not configured."}
    </p>
  );
}
