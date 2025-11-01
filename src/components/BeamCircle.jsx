import React, { useMemo } from "react";
import { motion } from "framer-motion";

const BeamCircle = ({ size = 400, orbits = [], centerIcon }) => {
  const halfSize = size / 2;

  const rotationTransition = (duration) => ({
    repeat: Infinity,
    duration,
    ease: "linear",
  });

  const CenterIcon = useMemo(
    () => (
      <motion.div
        className="rounded-full shadow-lg bg-gradient-to-br from-accent-blue to-accent-purple grid place-content-center border border-white/20"
        style={{ width: halfSize * 0.25, height: halfSize * 0.25 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {centerIcon || (
          <div className="text-white font-bold text-lg">
            Skills
          </div>
        )}
      </motion.div>
    ),
    [halfSize, centerIcon]
  );

  return (
    <div className="flex justify-center items-center p-4 bg-transparent">
      <div className="relative" style={{ width: size, height: size }}>
        {orbits.map((orbit, index) => {
          const orbitDiameter = size * orbit.radiusFactor;
          const orbitRadius = orbitDiameter / 2;
          const icons = orbit.icons || [{ icon: orbit.icon }];
          const angleStep = (2 * Math.PI) / icons.length;

          return (
            <React.Fragment key={orbit.id || index}>
              {/* Orbit Line */}
              <div
                className="absolute rounded-full border border-dashed"
                style={{
                  width: orbitDiameter,
                  height: orbitDiameter,
                  top: halfSize - orbitRadius,
                  left: halfSize - orbitRadius,
                  borderColor: orbit.orbitColor || "rgba(255, 255, 255, 0.2)",
                  borderWidth: orbit.orbitThickness || 1,
                }}
              />

              {/* Rotating Container */}
              <motion.div
                className="absolute inset-0"
                style={{ width: size, height: size }}
                animate={{ rotate: 360 }}
                transition={rotationTransition(orbit.speed)}
              >
                {/* Multiple Icons */}
                {icons.map((iconData, iconIndex) => {
                  const angle = iconIndex * angleStep;
                  const x = Math.cos(angle) * orbitRadius;
                  const y = Math.sin(angle) * orbitRadius;
                  
                  return (
                    <div
                      key={iconIndex}
                      className="absolute"
                      style={{
                        top: halfSize + y,
                        left: halfSize + x,
                        transform: `translate(-50%, -50%)`,
                      }}
                    >
                      <motion.div
                        className="rounded-full shadow-md grid place-content-center bg-secondary-dark/80 backdrop-blur-sm border border-white/10 hover:border-accent-blue/50 transition-colors"
                        style={{ width: orbit.iconSize, height: orbit.iconSize }}
                        animate={{ rotate: -360 }}
                        transition={rotationTransition(orbit.speed)}
                        whileHover={{ scale: 1.1 }}
                        title={iconData.label}
                      >
                        <img 
                          src={iconData.src} 
                          alt={iconData.label} 
                          className="w-6 h-6 object-contain"
                          style={{
                            filter: /github|express/i.test(iconData.label || '') ? 'invert(1) brightness(1.2)' : 'none'
                          }}
                        />
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </React.Fragment>
          );
        })}

        {/* Central Icon */}
        <div className="absolute inset-0 grid place-content-center z-10">
          {CenterIcon}
        </div>
      </div>
    </div>
  );
};

export default BeamCircle;