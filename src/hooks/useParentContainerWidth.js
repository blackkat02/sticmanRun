import { useRef, useEffect, useState, useCallback } from 'react';

export const useParentContainerWidth = () => {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    const handleResize = useCallback(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    return [ref, width];
};
