import { IHttpService } from "./interface";

class Request {
  private httpService: IHttpService;

  constructor(httpService: IHttpService) {
    this.httpService = httpService;
  }

  async get(url: string): Promise<any> {
    const response = await this.httpService.get(url);
    return response.data;
  }

  async post(url: string, data?: any): Promise<any> {
    const response = await this.httpService.post(url, data);
    return response.data;
  }

  async put(url: string, data?: any): Promise<any> {
    const response = await this.httpService.put(url, data);
    return response.data;
  }

  async delete(url: string): Promise<any> {
    const response = await this.httpService.delete(url);
    return response.data;
  }
}

export default Request;