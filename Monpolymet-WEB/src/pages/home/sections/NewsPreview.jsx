import { ArrowRight } from 'lucide-react';

/**
 * Home-page "Latest news" strip. Cards continuously scroll horizontally as a
 * seamless marquee; hovering the strip pauses the motion and each hovered card
 * reveals a "Read more" link over a darkened image (BHP-style overlay design).
 * Everything links through to the full media page.
 */
export default function NewsPreview({ news, lang, t, setCurrentPage }) {
  const goToNews = () => {
    setCurrentPage('news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Duplicate the list so the marquee can loop back on itself with no seam.
  const loopNews = news.length ? [...news, ...news] : [];
  // Keep the scroll speed constant regardless of how many items there are.
  const duration = `${Math.max(news.length, 1) * 8}s`;

  return (
    <section className="home-news-preview container-padding">
      <div className="news-section-header">
        <div className="news-header-left">
          <h2>{t.news.recent}</h2>
          <button className="more-news-link" onClick={goToNews}>
            {t.news.all}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="news-marquee">
        <div className="news-marquee-track" style={{ animationDuration: duration }}>
          {loopNews.map((item, i) => {
            const title = lang === 'mn' ? item.titleMn : item.titleEn;
            return (
              <button
                key={`${item.id}-${i}`}
                type="button"
                className="news-slide"
                style={{ backgroundImage: `url(${item.image})` }}
                onClick={goToNews}
                aria-label={title}
              >
                <span className="news-slide-overlay" />
                <span className="news-slide-content">
                  <span className="news-slide-badge">{t.nav.news}</span>
                  <span className="news-slide-title">{title}</span>
                  <span className="news-slide-readmore">
                    {t.common.readMore}
                    <ArrowRight size={16} />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
