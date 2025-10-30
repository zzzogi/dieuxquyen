import { useEffect, useState } from "react";
import "./Testimonials.css";
import { containsBadWords, findBadWords } from "../utils/badWords";

// Config
const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/${process.env.REACT_APP_GOOGLE_FORM_ID}/formResponse`;
const ENTRY_NAME = process.env.REACT_APP_ENTRY_NAME;
const ENTRY_MESSAGE = process.env.REACT_APP_ENTRY_MESSAGE;

const GOOGLE_SHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const ENTRY_METADATA = process.env.REACT_APP_ENTRY_METADATA;

export default function Testimonials() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Collect browser metadata
  const getBrowserInfo = () => {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timestamp: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || "Direct",
      currentUrl: window.location.href,
    };
  };

  // Fetch testimonials from Google Sheets
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Frontend filter - User vẫn có thể thấy raw data nếu inspect network
  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);

    try {
      const encodedSheetName = encodeURIComponent("Sheet1");
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${encodedSheetName}?key=${GOOGLE_API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to fetch");
      }

      const data = await response.json();

      if (data.values && data.values.length > 1) {
        const testimonialData = data.values
          .slice(1)
          .filter((row) => {
            const review = row[5]; // Column D - Review status
            return review && review === "Approved"; // Chỉ lấy approved
          })
          .map((row) => ({
            timestamp: row[0] || "",
            name: row[2] || "Anonymous",
            message: row[3] || "",
            review: row[5] || "",
          }));

        setTestimonials(testimonialData.reverse());
      } else {
        setTestimonials([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Submit form to Google Forms
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validation = validateContent();

    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setSubmitting(true);

    const browserInfo = getBrowserInfo();
    const metadata = JSON.stringify(browserInfo);

    const formDataToSubmit = new FormData();

    formDataToSubmit.append(ENTRY_NAME, formData.name);
    formDataToSubmit.append(ENTRY_MESSAGE, formData.message);
    formDataToSubmit.append(ENTRY_METADATA, metadata);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSubmit,
      });

      setSubmitSuccess(true);
      setFormData({ name: "", message: "" });

      // Refresh testimonials after 2 seconds
      setTimeout(() => {
        fetchTestimonials();
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error khi user type
    setError("");
  };

  const validateContent = () => {
    // Check name
    if (containsBadWords(formData.name)) {
      return {
        isValid: false,
        message: `Tên chứa từ ngữ không phù hợp. Vui lòng sửa lại.`,
      };
    }

    // Check message
    if (containsBadWords(formData.message)) {
      return {
        isValid: false,
        message: `Lời chúc chứa từ ngữ không phù hợp. Vui lòng sửa lại.`,
      };
    }

    // Check minimum length
    if (formData.message.trim().length < 10) {
      return {
        isValid: false,
        message: "Lời chúc quá ngắn. Vui lòng viết ít nhất 10 ký tự.",
      };
    }

    return { isValid: true };
  };

  return (
    <section className="testimonials-section">
      {/* Background Decorations */}
      <div className="testimonial-bg-decorations">
        <span className="testimonial-float float-1">💌</span>
        <span className="testimonial-float float-2">💝</span>
        <span className="testimonial-float float-3">✨</span>
        <span className="testimonial-float float-4">💕</span>
      </div>

      <div className="testimonials-container">
        <h2 className="testimonials-title">Lời chúc từ mọi người</h2>

        {/* Submission Form */}
        <div className="testimonial-form-card">
          <h3>Gửi lời chúc cho Quyền & Diệu Anh</h3>
          <form onSubmit={handleSubmit} className="testimonial-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên của bạn"
                required
                className="form-input"
                maxLength={50}
              />
            </div>
            <small className="char-count">{formData.name.length}/50</small>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Lời chúc của bạn..."
                required
                rows="4"
                className="form-textarea"
                maxLength={500}
              />
            </div>
            <small className="char-count">{formData.message.length}/500</small>
            <div className="privacy-notice">
              <input type="checkbox" id="privacy-agree" required />
              <label htmlFor="privacy-agree">
                Tớ đồng ý với việc chia sẻ thông tin và hiểu rằng lời chúc sẽ
                được kiểm duyệt trước khi hiển thị công khai.
              </label>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="form-submit-btn"
            >
              {submitting ? "Đang gửi..." : "Gửi lời chúc 💕"}
            </button>
            {/* Error Message */}
            {error && <div className="validation-error">⚠️ {error}</div>}

            <small className="data-notice">
              📝 Lưu ý: Thông tin bạn cung cấp sẽ được sử dụng để hiển thị lời
              chúc công khai. Chúng tôi có thể thu thập thông tin kỹ thuật cơ
              bản (trình duyệt, thời gian) để bảo vệ website khỏi spam.
            </small>

            {submitSuccess && (
              <div className="success-message">
                ✨ Lời chúc của bạn đã được ghi lại! Chúng mình cảm ơn bạn đã
                gửi lời chúc! ✨
              </div>
            )}
          </form>
        </div>

        {/* Display Testimonials */}
        <div className="testimonials-grid">
          {loading ? (
            <div className="loading-state">
              <span className="loading-emoji">💫</span>
              <p>Đang tải lời chúc...</p>
            </div>
          ) : testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-icon">💌</div>
                <p className="testimonial-message">"{testimonial.message}"</p>
                <p className="testimonial-author">— {testimonial.name}</p>
                <div className="testimonial-date">{testimonial.timestamp}</div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-emoji">💝</span>
              <p>Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
            </div>
          )}
        </div>

        {/* <button onClick={fetchTestimonials} className="refresh-btn">
          Làm mới 🔄
        </button> */}
      </div>
    </section>
  );
}
