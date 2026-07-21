import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Pickaxe, Truck, HardHat, Coffee, ArrowRight, ArrowLeft } from 'lucide-react';
import mandalaImg from '../../assets/mandala.jpg';
import oneImg from '../../assets/1.jpg';
import threeImg from '../../assets/3.png';
import fourLogo from '../../assets/4.png';
import monpolymetLogo from '../../assets/logo.png';
import annLogo from '../../assets/ann.png';
import narLogo from '../../assets/nar.png';

export default function CompanyCarousel({ lang }) {
  const [activeIndex, setActiveIndex] = useState(0); // Start at index 0 (Monpolymet)
  const [isTrapped, setIsTrapped] = useState(true);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);

  // Data for the 5 companies with detailed fields
  const companies = [
    {
      id: 0,
      titleMn: 'Монполимет ХХК',
      titleEn: 'Monpolymet LLC',
      icon: <Pickaxe size={48} strokeWidth={1.5} />,
      logoImg: monpolymetLogo,
      color: '#1e3a8a',
      bgImg: oneImg,
      descMn: 'Монполимет ХХК нь Монполимет Группийн үндсэн бөгөөд ууган компани бөгөөд уул уурхайн салбарт хариуцлагатай, байгальд ээлтэй олборлолтыг стандартын түвшинд хэрэгжүүлэгч юм.',
      descEn: 'Monpolymet LLC is the core and oldest company of the Monpolymet Group, implementing responsible and eco-friendly mining at a standard level.',
      projectsMn: ['Тосон алтны үйлдвэр', 'Нөхөн сэргээлтийн төсөл'],
      projectsEn: ['Toson Gold Factory', 'Rehabilitation Project'],
      foundedYear: '1992',
      sectorMn: 'Уул уурхай, олборлолт',
      sectorEn: 'Mining & Extraction',
      employeeCount: '500+',
      addressMn: 'Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо',
      addressEn: 'Sukhbaatar District, 1st khoroo, Ulaanbaatar',
      phone: '+976 7011 1111',
      email: 'info@monpolymet.mn',
      website: 'https://monpolymet.mn/'
    },
    {
      id: 1,
      titleMn: 'Монцемент Билдинг Материалс ХХК',
      titleEn: 'Moncement Building Materials LLC',
      icon: <Building2 size={48} strokeWidth={1.5} />,
      logoImg: fourLogo,
      color: '#0284c7',
      bgImg: threeImg,
      descMn: 'Европын Сэргээн Босголт Хөгжлийн Банкны хөрөнгө оруулалттай, жилд 1 сая тонн өндөр чанарын цемент үйлдвэрлэх хүчин чадалтай, байгаль орчинд ээлтэй хуурай аргын цементийн үйлдвэр юм.',
      descEn: 'An eco-friendly dry-process cement plant with an annual capacity of 1 million tons, invested by the European Bank for Reconstruction and Development.',
      projectsMn: ['Монцемент төсөл', 'Ногоон үйлдвэрлэл'],
      projectsEn: ['Moncement Project', 'Green Production'],
      foundedYear: '2015',
      sectorMn: 'Барилгын материал үйлдвэрлэл',
      sectorEn: 'Building Materials Manufacturing',
      employeeCount: '300+',
      addressMn: 'Дорноговь аймаг, Өргөн сум',
      addressEn: 'Urgun soum, Dornogovi province',
      phone: '+976 7575 1212',
      email: 'info@moncement.mn',
      website: 'https://moncement.mn/'
    },
    {
      id: 2,
      titleMn: 'Нар-Урт ХХК',
      titleEn: 'Nar-Urt LLC',
      icon: <HardHat size={48} strokeWidth={1.5} />,
      color: '#16a34a',
      bgImg: narLogo,
      descMn: 'Монполимет Группийн уул уурхай, ашиглалт, нөхөн сэргээлтийн чиглэлийн үйл ажиллагааг хариуцдаг салбар компани. 100% биологийн нөхөн сэргээлт хийж байна.',
      descEn: 'A subsidiary responsible for mining, operations, and rehabilitation. We perform 100% biological rehabilitation.',
      projectsMn: ['Тосон шороон орд', 'Биологийн нөхөн сэргээлт'],
      projectsEn: ['Toson placer deposit', 'Biological rehabilitation'],
      foundedYear: '2001',
      sectorMn: 'Уул уурхайн нөхөн сэргээлт',
      sectorEn: 'Mining Rehabilitation',
      employeeCount: '150+',
      addressMn: 'Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо',
      addressEn: 'Sukhbaatar District, 1st khoroo, Ulaanbaatar',
      phone: '+976 7011 1111',
      email: 'nar-urt@monpolymet.mn',
      website: 'https://monpolymet.mn/nar-urt'
    },
    {
      id: 3,
      titleMn: 'Эн Эн Энд ЛХХК',
      titleEn: 'ANN LLC',
      icon: <Truck size={48} strokeWidth={1.5} />,
      logoImg: annLogo,
      color: '#d97706',
      bgImg: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c50a1b?w=800&q=80',
      descMn: 'Группийн хэмжээний тээвэр логистик, тоног төхөөрөмжийн хангамж, засвар үйлчилгээ болон худалдааны чиглэлийг хариуцдаг. Найдвартай вагон тээвэр, хүнд даацын засвар үйлчилгээ үзүүлдэг.',
      descEn: 'Responsible for group-wide transport logistics, equipment supply, maintenance, and trade. Provides reliable wagon transport and heavy-duty maintenance.',
      projectsMn: ['Логистикийн төв', 'Хүнд даацын засвар'],
      projectsEn: ['Logistics Center', 'Heavy Maintenance'],
      foundedYear: '2005',
      sectorMn: 'Тээвэр, Логистик',
      sectorEn: 'Transport & Logistics',
      employeeCount: '200+',
      addressMn: 'Улаанбаатар хот, Баянгол дүүрэг, 20-р хороо',
      addressEn: 'Bayangol District, 20th khoroo, Ulaanbaatar',
      phone: '+976 7011 2222',
      email: 'logistics@monpolymet.mn',
      website: 'https://monpolymet.mn/logistics'
    },
    {
      id: 4,
      titleMn: 'Ди Кэйтерс ХХК',
      titleEn: 'De Caterers LLC',
      icon: <Coffee size={48} strokeWidth={1.5} />,
      color: '#9333ea',
      bgImg: mandalaImg,
      descMn: 'Группийн ажилтнуудын эрүүл ахуй, хоол хүнсний аюулгүй байдлыг хангах зорилгоор ресторан болон нийтийн хоолны үйлчилгээ үзүүлэгч салбар компани.',
      descEn: 'A subsidiary catering company providing restaurant and public food services to ensure the health and food safety of group employees.',
      projectsMn: ['Кэмп Ресторан', 'Үйлчилгээ'],
      projectsEn: ['Camp Restaurant', 'Services'],
      foundedYear: '2010',
      sectorMn: 'Нийтийн хоол, Ресторан',
      sectorEn: 'Catering & Restaurant',
      employeeCount: '80+',
      addressMn: 'Төв аймаг, Заамар сум',
      addressEn: 'Zaamar soum, Tuv province',
      phone: '+976 7011 3333',
      email: 'catering@monpolymet.mn',
      website: 'https://monpolymet.mn/catering'
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev < companies.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleNativeWheel = (e) => {
      const now = Date.now();
      
      if (e.deltaY > 0) { // Scrolling down
        if (activeIndex < companies.length - 1 && isTrapped) {
          e.preventDefault(); // Stop page scroll
          if (now - lastScrollTime.current > 800) {
            handleNext();
            lastScrollTime.current = now;
          }
        } else {
          // Reached the end. Release the trap so page can scroll freely.
          setIsTrapped(false);
        }
      } else if (e.deltaY < 0) { // Scrolling up
        if (activeIndex > 0 && isTrapped) {
          e.preventDefault(); // Stop page scroll
          if (now - lastScrollTime.current > 800) {
            handlePrev();
            lastScrollTime.current = now;
          }
        } else {
          // Reached the top. Release the trap so page can scroll freely.
          setIsTrapped(false);
        }
      }
    };

    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleNativeWheel);
    };
  }, [activeIndex, isTrapped]); // Rebind when activeIndex or isTrapped changes

  const handleMouseLeave = () => {
    // When mouse leaves, re-arm the scroll trap for next time
    setIsTrapped(true);
  };


  const handleCardClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > 2) diff -= companies.length;
    if (diff < -2) diff += companies.length;
    return diff;
  };

  return (
    <div 
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsTrapped(true)}
      style={{ position: 'relative', width: '100%', height: '560px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1600px', overflow: 'hidden', padding: '0' }}
    >

      {companies.map((company, index) => {
        const offset = getOffset(index);
        const isActive = offset === 0;

        let x = 0;
        let z = 0;
        let zIndex = 30;
        let rotateY = 0;
        let scale = 1;
        let blur = 0;

        if (offset === 0) {
          x = 0;
          z = 0;
          zIndex = 30;
          rotateY = 0;
          scale = 1;
          blur = 0;
        } else if (offset === -1) {
          x = -18;
          z = -150;
          zIndex = 20;
          rotateY = 35;
          scale = 0.7;
          blur = 3;
        } else if (offset === 1) {
          x = 18;
          z = -150;
          zIndex = 20;
          rotateY = -35;
          scale = 0.7;
          blur = 3;
        } else if (offset === -2) {
          x = -32;
          z = -300;
          zIndex = 10;
          rotateY = 45;
          scale = 0.55;
          blur = 6;
        } else if (offset === 2) {
          x = 32;
          z = -300;
          zIndex = 10;
          rotateY = -45;
          scale = 0.55;
          blur = 6;
        }

        return (
          <motion.div
            key={company.id}
            onClick={() => handleCardClick(index)}
            initial={false}
            animate={{
              x: `${x}vw`,
              z: z,
              scale: scale,
              rotateY: rotateY,
              opacity: 1,
              zIndex: zIndex,
              filter: `blur(${blur}px)`
            }}
            transition={{
              type: "tween",
              ease: [0.16, 1, 0.3, 1], // Super smooth custom ease (exponential out)
              duration: 0.8
            }}
            style={{
              position: 'absolute',
              width: '100%',
              maxWidth: '1100px',
              height: '560px',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              boxShadow: 'none',
              cursor: isActive ? 'default' : 'pointer',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden',
              border: '1px solid #2563eb',
            }}
          >
            {/* Left Column (Image & Titles) */}
            <div style={{ flex: '0 0 45%', padding: '40px', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                {company.logoImg ? (
                  <img src={company.logoImg} alt={company.titleMn} style={{ height: '50px', objectFit: 'contain' }} />
                ) : (
                  <>
                    <div style={{ color: company.color }}>{company.icon}</div>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a', fontFamily: "'Montserrat', sans-serif", margin: 0 }}>
                      {lang === 'mn' ? company.titleMn : company.titleEn}
                    </h2>
                  </>
                )}
              </div>
              <h1 style={{ fontSize: '32px', fontWeight: '600', color: '#0f172a', marginBottom: '32px', lineHeight: '1.2', fontFamily: "'Montserrat', sans-serif" }}>
                {lang === 'mn' ? 'Таны бизнесийн өсөлтийн хурдасгуур' : 'Your Business Growth Accelerator'}
              </h1>
              <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', minHeight: '200px' }}>
                <img src={company.bgImg} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Right Column (Data Table) */}
            <div style={{ flex: '1', padding: '40px 40px 40px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: isActive ? 1 : 0.4, transition: 'opacity 0.4s' }}>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px', fontFamily: "'Inter', sans-serif", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexShrink: 0 }}>
                {lang === 'mn' ? company.descMn : company.descEn}
              </p>
              
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                  style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', fontFamily: "'Inter', sans-serif", textAlign: 'left' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#64748b', width: '35%' }}>{lang === 'mn' ? 'Байгуулагдсан он' : 'Founded'}</th>
                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: '500' }}>{company.foundedYear}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#64748b' }}>{lang === 'mn' ? 'Үйл ажиллагааны чиглэл' : 'Sector'}</th>
                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: '500' }}>{lang === 'mn' ? company.sectorMn : company.sectorEn}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#64748b' }}>{lang === 'mn' ? 'Ажилтны тоо' : 'Employees'}</th>
                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: '500' }}>{company.employeeCount}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#64748b' }}>{lang === 'mn' ? 'Хаяг' : 'Address'}</th>
                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: '500', lineHeight: '1.4' }}>{lang === 'mn' ? company.addressMn : company.addressEn}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#64748b' }}>{lang === 'mn' ? 'Утас' : 'Phone'}</th>
                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: '500' }}>{company.phone}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#64748b' }}>{lang === 'mn' ? 'И-мэйл хаяг' : 'Email'}</th>
                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: '500' }}>{company.email}</td>
                      </tr>
                      <tr>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#64748b' }}>{lang === 'mn' ? 'Дэлгэрэнгүй' : 'Website'}</th>
                        <td style={{ padding: '16px', color: '#0f172a', fontWeight: '500' }}><a href={company.website} target="_blank" rel="noopener noreferrer" style={{ color: company.color, textDecoration: 'none' }}>{company.website}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
