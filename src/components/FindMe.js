import React from "react";
import "./FindMe.css";
import profileImg from "../images/awais.jpg";

const findMeCards = [
  { name: "Facebook", className: "fm-facebook", rotate: -28, x: -380, y: -25, icon: "📘" },
  { name: "Instagram", className: "fm-instagram", rotate: -17, x: -260, y: -12, icon: "📷" },
  { name: "LinkedIn", className: "fm-linkedin", rotate: -8, x: -140, y: -5, icon: "🔗" },
  { name: "WhatsApp", className: "fm-whatsapp", rotate: 8, x: 140, y: -5, icon: "💬" },
  { name: "Gmail", className: "fm-gmail", rotate: 17, x: 260, y: -12, icon: "📧" },
  { name: "GitHub", className: "fm-github", rotate: 28, x: 380, y: -25, icon: "🐙" },
];

export default function FindMe() {
  const handleCardClick = (name) => {
    const urls = {
      Facebook: "https://facebook.com/",
      Instagram: "https://instagram.com/",
      LinkedIn: "https://linkedin.com/",
      WhatsApp: "https://wa.me/",
      Gmail: "mailto:example@gmail.com",
      GitHub: "https://github.com/",
    };
    window.open(urls[name], "_blank", "noopener,noreferrer");
  };

  return React.createElement(
    "section",
    { className: "fm-container" },
    React.createElement("h2", { className: "fm-title" }, "FIND ME ONLINE"),
    React.createElement(
      "div",
      { className: "fm-wrapper" },
      React.createElement(
        "ul",
        { className: "fm-cards-list" },
        findMeCards.map((card, i) =>
          React.createElement(
            "li",
            {
              key: i,
              className: `fm-card ${card.className}`,
              style: {
                transform: `translateX(${card.x}px) translateY(${card.y}px) rotate(${card.rotate}deg)`,
                zIndex: Math.floor(100 - Math.abs(card.x) / 4),
              },
              onClick: () => handleCardClick(card.name),
            },
            React.createElement(
              "div",
              { className: "fm-card-content" },
              React.createElement("span", { className: "fm-card-icon" }, card.icon),
              React.createElement("span", { className: "fm-card-name" }, card.name)
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "fm-profile-card" },
        React.createElement("img", {
          src: profileImg,
          alt: "Profile",
          className: "fm-profile-img",
        }),
        React.createElement("span", { className: "fm-profile-name" }, "Awais")
      )
    )
  );
}