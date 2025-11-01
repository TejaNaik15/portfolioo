import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './SkillTiltedCard.css';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function SkillTiltedCard({
  skill,
  containerSize = '120px'
}) {
  const ref = useRef(null);

  const x = useMotionValue();
  const y = useMotionValue();
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -10;
    const rotationY = (offsetX / (rect.width / 2)) * 10;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  function handleMouseEnter() {
    scale.set(1.1);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <figure
      ref={ref}
      className="skill-tilted-card-figure"
      style={{
        height: containerSize,
        width: containerSize
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(skill.url, '_blank')}
    >
      <motion.div
        className="skill-tilted-card-inner"
        style={{
          width: containerSize,
          height: containerSize,
          rotateX,
          rotateY,
          scale
        }}
      >
        <div className="skill-tilted-card-content">
          <img
            src={skill.img}
            alt={skill.name}
            className="skill-tilted-card-img"
            style={{
              filter: /github|express/i.test(skill.name) ? 'invert(1) brightness(1.2)' : 'none'
            }}
          />
        </div>
      </motion.div>

      <motion.figcaption
        className="skill-tilted-card-caption"
        style={{
          x,
          y,
          opacity
        }}
      >
        {skill.name}
      </motion.figcaption>
    </figure>
  );
}