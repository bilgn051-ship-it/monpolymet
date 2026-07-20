
/**
 * The tag + title + subtitle heading block repeated at the top of most pages.
 * Renders as a fragment so it drops into existing page containers without
 * changing the surrounding layout.
 */
export default function SectionHeader({ tag, title, subtitle, pageMetadata, lang }) {
  const displayTag = pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.tagMn : pageMetadata.header.tagEn) || tag : tag;
  const displayTitle = pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) || title : title;
  const displaySubtitle = pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) || subtitle : subtitle;

  return (
    <>
      <h2>{displayTitle}</h2>
      {displaySubtitle && <p className="subtitle">{displaySubtitle}</p>}
    </>
  );
}

// Trigger HMR
