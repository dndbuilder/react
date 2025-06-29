import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";

type InitialValueType<T> = T | (() => T);

const useLocalstorage = <T>(
  key: string,
  initialValue: InitialValueType<T>,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [T, Dispatch<SetStateAction<T>>] => {
  // Initialize with the provided initialValue to avoid hydration mismatches
  const [storedValue, setStoredValue] = useState<T>(
    initialValue instanceof Function ? initialValue() : initialValue
  );

  // Load from localStorage only on the client side
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage once on mount (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(deserialize(item));
      }
      setIsInitialized(true);
    } catch (error) {
      // console.error(error);
      setIsInitialized(true);
    }
  }, [key, deserialize]);

  const prevKeyRef = useRef(key);

  // Use useEffect to update localStorage when value changes (client-side only)
  useEffect(() => {
    if (typeof window === "undefined" || !isInitialized) return;

    try {
      if (prevKeyRef.current !== key) {
        window.localStorage.removeItem(prevKeyRef.current);
      }

      prevKeyRef.current = key;
      window.localStorage.setItem(key, serialize(storedValue));
    } catch (error) {
      // console.error(error);
    }
  }, [storedValue, serialize, key, isInitialized]);

  return [storedValue, setStoredValue];
};

export default useLocalstorage;
