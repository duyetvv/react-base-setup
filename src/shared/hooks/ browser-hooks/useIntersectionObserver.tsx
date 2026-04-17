import { useState, useEffect, type RefObject } from 'react';

/**
 * @name useIntersectionObserver
 * @description A hook to observe an element's intersection with the viewport or a parent element.
 * @param {RefObject<Element>} elementRef - The ref of the element to observe.
 * @param {IntersectionObserverInit} options - The options for the IntersectionObserver.
 * @returns {IntersectionObserverEntry | null} - The IntersectionObserverEntry object, or null if not intersecting.
 *
 * @example
 * const MyComponent = () => {
 *   const ref = useRef(null);
 *   const entry = useIntersectionObserver(ref, { threshold: 0.1 });
 *
 *   const isVisible = entry?.isIntersecting;
 *
 *   return (
 *     <div ref={ref}>
 *       {isVisible ? 'I am visible!' : 'I am not visible.'}
 *     </div>
 *   );
 * };
 */
const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  options: IntersectionObserverInit,
): IntersectionObserverEntry | null => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const node = elementRef?.current;
    if (!node) return;

    const observer = new IntersectionObserver(([ioEntry]) => {
      setEntry(ioEntry);
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, options]);

  return entry;
};

export default useIntersectionObserver;
