/**
 * Supabase, wired so its absence is a feature rather than a build failure.
 *
 * The site is deployed and serving. If the environment variables are not set —
 * on a preview build, in a fork, or before the project is created — every
 * function here returns null and the auth UI renders a plain "sign-in is not
 * configured yet" state. Nothing throws, the build still prerenders, and the
 * marketing site is unaffected. That is the whole design constraint.
 */

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Whether sign-in can work at all.
 *
 * Read at module scope from statically-inlined NEXT_PUBLIC values, so it is
 * the same answer on the server and in the browser and cannot cause a
 * hydration mismatch.
 */
export const authConfigured = Boolean(url && anonKey);

let cached: SupabaseClient | null = null;

/** The browser client, or null when Supabase is not configured. */
export function supabase(): SupabaseClient | null {
  if (!authConfigured) return null;
  if (!cached) cached = createBrowserClient(url!, anonKey!);
  return cached;
}

/** OAuth providers offered on the sign-in page. */
export const OAUTH_PROVIDERS = [
  { id: "google", label: "Google" },
  { id: "azure", label: "Microsoft" },
] as const;

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number]["id"];

/** Extra scopes some providers need before they return an email address. */
export const OAUTH_SCOPES: Partial<Record<OAuthProvider, string>> = {
  azure: "email openid profile",
};
