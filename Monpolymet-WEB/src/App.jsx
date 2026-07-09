import { useState, useEffect } from 'react';
import { usePageRouting } from './hooks/usePageRouting';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import CompaniesPage from './pages/companies/CompaniesPage';
import CsrPage from './pages/csr/CsrPage';
import NewsPage from './pages/news/NewsPage';
import CareersPage from './pages/careers/CareersPage';
import ContactPage from './pages/contact/ContactPage';
import HsePage from './pages/hse/HsePage';
import VirtualTourPage from './pages/tour/VirtualTourPage';
import ProcurementPage from './pages/ProcurementPage';
import AdminPage from './pages/admin/AdminPage';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { useDarkMode } from './hooks/useDarkMode';
import { useHideHeaderOnScroll } from './hooks/useHideHeaderOnScroll';
import { translations } from './i18n/translations';
import { initialNews, initialJobs, initialSubmissions } from './data/mockData';
import { fetchNews, fetchJobs, fetchSettings, submitApplication } from './api';
import './styles/app.css';

function App() {
  const [lang, setLang] = useState('mn');
  // URL-backed page state: the visible page maps to the browser path, so deep
  // links (e.g. /about), refreshes and back/forward all work.
  const [currentPage, setCurrentPage] = usePageRouting();

  // Applies the persisted theme to the document (setter reserved for a toggle).
  useDarkMode();

  // News and open vacancies come live from the API (managed in the admin
  // dashboard). The bundled mock data is the initial value and the fallback
  // if the API is unreachable, so the site always renders.
  const [news, setNews] = useState(initialNews);
  const [jobs, setJobs] = useState(initialJobs);
  const [settings, setSettings] = useState(null);
  const [submissions, setSubmissions] = useLocalStorageState('submissions', initialSubmissions);

  useEffect(() => {
    fetchNews()
      .then((data) => data.length && setNews(data))
      .catch(() => {});
    fetchJobs()
      .then((data) => setJobs(data))
      .catch(() => {});
    fetchSettings()
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  const showHeader = useHideHeaderOnScroll();

  const t = translations[lang];

  // Persist the application to the backend; also keep a local copy so the
  // legacy in-site admin view still reflects it.
  const handleApply = (newSubmission) => {
    setSubmissions([newSubmission, ...submissions]);
    submitApplication(newSubmission).catch(() => {});
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage lang={lang} t={t} news={news} setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage lang={lang} t={t} />;
      case 'companies':
        return <CompaniesPage lang={lang} t={t} />;
      case 'csr':
        return <CsrPage lang={lang} t={t} />;
      case 'news':
        return <NewsPage lang={lang} t={t} news={news} />;
      case 'careers':
        return <CareersPage lang={lang} t={t} jobs={jobs} onApply={handleApply} />;
      case 'contact':
        return <ContactPage lang={lang} t={t} />;
      case 'hse':
        return <HsePage lang={lang} t={t} />;
      case 'tour':
        return <VirtualTourPage lang={lang} t={t} />;
      case 'procurement':
        return <ProcurementPage lang={lang} t={t} />;
      case 'admin':
        return (
          <AdminPage
            lang={lang}
            t={t}
            news={news}
            setNews={setNews}
            jobs={jobs}
            setJobs={setJobs}
            submissions={submissions}
            settings={settings}
            setSettings={setSettings}
          />
        );
      default:
        return <HomePage lang={lang} t={t} news={news} setCurrentPage={setCurrentPage} />;
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
