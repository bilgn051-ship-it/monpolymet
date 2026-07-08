import { useEffect, useRef, useState } from 'react';
import { Leaf, Award, TrendingUp, Users, ArrowRight } from 'lucide-react';

export default function HomeStatsGrid({ lang, setCurrentPage, statCards = [] }) {
  const gridRef = useRef(null);
  // Fall back to immediately-revealed where IntersectionObserver is unavailable.
  const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === 'undefined');

  // Reveal the cards once the grid scrolls into view (staggered via CSS).
  useEffect(() => {
    const node = gridRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clickable + keyboard-accessible card behaviour.
  const cardNav = (page) => ({
    role: 'button',
    tabIndex: 0,
    onClick: () => handleNavigate(page),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNavigate(page);
      }
    },
  });

  const cardReclaimed = statCards.find(c => c.icon?.toLowerCase() === 'leaf') || {
    statValue: '1,000+ га',
    titleMn: 'Нөхөн сэргээсэн талбай (га)',
    titleEn: 'Reclaimed Area (hectares)',
    descriptionMn: 'Бид олборлосон талбай бүртээ 100% биологийн нөхөн сэргээлт хийж, байгалийн унаган төрхийг сэргээн ойжуулж байна.',
    descriptionEn: 'We perform 100% biological reclamation on all mined areas, reforesting and restoring natural ecosystems.'
  };

  const cardExperience = statCards.find(c => c.icon?.toLowerCase() === 'award') || {
    statValue: '30+',
    titleMn: 'Үйл ажиллагаа явуулсан жил',
    titleEn: 'Years of Operation',
    descriptionMn: 'Монполимет Группийн тогтвортой хөгжил, эх орныхоо бүтээн байгуулалтад оруулсан түүхэн хувь нэмэр.',
    descriptionEn: 'Over three decades of active contributions to sustainable development and national production.'
  };

  const cardEmployees = statCards.find(c => c.icon?.toLowerCase() === 'users' || c.icon?.toLowerCase() === 'hardhat') || {
    statValue: '1,200+',
    titleMn: 'Нийт ажилчид',
    titleEn: 'Total Employees',
    descriptionMn: 'Группийн хэмжээнд тогтвортой ажлын байраар хангагдаж, хамтдаа хөгжиж буй чадварлаг баг хамт олон.',
    descriptionEn: 'A skilled and growing workforce provided with stable jobs and long-term career growth.'
  };

  return (
    <section className="home-stats-grid-section container-padding">
      <div ref={gridRef} className={`stats-grid-container ${revealed ? 'is-revealed' : ''}`}>

        {/* Card 1: Tall Card — Ecological Reclamation */}
        <article
          className="stats-grid-card tall-card bg-light-blue"
          style={{ '--reveal-index': 0 }}
          {...cardNav('csr')}
        >
          <div className="card-top-content">
            <span className="grid-card-icon-wrap"><Leaf size={22} strokeWidth={2} /></span>
            <div className="grid-card-stat text-primary">{cardReclaimed.statValue}</div>
            <h3 className="grid-card-title">{lang === 'mn' ? cardReclaimed.titleMn : cardReclaimed.titleEn}</h3>
            <p className="grid-card-desc">
              {lang === 'mn' ? cardReclaimed.descriptionMn : cardReclaimed.descriptionEn}
            </p>
            <span className="grid-card-link"><ArrowRight size={18} /></span>
          </div>
          <div className="card-bottom-image">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60"
              alt="Reclamation"
              className="tall-card-img"
              loading="lazy"
            />
          </div>
        </article>

        {/* Card 2: Orange Card — Years of Experience */}
        <article
          className="stats-grid-card bg-orange"
          style={{ '--reveal-index': 1 }}
          {...cardNav('about')}
        >
          <span className="grid-card-icon-wrap on-accent"><Award size={22} strokeWidth={2} /></span>
          <div className="grid-card-stat text-white">{cardExperience.statValue}</div>
          <h3 className="grid-card-title text-white">{lang === 'mn' ? cardExperience.titleMn : cardExperience.titleEn}</h3>
          <p className="grid-card-desc text-white-muted">
            {lang === 'mn' ? cardExperience.descriptionMn : cardExperience.descriptionEn}
          </p>
          <span className="grid-card-link"><ArrowRight size={18} /></span>
        </article>

        {/* Card 3: White Card — Careers / Employees */}
        <article
          className="stats-grid-card bg-white border-card"
          style={{ '--reveal-index': 2 }}
          {...cardNav('careers')}
        >
          <span className="grid-card-icon-wrap"><Users size={22} strokeWidth={2} /></span>
          <div className="grid-card-stat text-primary">{cardEmployees.statValue}</div>
          <h3 className="grid-card-title">{lang === 'mn' ? cardEmployees.titleMn : cardEmployees.titleEn}</h3>
          <p className="grid-card-desc">
            {lang === 'mn' ? cardEmployees.descriptionMn : cardEmployees.descriptionEn}
          </p>
          <span className="grid-card-link"><ArrowRight size={18} /></span>
        </article>

        {/* Card 4: Beige Card — Group Structure */}
        <article
          className="stats-grid-card bg-beige"
          style={{ '--reveal-index': 3 }}
          {...cardNav('companies')}
        >
          <span className="grid-card-icon-wrap"><TrendingUp size={22} strokeWidth={2} /></span>
          <h3 className="grid-card-title">{lang === 'mn' ? 'Интерактив бүтэц' : 'Group Structure'}</h3>
          <p className="grid-card-desc">
            {lang === 'mn'
              ? 'Уул уурхай, барилга, үйлдвэрлэлийн салбарт тэргүүлэгч салбар компаниудын үйл ажиллагаа.'
              : 'Explore the operations of our leading subsidiary companies in mining, construction, and manufacturing.'}
          </p>
          <span className="grid-card-link"><ArrowRight size={18} /></span>
        </article>

        {/* Card 5: Dark Card — Cement Capacity */}
        <article className="stats-grid-card bg-dark text-white" style={{ '--reveal-index': 4 }}>
          <div className="stats-tab-header">
            <span className="tab-active">MONCEMENT</span>
            <span>OPC 42.5</span>
            <span>CPC 32.5</span>
          </div>
          <div className="stats-stock-value">
            <span className="stock-number">1.0M</span>
            <span className="stock-unit">{lang === 'mn' ? 'тонн / жил' : 'tons / year'}</span>
          </div>
          <p className="stats-stock-desc">
            {lang === 'mn' ? 'Монцемент хуурай аргын цементийн үйлдвэрийн жилийн хүчин чадал.' : 'Annual production capacity of Moncement dry-process plant.'}
          </p>
          <div className="stats-change-label">
            <span className="label-arrow">▲</span>
            <span>100% {lang === 'mn' ? 'Дотоодын үйлдвэр' : 'Domestic'}</span>
          </div>
        </article>

      </div>
    </section>
  );
}
