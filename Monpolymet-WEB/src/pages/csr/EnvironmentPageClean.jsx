import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Sprout,
  Trees,
  Wheat,
  Waves,
  Apple,
  GraduationCap,
  Cpu,
  Building2
} from 'lucide-react';
import envHeroImg from '../../assets/badam.jpg';
import InteractiveTitle from '../../components/ui/InteractiveTitle';

export default function EnvironmentPage({ lang, t, pageMetadata }) {
  const isMn = lang === 'mn';

  const heroTitle = isMn ? 'Байгаль орчин, нөхөн сэргээлт' : 'Environment & Rehabilitation';
  const policyTitle = isMn ? 'Байгаль орчны бодлого' : 'Environmental Policy';

  const [isExpanded, setIsExpanded] = useState(false);

  const paragraphsMn = [
    'Уул уурхай шинжлэх ухаан тул мэргэжлийн хүмүүс хариуцлагатайгаар эрхлэх учиртай. Олборлолт, нөхөн сэргээлт арга билиг мэт хамт байх учиртай. Энэ бол Монполимет группийн үүсгэн байгуулагчийн үндсэн философи юм.',
    'Бид үйл ажиллагааны зарчимдаа үндэслэн, Монгол Улсын холбогдох хууль, тогтоомжууд болон олон улсад нийтээр хүлээн зөвшөөрсөн стандартуудыг баримтлан Байгаль орчны бодлогоо боловсруулан, мөрдөж ажилладаг.',
    'Бид байгаль орчны үйл ажиллагаа нь менежмент, мониторинг, нөхөн сэргээлт, сургалт, хяналт гэсэн дөрвөн үндсэн чиглэлтэй. Үйл ажиллагааны бүх үе шатанд байгальд ээлтэй байх, байгальд учирч болох сөрөг нөлөөллөөс урьдчилан сэргийлэх, байгалийн баялгийг зохистой ашиглах, нөхөн сэргээх ажилд нэн тэргүүний ач холбогдол өгч ажилладаг.',
    'Байгаль орчныг хамгаалах ажлын гүйцэтгэлийг байнга сайжруулж, үйл ажиллагаа явуулж буй бүс нутгийн ард иргэдийн соёл, өв уламжлалыг хүндэтгэн хамгаалж, үйл ажиллагааны үр ашгийг тогтмол дээшлүүлэн, шинэ дэвшилтэт технологийг нэвтрүүлэн ажиллаж байна.'
  ];

  const paragraphsEn = [
    'Mining is a science, so it must be conducted responsibly by professionals. Extraction and rehabilitation should exist together like harmony. This is the core philosophy of Monpolymet Group\'s founder.',
    'Based on our operational principles, we formulate and adhere to our Environmental Policy in compliance with relevant laws and regulations of Mongolia as well as internationally accepted standards.',
    'Our environmental activities have four main directions: management, monitoring, rehabilitation, training, and inspection. At all stages of our operations, we prioritize eco-friendliness, preventing potential negative environmental impacts, rational use of natural resources, and environmental restoration.',
    'We continuously improve environmental protection performance, respect and protect the culture and traditions of local communities, steadily enhance operational efficiency, and introduce advanced technology.'
  ];

  const paragraphs = isMn ? paragraphsMn : paragraphsEn;

  const cardItems = [
    {
      num: '01',
      titleMn: 'Мод үржүүлгийн газар',
      titleEn: 'Tree Nursery Facility',
      descMn: '2005 онд байгуулсан. 14 төрлийн мод үрээр болон мөчрөөр үржүүлдэг. Нэг жилд 30.000 мод үржүүлэн тарьж, ургуулахад бэлтгэдэг.',
      descEn: 'Established in 2005. Propagates 14 types of trees through seeds and cuttings. Prepares 30,000 trees annually.',
      icon: <Sprout size={28} strokeWidth={1.5} />
    },
    {
      num: '02',
      titleMn: 'Ойжуулалт',
      titleEn: 'Afforestation & Reforestation',
      descMn: 'Төв аймгийн Заамар, Булган аймгийн Бүрэгхангай сумын нутаг дэвсгэрт БОНС-ийн бодлогын хүрээнд 460.000 мод бүхий 8 төгөлийг тарьж, ургуулсан.',
      descEn: 'Planted 8 groves containing 460,000 trees in Zaamar and Bureghangai.',
      icon: <Trees size={28} strokeWidth={1.5} />
    },
    {
      num: '03',
      titleMn: 'Бэлчээр нөхөн сэргээх',
      titleEn: 'Pastureland Rehabilitation',
      descMn: 'Малын бэлчээрийг нөхөн сэргээхдээ монгол орны бэлчээрийн голлох 8-10 төрлийн ургамлын үрийг холимог болгон тариалдаг. 312 га талбайд бэлчээрийн олон наст ургамал тарьж, ургуулж, нөхөн сэргээсэн.',
      descEn: 'Rehabilitating pastures using 8-10 key native plants over 312 hectares.',
      icon: <Wheat size={28} strokeWidth={1.5} />
    },
    {
      num: '04',
      titleMn: 'Нуур цөөрөм байгуулах',
      titleEn: 'Artificial Lakes & Ponds',
      descMn: 'Усны эх үүсвэрийг хамгаалах, нөөцийг бий болгох зорилгоор 2001 онд Булган аймгийн Бүрэгхангай сумын нутагт 16 га талбайд “Тосон нуур”-ыг байгуулж, 2011 онд Улсын бүртгэлд бүртгүүлсэн. Хун, дэглий, нугас зэрэг 8 зүйлийн шувуу, Цурхай, алгана, цулбуурт зэрэг 5 төрлийн загас',
      descEn: 'Established 16-ha Toson Lake in 2001. Home to 8 bird species & 5 fish species.',
      icon: <Waves size={28} strokeWidth={1.5} />
    },
    {
      num: '05',
      titleMn: 'Жимс жимсгэнийн төгөл',
      titleEn: 'Fruit & Berry Groves',
      descMn: 'Заамар сумын нутгийн иргэдийн хүсэлтээр 2011 оноос чацаргана, монос, өрөл, үхрийн нүд жимсний мод тарьж, эхэлсэн. 2014 оноос үр жимсээ өгч эдийн засгийн эргэлтэд орсон. 8 га талбайд чацаргана, үхрийн нүд тарьж, ургуулжээ.',
      descEn: 'Cultivated 8 hectares of sea buckthorn and blackcurrant trees in Zaamar.',
      icon: <Apple size={28} strokeWidth={1.5} />
    },
    {
      num: '06',
      titleMn: 'БОНС-ийн үзүүлэх сургалт',
      titleEn: 'Demonstration Training',
      descMn: 'Байгаль орчны бодлогын хүрээнд гадаад, дотоодын АНН, төрийн болон ТББ-ууд, нутгийн иргэдтэй хамтран БОНС-ийн үзүүлэх сургалтыг 2007, 2011, 2014, 2018 онд зохион байгуулсан.',
      descEn: 'Organized rehabilitation demonstration trainings in 2007, 2011, 2014, and 2018.',
      icon: <GraduationCap size={28} strokeWidth={1.5} />
    },
    {
      num: '07',
      titleMn: 'Техник технологи, инновац',
      titleEn: 'Technology & Innovation',
      descMn: 'Үйл ажиллагаандаа дэвшилтэт технологи, инновацыг нэвтрүүлж, эрдэмтэн судлаачидтай хамтран ажилладаг нь нөхөн сэргээлтийг амжилттай хийх үндэс болдог.',
      descEn: 'Introducing advanced technology and innovation, collaborating with researchers as the foundation of successful rehabilitation.',
      icon: <Cpu size={28} strokeWidth={1.5} />
    },
    {
      num: '08',
      titleMn: 'Сургалт, судалгааны бааз',
      titleEn: 'Training & Research Base',
      descMn: 'Байгаль орчны нөхөн сэргээлтийн жишиг загвар болсон “Тосон үйлдвэр”-ийг түшиглэн эрдэм шинжилгээ, судалгааны дадлага сургуулилалтын төв байгуулж байна.',
      descEn: 'Establishing a research & training center based on the benchmark "Toson Plant".',
      icon: <Building2 size={28} strokeWidth={1.5} />
    }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* 1. Full Bleed Hero Banner */}
      <div className="full-bleed-banner" style={{
        backgroundImage: `url(${envHeroImg})`,
        backgroundPosition: 'center center',
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
            <h1 className="hero-title">{heroTitle}</h1>
          </div>
        </div>
      </div>

      {/* 2. Environmental Policy Section */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 24px 70px', fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '44px' }}
          >
            <InteractiveTitle
              text={policyTitle}
              style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 600, color: '#0f172a', margin: 0, letterSpacing: '-0.02em', fontFamily: "'Montserrat', sans-serif" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={() => setIsExpanded(prev => !prev)}
            className="policy-expand-card"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '24px',
              padding: isExpanded ? '34px 46px 26px 46px' : '26px 46px 14px 46px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              willChange: 'background-color, transform, padding',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <p style={{ fontSize: '1rem', lineHeight: '1.6', textIndent: '2rem', color: '#1e293b', margin: '0 0 12px 0', fontWeight: 500, textAlign: 'justify' }}>
              {paragraphs[0]}
            </p>

            <div style={{
              position: 'relative',
              maxHeight: isExpanded ? '900px' : '50px',
              overflow: 'hidden',
              transition: 'max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              {paragraphs.slice(1).map((p, idx) => (
                <p key={idx} style={{ fontSize: '1rem', lineHeight: '1.6', textIndent: '2rem', color: '#1e293b', margin: '12px 0 0 0', fontWeight: 500, textAlign: 'justify' }}>
                  {p}
                </p>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '12px',
              color: '#64748b'
            }}>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Environmental Rehabilitation Experience Section */}
      <section style={{ backgroundColor: '#ffffff', padding: '75px 24px 20px', fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '40px', textAlign: 'center' }}
          >
            <InteractiveTitle
              text={isMn ? 'Байгаль орчны нөхөн сэргээлтийн туршлага' : 'Environmental Rehabilitation Experience'}
              style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 600, color: '#0f172a', margin: '0 0 16px 0', letterSpacing: '-0.02em', fontFamily: "'Montserrat', sans-serif" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '26px',
              padding: '44px 52px',
              border: '1px solid #e2e8f0'
            }}
          >
            <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: '#1e293b', fontWeight: 450, margin: '0 0 16px 0', textAlign: 'justify', textIndent: '2rem' }}>
              {isMn
                ? 'Уул уурхайн ашиглалт, олборлолтын дараа техникийн болон биологийн нөхөн сэргээлтийн үйл ажиллагааг ёс зүйтэй, хариуцлагатайгаар мэргэжлийн түвшинд гүйцэтгэж ирсэн 30 гаруй жилийн туршлагатай.'
                : 'Over 30 years of experience in ethically, responsibly, and professionally executing technical and biological rehabilitation after mining operations.'}
            </p>

            <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: '#1e293b', fontWeight: 450, margin: 0, textAlign: 'justify', textIndent: '2rem' }}>
              {isMn
                ? 'Байгаль орчны нөхөн сэргээлтийн алба 2007 онд байгуулагдсан. Экологич, ой зүйч, ургамал судлаач, агрономич, ландшафт архитектурч зэрэг нарийн мэргэжилтэн болон туслах ажилтнуудын бүрэлдэхүүнтэй ажиллаж байна.'
                : 'Our Environmental Rehabilitation Department was established in 2007. It operates with a team of specialized professionals including ecologists, foresters, botanists, agronomists, landscape architects, and support staff.'}
            </p>
          </motion.div>

        </div>
      </section>

      {/* 4. Numeric Performance Statistics Section */}
      <section style={{ backgroundColor: '#ffffff', padding: '20px 24px 60px', fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1100px',
            margin: '0 auto'
          }} className="csr-stats-grid-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px dashed #bfdbfe',
                borderRadius: '24px',
                padding: '36px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '38px', fontWeight: '600', fontFamily: "'Montserrat', sans-serif", color: '#2563eb', marginBottom: '12px', lineHeight: '1.2' }}>
                1,050га
              </div>
              <div style={{ fontSize: '17px', fontWeight: '600', color: '#0f172a', fontFamily: "'Montserrat', sans-serif", marginBottom: '8px', lineHeight: '1.3' }}>
                {isMn ? 'Нийт ашигласан талбай' : 'Total Mined Area'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', fontFamily: "'Montserrat', sans-serif", lineHeight: '1.5' }}>
                {isMn ? 'Ашиглалт явуулсан талбай' : 'Total operational area'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px dashed #bfdbfe',
                borderRadius: '24px',
                padding: '36px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '38px', fontWeight: '600', fontFamily: "'Montserrat', sans-serif", color: '#2563eb', marginBottom: '12px', lineHeight: '1.2' }}>
                919га (90%)
              </div>
              <div style={{ fontSize: '17px', fontWeight: '600', color: '#0f172a', fontFamily: "'Montserrat', sans-serif", marginBottom: '8px', lineHeight: '1.3' }}>
                {isMn ? 'Техникийн нөхөн сэргээлт' : 'Technical Rehabilitation'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', fontFamily: "'Montserrat', sans-serif", lineHeight: '1.5' }}>
                {isMn ? 'Гүйцэтгэсэн талбайн хэмжээ' : 'Completed area size'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px dashed #bfdbfe',
                borderRadius: '24px',
                padding: '36px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '38px', fontWeight: '600', fontFamily: "'Montserrat', sans-serif", color: '#2563eb', marginBottom: '12px', lineHeight: '1.2' }}>
                625га (60%)
              </div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', fontFamily: "'Montserrat', sans-serif", marginBottom: '8px', lineHeight: '1.3' }}>
                {isMn ? 'Биологийн нөхөн сэргээлт' : 'Biological Rehabilitation'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', fontFamily: "'Montserrat', sans-serif", lineHeight: '1.5' }}>
                {isMn ? 'хийсэн талбайн эзлэх хувь' : 'Percentage of completed area'}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 5. 8 Cards Section */}
      <section style={{ backgroundColor: '#ffffff', padding: '75px 24px 100px', fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 46px' }}
          >
            <InteractiveTitle
              text={isMn ? 'БОНС-ийн чиглэл' : 'Environmental Rehabilitation Directions'}
              style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 600, color: '#0f172a', margin: '0 0 14px 0', letterSpacing: '-0.02em', fontFamily: "'Montserrat', sans-serif" }}
            />
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#475569', margin: 0, fontWeight: 450 }}>
              {isMn
                ? 'Монгол Улсад хамгийн олон чиглэлээр буюу нуур цөөрөм байгуулах, ойжуулалт хийх, бэлчээр сэргээх, жимс, жимсгэнийн мод бутны төгөл байгуулж БОНС-ийг хийж байна.'
                : 'Executing environmental rehabilitation across the widest range of directions in Mongolia, including creating lakes and ponds, afforestation, pasture restoration, and fruit tree groves.'}
            </p>
          </motion.div>

          <div className="env-marquee-container">
            <div className="env-marquee-track">
              {[...cardItems, ...cardItems].map((item, idx) => (
                <div
                  key={`${item.num}-${idx}`}
                  className="env-card-item"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    padding: '26px 22px 24px',
                    boxShadow: 'none',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    minHeight: '260px'
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '18px',
                    right: '20px',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#cbd5e1',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {item.num}
                  </span>

                  <div className="env-card-icon" style={{
                    color: '#064ced',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    transition: 'transform 0.3s ease'
                  }}>
                    {item.icon}
                  </div>

                  <h3 style={{
                    fontSize: '1.08rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    margin: '0 0 8px 0',
                    lineHeight: '1.35',
                    textAlign: 'center'
                  }}>
                    {isMn ? item.titleMn : item.titleEn}
                  </h3>

                  <p style={{
                    fontSize: '0.88rem',
                    lineHeight: '1.6',
                    color: '#64748b',
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    {isMn ? item.descMn : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @keyframes envMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .env-marquee-container {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 10px 0;
          mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
        }
        .env-marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: envMarquee 75s linear infinite;
          will-change: transform;
        }
        .env-marquee-track:hover {
          animation-play-state: paused !important;
        }
        .env-card-item {
          cursor: pointer;
          width: 285px;
          flex-shrink: 0;
          box-sizing: border-box;
        }
        .env-card-item:hover {
          border-color: #064ced !important;
          box-shadow: 0 12px 24px -6px rgba(6, 76, 237, 0.15) !important;
        }
        .env-card-item:hover .env-card-icon {
          transform: scale(1.15);
        }
      `}</style>
    </div>
  );
}
