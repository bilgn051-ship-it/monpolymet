import React from 'react';
import { Wrench, Clock } from 'lucide-react';
import CompanyCarousel from '../../components/ui/CompanyCarousel';
import companiesHeroImg from '../../assets/companies-hero.jpg';

export default function CompaniesPage({ lang = 'mn', t, pageMetadata, setCurrentPage }) {
  // Түр засварын төлөв: (true = Засвартай, false = Хуучин картуудыг буцаан харуулах)
  const isUnderMaintenance = true;

  if (isUnderMaintenance) {
    return (
      <div style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '560px',
          width: '100%',
          padding: '40px 24px',
          textAlign: 'center'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            backgroundColor: '#f1f5f9',
            border: '1px solid #e2e8f0',
            color: '#475569',
            fontSize: '13px',
            fontWeight: '600',
            fontFamily: "'Montserrat', sans-serif",
            marginBottom: '24px',
            letterSpacing: '0.02em'
          }}>
            <Clock size={14} />
            <span>{lang === 'mn' ? 'Шинэчлэлт хийгдэж байна' : 'Under Maintenance'}</span>
          </div>

          {/* Icon */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            color: '#334155'
          }}>
            <Wrench size={32} strokeWidth={1.8} />
          </div>

          {/* Page Title */}
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: '800',
            fontFamily: "'Montserrat', sans-serif",
            color: '#0f172a',
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em'
          }}>
            {lang === 'mn' ? 'Компаниуд' : 'Companies'}
          </h1>

          {/* Maintenance Notice Subtitle */}
          <p style={{
            fontSize: 'clamp(16px, 2.5vw, 18px)',
            fontWeight: '500',
            color: '#64748b',
            fontFamily: "'Inter', sans-serif",
            margin: '0'
          }}>
            {lang === 'mn' ? 'Хуудас түр засвартай байна' : 'This page is currently under maintenance'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Full Bleed Hero Banner */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url(${pageMetadata?.header?.imageUrl || companiesHeroImg})`,
        backgroundPosition: 'center 40%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0f172a',
        minHeight: '80vh',
        imageRendering: '-webkit-optimize-contrast'
      }}>
        <div className="full-bleed-banner-overlay" style={{
          background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.65) 100%)'
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
