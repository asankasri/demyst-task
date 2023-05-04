import axios, { AxiosHeaders, AxiosResponse } from 'axios';

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
  constructor(private baseURL: string, private headers?: AxiosHeaders) {}

  private getFullURL(path: string) {
    return `${this.baseURL.replace(/^\/|\/$/g, '')}/${path.replace(/^\/|\/$/g, '')}`;
  }

  get(path: string, params?: HttpClientRequestBody) {
    return axios.get(this.getFullURL(path), {
      params,
      headers: this.headers
    });
  }

  post(path: string, body: HttpClientRequestBody) {
    return axios.post(this.getFullURL(path), body, {
      headers: this.headers
    });
  }

  put(path: string, body: HttpClientRequestBody) {
    return axios.put(this.getFullURL(path), body, {
      headers: this.headers
    });
  }

  patch(path: string, body: HttpClientRequestBody) {
    return axios.patch(this.getFullURL(path), body, {
      headers: this.headers
    });
  }

  delete(path: string) {
    return axios.delete(this.getFullURL(path), {
      headers: this.headers
    });
  }
}
