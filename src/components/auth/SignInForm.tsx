"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { authConfigured, OAUTH_PROVIDERS, OAUTH_SCOPES, supabase, type OAuthProvider } from "@/lib/supabase/client";

/** Only same-origin paths, so `?next=` cannot be used as an open redirect. */
function safeNext(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/model";
  return value;
}

const inputClass =
  "min-h-12 w-full rounded-lg border border-rule bg-white px-4 text-[0.9375rem] text-navy placeholder:text-ink-faint focus:border-blue focus:outline-none";

export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const { user, loading } = useUser();

  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (user) router.replace(next);
  }, [user, next, router]);

  if (!authConfigured) {
    return (
      <div className="rounded-xl border border-warn/30 bg-warn/6 p-7">
        <h2 className="label text-warn">Sign-in not configured</h2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          This deployment has no Supabase project connected yet. Set{" "}
          <code className="rounded bg-canvas-deep px-1.5 py-0.5 text-[0.85em]">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-canvas-deep px-1.5 py-0.5 text-[0.85em]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
          and redeploy. Everything else on the site works without them.
        </p>
      </div>
    );
  }

  async function withPassword(e: React.FormEvent) {
    e.preventDefault();
    const client = supabase();
    if (!client) return;
    setBusy("password");
    setError(null);
    setNotice(null);

    const fn =
      mode === "in"
        ? client.auth.signInWithPassword({ email, password })
        : client.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
          });

    const { data, error } = await fn;
    if (error) setError(error.message);
    else if (mode === "up" && !data.session) {
      setNotice("Check your email to confirm the address, then sign in.");
    }
    setBusy(null);
  }

  async function withProvider(provider: OAuthProvider) {
    const client = supabase();
    if (!client) return;
    setBusy(provider);
    setError(null);
    const { error } = await client.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        scopes: OAUTH_SCOPES[provider],
      },
    });
    if (error) {
      setError(error.message);
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        {OAUTH_PROVIDERS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => void withProvider(p.id)}
            disabled={busy !== null || loading}
            className="label flex min-h-13 items-center justify-center gap-3 rounded-lg border border-rule bg-white text-navy transition-all duration-300 hover:border-navy hover:shadow-lift disabled:opacity-50"
          >
            {busy === p.id ? "Redirecting…" : `Continue with ${p.label}`}
          </button>
        ))}
      </div>

      <div className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-rule" />
        <span className="label-sm text-ink-faint">or with email</span>
        <span className="h-px flex-1 bg-rule" />
      </div>

      <form onSubmit={withPassword} className="flex flex-col gap-3">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputClass}
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete={mode === "in" ? "current-password" : "new-password"}
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={mode === "in" ? "Password" : "Password — at least 8 characters"}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={busy !== null}
          className="label min-h-13 rounded-lg bg-navy text-white transition-colors duration-300 hover:bg-blue disabled:opacity-50"
        >
          {busy === "password" ? "Working…" : mode === "in" ? "Sign in" : "Create account"}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 rounded-lg border border-loss/25 bg-loss-soft/50 px-4 py-3 text-sm text-loss">
          {error}
        </p>
      )}
      {notice && (
        <p className="mt-4 rounded-lg border border-gain/25 bg-gain-soft/50 px-4 py-3 text-sm text-gain">{notice}</p>
      )}

      <p className="mt-6 text-sm text-ink-soft">
        {mode === "in" ? "No account yet?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "in" ? "up" : "in");
            setError(null);
            setNotice(null);
          }}
          className="link-reveal font-medium text-blue"
        >
          {mode === "in" ? "Create one" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
