import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, X } from 'lucide-react';

const Input = (props) => (
  <input {...props} />
);

const CarouselItemCard = ({ skill, side }) => {
  const { distanceFromCenter, name, img, url } = skill;
  const distance = Math.abs(distanceFromCenter);
  const opacity = 1 - distance / 4;
  const scale = 1 - distance * 0.1;
  const yOffset = distanceFromCenter * 80;
  const xOffset = side === 'left' ? -distance * 40 : distance * 40;

  return (
    <motion.div
      className={`absolute flex items-center gap-3 px-4 py-2 ${
        side === 'left' ? 'flex-row-reverse' : 'flex-row'
      }`}
      animate={{
        opacity,
        scale,
        y: yOffset,
        x: xOffset,
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="rounded-full border border-white/20 p-2 bg-secondary-dark/80 backdrop-blur-sm">
        <img 
          src={img} 
          alt={name} 
          className="w-8 h-8 object-contain"
          style={{
            filter: /github|express/i.test(name) ? 'invert(1) brightness(1.2)' : 'none'
          }}
        />
      </div>
      <div className={`flex flex-col ${side === 'left' ? 'text-right' : 'text-left'}`}>
        <span className="text-sm lg:text-base font-semibold text-white whitespace-nowrap">
          {name}
        </span>
      </div>
    </motion.div>
  );
};

const SkillsCarousel = ({ items, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [userScrolling, setUserScrolling] = useState(false);

  const rightSectionRef = useRef(null);
  const isInView = useInView(rightSectionRef, { margin: '-100px 0px -100px 0px' });
  const totalItems = items.length;
  const scrollTimeoutRef = useRef(null);

  // Auto-scroll effect with user scroll detection
  useEffect(() => {
    if (isPaused || totalItems === 0 || userScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, totalItems, userScrolling]);

  // Enhanced scroll listener to detect user scrolling
  useEffect(() => {
    const handleScroll = () => {
      setUserScrolling(true);
      setIsPaused(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set new timeout to resume after user stops scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setUserScrolling(false);
        setIsPaused(false);
      }, 1000); // Resume after 1 second of no scrolling
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const getVisibleItems = useCallback(() => {
    const visibleItems = [];
    if (totalItems === 0) return [];

    const itemsToShow = 7; // Show 7 items
    const half = Math.floor(itemsToShow / 2);

    for (let i = -half; i <= half; i++) {
      let index = currentIndex + i;
      if (index < 0) index += totalItems;
      if (index >= totalItems) index -= totalItems;

      visibleItems.push({
        ...items[index],
        originalIndex: index,
        distanceFromCenter: i,
      });
    }
    return visibleItems;
  }, [currentIndex, items, totalItems]);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const handleSelectSkill = (name) => {
    const index = items.findIndex((item) => item.name === name);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPaused(true);
      setUserScrolling(true);
      
      // Resume after selection
      setTimeout(() => {
        setUserScrolling(false);
        setIsPaused(false);
      }, 2000);
    }
    setSearchTerm(name);
    setShowDropdown(false);
  };

  const currentItem = items[currentIndex];

  return (
    <div className={`space-y-12 ${className}`}>
      <div className="flex flex-col xl:flex-row max-w-7xl mx-auto px-4 md:px-8 gap-8 justify-center items-center">
        
        {/* Left Section - Skills Carousel (Hidden on mobile) */}
        <motion.div
          className="relative w-full max-w-md xl:max-w-2xl h-[400px] flex items-center justify-center hidden xl:flex"
          onMouseEnter={() => !searchTerm && setIsPaused(true)}
          onMouseLeave={() => !searchTerm && setIsPaused(false)}
          initial={{ x: '-100%', opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 0.8 }}
        >
          {getVisibleItems().map((skill) => (
            <CarouselItemCard
              key={skill.name}
              skill={skill}
              side="left"
            />
          ))}
        </motion.div>

        {/* Middle Section - Current Skill and Search */}
        <div className="flex flex-col text-center gap-4 max-w-md">
          {currentItem && (
            <div className="flex flex-col items-center justify-center gap-2 mt-4">
              <div className="p-3 bg-secondary-dark/80 backdrop-blur-sm border border-white/20 rounded-full">
                <img 
                  src={currentItem.img} 
                  alt={currentItem.name} 
                  className="w-12 h-12 object-contain"
                  style={{
                    filter: /github|express/i.test(currentItem.name) ? 'invert(1) brightness(1.2)' : 'none'
                  }}
                />
              </div>
              <h3 className="text-xl xl:text-2xl font-bold text-accent-blue mt-2">
                {currentItem.name}
              </h3>
              <p className="text-sm xl:text-base text-text-muted">
                Technology Stack
              </p>
            </div>
          )}

          {/* Search Bar */}
          <div className="mt-6 relative max-w-lg mx-auto">
            <div className="px-3 flex items-center relative">
              <Input
                type="text"
                value={searchTerm}
                placeholder="Search Skills..."
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  setShowDropdown(val.length > 0);
                  if (val === '') {
                    setIsPaused(false);
                    setUserScrolling(false);
                  }
                }}
                onFocus={() => {
                  if (searchTerm.length > 0) setShowDropdown(true);
                  setIsPaused(true);
                  setUserScrolling(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowDropdown(false), 200);
                }}
                className="flex-grow outline-none text-white bg-secondary-dark/80 backdrop-blur-sm px-4 placeholder-text-muted text-base rounded-full border border-white/20 pr-10 pl-10 py-2 cursor-pointer focus:border-accent-blue/50 transition-colors"
              />
              <Search className="absolute text-text-muted w-4 h-4 left-6 pointer-events-none" />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setShowDropdown(false);
                    setIsPaused(false);
                    setUserScrolling(false);
                  }}
                  className="absolute right-6 text-text-muted hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Dropdown */}
            {showDropdown && filteredItems.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-secondary-dark/90 backdrop-blur-sm rounded-lg border border-white/20 z-20 max-h-60 overflow-y-auto shadow-xl">
                {filteredItems.slice(0, 8).map((skill) => (
                  <div
                    key={skill.name}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectSkill(skill.name);
                    }}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors duration-150 rounded-lg m-2"
                  >
                    <img 
                      src={skill.img} 
                      alt={skill.name} 
                      className="w-6 h-6 object-contain"
                      style={{
                        filter: /github|express/i.test(skill.name) ? 'invert(1) brightness(1.2)' : 'none'
                      }}
                    />
                    <span className="text-white font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Skills Carousel */}
        <motion.div
          ref={rightSectionRef}
          className="relative w-full max-w-md xl:max-w-2xl h-[400px] flex items-center justify-center"
          onMouseEnter={() => !searchTerm && setIsPaused(true)}
          onMouseLeave={() => !searchTerm && setIsPaused(false)}
          initial={{ x: '100%', opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 0.8 }}
        >
          {getVisibleItems().map((skill) => (
            <CarouselItemCard
              key={skill.name}
              skill={skill}
              side="right"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsCarousel;