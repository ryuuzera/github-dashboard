export interface Cookies {
  [key: string]: string;
}

export interface ICookiesService {
  getCookie(key: string): string | undefined;
  setCookie(key: string, value: string, options?: any): void;
}
