import { Download, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ lang, t, setCurrentPage, settings }) {
  const currentYear = new Date().getFullYear();

  const logoUrl = settings?.logoUrl || '/logo.png';
  const footerDesc = lang === 'mn' 
    ? 'Монполимет Групп нь 1992 онд байгуулагдсан. Уул уурхай, байгаль орчны нөхөн сэргээлт, барилгын материал үйлдвэрлэл, барилга байгууламж, гадаад худалдааны чиглэлээр үйл ажиллагаа явуулж буй үндэсний үйлдвэрлэгч – хөрөнгө оруулагч компани юм.' 
    : 'Monpolymet Group was established in 1992. It is a national manufacturer and investor company operating in mining, environmental rehabilitation, construction materials production, construction, and foreign trade.';

  const address = lang === 'mn' 
    ? 'МПМ Билдинг, Автозамчдын гудамж 1, Сүхбаатар дүүрэг, 13-р хороолол, Улаанбаатар хот, Монгол Улс' 
    : 'MPM Building, Road workers street 1, Sukhbaatar district, 13th khoroolol, Ulaanbaatar, Mongolia';

  const phone = '+976 7585 5858';
  const email = 'monpolymet@mongol.net';

  const socialLinks = (settings?.socialLinks || [
    { platform: 'facebook', url: 'https://www.facebook.com/monpolymet.mn' },
    { platform: 'instagram', url: 'https://instagram.com/monpolymet' },
    { platform: 'youtube', url: 'https://youtube.com/monpolymet' }
  ]).map(link => 
    link.platform.toLowerCase() === 'facebook' 
      ? { ...link, url: 'https://www.facebook.com/monpolymet.mn' } 
      : link
  );

  const brandAssetsDesc = settings
    ? (lang === 'mn' ? settings.brandAssetsDescriptionMn : settings.brandAssetsDescriptionEn)
    : (lang === 'mn' ? 'Манай логоны өндөр чанартай хувилбарууд болон брэндбүүкийг татаж авах.' : 'Download high-quality versions of our logo and corporate brand book.');

  const brandAssets = [
    { label: lang === 'mn' ? 'Лого татах (PNG)' : 'Download Logo (PNG)', fileUrl: logoUrl }
  ];

  const renderSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
      case 'instagram':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
      case 'youtube':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" /><path d="m10 15 5-3-5-3z" /></svg>;
      default:
        return null;
    }
  };

  return (
    <div className="footer-wrapper" style={{ backgroundColor: '#ffffff', padding: '40px 5% 0 5%' }}>
      <footer className="site-footer" style={{ width: '100%', margin: '0 auto', borderRadius: '24px' }}>
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <img src={logoUrl} alt="Monpolymet Logo" className="footer-logo-img" />
            </div>
            <p className="footer-desc">
              {footerDesc}
            </p>
          </div>

          <div className="footer-links-col">
            <h3>{lang === 'mn' ? 'Үйл ажиллагаа' : 'Operations'}</h3>
            <ul>
              {[
                { id: 'monpolymet', label: lang === 'mn' ? 'Монполимет ХХК' : 'Monpolymet LLC', target: 'companies' },
                { id: 'moncement', label: lang === 'mn' ? 'Монцемент Билдинг Материалс ХХК' : 'Moncement Building Materials LLC', target: 'companies' },
                { id: 'nar-urt', label: lang === 'mn' ? 'Нар - Урт ХХК' : 'Nar - Urt LLC', target: 'companies' },
                { id: 'ann', label: lang === 'mn' ? 'Эй эн эн ХХК' : 'ANN LLC', target: 'companies' },
                { id: 'decater', label: lang === 'mn' ? 'Ди Кэйтерс ХХК' : 'De Caters LLC', target: 'companies' },
              ].map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.target);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {item.label}
                </li>
              ))}
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
                >
                  <Download size={16} />
                  <span>{asset.label}</span>
                </a>
              ))}
            </div>

            <div className="social-links" style={{ marginTop: '16px' }}>
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
        </div>
      </footer>

      <div className="footer-bottom-outside" style={{ textAlign: 'center', padding: '24px 0', opacity: 0.5, color: '#0f172a', fontSize: '12px', fontWeight: 500 }}>
        <p>&copy; {currentYear} "Монполимет групп", {t.common.rightsReserved}</p>
      </div>
    </div>
  );
}
