import { useRef } from "react";

const GlowCard = ({ card, index, children }) => {
  const cardRefs = useRef([]);

  const handleMouseMove = (index) => (e) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    card.style.setProperty("--start", angle + 60);
  };

  return (
    <div
      ref={(el) => (cardRefs.current[index] = el)}
      onMouseMove={handleMouseMove(index)}
      className="relative rounded-xl p-6 md:p-8 mb-5 border border-white/10 bg-secondary-dark/30 backdrop-blur-sm overflow-hidden group hover:border-accent-blue/50 transition-all duration-300"
      style={{
        background: `conic-gradient(from var(--start, 0deg), rgba(19, 173, 199, 0.1) 0deg, transparent 60deg, transparent 300deg, rgba(19, 173, 199, 0.1) 360deg), rgba(31, 41, 55, 0.3)`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="w-4 h-4 bg-accent-yellow rounded-full opacity-80" />
          ))}
        </div>
        <div className="mb-4">
          <p className="text-text-muted text-base md:text-lg">{card.review}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GlowCard;