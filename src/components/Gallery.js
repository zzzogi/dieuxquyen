import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import "./Gallery.css";

const Gallery = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  // Placeholder images - bạn sẽ thay thế bằng ảnh thật
  const images = [
    { id: 1, emoji: "📸", title: "Ảnh 1" },
    { id: 2, emoji: "🎉", title: "Ảnh 2" },
    { id: 3, emoji: "💕", title: "Ảnh 3" },
    { id: 4, emoji: "🌸", title: "Ảnh 4" },
    { id: 5, emoji: "🎂", title: "Ảnh 5" },
    { id: 6, emoji: "✨", title: "Ảnh 6" },
    { id: 7, emoji: "🌈", title: "Ảnh 7" },
    { id: 8, emoji: "💖", title: "Ảnh 8" },
  ];

  return (
    <section id="gallery" className="gallery-section" ref={ref}>
      <div className="gallery-content">
        <h2 className={`section-title ${inView ? "animate" : ""}`}>
          Thư viện ảnh của chúng mình 📷
        </h2>

        <p className={`gallery-subtitle ${inView ? "animate" : ""}`}>
          Những khoảnh khắc đẹp nhất được lưu giữ 💝
        </p>

        <div className={`gallery-grid ${inView ? "animate" : ""}`}>
          {images.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="image-placeholder">
                <span className="placeholder-emoji">{image.emoji}</span>
                <span className="placeholder-text">{image.title}</span>
              </div>
              <div className="gallery-overlay">
                <span className="view-icon">👁️</span>
                <p>Xem ảnh</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <div className="lightbox-image">
              <span className="large-emoji">{selectedImage.emoji}</span>
              <h3>{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
