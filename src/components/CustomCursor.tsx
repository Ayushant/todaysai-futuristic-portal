import { useEffect, useState, useRef, useCallback, memo } from "react";

interface CustomCursorProps {
  color?: string;
  trailColor?: string;
}

const CustomCursor = memo(function CustomCursor({ 
  color = "#00FFFF", 
  trailColor = "rgba(0, 255, 255, 0.2)" 
}: CustomCursorProps) {
  // Use refs for values that don't need to trigger re-renders
  const positionRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  
  // Previous position for calculating velocity
  const previousPositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  
  // State for UI changes that need to trigger renders
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  // Animation frame reference for cleanup
  const rafRef = useRef<number | null>(null);

  // Create trail elements
  useEffect(() => {
    // Clear any existing trails
    trailsRef.current = [];
    
    // Create 5 trail elements
    const trailCount = 5;
    const trailContainer = document.createElement('div');
    trailContainer.style.position = 'fixed';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '9998';
    
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.style.position = 'absolute';
      trail.style.width = '8px';
      trail.style.height = '8px';
      trail.style.borderRadius = '50%';
      trail.style.backgroundColor = trailColor;
      trail.style.transform = 'translate(-50%, -50%) scale(0.5)';
      trail.style.opacity = `${0.7 - (i * 0.15)}`;
      trail.style.pointerEvents = 'none';
      trail.style.transition = `transform 0.3s ease-out, opacity 0.3s ease-out`;
      
      trailContainer.appendChild(trail);
      trailsRef.current.push(trail);
    }
    
    document.body.appendChild(trailContainer);
    
    return () => {
      document.body.removeChild(trailContainer);
    };
  }, [trailColor]);

  // Memoized event handlers to prevent recreating functions on each render
  const handleMouseMove = useCallback((e: MouseEvent) => {
    previousPositionRef.current = { ...positionRef.current };
    positionRef.current = { x: e.clientX, y: e.clientY };
    
    // Calculate velocity for potential effects
    velocityRef.current = {
      x: positionRef.current.x - previousPositionRef.current.x,
      y: positionRef.current.y - previousPositionRef.current.y
    };
  }, []);

  const handleMouseDown = useCallback(() => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHidden(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHidden(false);
  }, []);

  // Optimized link hover handler with event delegation
  const handleDocumentMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.closest('[role="button"]')) {
      setLinkHovered(true);
    }
  }, []);
  
  const handleDocumentMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.closest('[role="button"]')) {
      setLinkHovered(false);
    }
  }, []);

  // Animation loop using requestAnimationFrame for smooth cursor movement
  useEffect(() => {
    const updateCursorPosition = () => {
      if (cursorRef.current && dotRef.current) {
        const { x, y } = positionRef.current;
        
        // Apply transform with translate for better performance
        cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        
        // Update trail positions with a delay effect
        trailsRef.current.forEach((trail, index) => {
          setTimeout(() => {
            trail.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.7 - (index * 0.1)})`;
          }, index * 40);
        });
        
        // Apply subtle velocity-based effects for dynamic feel
        if (Math.abs(velocityRef.current.x) > 3 || Math.abs(velocityRef.current.y) > 3) {
          const magnitude = Math.sqrt(
            velocityRef.current.x * velocityRef.current.x + 
            velocityRef.current.y * velocityRef.current.y
          );
          
          // Scale based on velocity (subtle effect)
          const scale = Math.min(1 + magnitude * 0.003, 1.15);
          dotRef.current.style.transform = `scale(${scale})`;
        } else {
          dotRef.current.style.transform = 'scale(1)';
        }
      }
      
      rafRef.current = requestAnimationFrame(updateCursorPosition);
    };
    
    rafRef.current = requestAnimationFrame(updateCursorPosition);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Event listeners setup with passive option for better performance
  useEffect(() => {
    // Use passive: true for events that don't call preventDefault
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleDocumentMouseOver, { passive: true });
    document.addEventListener("mouseout", handleDocumentMouseOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleDocumentMouseOver);
      document.removeEventListener("mouseout", handleDocumentMouseOut);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseLeave, handleMouseEnter, handleDocumentMouseOver, handleDocumentMouseOut]);

  // Compute classes once
  const cursorClasses = `custom-cursor ${hidden ? "hidden" : ""} ${
    clicked ? "clicked" : ""
  } ${linkHovered ? "link-hovered" : ""}`;
  return (
    <div
      ref={cursorRef}
      className={cursorClasses}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        borderColor: color,
        willChange: "transform", // Hint to browser for optimization
      }}
    >
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
});

export default CustomCursor;
