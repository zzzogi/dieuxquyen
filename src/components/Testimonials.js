import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import "./Testimonials.css";

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Người thân",
      relation: "Gia đình",
      avatar: "👨‍👩‍👧",
      quote:
        "Hai con trông thật đáng yêu và hạnh phúc bên nhau. Chúc con luôn yêu thương và quan tâm nhau như thế!",
      hearts: 5,
    },
    {
      id: 2,
      name: "Bạn thân",
      relation: "Bạn bè",
      avatar: "👥",
      quote:
        "Mình thấy các bạn thật hợp nhau! Một cặp đôi đáng yêu và tuyệt vời. Chúc các bạn luôn hạnh phúc!",
      hearts: 5,
    },
    {
      id: 3,
      name: "Đồng nghiệp",
      relation: "Công việc",
      avatar: "💼",
      quote:
        "Thật may mắn khi được chứng kiến tình yêu đẹp của hai bạn. Chúc hai bạn mãi bên nhau!",
      hearts: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="testimonials-section" ref={ref}>
      <div className="testimonials-content">
        <h2 className={`section-title ${inView ? "animate" : ""}`}>
          Lời chúc từ mọi người 💌
        </h2>

        <div className={`testimonial-slider ${inView ? "animate" : ""}`}>
          <button className="slider-btn prev" onClick={prevTestimonial}>
            ←
          </button>

          <div className="testimonial-card">
            <div className="testimonial-avatar">
              {testimonials[currentIndex].avatar}
            </div>
            <div className="quote-icon">"</div>
            <p className="testimonial-quote">
              {testimonials[currentIndex].quote}
            </p>
            <div className="hearts-rating">
              {[...Array(testimonials[currentIndex].hearts)].map((_, i) => (
                <span key={i} className="heart">
                  💖
                </span>
              ))}
            </div>
            <h4 className="testimonial-name">
              {testimonials[currentIndex].name}
            </h4>
            <p className="testimonial-relation">
              {testimonials[currentIndex].relation}
            </p>
          </div>

          <button className="slider-btn next" onClick={nextTestimonial}>
            →
          </button>
        </div>

        <div className="slider-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
