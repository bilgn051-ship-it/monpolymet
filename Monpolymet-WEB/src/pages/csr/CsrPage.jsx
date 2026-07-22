import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trees, HeartHandshake, Leaf, Droplets, Building2, Cpu, ArrowUpRight, Sparkles } from 'lucide-react';
import { fetchCsr } from '../../api';

export default function CsrPage({ lang, t, pageMetadata }) {
  const [csrItems, setCsrItems] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchCsr()
      .then((data) => {
        if (data && data.length) {
          setCsrItems(data.sort((a, b) => a.order - b.order));
        }
      })
      .catch((e) => console.error("Csr fetch error:", e));
  }, []);

  const defaultCsr = [
    {
      titleMn: 'Жишиг нөхөн сэргээгч - Тосонгийн орд',
      titleEn: 'Model Eco-Restoration - Toson Deposit',
      descMn: 'Тосонгийн ордод 931.67 га талбайд ашиглалт явуулснаас техникийн нөхөн сэргээлтийг 743 га талбайд, биологийн нөхөн сэргээлтийг 514 га талбайд хийсэн. 100,000 гаруй мод тариалж 5.5 км урт 7 хэсэг ойн төглүүд ургуулсан бөгөөд 16 га талбайтай Тосон нуурыг бий болгоод байна.',
      descEn: 'Out of 931.67 ha exploited at Toson placer deposit, technical reclamation covers 743 ha and biological reclamation 514 ha. Over 100,000 trees planted across 5.5 km forest belts, alongside creating the 16 ha freshwater Toson Lake.',
      imageUrl: "https://en.monpolymet.mn/wp-content/uploads/2021/12/img-slider-01-2.jpg",
      stats: [
        { value: "743 га", labelMn: "Техникийн нөхөн сэргээлт", labelEn: "Technical Restoration" },
        { value: "514 га", labelMn: "Биологийн нөхөн сэргээлт", labelEn: "Biological Restoration" },
        { value: "16 га", labelMn: "Тосон Нуур", labelEn: "Toson Lake" }
      ]
    },
    {
      titleMn: '1 сая модоор дэмжинэ',
      titleEn: '1 Million Trees Pledge',
      descMn: '"Нэг тэрбум мод" үндэсний хөдөлгөөнд Монполимет Групп 1 сая модоор дэмжин оролцож, ойн төглүүд болон нөхөн сэргээлтийн бүсүүддээ тасралтгүй тариалж байна.',
      descEn: 'Actively pledged 1 million trees for the national "One Billion Trees" initiative across forestry zones.',
      imageUrl: "https://en.monpolymet.mn/wp-content/uploads/2021/12/news_20211113-1.jpg",
      stats: [
        { value: "1,000,000", labelMn: "Амласан мод", labelEn: "Pledged Trees" },
        { value: "5.5 км", labelMn: "Ойн төгөл", labelEn: "Forest Belts" }
      ]
    },
    {
      titleMn: 'Мөнх Тогтвортой Хөгжил Сан',
      titleEn: 'Eternal Sustainability Foundation',
      descMn: 'Байгаль орчны нөхөн сэргээлт, орон нутгийн сургууль, цэцэрлэг, эмнэлгийн тохижилт, ажилчдын сургалт, тэтгэлэгт хөтөлбөрүүдийг тасралтгүй санхүүжүүлдэг.',
      descEn: 'Continuously funding environmental restoration, local education, kindergarten and hospital upgrades, and scholarships.',
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
      stats: [
        { value: "15+", labelMn: "Тэтгэлэгт суралцагчид", labelEn: "Scholars" },
        { value: "₮5 тэрбум+", labelMn: "Орон нутгийн хөрөнгө оруулалт", labelEn: "Local Investment" }
      ]
    }
  ];

  const displayCsr = csrItems && csrItems.length > 0 ? csrItems : defaultCsr;

  return (
    <>
      {/* 1. Exact Standard Full Bleed Hero Banner (Untouched) */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url('https://www.residencesegattini.it/clientfiles/page/20211021152000_sport-relax.jpg')`,
        backgroundColor: '#0f172a'
      }}>
        <div className="full-bleed-banner-overlay"></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up">
            <h1 className="hero-title">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : t.csr.title}
            </h1>
            <p className="hero-subtitle">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) : t.csr.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 2. 3D Isometric Smart City & Eco-Park Dashboard Concept (Inspired by Pinterest 3D UI) */}
      <div style={{ backgroundColor: '#0b1329', color: '#ffffff', padding: '80px 20px 100px 20px', fontFamily: "'Montserrat', sans-serif", position: 'relative', overflow: 'hidden' }}>
        
        {/* Background Ambient Glow FX */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(37, 99, 235, 0.08) 50%, rgba(0,0,0,0) 80%)',
          pointerEvents: 'none',
          borderRadius: '50%'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Header Tag */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '24px',
              padding: '6px 20px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#34d399',
              marginBottom: '16px'
            }}>
              <Cpu size={16} />
              3D ECO-PARK CONCEPT & SMART DASHBOARD
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#ffffff', marginBottom: '12px', letterSpacing: '-0.5px' }}>
              {lang === 'mn' ? 'Нөхөн Сэргээлтийн 3D Дижитал Модель' : 'Eco-Restoration 3D Digital Twin'}
            </h2>
            <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '640px', margin: '0 auto' }}>
              {lang === 'mn' ? 'Тосонгийн орд болон эко үйлдвэрүүдийн нөхөн сэргээлтийн үзүүлэлтүүд ба интерактив 3D бүтэц' : 'Interactive 3D visualization and real-time environmental reclamation indicators'}
            </p>
          </div>

          {/* Main 3D Card Stage */}
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(20px)',
            borderRadius: '28px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
            padding: '40px',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '40px',
            alignItems: 'center'
          }} className="smart-3d-stage">
            <style>{`
              @media (max-width: 992px) {
                .smart-3d-stage {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>

            {/* Left 3D Visual Box with Floating Cards */}
            <div style={{ position: 'relative', width: '100%', height: '420px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img
                src={displayCsr[activeTab]?.imageUrl || defaultCsr[0].imageUrl}
                alt="3D Eco Visual"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(11, 19, 41, 0.2) 0%, rgba(11, 19, 41, 0.85) 100%)'
              }} />

              {/* Floating 3D Badge 1 (Top Right) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(52, 211, 153, 0.4)',
                  borderRadius: '16px',
                  padding: '12px 20px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 10px #34d399' }} />
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>Эко Стандарт</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>100% Биологийн Нөхөн Сэргээлт</div>
                </div>
              </motion.div>

              {/* Floating 3D Badge 2 (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '16px',
                  padding: '14px 20px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                  display: 'flex',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#60a5fa' }}>743 га</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Техникийн нөхөн сэргээлт</div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '16px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#34d399' }}>514 га</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Биологийн нөхөн сэргээлт</div>
                </div>
              </motion.div>
            </div>

            {/* Right Controls & Tab Selector */}
            <div>
              <div style={{ fontSize: '13px', color: '#38bdf8', fontWeight: '700', letterSpacing: '1px', marginBottom: '10px' }}>
                ИНТЕРАКТИВ ТОХИРУУЛГА
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', marginBottom: '24px', lineHeight: '1.3' }}>
                {lang === 'mn' ? displayCsr[activeTab]?.titleMn : displayCsr[activeTab]?.titleEn}
              </h3>

              <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '30px' }}>
                {lang === 'mn' ? displayCsr[activeTab]?.descMn : displayCsr[activeTab]?.descEn}
              </p>

              {/* Tab Selector Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {displayCsr.map((item, idx) => {
                  const isActive = idx === activeTab;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: isActive ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                        border: isActive ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '14px',
                        padding: '14px 20px',
                        color: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        fontFamily: "'Montserrat', sans-serif"
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: isActive ? '#2563eb' : 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: '700'
                        }}>
                          0{idx + 1}
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: isActive ? '700' : '500' }}>
                          {lang === 'mn' ? item.titleMn : item.titleEn}
                        </span>
                      </div>
                      <ArrowUpRight size={18} style={{ opacity: isActive ? 1 : 0.4 }} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Environmental Commitments Grid */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
              {lang === 'mn' ? 'Байгаль Орчин & Ногоон Бодлого' : 'Environmental Policy & Commitments'}
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              {lang === 'mn' ? 'Эх байгальдаа ээлтэй, хариуцлагатай үйлдвэрлэлийг бид зарчим болгон ажилладаг' : 'Responsible production and eco-friendly standards in every step'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '20px',
              padding: '32px 24px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: '#dbeafe',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Droplets size={26} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>
                {lang === 'mn' ? 'Усны 100% Дахин Ашиглалт' : '100% Water Recycling'}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                {lang === 'mn' ? 'Монцемент үйлдвэр нь хаалттай усан хангамжийн системээр үйлдвэрлэлийн усыг 100% дахин ашигладаг.' : 'Utilizing zero-water-waste closed loop recycling technologies.'}
              </p>
            </div>

            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '20px',
              padding: '32px 24px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Trees size={26} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>
                {lang === 'mn' ? '7 Хэсэг Ойн Төгөл' : '7 Forest Belts'}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                {lang === 'mn' ? 'Тосонгийн орд газарт 5.5 км урт ойн төглийг ургуулж, хөрсний ургамалжилтыг сэргээсэн.' : 'Created 5.5 km forest belts to restore natural biodiversity.'}
              </p>
            </div>

            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '20px',
              padding: '32px 24px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Building2 size={26} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>
                {lang === 'mn' ? 'Орон Нутгийн Хөгжил' : 'Local Community Upgrades'}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                {lang === 'mn' ? 'Сургууль, цэцэрлэг, эмнэлгийн тохижилтыг тасралтгүй санхүүжүүлдэг.' : 'Funding community schools, healthcare upgrades, and local infrastructure.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
