import { useState, useEffect, useLayoutEffect } from 'react';
import { usePageRouting } from './hooks/usePageRouting';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import CompaniesPage from './pages/companies/CompaniesPage';
import CsrPage from './pages/csr/CsrPage';
import NewsPage from './pages/news/NewsPage';
import NewsDetailPage from './pages/news/NewsDetailPage';
import CareersPage from './pages/careers/CareersPage';
import ContactPage from './pages/contact/ContactPage';


import ProcurementPage from './pages/ProcurementPage';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { useDarkMode } from './hooks/useDarkMode';
import { useHideHeaderOnScroll } from './hooks/useHideHeaderOnScroll';
import { translations } from './i18n/translations';
import { initialNews, initialJobs, initialSubmissions } from './data/mockData';
import { fetchNews, fetchJobs, fetchSettings, fetchPages, fetchProcurementContent, submitApplication } from './api';
import './styles/app.css';

function App() {
  const [lang, setLang] = useState('mn');
  // URL-backed page state: the visible page maps to the browser path, so deep
  // links (e.g. /about), refreshes and back/forward all work.
  const [currentPage, setCurrentPage, pageParam] = usePageRouting();

  // Applies the persisted theme to the document (setter reserved for a toggle).
  useDarkMode();

  // News and open vacancies come live from the API (managed in the admin
  // dashboard). The bundled mock data is the initial value and the fallback
  // if the API is unreachable, so the site always renders.
  const [news, setNews] = useState(initialNews);
  const [jobs, setJobs] = useState(initialJobs);
  const [settings, setSettings] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [pages, setPages] = useState([]);
  const [procurementContent, setProcurementContent] = useState(null);
  const [submissions, setSubmissions] = useLocalStorageState('submissions', initialSubmissions);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    fetchNews()
      .then((data) => data.length && setNews(data))
      .catch(() => { });
    fetchJobs()
      .then((data) => setJobs(data))
      .catch(() => { });
    fetchSettings()
      .then((data) => setSettings(data))
      .catch(() => { });
    fetchPages()
      .then((data) => setPages(data))
      .catch(() => { });
    fetchProcurementContent()
      .then((data) => setProcurementContent(data))
      .catch(() => { });
    import('./api').then(({ fetchTimeline }) => {
      fetchTimeline()
        .then((data) => setTimeline(data))
        .catch(() => { });
    });
  }, []);

  useEffect(() => {
    const pageMeta = pages.find(p => p.key === currentPage);
    const siteTitle = lang === 'mn' ? 'Монполимет Групп' : 'Monpolymet Group';
    if (currentPage === 'post') {
      const post = news.find(n => n.id.toString() === pageParam);
      if (post) {
        document.title = `${lang === 'mn' ? post.titleMn : post.titleEn} | ${siteTitle}`;
      } else {
        document.title = siteTitle;
      }
    } else if (pageMeta && pageMeta.seo) {
      const seoTitle = lang === 'mn' ? pageMeta.seo.titleMn : pageMeta.seo.titleEn;
      document.title = seoTitle ? `${seoTitle} | ${siteTitle}` : siteTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', lang === 'mn' ? pageMeta.seo.descriptionMn : pageMeta.seo.descriptionEn);
      }
    } else {
      document.title = siteTitle;
    }
  }, [currentPage, pages, lang, pageParam, news]);

  const showHeader = useHideHeaderOnScroll();

  const t = translations[lang];

  // Persist the application to the backend; also keep a local copy so the
  // legacy in-site admin view still reflects it.
  const handleApply = (newSubmission) => {
    setSubmissions([newSubmission, ...submissions]);
    submitApplication(newSubmission).catch(() => { });
  };

  const renderPage = () => {
    const pageMetadata = pages.find(p => p.key === currentPage) || null;

    switch (currentPage) {
      case 'home':
        return <HomePage lang={lang} t={t} news={news} setCurrentPage={setCurrentPage} timeline={timeline} pageMetadata={pageMetadata} />;
      case 'about':
        return <AboutPage lang={lang} t={t} timeline={timeline} pageMetadata={pageMetadata} />;
      case 'companies':
        return <CompaniesPage lang={lang} t={t} pageMetadata={pageMetadata} />;
      case 'csr':
        return <CsrPage lang={lang} t={t} pageMetadata={pageMetadata} />;
      case 'news':
        return <NewsPage news={news} lang={lang} t={t} pageMetadata={pageMetadata} setCurrentPage={setCurrentPage} />;
      case 'post':
        return <NewsDetailPage postId={pageParam} news={news} lang={lang} t={t} setCurrentPage={setCurrentPage} />;
      case 'careers':
        return <CareersPage lang={lang} t={t} jobs={jobs} onApply={handleApply} pageMetadata={pageMetadata} />;
      case 'contact':
        return <ContactPage lang={lang} t={t} settings={settings} pageMetadata={pageMetadata} />;
      // case 'hse':
      //   return <HsePage lang={lang} t={t} pageMetadata={pageMetadata} />;


      case 'procurement':
        return <ProcurementPage lang={lang} t={t} procurementContent={procurementContent} pageMetadata={pageMetadata} />;
      default:
        return <HomePage lang={lang} t={t} news={news} setCurrentPage={setCurrentPage} pageMetadata={pageMetadata} />;
    }
  };

  return (
    <div className="app-wrapper light-theme">
      <Header
        lang={lang}
        setLang={setLang}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        t={t}
        showHeader={showHeader}
        settings={settings}
      />

      <main className="main-content">
        {renderPage()}
      </main>

      <Footer lang={lang} t={t} setCurrentPage={setCurrentPage} settings={settings} />
    </div>
  );
}

export default App;
