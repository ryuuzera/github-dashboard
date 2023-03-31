import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IHttpService } from "./interface";

class AxiosService implements IHttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  get(url: string, config?: object): Promise<any> {
    return this.axiosInstance.get(url, config);
  }

  post(url: string, data?: any, config?: object): Promise<any> {
    return this.axiosInstance.post(url, data, config);
  }

  put(url: string, data?: any, config?: object): Promise<any> {
    return this.axiosInstance.put(url, data, config);
  }

  delete(url: string, config?: object): Promise<any> {
    return this.axiosInstance.delete(url, config);
  }
}

export default AxiosService;