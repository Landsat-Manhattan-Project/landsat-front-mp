import Cookies from "js-cookie";

type Keys = "auth";

const getCookie = (key: Keys): string | undefined => {
  return Cookies.get(key);
};

const addCookie = (
  key: Keys,
  value: string,
  options?: Cookies.CookieAttributes
): void => {
  Cookies.set(key, value, options);
};

const removeCookie = (key: Keys, options?: Cookies.CookieAttributes): void => {
  Cookies.remove(key, options);
};

export { getCookie, addCookie, removeCookie };
