import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { fetchTimeline, fetchAboutContent, fetchCoreValues, fetchTeam } from '../../api';
import CEOGreeting from '../home/sections/CEOGreeting';
import HistoryTimeline from '../../components/ui/HistoryTimeline';

function InteractiveTitle({ text, className, style }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <h2
      className={className}
      style={{ ...style, display: 'inline-block', position: 'relative' }}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {text.split('').map((char, idx) => {
        let color = style.color || '#000000';
        
        if (hoveredIdx !== null) {
          const dist = Math.abs(hoveredIdx - idx);
          if (dist === 0) {
            color = '#2563eb';
          } else if (dist === 1) {
            color = '#3b82f6';
          } else if (dist === 2) {
            color = '#93c5fd';
          }
        }

        return (
          <span
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            style={{
              display: 'inline-block',
              transition: 'color 0.15s ease-out',
              color: color,
              cursor: 'default',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </h2>
  );
}

export default function AboutPage({ lang, t, pageMetadata }) {
  const timelineRef = useRef(null);
  const { ref: valuesRef } = useInView({ threshold: 0.1 });
  // eslint-disable-next-line no-unused-vars
  const [timeline, setTimeline] = useState([]);
  const [aboutContent, setAboutContent] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [coreValues, setCoreValues] = useState([]);
  const [team, setTeam] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const fallbackImages = [
    "/Ц.Гарамжав.jpg",
    "/Н.Мөнхнасан.jpg",
    "/Б.Дэлгэр.jpg",
    "/Ц.Халиун.jpg",
    "/2.jpg"
  ];

  const fallbackByNames = {
    "Ц.Гарамжав": "/garamjav.png",
    "Ts.Garamjav": "/garamjav.png",
    "Н.Мөнхнасан": "/monhnasan.png",
    "N.Munkhnasan": "/monhnasan.png",
    "Б.Дэлгэр": "/delger.png",
    "B.Delger": "/delger.png",
    "Ц.Халиун": "/haliun.png",
    "Ts.Haliun": "/haliun.png",
    "Б.Гандөш": "/dosh.png",
    "B.Gandush": "/dosh.png"
  };

  const getValidImageUrl = (member, idx) => {
    if (!member || !member.name) return fallbackImages[idx % 5];
    const name = member.name.toLowerCase();

    if (name.includes('мөнхнасан') || name.includes('munkhnasan')) return '/monhnasan.png';
    if (name.includes('халиун') || name.includes('haliun')) return '/haliun.png';
    if (name.includes('гандөш') || name.includes('gandush')) return '/dosh.png';
    if (name.includes('дэлгэр') || name.includes('delger')) return '/delger.png';
    if (name.includes('гарамжав') || name.includes('garamjav')) return '/garamjav.png';

    return member.imageUrl || fallbackImages[idx % 5];
  };

  useEffect(() => {
    fetchTimeline()
      .then((data) => {
        if (data && data.length) setTimeline(data);
      })
      .catch((e) => console.error("Timeline fetch error:", e));

    fetchAboutContent()
      .then(setAboutContent)
      .catch((e) => console.error("About content fetch error:", e));

    fetchCoreValues()
      .then((data) => {
        if (data && data.length) setCoreValues(data);
      })
      .catch((e) => console.error("Core values fetch error:", e));

    fetchTeam()
      .then((data) => {
        if (data && data.length) setTeam(data);
      })
      .catch((e) => console.error("Team fetch error:", e));
  }, []);

  // Drive the timeline spine's gradient fill from the section's scroll progress.
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const anchor = vh * 0.6; // fill reaches a point 60% down the viewport
      const progress = Math.max(0, Math.min(1, (anchor - rect.top) / (rect.height || 1)));
      el.style.setProperty('--tl-progress', progress.toFixed(4));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(schedule);
      ro.observe(el);
    }
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (ro) ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Remove getValIcon

  const visionTitle = aboutContent?.vision
    ? (lang === 'mn' ? aboutContent.vision.titleMn : aboutContent.vision.titleEn)
    : t.about.visionTitle;

  const visionText = aboutContent?.vision
    ? (lang === 'mn' ? aboutContent.vision.textMn : aboutContent.vision.textEn)
    : t.about.visionText;

  const missionTitle = aboutContent?.mission
    ? (lang === 'mn' ? aboutContent.mission.titleMn : aboutContent.mission.titleEn)
    : t.about.missionTitle;

  const missionText = aboutContent?.mission
    ? (lang === 'mn' ? aboutContent.mission.textMn : aboutContent.mission.textEn)
    : t.about.missionText;



  const valuesTitle = aboutContent
    ? (lang === 'mn' ? aboutContent.valuesTitleMn : aboutContent.valuesTitleEn)
    : t.about.valuesTitle;

  /* const historyTitle = aboutContent
    ? (lang === 'mn' ? aboutContent.historyTitleMn : aboutContent.historyTitleEn)
    : t.about.historyTitle; */

  const leadershipTitle = aboutContent
    ? (lang === 'mn' ? aboutContent.leadershipTitleMn : aboutContent.leadershipTitleEn)
    : t.about.leadershipTitle;

  const ceoGreeting = aboutContent?.leadershipGreeting
    ? (lang === 'mn' ? aboutContent.leadershipGreeting.titleMn : aboutContent.leadershipGreeting.titleEn)
    : t.about.ceoGreeting;

  const ceoGreetingText = aboutContent?.leadershipGreeting
    ? (lang === 'mn' ? aboutContent.leadershipGreeting.textMn : aboutContent.leadershipGreeting.textEn)
    : t.about.ceoGreetingText;

  /* let historyData = timeline && timeline.length > 0
    ? timeline.map(h => ({
      year: h.year,
      title: lang === 'mn' ? h.titleMn : h.titleEn,
      desc: lang === 'mn' ? h.descMn : h.descEn,
      imageUrl: h.imageUrl
    }))
    : []; */

  // Dummy data removed. Just use the actual historyData.

  /* const valuesData = coreValues && coreValues.length > 0
    ? coreValues.sort((a, b) => a.order - b.order).map(v => ({
      title: lang === 'mn' ? v.titleMn : v.titleEn,
      desc: lang === 'mn' ? v.descMn : v.descEn,
      icon: v.icon,
    }))
    : t.about.values; */

  const teamData = team && team.length > 0
    ? team.sort((a, b) => a.order - b.order).map(m => ({
      name: lang === 'mn' ? m.nameMn : m.nameEn,
      role: lang === 'mn' ? m.roleMn : m.roleEn,
      bio: lang === 'mn' ? m.bioMn : m.bioEn,
      edu: lang === 'mn' ? m.eduMn : m.eduEn,
      imageUrl: m.imageUrl,
    }))
    : t.about.team;

  const founder = teamData[0] || {};
  const restTeam = teamData.slice(1);

  const marqueeTop = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1428366890462-dd4baecf492b?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1421757350652-9f65a35effc7?w=600&auto=format&fit=crop&q=60'
  ];
  const marqueeBottom = [
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&auto=format&fit=crop&q=60'
  ];

  /* const introTitle = aboutContent?.intro
    ? (lang === 'mn' ? aboutContent.intro.titleMn : aboutContent.intro.titleEn)
    : '';
  const introText = aboutContent?.intro
    ? (lang === 'mn' ? aboutContent.intro.textMn : aboutContent.intro.textEn)
    : ''; */

  return (
    <>
      <div className="about-page-container">
        {/* Two-row photo collage hero: edge-to-edge images scrolling right → left */}
        <div className="about-hero-collage">
          {/* Overlay and Title */}
          <div className="full-bleed-banner-overlay" style={{ zIndex: 1 }}></div>
          <div className="full-bleed-banner-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2, margin: 'auto' }}>
            <div className="full-bleed-banner-content animate-slide-up">
              <h1 className="hero-title">
                {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : (lang === 'mn' ? 'Бидний тухай' : 'About Us')}
              </h1>
              <p className="hero-subtitle">
                {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) : ''}
              </p>
            </div>
          </div>

          <div className="collage-row" aria-hidden="true" style={{ position: 'relative', zIndex: 0 }}>
            <div className="collage-track collage-track-a">
              {[0, 1, 2, 3].flatMap((rep) =>
                marqueeTop.map((src, i) => (
                  <div className="collage-cell" key={`t-${rep}-${i}`}>
                    <img src={src} alt="" loading="lazy" />
                  </div>
                )),
              )}
            </div>
          </div>
          <div className="collage-row" aria-hidden="true" style={{ position: 'relative', zIndex: 0 }}>
            <div className="collage-track collage-track-b">
              {[0, 1, 2, 3].flatMap((rep) =>
                marqueeBottom.map((src, i) => (
                  <div className="collage-cell" key={`b-${rep}-${i}`}>
                    <img src={src} alt="" loading="lazy" />
                  </div>
                )),
              )}
            </div>
          </div>
        </div>


        {/* CEO Greeting Section moved here */}
        <CEOGreeting lang={lang} t={t} />

        {/* Group Intro & 3 Cards Section */}
        <section className="pickpack-exact-section" ref={valuesRef}>
          <div className="pickpack-exact-container">

            {/* Group Intro Heading */}
            <div id="vision" style={{ textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
              <InteractiveTitle 
                className="no-underline" 
                style={{ fontSize: '50px', fontWeight: '600', letterSpacing: '-0.02em', fontFamily: "'Montserrat', sans-serif", color: '#000000', margin: '0' }}
                text={lang === 'mn' ? 'Группийн танилцуулга' : 'Group Introduction'}
              />
              <div style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: '#475569',
                fontFamily: "'Inter', sans-serif",
                textAlign: 'center',
                margin: '50px auto'
              }}>
                {lang === 'mn' ? (
                  <>
                    <p style={{ marginBottom: '12px' }}>Монполимет Групп нь 1992 онд байгуулагдсан. Уул уурхай, байгаль орчны нөхөн сэргээлт, барилгын материал үйлдвэрлэл, барилга байгууламж, гадаад худалдааны чиглэлээр үйл ажиллагаа явуулж буй үндэсний үйлдвэрлэгч – хөрөнгө оруулагч компани юм.</p>
                    <p>Манай компани үйл ажиллагаа явуулж буй салбар бүртээ байгальд ээлтэй эко шийдэл бүхий шинэ нөү-хау, инноваци, дэвшилтэт технологийг нэвтрүүлэх, ногоон хөгжлийг дэмжихийг эрхэм зорилгоо болгон ажиллаж байна.</p>
                  </>
                ) : (
                  <p>Monpolymet Group was established in 1992. It is a national producer-investor company operating in the fields of mining, environmental rehabilitation, building materials production, construction, and foreign trade. Our company's main goal is to introduce new know-how, innovation, and advanced technology with eco-friendly solutions in every sector we operate in, supporting green development.</p>
                )}
              </div>
            </div>

            {/* Horizontal 3 Cards (Vision, Values, Principles) */}
            <div id="values" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              maxWidth: '1200px',
              margin: '0 auto',
              paddingBottom: '40px'
            }}>
              {/* Card 1: Алсын хараа */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '40px 32px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
                border: '1px solid #cbd5e1', /* Default gray/blackish border */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = '#2563eb';
                  const title = e.currentTarget.querySelector('h3');
                  if (title) title.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  const title = e.currentTarget.querySelector('h3');
                  if (title) title.style.color = '#0f172a';
                }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', fontFamily: "'Montserrat', sans-serif", color: '#0f172a', margin: '0 0 16px 0', transition: 'color 0.3s ease' }}>
                  {lang === 'mn' ? 'Алсын хараа' : 'Vision'}
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.4', color: '#475569', fontFamily: "'Inter', sans-serif", margin: 0 }}>
                  {visionText || (lang === 'mn' ? 'Эх орныхоо баялгийг байгаль орчинд ээлтэй, дэвшилтэт технологиор боловсруулан, үндэсний бүтээн байгуулалт, тогтвортой хөгжлийн түүчээ байна.' : 'Leading national development and sustainable growth through eco-friendly advanced technology.')}
                </p>
              </div>

              {/* Card 2: Үнэт зүйлс */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '40px 32px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
                border: '1px solid #cbd5e1', /* Default gray/blackish border */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = '#2563eb';
                  const title = e.currentTarget.querySelector('h3');
                  if (title) title.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  const title = e.currentTarget.querySelector('h3');
                  if (title) title.style.color = '#0f172a';
                }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', fontFamily: "'Montserrat', sans-serif", color: '#0f172a', margin: '0 0 16px 0', transition: 'color 0.3s ease' }}>
                  {lang === 'mn' ? 'Үнэт зүйлс' : 'Values'}
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.4', color: '#475569', fontFamily: "'Inter', sans-serif", margin: 0 }}>
                  {lang === 'mn' ? 'Хариуцлага, Инноваци, Нөхөн сэргээлт, Хамтын ажиллагааг эрхэмлэн, харилцан итгэлцэл дээр тулгуурлан хамтдаа хөгжинө.' : 'Responsibility, Innovation, Restoration, and Cooperation based on mutual trust and growth.'}
                </p>
              </div>

              {/* Card 3: Зарчим */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '40px 32px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
                border: '1px solid #cbd5e1', /* Default gray/blackish border */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = '#2563eb';
                  const title = e.currentTarget.querySelector('h3');
                  if (title) title.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  const title = e.currentTarget.querySelector('h3');
                  if (title) title.style.color = '#0f172a';
                }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', fontFamily: "'Montserrat', sans-serif", color: '#0f172a', margin: '0 0 16px 0', transition: 'color 0.3s ease' }}>
                  {lang === 'mn' ? 'Зарчим' : 'Principles'}
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.4', color: '#475569', fontFamily: "'Inter', sans-serif", margin: 0 }}>
                  {missionText || (lang === 'mn' ? 'Олон улсын стандартад нийцсэн чанартай бүтээгдэхүүн, үйлчилгээгээр хэрэглэгчдээ хангаж, нийгэм болон байгаль орчны өмнө хүлээсэн хариуцлагаа дээдлэн ажиллана.' : 'Providing quality products and services meeting international standards, highly respecting social and environmental responsibilities.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline Section */}
        <section id="history" style={{ backgroundColor: '#ffffff', padding: '60px 5% 40px 5%' }}>
          <div style={{ textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
            <InteractiveTitle 
              className="no-underline" 
              style={{ fontSize: '50px', fontWeight: '600', letterSpacing: '-0.02em', fontFamily: "'Montserrat', sans-serif", color: '#000000', margin: '0' }}
              text={lang === 'mn' ? 'Түүхэн замнал' : 'Historical Journey'}
            />
          </div>
          <HistoryTimeline timeline={timeline} lang={lang} />
        </section>

        <section id="leadership" style={{ padding: '80px 5%', backgroundColor: '#ffffff' }}>
          <h3 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '40px', fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.5px', color: '#000000', textAlign: 'center' }}>
            {leadershipTitle}
          </h3>

          {/* Executive Team Members */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px' }}>
            {teamData.map((member, idx) => (
              <div
                key={idx}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}
                onClick={() => setSelectedMember(member)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ borderRadius: '12px', overflow: 'hidden', height: '320px', backgroundColor: '#e2e8f0' }}>
                  <img
                    src={getValidImageUrl(member, idx)}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', fontFamily: "'Inter', sans-serif", margin: '0 0 6px 0', color: '#000000' }}>
                    {member.name}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#64748b', fontFamily: "'Inter', sans-serif", margin: 0, fontWeight: '400' }}>
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Member Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  width: '100%',
                  maxWidth: '900px',
                  display: 'flex',
                  overflow: 'hidden',
                  position: 'relative',
                  color: '#000000',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)'
                }}
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    background: 'rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000000',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                >
                  <X size={20} />
                </button>

                <div style={{ flex: '0 0 40%', minHeight: '500px', backgroundColor: '#e2e8f0' }}>
                  <img
                    src={getValidImageUrl(selectedMember, teamData.findIndex(m => m.name === selectedMember.name))}
                    alt={selectedMember.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: '1', padding: '48px', overflowY: 'auto', maxHeight: '600px', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', fontFamily: "'Montserrat', sans-serif", color: '#000000' }}>
                    {selectedMember.name}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px', fontFamily: "'Inter', sans-serif" }}>
                    {selectedMember.role}
                  </p>
                  <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#334155', fontFamily: "'Inter', sans-serif", whiteSpace: 'pre-line' }}>
                    {selectedMember.bio && selectedMember.bio.length > 50 ? selectedMember.bio : "Тэрээр компанийн үйл ажиллагааны ерөнхий удирдлагыг хариуцан ажиллаж, стратегийн зорилтуудыг хэрэгжүүлэх, өдөр тутмын үйл ажиллагааг жигд удирдан зохион байгуулах чиглэлд олон жилийн туршлагатай. \n\nБайгууллагын дотоод процессыг сайжруулах, хүний нөөцийн чадавхыг бэхжүүлэх, салбартаа манлайлах урт хугацааны алсын харааг тодорхойлоход онцгой анхаарч ажилладаг. Түүний удирдлага дор баг хамт олон инноваци, технологийн шийдлүүдийг нэвтрүүлж, үйл ажиллагааны үр ашгийг тасралтгүй нэмэгдүүлсээр байна."}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}

/*
export const monpolymetMilestones = [
  { year: "1992", title: "Company Founded", desc: "Monpolymet Group was established as a pioneering enterprise in the region.", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" },
  { year: "1995", title: "Gold Exploration", desc: "Began operations in gold exploration with cutting edge methods.", imageUrl: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop" },
  { year: "2000", title: "Mining Expansion", desc: "Expanded mining operations significantly across multiple sites.", imageUrl: "https://images.unsplash.com/photo-1578241561880-0a1d5ce3cb10?q=80&w=2070&auto=format&fit=crop" },
  { year: "2008", title: "Industrial Development", desc: "Launched major industrial development projects and vital infrastructure.", imageUrl: "https://images.unsplash.com/photo-1504917595217-d4ce5eb922fc?q=80&w=2082&auto=format&fit=crop" },
  { year: "2015", title: "Sustainability Initiatives", desc: "Introduced advanced eco-friendly practices to preserve nature.", imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1974&auto=format&fit=crop" },
  { year: "2020", title: "Digital Transformation", desc: "Adopted cutting-edge enterprise technologies and automated systems.", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" },
  { year: "2025", title: "Corporate Ecosystem", desc: "A fully integrated industrial ecosystem for a sustainable future.", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" }
];
*/

