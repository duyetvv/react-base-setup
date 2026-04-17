import { useEffect, type RefObject } from "react";

/**
 * @name useClickOutside
 * @description A hook to detect clicks outside of a specified element.
 * @param {RefObject<HTMLElement>} ref - The ref of the element to detect clicks outside of.
 * @param {(event: MouseEvent | TouchEvent) => void} handler - The function to call when a click outside is detected.
 *
 * @example
 * const MyComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const ref = useRef(null);
 *
 *   useClickOutside(ref, () => setIsOpen(false));
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsOpen(true)}>Open</button>
 *       {isOpen && (
 *         <div ref={ref} style={{ border: '1px solid black', padding: '1rem', marginTop: '1rem' }}>
 *           <p>Click outside this box to close it.</p>
 *         </div>
 *       )}
 *     </div>
 *   );
 * };
 */
const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
