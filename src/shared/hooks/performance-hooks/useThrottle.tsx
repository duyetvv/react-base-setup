import { useRef, useCallback } from 'react';

/**
 * @name useThrottle
 * @description A hook to throttle a function.
 * @param {Function} callback - The function to throttle.
 * @param {number} delay - The throttle delay in milliseconds.
 * @returns {Function} - The throttled function.
 *
 * @example
 * const MyComponent = () => {
 *   const handleScroll = () => {
 *     console.log('Scrolled!');
 *   };
 *
 *   const throttledScroll = useThrottle(handleScroll, 1000);
 *
 *   useEffect(() => {
 *     window.addEventListener('scroll', throttledScroll);
 *     return () => {
 *       window.removeEventListener('scroll', throttledScroll);
 *     };
 *   }, [throttledScroll]);
 *
 *   return <div style={{ height: '200vh' }}>Scroll me</div>;
 * };
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const isThrottled = useRef(false);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      if (isThrottled.current) {
        return;
      }
      callback(...args);
      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, delay);
    },
    [callback, delay],
  );

  return throttledCallback;
}

export default useThrottle;
