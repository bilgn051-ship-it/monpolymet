import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, ShieldCheck, Sprout, Award, UserPlus,
  FileText, FileSearch, PhoneCall, ClipboardList, MessageCircle, Handshake,
  HeartPulse, Gift, Coffee, GraduationCap, Shield, Dumbbell, Scale, Shirt,
  Check, Building2, Briefcase, HardHat, FlaskConical, ArrowRight, ArrowUpRight, MapPin,
  X, CheckCircle, Calendar, ClipboardEdit, UserCog, ClipboardCheck, UserCheck
} from 'lucide-react';
import { fetchStatCards, fetchCareersContent, submitCandidateApplication } from '../../api';
import InteractiveTitle from '../../components/ui/InteractiveTitle';
import zangiaLogo from '../../assets/zangia-logo.png';
import careersHeroImg from '../../assets/careers-hero.png';

const styles = `
.cp-wrapper {
  font-family: 'Inter', sans-serif;
  background-color: #f4f7f9;
  color: #0f172a;
  padding-bottom: 80px;
}
.cp-wrapper h2::after, .cp-wrapper h2::before {
  display: none !important;
}
.sec-title {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
}
.sec-link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.sec-link:hover { opacity: 0.8; }

/* HR POLICY SECTION */
.hr-policy-container {
  display: flex;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 32px;
  padding: 60px;
  margin: 0 5% 60px;
  gap: 60px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255,255,255,1);
  border: 1px solid rgba(226, 232, 240, 0.8);
}
.hr-policy-left {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hr-policy-left h2 {
  font-size: clamp(26px, 3.5vw, 36px);
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}
.hr-policy-left p {
  color: #475569;
  line-height: 1.8;
  margin-bottom: 30px;
  font-size: 15px;
  font-weight: 400;
  text-align: justify;
  text-justify: inter-word;
}
.hr-policy-right {
  flex: 1.8;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.policy-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 28px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  border: 1px solid #f1f5f9;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
}
.policy-card:hover {
  transform: translateY(-5px);
  box-shadow: none;
  border-color: #cbd5e1;
}
.policy-icon-wrapper {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eff6ff;
  color: #2563eb;
}

.policy-text-content h4 {
  font-size: 14px;
  font-weight: 800;
  margin: 0 0 6px 0;
  color: #0f172a;
  line-height: 1.5;
}
.policy-text-content p {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

/* NEW STAGES SECTION */
.stages-container {
  padding: 60px 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stages-title-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}
.stages-title {
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  color: #0f172a;
  text-transform: none;
  margin: 0;
}
.stages-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 1200px;
}
.stage-card {
  background: transparent;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: none;
  width: 100%;
}
.stage-card:hover {
  transform: translateY(-5px);
  background: transparent;
  border-color: #0284c7;
  box-shadow: none;
}
.stage-icon-box {
  margin-bottom: 20px;
  color: #0284c7;
}
.stage-card h4 {
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.5;
  margin: 0;
}

/* JOIN & GUARANTEES SECTION */
.join-guarantees-container {
  display: flex;
  gap: 24px;
  margin: 0 5% 40px;
}
.join-box {
  flex: 1.2;
  background: #0b1a30; 
  border-radius: 24px;
  padding: 48px;
  color: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.join-content {
  position: relative;
  z-index: 1;
}
.join-illustration {
  position: absolute;
  right: -5%;
  bottom: -10%;
  width: 60%;
  height: 110%;
  background: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop') right/cover no-repeat;
  opacity: 0.5;
  mix-blend-mode: luminosity;
  border-radius: 24px;
  mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
  -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
}
.btn-solid {
  background: white;
  color: #0b1a30;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s;
}
.btn-solid:hover { opacity: 0.9; transform: translateY(-2px); }

.guarantees-box {
  flex: 1.8;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 32px;
  box-shadow: none;
}
.guarantees-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.guarantee-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: none;
}
.guarantee-icon {
  width: 48px;
  height: 48px;
  background: white;
  color: #2563eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: none;
}
.guarantee-card h4 {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  line-height: 1.4;
}

/* STATS BANNER / JOIN BANNER */
.stats-banner {
  display: flex;
  background: linear-gradient(90deg, #010B40 0%, #001CE8 100%);
  border-radius: 24px;
  margin: 0 5% 40px;
  color: white;
  overflow: hidden;
  position: relative;
  min-height: 240px;
  box-shadow: 0 12px 35px rgba(1, 11, 64, 0.2);
}
.stats-left {
  flex: 1.4;
  padding: 44px 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  z-index: 2;
}

.stats-right {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  min-height: 200px;
}
.stats-right-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: right center;
  z-index: 1;
  opacity: 0.75;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 40%);
  mask-image: linear-gradient(to right, transparent 0%, black 40%);
}

/* QUOTE BOX */
.quote-box {
  display: flex;
  background: #eff6ff;
  border-radius: 24px;
  margin: 0 5%;
  overflow: hidden;
}
.quote-left {
  flex: 1.5;
  padding: 48px;
  display: flex;
  align-items: flex-start;
  gap: 32px;
}
.quote-text {
  font-size: 17px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.6;
  margin-top: 12px;
}
.quote-image {
  flex: 1;
  background: url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=800') center/cover no-repeat;
  min-height: 200px;
}

/* MODAL */
.cp-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(8px);
}
.cp-modal-content {
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 720px;
  padding: 36px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}
.cp-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.cp-modal-close:hover {
  background: #f1f5f9;
  color: #0f172a;
}
.cp-modal-title {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 24px;
}

/* RESPONSIVE FOR TABLET (10.9-inch ~1024px/834px) AND MOBILE PHONES */
@media (max-width: 1100px) {
  .stages-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .guarantees-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
}

@media (max-width: 1024px) {
  .hr-policy-container {
    flex-direction: column;
    padding: 40px 32px;
    margin: 0 4% 40px;
    gap: 36px;
  }
  .hr-policy-left { flex: none; width: 100%; }
  .hr-policy-right { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .join-guarantees-container { flex-direction: column; margin: 0 4% 40px; }
  .guarantees-box { padding: 36px 28px; }
  .stats-banner { flex-direction: column; margin: 0 4% 40px; }
  .quote-box { flex-direction: column; margin: 0 4%; }
}

@media (max-width: 768px) {
  .stages-container { padding: 40px 4%; }
  .stages-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .stage-card { padding: 24px 14px; }
  .guarantees-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .hr-policy-container { padding: 28px 20px; border-radius: 24px; }
  .policy-card { padding: 20px 16px; gap: 14px; border-radius: 16px; }
  .quote-left { padding: 28px 20px; }
  .stats-left { padding: 28px 24px; }
}

@media (max-width: 480px) {
  .stages-grid { grid-template-columns: repeat(1, 1fr); }
  .hr-policy-right { grid-template-columns: 1fr; }
  .guarantees-grid { grid-template-columns: repeat(1, 1fr); }
}
`;

export default function CareersPage({ lang, t, onApply, pageMetadata }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: '',
    previousCompany: '',
    profession: '',
    expectedSalary: '',
    availableDate: '',
    introMessage: ''
  });
  const [cvFile, setCvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [statCards, setStatCards] = useState([]);
  const [bannerContent, setBannerContent] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    fetchStatCards().then(data => {
      if (data && data.length) setStatCards(data);
    });
    fetchCareersContent().then(data => {
      if (data) setBannerContent(data);
    });

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 280);
  const heroY = scrollY * 0.35;

  const displayCards = statCards && statCards.length > 0
    ? [...statCards].sort((a, b) => a.order - b.order).slice(0, 4)
    : [];


  const openApplyModal = (positionName = '') => {
    setFormData(prev => ({ ...prev, position: positionName }));
    setIsModalOpen(true);
    setFormSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.position) {
      alert(lang === 'mn' ? 'Овог нэр, Утас, Албан тушаал талбарыг заавал бөглөнө үү.' : 'Please fill in required fields.');
      return;
    }

    setSubmitting(true);
    try {
      await submitCandidateApplication(formData, cvFile);
      if (onApply) {
        onApply({
          id: Date.now(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          position: formData.position,
          previousCompany: formData.previousCompany,
          profession: formData.profession,
          expectedSalary: formData.expectedSalary,
          availableDate: formData.availableDate,
          introMessage: formData.introMessage,
          fileName: cvFile ? cvFile.name : '',
          recipientEmail: 'mpm-hr@monpolymet.mn',
          date: new Date().toISOString().split('T')[0]
        });
      }
      setFormSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        position: '',
        previousCompany: '',
        profession: '',
        expectedSalary: '',
        availableDate: '',
        introMessage: ''
      });
      setCvFile(null);
      setTimeout(() => {
        setIsModalOpen(false);
        setFormSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Submit application failed:', err);
      alert(lang === 'mn' ? 'Илгээхэд алдаа гарлаа. Та дахин оролдоно уу.' : 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const hrPolicies = [
    { icon: BookOpen, titleMn: 'Хөгжлийг дэмжих', titleEn: 'Support Development', descMn: 'Мэргэжлийн болон манлайллын хөгжлийг тасралтгүй дэмжинэ.', descEn: 'Continuous support for professional and leadership development.' },
    { icon: ShieldCheck, titleMn: 'Шударга ёс', titleEn: 'Fairness', descMn: 'Шударга, ил тод, үнэт зүйлд тулгуурлаж ажиллана.', descEn: 'We work based on fair, transparent values.' },
    { icon: Sprout, titleMn: 'Тогтвортой байдал', titleEn: 'Sustainability', descMn: 'Ногоон хөгжлийг дэмжиж, хариуцлагатай ажиллана.', descEn: 'Supporting green development and acting responsibly.' },
    { icon: UserPlus, titleMn: 'Багийн хүч', titleEn: 'Team Strength', descMn: 'Баг хамт олон, харилцан итгэлцэлд суурилна.', descEn: 'Based on teamwork and mutual trust.' },
    { icon: Award, titleMn: 'Гүйцэтгэлд суурилна', titleEn: 'Performance Based', descMn: 'Ажилтны гүйцэтгэлийг үнэлж, урамшуулдаг.', descEn: 'We evaluate and reward employee performance.' }
  ];

  const hrStages = [
    { icon: ClipboardEdit, titleMn: 'Ажлын анкет бөглөж илгээх', titleEn: 'Submit Job Application', descMn: 'Вэб сайтаар болон онлайнаар анкет бөглөх', descEn: 'Fill out candidate application online' },
    { icon: Users, titleMn: 'Анкетийн сонгон шалгаруулалт', titleEn: 'Application Screening', descMn: 'Ирүүлсэн анкеттай танилцаж шалгаруулах', descEn: 'Reviewing submitted candidate applications' },
    { icon: MessageCircle, titleMn: 'Ажлын анхан шатны ярилцлага', titleEn: 'Initial Job Interview', descMn: 'Хүний нөөцийн мэргэжилтэнтэй анхан шатны ярилцлага хийх', descEn: 'First round interview with HR specialist' },
    { icon: UserCog, titleMn: 'Ур чадварын шалгалт авах', titleEn: 'Skill Assessment Test', descMn: 'Мэргэжлийн болон ур чадварын сорил шалгалт авах', descEn: 'Professional skills and competency assessment' },
    { icon: MessageCircle, titleMn: 'Сүүлийн шатны ярилцлага', titleEn: 'Final Stage Interview', descMn: 'Удирдлагын багтай сүүлийн шатны ярилцлага хийх', descEn: 'Final interview with management team' }
  ];

  const guarantees = [
    {
      icon: HeartPulse,
      titleMn: 'Эрүүл мэнд, даатгал',
      titleEn: 'Health & Insurance',
      descMn: 'Эрүүл мэндийн үзлэг, даатгал, зөвлөгөө',
      descEn: 'Health checkups, insurance, and medical consultations'
    },
    {
      icon: Shield,
      titleMn: 'Нэгдүгээрт аюулгүй ажиллагаа',
      titleEn: 'Safety First',
      descMn: 'Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн олон улсын стандартууд',
      descEn: 'International occupational safety and health standards'
    },
    {
      icon: GraduationCap,
      titleMn: 'Сургалт, карьер хөгжил',
      titleEn: 'Training & Career Development',
      descMn: 'Мэргэжлийн сургалт, хөтөлбөр, менторшип, карьер төлөвлөлт',
      descEn: 'Professional training, programs, mentorship, and career planning'
    },
    {
      icon: Dumbbell,
      titleMn: 'Ажилтны сайн сайхан байдал',
      titleEn: 'Employee Well-Being',
      descMn: 'Спорт, фитнессийн дэмжлэг, эрүүл амьдралын хэв маягийг дэмжсэн хөтөлбөрүүд',
      descEn: 'Sports and fitness support, programs promoting a healthy lifestyle'
    },
    {
      icon: Users,
      titleMn: 'Гэр бүлд ээлтэй бодлого',
      titleEn: 'Family-Friendly Policy',
      descMn: 'Ажилтнуудын хүүхдийн боловсрол, эрүүл мэндэд, хөгжилд зориулсан сургалт, дугуйлан, бүтээн байгуулалт',
      descEn: 'Education, health, development, training, clubs, and facilities for employees children'
    },
    {
      icon: Gift,
      titleMn: 'Урамшуулал, хөнгөлөлт',
      titleEn: 'Rewards & Discounts',
      descMn: 'Бүтээгдэхүүн, үйлчилгээний хөнгөлөлт, шагнал, урамшуулал, санхүүгийн дэмжлэг',
      descEn: 'Product and service discounts, awards, bonuses, and financial support'
    },
    {
      icon: Coffee,
      titleMn: 'Ажлын таатай орчин, нөхцөл',
      titleEn: 'Favorable Work Environment & Conditions',
      descMn: 'Тав тухтай орчин, амт, чанартай, эрүүл хоол хүнс, хувцас, хамгаалах хэрэгсэл',
      descEn: 'Comfortable environment, delicious nutritious food, seasonal workwear, and protective equipment'
    },
    {
      icon: Scale,
      titleMn: 'Ажил амьдралын тэнцвэр',
      titleEn: 'Work-Life Balance',
      descMn: 'Уян хатан цагийн хуваарь, зайнаас ажиллах боломж, ажил, амьдралын тэнцвэр, гэр бүлд ээлтэй бодлого',
      descEn: 'Flexible working hours, remote work opportunities, work-life balance, and family-friendly policy'
    }
  ];

  return (
    <>
      <style>{styles}</style>

      {/* TOP BANNER */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url(${careersHeroImg})`,
        backgroundPosition: 'center 18%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0f172a'
      }}>
        <div className="full-bleed-banner-overlay"></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up" style={{ textAlign: 'center', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 className="hero-title" style={{
              margin: '0 auto',
              opacity: Math.max(0, 1 - scrollY / 280),
              filter: `blur(${Math.min(12, scrollY / 22)}px)`,
              transform: `translateY(${scrollY * 0.3}px)`,
              transition: 'opacity 0.1s linear, filter 0.1s linear'
            }}>
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : (lang === 'mn' ? 'Хүний нөөц' : 'Careers')}
            </h1>
          </div>
        </div>
      </div>

      <div className="cp-wrapper" style={{ backgroundColor: '#ffffff', padding: '60px 5% 0 5%', fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* 1. HR POLICY SECTION */}
          <section id="hr-policy" style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <InteractiveTitle
                text={lang === 'mn' ? 'Хүний нөөцийн бодлого' : 'HR Policy'}
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 36px)',
                  fontWeight: '600',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Montserrat', sans-serif"
                }}
              />
            </div>

            {/* HR Policy Premium Feature Cards Block */}
            <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '20px'
              }}>
                {/* Pillar 1: Growth & Mobility */}
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    color: '#064ced',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    <GraduationCap size={32} color="#064ced" />
                  </div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '10px',
                    textAlign: 'center',
                    fontFamily: "'Montserrat', sans-serif",
                    height: '46px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    lineHeight: '1.3'
                  }}>
                    {lang === 'mn' ? 'Тогтвортой, ээлтэй ажлын байр' : 'Sustainable & Friendly Workplace'}
                  </h4>
                  <p style={{
                    fontSize: '13.5px',
                    color: '#475569',
                    lineHeight: '1.6',
                    margin: 0,
                    textAlign: 'center',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    {lang === 'mn'
                      ? 'Бүтээмжтэй, итгэлтэй, тав тухтай, тэнцвэртэй ажиллах орчин.'
                      : 'Productive, confident, comfortable, and balanced work environment.'}
                  </p>
                </div>

                {/* Pillar 2: Stable & Responsible Workforce */}
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    color: '#064ced',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    <ShieldCheck size={32} color="#064ced" />
                  </div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '10px',
                    textAlign: 'center',
                    fontFamily: "'Montserrat', sans-serif",
                    height: '46px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    lineHeight: '1.3'
                  }}>
                    {lang === 'mn' ? 'Мэргэжлийн хариуцлага – аюулгүй ажиллагаа' : 'Professional Responsibility – Safety Operations'}
                  </h4>
                  <p style={{
                    fontSize: '13.5px',
                    color: '#475569',
                    lineHeight: '1.6',
                    margin: 0,
                    textAlign: 'center',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    {lang === 'mn'
                      ? 'Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн стандартыг хэвшил болгосон мэргэжлийн, хариуцлагатай хамт олон.'
                      : 'A professional and responsible team that has normalized occupational safety and health standards.'}
                  </p>
                </div>

                {/* Pillar 3: Pride of Professional Staff */}
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    color: '#064ced',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    <Award size={32} color="#064ced" />
                  </div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '10px',
                    textAlign: 'center',
                    fontFamily: "'Montserrat', sans-serif",
                    height: '46px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    lineHeight: '1.3'
                  }}>
                    {lang === 'mn' ? 'Мэдлэг боловсрол – ур чадвар' : 'Knowledge & Skills'}
                  </h4>
                  <p style={{
                    fontSize: '13.5px',
                    color: '#475569',
                    lineHeight: '1.6',
                    margin: 0,
                    textAlign: 'center',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    {lang === 'mn'
                      ? 'Мэргэжлийн болон хувь хүний хөгжлийг дэмжсэн дотоод, гадаадын сургалт, хөгжлийн боломжууд.'
                      : 'Domestic and international training and development opportunities supporting professional and personal growth.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. GUARANTEES SECTION */}
          <section id="join-us" style={{ maxWidth: '1140px', margin: '0 auto 70px', padding: '0 20px', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
              <InteractiveTitle
                text={lang === 'mn' ? 'Нийгмийн баталгаа, хөнгөлөлт, дэмжлэг' : 'Social Guarantees, Benefits & Support'}
                className="no-underline"
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 36px)',
                  fontWeight: '600',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Montserrat', sans-serif"
                }}
              />
              <p style={{ fontSize: '15px', color: '#64748b', marginTop: '12px', maxWidth: '720px', margin: '12px auto 0 auto', fontFamily: "'Montserrat', sans-serif", lineHeight: '1.6' }}>
                {lang === 'mn'
                  ? 'Ажилтныхаа тогтвортой хөдөлмөр эрхлэлт, эрүүл мэнд, аюулгүй байдал, амьдралын чанар, сайн сайхан байдлыг нэн тэргүүнд тавьдаг.'
                  : 'Prioritizing employee sustainable employment, health, safety, quality of life, and well-being.'}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '20px'
            }}>
              {guarantees.map((g, i) => {
                const GIcon = g.icon;
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '20px',
                      padding: '30px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      boxShadow: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(37, 99, 235, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                      className="guarantee-icon-bg"
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        backgroundColor: '#eff6ff',
                        border: '1px solid #dbeafe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2563eb',
                        flexShrink: 0,
                        marginBottom: '18px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <GIcon size={24} strokeWidth={2} color="#2563eb" />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#0f172a',
                        marginBottom: '8px',
                        fontFamily: "'Montserrat', sans-serif",
                        textAlign: 'center',
                        height: '46px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        lineHeight: '1.3'
                      }}>
                        {lang === 'mn' ? g.titleMn : g.titleEn}
                      </h4>
                      <p style={{
                        fontSize: '13.5px',
                        color: '#64748b',
                        lineHeight: '1.5',
                        margin: 0,
                        textAlign: 'center',
                        fontFamily: "'Montserrat', sans-serif",
                        minHeight: '62px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                      }}>
                        {lang === 'mn' ? g.descMn : g.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. STAGES SECTION */}
          <section id="selection" style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <InteractiveTitle
                text={lang === 'mn' ? 'Сонгон шалгаруулалтын үе шат' : 'Selection Process Stages'}
                className="no-underline"
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 36px)',
                  fontWeight: '600',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Montserrat', sans-serif"
                }}
              />
            </div>
            <div className="proc-steps-grid">
              {hrStages.map((stage, idx) => {
                const SIcon = stage.icon;
                return (
                  <div
                    key={idx}
                    className="proc-step-card"
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: '24px',
                      padding: '36px 24px',
                      border: '1px solid #cbd5e1',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      boxShadow: 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.boxShadow = 'none';
                      const title = e.currentTarget.querySelector('h4');
                      if (title) title.style.color = '#2563eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                      e.currentTarget.style.boxShadow = 'none';
                      const title = e.currentTarget.querySelector('h4');
                      if (title) title.style.color = '#0f172a';
                    }}
                  >
                    <div style={{
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}>
                      <SIcon size={28} color="#2563eb" />
                    </div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '10px',
                      transition: 'color 0.3s ease',
                      fontFamily: "'Montserrat', sans-serif"
                    }}>
                      {lang === 'mn' ? stage.titleMn : stage.titleEn}
                    </h4>
                    <p style={{
                      fontSize: '13px',
                      color: '#64748b',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {lang === 'mn' ? stage.descMn : stage.descEn}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Job Applicant Application Form CTA Card under 5 stages (No Border / Clean Slate) */}
            <div style={{
              backgroundColor: 'transparent',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 36px) clamp(16px, 4vw, 36px) 24px clamp(16px, 4vw, 36px)',
              border: 'none',
              textAlign: 'center',
              maxWidth: '1200px',
              margin: '40px auto 0 auto',
              transition: 'all 0.3s ease',
              boxShadow: 'none',
              boxSizing: 'border-box',
              fontFamily: "'Montserrat', sans-serif"
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a', marginBottom: '12px' }}>
                {lang === 'mn' ? 'Ажил горилогчийн анкет' : 'Candidate Application Form'}
              </h3>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', marginBottom: '28px', maxWidth: '920px', margin: '0 auto 28px auto' }}>
                {lang === 'mn'
                  ? 'Монполимет Группийн нээлттэй ажлын байранд хүсэлт илгээж, ажилд орох анкетыг онлайнаар бөглөнө\u00A0үү. Анкетын мэдээлэл mpm-hr@monpolymet.mn хаяг руу шууд илгээгдэнэ.'
                  : 'Submit your application and fill out the online candidate form for open vacancies at Monpolymet Group. Application details are sent directly to mpm-hr@monpolymet.mn.'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <a
                  href="http://dbserver4.smartlogic.mn:9519/jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    height: '56px',
                    padding: '0 28px',
                    borderRadius: '16px',
                    background: 'linear-gradient(180deg, #010D56 0%, #001CE8 100%)',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '15px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.25s ease',
                    fontFamily: "'Montserrat', sans-serif",
                    boxShadow: '0 8px 24px rgba(1, 11, 64, 0.25)',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 28, 232, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(1, 11, 64, 0.25)';
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <UserCheck size={20} color="#ffffff" />
                  </div>
                  <span>{lang === 'mn' ? 'Ажил горилогчийн анкет бөглөх' : 'Fill Candidate Application Form'}</span>
                  <ArrowUpRight size={18} style={{ flexShrink: 0 }} />
                </a>

                <a
                  href="https://www.zangia.mn/company/monpolymetgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    height: '56px',
                    padding: '0 28px',
                    borderRadius: '16px',
                    background: 'linear-gradient(180deg, #010D56 0%, #001CE8 100%)',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '15px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.25s ease',
                    fontFamily: "'Montserrat', sans-serif",
                    boxShadow: '0 8px 24px rgba(1, 11, 64, 0.25)',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 28, 232, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(1, 11, 64, 0.25)';
                  }}
                >
                  <img src={zangiaLogo} alt="Zangia Logo" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '8px', flexShrink: 0 }} />
                  <span>{lang === 'mn' ? 'Нээлттэй ажлын байрыг харах' : 'View Open Vacancies'}</span>
                  <ArrowUpRight size={18} style={{ flexShrink: 0 }} />
                </a>
              </div>
            </div>

            {/* HR Contact Notice outside Card (Identical to ProcurementPage) */}
            <div style={{ margin: '36px 0 36px 0', textAlign: 'center' }}>
              <p style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#475569',
                opacity: 0.8,
                margin: 0,
                display: 'inline-block',
                letterSpacing: '-0.2px',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                {lang === 'mn'
                  ? 'Хүний нөөцтэй холбоотой дэлгэрэнгүй мэдээлэл авах утас, мэйл: 75855858 /1007/, mpm-hr@monpolymet.mn'
                  : 'For detailed HR inquiries, phone & email: 75855858 /1007/, mpm-hr@monpolymet.mn'}
              </p>
            </div>
          </section>






        </div>
      </div>

      {/* MODAL FOR APPLICATION */}
      {isModalOpen && (
        <div className="cp-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false) }}>
          <div className="cp-modal-content" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <button className="cp-modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={22} />
            </button>

            <h3 className="cp-modal-title" style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '4px', fontFamily: "'Montserrat', sans-serif" }}>
              {lang === 'mn' ? 'Ажил горилогчийн анкет бөглөх' : 'Candidate Application Form'}
            </h3>
            <p style={{ fontSize: '13px', color: '#16a34a', fontWeight: '600', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} />
              <span>{lang === 'mn' ? 'Мэдээлэл mpm-hr@monpolymet.mn хаяг руу шууд илгээгдэнэ.' : 'Information is sent directly to mpm-hr@monpolymet.mn'}</span>
            </p>

            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle size={56} style={{ margin: '0 auto 16px', color: '#10b981' }} />
                <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  {lang === 'mn' ? 'Анкет амжилттай илгээгдлээ!' : 'Application Submitted Successfully!'}
                </h4>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                  {lang === 'mn'
                    ? 'Манай хүний нөөцийн мэргэжилтэн таны анкеттай танилцаж тун удахгүй холбогдох болно.'
                    : 'Our HR team will review your candidate form and get back to you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 1. Овог, нэр */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'mn' ? 'Овог, нэр *' : 'Full Name *'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                {/* 2. Холбоо барих утас & Имэйл */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'mn' ? 'Холбоо барих утасны дугаар *' : 'Contact Phone Number *'}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}
                  />
                  <input
                    type="email"
                    placeholder={lang === 'mn' ? 'Имэйл хаяг' : 'Email Address'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                {/* 3. Сонирхож буй албан тушаал & Өмнөх байгууллага */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'mn' ? 'Та ямар албан тушаалд ажиллах сонирхолтой вэ? *' : 'Desired Position *'}
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}
                  />
                  <input
                    type="text"
                    placeholder={lang === 'mn' ? 'Та өмнө нь ямар байгууллагад ажиллаж байсан бэ?' : 'Previous Work Experience'}
                    value={formData.previousCompany}
                    onChange={(e) => setFormData({ ...formData, previousCompany: e.target.value })}
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                {/* 4. Мэргэжил & Хүсч буй цалин */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <input
                    type="text"
                    placeholder={lang === 'mn' ? 'Таны мэргэжил' : 'Profession / Field of Study'}
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}
                  />
                  <input
                    type="text"
                    placeholder={lang === 'mn' ? 'Хүсч буй цалин (жишээ: 2,500,000₮)' : 'Expected Salary'}
                    value={formData.expectedSalary}
                    onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                {/* 5. Ажилд орох боломжтой огноо */}
                <input
                  type="text"
                  placeholder={lang === 'mn' ? 'Ажилд орох боломжтой огноо (жишээ: Шууд / 2026.08.01)' : 'Available Start Date'}
                  value={formData.availableDate}
                  onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}
                />

                {/* 5. File Attachment */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f8fafc'
                  }}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={(e) => setCvFile(e.target.files[0] || null)}
                      style={{ fontSize: '13px', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    {lang === 'mn'
                      ? 'Та өөрийн дэлгэрэнгүй анкет эсвэл CV-гээ хавсаргана уу / Материалын хэмжээ 10MB -с хэтрэхгүй байх'
                      : 'Attach detailed candidate form or CV / Max file size 10MB'}
                  </span>
                </div>

                {/* 6. Өөрийгөө товчхон танилцуулна уу */}
                <textarea
                  rows="3"
                  placeholder={lang === 'mn' ? 'Өөрийгөө товчхон танилцуулна уу / чөлөөт текст, 2-3 өгүүлбэр /' : 'Brief introduction / 2-3 sentences'}
                  value={formData.introMessage}
                  onChange={(e) => setFormData({ ...formData, introMessage: e.target.value })}
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}
                ></textarea>



                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    marginTop: '8px',
                    padding: '14px',
                    background: submitting ? '#94a3b8' : 'linear-gradient(90deg, #010B40 0%, #001CE8 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '15px',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontFamily: "'Montserrat', sans-serif",
                    boxShadow: submitting ? 'none' : '0 8px 20px rgba(0, 28, 232, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {submitting
                    ? (lang === 'mn' ? 'Илгээж байна...' : 'Submitting...')
                    : (lang === 'mn' ? 'Анкет илгээх' : 'Submit Application')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
