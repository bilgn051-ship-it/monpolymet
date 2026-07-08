import { useState, useEffect, useRef } from 'react';
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

      {/* Values, Mission & Vision Grid */}
      <section
        ref={valuesRef}
        className={`values-mission-vision-section reveal-group ${valuesInView ? 'is-revealed' : ''}`}
        style={{ marginTop: '60px' }}
      >
        <div className="values-mission-vision-grid">
          
          {/* Row 1 Left: Core Values card (takes 2/3 width) */}
          <div className="premium-about-card card-values" style={{ '--reveal-index': 0 }}>
            <h3>
              <Award size={24} />
              {valuesTitle}
            </h3>
            <div className="values-subgrid">
              {valuesData.map((val, idx) => (
                <div key={idx} className="value-subitem">
                  <div className="value-subitem-icon">
                    {getValIcon(idx)}
                  </div>
                  <h4>{val.title}</h4>
                  <p>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 1 Right: Blue gradient graphics card (takes 1/3 width) */}
          <div className="card-val-graphic" style={{ '--reveal-index': 1 }}>
            <div className="graphic-glow-circle"></div>
            <div className="graphic-floating-content">
              <Building2 size={64} color="#ffffff" style={{ opacity: 0.9 }} />
            </div>
          </div>

          {/* Row 2 Left: Mission card (takes 5/12 width) */}
          <div className="premium-about-card card-mission" style={{ '--reveal-index': 2 }}>
            <h3>
              <Target size={24} />
              {missionTitle}
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#454545' }}>{missionText}</p>
          </div>

          {/* Row 2 Right: Vision card (takes 7/12 width) */}
          <div className="premium-about-card card-vision" style={{ '--reveal-index': 3 }}>
            <h3>
              <Eye size={24} />
              {visionTitle}
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#454545' }}>{visionText}</p>
          </div>

        </div>
      </section>

      {/* History Timeline */}
      <section className="history-timeline-section">
        <h3 className="section-subtitle" style={{ textAlign: 'center', marginBottom: '40px' }}>{historyTitle}</h3>
        <div className="pickpack-timeline-container">
          <div className="pickpack-timeline-spine" ref={timelineRef}>
            <span className="pickpack-timeline-progress"></span>
          </div>
          <div className="timeline-items-list">
            {historyData.map((hist, idx) => (
              <TimelineItem key={idx} hist={hist} />
            ))}
          </div>
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
