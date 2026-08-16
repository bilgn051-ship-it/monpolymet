import * as LucideIcons from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import webVideo from '../../../assets/WEB.mp4';

const STATS_ITEMS = [
  {
    id: 'lake',
    type: 'waves',
    valueMn: '16га',
    valueEn: '16ha',
    descMn: 'Хүний гараар бүтсэн цэнгэг уст нуур / усны шинэ эх үүсвэр бий болгосон /',
    descEn: 'Man-made freshwater lake / created a new water source /',
  },
  {
    id: 'oxygen',
    type: 'tree-o2',
    valueMn: '+40,000,000кг',
    valueEn: '+40,000,000kg',
    descMn: 'Хүчил төрөгч ялгаруулдаг / 1 жилд /',
    descEn: 'Oxygen produced / per year /',
  },
  {
    id: 'energy-saved',
    type: 'plug-zap',
    valueMn: '+2,5сая кВт цаг',
    valueEn: '+2.5M kWh',
    descMn: 'Эрчим хүч хэмнэсэн',
    descEn: 'Energy saved',
  },
  {
    id: 'co2',
    type: 'cloud-co2',
    valueMn: '+116,000 тн',
    valueEn: '+116,000 tons',
    descMn: 'Нүүрс хүчлийн ялгарал бууруулсан нь 4 сая мод тарьсантай тэнцүү',
    descEn: 'Carbon emissions reduced equivalent to planting 4 million trees',
  },
  {
    id: 'dust',
    type: 'dust',
    valueMn: '+10,000,000кг',
    valueEn: '+10,000,000kg',
    descMn: 'Тоос тоосонцорыг бууруулдаг / 1 жилд /',
    descEn: 'Dust and particulate reduced / per year /',
  },
  {
    id: 'jobs',
    type: 'workers',
    valueMn: '+1000',
    valueEn: '+1000',
    descMn: 'Ажлын байр бий болгосон',
    descEn: 'Jobs created',
  },
  {
    id: 'waste-heat',
    type: 'waste-heat',
    valueMn: '+125сая кВт цаг',
    valueEn: '+125M kWh',
    descMn: 'хаягдал дулаанаас эрчим хүч үйлдвэрлэсэн',
    descEn: 'Electricity generated from waste heat',
  },
  {
    id: 'water-recycle',
    type: 'water-recycle',
    valueMn: '143,000тн',
    valueEn: '143,000 tons',
    descMn: 'Усыг дахин ашигласан',
    descEn: 'Water recycled and reused',
  },
];

function StatIcon({ type }) {
  switch (type) {
    case 'waves':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </svg>
      );
    case 'tree-o2':
      return (
        <svg width="42" height="42" viewBox="0 0 32 32" fill="#ffffff">
          <path d="M16 2 C11 2 7 6 7 11 C7 12.5 7.5 13.9 8.3 15.1 C6.3 16.5 5 18.8 5 21.5 C5 25.6 8.4 29 12.5 29 L14 29 L14 31 L18 31 L18 29 L19.5 29 C23.6 29 27 25.6 27 21.5 C27 18.8 25.7 16.5 23.7 15.1 C24.5 13.9 25 12.5 25 11 C25 6 21 2 16 2 Z" />
          <text x="16" y="19" fill="#0f172a" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="'Montserrat', sans-serif">O₂</text>
        </svg>
      );
    case 'plug-zap':
      return (
        <svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 6v4a5 5 0 0 0 10 0V6" />
          <line x1="10" y1="2" x2="10" y2="6" />
          <line x1="14" y1="2" x2="14" y2="6" />
          <path d="M12 15v3a3 3 0 0 0 6 0v-1" />
          <circle cx="21" cy="20" r="5" fill="#ffffff" fillOpacity="0.2" stroke="#ffffff" />
          <path d="M21 17.5l-1.5 2.5h3l-1.5 2.5" stroke="#ffffff" strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'cloud-co2':
      return (
        <svg width="44" height="44" viewBox="0 0 36 36" fill="#ffffff">
          <path d="M27.5 14 A6.5 6.5 0 0 0 15 11.2 A5 5 0 0 0 6 15.5 A6 6 0 0 0 7 27.5 L27.5 27.5 A6.5 6.5 0 0 0 27.5 14 Z" />
          <text x="17.5" y="23" fill="#0f172a" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="'Montserrat', sans-serif">CO₂</text>
        </svg>
      );
    case 'dust':
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" fill="#ffffff">
          <g transform="translate(18, 7) scale(0.65)">
            <circle cx="10" cy="10" r="3" />
            <rect x="8.5" y="0" width="3" height="20" rx="1.5" />
            <rect x="0" y="8.5" width="20" height="3" rx="1.5" />
            <rect x="8.5" y="0" width="3" height="20" rx="1.5" transform="rotate(45 10 10)" />
            <rect x="8.5" y="0" width="3" height="20" rx="1.5" transform="rotate(-45 10 10)" />
          </g>
          <g transform="translate(3, 15) scale(0.45)">
            <circle cx="10" cy="10" r="3" />
            <rect x="8.5" y="0" width="3" height="20" rx="1.5" />
            <rect x="0" y="8.5" width="20" height="3" rx="1.5" />
            <rect x="8.5" y="0" width="3" height="20" rx="1.5" transform="rotate(45 10 10)" />
            <rect x="8.5" y="0" width="3" height="20" rx="1.5" transform="rotate(-45 10 10)" />
          </g>
          <g transform="translate(7, 5) scale(0.35)">
            <circle cx="10" cy="10" r="3" />
            <rect x="8.5" y="0" width="3" height="20" rx="1.5" />
            <rect x="0" y="8.5" width="20" height="3" rx="1.5" />
            <rect x="8.5" y="0" width="3" height="20" rx="1.5" transform="rotate(45 10 10)" />
            <rect x="8.5" y="0" width="3" height="20" rx="1.5" transform="rotate(-45 10 10)" />
          </g>
          <circle cx="13" cy="24" r="2" />
        </svg>
      );
    case 'workers':
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 17a6 6 0 0 1 12 0v2H8v-2z" />
          <path d="M6 19h16" />
          <path d="M14 11v4" />
          <path d="M4 27c0-4 4-6 8-6" />
          <path d="M22 27c0-4-3-6-7-6" />
        </svg>
      );
    case 'waste-heat':
      return (
        <svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="14" cy="14" r="11" />
          <path d="M15 5L9 15h6l-2 8 8-10h-6l2-8z" fill="#ffffff" stroke="#ffffff" strokeWidth="1" />
        </svg>
      );
    case 'water-recycle':
      return (
        <svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4 C14 4 7 12.5 7 16 A7 7 0 0 0 21 16 C21 12.5 14 4 14 4 Z" fill="#ffffff" />
          <ellipse cx="14" cy="23" rx="11" ry="3" />
          <ellipse cx="14" cy="23" rx="7" ry="1.8" />
        </svg>
      );
    default:
      return <LucideIcons.CheckCircle2 size={36} color="#ffffff" />;
  }
}

export default function CSRHighlight({ lang, data, setCurrentPage }) {
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  let customUrl = data?.imageUrl || '';
  if (customUrl && typeof customUrl === 'string' && customUrl.startsWith('/uploads/')) {
    const defaultHost = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    customUrl = `http://${defaultHost}:4000${customUrl}`;
  }

  const isCustomVideo = customUrl ? Boolean(customUrl.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) : false;
  const isCustomImage = Boolean(customUrl && !isCustomVideo);

  const bgUrl = isCustomVideo ? customUrl : (isCustomImage ? customUrl : webVideo);
  const isVideo = !isCustomImage;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="container-padding" style={{ paddingTop: '30px', paddingBottom: '40px', backgroundColor: '#ffffff' }}>
      <style>{`
        .csr-stats-8-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 36px 28px;
          width: 100%;
        }
        .csr-stat-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .csr-stat-icon-wrapper {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justifyContent: center;
          margin-top: 2px;
        }
        .csr-stat-text-wrapper {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .csr-stat-value {
          font-size: 24px;
          font-weight: 800;
          font-family: 'Montserrat', sans-serif;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }
        .csr-stat-desc {
          font-size: 13.5px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.88);
          font-family: 'Montserrat', sans-serif;
          line-height: 1.45;
          margin-top: 6px;
        }
        @media (max-width: 1200px) {
          .csr-stats-8-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 24px;
          }
        }
        @media (max-width: 640px) {
          .csr-stats-8-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }
          .csr-stat-value {
            font-size: 20px;
          }
          .csr-stat-desc {
            font-size: 13px;
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className="csr-highlight-card"
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '48px 56px',
          backgroundColor: bgUrl ? 'transparent' : '#0f172a',
          backgroundImage: (bgUrl && !isVideo) ? `url("${bgUrl}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 24px 50px rgba(0,0,0,0.12)',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        {/* Video Background */}
        {isVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={bgUrl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0
            }}
          />
        )}

        {/* Gradient Overlay for high text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.78) 50%, rgba(15, 23, 42, 0.65) 100%)',
          zIndex: 1
        }}></div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', color: '#ffffff' }}>

          {/* Badge / Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px'
          }}>
            <span style={{ fontSize: '30px', fontWeight: '700', fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.5px' }}>
              {lang === 'mn' ? (data?.titleMn || 'Тогтвортой хөгжил') : (data?.titleEn || 'Sustainable Development')}
            </span>
          </div>

          {/* Long White Divider Line */}
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            marginBottom: '36px'
          }}></div>

          {/* 8 Stats Grid */}
          <div className="csr-stats-8-grid">
            {STATS_ITEMS.map((item) => (
              <div key={item.id} className="csr-stat-item">
                <div className="csr-stat-icon-wrapper">
                  <StatIcon type={item.type} />
                </div>
                <div className="csr-stat-text-wrapper">
                  <div className="csr-stat-value">
                    {lang === 'mn' ? item.valueMn : item.valueEn}
                  </div>
                  <div className="csr-stat-desc">
                    {lang === 'mn' ? item.descMn : item.descEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div style={{
          marginTop: '40px',
          alignSelf: 'flex-end',
          zIndex: 2
        }}>
          <button
            onClick={() => {
              if (setCurrentPage) {
                setCurrentPage('csr');
              } else {
                window.location.href = '/csr';
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              border: 'none',
              borderRadius: '40px',
              padding: '6px 6px 6px 20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.25)';
            }}
          >
            {lang === 'mn' ? (data?.buttonTextMn || 'Дэлгэрэнгүй') : (data?.buttonTextEn || 'More details')}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#2e7d32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <LucideIcons.Leaf size={18} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
