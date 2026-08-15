import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Award,
  ShieldCheck,
  Globe,
  GraduationCap,
  HeartPulse,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  Sprout,
  Users,
  Building2,
  ArrowRight,
  Quote,
  FileText,
  Download
} from 'lucide-react';
import csrHeroImg from '../../assets/2bro.jpg';
import badamImg from '../../assets/badam.jpg';
import InteractiveTitle from '../../components/ui/InteractiveTitle';

export default function CsrPage({ lang, t, pageMetadata }) {
  const isMn = lang === 'mn';

  const horizontalCards = [
    {
      id: 1,
      boldText: 'Green Entrepreneur ',
      normalText: isMn ? 'Тогтвортой хөгжил, байгаль орчны менежментийг хэрэгжүүлэгч' : 'Sustainable Development & Environmental Management',
      icon: Award
    },
    {
      id: 2,
      boldText: 'ТОП-100 ',
      normalText: isMn ? 'Аж ахуйн нэгж' : 'Enterprise of Mongolia',
      icon: Trophy
    },
    {
      id: 3,
      boldText: 'Green Preneur ',
      normalText: isMn ? 'Тогтвортой үйлдвэрлэлийн менежмент хэрэгжүүлэгч' : 'Sustainable Manufacturing Management',
      icon: ShieldCheck
    },
    {
      id: 4,
      boldText: 'ACES',
      normalText: isMn ? 'Азийн аж үйлдвэржилтийн\nманлайлагч' : 'Asia Corporate Excellence &\nSustainability',
      icon: Globe
    }
  ];

  const sustainabilityReports = [
    {
      id: 1,
      year: '2023',
      size: '4.2 MB',
      title: isMn ? 'Тогтвортой Хөгжлийн Тайлан 2023' : 'Sustainability Report 2023',
      desc: isMn ? 'Байгаль орчны менежмент, нийгмийн хариуцлага болон ногоон үйлдвэрлэлийн гүйцэтгэлийн тайлан.' : 'Annual performance report covering environmental management and social responsibility.',
      url: '#'
    },
    {
      id: 2,
      year: '2022',
      size: '3.8 MB',
      title: isMn ? 'Тогтвортой Хөгжлийн Тайлан 2022' : 'Sustainability Report 2022',
      desc: isMn ? 'Монполимет Группийн тогтвортой хөгжил, биологийн нөхөн сэргээлтийн жилийн нэгдсэн тайлан.' : 'Annual report on sustainable growth and biological land rehabilitation.',
      url: '#'
    },
    {
      id: 3,
      year: '2021',
      size: '3.5 MB',
      title: isMn ? 'Тогтвортой Хөгжлийн Тайлан 2021' : 'Sustainability Report 2021',
      desc: isMn ? 'ХАБЭА, эко системийн тэнцвэрийг хадгалах чиглэлээр хэрэгжүүлсэн ажлуудын нэгдсэн тайлан.' : 'Comprehensive summary of HSE initiatives and ecological preservation efforts.',
      url: '#'
    }
  ];

  const foundationPillars = [
    {
      icon: GraduationCap,
      title: isMn ? 'Хүүхдийн Боловсрол' : 'Children\'s Education',
      desc: isMn ? 'Эх орны ирээдүй болсон хүүхэд багачуудын сурч мэдэх, эрдэм мэдлэг эзэмших таатай орчин, сургалтын тэтгэлэг хөтөлбөрүүд.' : 'Providing scholarships and learning environments for the youth.',
      count: '1,500+'
    },
    {
      icon: HeartPulse,
      title: isMn ? 'Эх, Хүүхдийн Эрүүл Мэнд' : 'Maternal & Child Health',
      desc: isMn ? 'Эх нялхсын эрүүл мэндийг дэмжих, эмнэлгийн тоног төхөөрөмж болон эрүүл мэндийн урьдчилан сэргийлэх төслүүд.' : 'Supporting medical equipment and healthcare initiatives for mothers & infants.',
      count: '10,000+'
    },
    {
      icon: HeartHandshake,
      title: isMn ? 'Нийгмийн Сайн Сайхан' : 'Social Welfare & Community',
      desc: isMn ? 'Орон нутгийн иргэд, зорилтот бүлэгт чиглэсэн нийгмийн халамж, сайн үйлсийн бодит хөрөнгө оруулалтууд.' : 'Investing in targeted social support and community welfare projects.',
      count: '50+'
    }
  ];

  return (
    <>
      {/* 1. Full Bleed Hero Banner */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url(${csrHeroImg})`,
        backgroundPosition: 'center 20%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0f172a',
        width: '100%',
        minHeight: '80vh',
        paddingTop: '160px',
        paddingBottom: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="full-bleed-banner-overlay" style={{ background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.65))' }}></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up" style={{ textAlign: 'center', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 className="hero-title">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : (lang === 'mn' ? 'Тогтвортой Хөгжил & Нийгмийн Хариуцлага' : 'Sustainable Development & CSR')}
            </h1>
            <p className="hero-subtitle">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) : (lang === 'mn' ? 'Ирээдүй үедээ ногоон байгаль, хариуцлагатай үйлдвэрлэлийг өвлүүлэн үлдээх нь бидний эрхэм зорилго юм.' : 'Preserving green environment and responsible production for future generations.')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area in Monpolymet Corporate Blue & Clean Slate Palette */}
      <div style={{ backgroundColor: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}>

        {/* SECTION 1: SUSTAINABILITY REPORT SECTION (4 Items Side-by-Side without Card Boxes) */}
        <section id="reports" style={{ padding: '80px 5% 70px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <InteractiveTitle
                text={isMn ? 'Бидний амжилтууд' : 'Our Achievements'}
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 36px)',
                  fontWeight: '600',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Montserrat', sans-serif",
                  margin: 0
                }}
              />
            </div>

            {/* 4 Clean Side-by-Side Items (No Background / No Card Box) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>
              {horizontalCards.map((card, idx) => {
                const CIcon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '10px 12px'
                    }}
                  >
                    <div style={{
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CIcon size={36} color="#2563eb" strokeWidth={1.5} />
                    </div>

                    <h4 style={{ fontSize: '15.5px', fontWeight: '700', color: '#0f172a', margin: card.normalText ? '0 0 6px 0' : '0', fontFamily: "'Montserrat', sans-serif" }}>
                      {card.boldText.trim()}
                    </h4>
                    {card.normalText && (
                      <p style={{ fontSize: '14px', fontWeight: '400', color: '#475569', margin: 0, lineHeight: '1.5', fontFamily: "'Montserrat', sans-serif", whiteSpace: 'pre-line' }}>
                        {card.normalText}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>


        {/* SECTION 2: МӨНХТОГТВОРТОЙ ХӨГЖИЛ САН */}
        <section style={{ backgroundColor: '#ffffff', padding: '70px 5% 90px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

            {/* 2-Column Side-by-Side Layout */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '96px',
              alignItems: 'start'
            }}>

              {/* Left Column: Title & Text Block */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  paddingTop: '6px'
                }}
              >
                <InteractiveTitle
                  text={isMn ? 'Мөнхтогтвортой хөгжил сан' : 'Munkhtogtvortoi Khogjil Foundation'}
                  style={{
                    fontSize: 'clamp(24px, 3.5vw, 34px)',
                    fontWeight: '700',
                    color: '#0f172a',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.2',
                    margin: '0 0 20px 0',
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                />

                <p style={{
                  fontSize: '16px',
                  color: '#475569',
                  lineHeight: '1.8',
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: '500',
                  textAlign: 'justify'
                }}>
                  {isMn
                    ? 'Мөнхтогтвортой хөгжил сан 2015 онд байгуулагдсан. Тус сангийн үйл ажиллагаа монгол орны ирээдүй болсон хүүхдүүдийн боловсрол, эх, хүүхдийн эрүүл мэнд, нийгмийн сайн сайхны төлөө хөрөнгө оруулж, төсөл хөтөлбөр хэрэгжүүлдэг.'
                    : 'Munkhtogtvortoi Khogjil Foundation was established in 2015 to invest in children\'s education, maternal & child health, and community welfare, implementing high-impact sustainable programs across Mongolia.'}
                </p>

                <div style={{ marginTop: '44px' }}>
                  <a
                    href="https://munkhfoundation.mn"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'linear-gradient(135deg, #010B40 0%, #001CE8 100%)',
                      color: '#ffffff',
                      padding: '14px 28px',
                      borderRadius: '30px',
                      fontSize: '15px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      boxShadow: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>Munkhfoundation.mn</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Clean Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: '300px',
                  boxShadow: 'none'
                }}
              >
                <img
                  src={badamImg}
                  alt="Munkhtogtvortoi Khogjil Foundation"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block'
                  }}
                />
              </motion.div>

            </div>

          </div>
        </section>

        {/* SECTION 3: BOTTOM SUSTAINABILITY REPORTS (ХАМГИЙН ДООР, FOOTER-ИЙН ДЭЭР) */}
        <section style={{ backgroundColor: '#ffffff', padding: '80px 5% 90px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <InteractiveTitle
                text={isMn ? 'Тогтвортой хөгжлийн тайлан' : 'Sustainability Reports'}
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 36px)',
                  fontWeight: '700',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Montserrat', sans-serif",
                  margin: 0
                }}
              />
            </div>

            {/* 3 Report Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px'
            }}>
              {sustainabilityReports.map((report, idx) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '24px',
                    padding: '32px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = '#001CE8';
                    e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(0, 28, 232, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
                  }}
                >
                  <div>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #010B40 0%, #001CE8 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      marginBottom: '20px'
                    }}>
                      <FileText size={26} color="#ffffff" />
                    </div>

                    <span style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#001CE8',
                      backgroundColor: '#eff6ff',
                      padding: '4px 12px',
                      borderRadius: '14px',
                      display: 'inline-block',
                      marginBottom: '12px'
                    }}>
                      {report.year} • PDF {report.size}
                    </span>

                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#0f172a',
                      lineHeight: '1.4',
                      marginBottom: '10px',
                      fontFamily: "'Montserrat', sans-serif"
                    }}>
                      {report.title}
                    </h3>

                    <p style={{
                      fontSize: '13.5px',
                      color: '#64748b',
                      lineHeight: '1.6',
                      margin: 0,
                      fontFamily: "'Montserrat', sans-serif"
                    }}>
                      {report.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: '28px' }}>
                    <a
                      href={report.url}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, #010B40 0%, #001CE8 100%)',
                        color: '#ffffff',
                        padding: '12px 24px',
                        borderRadius: '30px',
                        fontSize: '13.5px',
                        fontWeight: '700',
                        width: '100%',
                        textDecoration: 'none',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <Download size={16} />
                      <span>{isMn ? 'Татах (PDF)' : 'Download (PDF)'}</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
