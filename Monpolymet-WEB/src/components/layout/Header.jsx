import { useState, useEffect } from 'react';
import odLogo from '../../assets/od.png';
import odBlueLogo from '../../assets/od-blue.png';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';

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
  const [activeDropdown, setActiveDropdown] = useState(null);

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

  const defaultNavItems = [
    { id: 'about', label: t.nav.about, target: 'about' },
    { id: 'companies', label: t.nav.companies, target: 'companies' },
    { id: 'csr', label: t.nav.csr, target: 'csr' },
    { id: 'news', label: t.nav.news, target: 'news' },
    { id: 'careers', label: t.nav.careers, target: 'careers' },
    { id: 'procurement', label: lang === 'mn' ? 'Худалдан авалт' : 'Procurement', target: 'procurement' }
  ];

  const subMenus = {
    'about': [
      { id: 'intro', label: lang === 'mn' ? 'Группийн танилцуулга' : 'Group Introduction', hash: '#vision' },
      { id: 'values', label: lang === 'mn' ? 'Алсын хараа, үнэт зүйлс, зарчим' : 'Vision, Values & Principles', hash: '#values' },
      { id: 'history', label: lang === 'mn' ? 'Түүхэн замнал' : 'Historical Journey', hash: '#history' },
      { id: 'leadership', label: lang === 'mn' ? 'Удирдлагын баг' : 'Leadership', hash: '#leadership' }
    ],
    'companies': [
      { id: 'monpolymet', label: lang === 'mn' ? 'Монполимет ХХК' : 'Monpolymet LLC', hash: '#monpolymet' },
      { id: 'moncement', label: lang === 'mn' ? 'Монцемент Билдинг Материалс ХХК' : 'Moncement Building Materials LLC', hash: '#moncement' },
      { id: 'narurt', label: lang === 'mn' ? 'Нар-Урт ХХК' : 'Nar-Urt LLC', hash: '#narurt' },
      { id: 'ann', label: lang === 'mn' ? 'АНН ХХК' : 'ANN LLC', hash: '#ann' },
      { id: 'decater', label: lang === 'mn' ? 'Ди Кэйтерс ХХК' : 'De Caterers LLC', hash: '#decater' }
    ],
    'csr': [
      { id: 'fund', label: lang === 'mn' ? 'Мөнх тогтвортой хөгжил сан' : 'Sustainable Development Fund', hash: '#fund' },
      { id: 'environment', label: lang === 'mn' ? 'Байгаль орчны бодлого' : 'Environmental Policy', hash: '#environment' },
      { id: 'report', label: lang === 'mn' ? 'Тогтвортой хөгжлийн тайлан' : 'Sustainability Report', hash: '#report' },
      { id: 'visit', label: lang === 'mn' ? 'Тосон үйлдвэрт зочлох 360' : 'Visit Toson Factory 360', hash: '#visit' }
    ],
    'news': [
      { id: 'news-list', label: lang === 'mn' ? 'Мэдээ' : 'News', hash: '#news-list' }
    ],
    'careers': [
      { id: 'policy', label: lang === 'mn' ? 'Хүний нөөцийн бодлого' : 'HR Policy', hash: '#hr-policy' },
      { id: 'process', label: lang === 'mn' ? 'Сонгон шалгаруулалтын үе шат' : 'Selection Process', hash: '#selection' },
      { id: 'join', label: lang === 'mn' ? 'Бидэнтэй нэгдэх' : 'Join Us', hash: '#join-us' }
    ],
    'procurement': [
      { id: 'policy', label: lang === 'mn' ? 'Худалдан авалтын бодлого' : 'Procurement Policy', hash: '#procurement-policy' },
      { id: 'tender', label: lang === 'mn' ? 'Тендер' : 'Tender', hash: '#tender' }
    ]
  };

  const navItems = defaultNavItems;

  const handleNavClick = (target) => {
    setMenuOpen(false);
    setActiveDropdown(null);
    if (target && target.startsWith('http')) {
      window.open(target, '_blank');
    } else if (target) {
      setCurrentPage(target);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmenuClick = (e, targetPage, hash) => {
    e.stopPropagation();
    setMenuOpen(false);
    setActiveDropdown(null);
    setCurrentPage(targetPage);
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  // Determine if header should be transparent
  const pagesWithBanner = ['home', 'about', 'csr', 'companies', 'procurement', 'news', 'careers', 'contact', 'tour'];
  const hasBanner = pagesWithBanner.includes(currentPage);
  const isTransparent = hasBanner ? isTop : false;
  const logoUrl = isTransparent ? odLogo : odBlueLogo;

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

          {/* Desktop Navigation Menu */}
          <nav className="desktop-nav">
            {navItems.map((item, index) => {
              const subs = subMenus[item.target];

              return (
                <div 
                  key={item.id} 
                  className={`nav-item-wrapper ${subs ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`nav-link ${currentPage === item.target ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.target)}
                  >
                    {item.label}
                  </button>
                  {subs && activeDropdown === item.id && (
                    <div className="megamenu-dropdown animate-fade-in">
                      <ul>
                        {subs.map(sub => (
                          <li key={sub.id}>
                            <button onClick={(e) => handleSubmenuClick(e, item.target, sub.hash)}>
                              {sub.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Buttons */}
          {/* Action Buttons */}
          <div className="header-actions">
            <button
              className="action-btn lang-btn"
              onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
              title="Switch Language"
            >
              <Globe size={16} />
              <span>{lang === 'mn' ? 'EN' : 'MN'}</span>
            </button>

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

      {menuOpen && (
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="mobile-drawer animate-slide-down">
          <nav className="mobile-nav">
            {navItems.map((item) => {
              const subs = subMenus[item.target];
              return (
                <div key={item.id} className="mobile-nav-group">
                  <div className="mobile-nav-header">
                    <button
                      className={`mobile-nav-link ${currentPage === item.target ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.target)}
                    >
                      {item.label}
                    </button>
                    {subs && (
                      <button 
                        className="mobile-toggle-btn"
                        onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                      >
                        <ChevronDown size={20} className={activeDropdown === item.id ? 'rotated' : ''} />
                      </button>
                    )}
                  </div>
                  {subs && activeDropdown === item.id && (
                    <div className="mobile-submenu animate-slide-down">
                      {subs.map(sub => (
                        <button 
                          key={sub.id}
                          className="mobile-sub-link"
                          onClick={(e) => handleSubmenuClick(e, item.target, sub.hash)}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
