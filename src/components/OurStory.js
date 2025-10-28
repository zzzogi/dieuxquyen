import React, { useState } from "react";
import "./OurStory.css";

const storyItems = [
  {
    id: 1,
    icon: "🎖️",
    title: "Ngày nhập ngũ",
    media: "/assets/images/story/img/story-2.jpg",
    type: "image",
  },
  {
    id: 2,
    icon: "💪",
    title: "Giai đoạn khó khăn",
    media: "/img/challenge.jpg",
    type: "image",
  },
  {
    id: 3,
    icon: "👼",
    title: "Ngày em đến",
    media: "/img/angel.jpg",
    type: "image",
  },
  {
    id: 4,
    icon: "☕",
    title: "Tìm hiểu",
    media: "/assets/images/story/vid/video-2.mov",
    type: "video",
  },
  {
    id: 5,
    icon: "💖",
    title: "Lời tỏ tình",
    media: "/img/confession.jpg",
    type: "image",
    special: true,
  },
  {
    id: 6,
    icon: "✨",
    title: "Viết tiếp câu chuyện",
    media: "/img/future.jpg",
    type: "image",
  },
];

export default function OurStory() {
  const [selectedItem, setSelectedItem] = useState(storyItems[0]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <section className="ourstory-section">
      {/* Background Decorations */}
      <div className="story-bg-decorations">
        <span className="floating-element heart-1">💕</span>
        <span className="floating-element heart-2">💖</span>
        <span className="floating-element heart-3">💗</span>
        <span className="floating-element star-1">⭐</span>
        <span className="floating-element star-2">✨</span>
        <span className="floating-element star-3">🌟</span>
        <span className="floating-element flower-1">🌸</span>
        <span className="floating-element flower-2">🌺</span>
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>

      <div className="story-container">
        <h2 className="story-main-title">Câu chuyện của chúng tôi</h2>

        <div className="story-content">
          {/* Left Menu */}
          <div className="story-menu">
            {storyItems.map((item) => (
              <div
                key={item.id}
                className={`menu-item ${
                  selectedItem.id === item.id ? "active" : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-title">{item.title}</span>
              </div>
            ))}
          </div>

          {/* Right Display Area */}
          <div className="story-display">
            {selectedItem.type === "image" ? (
              <div className="display-image-wrapper" key={selectedItem.id}>
                <img
                  src={selectedItem.media}
                  alt={selectedItem.title}
                  className="display-image"
                />
                <div className="display-placeholder">
                  <span className="placeholder-emoji">📷</span>
                  <p>{selectedItem.title}</p>
                </div>
              </div>
            ) : (
              <div className="display-video-wrapper" key={selectedItem.id}>
                <video
                  src={selectedItem.media}
                  controls
                  className="display-video"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
