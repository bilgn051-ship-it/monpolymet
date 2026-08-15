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
        backgroundColor: '#0f172a',
        backgroundImage: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(37, 99, 235, 0.22), rgba(15, 23, 42, 1))',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          padding: '48px 32px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#93c5fd',
            fontSize: '13px',
            fontWeight: '600',
            fontFamily: "'Montserrat', sans-serif",
            marginBottom: '28px',
            letterSpacing: '0.02em'
          }}>
            <Clock size={15} className="animate-spin-slow" />
            <span>{lang === 'mn' ? 'Шинэчлэлт хийгдэж байна' : 'Under Maintenance'}</span>
          </div>

          {/* Icon */}
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '22px',
            backgroundColor: 'rgba(37, 99, 235, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            color: '#60a5fa',
            boxShadow: '0 0 30px rgba(37, 99, 235, 0.2)'
          }}>
            <Wrench size={36} strokeWidth={1.8} />
          </div>

          {/* Page Title */}
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: '800',
            fontFamily: "'Montserrat', sans-serif",
            color: '#ffffff',
            margin: '0 0 12px 0',
            letterSpacing: '-0.02em'
          }}>
            {lang === 'mn' ? 'Компаниуд' : 'Companies'}
          </h1>

          {/* Maintenance Notice Subtitle */}
          <p style={{
            fontSize: 'clamp(16px, 2.5vw, 19px)',
            fontWeight: '500',
            color: '#94a3b8',
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
