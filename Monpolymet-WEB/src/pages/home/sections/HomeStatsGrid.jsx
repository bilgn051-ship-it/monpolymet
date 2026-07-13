import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import DynamicIcon from '../../../components/ui/DynamicIcon';

export default function HomeStatsGrid({ lang, setCurrentPage, statCards = [] }) {
  const gridRef = useRef(null);
  const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === 'undefined');

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
    if (!page) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cardNav = (page) => {
    if (!page) return {};
    return {
      role: 'button',
      tabIndex: 0,
      onClick: () => handleNavigate(page),
      onKeyDown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigate(page);
        }
      },
    };
  };

  const displayCards = statCards && statCards.length > 0 
    ? [...statCards].sort((a, b) => a.order - b.order) 
    : [
      { variant: 'tall', colorTheme: 'light-blue', icon: 'Leaf', statValue: '1,000+ га', titleMn: 'Нөхөн сэргээсэн талбай (га)', titleEn: 'Reclaimed Area (hectares)', descriptionMn: 'Бид олборлосон талбай бүртээ 100% биологийн нөхөн сэргээлт хийж байна.', descriptionEn: 'We perform 100% biological reclamation.', targetPage: 'csr', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800' },
      { variant: 'standard', colorTheme: 'orange', icon: 'Award', statValue: '30+', titleMn: 'Үйл ажиллагаа явуулсан жил', titleEn: 'Years of Operation', descriptionMn: 'Түүхэн хувь нэмэр.', descriptionEn: 'Historical contribution.', targetPage: 'about' },
      { variant: 'standard', colorTheme: 'white', icon: 'Users', statValue: '1,200+', titleMn: 'Нийт ажилчид', titleEn: 'Total Employees', descriptionMn: 'Тогтвортой ажлын байр.', descriptionEn: 'Stable jobs.', targetPage: 'careers' },
      { variant: 'standard', colorTheme: 'beige', icon: 'TrendingUp', statValue: '', titleMn: 'Интерактив бүтэц', titleEn: 'Group Structure', descriptionMn: 'Салбар компаниудын үйл ажиллагаа.', descriptionEn: 'Operations of subsidiaries.', targetPage: 'companies' },
      { variant: 'ticker', colorTheme: 'dark', icon: '', statValue: '1.0M', titleMn: 'Монцемент хүчин чадал', titleEn: 'Moncement Capacity', descriptionMn: 'хуурай аргын цементийн үйлдвэр.', descriptionEn: 'Dry process plant.', targetPage: '' },
    ];

  return (
    <section className="home-stats-grid-section container-padding">
      <div ref={gridRef} className={`stats-grid-container ${revealed ? 'is-revealed' : ''}`}>
        
        {displayCards.map((card, idx) => {
          const title = lang === 'mn' ? (card.titleMn || '') : (card.titleEn || '');
          const desc = lang === 'mn' ? (card.descriptionMn || '') : (card.descriptionEn || '');
          const isDark = card.colorTheme === 'dark';
          const textClass = isDark ? 'text-white' : '';
          
          if (card.variant === 'ticker') {
            return (
              <article key={idx} className={`stats-grid-card bg-${card.colorTheme} ${textClass}`} style={{ '--reveal-index': idx }} {...cardNav(card.targetPage)}>
                <div className="stats-tab-header">
                  <span className="tab-active">{title}</span>
                </div>
                <div className="stats-stock-value">
                  <span className="stock-number">{card.statValue}</span>
                </div>
                <p className="stats-stock-desc">{desc}</p>
                <div className="stats-chart-placeholder">
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,40 Q10,20 20,25 T40,15 T60,20 T80,5 T100,10 L100,40 Z" fill={isDark ? "rgba(255,255,255,0.1)" : "rgba(6,76,173,0.1)"}/>
                    <polyline points="0,40 10,20 20,25 40,15 60,20 80,5 100,10" fill="none" stroke={isDark ? "currentColor" : "var(--primary-color)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </article>
            );
          }
          
          return (
            <article 
              key={idx}
              className={`stats-grid-card bg-${card.colorTheme || 'white'} ${card.variant === 'tall' ? 'tall-card' : ''} ${card.colorTheme === 'white' ? 'border-card' : ''}`}
              style={{ '--reveal-index': idx }}
              {...cardNav(card.targetPage)}
            >
              {card.variant === 'tall' ? (
                <>
                  <div className="card-top-content">
                    {card.icon && <span className="grid-card-icon-wrap"><DynamicIcon name={card.icon} size={22} strokeWidth={2} /></span>}
                    {card.statValue && <div className={`grid-card-stat ${isDark ? 'text-white' : 'text-primary'}`}>{card.statValue}</div>}
                    <h3 className={`grid-card-title ${textClass}`}>{title}</h3>
                    <p className={`grid-card-desc ${isDark ? 'text-white-muted' : ''}`}>{desc}</p>
                    {card.targetPage && <span className="grid-card-link"><ArrowRight size={18} /></span>}
                  </div>
                  {card.imageUrl && (
                    <div className="card-bottom-image">
                      <img src={card.imageUrl} alt={title} className="tall-card-img" loading="lazy" />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {card.icon && <span className={`grid-card-icon-wrap ${card.colorTheme === 'orange' ? 'on-accent' : ''}`}><DynamicIcon name={card.icon} size={22} strokeWidth={2} /></span>}
                  {card.statValue && <div className={`grid-card-stat ${textClass || 'text-primary'}`}>{card.statValue}</div>}
                  <h3 className={`grid-card-title ${textClass}`}>{title}</h3>
                  <p className={`grid-card-desc ${isDark ? 'text-white-muted' : ''}`}>{desc}</p>
                  {card.targetPage && <span className="grid-card-link"><ArrowRight size={18} /></span>}
                </>
              )}
            </article>
          );
        })}

      </div>
    </section>
  );
}
