
import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cursorRef.current || !cursorRingRef.current) return;
    
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Main cursor dot
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      
      // Delayed larger ring
      setTimeout(() => {
        cursorRing.style.left = `${clientX}px`;
        cursorRing.style.top = `${clientY}px`;
      }, 100);
    };
    
    const handleMouseOver = () => {
      cursor.classList.add('cursor-hover');
      cursorRing.classList.add('cursor-ring-hover');
    };
    
    const handleMouseOut = () => {
      cursor.classList.remove('cursor-hover');
      cursorRing.classList.remove('cursor-ring-hover');
    };
    
    document.addEventListener('mousemove', moveCursor);
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef}
        className="custom-cursor fixed w-3 h-3 rounded-full bg-elecblue z-50 pointer-events-none mix-blend-screen hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      <div 
        ref={cursorRingRef}
        className="custom-cursor-ring fixed w-8 h-8 rounded-full border border-techpurple z-40 pointer-events-none mix-blend-screen hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      
      <style>{`
        .custom-cursor {
          transition: width 0.2s, height 0.2s, background-color 0.2s;
        }
        
        .custom-cursor-ring {
          transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s;
        }
        
        .cursor-hover {
          width: 5px;
          height: 5px;
          background-color: #B14EFF;
        }
        
        .cursor-ring-hover {
          width: 28px;
          height: 28px;
          border-color: #B14EFF;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
