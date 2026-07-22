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

  // Sort timeline by year descending
  const sortedTimeline = [...timeline].sort((a, b) => {
    return parseInt(b.year) - parseInt(a.year);
  });

  const currentActiveIndex = activeIndex === -1 ? sortedTimeline.length - 1 : activeIndex;
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

  const activeTitle = lang === 'mn' ? activeEvent.titleMn : activeEvent.titleEn;
  const activeDesc = lang === 'mn' ? activeEvent.descMn : activeEvent.descEn;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 0 80px 0', fontFamily: "'Montserrat', sans-serif" }}>

      <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>

        {/* Left Side: Years List (Scrollable) */}
        <div
          className="timeline-years-scroll"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            flex: '0 0 120px',
            borderRight: '2px solid #f1f5f9',
            paddingRight: '16px',
            height: '420px', // Matches the card height
            overflowY: 'auto',
            overflowX: 'hidden',
            gap: '28px', // Adjusted so exactly 8 items fit in 420px
            paddingTop: '10px',
            paddingBottom: '10px'
          }}>
          <style>
            {`
              .timeline-years-scroll::-webkit-scrollbar {
                width: 4px;
              }
              .timeline-years-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
              .timeline-years-scroll::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 4px;
              }
              .timeline-years-scroll {
                scrollbar-width: thin;
                scrollbar-color: #cbd5e1 transparent;
                scroll-behavior: smooth;
              }
            `}
          </style>
          {sortedTimeline.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id || idx}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'right',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: isActive ? '26px' : '20px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#2563eb' : '#cbd5e1', // Matches the bright blue of the cards
                  transition: 'all 0.15s ease',
                  fontFamily: "'Montserrat', sans-serif",
                  transform: 'scale(1)', // Removed scale since font-size already handles enlargement
                  transformOrigin: 'right center',
                  flexShrink: 0
                }}
              >
                {item.year}
              </button>
            );
          })}
        </div>

        {/* Right Side: Content Card */}
        <div style={{ flex: '1', position: 'relative', display: 'flex', alignItems: 'center' }}>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'relative',
                width: '100%',
                height: '420px', // Increased height since it will be wider
              }}
            >



              {/* Main Card */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                borderRadius: '16px',
                border: '1px solid #2563eb',
                backgroundColor: '#ffffff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                overflow: 'hidden'
              }}>
                {/* Image Column */}
                <div style={{
                  flex: '0 0 45%', // 45% width for image
                  position: 'relative',
                  backgroundColor: '#f8fafc'
                }}>
                  <img
                    src={getImageUrl(currentActiveIndex)}
                    alt={activeTitle || 'Timeline Image'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                  />
                </div>

                {/* Text Column */}
                <div style={{
                  flex: '1',
                  padding: '40px 60px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff'
                }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '20px',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    {activeTitle || 'Гарчиг'}
                  </h3>
                  <div style={{
                    fontSize: '16px',
                    lineHeight: '1.7',
                    color: '#475569',
                    fontFamily: "'Inter', sans-serif",
                    margin: 0,
                    whiteSpace: 'pre-line',
                    overflowY: 'auto',
                    paddingRight: '10px'
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
