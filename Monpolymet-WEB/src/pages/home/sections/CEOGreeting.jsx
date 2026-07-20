import { useEffect, useRef, useState } from 'react';
// Removed unused Quote

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
    : (lang === 'mn' ? 'Удирдлагын мэндчилгээ' : 'Message from Leadership');

  const quote = homeContent?.ceoSection
    ? (lang === 'mn' ? homeContent.ceoSection.quoteMn : homeContent.ceoSection.quoteEn)
    : (lang === 'mn'
        ? 'Эрхэм харилцагчид, хамтран ажиллагч түншүүд ээ, Монполимет Группийн вэбсайтаар зочилж буй танд энэ өдрийн мэнд хүргэе. Бид үүсгэн байгуулагдсан цагаасаа эхлэн эх орныхоо хөгжил дэвшилд бодит хувь нэмэр оруулахыг зорин ажиллаж ирсэн. Чанартай үйлдвэрлэл болон хариуцлагатай уул уурхайг хослуулан, ирээдүй хойчдоо ногоон байгалийг үлдээх нь бидний туйлын зорилго билээ.'
        : 'Dear clients and partners, welcome to Monpolymet Group. Since our inception, we have aimed to make real contributions to our country\'s development. Combining high-quality production with responsible mining while preserving a green environment for future generations remains our ultimate goal.');

  const name = homeContent?.ceoSection
    ? (lang === 'mn' ? homeContent.ceoSection.nameMn : homeContent.ceoSection.nameEn)
    : (lang === 'mn' ? 'Ц.Гарамжав' : 'Garamjav Ts.');

  const role = homeContent?.ceoSection
    ? (lang === 'mn' ? homeContent.ceoSection.roleMn : homeContent.ceoSection.roleEn)
    : (lang === 'mn' ? 'Үүсгэн байгуулагч, ТУЗ-ийн Дарга' : 'Founder, Chairwoman of the Board');

  const imageUrl = '/darga.png';

  return (
    <section className="container-padding" style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#ffffff' }}>
      <div
        ref={containerRef}
        className={`ceo-greeting-wrapper ${revealed ? 'is-revealed' : ''}`}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          backgroundColor: '#f6f4ed', // Beige background like the image
          borderRadius: '32px',
          padding: '24px',
          width: '100%',
          alignItems: 'stretch',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        {/* Left Side: CEO Image Card (Smaller/Narrower) */}
        <div style={{ 
          flex: '0.8', 
          minWidth: '300px', 
          borderRadius: '24px', 
          overflow: 'hidden',
          backgroundColor: '#e2e8f0' 
        }}>
          <img
            src={imageUrl}
            alt={name}
            style={{ width: '100%', height: '100%', minHeight: '450px', objectFit: 'cover', display: 'block', filter: 'none' }}
            loading="lazy"
          />
        </div>

        {/* Right Side: Text Card (Longer/Wider) */}
        <div style={{ 
          flex: '1.5', 
          minWidth: '350px',
          backgroundColor: '#ffffff', 
          borderRadius: '24px', 
          padding: '48px 56px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#0f172a', 
            marginBottom: '24px', 
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '-0.02em'
          }}>
            {sectionTitle}
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#475569', 
            lineHeight: 1.8, 
            marginBottom: '40px',
            fontFamily: "'Inter', sans-serif"
          }}>
            {quote}
          </p>
          <div style={{ marginTop: 'auto' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0', fontFamily: "'Montserrat', sans-serif" }}>
              {name}
            </h3>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem', fontFamily: "'Inter', sans-serif" }}>
              {role}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
