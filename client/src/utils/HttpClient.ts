import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface HttpClientInterface {
  get(url: string): Promise<AxiosResponse<any>>;
  post(url: string, body: any): Promise<AxiosResponse<any>>;
  put(url: string, body: any): Promise<AxiosResponse<any>>;
  patch(url: string, body: any): Promise<AxiosResponse<any>>;
  delete(url: string): Promise<AxiosResponse<any>>;
}

export type HttpClientRequestBody = {
  [key: string]: string | number | boolean | FormData;
};

export default class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(private baseUrl: string, private headers?: object) {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
    });
  }
  get(url: string, params?: HttpClientRequestBody) {
    return this.axiosInstance.get(url, { params });
  }

  post(url: string, body: HttpClientRequestBody) {
    return this.axiosInstance.post(url, body);
  }

  put(url: string, body: HttpClientRequestBody) {
    return this.axiosInstance.put(url, body);
  }

  patch(url: string, body: HttpClientRequestBody) {
    return this.axiosInstance.patch(url, body);
  }

  delete(url: string) {
    return this.axiosInstance.delete(url);
  }
}
