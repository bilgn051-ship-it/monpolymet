import { useEffect, useState } from 'react';
import { fetchHeroSlides } from '../../../api';

const SLIDE_INTERVAL = 6000;

export default function Hero({ lang, setCurrentPage }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const defaultSlides = [
    {
      video: "https://assets.mixkit.co/videos/preview/mixkit-heavy-excavator-digging-coal-in-a-quarry-41785-large.mp4",
      titleMn: "Тогтвортой хөгжил – Эх орныхоо барилга бүтээн байгуулалтад",
      titleEn: "Sustainable Development – Building Our Nation's Future",
      subtitleMn: "Монполимет Групп нь Монгол улсын уул уурхай, барилгын материалын тэргүүлэгч үйлдвэрлэгч юм.",
      subtitleEn: "Monpolymet Group is a leading producer of mining and building materials in Mongolia."
    },
    {
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80",
      titleMn: "Байгальд ээлтэй ногоон үйлдвэрлэл, нөхөн сэргээлт",
      titleEn: "Eco-Friendly Green Industry & Restoration",
      subtitleMn: "Бид олборлосон талбай бүртээ 100% биологийн нөхөн сэргээлт хийж, нуур ойг бүтээн байна.",
      subtitleEn: "We perform 100% biological reclamation on every mined site, creating forests and lakes."
    },
    {
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&auto=format&fit=crop&q=80",
      titleMn: "Дэлхийн жишигт нийцсэн Монцемент үйлдвэр",
      titleEn: "World-Class Moncement Dry-Process Plant",
      subtitleMn: "Европын стандартын хуурай аргын технологиор жилд 1 сая тонн цемент үйлдвэрлэдэг.",
      subtitleEn: "Producing 1 million tons of cement annually using European dry-process technology."
    }
  ];

  const [slides, setSlides] = useState(defaultSlides);

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
