"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Marks an element the first time it reaches the fold.
 *
 * Observer callbacks are delivered asynchronously and can be coalesced, so a
 * fast scroll may report an element that has already left the viewport above.
 * Treating "has reached the fold" as shown means nothing is ever stranded
 * invisible behind a flick scroll.
 */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Without IntersectionObserver, show everything rather than nothing.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting ||
            entry.boundingClientRect.top < window.innerHeight
          ) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

type RevealProps = {
  children: ReactNode;
  /** Stagger, in ms, applied as a CSS transition-delay. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/** Fades and lifts its children into view once. Neutralised by reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const { ref, shown } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-shown={shown ? "true" : "false"}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

/**
 * Sets data-shown without applying the fade-and-lift itself — for elements
 * that carry their own entrance, such as `.img-frame`.
 */
export function InView({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const { ref, shown } = useInView<HTMLElement>();

  return (
    <Tag ref={ref} className={className} data-shown={shown ? "true" : "false"}>
      {children}
    </Tag>
  );
}
