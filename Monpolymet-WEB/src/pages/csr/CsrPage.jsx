import { useState, useEffect } from 'react';
import { Trees, HeartHandshake, Leaf } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import { fetchCsr } from '../../api';

export default function CsrPage({ lang, t }) {
  const [csrItems, setCsrItems] = useState([]);

  useEffect(() => {
    fetchCsr()
      .then((data) => {
        if (data && data.length) {
          setCsrItems(data.sort((a, b) => a.order - b.order));
        }
      })
      .catch((e) => console.error("Csr fetch error:", e));
  }, []);

  const getCsrIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case 'trees': return <Trees size={32} className="csr-icon" />;
      case 'hearthandshake': return <HeartHandshake size={32} className="csr-icon" />;
      default: return <Leaf size={32} className="csr-icon" />;
    }
  };

  const defaultCsr = [
    {
      icon: 'Trees',
      titleMn: t.csr.restorationTitle,
      titleEn: t.csr.restorationTitle,
      descMn: t.csr.restorationDesc,
      descEn: t.csr.restorationDesc,
      imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80",
      stats: [
        { value: "1,000+ га", labelMn: "Нөхөн сэргээсэн талбай", labelEn: "Reclaimed Area" },
        { value: "300,000+", labelMn: "Тарьсан мод", labelEn: "Trees Planted" },
        { value: "4", labelMn: "Байгуулсан хиймэл нуур", labelEn: "Artificial Lakes" }
      ]
    },
    {
      icon: 'HeartHandshake',
      titleMn: t.csr.communityTitle,
      titleEn: t.csr.communityTitle,
      descMn: t.csr.communityDesc,
      descEn: t.csr.communityDesc,
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
      stats: [
        { value: "15+", labelMn: "Орон нутгийн тэтгэлэгтнүүд", labelEn: "Local Scholars" },
        { value: "₮5 тэрбум+", labelMn: "Орон нутгийн хөрөнгө оруулалт", labelEn: "Local Investment" }
      ]
    }
  ];

  const displayCsr = csrItems && csrItems.length > 0 ? csrItems : defaultCsr;

  return (
    <div className="csr-page-container container-padding">
      <SectionHeader tag={t.nav.csr} title={t.csr.title} subtitle={t.csr.subtitle} />

      {/* Main CSR Grid */}
      <div className="csr-grid">
        {displayCsr.map((item, idx) => {
          const title = lang === 'mn' ? item.titleMn : item.titleEn;
          const desc = lang === 'mn' ? item.descMn : item.descEn;

          return (
            <div key={idx} className={`csr-row ${idx % 2 === 0 ? '' : 'reverse'} animate-fade-in`}>
              <div className="csr-content-card">
                <div className="csr-card-header">
                  {getCsrIcon(item.icon)}
                  <h3>{title}</h3>
                </div>
                <p>{desc}</p>
                <div className="csr-stats-badges">
                  {(item.stats || []).map((s, sIdx) => (
                    <div key={sIdx} className="csr-badge">
                      <span className="badge-num">{s.value}</span>
                      <span className="badge-label">{lang === 'mn' ? s.labelMn : s.labelEn}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="csr-image-card">
                <img
                  src={item.imageUrl}
                  alt={title}
                  className="csr-image"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
