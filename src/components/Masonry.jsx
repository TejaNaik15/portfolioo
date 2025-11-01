import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const Masonry = ({ items }) => {
  const columns = useMedia(
    ['(min-width:1200px)', '(min-width:768px)', '(min-width:640px)', '(min-width:480px)'],
    [5, 4, 3, 2],
    2
  );

  const [containerRef, { width }] = useMeasure();

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const gap = columns <= 2 ? 6 : 8;
    const columnWidth = (width - gap * (columns - 1)) / columns;
    const baseHeight = columns <= 2 ? 90 : 100;
    const randomHeight = columns <= 2 ? 40 : 60;

    return items.map((child, index) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = baseHeight + (index % 3) * (randomHeight / 3);
      const y = colHeights[col];

      colHeights[col] += height + gap;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const maxHeight = Math.max(...grid.map(item => item.y + item.h)) + 20;

  return (
    <div ref={containerRef} className="list" style={{ height: `${maxHeight}px`, minHeight: '60vh' }}>
      {grid.map((item, index) => (
        <motion.div
          key={item.id}
          className="item-wrapper"
          style={{
            left: item.x,
            top: item.y,
            width: item.w,
            height: item.h,
          }}
          initial={{ opacity: 0, scale: 0.8, y: item.y + 50 }}
          animate={{ opacity: 1, scale: 1, y: item.y }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.05,
            ease: "easeOut"
          }}
          whileHover={{ scale: 1.03, y: item.y - 3 }}
          onClick={() => window.open(item.url, '_blank')}
        >
          <div className="item-img">
            <div className="flex flex-col items-center justify-center h-full p-1 sm:p-2">
              <img
                src={item.img}
                alt={item.name}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain mb-1 flex-shrink-0"
                style={{
                  filter: /github|express/i.test(item.name) ? 'invert(1) brightness(1.2)' : 'none'
                }}
              />
              <span className="text-white text-[10px] sm:text-xs md:text-sm font-medium text-center leading-tight px-1">
                {item.name}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Masonry;