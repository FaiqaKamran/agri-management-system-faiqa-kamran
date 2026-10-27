const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error("Storage parse error:", error);
    return fallback;
  }
};

export const readStorage = (key, fallback = []) => {
  try {
    const value = localStorage.getItem(key);
    return safeParse(value, fallback);
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key}:`, error);
    return false;
  }
};

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
  }
};