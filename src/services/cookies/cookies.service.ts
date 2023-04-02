import { ICookiesService } from './@types/cookies.interface';

class CookiesManager implements ICookiesService {
  constructor(private cookieService: ICookiesService) {}

  getCookie(key: string): string | undefined {
    return this.cookieService.getCookie(key);
  }

  setCookie(key: string, value: string, options?: any): void {
    this.cookieService.setCookie(key, value);
  }
}

export default CookiesManager;
