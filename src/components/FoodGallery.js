import React from "react";
import "./FoodGallery.css";

const marqueeFood1 = [
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
];

const marqueeFood2 = [
  "/assets/images/stickers/13.png",
  "/assets/images/stickers/14.png",
  "/assets/images/stickers/15.png",
  "/assets/images/stickers/16.png",
  "/assets/images/stickers/17.png",
  "/assets/images/stickers/18.png",
  "/assets/images/stickers/19.png",
  "/assets/images/stickers/20.png",
  "/assets/images/stickers/21.png",
  "/assets/images/stickers/22.png",
  "/assets/images/stickers/23.png",
  "/assets/images/stickers/24.png",
];

const marqueeFood3 = [
  "/assets/images/stickers/25.png",
  "/assets/images/stickers/26.png",
  "/assets/images/stickers/27.png",
  "/assets/images/stickers/28.png",
  "/assets/images/stickers/29.png",
  "/assets/images/stickers/30.png",
  "/assets/images/stickers/31.png",
  "/assets/images/stickers/32.png",
  "/assets/images/stickers/33.png",
  "/assets/images/stickers/34.png",
  "/assets/images/stickers/35.png",
  "/assets/images/stickers/36.png",
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
        <p className="food-title">Tăng cân cùng chúng mình</p>

        {/* Marquee 1 */}
        <div className="marquee-wrapper marquee-left">
          <div className="marquee-content">
            {marqueeFood1.map((food, idx) => (
              <img
                key={`m1-food-${idx}`}
                src={food}
                alt="Food"
                className="food-sticker"
              />
            ))}
            {marqueeFood1.map((food, idx) => (
              <img
                key={`m1-food-dup-${idx}`}
                src={food}
                alt="Food"
                className="food-sticker"
              />
            ))}
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
            {marqueeFood2.map((food, idx) => (
              <img
                key={`m2-food-${idx}`}
                src={food}
                alt="Food"
                className="food-sticker"
              />
            ))}
            {marqueeFood2.map((food, idx) => (
              <img
                key={`m2-food-dup-${idx}`}
                src={food}
                alt="Food"
                className="food-sticker"
              />
            ))}
          </div>
        </div>

        {/* Images Row 2 */}
        <div className="food-images-row">
          <div className="food-image-card transparent">
            <img
              src="/assets/images/stickers/quyen-6-mui.png"
              alt="Quyền 6 múi"
              style={{
                borderRadius: "10%",
              }}
            />
          </div>

          <div className="cute-arrow-wrapper">
            <img
              src="/assets/images/stickers/arrow.png"
              alt="Mũi tên"
              className="cute-arrow"
            />
          </div>

          <div className="food-image-card transparent">
            <img
              src="/assets/images/stickers/quyen-bell.png"
              alt="Quyền Bell"
              style={{
                borderRadius: "10%",
              }}
            />
          </div>
        </div>

        {/* Marquee 3 */}
        <div className="marquee-wrapper marquee-left">
          <div className="marquee-content">
            {marqueeFood3.map((food, idx) => (
              <img
                key={`m3-food-${idx}`}
                src={food}
                alt="Food"
                className="food-sticker"
              />
            ))}
            {marqueeFood3.map((food, idx) => (
              <img
                key={`m3-food-dup-${idx}`}
                src={food}
                alt="Food"
                className="food-sticker"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
