type Keys = "auth";

const getDataLocal = (key: Keys): string | null => {
  return localStorage.getItem(key);
};

const saveDataLocal = (
  key: Keys,
  value: string,
  options?: Cookies.CookieAttributes
): void => {
  localStorage.setItem(key, value);
};

const removeDataLocal = (
  key: Keys,
  options?: Cookies.CookieAttributes
): void => {
  localStorage.removeItem(key);
};

export { getDataLocal, saveDataLocal, removeDataLocal };
