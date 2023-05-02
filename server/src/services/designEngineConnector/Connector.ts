import HttpClient, { HttpClientInterface } from '../../utils/httpClient';
import { ConnectorInterface } from './ConnectorInterface';
import { GetDecisionRequest, GetDecisionResponse } from './types';
import { ApiPaths } from './enums';
import { HttpMethod } from '../../enums';
// import simulatedBalanceSheet from './__simulation_data__/balanceSheet';

export class Connector implements ConnectorInterface {
  private httpClient: HttpClientInterface;
  prototype: any;

  constructor(private baseUrl: string, private headers: any, private simulation: boolean = false) {
    this.httpClient = new HttpClient(this.baseUrl, this.headers);
  }

  public async getDecision(req: GetDecisionRequest): Promise<GetDecisionResponse> {
    const { loanAmount } = req;

    if (this.simulation) {
      return loanAmount.toString().length < 10;
    }

    const response = await this.performRequest(
      HttpMethod.Get,
      ApiPaths.GetDecision,
      undefined,
      req,
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

    if (method === HttpMethod.Post) {
      return this.performPostRequest(url, body);
    }
    if (method === HttpMethod.Put) {
      return this.performPutRequest(url, body);
    }
    if (method === HttpMethod.Patch) {
      return this.performPatchRequest(url, body);
    }
    if (method === HttpMethod.Delete) {
      return this.performDeleteRequest(url);
    }
    return this.performGetRequest(url, body);
  }

  private async performGetRequest(url: string, body: any) {
    const response = await this.httpClient.get(url, body);
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
