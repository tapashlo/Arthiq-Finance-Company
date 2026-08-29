import Image, { type StaticImageData } from "next/image";
import { InView, Reveal } from "./Reveal";

type Src = { src: StaticImageData; alt: string };

/**
 * Full-bleed photographic band with an optional statement over it.
 *
 * The image is a static import, so Next emits intrinsic dimensions and a blur
 * placeholder — the band reserves its height before the photo arrives and
 * nothing shifts. `sizes="100vw"` because it always spans the viewport.
 */
export function ImageBand({
  image,
  eyebrow,
  title,
  body,
  height = "tall",
  priority = false,
}: {
  image: Src;
  eyebrow?: string;
  title?: React.ReactNode;
  body?: string;
  height?: "tall" | "short";
  priority?: boolean;
}) {
  return (
    <InView
      as="section"
      className={[
        "img-frame relative isolate flex items-end",
        height === "tall"
          ? "min-h-[26rem] md:min-h-[38rem]"
          : "min-h-[18rem] md:min-h-[24rem]",
      ].join(" ")}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Legibility scrim. Heavier at the foot, where the text sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/85 via-navy-deep/45 to-navy-deep/15"
      />

      {(title || body) && (
        <div className="shell w-full py-14 md:py-20">
          <Reveal>
            {eyebrow && (
              <p className="eyebrow label text-blue-pale">{eyebrow}</p>
            )}
            {title && (
              <h2 className="mt-6 max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl md:text-[3.5rem]">
                {title}
              </h2>
            )}
            {body && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
                {body}
              </p>
            )}
          </Reveal>
        </div>
      )}
    </InView>
  );
}

/**
 * Inline figure. `sizes` must describe the real rendered width at each
 * breakpoint or the browser downloads a file far larger than it paints.
 */
export function Figure({
  image,
  aspect = "aspect-4/3",
  sizes = "(min-width: 1024px) 42vw, 100vw",
  className = "",
}: {
  image: Src;
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <InView className={`img-frame relative ${aspect} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        placeholder="blur"
        sizes={sizes}
        className="object-cover"
      />
    </InView>
  );
}
