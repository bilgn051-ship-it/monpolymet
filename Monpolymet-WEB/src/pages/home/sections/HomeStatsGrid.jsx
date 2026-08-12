import { useEffect, useRef, useState } from 'react';
import '../../../styles/home-bento.css';
import mglHeroImg from '../../../assets/mgl_hero.jpg';
import img2 from '../../../assets/2.jpg';
import InteractiveTitle from '../../../components/ui/InteractiveTitle';

export default function HomeStatsGrid({ lang = 'mn' }) {
  const isMn = lang === 'mn';
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

  const headerText = lang === 'mn'
    ? 'Шинэ технологи, шилдэг санаа, ногоон хөгжилд суурилсан үйлдвэрлэл, бүтээн байгуулалтыг Монголдоо бүтээцгээе'
    : 'Creating industrial development & national production based on new technology and green development in Mongolia';

  return (
    <section className="home-stats-grid-section container-padding" style={{ fontFamily: "'Inter', sans-serif", paddingTop: '24px', paddingBottom: '30px', borderBottom: 'none' }}>
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

      <div style={{ textAlign: 'center', margin: '76px 0 100px 0', padding: '0 20px' }}>
        <h2 className="no-underline" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: '1.35', fontWeight: '600', color: '#0f172a', letterSpacing: '-0.02em', fontFamily: "'Montserrat', sans-serif", maxWidth: '1000px', margin: '0 auto' }}>
          {lang === 'mn' ? (
            <>Шинэ технологи, шилдэг санаа, ногоон хөгжилд суурилсан үйлдвэрлэл, бүтээн байгуулалтыг Монголдоо бүтээцгээе</>
          ) : (
            <>Creating industrial development & national production based on new technology and green development in Mongolia</>
          )}
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
              1,000+
            </h2>
            <p>{isMn ? 'Тогтвортой, ээлтэй ажлын байр' : 'Sustainable & friendly jobs'}</p>
          </div>
        </article>

        {/* Card 2: Middle Light Gray */}
        <article className="bento-card bento-card-gray" style={{ color: 'white' }}>
          <div className="bento-blue-bg-img" style={{ backgroundImage: `url(${img2})`, height: '100%', filter: 'brightness(0.7)' }}></div>
          <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <p className="bento-sub-title">Тогтвортой хөгжил</p>
            <h2 className="bento-stat-huge" style={{ fontFamily: "'Inter', sans-serif" }}>
              24+
            </h2>

            <p className="bento-quote" style={{ marginTop: 'auto', color: 'white', fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.5 }}>
              "Тэргүүний нөхөн сэргээгч, тогтвортой хөгжлийн менежментийг нэвтрүүлэгч байгууллага"
            </p>
          </div>
        </article>

        {/* Card 3: Right Column Stacked */}
        <div className="bento-col-stacked">
          {/* Top Lime */}
          <article className="bento-card bento-card-lime">
            <p className="bento-sub-title">Нөхөн сэргээлт</p>
            <h2 className="bento-stat-huge" style={{ fontFamily: "'Inter', sans-serif" }}>
              460k+
            </h2>
            <p>Биологийн нөхөн сэргээлт хийсэн талбайдаа 460к+ мод тарьж 8 ойн төгөл бий болгосон.</p>
          </article>

          {/* Bottom Dark */}
          <article className="bento-card bento-card-dark">
            <div className="bento-dark-content" style={{ justifyContent: 'flex-start', gap: '16px', alignItems: 'center' }}>
              <h2 className="bento-stat-huge" style={{ fontFamily: "'Inter', sans-serif" }}>
                21+
              </h2>
              <span className="bento-sub-title text-muted" style={{ margin: 0 }}>Шилдэг ААН</span>
            </div>
            <p className="bento-desc mt-2 text-muted text-sm">Монгол Улсын ТОП100 аж ахуйн нэгж</p>
          </article>
        </div>

      </div>
    </section>
  );
}
