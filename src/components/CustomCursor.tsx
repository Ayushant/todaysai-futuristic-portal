import { useEffect, useState, useRef, useCallback, memo } from "react";

interface CustomCursorProps {
  color?: string;
}

const CustomCursor = memo(function CustomCursor({ 
  color = "#8B5CF6" // Premium purple color
}: CustomCursorProps) {
  // Use refs for values that don't need to trigger re-renders
  const positionRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  // State for UI changes that need to trigger renders
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  // Animation frame reference for cleanup
  const rafRef = useRef<number | null>(null);
  // Memoized event handlers to prevent recreating functions on each render
  const handleMouseMove = useCallback((e: MouseEvent) => {
    positionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseDown = useCallback(() => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
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
  // Simple animation loop for smooth cursor movement
  useEffect(() => {
    const updateCursorPosition = () => {
      if (cursorRef.current) {
        const { x, y } = positionRef.current;
        
        // Apply transform with translate for better performance
        cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
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
  const cursorClasses = `premium-cursor ${hidden ? "hidden" : ""} ${
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
        willChange: "transform", // Hint to browser for optimization
      }}
    >
      <div
        ref={dotRef}
        className="premium-cursor-dot"
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
});

export default CustomCursor;
