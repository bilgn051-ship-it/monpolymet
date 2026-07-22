import React, { useState, useEffect } from 'react';
import {
  Users, BookOpen, ShieldCheck, Sprout, Award, UserPlus,
  FileText, FileSearch, PhoneCall, ClipboardList, MessageCircle, Handshake,
  HeartPulse, Gift, Coffee, GraduationCap, Shield, Dumbbell, Scale, Shirt,
  Check, Building2, Briefcase, HardHat, FlaskConical, ArrowRight, MapPin,
  X, CheckCircle, Calendar, ClipboardEdit, UserCog
} from 'lucide-react';
import { fetchStatCards, fetchCareersContent } from '../../api';
import DynamicIcon from '../../components/ui/DynamicIcon';

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
  min-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hr-policy-left h2 {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}
.hr-policy-left p {
  color: #475569;
  line-height: 1.8;
  margin-bottom: 40px;
  font-size: 16px;
}
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  color: #0f172a;
  font-weight: 700;
  font-size: 14px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  align-self: flex-start;
}
.btn-outline:hover {
  border-color: #2563eb;
  color: #2563eb;
  background: #eff6ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37,99,235,0.1);
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
  box-shadow: 0 15px 30px rgba(37, 99, 235, 0.08);
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
}
.policy-card:nth-child(1) .policy-icon-wrapper { background: #eff6ff; color: #2563eb; }
.policy-card:nth-child(2) .policy-icon-wrapper { background: #f0fdf4; color: #16a34a; }
.policy-card:nth-child(3) .policy-icon-wrapper { background: #fef2f2; color: #dc2626; }
.policy-card:nth-child(4) .policy-icon-wrapper { background: #fefce8; color: #ca8a04; }
.policy-card:nth-child(5) .policy-icon-wrapper { background: #f5f3ff; color: #7c3aed; }
.policy-card:nth-child(6) .policy-icon-wrapper { background: #fdf4ff; color: #c026d3; }

.policy-text-content h4 {
  font-size: 16px;
  font-weight: 800;
  margin: 0 0 8px 0;
  color: #0f172a;
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
  margin-bottom: 60px;
}
.stages-title {
  font-size: 28px;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  margin: 0 0 16px 0;
  letter-spacing: 0.5px;
}
.stages-title span {
  color: #0284c7;
}
.stages-divider {
  width: 100%;
  min-width: 400px;
  height: 3px;
  background: linear-gradient(90deg, #0284c7 0%, #84cc16 100%);
  border-radius: 2px;
}
.stages-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
}
.stage-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 40px 20px;
  flex: 1;
  min-width: 180px;
  max-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}
.stage-card:hover {
  transform: translateY(-5px);
  background: #f1f5f9;
}
.stage-icon-box {
  margin-bottom: 24px;
  color: #0284c7;
}
.stage-card h4 {
  font-size: 13px;
  font-weight: 800;
  color: #0f172a;
  text-transform: uppercase;
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
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}
.guarantees-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.guarantee-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.guarantee-card h4 {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  line-height: 1.4;
}

/* STATS BANNER */
.stats-banner {
  display: flex;
  background: #25418b;
  border-radius: 16px;
  margin: 0 5% 40px;
  color: white;
  overflow: hidden;
  position: relative;
  min-height: 180px;
}
.stats-left {
  flex: 6;
  padding: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  z-index: 2;
}
.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
}
.stat-icon { color: white; opacity: 1; }
.stat-info { display: flex; flex-direction: column; }
.stat-value { font-size: 26px; font-weight: 800; margin-bottom: 4px; line-height: 1; }
.stat-label { font-size: 13px; opacity: 0.7; font-weight: 500; }

.stats-right {
  flex: 4;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  z-index: 2;
}
.stats-right-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: right center;
  z-index: -1;
  opacity: 0.6;
  -webkit-mask-image: linear-gradient(to right, transparent, black 35%);
  mask-image: linear-gradient(to right, transparent, black 35%);
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
  border-radius: 16px;
  width: 100%;
  max-width: 550px;
  padding: 32px;
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

/* RESPONSIVE */
@media (max-width: 1200px) {
  .hr-policy-right { grid-template-columns: repeat(2, 1fr); }
  .stages-grid { gap: 12px; }
  .stage-card { min-width: 140px; padding: 24px 16px; }
  .guarantees-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 900px) {
  .hr-policy-container { flex-direction: column; padding: 32px; }
  .join-guarantees-container { flex-direction: column; }
  .stats-banner { flex-direction: column; }
  .quote-box { flex-direction: column; }
  .quote-image { min-height: 250px; }
  .guarantees-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-left { flex-direction: column; align-items: flex-start; gap: 24px; }
}
@media (max-width: 600px) {
  .hr-policy-right { grid-template-columns: 1fr; }
  .stage-card { min-width: 100%; }
  .guarantees-grid { grid-template-columns: 1fr; }
  .stages-divider { min-width: 200px; }
}
`;



export default function CareersPage({ lang, t, onApply, pageMetadata }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', position: '', message: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [statCards, setStatCards] = useState([]);
  const [bannerContent, setBannerContent] = useState(null);

  useEffect(() => {
    fetchStatCards().then(data => {
      if (data && data.length) setStatCards(data);
    });
    fetchCareersContent().then(data => {
      if (data) setBannerContent(data);
    });
  }, []);

  const displayCards = statCards && statCards.length > 0
    ? [...statCards].sort((a, b) => a.order - b.order).slice(0, 4)
    : [];


  const openApplyModal = (positionName = '') => {
    setFormData(prev => ({ ...prev, position: positionName }));
    setIsModalOpen(true);
    setFormSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.position) {
      alert(lang === 'mn' ? 'Шаардлагатай талбаруудыг бөглөнө үү.' : 'Please fill in required fields.');
      return;
    }
    if (onApply) {
      onApply({
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        position: formData.position,
        message: formData.message,
        date: new Date().toISOString().split('T')[0]
      });
    }
    setFormSuccess(true);
    setFormData({ name: '', phone: '', email: '', position: '', message: '' });
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSuccess(false);
    }, 2000);
  };

  const hrPolicies = [
    { icon: Users, titleMn: 'Хүнийг дээдлэх', titleEn: 'Respect People', descMn: 'Ажилтнуудынхаа эрх ашгийг хүндэтгэж, үнэлдэг.', descEn: "We respect and value our employees' interests." },
    { icon: BookOpen, titleMn: 'Хөгжлийг дэмжих', titleEn: 'Support Development', descMn: 'Мэргэжлийн болон манлайллын хөгжлийг тасралтгүй дэмжинэ.', descEn: 'Continuous support for professional and leadership development.' },
    { icon: ShieldCheck, titleMn: 'Шударга ёс', titleEn: 'Fairness', descMn: 'Шударга, ил тод, үнэт зүйлд тулгуурлаж ажиллана.', descEn: 'We work based on fair, transparent values.' },
    { icon: Sprout, titleMn: 'Тогтвортой байдал', titleEn: 'Sustainability', descMn: 'Ногоон хөгжлийг дэмжиж, хариуцлагатай ажиллана.', descEn: 'Supporting green development and acting responsibly.' },
    { icon: UserPlus, titleMn: 'Багийн хүч', titleEn: 'Team Strength', descMn: 'Баг хамт олон, харилцан итгэлцэлд суурилна.', descEn: 'Based on teamwork and mutual trust.' },
    { icon: Award, titleMn: 'Гүйцэтгэлд суурилна', titleEn: 'Performance Based', descMn: 'Ажилтны гүйцэтгэлийг үнэлж, урамшуулдаг.', descEn: 'We evaluate and reward employee performance.' }
  ];

  const hrStages = [
    { icon: ClipboardEdit, titleMn: 'Ажлын анкет бөглөж илгээх', titleEn: 'Submit Job Application' },
    { icon: Users, titleMn: 'Анкетийн сонгон шалгаруулалт', titleEn: 'Application Screening' },
    { icon: MessageCircle, titleMn: 'Ажлын анхан шатны ярилцлага', titleEn: 'Initial Job Interview' },
    { icon: UserCog, titleMn: 'Ур чадварын шалгалт авах', titleEn: 'Skill Assessment Test' },
    { icon: MessageCircle, titleMn: 'Сүүлийн шатны ярилцлага', titleEn: 'Final Stage Interview' }
  ];

  const guarantees = [
    { icon: HeartPulse, titleMn: 'Эрүүл мэндийн даатгал', titleEn: 'Health Insurance' },
    { icon: Gift, titleMn: 'Нэмэлт тэтгэмж, урамшуулал', titleEn: 'Bonuses & Benefits' },
    { icon: Coffee, titleMn: 'Хоолны хөнгөлөлт', titleEn: 'Food Allowance' },
    { icon: GraduationCap, titleMn: 'Сургалт, хөгжлийн боломж', titleEn: 'Training Opportunities' },
    { icon: Shield, titleMn: 'Аюулгүй ажлын орчин', titleEn: 'Safe Environment' },
    { icon: Dumbbell, titleMn: 'Спорт, амралтын хөтөлбөр', titleEn: 'Sports & Recreation' },
    { icon: Scale, titleMn: 'Ажил-Амьдралын тэнцвэр', titleEn: 'Work-Life Balance' },
    { icon: Shirt, titleMn: 'Хувцас, хамгаалах хэрэгсэл', titleEn: 'PPE' }
  ];

  return (
    <>
      <style>{styles}</style>

      {/* TOP BANNER */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url('https://en.monpolymet.mn/wp-content/uploads/2022/05/IMG_1235-s-scaled.jpg')`,
        backgroundColor: '#0f172a'
      }}>
        <div className="full-bleed-banner-overlay"></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up">
            <h1 className="hero-title">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.titleMn : pageMetadata.header.titleEn) : (lang === 'mn' ? 'Хүний нөөц' : 'Careers')}
            </h1>
            <p className="hero-subtitle">
              {pageMetadata?.header ? (lang === 'mn' ? pageMetadata.header.subtitleMn : pageMetadata.header.subtitleEn) : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="cp-wrapper">
        <div style={{ height: '40px' }}></div>

        {/* HR POLICY SECTION */}
        <section id="hr-policy" className="hr-policy-container">
          <div className="hr-policy-left">
            <h2>{lang === 'mn' ? 'Хүний нөөцийн бодлого' : 'HR Policy'}</h2>
            <p>
              {lang === 'mn'
                ? 'Бид хүний нөөцийг байгууллагын хамгийн үнэ цэнтэй капитал гэж үздэг. Тиймээс ажилтнуудынхаа чадвар, хөгжлийг дэмжиж, аюулгүй ажлын орчинд ажиллах нөхцөлийг ханган ажилладаг.'
                : 'We consider human resources to be the most valuable capital of our organization. Therefore, we support our employees\' skills and development, and ensure a safe working environment.'}
            </p>
            <button className="btn-outline">
              {lang === 'mn' ? 'Дэлгэрэнгүй' : 'Read More'} <ArrowRight size={16} />
            </button>
          </div>
          <div className="hr-policy-right">
            {hrPolicies.map((policy, idx) => {
              const PIcon = policy.icon;
              return (
                <div key={idx} className="policy-card">
                  <div className="policy-icon-wrapper">
                    <PIcon size={24} strokeWidth={2} />
                  </div>
                  <div className="policy-text-content">
                    <h4>{lang === 'mn' ? policy.titleMn : policy.titleEn}</h4>
                    <p>{lang === 'mn' ? policy.descMn : policy.descEn}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* STAGES SECTION */}
        <section id="selection" className="stages-container">
          <div className="stages-title-box">
            <h2 className="stages-title">
              {lang === 'mn' ? (
                <>СОНГОН <span>ШАЛГАРУУЛАЛТ</span></>
              ) : (
                <>SELECTION <span>PROCESS</span></>
              )}
            </h2>
            <div className="stages-divider"></div>
          </div>
          <div className="stages-grid">
            {hrStages.map((stage, idx) => {
              const SIcon = stage.icon;
              return (
                <div key={idx} className="stage-card">
                  <div className="stage-icon-box">
                    <SIcon size={40} strokeWidth={1.5} />
                  </div>
                  <h4>{lang === 'mn' ? stage.titleMn : stage.titleEn}</h4>
                </div>
              );
            })}
          </div>
        </section>

        {/* JOIN & GUARANTEES */}
        <section id="join-us" className="join-guarantees-container">
          <div className="join-box">
            <div className="join-illustration"></div>
            <div className="join-content">
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>
                {lang === 'mn' ? 'Бидэнтэй нэгдэх' : 'Join Us'}
              </h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '32px', maxWidth: '80%', lineHeight: '1.6' }}>
                {lang === 'mn'
                  ? 'Өөрийн мэдээллээ илгээж, манай ирээдүйн хамт олны нэг болоорой.'
                  : 'Submit your information and become part of our future team.'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
                {[
                  lang === 'mn' ? 'Анкет илгээх' : 'Submit Application',
                  lang === 'mn' ? 'CV файл хавсаргах' : 'Attach CV File',
                  lang === 'mn' ? 'Мэдээллээ илгээх' : 'Send Information',
                  lang === 'mn' ? 'HR багтай холбогдоно' : 'Connect with HR Team'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '500' }}>
                    <Check size={18} color="#10b981" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button className="btn-solid" onClick={() => openApplyModal()}>
                {lang === 'mn' ? 'Анкет илгээх' : 'Apply Now'} <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="guarantees-box">
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '32px' }}>
              {lang === 'mn' ? 'Нийгмийн баталгаа' : 'Social Guarantees'}
            </h2>
            <div className="guarantees-grid">
              {guarantees.map((g, i) => {
                const GIcon = g.icon;
                return (
                  <div key={i} className="guarantee-card">
                    <div className="guarantee-icon">
                      <GIcon size={24} strokeWidth={1.5} />
                    </div>
                    <h4>{lang === 'mn' ? g.titleMn : g.titleEn}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* STATS BANNER */}
        <section className="stats-banner">
          <div className="stats-left">
            {displayCards.length > 0 ? (
              displayCards.map((card, idx) => (
                <div key={idx} className="stat-item">
                  <DynamicIcon name={card.icon || 'Star'} size={32} strokeWidth={1.5} className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-value">{card.statValue}</span>
                    <span className="stat-label">{lang === 'mn' ? card.titleMn : card.titleEn}</span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="stat-item">
                  <Users size={32} strokeWidth={1.5} className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-value">3500+</span>
                    <span className="stat-label">{lang === 'mn' ? 'Ажилтны тоо' : 'Employees'}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <Building2 size={32} strokeWidth={1.5} className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-value">16</span>
                    <span className="stat-label">{lang === 'mn' ? 'Охин компани' : 'Subsidiaries'}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <MapPin size={32} strokeWidth={1.5} className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-value">4+</span>
                    <span className="stat-label">{lang === 'mn' ? 'Газарзүйн байршил' : 'Locations'}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <Calendar size={32} strokeWidth={1.5} className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-value">25+</span>
                    <span className="stat-label">{lang === 'mn' ? 'Жилийн туршлагатай' : 'Years of Exp'}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="stats-right">
            <div
              className="stats-right-bg"
              style={{ backgroundImage: `url(${bannerContent?.bannerImage || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'})` }}
            />
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.4', color: '#0ea5e9' }}>
              {bannerContent ? (lang === 'mn' ? bannerContent.bannerTitle?.mn : bannerContent.bannerTitle?.en) : (lang === 'mn' ? 'Ирээдүйг бүтээх аялалд хамтдаа нэгдэцгээе.' : 'Let us build the future together.')}
            </h3>
            <button className="btn-solid" style={{ alignSelf: 'flex-start', background: 'white', color: '#0f172a' }} onClick={() => openApplyModal()}>
              {bannerContent ? (lang === 'mn' ? bannerContent.bannerButtonText?.mn : bannerContent.bannerButtonText?.en) : (lang === 'mn' ? 'Анкет илгээх' : 'Apply Now')}
            </button>
          </div>
        </section>

        {/* QUOTE BOX */}
        <section className="quote-box">
          <div className="quote-left">
            <span style={{ fontSize: '100px', color: '#2563eb', lineHeight: '0.6', fontFamily: 'serif', marginTop: '10px' }}>❝</span>
            <p className="quote-text">
              {lang === 'mn'
                ? 'Монполимет Групп нь ажилтнуудынхаа хөгжлийг дэмжиж, аюулгүй, урам зоригтой, үнэ цэнтэй ажлын орчинг бүрдүүлэхэд үргэлж анхаардаг.'
                : 'Monpolymet Group always focuses on supporting employee development and creating a safe, inspiring, and valuable work environment.'}
            </p>
          </div>
          <div className="quote-image"></div>
        </section>
      </div>

      {/* MODAL FOR APPLICATION */}
      {isModalOpen && (
        <div className="cp-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false) }}>
          <div className="cp-modal-content">
            <button className="cp-modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>

            <h3 className="cp-modal-title">{t?.careers?.applyForm?.title || 'Apply Now'}</h3>

            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle size={48} style={{ margin: '0 auto 16px', color: '#10b981' }} />
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>{t?.careers?.applyForm?.success || 'Success!'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>{t?.careers?.applyForm?.name || 'Name'} *</label>
                  <input
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>{t?.careers?.applyForm?.phone || 'Phone'} *</label>
                    <input
                      type="text" required value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>{t?.careers?.applyForm?.email || 'Email'}</label>
                    <input
                      type="email" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>{t?.careers?.applyForm?.position || 'Position'} *</label>
                  <input
                    type="text" required value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>{t?.careers?.applyForm?.message || 'Message'}</label>
                  <textarea
                    rows="3" value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  style={{
                    marginTop: '8px', padding: '12px', background: '#2563eb', color: 'white',
                    border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer'
                  }}
                >
                  {t?.careers?.applyForm?.submit || 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
