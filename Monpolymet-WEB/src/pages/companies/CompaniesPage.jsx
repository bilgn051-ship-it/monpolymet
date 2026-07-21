import React from 'react';
import CompanyCarousel from '../../components/ui/CompanyCarousel';
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

      <div style={{ backgroundColor: '#ffffff', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#334155', fontWeight: '500', fontFamily: "'Inter', sans-serif", margin: 0 }}>
            {lang === 'mn' ? 'Монполимет Групп нь 1992 онд байгуулагдсан. Уул уурхай, байгаль орчны нөхөн сэргээлт, барилгын материал үйлдвэрлэл, барилга байгууламж, гадаад худалдааны чиглэлээр үйл ажиллагаа явуулж буй үндэсний үйлдвэрлэгч – хөрөнгө оруулагч компани юм.' : 'Monpolymet Group was founded in 1992. It is a national manufacturer-investor company operating in mining, environmental rehabilitation, building materials production, construction, and foreign trade.'}
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', paddingBottom: '60px' }}>
        <CompanyCarousel lang={lang} />
      </div>
    </>
  );
}

