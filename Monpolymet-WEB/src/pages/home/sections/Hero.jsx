import { useEffect, useState } from 'react';
import { fetchHeroSlides } from '../../../api';
import mglHero from '../../../assets/mgl_hero.jpg';
import proHero from '../../../assets/pro_hero.jpg';
import heroVideo from '../../../assets/WEB.mp4';

const SLIDE_INTERVAL = 6000;

const DEFAULT_SLIDES = [
  {
    video: heroVideo,
    image: mglHero,
    titleMn: 'Эх Орны Өв Бэлэг, Ирээдүйн Бүтээн Байгуулалт',
    titleEn: 'Heritage of the Homeland, Future Construction',
    subtitleMn: 'Байгаль орчинд ээлтэй, тогтвортой хөгжлийг түүчээлэгч Монполимет Групп',
    subtitleEn: 'Monpolymet Group, leading eco-friendly and sustainable development',
  },
  {
    image: proHero,
    titleMn: 'Монцемент Үйлдвэр & Нөхөн Сэргээлт',
    titleEn: 'Moncement Plant & Eco Reclamation',
    subtitleMn: 'Дэвшилтэт технологи, 100% үндэсний бүтээн байгуулалт',
    subtitleEn: 'Advanced technology, 100% national development',
  }
];

export default function Hero({ lang, setCurrentPage }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const [slides, setSlides] = useState(DEFAULT_SLIDES);

  useEffect(() => {
    fetchHeroSlides()
      .then((data) => {
        if (data && data.length) {
          const mapped = data
            .sort((a, b) => a.order - b.order)
            .map(s => ({
              video: s.mediaType === 'video' ? s.mediaUrl : null,
              image: s.mediaType === 'image' ? s.mediaUrl : null,
              titleMn: s.titleMn,
              titleEn: s.titleEn,
              subtitleMn: s.subtitleMn,
              subtitleEn: s.subtitleEn,
              ctas: s.ctas,
            }));
          setSlides(mapped);
          setActiveSlide(0);
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
              {lang === 'mn' ? activeSlideData.titleMn : activeSlideData.titleEn}
            </h1>
            <p className="hero-subtitle">
              {lang === 'mn' ? activeSlideData.subtitleMn : activeSlideData.subtitleEn}
            </p>

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
