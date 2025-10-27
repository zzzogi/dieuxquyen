import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";

const Hero = () => {
  const [hearts, setHearts] = useState([]);
  const [daysCount, setDaysCount] = useState(0);
  const [momentsCount, setMomentsCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const heroRef = useRef(null);

  // Calculate days together from 27/05/2024 to today
  const calculateDaysTogether = () => {
    const startDate = new Date("2025-05-27");
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const targetDays = calculateDaysTogether();
  const targetMoments = 999;

  // Counter animation function
  const animateCounter = (target, setter, duration = 2000) => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = progress * (2 - progress);
      const currentValue = Math.floor(easeOutQuad * target);

      setter(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setter(target); // Ensure we hit the exact target
      }
    };
    requestAnimationFrame(animate);
  };

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter(targetDays, setDaysCount, 2500);
            setTimeout(() => {
              animateCounter(targetMoments, setMomentsCount, 2000);
            }, 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, targetDays, targetMoments]);

  // Floating hearts animation
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
      };
      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 4000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero-neuera" ref={heroRef}>
      <div className="hero-content-neuera">
        <div className="hero-left">
          <h1 className="hero-title-neuera">
            <div className="title-line">
              <span className="word-white">WE CRAFT</span>
              {/* <div className="decorative-shape shape-1"></div> */}
            </div>
            <div className="title-line">
              <div className="camera-icon">
                <div className="camera-body">
                  <div className="camera-lens"></div>
                  <div className="camera-flash"></div>
                </div>
              </div>
              <span className="word-white">THE</span>
              <span className="sparkle">✦</span>
              <span className="word-pink">LOVE</span>
            </div>
            <div className="title-line">
              <span className="word-pink-light">STORY</span>
              <div className="stats-box stats-days">
                <div className="stats-number">{daysCount}+</div>
                <div className="stats-label">Ngày bên nhau</div>
                <div className="stats-arrow">↗</div>
              </div>
            </div>
          </h1>

          <div className="hero-description">
            <p>
              Bin & Dieu - Một câu chuyện tình yêu đầy màu sắc và cảm xúc. Chúng
              mình đã cùng nhau tạo nên những khoảnh khắc đáng nhớ, những kỷ
              niệm ngọt ngào không bao giờ phai.
            </p>
          </div>

          <button className="cta-button">
            <span>Khám phá ngay</span>
            <span className="cta-arrow">→</span>
          </button>
        </div>

        <div className="hero-right">
          <div className="image-showcase">
            {/* Main image container */}
            <div className="main-image-container">
              <div className="image-wrapper">
                {/* Replace with your actual PNG image */}
                <img
                  src="/assets/images/hero/hero.png"
                  alt="Bin & Dieu"
                  className="couple-image"
                />
                {/* Placeholder if no image yet */}
                <div className="image-placeholder-couple">
                  <div className="placeholder-content">
                    <span className="couple-emoji">👫</span>
                    <p>Bin & Dieu</p>
                    <p className="placeholder-hint">
                      Thêm ảnh PNG của bạn vào đây
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small decorative elements */}
            <div className="floating-element element-heart">💕</div>
            <div className="floating-element element-star">⭐</div>
            <div className="floating-element element-sparkle">✨</div>

            {/* Stats box with animated counter */}
            <div className="floating-element element-heart-2">💕</div>
            <div className="floating-element element-star-2">⭐</div>
            <div className="floating-element element-sparkle-2">✨</div>
          </div>
        </div>
      </div>

      <div className="floating-hearts">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Decorative background elements */}
      <div className="bg-decoration decoration-1"></div>
      <div className="bg-decoration decoration-2"></div>
    </section>
  );
};

export default Hero;
