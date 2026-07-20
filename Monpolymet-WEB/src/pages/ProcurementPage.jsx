import { Mail, Phone, Building2, ShieldCheck, Handshake, ChevronRight } from 'lucide-react';
import '../styles/procurement-pro.css';

export default function ProcurementPage({ lang, t, procurementContent, pageMetadata }) {
  const header = procurementContent?.header;
  const intro = procurementContent?.intro;
  const contactInfo = procurementContent?.contactInfo;

  return (
    <>
      {/* Full Bleed Hero Banner */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80')`,
        backgroundColor: '#0f172a'
      }}>
        <div className="full-bleed-banner-overlay"></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up">
            <h1 className="hero-title">
              {header ? (lang === 'mn' ? header.titleMn : header.titleEn) : (pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : (lang === 'mn' ? 'Худалдан авалт' : 'Procurement'))}
            </h1>
            <p className="hero-subtitle">
              {header ? (lang === 'mn' ? header.subtitleMn : header.subtitleEn) : (pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) : (lang === 'mn' ? 'Монполимет групп нь дотоодын болон олон улсын шилдэг ханган нийлүүлэгчидтэй урт хугацааны, харилцан ашигтай хамтын ажиллагааг эрхэмлэдэг.' : 'Monpolymet Group values long-term, mutually beneficial cooperation with top domestic and international suppliers.'))}
            </p>
          </div>
        </div>
      </div>

      <div className="procurement-pro-container">
        {/* Intro Section */}
        {intro && (intro.titleMn || intro.textMn) && (
          <div id="procurement-policy" className="pro-intro animate-slide-up">
            <h2 className="pro-intro-title">
              {lang === 'mn' ? intro.titleMn : intro.titleEn}
            </h2>
            <p className="pro-intro-text">
              {lang === 'mn' ? intro.textMn : intro.textEn}
            </p>
          </div>
        )}

        {/* Minimalist Grid Layout */}
        <div id="tender" className="pro-bento-grid">

          {/* Card 1: Transparent */}
          <div className="pro-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="pro-icon-box">
              <ShieldCheck size={36} strokeWidth={1.5} />
            </div>
            <h3 className="pro-card-title">{lang === 'mn' ? 'Ил тод, Нээлттэй' : 'Transparent & Open'}</h3>
            <p className="pro-card-text">{lang === 'mn' ? 'Сонгон шалгаруулалт үнэн зөв, шударга зарчмаар явагддаг бөгөөд бүх оролцогчдод тэгш боломж олгоно.' : 'The selection process is fair and provides equal opportunities to all participants.'}</p>
          </div>

          {/* Card 2: Long term */}
          <div className="pro-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="pro-icon-box">
              <Handshake size={36} strokeWidth={1.5} />
            </div>
            <h3 className="pro-card-title">{lang === 'mn' ? 'Урт хугацааны түншлэл' : 'Long-term Partnership'}</h3>
            <p className="pro-card-text">{lang === 'mn' ? 'Бид харилцан ашигтай, тогтвортой хамтын ажиллагааг чухалчилж, найдвартай түншлэлийг бий болгоно.' : 'We prioritize mutually beneficial, sustainable cooperation and build reliable partnerships.'}</p>
          </div>

          {/* Card 3: National */}
          <div className="pro-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="pro-icon-box">
              <Building2 size={36} strokeWidth={1.5} />
            </div>
            <h3 className="pro-card-title">{lang === 'mn' ? 'Үндэсний үйлдвэрлэл' : 'National Industry'}</h3>
            <p className="pro-card-text">{lang === 'mn' ? 'Дотоодын үйлдвэрлэгчдийг дэмжих замаар эх орныхоо бүтээн байгуулалт, эдийн засагт бодитой хувь нэмэр оруулна.' : 'We contribute to domestic development and the economy by supporting local manufacturers.'}</p>
          </div>

          {/* Card 4: Wide Contact Card */}
          <div className="pro-card pro-card-wide animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                {lang === 'mn' ? 'Хамтран ажиллах хүсэлтэй байна уу?' : 'Ready to partner with us?'}
              </h2>
              <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '3rem', maxWidth: '600px' }}>
                {lang === 'mn' ? 'Та доорх сувгуудаар дамжуулан манай худалдан авалтын багтай шууд холбогдох боломжтой. Ажлын цаг: Даваа - Баасан, 09:00 - 18:00' : 'You can reach our procurement team directly through the channels below. Working hours: Mon - Fri, 09:00 - 18:00'}
              </p>

              <div className="pro-contact-badges">
                <a href={`tel:${contactInfo?.phone || '+976 7011 8012'}`} className="pro-badge">
                  <Phone size={24} strokeWidth={1.5} />
                  {contactInfo?.phone || '+976 7011 8012'}
                </a>
                <a href={`mailto:${contactInfo?.email || 'procurement@monpolymet.mn'}`} className="pro-badge">
                  <Mail size={24} strokeWidth={1.5} />
                  {contactInfo?.email || 'procurement@monpolymet.mn'}
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={64} color="rgba(255,255,255,0.2)" strokeWidth={1} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

