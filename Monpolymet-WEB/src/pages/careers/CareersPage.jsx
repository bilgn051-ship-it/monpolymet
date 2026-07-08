import { useState, useEffect } from 'react';
import { Briefcase, HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import { fetchCareersContent, fetchFaqs } from '../../api';

export default function CareersPage({ lang, t, jobs, onApply }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: '',
    message: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [careersContent, setCareersContent] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchCareersContent()
      .then(setCareersContent)
      .catch((e) => console.error("Careers content fetch error:", e));

    fetchFaqs()
      .then((data) => {
        if (data && data.length) {
          setFaqs(data.sort((a, b) => a.order - b.order));
        }
      })
      .catch((e) => console.error("Faqs fetch error:", e));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.position) {
      alert(lang === 'mn' ? 'Шаардлагатай талбаруудыг бөглөнө үү.' : 'Please fill in required fields.');
      return;
    }

    onApply({
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      position: formData.position,
      message: formData.message,
      date: new Date().toISOString().split('T')[0]
    });

    setFormSuccess(true);
    setFormData({ name: '', phone: '', email: '', position: '', message: '' });
    setTimeout(() => setFormSuccess(false), 5000);
  };

  const whyUsTitle = careersContent?.whyUs
    ? (lang === 'mn' ? careersContent.whyUs.titleMn : careersContent.whyUs.titleEn)
    : t.careers.whyUsTitle;

  const whyUsText = careersContent?.whyUs
    ? (lang === 'mn' ? careersContent.whyUs.textMn : careersContent.whyUs.textEn)
    : t.careers.whyUsText;

  const whyUsImage = careersContent?.whyUs?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60";

  const stepsTitle = careersContent
    ? (lang === 'mn' ? careersContent.stepsTitleMn : careersContent.stepsTitleEn)
    : t.careers.stepsTitle;

  const stepsData = careersContent?.steps && careersContent.steps.length > 0
    ? careersContent.steps.map(s => ({
        step: s.step,
        title: lang === 'mn' ? s.titleMn : s.titleEn,
        desc: lang === 'mn' ? s.descMn : s.descEn
      }))
    : t.careers.steps;

  const faqTitle = careersContent
    ? (lang === 'mn' ? careersContent.faqTitleMn : careersContent.faqTitleEn)
    : t.careers.faqTitle;

  const faqData = faqs && faqs.length > 0
    ? faqs.map(f => ({
        q: lang === 'mn' ? f.questionMn : f.questionEn,
        a: lang === 'mn' ? f.answerMn : f.answerEn
      }))
    : t.careers.faqs;

  return (
    <div className="careers-page-container container-padding">
      <SectionHeader tag={t.nav.careers} title={t.careers.title} />

      {/* Why Us Section */}
      <section className="why-us-section animate-fade-in">
        <div className="why-us-content">
          <h3>{whyUsTitle}</h3>
          <p>{whyUsText}</p>
        </div>
        <div className="why-us-image-wrapper">
          <img
            src={whyUsImage}
            alt="Monpolymet Team Culture"
            className="why-us-image"
          />
        </div>
      </section>

      {/* Selection Steps Process */}
      <section className="selection-steps-section">
        <h3>{stepsTitle}</h3>
        <div className="steps-timeline">
          {stepsData.map((stepItem, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{stepItem.step}</div>
              <h4>{stepItem.title}</h4>
              <p>{stepItem.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Vacancies & Form Column Layout */}
      <section className="vacancies-and-form-section">
        {/* Vacancies List */}
        <div className="vacancies-column">
          <h3>{t.careers.openVacancies}</h3>
          {jobs.length === 0 ? (
            <p className="no-vacancies-text">{t.careers.noVacancies}</p>
          ) : (
            <div className="vacancies-list">
              {jobs.map((job) => (
                <div key={job.id} className="job-card animate-fade-in">
                  <div className="job-header">
                    <Briefcase size={20} className="job-icon" />
                    <h4>{lang === 'mn' ? job.titleMn : job.titleEn}</h4>
                  </div>
                  <div className="job-meta-row">
                    <span className="job-tag">{lang === 'mn' ? job.categoryMn : job.categoryEn}</span>
                    <span className="job-tag">{lang === 'mn' ? job.locationMn : job.locationEn}</span>
                    <span className="job-tag">{lang === 'mn' ? job.typeMn : job.typeEn}</span>
                  </div>
                  <p className="job-desc">{lang === 'mn' ? job.descMn : job.descEn}</p>
                  <button
                    className="job-apply-btn"
                    onClick={() => setFormData({ ...formData, position: lang === 'mn' ? job.titleMn : job.titleEn })}
                  >
                    {t.common.applyNow}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Application Form */}
        <div className="application-form-column">
          <div className="form-card">
            <h3>{t.careers.applyForm.title}</h3>
            {formSuccess ? (
              <div className="form-success-alert animate-fade-in">
                <CheckCircle size={24} className="success-icon" />
                <p>{t.careers.applyForm.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="careers-form">
                <div className="form-group">
                  <label>{t.careers.applyForm.name} *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>{t.careers.applyForm.phone} *</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.careers.applyForm.email}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t.careers.applyForm.position} *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder={lang === 'mn' ? 'Нээлттэй ажлын байрнаас сонгох эсвэл бичих' : 'Select open vacancy or write here'}
                  />
                </div>
                <div className="form-group">
                  <label>{t.careers.applyForm.message}</label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="form-submit-btn">
                  {t.careers.applyForm.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faqs-section">
        <h3>{faqTitle}</h3>
        <div className="faqs-list">
          {faqData.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className={`faq-item-card ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-question-btn"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                >
                  <HelpCircle size={18} className="faq-icon" />
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className="faq-arrow" />
                </button>
                {isOpen && (
                  <div className="faq-answer animate-slide-down">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
