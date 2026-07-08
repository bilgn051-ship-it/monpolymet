import { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';

export default function ContactPage({ lang, t }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submissions will POST to the API's contact-messages endpoint in phase 2.
    setFormSuccess(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setFormSuccess(false), 5000);
  };

  return (
    <div className="contact-page-container container-padding">
      <SectionHeader tag={t.nav.contact} title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="contact-grid">
        {/* Contact Information */}
        <div className="contact-info-column">
          <h3>{t.contact.infoTitle}</h3>

          <div className="contact-info-item">
            <div className="contact-info-icon"><MapPin size={22} /></div>
            <div>
              <h4>{t.common.address}</h4>
              <p>{t.contact.address}</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon"><Phone size={22} /></div>
            <div>
              <h4>{t.common.phone}</h4>
              <p><a href="tel:+97670118012">+976 7011 8012</a></p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon"><Mail size={22} /></div>
            <div>
              <h4>{t.common.email}</h4>
              <p><a href="mailto:info@monpolymet.mn">info@monpolymet.mn</a></p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="contact-form-column">
          <div className="form-card">
            <h3>{t.contact.formTitle}</h3>
            {formSuccess ? (
              <div className="form-success-alert animate-fade-in">
                <CheckCircle size={24} className="success-icon" />
                <p>{t.contact.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="careers-form">
                <div className="form-group">
                  <label>{t.contact.form.name} *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>{t.contact.form.email} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.contact.form.phone}</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t.contact.form.subject}</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>{t.contact.form.message} *</label>
                  <textarea
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="form-submit-btn">
                  {t.contact.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
