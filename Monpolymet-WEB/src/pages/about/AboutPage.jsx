import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Compass, Award, Sparkles } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { fetchTimeline, fetchAboutContent, fetchCoreValues, fetchTeam } from '../../api';
import CEOGreeting from '../home/sections/CEOGreeting';
import HistoryTimeline from '../../components/ui/HistoryTimeline';
import InteractiveTitle from '../../components/ui/InteractiveTitle';

export default function AboutPage({ lang, t, pageMetadata }) {
  const timelineRef = useRef(null);
  const { ref: valuesRef } = useInView({ threshold: 0.1 });
  // eslint-disable-next-line no-unused-vars
  const [timeline, setTimeline] = useState([]);
  const [aboutContent, setAboutContent] = useState(null);
  const [team, setTeam] = useState([]);
  const [coreValues, setCoreValues] = useState([]);

  const fallbackImages = [
    "/garamjav.png",
    "/monhnasan.png",
    "/delger.png",
    "/haliun.png",
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
    if (!member || !member.name) return fallbackImages[idx % fallbackImages.length];
    const name = member.name.toLowerCase();

    if (name.includes('гарамжав') || name.includes('garamjav')) return '/garamjav.png';
    if (name.includes('мөнхнасан') || name.includes('munkhnasan')) return '/monhnasan.png';
    if (name.includes('дэлгэр') || name.includes('delger')) return '/delger.png';
    if (name.includes('халиун') || name.includes('haliun')) return '/haliun.png';
    if (name.includes('гандөш') || name.includes('gandush')) return '/dosh.png';

    if (member.imageUrl && member.imageUrl.startsWith('/') && !member.imageUrl.includes('1.png')) return member.imageUrl;
    return fallbackImages[idx % fallbackImages.length];
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
    : (t.about?.visionTitle || 'Алсын хараа');

  const visionText = aboutContent?.vision
    ? (lang === 'mn' ? aboutContent.vision.textMn : aboutContent.vision.textEn)
    : (t.about?.visionText || '');

  const missionTitle = aboutContent?.mission
    ? (lang === 'mn' ? aboutContent.mission.titleMn : aboutContent.mission.titleEn)
    : (t.about?.missionTitle || 'Эрхэм зорилго');

  const missionText = aboutContent?.mission
    ? (lang === 'mn' ? aboutContent.mission.textMn : aboutContent.mission.textEn)
    : (t.about?.missionText || '');

  const valuesTitle = aboutContent
    ? (lang === 'mn' ? aboutContent.valuesTitleMn : aboutContent.valuesTitleEn)
    : (t.about?.valuesTitle || 'Үнэт зүйлс');

  const leadershipTitle = aboutContent
    ? (lang === 'mn' ? aboutContent.leadershipTitleMn : aboutContent.leadershipTitleEn)
    : (t.about?.leadershipTitle || 'Удирдлагын баг');

  const ceoGreeting = aboutContent?.leadershipGreeting
    ? (lang === 'mn' ? aboutContent.leadershipGreeting.titleMn : aboutContent.leadershipGreeting.titleEn)
    : (t.about?.ceoGreeting || '');

  const ceoGreetingText = aboutContent?.leadershipGreeting
    ? (lang === 'mn' ? aboutContent.leadershipGreeting.textMn : aboutContent.leadershipGreeting.textEn)
    : (t.about?.ceoGreetingText || '');

  const historyData = timeline && timeline.length > 0
    ? timeline.map(h => ({
      id: h._id || h.id,
      year: h.year,
      titleMn: (typeof h.title === 'object' ? h.title?.mn : h.titleMn) || h.title,
      titleEn: (typeof h.title === 'object' ? h.title?.en : h.titleEn) || h.title,
      descMn: (typeof h.desc === 'object' ? h.desc?.mn : h.descMn) || h.description || h.desc,
      descEn: (typeof h.desc === 'object' ? h.desc?.en : h.descEn) || h.description || h.desc,
      imageUrl: h.imageUrl
    }))
    : (t.about?.history || []).map(h => ({
      year: h.year,
      titleMn: h.title,
      titleEn: h.title,
      descMn: h.desc,
      descEn: h.desc,
    }));

  const parsedTeam = team && team.length > 0
    ? team.map((m, idx) => {
      const fallback = (t.about?.team && t.about.team[idx]) ? t.about.team[idx] : {};
      let name = (typeof m.name === 'object' ? (lang === 'mn' ? m.name?.mn : m.name?.en) : (lang === 'mn' ? m.nameMn : m.nameEn)) || (typeof m.name === 'string' ? m.name : '');
      let role = (typeof m.role === 'object' ? (lang === 'mn' ? m.role?.mn : m.role?.en) : (lang === 'mn' ? m.roleMn : m.roleEn)) || (typeof m.role === 'string' ? m.role : '');

      if (lang === 'en') {
        if (!name || /[а-яөүё]/i.test(name)) {
          name = fallback.name || 'Leadership';
        }
        if (!role || /[а-яөүё]/i.test(role)) {
          role = fallback.role || 'Executive';
        }
      }

      const imageUrl = m.imageUrl || m.image;
      return { name, role, imageUrl };
    }).filter(m => m.name && !m.name.includes('?'))
    : (t?.about?.team || []);
  const default8Members = [
    {
      name: lang === 'mn' ? 'Ц.Гарамжав' : 'Garamjav Ts.',
      role: lang === 'mn' ? 'Үүсгэн байгуулагч, ТУЗ-ийн Дарга' : 'Founder & Chairwoman of the Board',
      imageUrl: '/garamjav.png'
    },
    {
      name: lang === 'mn' ? 'Н.Мөнхнасан' : 'Munkhnasan N.',
      role: lang === 'mn' ? 'Ерөнхий Захирал' : 'Chief Executive Officer',
      imageUrl: '/monhnasan.png'
    },
    {
      name: lang === 'mn' ? 'Э.Билгүүн' : 'Bilguun E.',
      role: lang === 'mn' ? 'Гүйцэтгэх Захирал' : 'Executive Director',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: lang === 'mn' ? 'Б.Цэцэгсүрэн' : 'Tsetsegsuren B.',
      role: lang === 'mn' ? 'Санхүүгийн Захирал' : 'Chief Financial Officer',
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: lang === 'mn' ? 'С.Баярбат' : 'Bayarbat S.',
      role: lang === 'mn' ? 'Үйлдвэрлэл Хариуцсан Захирал' : 'VP of Operations',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: lang === 'mn' ? 'Г.Отгонбаяр' : 'Otgonbayar G.',
      role: lang === 'mn' ? 'Хүний Нөөцийн Захирал' : 'Human Resources Director',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: lang === 'mn' ? 'Д.Эрдэнэбат' : 'Erdenebat D.',
      role: lang === 'mn' ? 'Техник, Технологийн Захирал' : 'Chief Technology Officer',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: lang === 'mn' ? 'М.Батзориг' : 'Batzorig M.',
      role: lang === 'mn' ? 'Байгаль Орчны Менежер' : 'Environmental Manager',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const teamData = default8Members.map((def, idx) => {
    if (!team || team.length === 0) return def;
    const dbMatch = team.find(m => {
      const dbName = (typeof m.name === 'object' ? m.name?.mn : m.nameMn || m.name) || '';
      return dbName.toLowerCase().includes(def.name.toLowerCase()) || def.name.toLowerCase().includes(dbName.toLowerCase());
    });
    if (dbMatch) {
      const role = (typeof dbMatch.role === 'object' ? (lang === 'mn' ? dbMatch.role?.mn : dbMatch.role?.en) : (lang === 'mn' ? dbMatch.roleMn : dbMatch.roleEn)) || dbMatch.role || def.role;
      return {
        ...def,
        role: role || def.role,
        imageUrl: dbMatch.imageUrl || dbMatch.image || def.imageUrl
      };
    }
    return def;
  });

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
        <section className="pickpack-exact-section" style={{ paddingTop: '24px', marginTop: '-30px' }} ref={valuesRef}>
          <div className="pickpack-exact-container">

            {/* Group Intro Heading & Modern Feature Card */}
            <div id="vision" style={{ maxWidth: '1200px', margin: '0 auto 60px auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <InteractiveTitle
                  className="no-underline"
                  style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: '600', letterSpacing: '-0.02em', fontFamily: "'Montserrat', sans-serif", color: '#0f172a', margin: '0' }}
                  text={lang === 'mn' ? 'Группийн танилцуулга' : 'Group Introduction'}
                />
              </div>

              {/* Clean Plain Text (No Card Container) */}
              <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                {lang === 'mn' ? (
                  <>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#475569',
                      lineHeight: '1.5',
                      marginBottom: '16px',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      Монполимет групп нь 1992 онд үүсгэн байгуулагдсан, уул уурхай, байгаль орчны нөхөн сэргээлт, барилгын материалын үйлдвэрлэл, барилга угсралт, гадаад худалдааны чиглэлээр үйл ажиллагаа явуулж 1000 гаруй ажилтан, албан хаагчийг тогтвортой, ээлтэй ажлын байраар хангаж буй үндэсний үйлдвэрлэгч, хөрөнгө оруулагч компани юм.
                    </p>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#475569',
                      lineHeight: '1.5',
                      marginBottom: '16px',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      Бид уул уурхайн үйлдвэрлэлийг шинжлэх ухааны үндэслэлтэйгээр хариуцлагатайгаар хэрэгжүүлж, байгаль орчны нөхөн сэргээлтийн жишгийг тогтоон, экосистемийг сэргээж, биологийн олон янз байдлыг бий болгож цөлжилттэй тэмцэх, газрын доройтлыг бууруулах, уур амьсгалын өөрчлөлтийг сааруулах зэрэг үйлсэд өөрсдийн хувь нэмрээ оруулсаар байна.
                    </p>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#475569',
                      lineHeight: '1.5',
                      margin: 0,
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      Дэлхийн жишигт нийцсэн техник технологи, арга туршлагыг өөрсдийн мэдлэг чадвартай хослуулан эх орондоо нутагшуулж монгол хүний хөгжил, байгаль орчны хамгаалал, нийгмийн сайн сайхан, Монгол Улсын хөгжилд бодит хувь нэмэр оруулан ажиллаж байна.
                    </p>
                  </>
                ) : (
                  <p style={{ fontSize: '16px', color: '#334155', lineHeight: '1.5', margin: 0, fontFamily: "'Inter', sans-serif" }}>
                    Monpolymet Group was established in 1992. It is a national producer-investor company operating in the fields of mining, environmental rehabilitation, building materials production, construction, and foreign trade. Our company's main goal is to introduce new know-how, innovation, and advanced technology with eco-friendly solutions in every sector we operate in, supporting green development.
                  </p>
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
              paddingBottom: '10px'
            }}>
              {/* Card 1: Алсын хараа */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '36px 28px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
                border: '1px solid #cbd5e1',
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
                <div style={{
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Compass size={46} color="#2563eb" strokeWidth={1.6} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', fontFamily: "'Montserrat', sans-serif", color: '#0f172a', margin: '0 0 14px 0', transition: 'color 0.3s ease' }}>
                  {lang === 'mn' ? 'Алсын хараа' : 'Vision'}
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#475569', fontFamily: "'Inter', sans-serif", margin: 0 }}>
                  {lang === 'mn' ? 'Ногоон хөгжлийг эрхэмлэн, монгол хүний оюун чадвараар үндэсний бүтээн байгуулалт, тогтвортой ирээдүйг бүтээнэ.' : visionText}
                </p>
              </div>

              {/* Card 2: Үнэт зүйлс */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '36px 28px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
                border: '1px solid #cbd5e1',
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
                <div style={{
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={46} color="#2563eb" strokeWidth={1.6} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', fontFamily: "'Montserrat', sans-serif", color: '#0f172a', margin: '0 0 14px 0', transition: 'color 0.3s ease' }}>
                  {lang === 'mn' ? 'Үнэт зүйлс' : 'Values'}
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#475569', fontFamily: "'Inter', sans-serif", margin: 0 }}>
                  {lang === 'mn' ? 'Хариуцлагатай, итгэлтэй хамт олон, ёс зүйтэй хамтын ажиллагаа, байгальд ээлтэй үйлдвэрлэл, инновац, дэвшилтэт технологи' : (t.about.valuesText || 'Responsible and trusted team, ethical cooperation, eco-friendly manufacturing, innovation, and advanced technology.')}
                </p>
              </div>

              {/* Card 3: Зарчим */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '36px 28px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
                border: '1px solid #cbd5e1',
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
                <div style={{
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={46} color="#2563eb" strokeWidth={1.6} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', fontFamily: "'Montserrat', sans-serif", color: '#0f172a', margin: '0 0 14px 0', transition: 'color 0.3s ease' }}>
                  {lang === 'mn' ? 'Уриа' : 'Motto'}
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#475569', fontFamily: "'Inter', sans-serif", margin: 0 }}>
                  {lang === 'mn' ? 'Бат бэх хөгжлийн суурийг хамтдаа бүтээцгээе.' : (t.about.mottoText || 'Let us build the foundation of strong development together.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline Section */}
        <section id="history" style={{ backgroundColor: '#ffffff', padding: '24px 5% 40px 5%', marginTop: '-30px' }}>
          <div style={{ textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
            <InteractiveTitle
              className="no-underline"
              style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: '600', letterSpacing: '-0.02em', fontFamily: "'Montserrat', sans-serif", color: '#0f172a', margin: '0' }}
              text={lang === 'mn' ? 'Түүхэн замнал' : 'Historical Journey'}
            />
          </div>
          <HistoryTimeline timeline={historyData} lang={lang} />
        </section>

        <section id="leadership" style={{ padding: '40px 5% 80px 5%', marginTop: '-20px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <h3 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: '600', marginBottom: '44px', fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center' }}>
              {leadershipTitle}
            </h3>

            {/* Executive Team Members: 4 cards in Row 1, 4 cards in Row 2 */}
            <div className="leadership-team-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '36px 24px'
            }}>
              <style>{`
                @media (max-width: 1024px) {
                  .leadership-team-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                  }
                }
                @media (max-width: 576px) {
                  .leadership-team-grid {
                    grid-template-columns: 1fr !important;
                  }
                }
              `}</style>
              {teamData.map((member, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ borderRadius: '16px', overflow: 'hidden', height: '360px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                    <img
                      src={getValidImageUrl(member, idx)}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                    />
                  </div>
                  <div style={{ textAlign: 'left', padding: '0 2px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', fontFamily: "'Montserrat', sans-serif", margin: '0 0 4px 0', color: '#0f172a' }}>
                      {member.name}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#64748b', fontFamily: "'Montserrat', sans-serif", margin: 0, fontWeight: '500' }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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

