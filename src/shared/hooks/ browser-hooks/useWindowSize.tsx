import { useState, useLayoutEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * @name useWindowSize
 * @description A hook to get the current width and height of the window.
 * @returns {WindowSize} - An object with the current `width` and `height` of the window.
 *
 * @example
 * const MyComponent = () => {
 *   const { width, height } = useWindowSize();
 *
 *   return (
 *     <div>
 *       <p>Window width: {width}px</p>
 *       <p>Window height: {height}px</p>
 *     </div>
 *   );
 * };
 */
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
