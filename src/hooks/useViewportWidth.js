import { useState, useEffect } from 'react';

export function useViewportWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Пустий масив залежностей, щоб хук спрацював лише один раз

  return width;
}