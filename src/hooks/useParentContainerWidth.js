import { useState, useEffect, useRef } from 'react';

export function useParentContainerWidth() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      console.log("start")
      console.log(ref.current)
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
        console.log(ref.current.offsetWidth)
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  console.log(ref)
  console.log(width)
  return [ref, width];
}