'use client'

import { useState, useRef, useEffect } from 'react'

export default function TextBlock({ initialContent = '', isSelected, onSelect }) {
  const [content, setContent] = useState(initialContent)
  const [dimensions, setDimensions] = useState({ width: 300, height: 100 })
  const isResizingRef = useRef(false)
  const textareaRef = useRef(null)
  const startPositionRef = useRef(null)
  const startDimensionsRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(null);

  const handleDragStart = (e) => {
    // Prevent dragging if clicking inside the textarea
    if (e.target.tagName.toLowerCase() === "textarea") return;
  
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return;
  
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
  
    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
  
    dragStartRef.current = { x: e.clientX, y: e.clientY }; // Update reference
  };

  const handleDragEnd = () => {
  isDraggingRef.current = false;
  document.removeEventListener("mousemove", handleDragMove);
  document.removeEventListener("mouseup", handleDragEnd);
};
  


  const handleResizeStart = (e, corner) => {
    e.preventDefault()
    e.stopPropagation()
    isResizingRef.current = true
    startPositionRef.current = { x: e.clientX, y: e.clientY }
    startDimensionsRef.current = { ...dimensions }

    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', handleResizeEnd)
  }

  const handleResizeMove = (e) => {
    if (!isResizingRef.current) return

    const deltaX = e.clientX - startPositionRef.current.x
    const deltaY = e.clientY - startPositionRef.current.y

    setDimensions({
      width: Math.max(200, startDimensionsRef.current.width + deltaX),
      height: Math.max(100, startDimensionsRef.current.height + deltaY)
    })
  }

  const handleResizeEnd = () => {
    isResizingRef.current = false
    document.removeEventListener('mousemove', handleResizeMove)
    document.removeEventListener('mouseup', handleResizeEnd)
  }

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
    }
  }, [])

  // Corner dot component
  const ResizeDot = ({ position }) => (
    <div
      className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full 
                  ${isSelected ? 'opacity-100' : 'opacity-0'}
                  ${position === 'top-left' ? 'top-0 left-0 -translate-x-2.5 -translate-y-2.5 cursor-nw-resize' : ''}
                  ${position === 'top-right' ? 'top-0 right-0 translate-x-2.5 -translate-y-2.5 cursor-ne-resize' : ''}
                  ${position === 'bottom-left' ? 'bottom-0 left-0 -translate-x-2.5 translate-y-2.5 cursor-sw-resize' : ''}
                  ${position === 'bottom-right' ? 'bottom-0 right-0 translate-x-2.5 translate-y-2.5 cursor-se-resize' : ''}`}
      onMouseDown={(e) => handleResizeStart(e, position)}
    />
  )

  return (
    <div 
      className={`absolute ${isSelected ? ' ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
      onMouseDown={handleDragStart}  // dragging is triggered by the container
      style={{ 
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: typeof dimensions.width === 'number' ? `${dimensions.width}px` : dimensions.width,
        height: `${dimensions.height}px`,
        border: isSelected ? '5px solid rgba(0,0,0,0)' : '5px solid rgba(0,0,0,0)', // add thin border when selected
        cursor: isSelected ? 'grab' : 'default'
      }}
    >
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing..."
        className="w-full h-full p-2 focus:outline-none resize-none border-0"  // no border here
        onMouseDown={(e) => e.stopPropagation()}  // prevent dragging when typing
      />
  
      {/* Resize dots */}
      <ResizeDot position="top-left" />
      <ResizeDot position="top-right" />
      <ResizeDot position="bottom-left" />
      <ResizeDot position="bottom-right" />
    </div>
  )
  
  
} 