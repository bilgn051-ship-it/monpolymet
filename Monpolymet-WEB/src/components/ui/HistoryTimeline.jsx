import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mandalaImg from '../../assets/mandala.jpg';
import oneImg from '../../assets/1.jpg';
import twoImg from '../../assets/2.jpg';
import threeImg from '../../assets/3.png';
import fourImg from '../../assets/4.png';

const FALLBACK_IMAGES = [
  oneImg,
  twoImg,
  threeImg,
  mandalaImg,
  fourImg,
];

export default function HistoryTimeline({ timeline, lang }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!timeline || timeline.length === 0) {
    return null;
  }

  // Safe sort timeline by year descending (handling non-numeric years like 'Өнөөдөр' or 'Today')
  const sortedTimeline = [...timeline].sort((a, b) => {
    const valA = parseInt(a.year);
    const valB = parseInt(b.year);
    const numA = isNaN(valA) ? 9999 : valA;
    const numB = isNaN(valB) ? 9999 : valB;
    return numB - numA;
  });

  const currentActiveIndex = activeIndex >= sortedTimeline.length ? 0 : (activeIndex < 0 ? 0 : activeIndex);
  const activeEvent = sortedTimeline[currentActiveIndex] || sortedTimeline[0];

  // Helper to get image based on index
  const getImageUrl = (index) => {
    const item = sortedTimeline[index];
    const img = item?.imageUrl || item?.image || item?.photo || item?.coverImage;
    if (img && img !== 'null' && img !== 'undefined' && typeof img === 'string' && img.trim() !== '') {
      return img;
    }
    return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  };

  const activeTitle = (lang === 'mn' ? activeEvent.titleMn : activeEvent.titleEn) || activeEvent.title || activeEvent.titleMn;
  const activeDesc = (lang === 'mn' ? activeEvent.descMn : activeEvent.descEn) || activeEvent.desc || activeEvent.description || activeEvent.descMn;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : sortedTimeline.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < sortedTimeline.length - 1 ? prev + 1 : 0));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 0 60px 0', fontFamily: "'Montserrat', sans-serif" }}>
      <style>
        {`
          .history-timeline-flex {
            display: flex;
            gap: 40px;
            align-items: center;
          }
          .timeline-years-scroll {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            flex: 0 0 130px;
            border-right: 2px solid #f1f5f9;
            padding-right: 20px;
            height: 420px;
            overflow-y: auto;
            overflow-x: hidden;
            gap: 16px;
            padding-top: 10px;
            padding-bottom: 10px;
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 transparent;
            scroll-behavior: smooth;
          }
          .timeline-years-scroll::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          .timeline-years-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .timeline-years-scroll::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
          .year-btn {
            background: transparent;
            border: none;
            text-align: right;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 500;
            color: #64748b;
            transition: all 0.2s ease;
            font-family: 'Montserrat', sans-serif;
            flex-shrink: 0;
            width: 100%;
          }
          .year-btn:hover {
            color: #2563eb;
            background-color: #f8fafc;
          }
          .year-btn.active {
            font-size: 22px;
            font-weight: 700;
            color: #2563eb;
            background-color: #eff6ff;
          }
          .timeline-card-wrapper {
            flex: 1;
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
          }
          .timeline-motion-div {
            position: relative;
            width: 100%;
            height: 420px;
          }
          .timeline-card-inner {
            position: relative;
            z-index: 1;
            width: 100%;
            height: 100%;
            display: flex;
            border-radius: 16px;
            border: 1px solid #3b82f6;
            background-color: #ffffff;
            box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.08);
            overflow: hidden;
          }
          .timeline-card-img-wrap {
            flex: 0 0 45%;
            position: relative;
            background-color: #f8fafc;
            min-height: 200px;
          }
          .timeline-card-text-wrap {
            flex: 1;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #ffffff;
          }

          .mobile-nav-buttons {
            display: none;
          }

          @media (max-width: 768px) {
            .history-timeline-flex {
              flex-direction: column;
              gap: 16px;
              align-items: stretch;
            }
            .timeline-years-scroll {
              flex-direction: row;
              flex: none;
              width: 100%;
              height: auto;
              border-right: none;
              border-bottom: 1px solid #e2e8f0;
              padding: 4px 10px 12px 10px;
              overflow-x: auto;
              overflow-y: hidden;
              justify-content: flex-start;
              gap: 8px;
              -webkit-overflow-scrolling: touch;
              touch-action: pan-x;
              scrollbar-width: none;
            }
            .timeline-years-scroll::-webkit-scrollbar {
              display: none;
            }
            .year-btn {
              width: auto !important;
              text-align: center !important;
              white-space: nowrap;
              padding: 8px 16px !important;
              font-size: 14px !important;
              border-radius: 20px !important;
              background-color: #f1f5f9;
              color: #475569;
            }
            .year-btn.active {
              background-color: #2563eb !important;
              color: #ffffff !important;
              font-size: 14px !important;
              font-weight: 700 !important;
              box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
            }
            .mobile-nav-buttons {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 4px;
              margin-bottom: 8px;
            }
            .nav-arrow-btn {
              background: #f1f5f9;
              border: 1px solid #cbd5e1;
              border-radius: 50%;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: bold;
              color: #0f172a;
              cursor: pointer;
            }
            .timeline-motion-div {
              height: auto !important;
            }
            .timeline-card-inner {
              flex-direction: column;
              height: auto !important;
            }
            .timeline-card-img-wrap {
              flex: none;
              width: 100%;
              height: 200px;
            }
            .timeline-card-text-wrap {
              padding: 20px 16px;
            }
          }
        `}
      </style>

      {/* Mobile arrows indicator */}
      <div className="mobile-nav-buttons">
        <button onClick={handlePrev} className="nav-arrow-btn" aria-label="Previous year">
          ‹
        </button>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#2563eb' }}>
          {activeEvent.year} ({currentActiveIndex + 1}/{sortedTimeline.length})
        </span>
        <button onClick={handleNext} className="nav-arrow-btn" aria-label="Next year">
          ›
        </button>
      </div>

      <div className="history-timeline-flex">
        {/* Left/Top Side: Years List (Scrollable) */}
        <div className="timeline-years-scroll">
          {sortedTimeline.map((item, idx) => {
            const isActive = idx === currentActiveIndex;
            return (
              <button
                key={item.id || idx}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`year-btn ${isActive ? 'active' : ''}`}
              >
                {item.year}
              </button>
            );
          })}
        </div>

        {/* Right/Bottom Side: Content Card */}
        <div className="timeline-card-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentActiveIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="timeline-motion-div"
            >
              {/* Main Card */}
              <div className="timeline-card-inner">
                {/* Image Column */}
                <div className="timeline-card-img-wrap">
                  <img
                    src={getImageUrl(currentActiveIndex)}
                    alt={activeTitle || 'Timeline Image'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Text Column */}
                <div className="timeline-card-text-wrap">
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '14px',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    {activeTitle || 'Гарчиг'}
                  </h3>
                  <div style={{
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: '#475569',
                    fontFamily: "'Inter', sans-serif",
                    margin: 0,
                    whiteSpace: 'pre-line',
                  }}>
                    {activeDesc || 'Мэдээлэл байхгүй байна.'}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
