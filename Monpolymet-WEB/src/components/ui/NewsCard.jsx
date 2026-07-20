export default function NewsCard({
  item,
  lang,
  onReadMore,
}) {
  const title = lang === 'mn' ? (item.titleMn || item.title) : (item.titleEn || item.title);
  const imageUrl = item.image || 'https://monpolymet.mn/wp-content/uploads/2022/05/img-slider-02-2.jpg';
  
  // Format date
  const dateObj = item.publishedAt || item.createdAt || item.date;
  let formattedDate = '';
  if (dateObj) {
    const d = new Date(dateObj);
    if (!isNaN(d.getTime())) {
      formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(d);
    } else {
      formattedDate = dateObj;
    }
  }

  return (
    <div className="news-separated-card" onClick={onReadMore}>
      <div className="news-card-image">
        <img src={imageUrl} alt={title} onError={(e) => { e.target.onerror = null; e.target.src = 'https://monpolymet.mn/wp-content/uploads/2022/05/img-slider-02-2.jpg'; }} />
      </div>
      <div className="news-card-text-box">
        <div className="news-card-date">{formattedDate}</div>
        <h5 className="news-card-title">{title}</h5>
      </div>
    </div>
  );
}
