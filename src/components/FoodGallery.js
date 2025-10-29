import React from "react";
import "./FoodGallery.css";

// Food stickers cho marquee (shorter lists)
const marquee1Items = [
  "🍕",
  "🍔",
  "🍟",
  "🌭",
  "🍿",
  "🥓",
  "🥚",
  "🍳",
  "🧇",
  "🥞",
  "🧈",
  "🍞",
  "🥐",
  "🥖",
  "🥨",
  "🥯",
];
const marquee2Items = [
  "🧀",
  "🥗",
  "🥙",
  "🥪",
  "🌮",
  "🌯",
  "🥘",
  "🍝",
  "🍜",
  "🍲",
  "🍛",
  "🍣",
  "🍱",
  "🥟",
  "🍤",
  "🍙",
];
const marquee3Items = [
  "🥧",
  "🍰",
  "🎂",
  "🍮",
  "🍭",
  "🍬",
  "🍫",
  "🍩",
  "🍪",
  "☕",
  "🍵",
  "🧃",
  "🥤",
  "🧋",
  "🍺",
  "🥂",
];

const marqueeFood = [
  "/assets/images/stickers/1.png",
  "/assets/images/stickers/2.png",
  "/assets/images/stickers/3.png",
  "/assets/images/stickers/4.png",
  "/assets/images/stickers/5.png",
  "/assets/images/stickers/6.png",
  "/assets/images/stickers/7.png",
  "/assets/images/stickers/8.png",
  "/assets/images/stickers/9.png",
  "/assets/images/stickers/10.png",
  "/assets/images/stickers/11.png",
  "/assets/images/stickers/12.png",
  // "/assets/images/stickers/13.png",
  // "/assets/images/stickers/14.png",
  // "/assets/images/stickers/15.png",
  // "/assets/images/stickers/16.png",
];

export default function FoodGallery() {
  return (
    <section className="food-gallery-section">
      {/* Background Elements */}
      <div className="food-bg-decorations">
        <span className="food-float float-1">🍕</span>
        <span className="food-float float-2">🍔</span>
        <span className="food-float float-3">🍜</span>
        <span className="food-float float-4">🍰</span>
        <span className="food-float float-5">☕</span>
      </div>

      <div className="food-gallery-container">
        <h2 className="food-title">Ăn uống cùng bọn mình</h2>

        {/* Marquee 1 */}
        <div className="marquee-wrapper marquee-left">
          <div className="marquee-content">
            {/* {marquee1Items.map((food, idx) => (
              <span key={`m1-${idx}`} className="food-sticker">
                {food}
              </span>
            ))} */}
            {marqueeFood.map((food, idx) => (
              <img
                key={`m1-food-${idx}`}
                src={food}
                alt="Food"
                className="food-sticker"
              />
            ))}
            {marqueeFood.map((food, idx) => (
              <img
                key={`m1-food-dup-${idx}`}
                src={food}
                alt="Food"
                className="food-sticker"
              />
            ))}
            {/* {marquee1Items.map((food, idx) => (
              <span key={`m1-dup-${idx}`} className="food-sticker">
                {food}
              </span>
            ))} */}
          </div>
        </div>

        {/* Images Row 1 */}
        <div className="food-images-row">
          <div className="food-image-card transparent">
            <img
              src="/assets/images/stickers/quyen-food.png"
              alt="Quyền ăn uống"
              style={{
                borderRadius: "10%",
              }}
            />
            <div className="food-img-placeholder">
              <span className="food-emoji">👨‍🍳</span>
              <p>Bin's Food</p>
            </div>
          </div>

          <div className="cute-arrow-wrapper">
            <span className="arrow-heart">💕</span>
          </div>

          <div className="food-image-card transparent">
            <img
              src="/assets/images/stickers/dieuanh-food.png"
              alt="Diệu Anh ăn uống"
              style={{
                borderRadius: "10%",
              }}
            />
            <div className="food-img-placeholder">
              <span className="food-emoji">👩‍🍳</span>
              <p>Dieu's Food</p>
            </div>
          </div>
        </div>

        {/* Marquee 2 (Reverse) */}
        <div className="marquee-wrapper marquee-right">
          <div className="marquee-content">
            {marquee2Items.map((food, idx) => (
              <span key={`m2-${idx}`} className="food-sticker">
                {food}
              </span>
            ))}
            {marquee2Items.map((food, idx) => (
              <span key={`m2-dup-${idx}`} className="food-sticker">
                {food}
              </span>
            ))}
          </div>
        </div>

        {/* Images Row 2 */}
        <div className="food-images-row">
          <div className="food-image-card transparent">
            <img src="/img/food-couple1.png" alt="Cùng nhau ăn uống" />
            <div className="food-img-placeholder">
              <span className="food-emoji">🍽️</span>
              <p>Together 1</p>
            </div>
          </div>

          <div className="cute-arrow-wrapper">
            <svg
              className="cute-arrow"
              viewBox="0 0 100 100"
              width="80"
              height="80"
            >
              <defs>
                <marker
                  id="arrowhead2"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="var(--bin-primary)" />
                </marker>
              </defs>
              <path
                d="M 20 50 Q 50 20, 80 50"
                stroke="var(--bin-primary)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                markerEnd="url(#arrowhead2)"
              />
            </svg>
            <span className="arrow-heart">💖</span>
          </div>

          <div className="food-image-card transparent">
            <img src="/img/food-couple2.png" alt="Khoảnh khắc ăn uống" />
            <div className="food-img-placeholder">
              <span className="food-emoji">🥰</span>
              <p>Together 2</p>
            </div>
          </div>
        </div>

        {/* Marquee 3 */}
        <div className="marquee-wrapper marquee-left">
          <div className="marquee-content">
            {marquee3Items.map((food, idx) => (
              <span key={`m3-${idx}`} className="food-sticker">
                {food}
              </span>
            ))}
            {marquee3Items.map((food, idx) => (
              <span key={`m3-dup-${idx}`} className="food-sticker">
                {food}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
