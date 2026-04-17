import { useState, useCallback } from 'react';

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

interface UseAsyncReturnType<T> {
  execute: (...args: any[]) => Promise<T>;
  loading: boolean;
  data: T | null;
  error: Error | null;
}

/**
 * @name useAsync
 * @description A hook to manage the state of an asynchronous function.
 * @param {AsyncFunction<T>} asyncFunction - The asynchronous function to manage.
 * @returns {UseAsyncReturnType<T>} - An object with the `execute` function, and the `loading`, `data`, and `error` states.
 *
 * @example
 * const MyComponent = () => {
 *   const myAsyncFunction = async (id: number) => {
 *     const response = await fetch(`https://api.example.com/data/${id}`);
 *     if (!response.ok) {
 *       throw new Error('Network response was not ok');
 *     }
 *     return response.json();
 *   };
 *
 *   const { execute, loading, data, error } = useAsync(myAsyncFunction);
 *
 *   return (
 *     <div>
 *       <button onClick={() => execute(1)} disabled={loading}>
 *         {loading ? 'Loading...' : 'Load Data'}
 *       </button>
 *       {error && <p>Error: {error.message}</p>}
 *       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
 *     </div>
 *   );
 * };
 */
const useAsync = <T>(asyncFunction: AsyncFunction<T>): UseAsyncReturnType<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (...args: any[]) => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const result = await asyncFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return { execute, loading, data, error };
};

export default useAsync;
