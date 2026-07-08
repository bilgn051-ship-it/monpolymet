import { Calendar, Tag } from 'lucide-react';

/**
 * Presentational news card used both in the home preview carousel and on the
 * media page. Props toggle the media-only category badge / date icon and the
 * home-only excerpt + read-more button.
 *
 * @param {object}   item           news item (bilingual fields)
 * @param {string}   lang           'mn' | 'en'
 * @param {boolean}  showCategory   overlay the category badge on the image
 * @param {boolean}  showDateIcon   show a calendar icon next to the date
 * @param {number}   [excerptLength] truncate the body to N chars with an ellipsis
 * @param {string}   [readMoreLabel] label for the read-more button
 * @param {Function} [onReadMore]    click handler; button only renders when set
 */
export default function NewsCard({
  item,
  lang,
  showCategory = false,
  showDateIcon = false,
  excerptLength,
  readMoreLabel,
  onReadMore,
}) {
  const title = lang === 'mn' ? item.titleMn : item.titleEn;
  const content = lang === 'mn' ? item.contentMn : item.contentEn;
  const category = lang === 'mn' ? item.categoryMn : item.categoryEn;
  const body = excerptLength ? `${content.substring(0, excerptLength)}...` : content;

  return (
    <div className="news-card animate-fade-in">
      <div className="news-image-wrapper">
        <img src={item.image} alt={title} className="news-img" />
        {showCategory && (
          <div className="news-category-badge">
            <Tag size={12} style={{ marginRight: 4 }} />
            <span>{category}</span>
          </div>
        )}
      </div>
      <div className="news-body">
        <span className="news-date">
          {showDateIcon && <Calendar size={14} style={{ marginRight: 6 }} />}
          {item.date}
        </span>
        <h3>{title}</h3>
        <p>{body}</p>
        {onReadMore && (
          <button className="read-more-btn" onClick={onReadMore}>
            {readMoreLabel} &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
