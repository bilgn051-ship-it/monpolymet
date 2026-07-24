import React, { useState } from 'react';
import CompanyCarousel from '../../components/ui/CompanyCarousel';
import demo2Video from '../../assets/demo_2.mp4';
import oneImg from '../../assets/1.jpg';

export default function CompaniesPage({ lang, t, pageMetadata }) {
  const [activeSectorId, setActiveSectorId] = useState(0);

  const processData = {
    0: {
      titleMn: 'Уул уурхай, олборлолтын үе шат',
      titleEn: 'Mining & Extraction Process',
      subtitleMn: 'Тосон алтны үйлдвэр дээр хариуцлагатай, байгаль орчинд ээлтэй стандартын дагуу олборлолт хэрэгжүүлэх технологийн дараалал.',
      subtitleEn: 'The technological sequence of responsible and eco-friendly mining at the Toson gold plant.',
      type: 'image',
      src: oneImg
    },
    1: {
      titleMn: 'Цемент үйлдвэрлэх үе шат',
      titleEn: 'Cement Manufacturing Process',
      subtitleMn: 'Цементийг дараах технологийн дагуу үйлдвэрлэн, авто болон төмөр замаар орон даяар тээвэрлэн түгээж байна.',
      subtitleEn: 'Cement is manufactured through the following process and shipped by in-land road and railway transportation.',
      type: 'video',
      src: demo2Video
    },
    2: {
      titleMn: 'Байгаль орчны нөхөн сэргээлтийн үе шат',
      titleEn: 'Environmental Rehabilitation Process',
      subtitleMn: 'Олборлолт явуулсан талбайг 100% техникийн болон биологийн нөхөн сэргээлт хийж байгаль эхдээ эргүүлэн тушаах процесс.',
      subtitleEn: 'Sequence of performing 100% technical and biological rehabilitation on mined land.',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80'
    },
    3: {
      titleMn: 'Тээвэр логистик & Хангамжийн үе шат',
      titleEn: 'Transport & Logistics Process',
      subtitleMn: 'Төмөр замын вагон тээвэр, хүнд даацын логистик болон тоног төхөөрөмжийн тасралтгүй хангамжийн сүлжээ.',
      subtitleEn: 'Railway wagon transportation, heavy logistics, and continuous equipment supply chain.',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1586528116311-ad8ed3c8310d?w=1200&q=80'
    },
    4: {
      titleMn: 'Нийтийн хоол & Үйлчилгээний стандарт',
      titleEn: 'Catering & Hospitality Process',
      subtitleMn: 'Олон улсын ISO стандарт, эрүүл ахуйн аюулгүй байдлыг хангасан нийтийн хоол үйлдвэрлэл, үйлчилгээний дараалал.',
      subtitleEn: 'Public catering and hospitality sequence ensuring international ISO standards and food safety.',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80'
    }
  };

  const currentProcess = processData[activeSectorId] || processData[0];

  return (
    <>
      {/* Full Bleed Hero Banner */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url(${pageMetadata?.header?.imageUrl || 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1920&q=80'})`,
        backgroundColor: '#0f172a'
      }}>
        <div className="full-bleed-banner-overlay"></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up">
            <h1 className="hero-title">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : (lang === 'mn' ? 'Компаниуд' : 'Companies')}
            </h1>
            <p className="hero-subtitle">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) : ''}
            </p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ fontSize: '20px', lineHeight: '1.5', color: '#334155', fontWeight: '500', fontFamily: "'Inter', sans-serif", margin: 0 }}>
            {lang === 'mn' ? 'Монполимет Групп нь 1992 онд байгуулагдсан. Уул уурхай, байгаль орчны нөхөн сэргээлт, барилгын материал үйлдвэрлэл, барилга байгууламж, гадаад худалдааны чиглэлээр үйл ажиллагаа явуулж буй үндэсний үйлдвэрлэгч – хөрөнго оруулагч компани юм.' : 'Monpolymet Group was founded in 1992. It is a national manufacturer-investor company operating in mining, environmental rehabilitation, building materials production, construction, and foreign trade.'}
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', paddingBottom: '80px' }}>
        <CompanyCarousel lang={lang} onActiveChange={(id) => setActiveSectorId(id)} />

        {/* Dynamic Sector Process Section */}
        <div style={{ maxWidth: '1100px', margin: '48px auto 0', padding: '0 24px', fontFamily: "'Montserrat', sans-serif" }}>

          {/* Header Row: Left Title & Right Subtitle */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '24px',
            marginBottom: '28px',
            transition: 'all 0.3s ease'
          }}>
            {/* Left Title */}
            <div style={{ flex: '1 1 300px' }}>
              <h2 className="no-underline" style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#0f172a',
                lineHeight: '1.25',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                {lang === 'mn' ? currentProcess.titleMn : currentProcess.titleEn}
              </h2>
            </div>

            {/* Right Subtitle */}
            <div style={{ flex: '1 1 400px', maxWidth: '520px' }}>
              <p style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#1e293b',
                lineHeight: '1.4',
                margin: 0
              }}>
                {lang === 'mn' ? currentProcess.subtitleMn : currentProcess.subtitleEn}
              </p>
            </div>
          </div>

          {/* Media Animation Container */}
          <div style={{
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'block',
            lineHeight: 0,
            fontSize: 0,
            userSelect: 'none',
            boxShadow: 'none'
          }}>
            {currentProcess.type === 'video' ? (
              <video
                key={activeSectorId}
                src={currentProcess.src}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  verticalAlign: 'bottom',
                  pointerEvents: 'none',
                  transform: 'scale(1.03)',
                  transformOrigin: 'center center',
                  margin: 0,
                  padding: 0
                }}
              />
            ) : (
              <img
                key={activeSectorId}
                src={currentProcess.src}
                alt={currentProcess.titleMn}
                style={{
                  width: '100%',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: '16px'
                }}
              />
            )}
          </div>

        </div>
      </div>
    </>
  );
}

