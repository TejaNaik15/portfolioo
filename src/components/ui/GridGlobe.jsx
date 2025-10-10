import React from "react";

export const GridGlobe = () => {
  return (
    <div className="absolute -left-5 top-36 flex size-full items-center justify-center md:top-40">
      <div className="relative mx-auto h-96 w-full max-w-7xl overflow-hidden px-4">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full select-none bg-gradient-to-b from-transparent to-[rgb(4,7,29)]" />
        <div className="absolute z-10 h-72 w-full md:h-full flex items-center justify-center">
          <div className="globe-container">
            <div className="globe">
              <div className="globe-sphere">
                <div className="globe-outer-shadow"></div>
                <div className="globe-world-wrap">
                  <div className="globe-world"></div>
                </div>
                <div className="globe-inner-shadow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .globe-container {
          perspective: 1000px;
          width: 200px;
          height: 200px;
        }
        
        .globe {
          width: 200px;
          height: 200px;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate 20s linear infinite;
        }
        
        .globe-sphere {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #4a90e2, #1e3a8a, #0f172a);
          overflow: hidden;
          box-shadow: 
            inset -20px -20px 50px rgba(0,0,0,0.5),
            0 0 50px rgba(74, 144, 226, 0.3);
        }
        
        .globe-outer-shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, transparent 40%, rgba(0,0,0,0.6));
          z-index: 3;
        }
        
        .globe-world-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          z-index: 1;
        }
        
        .globe-world {
          position: absolute;
          top: 0;
          left: 0;
          width: 400%;
          height: 100%;
          background: 
            linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.8) 5%, transparent 10%),
            linear-gradient(90deg, transparent 15%, rgba(34, 197, 94, 0.6) 20%, transparent 25%),
            linear-gradient(90deg, transparent 30%, rgba(34, 197, 94, 0.7) 35%, transparent 40%),
            linear-gradient(90deg, transparent 50%, rgba(34, 197, 94, 0.5) 55%, transparent 60%),
            linear-gradient(90deg, transparent 70%, rgba(34, 197, 94, 0.8) 75%, transparent 80%),
            linear-gradient(90deg, transparent 85%, rgba(34, 197, 94, 0.6) 90%, transparent 95%);
          animation: worldRotate 20s linear infinite;
          border-radius: 50%;
        }
        
        .globe-inner-shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 70% 70%, transparent 40%, rgba(0,0,0,0.4));
          z-index: 2;
        }
        
        @keyframes rotate {
          0% { transform: rotateY(0deg) rotateX(-10deg); }
          100% { transform: rotateY(360deg) rotateX(-10deg); }
        }
        
        @keyframes worldRotate {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        
        .globe::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent, rgba(74, 144, 226, 0.1), transparent);
          animation: rotate 15s linear infinite reverse;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};