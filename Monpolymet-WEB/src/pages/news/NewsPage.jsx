import SectionHeader from '../../components/ui/SectionHeader';
import NewsCard from '../../components/ui/NewsCard';

export default function NewsPage({ news = [], lang, t, pageMetadata }) {
  return (
    <div className="media-page-container container-padding">
      <SectionHeader tag={t.nav.news} title={t.news.title} subtitle={t.news.subtitle} pageMetadata={pageMetadata} lang={lang} />

      {/* Featured News Grid */}
      <div className="news-grid">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} lang={lang} showCategory showDateIcon />
        ))}
      </div>
    </div>
  );
}
