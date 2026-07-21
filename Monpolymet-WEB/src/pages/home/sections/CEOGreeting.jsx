import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

export default function CEOGreeting({ lang, homeContent }) {
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === 'undefined');

  // Reveal the section (portrait + staggered text) once it scrolls into view.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const sectionTitle = homeContent?.ceoSection
    ? (lang === 'mn' ? homeContent.ceoSection.sectionTitleMn : homeContent.ceoSection.sectionTitleEn)
    : (lang === 'mn' ? 'Үүсгэн байгуулагчын мэндчилгээ' : 'Message from Founder');

  const quote = homeContent?.ceoSection
    ? (lang === 'mn' ? homeContent.ceoSection.quoteMn : homeContent.ceoSection.quoteEn)
    : (lang === 'mn'
      ? 'Мэргэжлийн хүний хувьд газрын хэвлийгээр хэн дуртайнь оролдох нь мэргэжилгүй хүн мэс засал хийж байгаатайадил гэж үздэг. Иймдээ ч уул уурхайд мэргэжлийн бөгөөдхариуцлагатай байх зарчмыг тогтоохыг зорилгоо болгосон.Олборлолт, нөхөн сэргээлт нь арга билэг мэт хамт байхучиртай.\nБүхий л үйл ажиллагаандаа байгаль орчинд ээлтэй,мэргэжлийн, ёс зүйтэй, хариуцлагатай бизнесийн зарчмыгбаримтлан ажиллах нь бидний үндсэн философи.'
      : 'Dear clients and partners, welcome to Monpolymet Group. Since our inception, we have aimed to make real contributions to our country\'s development. Combining high-quality production with responsible mining while preserving a green environment for future generations remains our ultimate goal.');

  const name = homeContent?.ceoSection
    ? (lang === 'mn' ? homeContent.ceoSection.nameMn : homeContent.ceoSection.nameEn)
    : (lang === 'mn' ? 'Ц.Гарамжав' : 'Garamjav Ts.');

  const role = homeContent?.ceoSection
    ? (lang === 'mn' ? homeContent.ceoSection.roleMn : homeContent.ceoSection.roleEn)
    : (lang === 'mn' ? 'Үүсгэн байгуулагч, ТУЗ-ийн Дарга, Монгол Улсын Хөдөлмөрийн Баатар' : 'Founder, Chairwoman of the Board, Hero of Labor of Mongolia');

  const imageUrl = '/garamjav.png';

  return (
    <section id="ceo-greeting" className="container-padding" style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#ffffff' }}>
      <div
        ref={containerRef}
        className={`ceo-greeting-wrapper ${revealed ? 'is-revealed' : ''}`}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          backgroundColor: 'transparent',
          borderRadius: '32px',
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'flex-start',
          justifyContent: 'center',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        {/* Left Side: CEO Image Card (Smaller/Narrower like Leadership cards) */}
        <div style={{
          flex: '0.35',
          minWidth: '240px',
          maxWidth: '260px',
          height: '320px',
          marginTop: '32px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#e2e8f0',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <img
            src={imageUrl}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
        </div>

        {/* Right Side: Text Card (Longer/Wider) */}
        <div style={{
          flex: '1.5',
          minWidth: '350px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '24px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start'
        }}>
          <h2 className="no-underline" style={{ 
            fontSize: '32px', 
            fontWeight: '600', 
            color: '#000000', 
            marginBottom: '24px', 
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '0.5px',
            textAlign: 'center'
          }}>
            {sectionTitle}
          </h2>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-36px', top: '-6px' }}>
              <Quote size={32} color="#94a3b8" strokeWidth={1.5} style={{ transform: 'rotateY(180deg)' }} />
            </div>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#475569', 
            lineHeight: 1.6, 
            marginBottom: '24px',
            fontFamily: "'Inter', sans-serif",
            whiteSpace: 'pre-line',
            textAlign: 'justify'
          }}>
            {quote}
            <span style={{ display: 'inline-block', marginLeft: '6px', verticalAlign: 'bottom', marginBottom: '-8px' }}>
              <Quote size={32} color="#94a3b8" strokeWidth={1.5} />
            </span>
          </p>
          </div>
          <div style={{ marginTop: 'auto', position: 'relative' }}>
            <style>
              {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');`}
            </style>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0', fontFamily: "'Montserrat', sans-serif" }}>
              {name}
            </h3>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem', fontFamily: "'Inter', sans-serif", lineHeight: '1.4' }}>
              {role}
            </p>
            <div style={{ marginTop: '4px', marginLeft: '16px' }}>
              <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '36px', color: '#94a3b8', fontWeight: '400', transform: 'rotate(-5deg)', display: 'inline-block', lineHeight: '0.8' }}>
                Garamjav.Ts
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
