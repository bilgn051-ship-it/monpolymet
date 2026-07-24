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
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
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
        <section id="hr-policy" style={{ margin: '0 5% 60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '12px',
              letterSpacing: '-0.5px',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              {lang === 'mn' ? 'Хүний нөөцийн бодлого' : 'HR Policy'}
            </h2>
          </div>
          <div className="hr-policy-container" style={{ margin: 0 }}>
            <div className="hr-policy-left">
              <p>
                {lang === 'mn'
                  ? 'Бид хүний нөөцийн бодлогын хүрээнд дотоод ажилчдаа бүхийл салбартаа хөрвөн ажиллах боломжийг бүрдүүлэн гадаад дотоодын сургалт хөгжлөөр хангаж урамшуулан, тогтвортой хариуцлагатай, үлгэр жишээ ажиллах хүчнийг бэлтгэн эх орны бүтээн байгуулалтад үнэтэй хувь нэмэр оруулах найдвартай тогтвортой ажлын байрыг бий болгох зорилготойгоор салбар бүртээ шаргуу ажиллаж байна. Уул уурхай, үйлдвэрлэл, нөхөн сэргээлт, байгаль орчин, барилга, худалдаа үйлчилгээ, хоол үйлдвэрлэлийн салбаруудад тогтвортой ажиллах мэргэжлийн, мэргэшсэн, үлгэр жишээ ажилтнууд бол манай байгууллагын бахархал юм.'
                  : 'Within the scope of our HR policy, we work diligently in every sector to create opportunities for internal employees to work across all sectors, provide them with foreign and domestic training and development, encourage them, prepare a stable, responsible, and exemplary workforce, and create reliable and stable jobs that make a valuable contribution to national development. Professional, specialized, and exemplary employees who work sustainably in the mining, manufacturing, land rehabilitation, environmental, construction, trade, services, and catering sectors are the pride of our organization.'}
              </p>
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
          </div>
        </section>

        {/* STAGES SECTION */}
        <section id="selection" className="stages-container">
          <div className="stages-title-box" style={{ marginBottom: '40px' }}>
            <h2 className="stages-title">
              {lang === 'mn' ? 'Сонгон шалгаруулалт' : 'Selection Process'}
            </h2>
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

        {/* GUARANTEES SECTION */}
        <section id="join-us" className="join-guarantees-container" style={{ margin: '0 5% 40px' }}>
          <div className="guarantees-box" style={{ flex: 1, width: '100%' }}>
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

        {/* JOIN US SLIM HORIZONTAL BANNER CARD */}
        <section className="stats-banner" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, #010B40 0%, #001CE8 100%)',
          borderRadius: '20px',
          margin: '0 5% 40px',
          padding: '28px 44px',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(1, 11, 64, 0.18)',
          gap: '32px',
          minHeight: 'auto'
        }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '6px', color: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}>
              {lang === 'mn' ? 'Бидэнтэй нэгдэх' : 'Join Us'}
            </h2>
            <p style={{ fontSize: '13.5px', color: '#e2e8f0', marginBottom: '16px', maxWidth: '650px', lineHeight: '1.5' }}>
              {lang === 'mn'
                ? 'Өөрийн мэдээллээ илгээж, манай ирээдүйн хамт олны нэг болоорой.'
                : 'Submit your information and become part of our future team.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
              {[
                lang === 'mn' ? 'Анкет илгээх' : 'Submit Application',
                lang === 'mn' ? 'CV файл хавсаргах' : 'Attach CV File',
                lang === 'mn' ? 'Мэдээллээ илгээх' : 'Send Information',
                lang === 'mn' ? 'HR багтай холбогдоно' : 'Connect with HR Team'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500', color: '#ffffff' }}>
                  <Check size={16} color="#10b981" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flexShrink: 0 }}>
            <button
              className="btn-solid"
              style={{
                background: '#ffffff',
                color: '#010B40',
                fontWeight: '700',
                padding: '13px 28px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onClick={() => openApplyModal()}
            >
              {lang === 'mn' ? 'Анкет илгээх' : 'Apply Now'} <ArrowRight size={16} />
            </button>
          </div>
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
