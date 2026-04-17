import { useState, useEffect } from 'react';

/**
 * @name useMediaQuery
 * @description A hook to track the state of a media query.
 * @param {string} query - The media query string to watch.
 * @returns {boolean} - A boolean indicating whether the media query matches.
 *
 * @example
 * const MyComponent = () => {
 *   const isMobile = useMediaQuery('(max-width: 768px)');
 *
 *   return (
 *     <div>
 *       {isMobile ? 'You are on a mobile device.' : 'You are on a desktop device.'}
 *     </div>
 *   );
 * };
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    documentChangeHandler();
    mediaQueryList.addEventListener('change', documentChangeHandler);

    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
