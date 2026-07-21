import { Calendar, Eye, Copy } from 'lucide-react';
import { useLayoutEffect, useState, useEffect } from 'react';
import { incrementNewsView } from '../../api';

export default function NewsDetailPage({ postId, news, lang, setCurrentPage }) {
  const post = news.find(n => n.id.toString() === postId);
  const [copied, setCopied] = useState(false);
  const [viewCount, setViewCount] = useState(post?.views ?? 0);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  // Increment view count on mount
  useEffect(() => {
    if (post?.id) {
      incrementNewsView(post.id).then(count => {
        if (count !== null) setViewCount(count);
      });
    }
  }, [post?.id]);

  if (!post) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ color: '#0f172a' }}>{lang === 'mn' ? 'Мэдээ олдсонгүй' : 'Post not found'}</h2>
        <button onClick={() => setCurrentPage('news')} style={{ marginTop: '20px', padding: '12px 28px', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '99px', cursor: 'pointer', fontWeight: '600' }}>
          {lang === 'mn' ? 'Буцах' : 'Go back'}
        </button>
      </div>
    );
  }

  const title = lang === 'mn' ? post.titleMn : post.titleEn;
  const content = lang === 'mn' ? post.contentMn : post.contentEn;
  const category = lang === 'mn' ? post.categoryMn : post.categoryEn;
  const imageUrl = post.image || '';
  const paragraphs = content ? content.split('\n').filter(p => p.trim()) : [];

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(title);

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'Montserrat, sans-serif', paddingTop: '90px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 20px 80px 20px' }}>

        {/* Breadcrumb / Category */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          <button
            onClick={() => setCurrentPage('news')}
            style={{ background: 'none', border: 'none', padding: 0, color: '#334155', fontSize: '13px', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', fontWeight: '400' }}
          >
            {lang === 'mn' ? 'Мэдээ' : 'News'}
          </button>
          {category && (
            <>
              <span style={{ color: '#60697B', fontSize: '13px' }}>›</span>
              <span style={{ color: '#334155', fontSize: '13px', fontWeight: '400', fontFamily: 'Montserrat, sans-serif' }}>{category}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#0f172a',
          lineHeight: 1.4,
          margin: '0 0 24px 0',
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: '-0.01em',
          textAlign: 'left'
        }}>
          {title}
        </h1>

        {/* Meta row: views + date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60697B', fontSize: '13px', fontFamily: 'Montserrat, sans-serif' }}>
            <Eye size={16} />
            <span>{viewCount} {lang === 'mn' ? 'Хандалт' : 'Views'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60697B', fontSize: '13px', fontFamily: 'Montserrat, sans-serif' }}>
            <Calendar size={16} />
            <span>{new Date(post.publishedAt || post.date).toLocaleDateString()}</span>
          </div>
        </div>



        {/* Article body — image left, text right */}
        <div style={{ color: '#60697B', fontSize: '16px', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.8, display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>

          {/* Primary image inside article */}
          {imageUrl && (
            <div style={{ flex: '1 1 400px', minWidth: '0' }}>
              <img
                src={imageUrl}
                alt={title}
                onError={(e) => { e.target.style.display = 'none'; }}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  display: 'block',
                  objectFit: 'cover',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}
              />
            </div>
          )}

          {/* Text content */}
          <div style={{ flex: '1 1 400px', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
            {paragraphs.map((para, idx) => (
              <p key={idx} style={{ marginBottom: '1.5em', marginTop: 0, color: '#334155', fontSize: '16px', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.9, textAlign: 'justify' }}>
                {para}
              </p>
            ))}

            {paragraphs.length === 0 && (
              <p style={{ color: '#94a3b8', textAlign: 'left' }}>
                {lang === 'mn' ? 'Агуулга байхгүй байна.' : 'No content available.'}
              </p>
            )}
          </div>
        </div>

        {/* Social share row at bottom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '48px', flexWrap: 'wrap', justifyContent: 'flex-start', borderTop: '1px solid #e8ecf0', paddingTop: '32px' }}>
          <span style={{ color: '#60697B', fontSize: '13px', fontFamily: 'Montserrat, sans-serif', fontWeight: '600', marginRight: '8px' }}>
            {lang === 'mn' ? 'Хуваалцах:' : 'Share:'}
          </span>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', transition: 'all 0.2s' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> Facebook
          </a>

          {/* Twitter/X */}
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', transition: 'all 0.2s' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            Twitter
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', transition: 'all 0.2s' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> Linkedin
          </a>

          {/* Copy */}
          <button
            onClick={handleCopy}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: copied ? '#22c55e' : '#f1f5f9', color: copied ? '#fff' : '#475569', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', transition: 'all 0.2s' }}
          >
            <Copy size={14} />
            {copied ? (lang === 'mn' ? 'Хуулагдлаа!' : 'Copied!') : (lang === 'mn' ? 'Хуулах' : 'Copy')}
          </button>
        </div>

      </div>
    </div>
  );
}
