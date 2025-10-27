import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-heart">
          <span className="big-heart">💖</span>
        </div>

        <div className="footer-message">
          <h3>Bin & Dieu</h3>
          <p>Mãi bên nhau, yêu thương trọn đời 💕</p>
        </div>

        <div className="footer-date">
          <p>Được tạo với tình yêu vào năm 2025 ✨</p>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>© 2025 Bin & Dieu. Tất cả kỷ niệm đều thuộc về chúng mình 💝</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
