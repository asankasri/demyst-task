import HttpClient, { HttpClientInterface } from '../../../utils/httpClient';

import { ConnectorInterface } from '../ConnectorInterface';
import { ApiPaths } from './enums';
import { ApiMethod } from '../enums';

export class XeroApi implements ConnectorInterface {
  private httpClient: HttpClientInterface;

  constructor(private baseUrl: string, private headers: any) {
    this.httpClient = new HttpClient(this.baseUrl, this.headers);
  }

  public async getBalanceSheet(request: any): Promise<any> {
    const response = await this.performRequest(
      ApiMethod.Get,
      ApiPaths.GetBalanceSheet,
      request,
      undefined,
    );

    return response;
  }

  private async performRequest(method: string, path: string, params: any, body: any) {
    let url = path;
    if (params && Object.keys(params).length) {
      url = `${url}?${Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')}`;
    }

    if (method === ApiMethod.Post) {
      return this.performPostRequest(url, body);
    }
    if (method === ApiMethod.Put) {
      return this.performPutRequest(url, body);
    }
    if (method === ApiMethod.Patch) {
      return this.performPatchRequest(url, body);
    }
    if (method === ApiMethod.Delete) {
      return this.performDeleteRequest(url);
    }
    return this.performGetRequest(url);
  }

  private async performGetRequest(url: string) {
    const response = await this.httpClient.get(url);
    return response.data;
  }

  private async performPostRequest(url: string, body: any) {
    const response = await this.httpClient.post(url, body);
    return response.data;
  }

  private async performPutRequest(url: string, body: any) {
    const response = await this.httpClient.put(url, body);
    return response.data;
  }

  private async performPatchRequest(url: string, body: any) {
    const response = await this.httpClient.patch(url, body);
    return response.data;
  }

  private async performDeleteRequest(url: string) {
    const response = await this.httpClient.delete(url);
    return response.data;
  }
}
