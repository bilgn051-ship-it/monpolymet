import React from 'react';
import { Wrench, Clock } from 'lucide-react';
import CompanyCarousel from '../../components/ui/CompanyCarousel';
import companiesHeroImg from '../../assets/companies-hero.jpg';

export default function CompaniesPage({ lang = 'mn', t, pageMetadata, setCurrentPage }) {
  // Түр засварын төлөв: (true = Засвартай, false = Хуучин картуудыг буцаан харуулах)
  const isUnderMaintenance = true;

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

      {isUnderMaintenance ? (
        /* Under Maintenance / Coming Soon Content Section */
        <div style={{ backgroundColor: '#f8fafc', padding: '90px 20px 110px 20px', minHeight: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            maxWidth: '780px',
            width: '100%',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)',
            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Subtle Accent Glow */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '240px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(255,255,255,0) 70%)',
              pointerEvents: 'none'
            }} />

            {/* Animated Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: '24px',
              letterSpacing: '0.02em'
            }}>
              <Clock size={15} className="animate-spin-slow" />
              <span>{lang === 'mn' ? 'Шинэчлэлт хийгдэж байна' : 'Under Maintenance / Coming Soon'}</span>
            </div>

            {/* Main Icon */}
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '22px',
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              color: '#2563eb',
              boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.12)'
            }}>
              <Wrench size={36} strokeWidth={1.8} />
            </div>

            {/* Headline */}
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: '700',
              fontFamily: "'Montserrat', sans-serif",
              color: '#0f172a',
              margin: '0',
              letterSpacing: '-0.02em'
            }}>
              {lang === 'mn' ? 'Хуудас түр засвартай байна' : 'Page is Under Maintenance'}
            </h2>
          </div>
        </div>
      ) : (
        /* Original Company Info & Carousel */
        <>
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
      )}
    </>
  );
}
