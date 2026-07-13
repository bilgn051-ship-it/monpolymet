import { useState, useEffect } from 'react';
import Hero from './sections/Hero';
import HomeStatsGrid from './sections/HomeStatsGrid';
import CEOGreeting from './sections/CEOGreeting';
import NewsPreview from './sections/NewsPreview';
import { fetchHomeContent, fetchStatCards } from '../../api';

export default function HomePage({ lang, t, news, setCurrentPage }) {
  const [homeContent, setHomeContent] = useState(null);
  const [statCards, setStatCards] = useState([]);

  useEffect(() => {
    fetchHomeContent()
      .then(setHomeContent)
      .catch((e) => console.error("Failed to fetch home content:", e));

    fetchStatCards()
      .then((data) => {
        if (data && data.length) setStatCards(data);
      })
      .catch((e) => console.error("Failed to fetch stat cards:", e));
  }, []);

  return (
    <div className="home-view animate-fade-in">
      <Hero lang={lang} setCurrentPage={setCurrentPage} />
      <HomeStatsGrid lang={lang} setCurrentPage={setCurrentPage} statCards={statCards} />
      <CEOGreeting lang={lang} t={t} homeContent={homeContent} />
      <NewsPreview news={news} lang={lang} t={t} setCurrentPage={setCurrentPage} />
    </div>
  );
}
