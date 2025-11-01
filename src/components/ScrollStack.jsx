"use client";
import React, { useEffect, useRef, useState } from "react";

const ScrollStack = ({
  cards,
  backgroundColor = "bg-primary-dark",
  cardHeight = "60vh",
  animationDuration = "0.5s",
  sectionHeightMultiplier = 3,
  intersectionThreshold = 0.1,
  className = "",
}) => {
  const scrollableSectionRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const cardCount = Math.min(cards.length, 5);

  const cardStyle = {
    height: cardHeight,
    maxHeight: "500px",
    borderRadius: "20px",
    transition: `transform ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1), opacity ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1)`,
    willChange: "transform, opacity",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: intersectionThreshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          if (!sectionRef.current || !cardsContainerRef.current) return;

          const sectionRect = sectionRef.current.getBoundingClientRect();
          const parentRect = scrollableSectionRef.current?.getBoundingClientRect();
          const viewportHeight = parentRect?.height ?? window.innerHeight;

          const sectionTop = sectionRect.top - (parentRect?.top ?? 0);
          const sectionHeight = sectionRef.current.offsetHeight;
          const scrollableDistance = sectionHeight - viewportHeight;

          let progress = 0;
          if (sectionTop <= 0 && Math.abs(sectionTop) <= scrollableDistance) {
            progress = Math.abs(sectionTop) / scrollableDistance;
          } else if (sectionTop <= 0) {
            progress = 1;
          }

          let newActiveIndex = 0;
          const progressPerCard = 1 / cardCount;
          for (let i = 0; i < cardCount; i++) {
            if (progress >= progressPerCard * (i + 1)) {
              newActiveIndex = i + 1;
            }
          }

          setActiveCardIndex(Math.min(newActiveIndex, cardCount - 1));
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    const scrollElement = scrollableSectionRef.current;
    scrollElement?.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollElement?.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [cardCount, sectionHeightMultiplier, intersectionThreshold]);

  const getCardTransform = (index) => {
    const isVisible = isIntersecting && activeCardIndex >= index;
    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 0.95 + index * 0.02 : 0.9 + index * 0.05;
    let translateY = isMobile ? "50px" : "100px";

    if (isVisible) {
      translateY = isMobile ? `${40 - index * 15}px` : `${90 - index * 30}px`;
    }

    return {
      transform: `translateY(${translateY}) scale(${scale})`,
      opacity: isVisible ? (index === 0 ? 0.9 : 1) : 0,
      zIndex: 10 + index * 10,
      pointerEvents: isVisible ? "auto" : "none",
    };
  };

  return (
    <section
      ref={scrollableSectionRef}
      className="relative max-h-screen w-full overflow-y-scroll 
      scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 md:scrollbar-track-transparent"
    >
      <div
        ref={sectionRef}
        className={`relative ${className}`}
        style={{ height: `${sectionHeightMultiplier * 85}vh` }}
      >
        <div
          className={`sticky top-0 w-full h-screen flex items-center 
            justify-center overflow-hidden ${backgroundColor}`}
        >
          <div className="container px-4 md:px-6 lg:px-8 mx-auto h-full flex flex-col justify-center">
            <div
              ref={cardsContainerRef}
              className="relative w-full max-w-5xl mx-auto flex-shrink-0"
              style={{ height: window.innerWidth < 768 ? '50vh' : cardHeight }}
            >
              {cards.slice(0, 5).map((card, index) => {
                const cardTransform = getCardTransform(index);

                return (
                  <div
                    key={index}
                    className="absolute z-50 overflow-hidden shadow-xl 
                      transition-all duration-300 border border-white/10 bg-secondary-dark/70 backdrop-blur-sm
                      mx-2 md:mx-0"
                    style={{
                      ...cardStyle,
                      top: 0,
                      left: "50%",
                      transform: `translateX(-50%) ${cardTransform.transform}`,
                      width: "100%",
                      maxWidth: "100%",
                      opacity: cardTransform.opacity,
                      zIndex: cardTransform.zIndex,
                      pointerEvents: cardTransform.pointerEvents,
                    }}
                  >
                    <div
                      className="absolute inset-0 z-0 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20"
                      style={{
                        backgroundImage: card.backgroundImage ? `url('${card.backgroundImage}')` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundBlendMode: "overlay",
                      }}
                    />

                    {card.badge && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent-blue/20 backdrop-blur-sm text-white border border-accent-blue/30">
                          <span className="text-sm font-medium">
                            {card.badge}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full flex items-center">
                      {card.content ? (
                        <div className="w-full">{card.content}</div>
                      ) : (
                        <div className="max-w-lg w-full">
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 md:mb-4">
                            {card.title}
                          </h3>
                          {card.subtitle && (
                            <p className="text-base sm:text-lg text-white/80">
                              {card.subtitle}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollStack;