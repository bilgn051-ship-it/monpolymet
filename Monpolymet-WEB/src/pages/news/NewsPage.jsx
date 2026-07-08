import SectionHeader from '../../components/ui/SectionHeader';
import NewsCard from '../../components/ui/NewsCard';

export default function NewsPage({ lang, t, news }) {
  return (
    <div className="media-page-container container-padding">
      <SectionHeader tag={t.nav.news} title={t.news.title} subtitle={t.news.subtitle} />

      {/* Featured News Grid */}
      <div className="news-grid">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} lang={lang} showCategory showDateIcon />
        ))}
      </div>
    </div>
  );
}
