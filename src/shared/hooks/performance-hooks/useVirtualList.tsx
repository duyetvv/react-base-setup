import { useState, useMemo } from 'react';

interface UseVirtualListOptions<T> {
  list: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

/**
 * @name useVirtualList
 * @description A hook for efficiently rendering large lists of items.
 * @param {UseVirtualListOptions<T>} options - The options for the virtual list.
 * @returns {{ visibleItems: { item: T; style: React.CSSProperties }[], containerStyle: React.CSSProperties, onScroll: (e: React.UIEvent<HTMLElement>) => void }} - An object with the visible items, container style, and scroll handler.
 *
 * @example
 * const MyListComponent = () => {
 *   const largeList = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
 *   const { visibleItems, containerStyle, onScroll } = useVirtualList({
 *     list: largeList,
 *     itemHeight: 30,
 *     containerHeight: 300,
 *   });
 *
 *   return (
 *     <div style={{ height: '300px', overflow: 'auto' }} onScroll={onScroll}>
 *       <div style={containerStyle}>
 *         {visibleItems.map(({ item, style }) => (
 *           <div key={item} style={style}>
 *             {item}
 *           </div>
 *         ))}
 *       </div>
 *     </div>
 *   );
 * };
 */
const useVirtualList = <T>({
  list,
  itemHeight,
  containerHeight,
  overscan = 5,
}: UseVirtualListOptions<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = list.length * itemHeight;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    list.length - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = useMemo(() => {
    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push({
        item: list[i],
        style: {
          position: 'absolute',
          top: `${i * itemHeight}px`,
          width: '100%',
          height: `${itemHeight}px`,
        },
      });
    }
    return items;
  }, [startIndex, endIndex, list, itemHeight]);

  const containerStyle = {
    height: `${totalHeight}px`,
    position: 'relative',
  };

  const onScroll = (e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return {
    visibleItems,
    containerStyle,
    onScroll,
  };
};

export default useVirtualList;
