import { Download, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ lang, t, setCurrentPage, settings }) {
  const currentYear = new Date().getFullYear();

  const logoUrl = settings?.logoUrl || '/logo.png';
  const footerDesc = settings
    ? (lang === 'mn' ? settings.footerDescriptionMn : settings.footerDescriptionEn)
    : (lang === 'mn' ? 'Тогтвортой хөгжил, эх орныхоо барилга бүтээн байгуулалтын түүчээ.' : 'Pioneering sustainable development and national construction.');

  const address = settings
    ? (lang === 'mn' ? settings.addressMn : settings.addressEn)
    : (lang === 'mn' ? 'Монгол улс, Улаанбаатар хот, Хан-Уул дүүрэг, 15-р хороо, Махатма Гандийн гудамж, Монполимет тауэр' : 'Monpolymet Tower, Mahatma Gandhi Street, 15th khoroo, Khan-Uul District, Ulaanbaatar, Mongolia');

  const phone = settings?.phone || '+976 7011 8012';
  const email = settings?.email || 'info@monpolymet.mn';

  const socialLinks = settings?.socialLinks || [
    { platform: 'facebook', url: 'https://facebook.com/monpolymet' },
    { platform: 'instagram', url: 'https://instagram.com/monpolymet' },
    { platform: 'youtube', url: 'https://youtube.com/monpolymet' }
  ];

  const brandAssetsDesc = settings
    ? (lang === 'mn' ? settings.brandAssetsDescriptionMn : settings.brandAssetsDescriptionEn)
    : (lang === 'mn' ? 'Манай логоны өндөр чанартай хувилбарууд болон брэндбүүкийг татаж авах.' : 'Download high-quality versions of our logo and corporate brand book.');

  const brandAssets = settings?.brandAssets || [
    { label: 'Logo Kit (PNG, SVG)', fileUrl: '/logo-monpolymet.zip' },
    { label: 'Brand Guidelines', fileUrl: '/brandbook-monpolymet.pdf' }
  ];

  const renderSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
      case 'instagram':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
      case 'youtube':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>;
      default:
        return null;
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <img src={logoUrl} alt="Monpolymet Logo" className="footer-logo-img" />
          </div>
          <p className="footer-desc">
            {footerDesc}
          </p>
          <div className="social-links">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                title={link.platform}
              >
                {renderSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links-col">
          <h3>{lang === 'mn' ? 'Холбоосууд' : 'Quick Links'}</h3>
          <ul>
            <li onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.nav.about}</li>
            <li onClick={() => { setCurrentPage('companies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.nav.companies}</li>
            <li onClick={() => { setCurrentPage('csr'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.nav.csr}</li>
            <li onClick={() => { setCurrentPage('hse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.nav.hse}</li>
            <li onClick={() => { setCurrentPage('careers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.nav.careers}</li>
            <li onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t.nav.contact}</li>
          </ul>
        </div>

        <div className="footer-contact-col">
          <h3>{t.common.contactUs}</h3>
          <ul className="contact-info-list">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>{address}</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          </ul>
        </div>

        {/* Brand Book & Logo Downloads */}
        <div className="footer-download-col">
          <h3>{lang === 'mn' ? 'Брэнд материал' : 'Brand Assets'}</h3>
          <p className="download-text">
            {brandAssetsDesc}
          </p>
          <div className="download-buttons">
            {brandAssets.map((asset, idx) => (
              <a
                key={idx}
                href={asset.fileUrl}
                className="download-btn-link"
                download
                onClick={(e) => {
                  if (asset.fileUrl.startsWith('/')) {
                    // Let native download happen or mock it
                  } else {
                    e.preventDefault();
                    alert(lang === 'mn' ? `Таталт эхэллээ: ${asset.label}` : `Downloading: ${asset.label}`);
                  }
                }}
              >
                <Download size={16} />
                <span>{asset.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} {settings?.copyrightName || 'MONPOLYMET GROUP'}. {t.common.rightsReserved}</p>
      </div>
    </footer>
  );
}
