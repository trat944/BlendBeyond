import { useState, useRef } from 'react';

export const useCalculateMenuPosition = (initialPosition: { x: number, y: number }) => {
  const [clickPosition, setClickPosition] = useState(initialPosition);
  const menuRef = useRef<HTMLDivElement>(null);

  const calculateMenuPosition = () => {
    const menuWidth = menuRef.current?.offsetWidth || 0;
    const windowWidth = window.innerWidth;
    const padding = 20;
    let left = clickPosition.x;

    if (left + menuWidth > windowWidth - padding) {
      left = windowWidth - menuWidth - padding;
    } else if (left < padding) {
      left = padding;
    }

    return {
      position: 'fixed',
      top: `${clickPosition.y}px`,
      left: `${left}px`,
    } as React.CSSProperties;
  };

  return {
    menuRef,
    clickPosition,
    setClickPosition,
    calculateMenuPosition,
  };
};