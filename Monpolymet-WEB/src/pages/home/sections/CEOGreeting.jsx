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

  const imageUrl = homeContent?.ceoSection?.imageUrl || '/darga.png';

  return (
    <section className="ceo-greeting-section container-padding">
      <div
        ref={containerRef}
        className={`ceo-greeting-container ${revealed ? 'is-revealed' : ''}`}
      >
        {/* Left Side: CEO Portrait as a transparent cutout */}
        <div className="ceo-image-side">
          <div className="ceo-image-frame">
            <img
              src={imageUrl}
              alt={name}
              className="ceo-portrait-large"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Side: Big Message & Bio */}
        <div className="ceo-text-side">
          <h2 className="ceo-section-title">{sectionTitle}</h2>

          <div className="ceo-quote-wrapper">
            <Quote size={48} className="quote-icon-top" aria-hidden="true" />
            <p className="ceo-quote-text">
              “{quote}”
            </p>
          </div>

          <div className="ceo-signature-block">
            <h3 className="ceo-signature-name">{name}</h3>
            <p className="ceo-signature-role">{role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
