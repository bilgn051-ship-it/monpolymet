import { useState, useEffect } from 'react';
import { Globe, Menu, X, Settings } from 'lucide-react';

export default function Header({
  lang,
  setLang,
  currentPage,
  setCurrentPage,
  t,
  showHeader = true,
  settings
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  // Monitor scroll position to toggle transparent state
  useEffect(() => {
    const handleScrollTop = () => {
      if (window.scrollY < 50) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollTop);
    return () => window.removeEventListener('scroll', handleScrollTop);
  }, []);

  const navItems = [
    { id: 'about', label: t.nav.about },
    { id: 'companies', label: t.nav.companies },
    { id: 'csr', label: t.nav.csr },
    { id: 'news', label: t.nav.news },
    { id: 'tour', label: t.nav.tour },
    { id: 'careers', label: t.nav.careers },
    { id: 'contact', label: t.nav.contact }
  ];

  const handleNavClick = (id) => {
    setMenuOpen(false);
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if header should be transparent (at top of home page)
  const isTransparent = isTop && currentPage === 'home';

  const logoUrl = settings?.logoUrl || '/logo.png';

  return (
    <>
      <header className={`site-header ${showHeader ? '' : 'hidden'} ${isTransparent ? 'is-transparent' : ''}`}>
        <div className="header-container">
          {/* Logo Section */}
          <div className="logo-section" onClick={() => handleNavClick('home')}>
            <img 
              src={logoUrl} 
              alt="Monpolymet Logo" 
              className="header-logo-img" 
            />
          </div>

          {/* Desktop Navigation Menu (Shown on desktop) */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons (Language, Admin, and Mobile Menu Toggle) */}
          <div className="header-actions">
            {/* Language Switcher */}
            <button
              className="action-btn lang-btn"
              onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
              title="Switch Language"
            >
              <Globe size={16} />
              <span>{lang === 'mn' ? 'EN' : 'MN'}</span>
            </button>

            {/* Admin Access Panel Icon */}
            <button
              className={`action-btn admin-btn ${currentPage === 'admin' ? 'active' : ''}`}
              onClick={() => handleNavClick('admin')}
              title={t.nav.admin}
            >
              <Settings size={16} />
            </button>

            {/* Hamburger Menu Toggle (Visible on mobile/tablet) */}
            <button
              className="menu-hamburger-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              title={menuOpen ? "Close Menu" : "Open Menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop overlay when menu is open */}
      {menuOpen && (
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Mobile Top-down Dropdown Menu (Shown on mobile when toggle is clicked) */}
      {menuOpen && (
        <div className="mobile-drawer animate-slide-down">
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-link ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
            
            <button
              className={`mobile-nav-link admin-mobile-link ${currentPage === 'admin' ? 'active' : ''}`}
              onClick={() => handleNavClick('admin')}
              style={{ borderTop: '1px solid var(--border-color)', marginTop: '8px', paddingTop: '12px' }}
            >
              <Settings size={16} style={{ marginRight: 8, display: 'inline', verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>{t.nav.admin}</span>
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
