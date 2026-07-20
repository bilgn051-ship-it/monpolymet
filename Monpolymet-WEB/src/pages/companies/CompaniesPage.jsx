import GroupStructure from '../../components/ui/GroupStructure';

export default function CompaniesPage({ lang, t, pageMetadata }) {
  return (
    <>
      {/* Full Bleed Hero Banner */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url(${pageMetadata?.header?.imageUrl || 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1920&q=80'})`,
        backgroundColor: '#0f172a'
      }}>
        <div className="full-bleed-banner-overlay"></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up">
            <h1 className="hero-title">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : (lang === 'mn' ? 'Компаниуд' : 'Companies')}
            </h1>
            <p className="hero-subtitle">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="sectors-page-container container-padding">
        <GroupStructure lang={lang} t={t} />
      </div>
    </>
  );
}

