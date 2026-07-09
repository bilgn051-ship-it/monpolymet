import { useState } from 'react';
import { Newspaper, Briefcase, Users, Plus, Trash2, CheckCircle } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';

export default function AdminPage({
  lang,
  t,
  news,
  setNews,
  jobs,
  setJobs,
  submissions
}) {
  const [activeTab, setActiveTab] = useState('news');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [newsForm, setNewsForm] = useState({
    titleMn: '', titleEn: '',
    categoryMn: '', categoryEn: '',
    image: '',
    contentMn: '', contentEn: ''
  });

  const [jobForm, setJobForm] = useState({
    titleMn: '', titleEn: '',
    categoryMn: '', categoryEn: '',
    locationMn: '', locationEn: '',
    typeMn: '', typeEn: '',
    descMn: '', descEn: ''
  });

  const handleAddNews = (e) => {
    e.preventDefault();
    const newArticle = {
      id: Date.now(),
      titleMn: newsForm.titleMn,
      titleEn: newsForm.titleEn,
      categoryMn: newsForm.categoryMn || 'Мэдээ',
      categoryEn: newsForm.categoryEn || 'News',
      date: new Date().toISOString().split('T')[0],
      image: newsForm.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60',
      contentMn: newsForm.contentMn,
      contentEn: newsForm.contentEn
    };

    setNews([newArticle, ...news]);
    setNewsForm({ titleMn: '', titleEn: '', categoryMn: '', categoryEn: '', image: '', contentMn: '', contentEn: '' });
    setShowAddForm(false);
    triggerSuccess();
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now(),
      titleMn: jobForm.titleMn,
      titleEn: jobForm.titleEn,
      categoryMn: jobForm.categoryMn || 'Уурхай',
      categoryEn: jobForm.categoryEn || 'Mining',
      locationMn: jobForm.locationMn || 'Улаанбаатар',
      locationEn: jobForm.locationEn || 'Ulaanbaatar',
      typeMn: jobForm.typeMn || 'Бүтэн цаг',
      typeEn: jobForm.typeEn || 'Full-time',
      descMn: jobForm.descMn,
      descEn: jobForm.descEn
    };

    setJobs([newJob, ...jobs]);
    setJobForm({ titleMn: '', titleEn: '', categoryMn: '', categoryEn: '', locationMn: '', locationEn: '', typeMn: '', typeEn: '', descMn: '', descEn: '' });
    setShowAddForm(false);
    triggerSuccess();
  };

  const handleDeleteNews = (id) => {
    if (window.confirm(lang === 'mn' ? 'Та устгахдаа итгэлтэй байна уу?' : 'Are you sure you want to delete?')) {
      setNews(news.filter(item => item.id !== id));
      triggerSuccess();
    }
  };

  const handleDeleteJob = (id) => {
    if (window.confirm(lang === 'mn' ? 'Та устгахдаа итгэлтэй байна уу?' : 'Are you sure you want to delete?')) {
      setJobs(jobs.filter(item => item.id !== id));
      triggerSuccess();
    }
  };

  const triggerSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="admin-page-container container-padding">
      <SectionHeader tag={t.nav.admin} title={t.admin.title} subtitle={t.admin.subtitle} />

      {/* Success notification */}
      {isSuccess && (
        <div className="admin-success-alert animate-fade-in">
          <CheckCircle size={20} />
          <span>{lang === 'mn' ? 'Амжилттай хадгалагдлаа!' : 'Changes saved successfully!'}</span>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => { setActiveTab('news'); setShowAddForm(false); }}
        >
          <Newspaper size={18} />
          <span>{t.admin.newsTab}</span>
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => { setActiveTab('jobs'); setShowAddForm(false); }}
        >
          <Briefcase size={18} />
          <span>{t.admin.jobsTab}</span>
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
          onClick={() => { setActiveTab('submissions'); setShowAddForm(false); }}
        >
          <Users size={18} />
          <span>{t.admin.submissionsTab} ({submissions.length})</span>
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'navigation' ? 'active' : ''}`}
          onClick={() => { setActiveTab('navigation'); setShowAddForm(false); }}
        >
          <Menu size={18} />
          <span>{lang === 'mn' ? 'Цэсний тохиргоо' : 'Navigation'}</span>
        </button>
      </div>

      {/* News Management Tab */}
      {activeTab === 'news' && (
        <div className="admin-content-section animate-fade-in">
          <div className="admin-section-header">
            <h3>{lang === 'mn' ? 'Мэдээ мэдээллийн агуулга' : 'News Articles'}</h3>
            <button className="admin-action-btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
              <Plus size={16} />
              <span>{t.admin.addNews}</span>
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddNews} className="admin-form-card animate-slide-down">
              <h4>{t.admin.addNews}</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>Гарчиг (Монгол) *</label>
                  <input type="text" required value={newsForm.titleMn} onChange={(e) => setNewsForm({...newsForm, titleMn: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Title (English) *</label>
                  <input type="text" required value={newsForm.titleEn} onChange={(e) => setNewsForm({...newsForm, titleEn: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Ангилал (Монгол)</label>
                  <input type="text" value={newsForm.categoryMn} placeholder="жишээ: Нөхөн сэргээлт" onChange={(e) => setNewsForm({...newsForm, categoryMn: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Category (English)</label>
                  <input type="text" value={newsForm.categoryEn} placeholder="example: Reclamation" onChange={(e) => setNewsForm({...newsForm, categoryEn: e.target.value})} />
                </div>
                <div className="form-group full-width">
                  <label>Зургийн URL хаяг</label>
                  <input type="url" placeholder="https://images.unsplash.com/..." value={newsForm.image} onChange={(e) => setNewsForm({...newsForm, image: e.target.value})} />
                </div>
                <div className="form-group full-width">
                  <label>Мэдээний агуулга (Монгол) *</label>
                  <textarea rows="4" required value={newsForm.contentMn} onChange={(e) => setNewsForm({...newsForm, contentMn: e.target.value})}></textarea>
                </div>
                <div className="form-group full-width">
                  <label>Content Body (English) *</label>
                  <textarea rows="4" required value={newsForm.contentEn} onChange={(e) => setNewsForm({...newsForm, contentEn: e.target.value})}></textarea>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="form-save-btn">{t.admin.form.save}</button>
                <button type="button" className="form-cancel-btn" onClick={() => setShowAddForm(false)}>Хясах</button>
              </div>
            </form>
          )}

          {/* News Table */}
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Гарчиг (MN / EN)</th>
                  <th>Ангилал</th>
                  <th>Огноо</th>
                  <th>Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="table-double-title">
                        <strong>{item.titleMn}</strong>
                        <span>{item.titleEn}</span>
                      </div>
                    </td>
                    <td>{item.categoryMn}</td>
                    <td>{item.date}</td>
                    <td>
                      <button className="table-action-delete" onClick={() => handleDeleteNews(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Jobs Management Tab */}
      {activeTab === 'jobs' && (
        <div className="admin-content-section animate-fade-in">
          <div className="admin-section-header">
            <h3>{lang === 'mn' ? 'Нээлттэй ажлын байрны жагсаалт' : 'Job Openings'}</h3>
            <button className="admin-action-btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
              <Plus size={16} />
              <span>{t.admin.addJob}</span>
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddJob} className="admin-form-card animate-slide-down">
              <h4>{t.admin.addJob}</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>Ажлын байрны нэр (Монгол) *</label>
                  <input type="text" required value={jobForm.titleMn} onChange={(e) => setJobForm({...jobForm, titleMn: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Job Title (English) *</label>
                  <input type="text" required value={jobForm.titleEn} onChange={(e) => setJobForm({...jobForm, titleEn: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Салбар / Ангилал (Монгол)</label>
                  <input type="text" value={jobForm.categoryMn} onChange={(e) => setJobForm({...jobForm, categoryMn: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Department / Category (English)</label>
                  <input type="text" value={jobForm.categoryEn} onChange={(e) => setJobForm({...jobForm, categoryEn: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Байршил (Монгол)</label>
                  <input type="text" value={jobForm.locationMn} placeholder="жишээ: Тосон Уурхай" onChange={(e) => setJobForm({...jobForm, locationMn: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Location (English)</label>
                  <input type="text" value={jobForm.locationEn} placeholder="example: Toson Mine Site" onChange={(e) => setJobForm({...jobForm, locationEn: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Ажлын нөхцөл (Монгол)</label>
                  <input type="text" value={jobForm.typeMn} placeholder="жишээ: Бүтэн цаг (20/10 ээлж)" onChange={(e) => setJobForm({...jobForm, typeMn: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Employment Type (English)</label>
                  <input type="text" value={jobForm.typeEn} placeholder="example: Full-time (20/10 roster)" onChange={(e) => setJobForm({...jobForm, typeEn: e.target.value})} />
                </div>
                <div className="form-group full-width">
                  <label>Дэлгэрэнгүй тодорхойлолт (Монгол) *</label>
                  <textarea rows="3" required value={jobForm.descMn} onChange={(e) => setJobForm({...jobForm, descMn: e.target.value})}></textarea>
                </div>
                <div className="form-group full-width">
                  <label>Job Description (English) *</label>
                  <textarea rows="3" required value={jobForm.descEn} onChange={(e) => setJobForm({...jobForm, descEn: e.target.value})}></textarea>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="form-save-btn">{t.admin.form.save}</button>
                <button type="button" className="form-cancel-btn" onClick={() => setShowAddForm(false)}>Хясах</button>
              </div>
            </form>
          )}

          {/* Jobs Table */}
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ажлын байр (MN / EN)</th>
                  <th>Салбар / Байршил</th>
                  <th>Төрөл</th>
                  <th>Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div className="table-double-title">
                        <strong>{job.titleMn}</strong>
                        <span>{job.titleEn}</span>
                      </div>
                    </td>
                    <td>{job.categoryMn} / {job.locationMn}</td>
                    <td>{job.typeMn}</td>
                    <td>
                      <button className="table-action-delete" onClick={() => handleDeleteJob(job.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Submissions (Submitted CVs) Tab */}
      {activeTab === 'submissions' && (
        <div className="admin-content-section animate-fade-in">
          <h3>{lang === 'mn' ? 'Ирүүлсэн ажлын анкетууд' : 'Applicant CV Submissions'}</h3>
          {submissions.length === 0 ? (
            <p className="no-vacancies-text">{lang === 'mn' ? 'Одоогоор анкет ирээгүй байна.' : 'No CV submissions received yet.'}</p>
          ) : (
            <div className="admin-submissions-grid">
              {submissions.map((sub) => (
                <div key={sub.id} className="submission-card">
                  <div className="sub-header">
                    <h4>{sub.name}</h4>
                    <span className="sub-date">{sub.date}</span>
                  </div>
                  <div className="sub-details">
                    <p><strong>{lang === 'mn' ? 'Горилогч албан тушаал:' : 'Target Position:'}</strong> {sub.position}</p>
                    <p><strong>Утас:</strong> <a href={`tel:${sub.phone}`}>{sub.phone}</a></p>
                    {sub.email && <p><strong>И-мэйл:</strong> <a href={`mailto:${sub.email}`}>{sub.email}</a></p>}
                    {sub.message && (
                      <div className="sub-cover-message">
                        <strong>Сэтгэгдэл / Хавсрах ноот:</strong>
                        <p>{sub.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
