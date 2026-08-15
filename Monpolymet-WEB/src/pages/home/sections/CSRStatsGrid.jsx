import { useEffect, useRef, useState } from 'react';

const CountUp = ({ end, prefix = "", suffix = "", isVisible }) => {
  const countRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !countRef.current) return;
    let startTimestamp = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeOut * end);

      if (countRef.current) {
        countRef.current.innerText = prefix + currentCount.toLocaleString('en-US') + suffix;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, isVisible, prefix, suffix]);

  return <span ref={countRef}>{prefix}0{suffix}</span>;
};

const statsData = [
  { value: 600, prefix: '', suffix: '+ га', titleMn: 'Биологийн нөхөн сэргээлт', subMn: 'талбайд хийсэн', titleEn: 'Biological reclamation', subEn: 'area completed' },
  { value: 16, prefix: '', suffix: ' га', titleMn: 'Цэнгэг уст Тосон нуур', subMn: 'талбайд байгуулсан', titleEn: 'Freshwater Toson Lake', subEn: 'established in the area' },
  { value: 300, prefix: '', suffix: '+ га', titleMn: 'Бэлчээрийн олон наст ургамал', subMn: 'талбайд тарьж, ургуулсан', titleEn: 'Perennial Pasture Plants', subEn: 'cultivated in the area' },
  { value: 5, prefix: '', suffix: ' га', titleMn: 'Жимс, жимсгэнийн мод бут', subMn: 'талбайд тариалсан', titleEn: 'Fruit Trees & Berry Bushes', subEn: 'planted in the area' },
  { value: 10000000, prefix: '', suffix: ' кг', titleMn: 'Тоосонцор бууруулдаг', subMn: '/1 жилд/', titleEn: 'Dust Reduced', subEn: '/per year/' },
  { value: 300000, prefix: '', suffix: '+', titleMn: 'Мод тарьж ургуулсан', subMn: 'ногоон байгууламж', titleEn: 'Trees planted', subEn: 'green development' }
];

export default function CSRStatsGrid({ lang = 'mn', data = [] }) {
  const containerRef = useRef(null);
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
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="csr-stats-section container-padding" style={{ padding: '40px 0', backgroundColor: '#f8fafc' }}>
      <style>{`
        .csr-stats-grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .csr-stat-number {
          font-size: 38px;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          color: #2563eb;
          margin-bottom: 12px;
          line-height: 1.2;
          word-break: normal;
        }
        @media (max-width: 992px) {
          .csr-stats-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .csr-stat-number {
            font-size: 32px;
          }
        }
        @media (max-width: 576px) {
          .csr-stats-grid-container {
            grid-template-columns: 1fr;
          }
          .csr-stat-number {
            font-size: 26px;
          }
        }
      `}</style>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        {/* Centered Pill Title */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{
            border: '1px solid var(--primary-color)',
            borderRadius: '24px',
            padding: '12px 32px',
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: "'Montserrat', sans-serif",
            color: '#0f172a',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {lang === 'mn' ? 'Тоон үзүүлэлтүүд' : 'Statistics'}
          </div>
        </div>

        <div className="csr-stats-grid-container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {(data && data.length > 0 ? data : statsData).map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                border: '1px dashed #bfdbfe',
                borderRadius: '24px',
                padding: '36px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="csr-stat-number">
                <CountUp end={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} isVisible={revealed} />
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#0f172a',
                fontFamily: "'Montserrat', sans-serif",
                marginBottom: '8px',
                lineHeight: '1.3'
              }}>
                {lang === 'mn' ? stat.titleMn : stat.titleEn}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#64748b',
                fontFamily: "'Montserrat', sans-serif",
                lineHeight: '1.5'
              }}>
                {lang === 'mn' ? stat.subMn : stat.subEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
