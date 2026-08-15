import { useEffect, useState } from 'react';
import { fetchHeroSlides } from '../../../api';
import img3 from '../../../assets/3.png';
import imgAa from '../../../assets/aa.png';

const SLIDE_INTERVAL = 6000;

const defaultSlides = [
  {
    image: '/hero-slide-3.jpg',
    titleMn: 'Жишиг нөхөн сэргээгч Үндэсний компани',
    titleEn: 'Benchmark Rehabilitation National Company',
    subtitleMn: '',
    subtitleEn: '',
    ctas: [{ labelMn: 'Бидний тухай', labelEn: 'About us', targetPage: 'about', style: 'primary' }]
  },
  {
    image: img3,
    titleMn: 'Монгол Улсад аж үйлдвэрийн сэргэлтийг авчирч, импортын хараат байдлыг халсан Монцемент',
    titleEn: 'Moncement bringing industrial revival to Mongolia and ending import dependence',
    subtitleMn: '',
    subtitleEn: '',
    ctas: [{ labelMn: 'Дэлгэрэнгүй', labelEn: 'Learn more', targetPage: 'csr', style: 'primary' }]
  },
  {
    image: imgAa,
    titleMn: 'Бат бэх хөгжлийн суурийг хамтдаа бүтээцгээе',
    titleEn: 'Building strong foundations for development together',
    subtitleMn: '',
    subtitleEn: '',
    ctas: [{ labelMn: 'Салбар компаниуд', labelEn: 'Group Companies', targetPage: 'companies', style: 'primary' }]
  },
  {
    image: '/pro_hero.jpg',
    titleMn: 'Байгаль орчинд ээлтэй дэвшилтэт техник, технологи',
    titleEn: 'Environmentally friendly advanced technology and equipment',
    subtitleMn: '',
    subtitleEn: '',
    ctas: [{ labelMn: 'БОНС туршлага', labelEn: 'HSE Experience', targetPage: 'hse', style: 'primary' }]
  },
  {
    image: '/2.jpg',
    titleMn: 'Үндэсний үйлдвэрлэгч, бүтээн байгуулагч – Монполимет Групп',
    titleEn: 'National Producer & Builder - Monpolymet Group',
    subtitleMn: '',
    subtitleEn: '',
    ctas: [{ labelMn: 'Тогтвортой хөгжил', labelEn: 'Sustainability', targetPage: 'csr', style: 'primary' }]
  }
];

export default function Hero({ lang, setCurrentPage }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const [slides, setSlides] = useState(defaultSlides);

  useEffect(() => {
    fetchHeroSlides()
      .then((data) => {
        if (data && data.length >= 5) {
          const mapped = data
            .sort((a, b) => a.order - b.order)
            .map((s, idx) => ({
              video: s.mediaType === 'video' ? s.mediaUrl : null,
              image: s.mediaType === 'image' ? s.mediaUrl : (defaultSlides[idx]?.image || s.mediaUrl),
              titleMn: s.titleMn || defaultSlides[idx]?.titleMn || '',
              titleEn: s.titleEn || defaultSlides[idx]?.titleEn || '',
              subtitleMn: s.subtitleMn || '',
              subtitleEn: s.subtitleEn || '',
              ctas: s.ctas || defaultSlides[idx]?.ctas || [],
            }));
          setSlides(mapped);
          setActiveSlide(0);
        } else {
          setSlides(defaultSlides);
        }
      })
      .catch((e) => console.error("Failed to fetch hero slides:", e));
  }, []);

  // Auto-advance. The timer resets on every slide change (auto or manual) so the
  // bottom-right progress line stays in sync with the actual transition timing.
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearTimeout(timer);
  }, [slides, activeSlide]);

  const goToSlide = (index) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  const activeSlideData = slides[activeSlide] || {};

  return (
    <>
      <section className="hero-section">
        {/* Background Slideshow (Takes 100vh height now) */}
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
              style={slide.video ? { backgroundColor: '#000' } : { backgroundImage: `url(${slide.image})` }}
            >
              {slide.video && (
                <video
                  src={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="hero-video"
                />
              )}
            </div>
          ))}
        </div>

        {/* Hero content overlays the slide background */}
        <div className="hero-content-overlay">
          <div className="hero-text-wrapper animate-fade-in">
            <h1 className="hero-title">
              {typeof (lang === 'mn' ? activeSlideData?.titleMn : activeSlideData?.titleEn) === 'object'
                ? ((lang === 'mn' ? activeSlideData?.titleMn?.mn : activeSlideData?.titleEn?.en) || '')
                : ((lang === 'mn' ? activeSlideData?.titleMn : activeSlideData?.titleEn) || '')}
            </h1>
            {(lang === 'mn' ? activeSlideData?.subtitleMn : activeSlideData?.subtitleEn) && (
              <p className="hero-subtitle">
                {typeof (lang === 'mn' ? activeSlideData?.subtitleMn : activeSlideData?.subtitleEn) === 'object'
                  ? ((lang === 'mn' ? activeSlideData?.subtitleMn?.mn : activeSlideData?.subtitleEn?.en) || '')
                  : ((lang === 'mn' ? activeSlideData?.subtitleMn : activeSlideData?.subtitleEn) || '')}
              </p>
            )}
          </div>
        </div>

        {/* Slide counter with timed progress line (bottom-right) */}
        {slides.length > 1 && (
          <div className="hero-slide-counter">
            <button
              className="counter-arrow"
              onClick={() => goToSlide(activeSlide - 1)}
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <span className="counter-current">{String(activeSlide + 1).padStart(2, '0')}</span>

            <div className="counter-progress">
              <span
                key={activeSlide}
                className="counter-progress-fill"
                style={{ animationDuration: `${SLIDE_INTERVAL}ms` }}
              />
            </div>

            <span className="counter-total">{String(slides.length).padStart(2, '0')}</span>

            <button
              className="counter-arrow"
              onClick={() => goToSlide(activeSlide + 1)}
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </>
  );
}
