import React from "react";

export const useLocalStorage = (
  key: string
): [string | null, React.Dispatch<React.SetStateAction<string | null>>] => {
  const [value, setValue] = React.useState<string | null>(() => {
    const stored = localStorage.getItem(key);
    if (stored) return stored;
    return null;
  });

  React.useEffect(() => {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  }, [value, key]);

  return [value, setValue];
};
