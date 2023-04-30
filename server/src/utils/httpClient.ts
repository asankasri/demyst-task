/* eslint-disable no-unused-vars */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface HttpClientInterface {
  get(url: string): Promise<AxiosResponse<any>>;
  post(url: string, body: any): Promise<AxiosResponse<any>>;
  put(url: string, body: any): Promise<AxiosResponse<any>>;
  patch(url: string, body: any): Promise<AxiosResponse<any>>;
  delete(url: string): Promise<AxiosResponse<any>>;
}

export default class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, headers: Record<string, unknown>) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers,
    });
  }

  get(url: string): any {
    return this.axiosInstance.get(url);
  }

  post(url: string, body: Record<string, unknown>): any {
    return this.axiosInstance.post(url, body);
  }

  put(url: string, body: Record<string, unknown>): any {
    return this.axiosInstance.put(url, body);
  }

  patch(url: string, body: Record<string, unknown>): any {
    return this.axiosInstance.patch(url, body);
  }

  delete(url: string): any {
    return this.axiosInstance.delete(url);
  }
}
