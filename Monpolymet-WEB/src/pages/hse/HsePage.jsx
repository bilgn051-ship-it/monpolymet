import { useState, useEffect } from 'react';
import { ShieldAlert, Download, FileText, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import { fetchHseContent, fetchHseDocuments } from '../../api';

export default function HsePage({ lang, t }) {
  const [hseContent, setHseContent] = useState(null);
  const [hseDocs, setHseDocs] = useState([]);

  useEffect(() => {
    fetchHseContent()
      .then(setHseContent)
      .catch((e) => console.error("Hse content fetch error:", e));

    fetchHseDocuments()
      .then((data) => {
        if (data && data.length) {
          setHseDocs(data.sort((a, b) => a.order - b.order));
        }
      })
      .catch((e) => console.error("Hse documents fetch error:", e));
  }, []);

  const policiesTitle = hseContent
    ? (lang === 'mn' ? hseContent.policiesTitleMn : hseContent.policiesTitleEn)
    : t.hse.policiesTitle;

  const policyList = hseContent
    ? (lang === 'mn' ? hseContent.policiesMn : hseContent.policiesEn)
    : t.hse.policyList;

  const docsTitle = hseContent
    ? (lang === 'mn' ? hseContent.documentsTitleMn : hseContent.documentsTitleEn)
    : t.hse.docsTitle;

  const docs = hseDocs && hseDocs.length > 0
    ? hseDocs.map(d => ({
        title: lang === 'mn' ? d.titleMn : d.titleEn,
        fileUrl: d.fileUrl,
        size: d.fileSize,
        type: d.fileType
      }))
    : t.hse.docs;

  return (
    <div className="hse-page-container container-padding">
      <SectionHeader tag={t.nav.hse} title={t.hse.title} subtitle={t.hse.subtitle} />

      <div className="hse-grid">
        {/* Policies & Commitment */}
        <div className="hse-policies-card animate-fade-in">
          <div className="card-header-with-icon">
            <ShieldAlert size={28} className="hse-header-icon" />
            <h3>{policiesTitle}</h3>
          </div>
          <div className="hse-policies-list">
            {(policyList || []).map((policy, i) => (
              <div key={i} className="hse-policy-item">
                <CheckCircle2 size={20} className="hse-check-icon" />
                <p>{policy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Document Downloads */}
        <div className="hse-downloads-card animate-fade-in">
          <h3>{docsTitle}</h3>
          <div className="docs-list">
            {docs.map((doc, i) => (
              <div key={i} className="doc-item">
                <div className="doc-info-row">
                  <FileText size={24} className="doc-icon" />
                  <div className="doc-meta">
                    <span className="doc-title">{doc.title}</span>
                    <span className="doc-size">{doc.size} &bull; {doc.type}</span>
                  </div>
                </div>
                <button
                  className="doc-download-btn"
                  onClick={() => {
                    if (doc.fileUrl && doc.fileUrl.startsWith('/')) {
                      // Trigger normal link download or mock
                      const a = document.createElement('a');
                      a.href = doc.fileUrl;
                      a.download = doc.title;
                      a.click();
                    } else {
                      alert(lang === 'mn' ? `Тайлан таталт эхэллээ: ${doc.title}` : `Downloading report: ${doc.title}`);
                    }
                  }}
                >
                  <Download size={16} />
                  <span>{t.common.download}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
