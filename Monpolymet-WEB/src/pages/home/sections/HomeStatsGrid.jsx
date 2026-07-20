import { useEffect, useRef, useState } from 'react';
import '../../../styles/home-bento.css';
import mglHeroImg from '../../../assets/mgl_hero.jpg';
import img2 from '../../../assets/2.jpg';

const CountUp = ({ end, suffix = "", isVisible }) => {
  const countRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !countRef.current) return;
    let startTimestamp = null;
    const duration = 2000; // 2 seconds animation

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // easeOutExpo for a smoother finish
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeOut * end);

      if (countRef.current) {
        countRef.current.innerText = currentCount + suffix;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, isVisible, suffix]);

  return <span ref={countRef}>0{suffix}</span>;
};

export default function HomeStatsGrid({ lang = 'mn' }) {
  const gridRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (gridRef.current) {
      observer.observe(gridRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="home-stats-grid-section container-padding" style={{ fontFamily: "'Inter', sans-serif", paddingTop: '24px', borderBottom: 'none' }}>
      <div className="marquee-container">
        <div className="marquee-content">
          <span>Жишиг нөхөн сэргээгч үндэсний компани - Бат бэх хөгжлийн суурийг хамтдаа бүтээцгээе</span>
          <span className="marquee-dot">•</span>
          <span>Жишиг нөхөн сэргээгч үндэсний компани - Бат бэх хөгжлийн суурийг хамтдаа бүтээцгээе</span>
          <span className="marquee-dot">•</span>
          <span>Жишиг нөхөн сэргээгч үндэсний компани - Бат бэх хөгжлийн суурийг хамтдаа бүтээцгээе</span>
          <span className="marquee-dot">•</span>
          <span>Жишиг нөхөн сэргээгч үндэсний компани - Бат бэх хөгжлийн суурийг хамтдаа бүтээцгээе</span>
          <span className="marquee-dot">•</span>
          {/* Duplicate set for seamless loop */}
          <span>Жишиг нөхөн сэргээгч үндэсний компани - Бат бэх хөгжлийн суурийг хамтдаа бүтээцгээе</span>
          <span className="marquee-dot">•</span>
          <span>Жишиг нөхөн сэргээгч үндэсний компани - Бат бэх хөгжлийн суурийг хамтдаа бүтээцгээе</span>
          <span className="marquee-dot">•</span>
          <span>Жишиг нөхөн сэргээгч үндэсний компани - Бат бэх хөгжлийн суурийг хамтдаа бүтээцгээе</span>
          <span className="marquee-dot">•</span>
          <span>Жишиг нөхөн сэргээгч үндэсний компани - Бат бэх хөгжлийн суурийг хамтдаа бүтээцгээе</span>
          <span className="marquee-dot">•</span>
        </div>
      </div>

      <div style={{ textAlign: 'left', margin: '60px 0 30px 0' }}>
        <h2 className="no-underline" style={{ fontSize: '32px', fontWeight: '600', color: '#000000', letterSpacing: '-0.02em', fontFamily: "'Montserrat', sans-serif" }}>
          {lang === 'mn' ? 'Бидний бүтээсэн үнэ цэн' : 'The Value We Created'}
        </h2>
      </div>

      <div ref={gridRef} className={`bento-grid-container ${revealed ? 'is-revealed' : ''}`}>

        {/* Card 1: Blue Left */}
        <article className="bento-card bento-card-blue">
          <div className="bento-blue-bg-img" style={{ backgroundImage: `url(${mglHeroImg})` }}></div>
          <div className="bento-blue-top">
            <span className="bento-brand" style={{ fontFamily: "'Inter', sans-serif" }}> </span>
            <span className="bento-icon-badge">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <rect x="4" y="14" width="4" height="6" />
                <rect x="10" y="8" width="4" height="12" />
                <rect x="16" y="4" width="4" height="14" />
              </svg>
            </span>
          </div>
          <div className="bento-blue-overlap">
            <h2 className="bento-stat-huge" style={{ fontFamily: "'Inter', sans-serif" }}>
              <CountUp end={1000} suffix="+" isVisible={revealed} />
            </h2>
            <p>Тогтвортой ажлын байр бий болгоод байна.</p>
          </div>
        </article>

        {/* Card 2: Middle Light Gray */}
        <article className="bento-card bento-card-gray" style={{ color: 'white' }}>
          <div className="bento-blue-bg-img" style={{ backgroundImage: `url(${img2})`, height: '100%', filter: 'brightness(0.7)' }}></div>
          <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <p className="bento-sub-title">Тогтвортой хөгжил</p>
            <h2 className="bento-stat-huge" style={{ fontFamily: "'Inter', sans-serif" }}>
              <CountUp end={24} suffix="+" isVisible={revealed} />
            </h2>

            <p className="bento-quote" style={{ marginTop: 'auto', color: 'white', fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.5 }}>
              "Тэргүүний нөхөн сэргээгч, Тогтвортой хөгжлийн менежментийг нэвтрүүлэгч байгууллагаар 24 удаа тасралтгүй шалгарсан."
            </p>
          </div>
        </article>

        {/* Card 3: Right Column Stacked */}
        <div className="bento-col-stacked">
          {/* Top Lime */}
          <article className="bento-card bento-card-lime">
            <p className="bento-sub-title">Нөхөн сэргээлт</p>
            <h2 className="bento-stat-huge" style={{ fontFamily: "'Inter', sans-serif" }}>
              <CountUp end={700} suffix="k+" isVisible={revealed} />
            </h2>
            <p>Нөхөн сэргээлтийн талбайдаа 700,000 гаруй моддыг тарьж 7 хэсэг бүхий ойн төгөл бий болгосон.</p>
          </article>

          {/* Bottom Dark */}
          <article className="bento-card bento-card-dark">
            <div className="bento-dark-content" style={{ justifyContent: 'flex-start', gap: '16px', alignItems: 'center' }}>
              <h2 className="bento-stat-huge" style={{ fontFamily: "'Inter', sans-serif" }}>
                <CountUp end={21} suffix="+" isVisible={revealed} />
              </h2>
              <span className="bento-sub-title text-muted" style={{ margin: 0 }}>Шилдэг ААН</span>
            </div>
            <p className="bento-desc mt-2 text-muted text-sm">Монгол улсын ТОП-100 Аж ахуй нэгжээр 21 удаа шалгарсан.</p>
          </article>
        </div>

      </div>
    </section>
  );
}
