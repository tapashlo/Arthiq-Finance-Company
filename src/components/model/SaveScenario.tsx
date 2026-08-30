"use client";

/**
 * Saved scenarios.
 *
 * The reason to have an account: the model you spent ten minutes building is
 * still there next week. Scenarios are stored per user with row-level security
 * in Supabase, so a row is readable only by the account that wrote it.
 *
 * When Supabase is not configured this renders an explanatory card instead of
 * failing — the marketing site has to keep working regardless.
 */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/components/auth/useUser";
import { Arrow } from "@/components/ui";
import { supabase } from "@/lib/supabase/client";
import { sanitise, type Assumptions } from "@/lib/model";

type Row = { id: string; name: string; assumptions: Assumptions; created_at: string };

export function SaveScenario({
  assumptions,
  onLoad,
}: {
  assumptions: Assumptions;
  onLoad: (a: Assumptions) => void;
}) {
  const { user, loading, configured } = useUser();
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const client = supabase();
    if (!client || !user) return;
    const { data, error } = await client
      .from("scenarios")
      .select("id,name,assumptions,created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) setError(error.message);
    else setRows((data ?? []) as Row[]);
  }, [user]);

  useEffect(() => {
    if (user) void refresh();
    else setRows([]);
  }, [user, refresh]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const client = supabase();
    if (!client || !user) return;
    setBusy(true);
    setError(null);
    const { error } = await client.from("scenarios").insert({
      user_id: user.id,
      name: name.trim() || "Untitled scenario",
      assumptions: sanitise(assumptions),
    });
    if (error) setError(error.message);
    else {
      setName("");
      await refresh();
    }
    setBusy(false);
  }

  async function remove(id: string) {
    const client = supabase();
    if (!client) return;
    const { error } = await client.from("scenarios").delete().eq("id", id);
    if (error) setError(error.message);
    else await refresh();
  }

  if (!configured) {
    return (
      <Card title="Saved scenarios">
        <p className="text-sm leading-relaxed text-ink-soft">
          Sign-in is not configured on this deployment yet. Once it is, a scenario you build here can be saved and
          reopened later.
        </p>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card title="Saved scenarios">
        <p className="text-sm text-ink-faint">Checking your session…</p>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card title="Saved scenarios">
        <p className="text-sm leading-relaxed text-ink-soft">
          Sign in and this scenario is still here next week — along with any others you build. Free, and we never
          send you anything you did not ask for.
        </p>
        <Link href="/signin?next=/model" className="label link-reveal tap mt-4 gap-3 text-blue hover:text-navy">
          Sign in to save
          <Arrow />
        </Link>
      </Card>
    );
  }

  return (
    <Card title="Saved scenarios">
      <form onSubmit={save} className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor="scenario-name" className="sr-only">
          Scenario name
        </label>
        <input
          id="scenario-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          placeholder="Series B plan, hiring freeze…"
          className="min-h-11 w-full rounded-lg border border-rule bg-white px-3.5 text-[0.9375rem] text-navy placeholder:text-ink-faint focus:border-blue focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="label min-h-11 shrink-0 rounded-lg bg-navy px-5 text-white transition-colors duration-300 hover:bg-blue disabled:opacity-50"
        >
          {busy ? "Saving…" : "Save"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-loss">{error}</p>}

      {rows.length > 0 ? (
        <ul className="mt-5 divide-y divide-rule-soft border-t border-rule">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
              <button
                type="button"
                onClick={() => onLoad(sanitise(r.assumptions))}
                className="min-w-0 flex-1 text-left"
              >
                <span className="block truncate text-[0.9375rem] text-navy hover:text-blue">{r.name}</span>
                <span className="mt-0.5 block text-xs text-ink-faint">
                  {new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </button>
              <button
                type="button"
                onClick={() => void remove(r.id)}
                aria-label={`Delete ${r.name}`}
                className="label-sm tap shrink-0 px-2 text-ink-faint transition-colors duration-300 hover:text-loss"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-ink-faint">Nothing saved yet. Name this one and it will appear here.</p>
      )}
    </Card>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-rule bg-white p-6 shadow-lift">
      <h3 className="display text-lg text-navy">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}
