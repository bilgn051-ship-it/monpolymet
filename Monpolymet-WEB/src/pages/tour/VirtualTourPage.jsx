import { useEffect, useState, useRef } from 'react';
import { Compass, Eye, RefreshCw } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import { fetchTour } from '../../api';

export default function VirtualTourPage({ lang, t, pageMetadata }) {
  const [activeScene, setActiveScene] = useState('toson');
  const [pannellumLoaded, setPannellumLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const viewerRef = useRef(null);
  const pannellumInstance = useRef(null);
  const [tourScenes, setTourScenes] = useState([]);

  useEffect(() => {
    fetchTour()
      .then((data) => {
        if (data && data.length) {
          const sorted = data.sort((a, b) => a.order - b.order);
          setTourScenes(sorted);
          setActiveScene(sorted[0].slug);
        }
      })
      .catch((e) => console.error("Tour fetch error:", e));
  }, []);

  const defaultScenes = {
    toson: {
      image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=1600&auto=format&fit=crop&q=80",
      title: t.tour.scenes.toson
    },
    moncement: {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&auto=format&fit=crop&q=80",
      title: t.tour.scenes.moncement
    },
    restoration: {
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80",
      title: t.tour.scenes.restoration
    }
  };

  const dynamicScenes = {};
  if (tourScenes && tourScenes.length > 0) {
    tourScenes.forEach(s => {
      dynamicScenes[s.slug] = {
        image: s.panoramaUrl,
        title: lang === 'mn' ? s.titleMn : s.titleEn
      };
    });
  }

  const scenes = Object.keys(dynamicScenes).length > 0 ? dynamicScenes : defaultScenes;

  // Load Pannellum scripts dynamically
  useEffect(() => {
    const existingScript = document.getElementById('pannellum-script');
    if (existingScript) {
      setPannellumLoaded(true);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.id = 'pannellum-script';
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
    script.async = true;
    script.onload = () => {
      setPannellumLoaded(true);
    };
    script.onerror = () => {
      console.warn("Could not load Pannellum from CDN, utilizing fallback panoramas.");
      setIsError(true);
    };
    document.body.appendChild(script);

    return () => {
      if (pannellumInstance.current) {
        try {
          pannellumInstance.current.destroy();
        } catch (e) {}
      }
    };
  }, []);

  // Initialize and update Pannellum viewer
  useEffect(() => {
    if (!pannellumLoaded || isError || !window.pannellum || !scenes[activeScene]) return;

    if (pannellumInstance.current) {
      try {
        pannellumInstance.current.destroy();
      } catch (e) {}
    }

    try {
      pannellumInstance.current = window.pannellum.viewer('panorama-viewer', {
        type: 'equirectangular',
        panorama: scenes[activeScene].image,
        autoLoad: true,
        autoRotate: -2,
        compass: true,
        showZoomCtrl: true,
        keyboardZoom: true,
        title: scenes[activeScene].title,
        author: "Monpolymet Group"
      });
    } catch (e) {
      console.error("Failed to initialize Pannellum viewer", e);
      setIsError(true);
    }

  }, [pannellumLoaded, activeScene, isError, tourScenes]);

  return (
    <div className="virtual-tour-container container-padding">
      <SectionHeader tag={t.nav.tour} title={t.tour.title} subtitle={t.tour.subtitle} pageMetadata={pageMetadata} lang={lang} />

      {/* Scene Selectors */}
      <div className="scene-selectors">
        <h3>{t.tour.viewTitle}</h3>
        <div className="scene-btn-group">
          {Object.keys(scenes).map((key) => (
            <button
              key={key}
              className={`scene-select-btn ${activeScene === key ? 'active' : ''}`}
              onClick={() => setActiveScene(key)}
            >
              <Compass size={16} />
              <span>{scenes[key].title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Viewer Frame */}
      <div className="viewer-frame-wrapper animate-fade-in">
        {/* Pannellum interactive div */}
        <div
          id="panorama-viewer"
          ref={viewerRef}
          style={{ width: '100%', height: '550px', background: '#08060d', borderRadius: '12px', overflow: 'hidden' }}
        >
          {(!pannellumLoaded || isError) && (
            <div className="tour-fallback-container" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${scenes[activeScene].image})` }}>
              <div className="fallback-card">
                <Compass className="fallback-icon spin-slow" size={48} />
                <h4>{scenes[activeScene].title}</h4>
                <p>
                  {isError
                    ? (lang === 'mn' ? "Интерактив 360 тоглуулагчийг ачаалахад алдаа гарлаа. (Сүлжээний холболтоо шалгана уу)" : "Failed to load interactive 360 viewer. (Please check connection)")
                    : t.tour.loading}
                </p>
                {isError && (
                  <button onClick={() => setIsError(false)} className="retry-btn">
                    <RefreshCw size={16} />
                    <span>Дахин оролдох</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Help Note Overlay */}
        <div className="viewer-help-note">
          <Eye size={16} />
          <span>
            {lang === 'mn'
              ? 'Хулганыхаа чирэх хөдөлгөөн болон томруулагчаар дүрсийг удирдаж үзнэ үү.'
              : 'Drag with your mouse to look around. Scroll to zoom.'}
          </span>
        </div>
      </div>
    </div>
  );
}
