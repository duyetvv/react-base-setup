import { useState } from "react";

/**
 * @name useLocalStorage
 * @description A hook to manage state with localStorage, persisting it across page reloads.
 * @template T The type of the value to be stored.
 * @param {string} key The key under which the value is stored in localStorage.
 * @param {T} initialValue The initial value to use if there's no value in localStorage for the given key.
 * @returns {readonly [T, (newValue: T) => void]} A tuple containing the current value and a function to update it.
 *
 * @example
 * const UserSettings = () => {
 *   const [theme, setTheme] = useLocalStorage('theme', 'light');
 *
 *   const toggleTheme = () => {
 *     setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
 *   };
 *
 *   return (
 *     <button onClick={toggleTheme}>Current theme: {theme}</button>
 *   );
 * };
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue] as const;
}
