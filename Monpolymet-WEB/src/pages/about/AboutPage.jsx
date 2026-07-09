import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Eye, ShieldAlert, Award, Building2 } from 'lucide-react';
import { fetchTimeline, fetchAboutContent, fetchCoreValues, fetchTeam } from '../../api';
import { useInView } from '../../hooks/useInView';

/** Decorative photo strip that scrolls across the top of the About page. */
const ABOUT_MARQUEE_IMAGES = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=60',
];

/** One history entry that reveals itself on scroll. */
function TimelineItem({ hist }) {
  const [ref, inView] = useInView({ threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  return (
    <div ref={ref} className={`timeline-row-item ${inView ? 'is-visible' : ''}`}>
      <div className="timeline-year-col">
        <span className="timeline-large-year">{hist.year}</span>
      </div>
      <div className="timeline-spine-col">
        <span className="timeline-dot"></span>
      </div>
      <div className="timeline-content-col">
        <h4 className="timeline-item-title">{hist.title}</h4>
        <p className="timeline-item-desc">{hist.desc}</p>
      </div>
    </div>
  );
}

export default function AboutPage({ lang, t }) {
  const timelineRef = useRef(null);
  const [valuesRef, valuesInView] = useInView();
  const [timeline, setTimeline] = useState([]);
  const [aboutContent, setAboutContent] = useState(null);
  const [coreValues, setCoreValues] = useState([]);
  const [team, setTeam] = useState([]);

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

  const getValIcon = (index) => {
    switch (index) {
      case 0: return <ShieldAlert size={28} className="val-icon" />;
      case 1: return <Award size={28} className="val-icon" />;
      case 2: return <Target size={28} className="val-icon" />;
      default: return <Eye size={28} className="val-icon" />;
    }
  };

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

  const historyTitle = aboutContent
    ? (lang === 'mn' ? aboutContent.historyTitleMn : aboutContent.historyTitleEn)
    : t.about.historyTitle;

  const leadershipTitle = aboutContent
    ? (lang === 'mn' ? aboutContent.leadershipTitleMn : aboutContent.leadershipTitleEn)
    : t.about.leadershipTitle;

  const ceoGreeting = aboutContent?.leadershipGreeting
    ? (lang === 'mn' ? aboutContent.leadershipGreeting.titleMn : aboutContent.leadershipGreeting.titleEn)
    : t.about.ceoGreeting;

  const ceoGreetingText = aboutContent?.leadershipGreeting
    ? (lang === 'mn' ? aboutContent.leadershipGreeting.textMn : aboutContent.leadershipGreeting.textEn)
    : t.about.ceoGreetingText;

  const historyData = timeline && timeline.length > 0
    ? timeline.map(h => ({
        year: h.year,
        title: lang === 'mn' ? h.titleMn : h.titleEn,
        desc: lang === 'mn' ? h.descMn : h.descEn
      }))
    : t.about.history;

  const valuesData = coreValues && coreValues.length > 0
    ? coreValues.sort((a,b) => a.order - b.order).map(v => ({
        title: lang === 'mn' ? v.titleMn : v.titleEn,
        desc: lang === 'mn' ? v.descMn : v.descEn
      }))
    : t.about.values;

  const teamData = team && team.length > 0
    ? team.sort((a,b) => a.order - b.order).map(m => ({
        name: lang === 'mn' ? m.nameMn : m.nameEn,
        role: lang === 'mn' ? m.roleMn : m.roleEn,
        bio: lang === 'mn' ? m.bioMn : m.bioEn,
        edu: lang === 'mn' ? m.eduMn : m.eduEn,
        imageUrl: m.imageUrl,
      }))
    : t.about.team;

  const founder = teamData[0] || {};
  const restTeam = teamData.slice(1);

  return (
    <div className="about-page-container container-padding">
      {/* Two-row photo collage hero: edge-to-edge images scrolling right → left */}
      <div className="about-hero-collage">
        <div className="collage-row" aria-hidden="true">
          <div className="collage-track collage-track-a">
            {[0, 1, 2, 3].flatMap((rep) =>
              ABOUT_MARQUEE_IMAGES.map((src, i) => (
                <div className="collage-cell" key={`t-${rep}-${i}`}>
                  <img src={src} alt="" loading="lazy" />
                </div>
              )),
            )}
          </div>
        </div>
        <div className="collage-row" aria-hidden="true">
          <div className="collage-track collage-track-b">
            {[0, 1, 2, 3].flatMap((rep) =>
              ABOUT_MARQUEE_IMAGES.map((src, i) => (
                <div className="collage-cell" key={`b-${rep}-${i}`}>
                  <img src={src} alt="" loading="lazy" />
                </div>
              )),
            )}
          </div>
        </div>
        <div className="collage-title">
          <span>{lang === 'mn' ? 'БИДНИЙ ТУХАЙ' : 'ABOUT US'}</span>
        </div>
      </div>

      {/* Pickpack-style Exact Layout */}
      <section className="pickpack-exact-section" ref={valuesRef}>
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
              {valuesTitle}
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
            <div className="pickpack-values-card-white">
              {/* Optional: Pickpack has a diagram here, we'll put the 4 values in a clean grid */}
              <div className="pickpack-values-inner-grid">
                {valuesData.map((val, idx) => (
                  <div key={idx} className="pickpack-value-item">
                    <div className="pickpack-value-dot"></div>
                    <div className="pickpack-value-content">
                      <h4 className="pickpack-value-title">{val.title}</h4>
                      <p className="pickpack-value-desc">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pickpack-values-card-blue">
              <div className="pickpack-blue-box-graphic">
                <Building2 size={120} color="rgba(255,255,255,0.1)" />
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision Grid */}
          <div className="pickpack-mv-layout">
            <motion.div 
              className="pickpack-mission-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="pickpack-mission-bg-circles">
                <div className="circle-1"></div>
                <div className="circle-2"></div>
                <div className="circle-3"></div>
                <div className="mission-bg-icon"><Target size={24} /></div>
              </div>
              <h3 className="pickpack-card-title">{missionTitle}</h3>
              <p className="pickpack-card-text">{missionText}</p>
            </motion.div>
            
            <motion.div 
              className="pickpack-vision-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="pickpack-vision-bg-dots"></div>
              <h3 className="pickpack-card-title">{visionTitle}</h3>
              <p className="pickpack-card-text">{visionText}</p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Horizontal Interactive History Timeline */}
      <section className="horizontal-history-section">
        <div className="horizontal-history-container">
          <div className="pickpack-timeline-header">
            <h2 className="pickpack-section-title text-center">
              {t.about.historyTitle}
            </h2>
          </div>

          <HistoryTimelineInteractive historyData={historyData} />
        </div>
      </section>

      {/* Leadership greeting & profiles */}
      <section className="leadership-section">
        <h3 className="section-subtitle">{leadershipTitle}</h3>

        {/* CEO Greeting */}
        {founder.name && (
          <div className="ceo-greeting-block">
            <div className="ceo-avatar-col">
              <img
                src={founder.imageUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60"}
                alt={founder.name}
                className="ceo-avatar"
              />
              <div className="ceo-name-badge">
                <h4>{founder.name}</h4>
                <span>{founder.role}</span>
              </div>
            </div>
            <div className="ceo-greeting-text-col">
              <h4>{ceoGreeting}</h4>
              <p className="greeting-text">&ldquo;{ceoGreetingText}&rdquo;</p>
            </div>
          </div>
        )}

        {/* Executive Team Members */}
        <div className="team-profiles-grid">
          {restTeam.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="team-image-wrapper">
                <img
                  src={member.imageUrl || (idx === 0
                    ? "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60"
                    : "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60")}
                  alt={member.name}
                  className="team-image"
                />
              </div>
              <div className="team-info">
                <h4>{member.name}</h4>
                <span className="team-role">{member.role}</span>
                <p className="team-bio">{member.bio}</p>
                <div className="team-edu">
                  <strong>{lang === 'mn' ? 'Боловсрол:' : 'Education:'}</strong>
                  <p>{member.edu}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function HistoryTimelineInteractive({ historyData }) {
  // Set the first year as active by default
  const [activeYear, setActiveYear] = useState(historyData[0]?.year || "2021");

  // Find the content for the currently active year
  const activeContent = historyData.find(h => h.year === activeYear);

  return (
    <div className="horizontal-history-interactive">
      {/* 1. Horizontal Years Navigation */}
      <div className="horizontal-timeline-nav">
        <div className="horizontal-timeline-line"></div>
        {historyData.map((hist) => (
          <div 
            key={hist.year}
            className={`horizontal-timeline-node ${activeYear === hist.year ? 'active' : ''}`}
            onMouseEnter={() => setActiveYear(hist.year)}
          >
            <div className="horizontal-timeline-dot"></div>
            <span className="horizontal-timeline-year-text">{hist.year}</span>
          </div>
        ))}
      </div>

      {/* 2. Dynamic Content Area */}
      <div className="horizontal-timeline-content-area">
        {activeContent && (
          <motion.div 
            key={activeYear} // Re-mounts and animates when activeYear changes
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pickpack-history-right-content"
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
          >
            <div className="pickpack-history-cards-wrapper">
              {/* Render the card(s) using the exact PickPack layout we created */}
              {[activeContent].map((item, subIdx) => (
                <div key={subIdx} className="pickpack-history-event-card">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"} 
                    alt={item.title} 
                    loading="lazy" 
                    className="pickpack-history-event-img"
                  />
                  <div className="pickpack-history-event-info">
                    <h4 className="pickpack-history-event-title">{item.title}</h4>
                    <p className="pickpack-history-event-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
