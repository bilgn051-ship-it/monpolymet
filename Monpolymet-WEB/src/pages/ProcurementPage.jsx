import { useState, useEffect, useRef } from 'react';
import {
  Building2, ShieldCheck, Cpu, Truck, FileText, Download, CheckCircle2,
  ArrowUpRight, PackageCheck, Zap, Factory, Award, UserCheck, X, Send,
  Search, Mail, FileCheck, Paperclip, Trash2, AlertCircle, ChevronLeft, ChevronRight,
  ClipboardList, SearchCheck, Handshake, ShoppingCart, BadgeCheck, Upload
} from 'lucide-react';
import { submitSupplierRegistration, fetchTenders } from '../api';
import '../styles/procurement-pro.css';

import partner1 from '../assets/partners/partner-1.jpg';
import partner2 from '../assets/partners/partner-2.jpg';
import partner3 from '../assets/partners/partner-3.jpg';
import partner4 from '../assets/partners/partner-4.jpg';
import partner5 from '../assets/partners/partner-5.jpg';
import partner6 from '../assets/partners/partner-6.jpg';
import partner7 from '../assets/partners/partner-7.jpg';
import partner8 from '../assets/partners/partner-8.jpg';
import partner9 from '../assets/partners/partner-9.jpg';
import partner10 from '../assets/partners/partner-10.jpg';
import partner11 from '../assets/partners/partner-11.jpg';
import partner12 from '../assets/partners/partner-12.jpg';
import partner13 from '../assets/partners/partner-13.jpg';
import partner14 from '../assets/partners/partner-14.jpg';
import partner15 from '../assets/partners/partner-15.jpg';
import partner16 from '../assets/partners/partner-16.jpg';
import partner17 from '../assets/partners/partner-17.jpg';
import tenderhubLogo from '../assets/tenderhub-logo.png';
import tenderhubBg from '../assets/tenderhub-bg.png';

const row1Logos = [partner1, partner10, partner3, partner12, partner5, partner14, partner7, partner16, partner9];
const row2Logos = [partner2, partner11, partner4, partner13, partner6, partner15, partner8, partner17];

export default function ProcurementPage({ lang = 'mn', t, procurementContent, pageMetadata }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [tenderIndex, setTenderIndex] = useState(0);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [liveTenders, setLiveTenders] = useState([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    fetchTenders()
      .then((data) => setLiveTenders(data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Tender Participation Modal State
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedTenderForApply, setSelectedTenderForApply] = useState(null);
  const [applyFormSubmitted, setApplyFormSubmitted] = useState(false);
  const [applyFile, setApplyFile] = useState(null);
  const [applyFileError, setApplyFileError] = useState('');
  const [applyFormData, setApplyFormData] = useState({
    priceOffer: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const handleApplyFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 50MB limit per user directive
    const maxSizeBytes = 50 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setApplyFileError(lang === 'mn'
        ? 'Файлын хэмжээ хэтэрсэн байна (Хамгийн ихдээ 50MB).'
        : 'File size exceeds limit (Max 50MB).');
      return;
    }

    setApplyFileError('');
    setApplyFile(file);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyFile) {
      setApplyFileError(lang === 'mn'
        ? 'Шаардлагатай хавсралт файлаа сонгоно уу.'
        : 'Please attach the required document file.');
      return;
    }
    setApplyFormSubmitted(true);
  };

  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stagesOpacity = Math.min(1, Math.max(0, scrollPos / 220));

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    regNumber: '',
    category: 'Уул уурхай & Сэлбэг',
    email: '',
    phone: '',
    website: '',
    description: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 50MB in bytes = 50 * 1024 * 1024 = 52428800
    const maxSizeBytes = 50 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setFileError(lang === 'mn'
        ? 'Сонгосон файлын хэмжээ 50MB-аас их байна. Та 50MB-аас бага хэмжээтэй файл сонгоно уу.'
        : 'Selected file exceeds 50MB limit. Please attach a file under 50MB.');
      e.target.value = null;
      setAttachedFile(null);
      return;
    }

    setFileError('');
    setAttachedFile(file);
  };

  const categories = [
    {
      icon: <Factory size={28} />,
      titleMn: 'Уул Уурхай & Хүнд Машин Механизм',
      titleEn: 'Mining & Heavy Machinery Parts',
      descMn: 'Экскаватор, автосамосвал, бутлуур, тээрмийн сэлбэг хэрэгсэл, тос тосолгооны материал.',
      descEn: 'Excavator, dump truck, crusher, mill spare parts, lubricants and hydraulic fluids.',
      items: ['CAT, Komatsu сэлбэг', 'Тээрмийн хуяг, ган бөмбөлөг', 'Тос тосолгооны гидравлик шингэн']
    },
    {
      icon: <PackageCheck size={28} />,
      titleMn: 'Барилгын Түүхий Эд & Химийн Бодис',
      titleEn: 'Construction Raw Materials & Chemicals',
      descMn: 'Монцемент болон бусад үйлдвэрт шаардлагатай гөлтгөнө, нүүрс, нэмэлт бодис, шуудай.',
      descEn: 'Gypsum, coal, cement additives, grinding aids, and packaging bags for factories.',
      items: ['Гөлтгөнө ба өндөр маркийн нүүрс', 'Үйлдвэрлэлийн цементийн шуудай', 'Гүүр, далангийн нэмэлт бодис']
    },
    {
      icon: <Zap size={28} />,
      titleMn: 'Эрчим Хүч & Автоматик Систем',
      titleEn: 'Energy, Electrical & Automation Systems',
      descMn: 'Өндөр хүчдлийн трансформатор, дэд станцын тоног төхөөрөмж, Siemens/ABB автоматик.',
      descEn: 'High voltage transformers, substation equipment, Siemens/ABB PLC automation parts.',
      items: ['Өндөр ба нам хүчдлийн кабель', 'Siemens/ABB PLC системүүд', 'Дэд станцын хэмжүүрүүд']
    },
    {
      icon: <Truck size={28} />,
      titleMn: 'Тээвэр, Логистик & Шатахуун',
      titleEn: 'Logistics, Heavy Transport & Fuel',
      descMn: 'Улаанбаатар болон орон нутгийн төмөр зам, авто тээврийн бөөний логистик.',
      descEn: 'Railroad freight, heavy auto transport, bulk diesel fuel logistics across Mongolia.',
      items: ['Төмөр замын ачаа тээвэр', 'Хүнд даацын авто логистик', 'Евро-5 дизель түлшний нийлүүлэлт']
    }
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (fileError) return;

    try {
      await submitSupplierRegistration(formData, attachedFile);
    } catch (err) {
      console.warn('Supplier registration submit notice:', err);
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowRegisterModal(false);
      setAttachedFile(null);
      setFileError('');
      setFormData({ companyName: '', regNumber: '', category: 'Уул уурхай & Сэлбэг', email: '', phone: '', website: '', description: '' });
    }, 2500);
  };

  return (
    <>
      {/* 1. Full Bleed Hero Banner */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80')`,
        backgroundColor: '#0f172a'
      }}>
        <div className="full-bleed-banner-overlay"></div>
        <div className="full-bleed-banner-container">
          <div className="full-bleed-banner-content animate-slide-up" style={{ textAlign: 'center', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 className="hero-title" style={{
              marginBottom: '0',
              opacity: Math.max(0, 1 - scrollPos / 280),
              filter: `blur(${Math.min(12, scrollPos / 22)}px)`,
              transform: `translateY(${scrollPos * 0.3}px)`,
              transition: 'opacity 0.1s linear, filter 0.1s linear'
            }}>
              {lang === 'mn' ? 'Худалдан авалт' : 'Procurement'}
            </h1>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '60px 5% 0 5%', fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* 1. Худалдан авалтын үе шат (Procurement Process) */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 className="no-underline" style={{
                fontSize: 'clamp(24px, 4vw, 48px)',
                fontWeight: '600',
                color: scrollPos > 120 ? '#0f172a' : '#e2e8f0',
                letterSpacing: '-0.5px',
                transition: 'color 0.4s ease'
              }}>
                {lang === 'mn' ? 'Худалдан авалтын үе шат' : 'Procurement Stages'}
              </h2>
            </div>

            <div className="proc-steps-grid">
              {[
                { step: '01', icon: <ClipboardList size={28} color="#001CE8" />, title: '1-р шатны санал', desc: '2026.07.27 - 13:00 хүртэл үнийн санал хүлээн авна' },
                { step: '02', icon: <SearchCheck size={28} color="#001CE8" />, title: 'Шалган баталгаажуулах', desc: 'Ирүүлсэн үнийн саналыг шалган баталгаажуулах, асууж тодруулах' },
                { step: '03', icon: <ShoppingCart size={28} color="#001CE8" />, title: 'Худалдан авах хүсэлт', desc: 'Үнийн саналд хариу илгээх худалдан авах хүсэлтээ мэйлээр илгээнэ' },
                { step: '04', icon: <Handshake size={28} color="#001CE8" />, title: 'Гэрээ байгуулах', desc: 'Сонгогдсон нийлүүлэгчтэй гэрээ байгуулах' },
                { step: '05', icon: <Truck size={28} color="#001CE8" />, title: 'Гүйцэтгэл хангах', desc: 'Гэрээний гүйцэтгэлийг хангах' }
              ].map((proc, idx) => (
                <div key={idx} className="proc-step-card" style={{
                  backgroundColor: 'transparent',
                  borderRadius: '24px',
                  padding: '36px 24px',
                  border: '1px solid #cbd5e1',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = '#001CE8';
                  e.currentTarget.style.boxShadow = 'none';
                  const title = e.currentTarget.querySelector('h4');
                  if (title) title.style.color = '#001CE8';
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
                    {proc.icon}
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '10px', transition: 'color 0.3s ease' }}>
                    {proc.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
                    {proc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Clean Procurement Action CTA Card (Supplier Registration) */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '50px 40px',
            border: '1px solid #cbd5e1',
            textAlign: 'center',
            maxWidth: '1200px',
            margin: '0 auto 40px auto',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.06)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.borderColor = '#001CE8';
            e.currentTarget.style.boxShadow = '0 15px 30px -8px rgba(0, 28, 232, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.06)';
          }}
          >
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a', marginBottom: '12px' }}>
              {lang === 'mn' ? 'Хамтран ажиллах нийлүүлэгчийн бүртгэл' : 'Supplier Partnership Registration'}
            </h3>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', marginBottom: '28px' }}>
              {lang === 'mn'
                ? 'Монполимет Группийн баталгаажсан нийлүүлэгчдийн санд бүртгүүлж, нээлттэй сонгон шалгаруулалтад оролцох боломжтой. Бүртгэлийн мэдээлэл procurement@monpolymet.mn хаяг руу шууд илгээгдэнэ.'
                : 'Register your organization in Monpolymet Group approved supplier system to participate in open tenders. Applications are sent directly to procurement@monpolymet.mn.'}
            </p>
            <button
              onClick={() => setShowRegisterModal(true)}
              style={{
                background: 'linear-gradient(90deg, #010B40 0%, #001CE8 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                padding: '14px 32px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              <UserCheck size={18} />
              {lang === 'mn' ? 'Нийлүүлэгчийн порталд бүртгүүлэх' : 'Register in Supplier Portal'}
            </button>
          </div>

          {/* Dual Direction Logo Marquee (Between Supplier Registration and Open Tenders) */}
          <div style={{
            margin: '120px 0',
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            background: 'transparent'
          }}>
            <style>{`
              .marquee-container-track {
                display: flex;
                overflow: hidden;
                user-select: none;
                width: 100%;
              }
              .marquee-row-1 {
                display: flex;
                flex-shrink: 0;
                gap: 40px;
                align-items: center;
                animation: scrollMarqueeLeft 75s linear infinite;
                min-width: 100%;
              }
              .marquee-row-2 {
                display: flex;
                flex-shrink: 0;
                gap: 40px;
                align-items: center;
                animation: scrollMarqueeRight 75s linear infinite;
                min-width: 100%;
              }

              @keyframes scrollMarqueeLeft {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              @keyframes scrollMarqueeRight {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
              }
              .logo-item-img {
                height: 48px;
                width: auto;
                max-width: 140px;
                object-fit: contain;
                border-radius: 6px;
                transition: transform 0.25s ease;
                background: transparent;
                display: block;
                padding: 0 4px;
              }
              .logo-item-img:hover {
                transform: scale(1.08);
              }
            `}</style>

            {/* Row 1: Leftward Scrolling (partner-1 to partner-9) */}
            <div className="marquee-container-track" style={{ marginBottom: '24px' }}>
              <div className="marquee-row-1">
                {[...row1Logos, ...row1Logos, ...row1Logos].map((src, i) => (
                  <img key={i} src={src} alt={`Partner logo ${i+1}`} className="logo-item-img" />
                ))}
              </div>
            </div>

            {/* Row 2: Rightward Scrolling (partner-10 to partner-17) */}
            <div className="marquee-container-track">
              <div className="marquee-row-2">
                {[...row2Logos, ...row2Logos, ...row2Logos].map((src, i) => (
                  <img key={i} src={src} alt={`Partner logo ${i+10}`} className="logo-item-img" />
                ))}
              </div>
            </div>
          </div>

          {/* 3. Нээлттэй тендер (Open Tenders Section) */}
          <div style={{ marginTop: '40px', marginBottom: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 className="no-underline" style={{
                fontSize: '48px',
                fontWeight: '600',
                color: '#0f172a',
                letterSpacing: '-0.5px',
                marginBottom: '12px'
              }}>
                {lang === 'mn' ? 'Нээлттэй тендер' : 'Open Tenders'}
              </h2>
              <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                {lang === 'mn'
                  ? 'Монполимет Группийн хэрэгжүүлж буй сонгон шалгаруулалт, үнийн санал авах идэвхтэй урилгууд'
                  : 'Active procurement tenders and RFQ invitations by Monpolymet Group'}
              </p>
            </div>

            {/* Open Tenders Slider Container */}
            {(() => {
              const fallbackTenders = [
                {
                  code: 'ТШ-2026/08',
                  categoryMn: 'Уул Уурхай & Сэлбэг',
                  categoryEn: 'Mining & Spare Parts',
                  titleMn: 'Тосон уурхайн хүнд машины шүүр, тос тосолгооны материал нийлүүлэх',
                  titleEn: 'Supply of heavy machinery filters & lubricants for Toson Mine',
                  startTime: '2026.07.01 09:00',
                  startDate: '2026-07-01T09:00:00',
                  deadline: '2026.08.25 18:00',
                  deadlineDate: '2026-08-25T18:00:00',
                  locationMn: 'Төв аймаг, Заамар сум',
                  locationEn: 'Zaamar sum, Tuv province',
                  descMn: '2026-2027 оны олборлолтын улирлын хэрэгцээнд зориулсан CAT, Komatsu тоног төхөөрөмжийн шүүр, гидравлик тосны нийлүүлэгчийг сонгон шалгаруулна.',
                  descEn: 'Selecting suppliers for CAT & Komatsu machinery filters and hydraulic fluids for 2026-2027 mining season.'
                },
                {
                  code: 'ТШ-2026/09',
                  categoryMn: 'Үйлдвэрлэлийн Түүхий Эд',
                  categoryEn: 'Factory Raw Materials',
                  titleMn: 'Монцемент үйлдвэрийн 2026 оны гипсэн чулуу (гөлтгөнө) нийлүүлэлт',
                  titleEn: 'Supply of gypsum raw materials for Moncement factory 2026',
                  startTime: '2026.07.15 09:00',
                  startDate: '2026-07-15T09:00:00',
                  deadline: '2026.08.30 18:00',
                  deadlineDate: '2026-08-30T18:00:00',
                  locationMn: 'Дорноговь аймаг, Өргөн сум',
                  locationEn: 'Urgun sum, Dornogovi province',
                  descMn: 'Жилд 100,000 тонн өндөр чанарын гөлтгөнө (CaSO4·2H2O > 85%) нийлүүлэх туршлагатай байгууллагуудыг сонгон шалгаруулалтад урьж байна.',
                  descEn: 'Inviting experienced suppliers for annual supply of 100,000 tons high-grade gypsum for cement production.'
                },
                {
                  code: 'ТШ-2026/10',
                  categoryMn: 'Тээвэр & Логистик',
                  categoryEn: 'Transport & Logistics',
                  titleMn: 'Вагон болон авто замын тээврийн бөөний логистикийн үйлчилгээ',
                  titleEn: 'Railway cargo & heavy auto transport logistics service',
                  startTime: '2026.07.20 09:00',
                  startDate: '2026-07-20T09:00:00',
                  deadline: '2026.09.15 18:00',
                  deadlineDate: '2026-09-15T18:00:00',
                  locationMn: 'Улаанбаатар - Дорноговь',
                  locationEn: 'Ulaanbaatar - Dornogovi',
                  descMn: 'Бүтээгдэхүүн ба түүхий эдийн төмөр замын болон авто замын тээвэрлэлтийг гүйцэтгэх найдвартай логистикийн түнш сонгон шалгаруулна.',
                  descEn: 'Selecting reliable logistics partners for bulk cargo transport via railway and heavy truck fleet.'
                }
              ];

              const displayTenders = (liveTenders && liveTenders.length > 0) ? liveTenders : fallbackTenders;
              const maxTenderIndex = Math.max(0, displayTenders.length - 1);

              return (
                <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
                  {/* Left Arrow Button */}
                  <button
                    onClick={() => setTenderIndex((prev) => Math.max(0, prev - 1))}
                    disabled={tenderIndex === 0}
                    aria-label="Previous Tenders"
                    style={{
                      position: 'absolute',
                      left: '-24px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 25,
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: tenderIndex === 0 ? 'not-allowed' : 'pointer',
                      opacity: tenderIndex === 0 ? 0.3 : 1,
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <ChevronLeft size={24} color="#0f172a" />
                  </button>

                  {/* Right Arrow Button */}
                  <button
                    onClick={() => setTenderIndex((prev) => Math.min(maxTenderIndex, prev + 1))}
                    disabled={tenderIndex >= maxTenderIndex}
                    aria-label="Next Tenders"
                    style={{
                      position: 'absolute',
                      right: '-24px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 25,
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: tenderIndex >= maxTenderIndex ? 'not-allowed' : 'pointer',
                      opacity: tenderIndex >= maxTenderIndex ? 0.3 : 1,
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <ChevronRight size={24} color="#0f172a" />
                  </button>

                  {/* Slider Viewport */}
                  <div style={{ overflow: 'hidden', padding: '12px 4px' }}>
                    <div style={{
                      display: 'flex',
                      gap: '24px',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: `translateX(calc(-${tenderIndex} * 350px))`
                    }}>
                      {displayTenders.map((tender, idx) => {
                    const start = tender.startDate ? new Date(tender.startDate) : null;
                    const end = tender.deadlineDate ? new Date(tender.deadlineDate) : (tender.deadlineTime ? new Date(tender.deadlineTime) : null);
                    const isClosed = end ? now > end : false;

                    const formattedStart = start ? `${start.getFullYear()}.${String(start.getMonth() + 1).padStart(2, '0')}.${String(start.getDate()).padStart(2, '0')} - ${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}` : tender.startTime;
                    const formattedEnd = end ? `${end.getFullYear()}.${String(end.getMonth() + 1).padStart(2, '0')}.${String(end.getDate()).padStart(2, '0')} - ${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}` : tender.deadline;

                    let statusText = lang === 'mn' ? 'Нээлттэй' : 'Open';
                    let statusBg = '#dcfce7';
                    let statusColor = '#15803d';
                    let dotColor = '#16a34a';

                    if (isClosed) {
                      statusText = lang === 'mn' ? 'Хаагдсан' : 'Closed';
                      statusBg = '#fee2e2';
                      statusColor = '#dc2626';
                      dotColor = '#ef4444';
                    }

                    return (
                      <div key={tender.id || idx} style={{
                        flex: '0 0 calc((100% - 48px) / 3)',
                        minWidth: '300px',
                        boxSizing: 'border-box',
                        backgroundColor: '#ffffff',
                        borderRadius: '20px',
                        border: isClosed ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                        padding: '32px 28px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.03)',
                        transition: 'all 0.3s ease',
                        opacity: isClosed ? 0.85 : 1
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.borderColor = isClosed ? '#ef4444' : '#2563eb';
                        e.currentTarget.style.boxShadow = isClosed
                          ? '0 20px 30px -10px rgba(239, 68, 68, 0.15)'
                          : '0 20px 30px -10px rgba(37, 99, 235, 0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = isClosed ? '#fca5a5' : '#e2e8f0';
                        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.03)';
                      }}
                      >
                        <div>
                          {/* Badge header */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              backgroundColor: statusBg,
                              color: statusColor,
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '700'
                            }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: dotColor }}></span>
                              {statusText}
                            </span>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: isClosed ? '#dc2626' : '#2563eb', backgroundColor: isClosed ? '#fef2f2' : '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>
                              {tender.code}
                            </span>
                          </div>

                          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', lineHeight: '1.4', marginBottom: '12px', fontFamily: "'Montserrat', sans-serif" }}>
                            {lang === 'mn' ? tender.titleMn : tender.titleEn}
                          </h3>

                          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                            {lang === 'mn' ? tender.descMn : tender.descEn}
                          </p>

                          {/* Meta details */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px 16px', backgroundColor: isClosed ? '#fff5f5' : '#f8fafc', borderRadius: '12px', marginBottom: '24px' }}>
                            {formattedStart && (
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                <span style={{ color: '#64748b', fontWeight: '500' }}>{lang === 'mn' ? 'Эхлэх хугацаа:' : 'Start Time:'}</span>
                                <span style={{ color: '#2563eb', fontWeight: '700' }}>{formattedStart}</span>
                              </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                              <span style={{ color: '#64748b', fontWeight: '500' }}>{lang === 'mn' ? 'Дуусах огноо:' : 'Deadline:'}</span>
                              <span style={{ color: isClosed ? '#dc2626' : '#0f172a', fontWeight: '700' }}>{formattedEnd}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                              <span style={{ color: '#64748b', fontWeight: '500' }}>{lang === 'mn' ? 'Байршил:' : 'Location:'}</span>
                              <span style={{ color: '#0f172a', fontWeight: '600' }}>{lang === 'mn' ? tender.locationMn : tender.locationEn}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => {
                              if (!isClosed) {
                                setSelectedTenderForApply(tender);
                                setApplyFile(null);
                                setApplyFileError('');
                                setApplyFormData({ priceOffer: '', contactName: '', contactPhone: '', contactEmail: '' });
                                setApplyFormSubmitted(false);
                                setApplyModalOpen(true);
                              }
                            }}
                            disabled={isClosed}
                            style={{
                              flex: 1,
                              background: isClosed
                                ? '#94a3b8'
                                : 'linear-gradient(90deg, #010B40 0%, #001CE8 100%)',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '12px',
                              padding: '12px',
                              fontSize: '13px',
                              fontWeight: '700',
                              cursor: isClosed ? 'not-allowed' : 'pointer',
                              textAlign: 'center',
                              fontFamily: "'Montserrat', sans-serif",
                              transition: 'opacity 0.2s',
                              opacity: isClosed ? 0.75 : 1
                            }}
                          >
                            {isClosed
                              ? (lang === 'mn' ? 'Тендер хаагдсан' : 'Tender Closed')
                              : (lang === 'mn' ? 'Тендерт оролцох' : 'Apply for Tender')}
                          </button>
                          <button
                            onClick={() => {
                              const targetUrl = tender.pdfUrl || '/toson_tender_doc.png';
                              const link = document.createElement('a');
                              link.href = targetUrl;
                              link.setAttribute('download', targetUrl.split('/').pop() || 'Tender_Document.png');
                              link.setAttribute('target', '_blank');
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            title={lang === 'mn' ? 'Тендерийн баримт бичиг татах' : 'Download Tender Document'}
                            style={{
                              backgroundColor: '#f1f5f9',
                              color: '#001CE8',
                              border: '1px solid #cbd5e1',
                              borderRadius: '12px',
                              padding: '12px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#dbeafe';
                              e.currentTarget.style.borderColor = '#001CE8';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#f1f5f9';
                              e.currentTarget.style.borderColor = '#cbd5e1';
                            }}
                          >
                            <FileText size={18} color="#001CE8" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            );
          })()}

            {/* TenderHub External Portal Link Banner */}
            <div style={{ textAlign: 'center', marginTop: '45px' }}>
              <a
                href="https://tenderhub.mn/home/tenders?tab=b2b&search=monpolymet"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'linear-gradient(135deg, #012019 0%, #044e3a 45%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: 'none',
                  transition: 'all 0.25s ease',
                  fontFamily: "'Montserrat', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  src={tenderhubLogo}
                  alt="TenderHub"
                  style={{
                    height: '24px',
                    width: 'auto',
                    mixBlendMode: 'screen',
                    objectFit: 'contain',
                    marginRight: '2px'
                  }}
                />
                <span>{lang === 'mn' ? 'TenderHub платформоос бүх тендерийг харах' : 'View all tenders on TenderHub'}</span>
                <ArrowUpRight size={18} />
              </a>

              <div style={{ margin: '36px 0 36px 0', textAlign: 'center' }}>
                <p style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#475569',
                  opacity: 0.8,
                  margin: 0,
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.2px'
                }}>
                  {lang === 'mn'
                    ? 'Тендертэй холбоотой дэлгэрэнгүй мэдээлэл авах утас, мэйл: 7000-9999, procurement@monpolymet.mn'
                    : 'For detailed tender inquiries, phone & email: 7000-9999, procurement@monpolymet.mn'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Supplier Registration Modal */}
      {showRegisterModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            maxWidth: '560px',
            width: '100%',
            padding: '36px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            position: 'relative',
            fontFamily: "'Montserrat', sans-serif"
          }}>
            <button
              onClick={() => setShowRegisterModal(false)}
              style={{ position: 'absolute', right: '20px', top: '20px', border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={22} />
            </button>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={60} color="#16a34a" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  {lang === 'mn' ? 'Бүртгэл амжилттай хүлээн авагдлаа!' : 'Application Successfully Received!'}
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                  {lang === 'mn' ? 'Манай худалдан авалтын мэргэжилтнүүд таны хүсэлтийг шалгаад тун удахгүй холбогдох болно.' : 'Our procurement team will evaluate your company profile and respond shortly.'}
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  {lang === 'mn' ? 'Нийлүүлэгчийн порталд бүртгүүлэх' : 'Supplier Portal Registration'}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                  {lang === 'mn' ? 'Монполимет Группийн санд байгууллагаа бүртгүүлэх хүсэлт procurement@monpolymet.mn хаяг руу шууд илгээгдэнэ.' : 'Your application and documents will be sent directly to procurement@monpolymet.mn.'}
                </p>

                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Montserrat', sans-serif" }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                      {lang === 'mn' ? 'Байгууллагын албан ёсны нэр' : 'Official Company Name'} *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Компанийн нэр"
                      style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                        {lang === 'mn' ? 'Регистрийн дугаар' : 'Reg No.'} *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.regNumber}
                        onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                        placeholder="1234567"
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', fontFamily: "'Montserrat', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                        {lang === 'mn' ? 'Чиглэл' : 'Category'}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', backgroundColor: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <option value="Уул уурхай & Сэлбэг">Уул уурхай & Сэлбэг</option>
                        <option value="Барилга & Түүхий эд">Барилга & Түүхий эд</option>
                        <option value="Эрчим хүч & Автоматик">Эрчим хүч & Автоматик</option>
                        <option value="Тээвэр & Логистик">Тээвэр & Логистик</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                        {lang === 'mn' ? 'И-мэйл хаяг' : 'Email'} *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@company.mn"
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', fontFamily: "'Montserrat', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                        {lang === 'mn' ? 'Утасны дугаар' : 'Phone'} *
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        placeholder="9911..."
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', fontFamily: "'Montserrat', sans-serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                      {lang === 'mn' ? 'Товч танилцуулга / Бараа бүтээгдэхүүн' : 'Description'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Нийлүүлдэг гол бараа, үйлчилгээ ба туршлага..."
                      style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', resize: 'none', fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                      {lang === 'mn' ? 'Хавсралт файл' : 'Attach File'}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="file"
                        id="supplier-file-attach"
                        accept="*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />

                      {!attachedFile ? (
                        <label
                          htmlFor="supplier-file-attach"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            border: '1px dashed #94a3b8',
                            backgroundColor: '#f8fafc',
                            color: '#475569',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontFamily: "'Montserrat', sans-serif"
                          }}
                        >
                          <Paperclip size={18} color="#2563eb" />
                          <span>{lang === 'mn' ? 'Файл оруулах / хавсаргах' : 'Attach File'}</span>
                        </label>
                      ) : (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#f1f5f9',
                          fontSize: '13px',
                          fontFamily: "'Montserrat', sans-serif"
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                            <Paperclip size={16} color="#0f172a" style={{ flexShrink: 0 }} />
                            <span style={{ fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>
                              {attachedFile.name}
                            </span>
                            <span style={{ fontSize: '11px', color: '#64748b', flexShrink: 0 }}>
                              ({(attachedFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setAttachedFile(null); setFileError(''); }}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}

                      {fileError && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          backgroundColor: '#fef2f2',
                          border: '1px solid #fecaca',
                          color: '#dc2626',
                          fontSize: '12px',
                          fontWeight: '600',
                          marginTop: '8px',
                          fontFamily: "'Montserrat', sans-serif"
                        }}>
                          <AlertCircle size={16} style={{ flexShrink: 0 }} />
                          <span>{fileError}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(90deg, #010B40 0%, #001CE8 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      marginTop: '8px',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    {lang === 'mn' ? 'Бүртгэл илгээх' : 'Submit Application'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tender Participation Modal */}
      {applyModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            maxWidth: applyFormSubmitted ? '450px' : '680px',
            width: '100%',
            padding: applyFormSubmitted ? '28px 24px' : '36px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            position: 'relative',
            fontFamily: "'Montserrat', sans-serif",
            transition: 'all 0.3s ease'
          }}>
            <button
              onClick={() => setApplyModalOpen(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={20} />
            </button>

            {applyFormSubmitted ? (
              <div style={{ textAlign: 'center', padding: '10px 8px' }}>
                <CheckCircle2 size={46} color="#16a34a" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '8px', fontFamily: "'Montserrat', sans-serif" }}>
                  {lang === 'mn' ? 'Тендерт оролцох хүсэлт хүлээн авагдлаа' : 'Application Received'}
                </h3>
                <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                  {lang === 'mn'
                    ? 'Таны ирүүлсэн үнийн санал болон хавсралт баримт бичгийг манай худалдан авалтын баг хүлээн авлаа. Бүрэн шалгаад тун удахгүй холбогдох болно.'
                    : 'Your quotation and documents have been received by our procurement team. We will evaluate and contact you shortly.'}
                </p>
                <button
                  onClick={() => setApplyModalOpen(false)}
                  style={{
                    backgroundColor: '#001CE8',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 24px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                >
                  Хаах
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                    Үндсэн мэдээлэл
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 12px 0' }}>
                    Үнийн санал, холбоо барих мэдээлэл болон шаардлагатай файл оруулна уу.
                  </p>

                  {/* Stage & Deadline Notice Box inside Form */}
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#000000' }}>
                        1-р шатны санал:
                      </span>
                      {selectedTenderForApply && (
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#000000' }}>
                          {selectedTenderForApply.code}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#000000' }}>
                      2026.07.27 - 13:00 хүртэл үнийн санал хүлээн авна
                    </span>
                  </div>
                </div>

                <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Montserrat', sans-serif" }}>
                  {/* Price Proposal Input */}
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '8px' }}>
                      Үнийн санал <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={applyFormData.priceOffer}
                      onChange={(e) => setApplyFormData({ ...applyFormData, priceOffer: e.target.value })}
                      placeholder="Үнийн саналаа оруулна уу..."
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontFamily: "'Montserrat', sans-serif"
                      }}
                    />
                  </div>

                  {/* NOTE: Түншлэлийн байгууллага сонгох HAS BEEN EXCLUDED AS REQUESTED */}

                  {/* 3-Column Contact Fields Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Холбоо барих хүний нэр <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={applyFormData.contactName}
                        onChange={(e) => setApplyFormData({ ...applyFormData, contactName: e.target.value })}
                        placeholder="Нэр оруулдах"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: "'Montserrat', sans-serif"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Холбоо барих утас <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        value={applyFormData.contactPhone}
                        onChange={(e) => setApplyFormData({ ...applyFormData, contactPhone: e.target.value.replace(/\D/g, '') })}
                        placeholder="Утасны дугаар"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: "'Montserrat', sans-serif"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                        Холбоо барих и-мэйл <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={applyFormData.contactEmail}
                        onChange={(e) => setApplyFormData({ ...applyFormData, contactEmail: e.target.value })}
                        placeholder="И-мэйл хаяг"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: "'Montserrat', sans-serif"
                        }}
                      />
                    </div>
                  </div>

                  {/* Required File Section */}
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '8px' }}>
                      Шаардлагатай файл <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <div style={{
                      border: '1px solid #cbd5e1',
                      borderRadius: '12px',
                      padding: '18px',
                      backgroundColor: '#ffffff',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
                    }}>
                      <input
                        type="file"
                        id="apply-file-attach"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                        onChange={handleApplyFileChange}
                        style={{ display: 'none' }}
                      />

                      {!applyFile ? (
                        <div style={{ textAlign: 'left' }}>
                          <label
                            htmlFor="apply-file-attach"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '10px 20px',
                              borderRadius: '10px',
                              border: '1px solid #cbd5e1',
                              backgroundColor: '#f8fafc',
                              color: '#334155',
                              fontSize: '13px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              fontFamily: "'Montserrat', sans-serif"
                            }}
                          >
                            <Upload size={16} color="#475569" />
                            <span>Файл сонгох</span>
                          </label>
                          <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed #cbd5e1' }}>
                            <p style={{ fontSize: '12px', fontWeight: '700', color: '#000000', margin: '0 0 6px 0' }}>
                              Хавсаргах шаардлагатай бичиг баримтууд:
                            </p>
                            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', fontWeight: '600', color: '#000000', lineHeight: '1.8' }}>
                              <li>Танилцуулга</li>
                              <li>Хийж гүйцэтгэсэн ажлууд</li>
                              <li>Бараа бүтээгдэхүүний мэдээлэл</li>
                              <li>Улсын бүртгэлийн гэрчилгээ</li>
                            </ul>
                            <p style={{ fontSize: '11px', color: '#475569', margin: '10px 0 0 0', fontWeight: '500' }}>
                              PDF, Word, Excel, зураг файл (50MB хүртэл)
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#f1f5f9',
                          fontSize: '13px',
                          fontFamily: "'Montserrat', sans-serif"
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                            <Paperclip size={16} color="#0f172a" style={{ flexShrink: 0 }} />
                            <span style={{ fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '380px' }}>
                              {applyFile.name}
                            </span>
                            <span style={{ fontSize: '11px', color: '#64748b', flexShrink: 0 }}>
                              ({(applyFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setApplyFile(null); setApplyFileError(''); }}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}

                      {applyFileError && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          backgroundColor: '#fef2f2',
                          border: '1px solid #fecaca',
                          color: '#dc2626',
                          fontSize: '12px',
                          fontWeight: '600',
                          marginTop: '10px',
                          fontFamily: "'Montserrat', sans-serif"
                        }}>
                          <AlertCircle size={16} style={{ flexShrink: 0 }} />
                          <span>{applyFileError}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(90deg, #010B40 0%, #001CE8 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      marginTop: '8px',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    Тендерт оролцох хүсэлт илгээх
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
