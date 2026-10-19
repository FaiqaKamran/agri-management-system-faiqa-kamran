import { useEffect, useState } from "react";
import {
  getStorage,
  setStorage,
} from "../services/storageService";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() =>
    getStorage(key, initialValue)
  );

  useEffect(() => {
    setStorage(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;