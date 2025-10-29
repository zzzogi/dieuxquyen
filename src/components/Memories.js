import React, { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Draggable from "react-draggable";
import confetti from "canvas-confetti";
import "./Memories.css";

const Memories = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [flyingHearts, setFlyingHearts] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const memories = [
    {
      id: 1,
      imageUrl: "/assets/images/memories/memory-1.jpg",
      title: "Cà phê Tết",
      date: "27/05/2024",
      description: "Ngày chúng mình bắt đầu câu chuyện tình yêu đẹp đẽ này 💕",
      rotation: -8,
      defaultPosition: { x: 100, y: 80 },
    },
    {
      id: 2,
      imageUrl: "/assets/images/memories/memory-2.jpg",
      title: "Bao WAOOOOOO",
      date: "15/06/2024",
      description: "Kỷ niệm khó quên về chuyến đi đầu tiên cùng nhau 🏖️",
      rotation: 5,
      defaultPosition: { x: 350, y: 200 },
    },
    {
      id: 3,
      imageUrl: "/assets/images/memories/memory-3.jpg",
      title: "Đón tết cùng nhau",
      date: "20/07/2024",
      description: "Sinh nhật đầu tiên bên nhau thật ngọt ngào 🎂",
      rotation: -4,
      defaultPosition: { x: 600, y: 130 },
    },
    {
      id: 4,
      imageUrl: "/assets/images/memories/memory-4.jpg",
      title: "Kỷ niệm trường Đội",
      date: "14/08/2024",
      description: "Bữa tối dưới ánh nến ấm áp và lãng mạn 🕯️",
      rotation: 6,
      defaultPosition: { x: 850, y: 300 },
    },
    {
      id: 5,
      imageUrl: "/assets/images/memories/memory-5.jpg",
      title: "Giao thừa bên nhau",
      date: "10/09/2024",
      description: "Ngày picnic vui vẻ trong công viên 🌳",
      rotation: -7,
      defaultPosition: { x: 400, y: 400 },
    },
  ];

  const triggerHeartExplosion = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.5, x: 0.5 },
      zIndex: 9999,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        spread: 360,
        startVelocity: 30,
        decay: 0.9,
        scalar: 3,
        shapes: ["circle"],
        colors: [
          "#ff0a54",
          "#ff477e",
          "#ff7096",
          "#ff85a1",
          "#fbb1bd",
          "#f9bec7",
        ],
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    createFlyingHearts();
  };

  const createFlyingHearts = () => {
    const heartEmojis = [
      "💕",
      "💖",
      "💗",
      "💝",
      "💓",
      "💘",
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
    ];
    const newHearts = [];

    for (let i = 0; i < 30; i++) {
      newHearts.push({
        id: Date.now() + i,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 20 + Math.random() * 40,
      });
    }

    setFlyingHearts(newHearts);
    setTimeout(() => setFlyingHearts([]), 4000);
  };

  const openLightbox = (memory) => {
    if (!isMobile) return;
    setLightboxImage(memory);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const DraggablePolaroid = ({ memory }) => {
    const nodeRef = useRef(null);
    const draggedRef = useRef(false);
    const dragStartPos = useRef({ x: 0, y: 0 });

    const handleStart = (e) => {
      draggedRef.current = false;
      dragStartPos.current = {
        x: e.clientX || e.touches?.[0]?.clientX || 0,
        y: e.clientY || e.touches?.[0]?.clientY || 0,
      };
    };

    const handleDrag = () => {
      draggedRef.current = true;
    };

    const handleStop = (e) => {
      // Calculate drag distance
      const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0;
      const endY = e.clientY || e.changedTouches?.[0]?.clientY || 0;
      const dragDistance = Math.sqrt(
        Math.pow(endX - dragStartPos.current.x, 2) +
          Math.pow(endY - dragStartPos.current.y, 2)
      );

      // If drag distance is less than 5px, consider it a click
      if (dragDistance < 5) {
        draggedRef.current = false;
      }

      // Reset drag state after a short delay
      setTimeout(() => {
        draggedRef.current = false;
      }, 100);
    };

    const handleClick = () => {
      // Only open lightbox if not dragged
      if (!draggedRef.current) {
        openLightbox(memory);
      }
    };

    return (
      <Draggable
        nodeRef={nodeRef}
        defaultPosition={memory.defaultPosition}
        bounds="parent"
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div
          ref={nodeRef}
          className="polaroid-card-draggable"
          style={{ "--rotation": `${memory.rotation}deg` }}
        >
          <div className="polaroid-photo" onClick={handleClick}>
            <div className="polaroid-image">
              <img src={memory.imageUrl} alt={memory.title} />
              <div className="polaroid-placeholder">
                <span className="placeholder-icon">📷</span>
                <p>Ảnh {memory.id}</p>
              </div>
            </div>
            <div className="polaroid-caption">
              <p className="handwriting">{memory.title}</p>
              {!isMobile && (
                <p className="tap-hint handwriting">{memory.description}</p>
              )}
            </div>
          </div>
        </div>
      </Draggable>
    );
  };

  const GridGalleryItem = ({ memory }) => {
    return (
      <div className="grid-gallery-item" onClick={() => openLightbox(memory)}>
        <div className="grid-image">
          <img src={memory.imageUrl} alt={memory.title} />
          <div className="grid-placeholder">
            <span className="placeholder-icon">📷</span>
            <p>Ảnh {memory.id}</p>
          </div>
        </div>
        <div className="grid-caption">
          <p className="handwriting">{memory.title}</p>
        </div>
      </div>
    );
  };

  return (
    <section id="memories" className="memories-section-polaroid" ref={ref}>
      <div className="memories-content-polaroid">
        {isMobile ? (
          // Simple Grid Gallery for Mobile/Tablet
          <>
            <h2 className={`section-title-simple ${inView ? "animate" : ""}`}>
              Kỷ niệm đáng nhớ
            </h2>
            <div className="simple-grid-gallery">
              {memories.map((memory) => (
                <GridGalleryItem key={memory.id} memory={memory} />
              ))}
            </div>
          </>
        ) : (
          // Draggable Polaroid for Desktop
          <div className="polaroid-container-fullwidth">
            <div className={`big-title-center ${inView ? "animate" : ""}`}>
              <h2 className="title-line-1">KỶ NIỆM</h2>
              <h2 className="title-line-2">ĐÁNG NHỚ</h2>
            </div>

            {memories.map((memory) => (
              <DraggablePolaroid key={memory.id} memory={memory} />
            ))}

            <div className="bg-hearts">
              <span className="bg-heart heart-1">💕</span>
              <span className="bg-heart heart-2">💖</span>
              <span className="bg-heart heart-3">💗</span>
              <span className="bg-heart heart-4">💝</span>
              <span className="bg-heart heart-5">💓</span>
            </div>

            <div className="bg-shapes">
              <div className="bg-shape shape-circle-1"></div>
              <div className="bg-shape shape-circle-2"></div>
              <div className="bg-shape shape-star-1">⭐</div>
              <div className="bg-shape shape-star-2">✨</div>
              <div className="bg-shape shape-cloud">☁️</div>
              <div className="bg-shape shape-paw">🐾</div>
            </div>

            {flyingHearts.map((heart) => (
              <div
                key={heart.id}
                className="flying-heart-animation"
                style={{
                  left: `${heart.left}%`,
                  animationDelay: `${heart.delay}s`,
                  animationDuration: `${heart.duration}s`,
                  fontSize: `${heart.size}px`,
                }}
              >
                {heart.emoji}
              </div>
            ))}
          </div>
        )}

        {isMobile && (
          <div className="celebration-section">
            <p className="celebration-hint">💕 Yêu nhau thật nhiều! 💕</p>
            <button
              className="heart-explosion-btn"
              onClick={triggerHeartExplosion}
            >
              <span className="btn-heart">💖</span>
              <span className="btn-text">Tình yêu nở rộ!</span>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            <div className="lightbox-image-wrapper">
              <img src={lightboxImage.imageUrl} alt={lightboxImage.title} />
              <div className="lightbox-placeholder">
                <span className="lightbox-placeholder-icon">📷</span>
                <p>Ảnh {lightboxImage.id}</p>
              </div>
            </div>
            <div className="lightbox-info">
              <p className="lightbox-date handwriting">{lightboxImage.date}</p>
              <h3 className="lightbox-title handwriting">
                {lightboxImage.title}
              </h3>
              <p className="lightbox-description handwriting">
                {lightboxImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Memories;
