import { useInView } from "react-intersection-observer";
import "./AboutUs.css";

const AboutUs = () => {
  const { ref: dieuRef, inView: dieuInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: binRef, inView: binInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Dieu's photos for magazine layout (5 photos)
  const dieuPhotos = [
    {
      id: 1,
      url: "/assets/images/about/dieu/dieu-4.jpg",
      alt: "Dieu 1",
      position: "main",
    },
    {
      id: 2,
      url: "/assets/images/about/dieu/dieu-5.jpg",
      alt: "Dieu 2",
      position: "top-right",
    },
    {
      id: 3,
      url: "/assets/images/about/dieu/dieu-2.jpg",
      alt: "Dieu 3",
      position: "bottom-left",
    },
    {
      id: 4,
      url: "/assets/images/about/dieu/dieu-3.jpg",
      alt: "Dieu 4",
      position: "bottom-right",
    },
    {
      id: 5,
      url: "/assets/images/about/dieu/dieu-1.jpg",
      alt: "Dieu 5",
      position: "small-top",
    },
  ];

  // Bin's photos for fashion layout
  const binPhotos = [
    { id: 1, url: "/assets/images/about/quyen/quyen-1.jpg", alt: "Bin 1" },
    { id: 2, url: "/assets/images/about/quyen/quyen-2.jpg", alt: "Bin 2" },
    { id: 3, url: "/assets/images/about/quyen/quyen-3.jpg", alt: "Bin 3" },
  ];

  return (
    <section id="about" className="about-section">
      {/* Dieu Section - Magazine Editorial Style */}
      <div className="about-dieu-section" ref={dieuRef}>
        <div
          className={`dieu-magazine-container ${dieuInView ? "animate" : ""}`}
        >
          {/* Top Section - Small photo and Title */}
          <div className="dieu-mag-header">
            <div className="dieu-small-photo">
              <img src={dieuPhotos[4].url} alt={dieuPhotos[4].alt} />
              <div className="dieu-placeholder small">
                <span className="dieu-emoji">📷</span>
              </div>
            </div>

            <div className="dieu-mag-title-section">
              <h2 className="dieu-mag-title">
                <span className="title-part-1">BÙI</span>
                <span className="title-part-2">DIỆU ANH</span>
              </h2>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="dieu-mag-grid">
            {/* Left - Main large photo */}
            <div className="dieu-photo-main">
              <img src={dieuPhotos[0].url} alt={dieuPhotos[0].alt} />
              <div className="dieu-placeholder main">
                <span className="dieu-emoji">📸</span>
                <p>Main Photo</p>
              </div>
            </div>

            {/* Right Top - Photo 2 */}
            <div className="dieu-photo-top-right">
              <img src={dieuPhotos[1].url} alt={dieuPhotos[1].alt} />
              <div className="dieu-placeholder medium">
                <span className="dieu-emoji">💕</span>
              </div>
            </div>

            {/* Right Bottom Left - Photo 3 */}
            <div className="dieu-photo-bottom-left">
              <img src={dieuPhotos[2].url} alt={dieuPhotos[2].alt} />
              <div className="dieu-placeholder medium">
                <span className="dieu-emoji">✨</span>
              </div>
            </div>

            {/* Right Bottom Right - Photo 4 + Info */}
            <div className="dieu-photo-bottom-right">
              <img src={dieuPhotos[3].url} alt={dieuPhotos[3].alt} />
              <div className="dieu-placeholder medium">
                <span className="dieu-emoji">🌸</span>
              </div>
            </div>

            {/* Info Section */}
            <div className="dieu-info-box">
              <div className="dieu-info-header">
                <h3 className="dieu-name-title">Bùi Diệu Anh</h3>
                <p className="dieu-birth-date">Born: 24/08/2004</p>
              </div>

              <div className="dieu-description">
                <div className="dieu-trait-group">
                  <p className="info-label">Tính cách</p>
                  <p>
                    Dịu dàng, chu đáo, nhiệt tình và tràn đầy năng lượng tích
                    cực
                  </p>
                </div>

                <div className="dieu-trait-group">
                  <p className="info-label">Sở trường</p>
                  <p>
                    Nấu ăn, chăm sóc người khác, tổ chức và sắp xếp công việc
                  </p>
                </div>

                <div className="dieu-trait-group">
                  <p className="info-label">Sở thích</p>
                  <p>
                    Đọc sách, xem phim, du lịch, chụp ảnh và khám phá món ăn mới
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bin Section - Fashion Editorial Style (keep same as before) */}
      <div className="about-bin-section" ref={binRef}>
        <div className={`bin-container ${binInView ? "animate" : ""}`}>
          <div className="bin-title-section">
            <h2 className="bin-large-title">BÙI VIẾT QUYỀN</h2>
          </div>

          <div className="fashion-layout">
            <div className="fashion-main-image">
              <img src={binPhotos[0].url} alt={binPhotos[0].alt} />
              <div className="fashion-placeholder large">
                <span className="fashion-emoji">👔</span>
                <p>Main Photo</p>
              </div>
            </div>

            <div className="fashion-right">
              <div className="fashion-small-image">
                <img src={binPhotos[1].url} alt={binPhotos[1].alt} />
                <div className="fashion-placeholder small">
                  <span className="fashion-emoji">📸</span>
                </div>
              </div>

              <div className="bin-info-section">
                <div className="bin-detail">
                  <h3>Bùi Viết Quyền</h3>
                  <p className="bin-birthday">Sinh ngày: 01/05/2001</p>
                </div>

                <div className="bin-traits">
                  <div className="trait-item">
                    <strong>Tính cách:</strong>
                    <p>Sáng tạo, nhiệt huyết, luôn tràn đầy ý tưởng mới</p>
                  </div>
                  <div className="trait-item">
                    <strong>Sở trường:</strong>
                    <p>Lập trình, thiết kế, giải quyết vấn đề</p>
                  </div>
                  <div className="trait-item">
                    <strong>Sở thích:</strong>
                    <p>Công nghệ, âm nhạc, thể thao, khám phá điều mới</p>
                  </div>
                </div>
              </div>

              <div className="fashion-overlay-image">
                <img src={binPhotos[2].url} alt={binPhotos[2].alt} />
                <div className="fashion-placeholder overlay">
                  <span className="fashion-emoji">🎨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
