import { useEffect, useRef, useState } from "react";
import "./OurStory.css";

const storyItems = [
  {
    id: 1,
    title: "Ngày nhập ngũ",
    description: "Quyền lên đường đi lính - Khởi đầu hành trình mới",
    media: "/assets/images/story/img/img-1.jpg",
    type: "image",
  },
  {
    id: 2,
    title: "Giai đoạn khó khăn",
    description: "Vất vả, bỡ ngỡ nhưng kiên cường vượt qua",
    media: "/img/challenge.jpg",
    type: "image",
  },
  {
    id: 3,
    title: "Ngày em đến",
    description: "Diệu Anh xuất hiện như thiên thần cứu rỗi",
    media: "/img/angel.jpg",
    type: "image",
  },
  {
    id: 4,
    title: "Tìm hiểu",
    description: "Những ngày cà phê, workdate ngọt ngào",
    media: "/vid/dating.mp4",
    type: "video",
  },
  {
    id: 5,
    title: "Lời tỏ tình",
    description: "27/05/2025 - Ngày định mệnh của đôi ta",
    media: "/img/confession.jpg",
    type: "image",
  },
  {
    id: 6,
    title: "Viết tiếp câu chuyện",
    description: "Tiếp tục yêu thương và tạo thêm kỷ niệm",
    media: "/img/future.jpg",
    type: "image",
  },
];

export default function OurStory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef(null);

  const totalItems = storyItems.length;

  // Auto-rotate functionality
  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const handleSlideClick = (index) => {
    const diff = index - currentIndex;
    if (diff === 1 || diff === -(totalItems - 1)) {
      // Click on next slide
      handleNext();
    } else if (diff === -1 || diff === totalItems - 1) {
      // Click on previous slide
      handlePrev();
    }
  };

  // Calculate vertical position for carousel items
  const getItemStyle = (index) => {
    const diff = index - currentIndex;
    const verticalOffset = diff * 20; // Giảm từ 120 xuống 80 để slides gần nhau hơn

    const isCurrent = diff === 0;
    const scale = isCurrent ? 1 : 0.75; // Giảm từ 0.85 xuống 0.75 để current nổi bật hơn
    const opacity = Math.abs(diff) <= 1 ? 1 : 0;

    return {
      transform: `translateY(${verticalOffset}%) scale(${scale})`,
      opacity: opacity,
      zIndex: isCurrent ? 10 : Math.abs(diff) === 1 ? 5 : 1,
      pointerEvents: Math.abs(diff) <= 1 ? "auto" : "none",
    };
  };

  return (
    <section className="story-vertical-section">
      {/* Background Decorations */}
      <div className="story-bg-decorations">
        <span className="float-element heart-1">💕</span>
        <span className="float-element heart-2">💖</span>
        <span className="float-element heart-3">💗</span>
        <span className="float-element star-1">⭐</span>
        <span className="float-element star-2">✨</span>
        <span className="float-element star-3">🌟</span>
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
      </div>

      <div className="story-container-centered">
        <h2 className="story-title">Câu chuyện của chúng mình</h2>

        {/* Carousel Container */}
        <div className="vertical-carousel-wrapper">
          {/* Up Arrow */}
          <button
            className="arrow-btn up-arrow"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="vertical-carousel">
            <div className="carousel-vertical-track">
              {storyItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`carousel-slide ${
                    index === currentIndex ? "current" : ""
                  }`}
                  style={getItemStyle(index)}
                  onClick={() => handleSlideClick(index)}
                >
                  <div className="slide-content">
                    {item.type === "image" ? (
                      <>
                        <img
                          src={item.media}
                          alt={item.title}
                          className="slide-media"
                        />
                        <div className="slide-placeholder">
                          <span className="placeholder-icon">📷</span>
                        </div>
                      </>
                    ) : (
                      <video
                        src={item.media}
                        className="slide-media"
                        controls={index === currentIndex}
                        muted
                        loop
                      />
                    )}

                    {/* Description Overlay - Right Corner */}
                    <div className="slide-description">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Down Arrow */}
          <button
            className="arrow-btn down-arrow"
            onClick={handleNext}
            aria-label="Next"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Controls */}
        <div className="carousel-controls">
          <button className="autoplay-btn" onClick={toggleAutoPlay}>
            {isAutoPlay ? (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>Tạm dừng</span>
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Tự động</span>
              </>
            )}
          </button>

          <div className="progress-dots">
            {storyItems.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Chuyển tới ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
