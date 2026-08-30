/**
 * Wraps every route so a navigation fades in rather than snapping.
 *
 * Opacity only. A transform here would make this element a containing block
 * for the whole page and quietly break the sticky assumption panel and any
 * fixed positioning inside it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-in">{children}</div>;
}
