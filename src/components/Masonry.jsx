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
    ['(min-width:1200px)', '(min-width:768px)', '(min-width:480px)'],
    [5, 4, 3],
    2
  );

  const [containerRef, { width }] = useMeasure();

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    const gap = 16;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = (columnWidth + gap) * col;
      const height = 120 + Math.random() * 80; // Random heights for masonry effect
      const y = colHeights[col];

      colHeights[col] += height + gap;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  return (
    <div ref={containerRef} className="list" style={{ height: '80vh' }}>
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
            delay: index * 0.1,
            ease: "easeOut"
          }}
          whileHover={{ scale: 1.05, y: item.y - 5 }}
          onClick={() => window.open(item.url, '_blank')}
        >
          <div className="item-img">
            <div className="flex flex-col items-center justify-center h-full p-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2"
                style={{
                  filter: /github|express/i.test(item.name) ? 'invert(1) brightness(1.2)' : 'none'
                }}
              />
              <span className="text-white text-sm md:text-base font-medium text-center">
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