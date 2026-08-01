import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Trees, HeartHandshake, Leaf, Droplets, Building2, Cpu, ArrowUpRight, Sparkles, Globe, ShieldCheck, Sun, Sprout, Award, CheckCircle2, RotateCw, Maximize2, Minimize2, ZoomIn, ZoomOut, X } from 'lucide-react';
import { fetchCsr } from '../../api';
import toson360LakeImg from '../../assets/toson-360-lake.jpg';

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
      imageUrl: toson360LakeImg,
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

  const rawCsr = csrItems && csrItems.length > 0 ? csrItems : defaultCsr;
  const displayCsr = rawCsr.map((item, idx) => idx === 0 ? { ...item, imageUrl: '/toson-360-lake.jpg' } : item);



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

      {/* 5. 360° Virtual Tour & 3D Interactive Showcase (Right above Footer) */}
      <CsrVirtualTour lang={lang} />
    </>
  );
}

function CsrVirtualTour({ lang }) {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [panX, setPanX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const scenes = [
    {
      id: 'lake',
      titleMn: 'Тосон Нуур & Эко Парк (16 га)',
      titleEn: 'Toson Lake & Eco-Park (16 ha)',
      descMn: 'Алтан цагаан сувд мэт 16 га талбай бүхий тунгалаг хиймэл нуур ба шувуудын диваажин.',
      descEn: 'A pristine 16-hectare freshwater lake supporting local ecosystem biodiversity.',
      thumbUrl: toson360LakeImg,
      panoUrl: toson360LakeImg,
      hotspots: [
        {
          id: 1,
          left: '30%',
          top: '45%',
          titleMn: '16 га Тосон Нуур',
          titleEn: '16 ha Toson Lake',
          infoMn: '100% хиймэл аргаар байгуулсан цэнгэг уст нуур бөгөөд усны шувууд болон загас үржих таатай орчин бүрдсэн.',
          infoEn: 'Man-made freshwater lake supporting migrating waterfowl and fish biodiversity.',
          stat: '16 га'
        },
        {
          id: 2,
          left: '68%',
          top: '55%',
          titleMn: 'Усны хаалттай дахин ашиглалт',
          titleEn: 'Zero Water Waste Recycling',
          infoMn: 'Эко үйлдвэрлэл болон уул уурхайн хэрэгцээнд усыг 100% дахин ашиглаж, байгалийн нөөцийг хэмнэдэг.',
          infoEn: 'Closed-loop water recycling ensuring zero industrial wastewater release.',
          stat: '100%'
        }
      ]
    },
    {
      id: 'forest',
      titleMn: 'Ойн Төгөл ба Ногоон Бүс (5.5 км)',
      titleEn: '5.5 km Protective Forest Belts',
      descMn: '100,000 гаруй мод тариалж, хөрсний ургамалжлыг 100% сэргээсэн жишиг ойн төгөл.',
      descEn: 'Over 100,000 trees planted creating 5.5 km protective green forestry belts.',
      thumbUrl: 'https://en.monpolymet.mn/wp-content/uploads/2021/12/news_20211113-1.jpg',
      panoUrl: 'https://en.monpolymet.mn/wp-content/uploads/2021/12/news_20211113-1.jpg',
      hotspots: [
        {
          id: 3,
          left: '42%',
          top: '40%',
          titleMn: '100,000+ Тариалсан Мод',
          titleEn: '100,000+ Trees Planted',
          infoMn: 'Шинэс, нарс, харгана, чацаргана зэрэг 10 гаруй төрлийн мод сөөг тариалж хамгаалалтын бүс байгуулсан.',
          infoEn: 'Diverse tree species planted forming permanent windbreak forest belts.',
          stat: '100,000+'
        },
        {
          id: 4,
          left: '75%',
          top: '60%',
          titleMn: '1 сая мод амлалт',
          titleEn: '1 Million Trees Pledge',
          infoMn: 'Үндэсний "Нэг тэрбум мод" хөдөлгөөнд Монполимет Групп 1 сая модоор идэвхтэй оролцож байна.',
          infoEn: 'Monpolymet Group pledged 1 million trees for the national afforestation initiative.',
          stat: '1,000,000'
        }
      ]
    },
    {
      id: 'reclamation',
      titleMn: 'Биологийн Нөхөн Сэргээлт (743 га)',
      titleEn: 'Biological Restoration Zone (743 ha)',
      descMn: 'Техникийн 743 га, биологийн 514 га талбайд 100% амжилттай хийсэн сэргээлтийн талбай.',
      descEn: 'Model 743 ha technical and 514 ha biological restoration zones.',
      thumbUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop',
      panoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop',
      hotspots: [
        {
          id: 5,
          left: '35%',
          top: '50%',
          titleMn: '743 га Техникийн Сэргээлт',
          titleEn: '743 ha Technical Reclamation',
          infoMn: 'Хөрсний бүтэц болон газрын рельефийг уугуул хэв шинжид нь бүрэн оруулж хэлбэржүүлсэн.',
          infoEn: 'Land regrading and topsoil restoration completed over 743 hectares.',
          stat: '743 га'
        },
        {
          id: 6,
          left: '60%',
          top: '38%',
          titleMn: '514 га Биологийн Сэргээлт',
          titleEn: '514 ha Biological Restoration',
          infoMn: 'Олон наст ашигт ургамал болон бэлчээрийн ургамлыг дахин нутагшуулсан.',
          infoEn: 'Perennial pastures and native flora successfully re-established.',
          stat: '514 га'
        }
      ]
    },
    {
      id: 'moncement',
      titleMn: 'Монцемент Үйлдвэрийн Цогцолбор',
      titleEn: 'Moncement Industrial Plant',
      descMn: 'Европын ISO стандартаар тоноглогдсон хуурай аргын бүрэн автомат эко цементийн үйлдвэр.',
      descEn: 'European standard fully automated dry-process eco cement plant.',
      thumbUrl: 'https://monpolymet.mn/wp-content/uploads/2022/05/Moncement-factory.jpg',
      panoUrl: 'https://monpolymet.mn/wp-content/uploads/2022/05/Moncement-factory.jpg',
      hotspots: [
        {
          id: 7,
          left: '50%',
          top: '45%',
          titleMn: 'Хуурай Аргын Эко Үйлдвэрлэл',
          titleEn: 'Dry-Process Eco Production',
          infoMn: 'Усны хэрэглээг 5 дахин багасгасан хуурай аргын технологитой.',
          infoEn: 'Reduces water consumption 5x through dry-process technology.',
          stat: '5x хэмнэлт'
        }
      ]
    }
  ];

  const currentScene = scenes[activeSceneIdx] || scenes[0];

  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const timer = setInterval(() => {
      setPanX(prev => (prev - 0.5) % 2000);
    }, 30);
    return () => clearInterval(timer);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - panX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanX(e.clientX - startX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX - panX);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPanX(e.touches[0].clientX - startX);
  };

  return (
    <section id="visit" style={{
      backgroundColor: '#ffffff',
      color: '#0f172a',
      padding: '80px 20px 90px 20px',
      fontFamily: "'Montserrat', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '24px',
            padding: '6px 22px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#001CE8',
            marginBottom: '16px'
          }}>
            <Globe size={16} />
            {lang === 'mn' ? '360° ВИРТУАЛ АЯЛАЛ & 3D ЭКО ПАРК' : '360° VIRTUAL TOUR & 3D ECO-PARK'}
          </div>

          <h2 className="no-underline" style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.5px', fontFamily: "'Montserrat', sans-serif" }}>
            {lang === 'mn' ? 'Тосонгийн Орд & Эко Парк - 360° Интерактив Аялал' : 'Toson Mine & Eco-Park - 360° Interactive Tour'}
          </h2>
          
          <p style={{ fontSize: '16px', color: '#475569', maxWidth: '680px', margin: '0 auto', lineHeight: '1.6', fontFamily: "'Montserrat', sans-serif" }}>
            {lang === 'mn'
              ? 'Тосонгийн нөхөн сэргээлтийн бүс, 16 га Тосон нуур болон 5.5 км ойн төглийг интерактив 360° панорама орчинд мэдрэн үзээрэй.'
              : 'Experience the model eco-restoration, 16-hectare lake, and 5.5 km forest belts in an interactive 360° virtual environment.'}
          </p>
        </div>

        {/* 360° Panorama Viewer Container */}
        <div style={{
          position: isFullscreen ? 'fixed' : 'relative',
          inset: isFullscreen ? 0 : 'auto',
          zIndex: isFullscreen ? 99999 : 5,
          width: '100%',
          height: isFullscreen ? '100vh' : '560px',
          borderRadius: isFullscreen ? '0px' : '28px',
          overflow: 'hidden',
          backgroundColor: '#000000',
          border: isFullscreen ? 'none' : '1px solid #e2e8f0',
          userSelect: 'none'
        }}>
          {/* Renderstuff Official Pannellum 360 WebGL Panorama Viewer */}
          <RenderstuffPannellumViewer
            imageSrc={currentScene.panoUrl}
            autoRotate={autoRotate}
          />



          {/* Control Toolbar Top Right */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 30,
            display: 'flex',
            gap: '8px',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            padding: '6px'
          }}>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              title={autoRotate ? "Панорама авто-эргэлт идэвхтэй" : "Авто-эргэлт эхлүүлэх"}
              style={{
                backgroundColor: autoRotate ? 'rgba(37, 99, 235, 0.3)' : 'transparent',
                border: 'none',
                color: autoRotate ? '#60a5fa' : '#ffffff',
                padding: '8px 12px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              <RotateCw size={16} className={autoRotate ? 'animate-spin-slow' : ''} />
              <span>{autoRotate ? (lang === 'mn' ? 'Эргэж байна' : 'Rotating') : (lang === 'mn' ? 'Авто эргэлт' : 'Auto Rotate')}</span>
            </button>

            <button
              onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.15))}
              style={{ backgroundColor: 'transparent', border: 'none', color: '#ffffff', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}
              title="Ойртуулах"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(1.0, prev - 0.15))}
              style={{ backgroundColor: 'transparent', border: 'none', color: '#ffffff', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}
              title="Холдуулах"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              style={{ backgroundColor: 'transparent', border: 'none', color: '#ffffff', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}
              title="Бүрэн дэлгэц"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>

          {/* Bottom Scene Indicator Badge inside Pano */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 30,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '14px',
            padding: '8px 16px',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#60a5fa', boxShadow: '0 0 10px #60a5fa' }} />
            <span>{lang === 'mn' ? currentScene.titleMn : currentScene.titleEn}</span>
          </div>
        </div>

        {/* Location Thumbnail Selection Grid below 360 Viewer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          {scenes.map((sc, idx) => {
            const isActive = idx === activeSceneIdx;
            return (
              <div
                key={sc.id}
                onClick={() => {
                  setActiveSceneIdx(idx);
                  setSelectedHotspot(null);
                }}
                style={{
                  backgroundColor: isActive ? '#ffffff' : '#f8fafc',
                  border: isActive ? '2px solid #001CE8' : '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#001CE8';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                  }
                }}
              >
                <div style={{
                  width: '60px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundImage: `url(${sc.thumbUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0,
                  border: isActive ? '1.5px solid #001CE8' : '1px solid #cbd5e1'
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h5 style={{
                    fontSize: '13.5px',
                    fontWeight: '700',
                    color: isActive ? '#001CE8' : '#0f172a',
                    margin: '0 0 2px 0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    {lang === 'mn' ? sc.titleMn : sc.titleEn}
                  </h5>
                  <p style={{
                    fontSize: '11.5px',
                    color: '#64748b',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    {lang === 'mn' ? sc.descMn : sc.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hotspot Glass Detail Modal */}
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '24px',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              borderRadius: '20px',
              padding: '24px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                color: '#60a5fa',
                padding: '12px 18px',
                borderRadius: '14px',
                fontSize: '20px',
                fontWeight: '800'
              }}>
                {selectedHotspot.stat}
              </div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>
                  {lang === 'mn' ? selectedHotspot.titleMn : selectedHotspot.titleEn}
                </h4>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: '1.5' }}>
                  {lang === 'mn' ? selectedHotspot.infoMn : selectedHotspot.infoEn}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// 🌐 RENDERSTUFF OFFICIAL PANNELLUM 360 WEBGL VIEWER
function RenderstuffPannellumViewer({ imageSrc, autoRotate }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    // Inject Pannellum CSS if not present
    if (!document.getElementById('pannellum-css')) {
      const link = document.createElement('link');
      link.id = 'pannellum-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
      document.head.appendChild(link);
    }

    const initViewer = () => {
      if (!containerRef.current || !window.pannellum) return;
      if (viewerRef.current) {
        try { viewerRef.current.destroy(); } catch {}
      }

      const panoPath = typeof imageSrc === 'string' ? imageSrc : (imageSrc.default || imageSrc);

      viewerRef.current = window.pannellum.viewer(containerRef.current, {
        type: 'equirectangular',
        panorama: panoPath,
        autoLoad: true,
        autoRotate: autoRotate ? -2 : 0,
        showControls: true,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        mouseZoom: true,
        friction: 0.15,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        compass: false,
        backgroundColor: [15, 23, 42]
      });
    };

    if (window.pannellum) {
      initViewer();
    } else {
      let script = document.getElementById('pannellum-js');
      if (!script) {
        script = document.createElement('script');
        script.id = 'pannellum-js';
        script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
        document.head.appendChild(script);
      }
      script.addEventListener('load', initViewer);
    }

    return () => {
      if (viewerRef.current) {
        try { viewerRef.current.destroy(); } catch {}
      }
    };
  }, [imageSrc, autoRotate]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    />
  );
}
