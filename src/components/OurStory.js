import React from "react";
import { useInView } from "react-intersection-observer";
import "./OurStory.css";

const OurStory = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const timelineEvents = [
    {
      icon: "👋",
      title: "Lần đầu gặp gỡ",
      date: "Tháng XX/20XX",
      description:
        "Ngày đầu tiên chúng mình gặp nhau, mọi thứ bắt đầu từ đây...",
      side: "left",
    },
    {
      icon: "💕",
      title: "Bắt đầu yêu",
      date: "Tháng XX/20XX",
      description: "Cảm xúc nảy nở, chúng mình đã chính thức bên nhau!",
      side: "right",
    },
    {
      icon: "🎉",
      title: "Kỷ niệm đặc biệt",
      date: "Tháng XX/20XX",
      description: "Một ngày đáng nhớ mà chúng mình sẽ không bao giờ quên...",
      side: "left",
    },
    {
      icon: "✨",
      title: "Hiện tại",
      date: "Hôm nay",
      description: "Mỗi ngày bên nhau là một món quà quý giá!",
      side: "right",
    },
  ];

  return (
    <section id="story" className="story-section" ref={ref}>
      <div className="story-content">
        <h2 className={`section-title ${inView ? "animate" : ""}`}>
          Câu chuyện của chúng mình 📖
        </h2>

        <div className={`timeline ${inView ? "animate" : ""}`}>
          <div className="timeline-line"></div>

          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`timeline-item ${event.side} ${
                inView ? "animate" : ""
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="timeline-content">
                <div className="event-icon">{event.icon}</div>
                <h3>{event.title}</h3>
                <span className="event-date">{event.date}</span>
                <p>{event.description}</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
