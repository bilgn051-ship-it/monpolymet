import { Mail, Phone } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

export default function ProcurementPage({ lang, t, procurementContent, pageMetadata }) {
  const header = procurementContent?.header;
  const intro = procurementContent?.intro;
  const contactInfo = procurementContent?.contactInfo;

  return (
    <div className="procurement-page-container container-padding">
      <SectionHeader 
        tag={t.nav.procurement || 'Procurement'} 
        title={header ? (lang === 'mn' ? header.titleMn : header.titleEn) : (lang === 'mn' ? 'Худалдан авалт' : 'Procurement')} 
        subtitle={header ? (lang === 'mn' ? header.subtitleMn : header.subtitleEn) : ''}
        pageMetadata={pageMetadata}
        lang={lang}
      />

      {header?.imageUrl && (
        <div className="procurement-hero-image" style={{ borderRadius: '16px', overflow: 'hidden', margin: '2rem 0', maxHeight: '500px' }}>
          <img src={header.imageUrl} alt="Procurement" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
      )}

      {intro && (
        <section className="procurement-intro-section" style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
            {lang === 'mn' ? intro.titleMn : intro.titleEn}
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.8 }}>
            {lang === 'mn' ? intro.textMn : intro.textEn}
          </p>
        </section>
      )}

      {contactInfo && (
        <section className="procurement-contact-section" style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{lang === 'mn' ? 'Холбоо барих' : 'Contact Us'}</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {contactInfo.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}>
                <Phone size={24} style={{ color: 'var(--primary-color)' }} />
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </div>
            )}
            {contactInfo.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}>
                <Mail size={24} style={{ color: 'var(--primary-color)' }} />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
