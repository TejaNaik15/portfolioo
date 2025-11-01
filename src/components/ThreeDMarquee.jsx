"use client";

import { motion } from "framer-motion";
import React from "react";

export const ThreeDMarquee = ({
  images,
  className = "",
  cols = 4,
  onImageClick,
}) => {
  const duplicatedImages = [...images, ...images];
  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, index) =>
    duplicatedImages.slice(index * groupSize, (index + 1) * groupSize)
  );

  const handleImageClick = (image, globalIndex) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_blank");
    }
  };

  return (
    <section
      className={`mx-auto block h-[500px] max-sm:h-[350px] 
        overflow-hidden rounded-2xl bg-secondary-dark/30 backdrop-blur-sm border border-white/10 ${className}`}
    >
      <div
        className="flex w-full h-full items-center justify-center"
        style={{
          transform: "rotateX(55deg) rotateY(0deg) rotateZ(45deg)",
        }}
      >
        <div className="w-full overflow-hidden scale-75 sm:scale-90">
          <div
            className={`relative grid h-full w-full origin-center 
              grid-cols-2 sm:grid-cols-${cols} gap-3 sm:gap-4 transform`}
          >
            {imageGroups.map((imagesInGroup, idx) => (
              <motion.div
                key={`column-${idx}`}
                animate={{ y: idx % 2 === 0 ? 80 : -80 }}
                transition={{
                  duration: idx % 2 === 0 ? 12 : 18,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="flex flex-col items-center gap-4 sm:gap-6 relative"
              >
                <div className="absolute left-0 top-0 h-full w-0.5 bg-white/10" />
                {imagesInGroup.map((image, imgIdx) => {
                  const globalIndex = idx * groupSize + imgIdx;
                  const isClickable = image.href || onImageClick;

                  return (
                    <div key={`img-${imgIdx}`} className="relative">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-white/10" />
                      <motion.div
                        whileHover={{ y: -8, scale: 1.05 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`bg-secondary-dark/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 shadow-xl hover:shadow-2xl hover:border-accent-blue/50 transition-all duration-300 ${
                          isClickable ? "cursor-pointer" : ""
                        }`}
                        onClick={() => handleImageClick(image, globalIndex)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                          style={{
                            filter: /github|express/i.test(image.alt || '') ? 'invert(1) brightness(1.2)' : 'none'
                          }}
                        />
                        <div className="text-white text-xs sm:text-sm text-center mt-2 font-medium">
                          {image.alt}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};