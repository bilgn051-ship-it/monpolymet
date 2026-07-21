import NewsCard from '../../../components/ui/NewsCard';
import { Newspaper } from 'lucide-react';


export default function NewsPreview({ news, lang, t, setCurrentPage }) {
  const goToNews = () => {
    setCurrentPage('news');
  };

  // Get only the 3 most recent news items
  const recentNews = news ? news.slice(0, 3) : [];

  return (
    <section className="home-news-preview container-padding" style={{ borderTop: 'none', paddingBottom: '20px', paddingTop: '40px' }}>
      <div className="news-section-header" style={{ justifyContent: 'center' }}>
        <h2 className="pill-badge-heading">
          {lang === 'mn' ? 'Мэдээ мэдээлэл' : 'News & Updates'}
        </h2>
      </div>

      <div className="news-preview-grid">
        {recentNews.map((item, i) => (
          <NewsCard
            key={`${item.id}-${i}`}
            item={item}
            lang={lang}
            onReadMore={() => setCurrentPage('post', item.id.toString())}
          />
        ))}
      </div>

      <div className="news-preview-footer">
        <button className="read-all-btn" onClick={goToNews}>
          <Newspaper size={16} color="var(--primary-color)" />
          {lang === 'mn' ? 'Бүх мэдээг унших' : 'Read all news'}
        </button>
      </div>
    </section>
  );
}
