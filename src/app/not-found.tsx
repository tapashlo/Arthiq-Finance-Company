import { Arrow, Button, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center py-32">
      <div className="shell relative">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-7 max-w-3xl text-5xl leading-[1.05] text-navy md:text-7xl">
          This page has been rebalanced away.
        </h1>
        <p className="mt-8 max-w-xl text-xl leading-relaxed text-ink-soft">
          The address you followed does not exist. Everything else is where you
          left it.
        </p>
        <div className="mt-11 flex flex-col gap-3.5 sm:flex-row">
          <Button href="/">
            Back to home
            <Arrow />
          </Button>
          <Button href="/contact" variant="outline">
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}
