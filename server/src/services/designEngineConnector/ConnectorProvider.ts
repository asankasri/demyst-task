import { Connector } from './Connector';
import { ConnectorInterface } from './ConnectorInterface';

type data = {
  baseUrl: string;
  headers?: Record<string, unknown>;
  simulation?: boolean;
};

export class ConnectorProvider {
  static getApi(data: data): ConnectorInterface {
    const { baseUrl, headers = {}, simulation = false } = data;

    if (!baseUrl) {
      throw Error('Invalid information');
    }

    return new Connector(baseUrl, headers, simulation);
  }
}
