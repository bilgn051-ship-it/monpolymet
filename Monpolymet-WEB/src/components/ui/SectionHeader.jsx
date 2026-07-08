
/**
 * The tag + title + subtitle heading block repeated at the top of most pages.
 * Renders as a fragment so it drops into existing page containers without
 * changing the surrounding layout.
 */
export default function SectionHeader({ tag, title, subtitle }) {
  return (
    <>
      {tag && <span className="section-tag">{tag}</span>}
      <h2>{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </>
  );
}
