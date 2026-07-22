import { useEffect, useRef, useState } from 'react';



const statsData = [
  { value: 60, prefix: '', suffix: '%', titleMn: 'Биологийн нөхөн сэргээлт', subMn: 'хийсэн талбайн эзлэх хувь', titleEn: 'Biological reclamation', subEn: 'percentage of the area' },
  { value: 16, prefix: '', suffix: 'га', titleMn: 'Цэнгэг уст нуур', subMn: 'Нөхөн сэргээлтийн хүрээнд байгуулсан', titleEn: 'Freshwater lake', subEn: 'created under reclamation' },
  { value: 300, prefix: '', suffix: 'га', titleMn: 'Бэлчээрийн талбай', subMn: 'байгуулсан хэмжээ', titleEn: 'Pasture area', subEn: 'established size' },
  { value: 8, prefix: '', suffix: 'га', titleMn: 'Жимс, жимсгэний мод', subMn: 'бут тарьсан талбайн хэмжээ', titleEn: 'Fruit trees', subEn: 'planted area size' },
  { value: 40000000, prefix: '', suffix: 'кг', titleMn: 'Хүчилтөрөгч ялгаруулдаг', subMn: '/1 жилд/', titleEn: 'Oxygen produced', subEn: '/per year/' },
  { value: 600, prefix: '+', suffix: 'га', titleMn: 'Биологийн нөхөн сэргээлт', subMn: 'Талбайд хийсэн', titleEn: 'Biological reclamation', subEn: 'done in the area' }
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
          font-size: 42px;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          background: linear-gradient(90deg, #10b981, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
                {stat.prefix}{stat.value.toLocaleString('en-US')}{stat.suffix}
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
