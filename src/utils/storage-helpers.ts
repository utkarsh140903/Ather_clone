// Local storage helper functions for quiz state management

/**
 * Save data to localStorage with a key
 */
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Load data from localStorage by key
 */
export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

/**
 * Remove data from localStorage by key
 */
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

// Quiz-specific storage keys
export const QUIZ_STATE_KEY = "ather_quiz_state";
export const QUIZ_RESULTS_KEY = "ather_quiz_results";

