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

  let historyData = timeline && timeline.length > 0
    ? timeline.map(h => ({
        year: h.year,
        title: lang === 'mn' ? h.titleMn : h.titleEn,
        desc: lang === 'mn' ? h.descMn : h.descEn,
        imageUrl: h.imageUrl
      }))
    : [];

  // If there are too few items, append dummy data so it looks like a long timeline
  if (historyData.length < 5) {
    historyData = [
      { year: '2017', title: lang === 'mn' ? 'Үйл ажиллагаа эхлэв' : 'Operations Began', desc: lang === 'mn' ? 'Анхны төсөл дээр ажиллаж эхэлсэн түүхэн он.' : 'The historical year we started our first project.', imageUrl: '' },
      { year: '2018', title: lang === 'mn' ? 'Эхний ололт' : 'First Milestone', desc: lang === 'mn' ? 'Дотоодын зах зээлд өөрийн байр сууриа олж авлаа.' : 'Secured our position in the domestic market.', imageUrl: '' },
      { year: '2019', title: lang === 'mn' ? 'Үйлдвэрлэл өргөжив' : 'Production Expanded', desc: lang === 'mn' ? 'Үйлдвэрийн хүчин чадлыг 2 дахин нэмэгдүүлсэн.' : 'Doubled our production capacity.', imageUrl: '' },
      { year: '2020', title: lang === 'mn' ? 'Технологийн шинэчлэл' : 'Tech Upgrade', desc: lang === 'mn' ? 'Шинэ тоног төхөөрөмж нэвтрүүлэв.' : 'Introduced new state-of-the-art equipment.', imageUrl: '' },
      { year: '2021', title: t.about.hist1Title || 'Тогтвортой хөгжил', desc: t.about.hist1Text || 'Байгаль орчинд ээлтэй төслүүд хэрэгжүүлж эхлэв.', imageUrl: '' },
      { year: '2022', title: t.about.hist2Title || 'Олон улсын стандарт', desc: t.about.hist2Text || 'ISO стандартуудыг үйл ажиллагаандаа бүрэн нэвтрүүлсэн.', imageUrl: '' },
      { year: '2023', title: lang === 'mn' ? 'Шилдэг бүтээн байгуулалт' : 'Best Development', desc: lang === 'mn' ? 'Улсын хэмжээний томоохон төслийг амжилттай хүлээлгэн өгсөн.' : 'Successfully delivered a major national project.', imageUrl: '' },
      { year: '2024', title: lang === 'mn' ? 'Ирээдүйн алсын хараа' : 'Future Vision', desc: lang === 'mn' ? 'Цоо шинэ инновацийн төвүүдийг байгуулж байна.' : 'Establishing brand new innovation centers.', imageUrl: '' }
    ];
  }

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
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const nodeRefs = useRef([]);
  const [progressWidth, setProgressWidth] = useState(0);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Sync activeYear for rendering the content
  const activeContent = historyData[activeIndex] || historyData[0];

  // Infinite Marquee Auto-Scroll
  useEffect(() => {
    if (isDragging) return;
    
    let animationId;
    const container = scrollRef.current;
    
    const scrollStep = () => {
      if (container) {
        container.scrollLeft += 0.8; // Smooth continuous flowing speed
        
        // Loop seamlessly if we reach the end (assuming we duplicated the content)
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scrollStep);
    };

    animationId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  // Continuously track which node is closest to the left side of the viewport to update activeIndex
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerLeft = container.scrollLeft;
      
      // Find the node whose offsetLeft is closest to containerLeft + (viewportWidth / 3)
      let closestIndex = 0;
      let minDistance = Infinity;
      const targetPos = containerLeft + (container.clientWidth / 3);

      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        // Since we duplicate the data, we only care about the original indices for activeIndex
        const originalIndex = index % historyData.length;
        const distance = Math.abs(node.offsetLeft - targetPos);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = originalIndex;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, historyData.length]);

  // Update progress blue line
  useEffect(() => {
    // The line should stretch up to the current closest node
    const activeNode = nodeRefs.current[activeIndex];
    if (activeNode) {
      setProgressWidth(activeNode.offsetLeft + (activeNode.offsetWidth / 2));
    }
  }, [activeIndex, historyData.length]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Duplicate the history data to make it infinitely scrollable
  const extendedHistory = [...historyData, ...historyData];

  return (
    <div className="horizontal-history-interactive">
      {/* 1. Horizontal Years Navigation (Continuous Flow) */}
      <div 
        className="horizontal-timeline-viewport"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="horizontal-timeline-nav">
          <div className="horizontal-timeline-line"></div>
          <div className="horizontal-timeline-progress-line" style={{ width: `${progressWidth}px` }}></div>
          {extendedHistory.map((hist, index) => {
            const originalIndex = index % historyData.length;
            const isActive = originalIndex === activeIndex;
            // A node is considered passed if its original index is <= activeIndex, OR if it's in the first loop and we're in the second loop
            const isPassed = index <= (activeIndex + (index >= historyData.length ? historyData.length : 0));
            
            return (
              <div 
                key={`${hist.id || hist.year}-${index}`}
                ref={(el) => (nodeRefs.current[index] = el)}
                className={`horizontal-timeline-node ${isActive ? 'active' : ''} ${isPassed && !isActive ? 'passed' : ''}`}
                onMouseEnter={() => !isDragging && setActiveIndex(originalIndex)}
              >
                <div className="horizontal-timeline-dot"></div>
                <span className="horizontal-timeline-year-text">{hist.year}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Dynamic Content Area */}
      <div className="horizontal-timeline-content-area">
        {activeContent && (
          <motion.div 
            key={activeIndex} // Re-mounts and animates when activeIndex changes
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pickpack-history-right-content"
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
          >
            <div className="pickpack-history-cards-wrapper">
              <div className="pickpack-history-event-card">
                <img 
                  src={activeContent.imageUrl || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"} 
                  alt={activeContent.titleMn || activeContent.title} 
                  loading="lazy" 
                  className="pickpack-history-event-img"
                  draggable={false}
                />
                <div className="pickpack-history-event-info">
                  <h4 className="pickpack-history-event-title">{activeContent.titleMn || activeContent.title}</h4>
                  <p className="pickpack-history-event-desc">{activeContent.descMn || activeContent.desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
