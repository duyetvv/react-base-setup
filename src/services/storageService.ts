/* eslint-disable @typescript-eslint/no-explicit-any */

type StorageType = 'localStorage' | 'sessionStorage';

const getStorage = (type: StorageType): Storage => {
  if (typeof window === 'undefined') {
    // Return a mock storage for SSR environments
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    };
  }
  return type === 'localStorage' ? window.localStorage : window.sessionStorage;
};

/**
 * Retrieves an item from storage and deserializes it from JSON.
 * @param key The key of the item to retrieve.
 * @param type The type of storage to use ('localStorage' or 'sessionStorage').
 * @returns The deserialized item, or null if not found.
 */
const get = <T>(key: string, type: StorageType = 'localStorage'): T | null => {
  try {
    const storage = getStorage(type);
    const value = storage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error(`Error getting item from ${type} for key "${key}":`, error);
    return null;
  }
};

/**
 * Serializes an item to JSON and stores it.
 * @param key The key to store the item under.
 * @param value The item to store (will be JSON.stringified).
 * @param type The type of storage to use ('localStorage' or 'sessionStorage').
 */
const set = <T>(key: string, value: T, type: StorageType = 'localStorage'): void => {
  try {
    const storage = getStorage(type);
    const serializedValue = JSON.stringify(value);
    storage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item in ${type} for key "${key}":`, error);
  }
};

/**
 * Removes an item from storage.
 * @param key The key of the item to remove.
 * @param type The type of storage to use ('localStorage' or 'sessionStorage').
 */
const remove = (key: string, type: StorageType = 'localStorage'): void => {
  try {
    const storage = getStorage(type);
    storage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from ${type} for key "${key}":`, error);
  }
};

/**
 * Clears all items from the specified storage.
 * @param type The type of storage to clear ('localStorage' or 'sessionStorage').
 */
const clear = (type: StorageType = 'localStorage'): void => {
  try {
    const storage = getStorage(type);
    storage.clear();
  } catch (error) {
    console.error(`Error clearing ${type}:`, error);
  }
};

export const storageService = {
  get,
  set,
  remove,
  clear,
};
