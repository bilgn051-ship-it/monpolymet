import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trees, HeartHandshake, Leaf, Droplets, Building2, Cpu, ArrowUpRight, Sparkles, Globe, ShieldCheck, Sun, Sprout, Award, CheckCircle2 } from 'lucide-react';
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



  const sdgGoals = [
    {
      goalNumber: 'SDG 6',
      titleMn: 'Цэвэр Ус Болон Ариун Шугам',
      titleEn: 'Clean Water & Sanitation',
      descMn: 'Монцемент үйлдвэрт 100% хаалттай дахин ашиглах технологи нэвтрүүлж, усны хаягдлыг тэглэсэн.',
      descEn: 'Zero-water-waste closed loop recycling technologies deployed in green production.',
      icon: <Droplets size={28} />,
      bgGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    },
    {
      goalNumber: 'SDG 12',
      titleMn: 'Хариуцлагатай Хэрэглээ Ба Үйлдвэрлэл',
      titleEn: 'Responsible Consumption & Production',
      descMn: 'Европын хуурай аргын цементийн үйлдвэрлэлээр эрчим хүч, усны хэрэглээг 50% бууруулсан.',
      descEn: 'Eco-friendly dry process reducing water and energy consumption by 50%.',
      icon: <Leaf size={28} />,
      bgGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    },
    {
      goalNumber: 'SDG 13',
      titleMn: 'Уур Амьсгалын Өөрчлөлтийн Үйл Хэрэг',
      titleEn: 'Climate Action',
      descMn: '5.5 км ойн төгөл болон 1 сая мод тарих хөтөлбөрөөр хүлэмжийн хийг шингээж байна.',
      descEn: 'Absorbing carbon emissions through 5.5 km forest belts & 1 million trees pledge.',
      icon: <Sun size={28} />,
      bgGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    },
    {
      goalNumber: 'SDG 15',
      titleMn: 'Хуурай Газрын Амьдрал & Нөхөн Сэргээлт',
      titleEn: 'Life on Land & Ecosystem Reclamation',
      descMn: 'Уул уурхайн салбарт 100% биологийн нөхөн сэргээлт хийж жишиг стандарт тогтоосон.',
      descEn: '100% biological ecosystem restoration setting industry benchmark standards.',
      icon: <Sprout size={28} />,
      bgGradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    },
  ];

  return (
    <>
      {/* 1. Full Bleed Hero Banner */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url('https://www.residencesegattini.it/clientfiles/page/20211021152000_sport-relax.jpg')`,
        backgroundColor: '#0f172a'
      }}>
        <div className="full-bleed-banner-overlay"></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up">
            <h1 className="hero-title">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : (lang === 'mn' ? 'Тогтвортой Хөгжил & Эко Бодлого' : 'Sustainable Development & CSR')}
            </h1>
            <p className="hero-subtitle">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) : (lang === 'mn' ? 'Ирээдүй үедээ ногоон байгаль, хариуцлагатай үйлдвэрлэлийг өвлүүлэн үлдээх нь бидний эрхэм зорилго юм.' : 'Preserving green environment and responsible production for future generations.')}
            </p>
          </div>
        </div>
      </div>





      {/* 4. UN Sustainable Development Goals (SDGs) Bento Grid */}
      <section style={{ backgroundColor: '#f8fafc', padding: '80px 20px', fontFamily: "'Montserrat', sans-serif", borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '24px',
              padding: '6px 20px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#2563eb',
              marginBottom: '16px'
            }}>
              <Globe size={16} />
              UN SUSTAINABLE DEVELOPMENT GOALS
            </div>
            <h2 className="no-underline" style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.5px' }}>
              {lang === 'mn' ? 'НҮБ-ын Тогтвортой Хөгжлийн Зорилтууд' : 'UN Sustainable Development Goals'}
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '640px', margin: '0 auto' }}>
              {lang === 'mn' ? 'Бид дэлхийн тогтвортой хөгжлийн зорилтуудад бодитой хувь нэмэр оруулж байна' : 'Aligning our green operations with global UN sustainable development goals'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
            {sdgGoals.map((sdg, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  padding: '32px 28px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '800',
                      letterSpacing: '1px',
                      color: '#ffffff',
                      background: sdg.bgGradient,
                      padding: '6px 14px',
                      borderRadius: '20px'
                    }}>
                      {sdg.goalNumber}
                    </span>
                    <div style={{ color: '#0284c7' }}>
                      {sdg.icon}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '12px', lineHeight: '1.35' }}>
                    {lang === 'mn' ? sdg.titleMn : sdg.titleEn}
                  </h3>

                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                    {lang === 'mn' ? sdg.descMn : sdg.descEn}
                  </p>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#16a34a', fontWeight: '600' }}>
                  <CheckCircle2 size={16} />
                  <span>{lang === 'mn' ? 'Бодит үр дүн хэрэгжсэн' : 'Active Impact Verified'}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Environmental Commitments Grid */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '80px 20px', fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="no-underline" style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
              {lang === 'mn' ? 'Байгаль Орчин & Ногоон Бодлого' : 'Environmental Policy & Commitments'}
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              {lang === 'mn' ? 'Эх байгальдаа ээлтэй, хариуцлагатай үйлдвэрлэлийг бид зарчим болгон ажилладаг' : 'Responsible production and eco-friendly standards in every step'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '24px',
              padding: '36px 28px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#dbeafe',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Droplets size={28} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
                {lang === 'mn' ? 'Усны 100% Дахин Ашиглалт' : '100% Water Recycling'}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.65', margin: 0 }}>
                {lang === 'mn' ? 'Монцемент үйлдвэр нь хаалттай усан хангамжийн системээр үйлдвэрлэлийн усыг 100% дахин ашигладаг.' : 'Utilizing zero-water-waste closed loop recycling technologies.'}
              </p>
            </div>

            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '24px',
              padding: '36px 28px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Trees size={28} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
                {lang === 'mn' ? '7 Хэсэг Ойн Төгөл' : '7 Forest Belts'}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.65', margin: 0 }}>
                {lang === 'mn' ? 'Тосонгийн орд газарт 5.5 км урт ойн төглийг ургуулж, хөрсний ургамалжилтыг сэргээсэн.' : 'Created 5.5 km forest belts to restore natural biodiversity.'}
              </p>
            </div>

            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '24px',
              padding: '36px 28px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Building2 size={28} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
                {lang === 'mn' ? 'Орон Нутгийн Хөгжил' : 'Local Community Upgrades'}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.65', margin: 0 }}>
                {lang === 'mn' ? 'Сургууль, цэцэрлэг, эмнэлгийн тохижилтыг тасралтгүй санхүүжүүлдэг.' : 'Funding community schools, healthcare upgrades, and local infrastructure.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
