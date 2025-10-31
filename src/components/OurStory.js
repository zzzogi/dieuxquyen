import { useEffect, useRef, useState, useCallback } from "react";
import "./OurStory.css";

const storyItems = [
  {
    id: 1,
    title: "Ngày nhập ngũ",
    description: "Quyền lên đường đi lính - Khởi đầu hành trình mới",
    media: "/assets/images/story/img/1.jpg",
    type: "image",
  },
  {
    id: 2,
    title: "Giai đoạn khó khăn",
    description: "Vất vả, bỡ ngỡ nhưng kiên cường vượt qua",
    media: "/assets/images/story/img/2.jpg",
    type: "image",
  },
  {
    id: 3,
    title: "Ngày em đến",
    description: "Diệu Anh xuất hiện như thiên thần cứu rỗi",
    media: "/assets/images/story/img/3.jpg",
    type: "image",
  },
  {
    id: 4,
    title: "Tìm hiểu",
    description: "Những ngày cà phê, workdate ngọt ngào",
    media: "/assets/images/story/vid/video.mp4",
    type: "video",
  },
  {
    id: 5,
    title: "Lời tỏ tình",
    description: "27/05/2025 - Ngày định mệnh của đôi ta",
    media: "/assets/images/story/img/4.jpg",
    type: "image",
  },
  {
    id: 6,
    title: "Viết tiếp câu chuyện",
    description: "Tiếp tục yêu thương và tạo thêm kỷ niệm",
    media: "/assets/images/story/img/5.jpg",
    type: "image",
  },
];

export default function OurStory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHoveringSlide, setIsHoveringSlide] = useState(false); // NEW
  const intervalRef = useRef(null);
  const videoRef = useRef(null);

  const totalItems = storyItems.length;
  const currentItem = storyItems[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    setIsVideoPlaying(false);
  }, [totalItems]);

  // Auto-rotate functionality với logic cho video và hover
  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Chỉ start autoplay nếu:
    // 1. AutoPlay enabled
    // 2. Video KHÔNG đang phát
    // 3. User KHÔNG hover vào slide
    if (isAutoPlay && !isVideoPlaying && !isHoveringSlide) {
      const delay = currentItem.type === "video" ? 8000 : 4000;

      intervalRef.current = setInterval(() => {
        handleNext();
      }, delay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isAutoPlay,
    currentIndex,
    isVideoPlaying,
    isHoveringSlide,
    currentItem.type,
    handleNext,
  ]);

  // Track video play/pause events
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && currentItem.type === "video") {
      const handlePlay = () => {
        setIsVideoPlaying(true);
      };

      const handlePause = () => {
        setIsVideoPlaying(false);
      };

      const handleEnded = () => {
        setIsVideoPlaying(false);
        if (isAutoPlay && !isHoveringSlide) {
          setTimeout(() => {
            handleNext();
          }, 1000);
        }
      };

      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);
      videoElement.addEventListener("ended", handleEnded);

      return () => {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
        videoElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentIndex, currentItem.type, isAutoPlay, isHoveringSlide, handleNext]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    setIsVideoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const handleSlideClick = (index) => {
    const diff = index - currentIndex;
    if (diff === 1 || diff === -(totalItems - 1)) {
      handleNext();
    } else if (diff === -1 || diff === totalItems - 1) {
      handlePrev();
    }
  };

  // NEW: Handle hover on current slide
  const handleSlideMouseEnter = () => {
    setIsHoveringSlide(true);
  };

  const handleSlideMouseLeave = () => {
    setIsHoveringSlide(false);
  };

  const getItemStyle = (index) => {
    const diff = index - currentIndex;
    const verticalOffset = diff * 20;

    const isCurrent = diff === 0;
    const scale = isCurrent ? 1 : 0.75;
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

        {/* Status Indicators */}
        {currentItem.type === "video" && isVideoPlaying && (
          <div className="video-playing-indicator">
            🎬 Video đang phát - Carousel tạm dừng
          </div>
        )}

        {isHoveringSlide && !isVideoPlaying && (
          <div className="hover-pause-indicator">
            🖼️ Carousel tạm dừng - Ngắm ảnh thôi nào!
          </div>
        )}

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
                  } ${
                    index === currentIndex && isHoveringSlide ? "hovering" : ""
                  }`}
                  style={getItemStyle(index)}
                  onClick={() => handleSlideClick(index)}
                  onMouseEnter={
                    index === currentIndex ? handleSlideMouseEnter : undefined
                  }
                  onMouseLeave={
                    index === currentIndex ? handleSlideMouseLeave : undefined
                  }
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
                      <div className="video-wrapper">
                        <video
                          ref={index === currentIndex ? videoRef : null}
                          src={item.media}
                          className="slide-media"
                          controls={index === currentIndex}
                          muted
                          loop
                          autoPlay={index === currentIndex}
                        />
                        {index === currentIndex && !isVideoPlaying && (
                          <div className="video-play-hint">
                            <div className="play-icon-hint">▶️</div>
                            <p>Click để phát video</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Description Overlay - Fades out on hover */}
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
