"use client";

/**
 * The account corner of the header.
 *
 * Renders nothing at all when Supabase is not configured, so an unconfigured
 * deployment does not offer a sign-in that cannot work.
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "./useUser";
import { supabase } from "@/lib/supabase/client";

export function AccountNav({ variant = "bar" }: { variant?: "bar" | "panel" }) {
  const { user, loading, configured } = useUser();
  const router = useRouter();

  if (!configured) return null;

  async function signOut() {
    await supabase()?.auth.signOut();
    router.refresh();
  }

  const panel = variant === "panel";

  // Reserve the space while the session resolves, so the header does not
  // reflow under the reader a tick after paint.
  if (loading) {
    return <span aria-hidden="true" className={panel ? "block h-12" : "block h-5 w-16"} />;
  }

  if (!user) {
    return (
      <Link
        href="/signin"
        className={
          panel
            ? "label rounded-lg border border-rule px-6 py-4.5 text-center text-navy"
            : "label tap text-ink-soft transition-colors duration-300 hover:text-navy"
        }
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className={panel ? "flex flex-col gap-3" : "flex items-center gap-4"}>
      <Link
        href="/model"
        className={
          panel
            ? "label rounded-lg border border-rule px-6 py-4.5 text-center text-navy"
            : "label tap text-ink-soft transition-colors duration-300 hover:text-navy"
        }
      >
        My scenarios
      </Link>
      <button
        type="button"
        onClick={() => void signOut()}
        className={
          panel
            ? "label rounded-lg border border-rule px-6 py-4.5 text-center text-ink-faint"
            : "label tap text-ink-faint transition-colors duration-300 hover:text-navy"
        }
      >
        Sign out
      </button>
    </div>
  );
}
