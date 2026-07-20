import { useState, useEffect } from 'react';
import { Building2, CheckCircle } from 'lucide-react';
import { fetchSectors } from '../../api';
import { useInView } from '../../hooks/useInView';
import DynamicIcon from './DynamicIcon';

/**
 * Group company-structure org chart: the Monpolymet Group parent node connected
 * down to a card per subsidiary. Each card leads with the company logo, then its
 * name, description, key metrics, highlights, projects and a website CTA. Data
 * comes from the sectors collection (managed from the admin dashboard, logo
 * included); a lucide icon stands in when no logo has been uploaded yet.
 */

export default function GroupStructure({ lang, t }) {
  const [ref, inView] = useInView();
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    fetchSectors()
      .then((data) => {
        if (data && data.length) setSectors(data);
      })
      .catch((e) => console.error('Sectors fetch error:', e));
  }, []);

  // Bundled fallback used when the API is unreachable (text-only from i18n).
  const fallback = [
    { slug: 'moncement', titleMn: t.companies.moncement.title, titleEn: t.companies.moncement.title, descMn: t.companies.moncement.desc, descEn: t.companies.moncement.desc, projectsMn: t.companies.moncement.projects, projectsEn: t.companies.moncement.projects, websiteUrl: 'https://moncement.mn/', icon: 'Factory' },
    { slug: 'narurt', titleMn: t.companies.narurt.title, titleEn: t.companies.narurt.title, descMn: t.companies.narurt.desc, descEn: t.companies.narurt.desc, projectsMn: t.companies.narurt.projects, projectsEn: t.companies.narurt.projects, websiteUrl: 'https://monpolymet.mn/', icon: 'HardHat' },
    { slug: 'ann', titleMn: t.companies.ann.title, titleEn: t.companies.ann.title, descMn: t.companies.ann.desc, descEn: t.companies.ann.desc, projectsMn: t.companies.ann.projects, projectsEn: t.companies.ann.projects, websiteUrl: 'https://monpolymet.mn/', icon: 'Truck' },
  ];

  const source = sectors && sectors.length > 0
    ? [...sectors].sort((a, b) => a.order - b.order)
    : fallback;

  const companies = source.map((s, idx) => {
    let id = s.slug;
    if (!id && s.titleEn) {
      const lower = s.titleEn.toLowerCase();
      if (lower.includes('monpolymet')) id = 'monpolymet';
      else if (lower.includes('moncement')) id = 'moncement';
      else if (lower.includes('nar-urt') || lower.includes('narurt')) id = 'narurt';
      else if (lower.includes('ann')) id = 'ann';
      else if (lower.includes('cater')) id = 'decater';
    }
    return {
      id: id || `company-${idx}`,
      title: lang === 'mn' ? s.titleMn : s.titleEn,
      description: lang === 'mn' ? s.descMn : s.descEn,
      projects: lang === 'mn' ? s.projectsMn : s.projectsEn,
      websiteUrl: s.websiteUrl || 'https://monpolymet.mn/',
      logoUrl: s.logoUrl || null,
      icon: s.icon || 'Factory',
      metrics: (s.metrics || []).map((m) => ({
        value: lang === 'mn' ? (m.valMn || m.value) : (m.valEn || m.value),
        label: lang === 'mn' ? m.labelMn : m.labelEn,
      })),
      highlights: (lang === 'mn' ? (s.highlightsMn || s.highlights) : (s.highlightsEn || s.highlights)) || [],
    };
  });

  const visitLabel = lang === 'mn' ? 'Охин компанийн вэбсайт руу шилжих' : 'Visit subsidiary website';
  const projectsLabel = lang === 'mn' ? 'Хэрэгжүүлсэн төслүүд:' : 'Projects:';

  return (
    <section ref={ref} className={`group-structure-section ${inView ? 'is-revealed' : ''}`}>
      <h3 className="section-subtitle">
        {lang === 'mn' ? 'Группийн бүтэц' : 'Group Company Structure'}
      </h3>
      <div className="org-chart">
        <div className="org-parent">
          <div className="org-parent-icon"><Building2 size={30} /></div>
          <span>{lang === 'mn' ? (t.common?.monpolymetGroupMn || 'МОНПОЛИМЕТ ГРУПП') : (t.common?.monpolymetGroupEn || 'MONPOLYMET GROUP')}</span>
        </div>
        <div className="org-children">
          {companies.map((company, idx) => (
            <article key={idx} id={company.id} className="org-child-card" style={{ '--reveal-index': idx }}>
              <div className="org-card-logo-head">
                {company.logoUrl ? (
                  <img src={company.logoUrl} alt={company.title} className="org-card-logo" loading="lazy" />
                ) : (
                  <div className="org-card-icon"><DynamicIcon name={company.icon} size={26} /></div>
                )}
              </div>

              <div className="org-card-content">
                <h4 className="org-card-title">{company.title}</h4>
                {company.description && <p className="org-card-desc">{company.description}</p>}

                {company.metrics.length > 0 && (
                  <div className="org-card-metrics">
                    {company.metrics.map((m, i) => (
                      <div key={i} className="org-card-metric">
                        <span className="org-metric-value">{m.value}</span>
                        <span className="org-metric-label">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {company.highlights.length > 0 && (
                  <ul className="org-card-highlights">
                    {company.highlights.map((h, i) => (
                      <li key={i}>
                        <CheckCircle size={14} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {company.projects && (
                  <div className="org-card-projects">
                    <strong>{projectsLabel}</strong>
                    <span>{company.projects}</span>
                  </div>
                )}

                <a
                  className="org-card-btn"
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {visitLabel} &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
