import React from 'react';
import CompanyCarousel from '../../components/ui/CompanyCarousel';
import companiesHeroImg from '../../assets/companies-hero.jpg';

export default function CompaniesPage({ lang, t, pageMetadata }) {
  return (
    <>
      {/* Full Bleed Hero Banner */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url(${companiesHeroImg})`,
        backgroundPosition: 'center 40%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0f172a',
        minHeight: '60vh',
        imageRendering: '-webkit-optimize-contrast'
      }}>
        <div className="full-bleed-banner-overlay" style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.35) 100%)'
        }}></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up">
            <h1 className="hero-title" style={{ color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : (lang === 'mn' ? 'Компаниуд' : 'Companies')}
            </h1>
            <p className="hero-subtitle" style={{ color: '#f8fafc', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) : ''}
            </p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ fontSize: '20px', lineHeight: '1.5', color: '#334155', fontWeight: '500', fontFamily: "'Inter', sans-serif", margin: 0 }}>
            {lang === 'mn' ? 'Монполимет групп нь 1992 онд үүсгэн байгуулагдсан. Уул уурхайн үйлдвэрлэл, байгаль орчны нөхөн сэргээлт, барилгын материал үйлдвэрлэл, барилга байгууламж, гадаад худалдааны чиглэлээр үйл ажиллагаа явуулж буй үндэсний үйлдвэрлэгч-хөрөнгө оруулагч компани юм.' : 'Monpolymet Group was established in 1992. It is a national producer-investor company operating in mining, environmental rehabilitation, building materials manufacturing, construction, and foreign trade.'}
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', paddingBottom: '80px' }}>
        <CompanyCarousel lang={lang} />
      </div>
    </>
  );
}
