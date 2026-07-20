import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { fetchTimeline, fetchAboutContent, fetchCoreValues, fetchTeam } from '../../api';
import CEOGreeting from '../home/sections/CEOGreeting';

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
    "Н.Мөнхнасан": "/munkhnasan.png",
    "N.Munkhnasan": "/munkhnasan.png",
    "Б.Дэлгэр": "/delger.png",
    "B.Delger": "/delger.png",
    "Ц.Халиун": "/1.png",
    "Ts.Haliun": "/1.png",
    "Б.Гандөш": "/2.png",
    "B.Gandush": "/2.png"
  };

  const getValidImageUrl = (member, idx) => {
    // FORCE local images regardless of what is in the database!
    return fallbackByNames[member.name] || fallbackImages[idx % 5];
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

      {/* Pickpack-style Exact Layout */}
      <section id="values" className="pickpack-exact-section" ref={valuesRef}>
        <div className="pickpack-exact-container">

          {/* Section Badge */}
          <motion.div
            className="pickpack-badge-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="pickpack-badge">
              <span className="pickpack-badge-star">✦</span>
              <span className="pickpack-badge-text">{valuesTitle}</span>
            </div>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="pickpack-values-layout"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="pickpack-values-card-white pickpack-top-left-card">
              <div className="pickpack-values-network-graphic" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 600 350" width="100%" height="100%" className="network-svg">
                  <defs>
                    <linearGradient id="pillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1E3A8A" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1E3A8A" floodOpacity="0.25" />
                    </filter>
                    <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Network Lines */}
                  <path d="M 140 40 L 140 280" fill="none" stroke="#E0E7FF" strokeWidth="2" />
                  <path d="M 40 180 L 320 180" fill="none" stroke="#E0E7FF" strokeWidth="2" />
                  <path d="M 320 60 L 320 280" fill="none" stroke="#E0E7FF" strokeWidth="2" />
                  <path d="M 320 100 L 520 100" fill="none" stroke="#E0E7FF" strokeWidth="2" />
                  <path d="M 520 40 L 520 280 L 560 280 L 600 200" fill="none" stroke="#E0E7FF" strokeWidth="2" strokeLinejoin="round" />

                  {/* Nodes */}
                  {/* Top Left */}
                  <g transform="translate(140, 80)">
                    <circle cx="0" cy="0" r="10" fill="#EEF2FF" />
                    <circle cx="0" cy="0" r="5" fill="#93C5FD" />
                  </g>
                  {/* Middle Intersection */}
                  <g transform="translate(320, 180)">
                    <circle cx="0" cy="0" r="10" fill="#EEF2FF" />
                    <circle cx="0" cy="0" r="5" fill="#93C5FD" />
                  </g>
                  {/* Top Right Solid */}
                  <g transform="translate(320, 100)">
                    <circle cx="0" cy="0" r="12" fill="#DBEAFE" />
                    <circle cx="0" cy="0" r="7" fill="#2563EB" />
                  </g>
                  {/* Bottom Right */}
                  <g transform="translate(520, 280)">
                    <circle cx="0" cy="0" r="10" fill="#EEF2FF" />
                    <circle cx="0" cy="0" r="5" fill="#93C5FD" />
                  </g>

                  {/* Pills */}
                  {/* Инновац */}
                  <g transform="translate(110, 155)">
                    <rect x="0" y="0" width="140" height="46" rx="23" fill="url(#pillGrad)" filter="url(#shadow)" stroke="#EEF2FF" strokeWidth="3" />
                    <text x="30" y="28" fill="white" fontSize="16" fontFamily="sans-serif" fontWeight="500">Инновац</text>
                    <circle cx="112" cy="23" r="13" fill="white" />
                    <path d="M 112 13 Q 112 23 122 23 Q 112 23 112 33 Q 112 23 102 23 Q 112 23 112 13 Z" fill="#1E3A8A" />
                  </g>

                  {/* Хэрэглэгч */}
                  <g transform="translate(380, 75)">
                    <rect x="0" y="0" width="150" height="46" rx="23" fill="url(#pillGrad)" filter="url(#shadow)" stroke="#EEF2FF" strokeWidth="3" />
                    <text x="25" y="28" fill="white" fontSize="16" fontFamily="sans-serif" fontWeight="500">Хэрэглэгч</text>
                    <circle cx="122" cy="23" r="13" fill="white" />
                    <path d="M 122 13 Q 122 23 132 23 Q 122 23 122 33 Q 122 23 112 23 Q 122 23 122 13 Z" fill="#1E3A8A" />
                  </g>

                  {/* Технологи */}
                  <g transform="translate(290, 240)">
                    <rect x="0" y="0" width="150" height="46" rx="23" fill="url(#pillGrad)" filter="url(#shadow)" stroke="#EEF2FF" strokeWidth="3" />
                    <text x="25" y="28" fill="white" fontSize="16" fontFamily="sans-serif" fontWeight="500">Технологи</text>
                    <circle cx="122" cy="23" r="13" fill="white" />
                    <path d="M 122 13 Q 122 23 132 23 Q 122 23 122 33 Q 122 23 112 23 Q 122 23 122 13 Z" fill="#1E3A8A" />
                  </g>

                  {/* Mouse Cursor Arrow pointing to Инновац */}
                  <g transform="translate(195, 200) rotate(-15)">
                    <path d="M0,0 L0,32 L8,24 L16,40 L22,37 L14,21 L24,21 Z" fill="#1E3A8A" stroke="white" strokeWidth="2" filter="url(#shadow)" />
                  </g>
                </svg>
              </div>
              <h3 className="pickpack-card-title">{valuesTitle}</h3>
              <p className="pickpack-card-text">
                {lang === 'mn' 
                  ? "Инновац, технологи, хэрэглэгч төвтэй хандлагад тулгуурлан, дэлхий даяар саадгүй, найдвартай үйлчилгээг санал болгодог онцгой логистикийн шийдлүүдийг хүргэх." 
                  : "Delivering exceptional logistics solutions worldwide, driven by innovation, technology, and a customer-centric approach."}
              </p>
            </div>
            
            <div className="pickpack-values-card-blue pickpack-top-right-card">
              <div className="isometric-graphic">
                <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ opacity: 0.9 }}>
                  <g transform="translate(100, 50)">
                    {/* Top Face */}
                    <path d="M 0 0 L 60 30 L 0 60 L -60 30 Z" fill="#3b82f6" opacity="0.5"/>
                    {/* Left Face */}
                    <path d="M -60 30 L 0 60 L 0 130 L -60 100 Z" fill="#1d4ed8" opacity="0.8"/>
                    {/* Right Face */}
                    <path d="M 0 60 L 60 30 L 60 100 L 0 130 Z" fill="#1e40af" opacity="0.95"/>
                    
                    {/* Cutout/Inner shape trick */}
                    <path d="M 0 60 L 40 40 L 40 80 L 0 100 Z" fill="#172554" opacity="0.3"/>

                    {/* Small box bottom right */}
                    <g transform="translate(75, 75)">
                      <path d="M 0 0 L 25 12.5 L 0 25 L -25 12.5 Z" fill="#3b82f6" opacity="0.6"/>
                      <path d="M -25 12.5 L 0 25 L 0 55 L -25 42.5 Z" fill="#1d4ed8" opacity="0.8"/>
                      <path d="M 0 25 L 25 12.5 L 25 42.5 L 0 55 Z" fill="#1e40af" opacity="1"/>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision Grid */}
          <div id="vision" className="pickpack-mv-layout">
            <motion.div
              className="pickpack-mission-card pickpack-bottom-left-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="pickpack-card-text-content">
                <h3 className="pickpack-card-title">{missionTitle}</h3>
                <p className="pickpack-card-text">{missionText}</p>
              </div>
              <div className="pickpack-mission-bg-circles">
                <div className="circle-3"></div>
                <div className="circle-2"></div>
                <div className="circle-1"></div>
                <div className="mission-bg-icon"><User size={24} /></div>
              </div>
            </motion.div>

            <motion.div
              className="pickpack-vision-card pickpack-bottom-right-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="pickpack-vision-bg-dots"></div>
              <div className="pickpack-card-text-content">
                <h3 className="pickpack-card-title">{visionTitle}</h3>
                <p className="pickpack-card-text">{visionText}</p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* CEO Greeting Section moved outside of leadership padded section */}
      <CEOGreeting lang={lang} t={t} />

      <section id="leadership" style={{ padding: '80px 5%', backgroundColor: '#ffffff' }}>
        <h3 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '40px', fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.5px', color: '#000000' }}>
          {leadershipTitle}
        </h3>

        {/* Executive Team Members */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {teamData.map((member, idx) => (
            <div 
              key={idx} 
              style={{ display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}
              onClick={() => setSelectedMember(member)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ borderRadius: '24px', overflow: 'hidden', height: '420px', backgroundColor: '#e2e8f0' }}>
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
                borderRadius: '24px',
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

