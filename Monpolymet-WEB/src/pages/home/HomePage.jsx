import { useEffect } from 'react';
import Hero from './sections/Hero';
import HomeStatsGrid from './sections/HomeStatsGrid';
import CSRHighlight from './sections/CSRHighlight';
import CSRStatsGrid from './sections/CSRStatsGrid';
import NewsPreview from './sections/NewsPreview';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { fetchHomeContent, fetchStatCards, fetchCsrStats, fetchCsrHighlight } from '../../api';

export default function HomePage({ lang, t, news, setCurrentPage }) {
  const [homeContent, setHomeContent] = useLocalStorageState('monpolymet_home_content', null);
  const [statCards, setStatCards] = useLocalStorageState('monpolymet_home_stat_cards', []);
  const [csrStats, setCsrStats] = useLocalStorageState('monpolymet_home_csr_stats', []);
  const [csrHighlight, setCsrHighlight] = useLocalStorageState('monpolymet_home_csr_highlight', null);

  useEffect(() => {
    fetchHomeContent()
      .then((data) => { if (data) setHomeContent(data); })
      .catch((e) => console.error("Failed to fetch home content:", e));

    fetchStatCards()
      .then((data) => {
        if (data && data.length) setStatCards(data);
      })
      .catch((e) => console.error("Failed to fetch stat cards:", e));

    fetchCsrStats()
      .then((data) => {
        if (data && data.length) setCsrStats(data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      })
      .catch((e) => console.error("Failed to fetch csr stats:", e));

    fetchCsrHighlight()
      .then((data) => {
        if (data) setCsrHighlight(data);
      })
      .catch((e) => console.error("Failed to fetch csr highlight:", e));
  }, []);

  return (
    <div className="home-view animate-fade-in">
      <Hero lang={lang} setCurrentPage={setCurrentPage} />
      <HomeStatsGrid lang={lang} setCurrentPage={setCurrentPage} statCards={statCards} />
      <CSRHighlight lang={lang} data={csrHighlight} />
      <CSRStatsGrid lang={lang} data={csrStats} />
      <NewsPreview news={news} lang={lang} t={t} setCurrentPage={setCurrentPage} />
    </div>
  );
}
