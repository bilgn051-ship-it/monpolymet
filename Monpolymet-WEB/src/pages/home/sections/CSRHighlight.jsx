import * as LucideIcons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import webVideo from '../../../assets/WEB.mp4';

export default function CSRHighlight({ lang, data }) {
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const bgUrl = data?.imageUrl || webVideo;
  const isVideo = bgUrl.match(/\.(mp4|webm|ogg)(\?.*)?$/i) || bgUrl === webVideo;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="container-padding" style={{ paddingTop: '30px', paddingBottom: '40px', backgroundColor: '#ffffff' }}>
      <div
        ref={containerRef}
        className="csr-highlight-card"
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '60px',
          backgroundImage: !isVideo ? `url("${bgUrl}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 24px 50px rgba(0,0,0,0.1)',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        {/* Video Background */}
        {isVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={bgUrl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
          zIndex: 1
        }}></div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', width: '100%', color: '#ffffff' }}>
          
          {/* Badge / Title */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '32px', fontWeight: '600', fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.5px' }}>
              {lang === 'mn' ? (data?.titleMn || 'Тогтвортой хөгжил') : (data?.titleEn || 'Sustainable Development')}
            </span>
          </div>

          {/* Long Gray Line */}
          <div style={{ 
            width: '100%', 
            height: '1px', 
            backgroundColor: 'rgba(255, 255, 255, 0.2)', 
            marginBottom: '32px' 
          }}></div>

          {/* Paragraph */}
          <p style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.9)',
            fontFamily: "'Montserrat', sans-serif",
            maxWidth: '850px',
            marginBottom: '32px'
          }}>
            {lang === 'mn' 
              ? (data?.subtitleMn || 'Тосонгийн ордод 931,67 га талбайд ашиглалт явуулсанаас техникийн нөхөн сэргээлтийг 743 га талбайд, биологийн нөхөн сэргээлтийг 514 га талбайд хийсэн. 100 000 гаруй мод тариалж 5,5 км урт 7 хэсэг ойн төглүүд ургуулсан бөгөөд 16 га талбайтай Тосон нуурыг бий болгоод байна.') 
              : (data?.subtitleEn || 'Reclamation works at Toson mine.')}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data?.bullets?.map((b, i) => {
              const Icon = b.icon && LucideIcons[b.icon] ? LucideIcons[b.icon] : null;
              return (
                <div key={i} style={{ fontSize: '16px', fontWeight: '400', lineHeight: 1.5, fontFamily: "'Montserrat', sans-serif", color: '#ffffff', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                    {Icon ? <Icon size={20} color="#ffffff" /> : '•'}
                  </span>
                  <span>{lang === 'mn' ? b.textMn : b.textEn}</span>
                </div>
              );
            })}
            {!data?.bullets?.length && (
              <>
                 <div style={{ fontSize: '16px', fontWeight: '400', lineHeight: 1.5, fontFamily: "'Montserrat', sans-serif", color: '#ffffff', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                   <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}><LucideIcons.Leaf size={20} color="#ffffff" /></span>
                   <span>Техникийн нөхөн сэргээлт 870.3 га талбайд 85.2%</span>
                 </div>
                 <div style={{ fontSize: '16px', fontWeight: '400', lineHeight: 1.5, fontFamily: "'Montserrat', sans-serif", color: '#ffffff', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                   <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}><LucideIcons.Leaf size={20} color="#ffffff" /></span>
                   <span>Биологийн нөхөн сэргээлт, ургамалжуулалт 561 га талбайд 69%</span>
                 </div>
                 <div style={{ fontSize: '16px', fontWeight: '400', lineHeight: 1.5, fontFamily: "'Montserrat', sans-serif", color: '#ffffff', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                   <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}><LucideIcons.Leaf size={20} color="#ffffff" /></span>
                   <span>300,000+ мод тариалсан 100%</span>
                 </div>
              </>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div style={{
          marginTop: 'auto',
          alignSelf: 'flex-end',
          zIndex: 2,
          paddingTop: '40px'
        }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            border: 'none',
            borderRadius: '40px',
            padding: '6px 6px 6px 20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            fontFamily: "'Montserrat', sans-serif",
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {lang === 'mn' ? (data?.buttonTextMn || 'Дэлгэрэнгүй') : (data?.buttonTextEn || 'More details')}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#2e7d32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <LucideIcons.Leaf size={20} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
