"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { authConfigured, supabase } from "@/lib/supabase/client";

export type AuthState = {
  user: User | null;
  /** True until the first auth check resolves, so the UI can avoid flicker. */
  loading: boolean;
  configured: boolean;
};

/**
 * Current signed-in user, or null.
 *
 * Starts in a loading state rather than assuming signed-out: rendering a
 * "Sign in" button and then swapping it for an account menu a tick later is
 * the flicker that makes an app feel cheap.
 */
export function useUser(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(authConfigured);

  useEffect(() => {
    const client = supabase();
    if (!client) return;

    let active = true;
    client.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(data.user ?? null);
      setLoading(false);
    });

    const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, loading, configured: authConfigured };
}
