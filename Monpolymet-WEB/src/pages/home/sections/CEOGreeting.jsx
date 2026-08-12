import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import garamjavSignature from '../../../assets/garamjav-signature.png';

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
    : (lang === 'mn' ? 'Үүсгэн байгуулагчийн мэндчилгээ' : 'Message from the Founder');

  const quote = homeContent?.ceoSection
    ? (lang === 'mn' ? homeContent.ceoSection.quoteMn : homeContent.ceoSection.quoteEn)
    : (lang === 'mn'
      ? 'Бид үйл ажиллагаа явуулж буй бүхий л салбартаа хүн, байгаль, нийгмийн харилцан хөгжил, ирээдүйн сайн сайхныг эрхэмлэдэг билээ. Байгалийн нөөцийг тогтвортой ашиглаж, мэргэжлийн бөгөөд хариуцлагатай уул уурхайн зарчмыг төлөвшүүлж, байгаль орчны нөхөн сэргээлтийн жишгийг тогтоон, ашиглалт олборлолтоос нэмүү өртөг шингэсэн стратегийн бүтээгдэхүүн үйлдвэрлэлийг цогцлоосон.\n\nМонполимет группийн үйл ажиллагаа монгол хүний хөгжилд, эх дэлхий, байгалийн тогтвортой оршихуйд, үндэсний үйлдвэрийн бие даасан байдлыг хамгаалахад, Монгол Улсын эдийн засгийн тусгаар тогтнолд, нийгмийн сайн сайхныг бүтээхэд томоохон хувь нэмрийг оруулсаар байна.\n\nИймдээ ч монгол хүн бүрийн сэтгэлд эх орныхоо хөгжлийн төлөөх санал, санаачлага үргэлж байдаг гэдэгт итгэдэг.'
      : 'We prioritize the mutual development of people, nature, and society, as well as future well-being across all sectors of our operations. By utilizing natural resources sustainably, instilling professional and responsible mining principles, establishing standards for environmental restoration, and creating value-added strategic product manufacturing from extraction.\n\nMonpolymet Group\'s operations continue to make significant contributions to the development of Mongolian citizens, the sustainable existence of our Mother Earth, the protection of national industrial independence, the economic sovereignty of Mongolia, and the creation of social well-being.\n\nTherefore, we believe that thoughts and initiatives for our nation\'s development are always present in the heart of every Mongolian.');

  const name = homeContent?.ceoSection
    ? (lang === 'mn' ? homeContent.ceoSection.nameMn : homeContent.ceoSection.nameEn)
    : (lang === 'mn' ? 'Ц.Гарамжав' : 'Ts. Garamjav');

  const role = homeContent?.ceoSection
    ? (lang === 'mn' ? homeContent.ceoSection.roleMn : homeContent.ceoSection.roleEn)
    : (lang === 'mn' ? 'Үүсгэн байгуулагч, Монгол Улсын Хөдөлмөрийн Баатар' : 'Founder, Hero of Labor of Mongolia');

  const imageUrl = homeContent?.ceoSection?.imageUrl !== undefined ? homeContent.ceoSection.imageUrl : '/garamjav.png';

  return (
    <section id="ceo-greeting" style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#ffffff', paddingLeft: '24px', paddingRight: '24px', boxSizing: 'border-box' }}>
      <div
        ref={containerRef}
        className={`ceo-greeting-wrapper ${revealed ? 'is-revealed' : ''}`}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: 'transparent',
          borderRadius: '32px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        {/* Left Side: CEO Image Card (Matches 5 leadership cards size) */}
        {imageUrl ? (
          <div style={{
            width: '260px',
            height: '327px',
            marginTop: '40px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#e2e8f0',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
            flexShrink: 0
          }}>
            <img
              src={imageUrl}
              alt={name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              loading="lazy"
            />
          </div>
        ) : null}

        {/* Right Side: Text Card (Longer/Wider) */}
        <div style={{
          flex: '1',
          minWidth: '320px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '32px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          boxSizing: 'border-box'
        }}>
          <h2 className="no-underline" style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#000000',
            marginBottom: '20px',
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '0.5px',
            textAlign: 'left'
          }}>
            {sectionTitle}
          </h2>
          <div style={{ marginBottom: '20px' }}>
            {quote.split('\n').filter(p => p.trim() !== '').map((para, index) => (
              <p key={index} style={{
                fontSize: '0.95rem',
                color: '#475569',
                lineHeight: 1.3,
                marginBottom: '10px',
                fontFamily: "'Inter', sans-serif",
                textAlign: 'justify',
                textJustify: 'inter-word',
                hyphens: 'none',
                WebkitHyphens: 'none',
                wordBreak: 'normal',
                textIndent: '1.5rem'
              }}>
                {para.trim()}
              </p>
            ))}
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
            <div style={{ marginTop: '4px', marginLeft: '-12px' }}>
              <img
                src={garamjavSignature}
                alt="Ц.Гарамжав Гарын үсэг"
                style={{
                  height: '75px',
                  width: 'auto',
                  mixBlendMode: 'multiply',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
