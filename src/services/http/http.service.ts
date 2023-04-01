import { IHttpService } from './@interfaces/interface';

class Request {
  private httpService: IHttpService;

  constructor(httpService: IHttpService) {
    this.httpService = httpService;
  }

  async get(url: string, data?: any): Promise<any> {
    const response = await this.httpService.get(url, data);
    return response;
  }

  async post(url: string, data?: any): Promise<any> {
    const response = await this.httpService.post(url, data);
    return response;
  }

  async put(url: string, data?: any): Promise<any> {
    const response = await this.httpService.put(url, data);
    return response;
  }

  async delete(url: string): Promise<any> {
    const response = await this.httpService.delete(url);
    return response;
  }
}

export default Request;
