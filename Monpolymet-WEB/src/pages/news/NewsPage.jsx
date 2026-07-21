import { useState } from 'react';
import NewsCard from '../../components/ui/NewsCard';

export default function NewsPage({ news = [], lang, t, pageMetadata, setCurrentPage }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', labelMn: 'Бүх мэдээ', labelEn: 'All News' },
    { id: 'press', labelMn: 'Хэвлэлийн мэдээ', labelEn: 'Press Release' },
    { id: 'mining', labelMn: 'Уул уурхай', labelEn: 'Mining' },
    { id: 'csr', labelMn: 'Тогтвортой хөгжил', labelEn: 'Sustainable Development' }
  ];

  const activeCatObj = categories.find(c => c.id === activeCategory);
  const filteredNews = activeCategory === 'all' 
    ? news 
    : news.filter(item => {
        const matchesMn = item.categoryMn && activeCatObj && item.categoryMn.toLowerCase() === activeCatObj.labelMn.toLowerCase();
        const matchesEn = item.categoryEn && activeCatObj && item.categoryEn.toLowerCase() === activeCatObj.labelEn.toLowerCase();
        const matchesId = item.categoryId === activeCategory;
        return matchesMn || matchesEn || matchesId;
      });

  return (
    <>
      <div className="full-bleed-banner" style={{
        backgroundImage: `url('https://cdn.greensoft.mn//uploads/site/1568/page/new_3bb04f9131b3bdbe252001cb84bbcf0a03b07597.jpg')`,
        backgroundColor: '#0f172a'
      }}>
        <div className="full-bleed-banner-overlay"></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up">
            <h1 className="hero-title">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : t.news.title}
            </h1>
            <p className="hero-subtitle">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) : t.news.subtitle}
            </p>
          </div>
        </div>
      </div>
      
      <div id="news-list" className="media-page-container container-padding" style={{ backgroundColor: '#f8fafc', paddingBottom: '100px' }}>
        
        {/* Category Filters */}
        <div className="premium-news-filters animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={`premium-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {lang === 'mn' ? cat.labelMn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Standard News Grid */}
        <div className="news-grid-layout">
          {filteredNews.map((item, index) => (
            <NewsCard 
              key={item.id}
              item={item} 
              lang={lang} 
              onReadMore={() => setCurrentPage('post', item.id.toString())} 
            />
          ))}
        </div>
      </div>
    </>
  );
}
