"use client";

import { useId, useState } from "react";
import { Arrow } from "./ui";

/** Deliberately answerable by a household and by a company. */
const SIZE_BANDS = [
  "Just my household",
  "1–10 people",
  "11–50 people",
  "51–200 people",
  "More than 200 people",
  "Prefer not to say",
];

const TOPICS = ["Personal", "Business", "FP&A", "Not sure yet"];

/**
 * Demonstration form. There is no backend wired up: submitting validates the
 * fields in the browser and shows the confirmation state. Point `onSubmit` at a
 * real endpoint (or a server action) before launch.
 */
export function ContactForm() {
  const id = useId();
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    await new Promise((r) => setTimeout(r, 550));
    setPending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-lg border border-rule bg-paper p-10 shadow-lift md:p-14"
      >
        <p className="label text-blue">Received</p>
        <h2 className="mt-7 text-3xl leading-tight text-navy md:text-4xl">
          Thank you — we&rsquo;ll be in touch within one business day.
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
          You will hear from a person, not a sequence. If it is urgent, call the
          number on this page and someone will pick up.
        </p>
        <p className="mt-10 border-t border-rule-soft pt-6 text-sm leading-relaxed text-ink-faint">
          Demonstration site: this form is not connected to a mailbox and
          nothing was transmitted or stored.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="label link-reveal mt-8 inline-flex items-center gap-3 text-blue hover:text-navy"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className="rounded-lg border border-rule bg-paper p-8 shadow-lift md:p-12"
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Full name" htmlFor={`${id}-name`} required>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </Field>

        <Field label="Email" htmlFor={`${id}-email`} required>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field label="Phone" htmlFor={`${id}-phone`} hint="Optional">
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </Field>

        <Field label="Household or company size" htmlFor={`${id}-size`}>
          <select
            id={`${id}-size`}
            name="size"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select a range
            </option>
            {SIZE_BANDS.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="mt-9">
        <legend className="label text-ink-faint">
          Which are you asking about?
        </legend>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {TOPICS.map((topic, i) => (
            <label
              key={topic}
              className="cursor-pointer rounded-lg border border-rule px-4 py-2.5 text-[0.9375rem] text-ink-soft transition-colors duration-200 has-checked:border-navy has-checked:bg-navy has-checked:text-white"
            >
              <input
                type="radio"
                name="topic"
                value={topic}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {topic}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-9">
        <Field
          label="What are you deciding?"
          htmlFor={`${id}-message`}
          hint="A sentence or two is plenty"
        >
          <textarea
            id={`${id}-message`}
            name="message"
            rows={5}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="label mt-10 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-navy px-7 py-5 text-white transition-colors duration-300 hover:bg-blue disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Request a call"}
        {!pending && <Arrow />}
      </button>

      <p className="mt-7 text-sm leading-relaxed text-ink-faint">
        Demonstration form — not connected to a mailbox. Nothing you type is
        transmitted or stored. Do not enter account numbers or other sensitive
        information here.
      </p>
    </form>
  );
}

const inputClass =
  "ui mt-3 w-full rounded-lg border border-rule bg-paper px-4 py-3.5 text-lg text-ink transition-colors duration-200 placeholder:text-ink-faint focus:border-blue focus:outline-none";

function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label flex items-baseline gap-2 text-ink-faint">
        {label}
        {required && (
          <span aria-hidden="true" className="text-blue">
            *
          </span>
        )}
        {hint && <span className="label-sm text-ink-faint/70">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
