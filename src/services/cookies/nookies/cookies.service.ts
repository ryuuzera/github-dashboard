import { parseCookies, setCookie } from "nookies";
import { Cookies, ICookiesService } from "../@types/cookies.interface";

class NookiesService implements ICookiesService {
  private cookies: Cookies;

  constructor() {
    this.cookies = parseCookies();
  }

  getCookie(key: string): string | undefined {
    return this.cookies[key];
  }

  setCookie(key: string, value: string, options?: any): void {
    setCookie(null, key, value, options);
    this.cookies[key] = value;
  }
}

export default NookiesService;