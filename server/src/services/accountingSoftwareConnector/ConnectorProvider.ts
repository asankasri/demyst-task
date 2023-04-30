import { ConnectorBuilder } from './ConnectorBuilder';
import { ConnectorInterface } from './ConnectorInterface';
import { ConnectorName } from './enums';

import { XeroApi } from './xeroConnector/XeroApi';
import { XeroParserFactory } from './xeroConnector/XeroParserFactory';
import { XeroValidatorFactory } from './xeroConnector/XeroValidatorFactory';

import { MYOBApi } from './myobConnector/MYOBApi';
import { MYOBParserFactory } from './myobConnector/MYOBParserFactory';
import { MYOBValidatorFactory } from './myobConnector/MYOBValidatorFactory';

type data = {
  baseUrl: string;
  headers?: Record<string, unknown>;
  simulation?: boolean;
};

export class ConnectorProvider {
  static getApi(name: ConnectorName, data: data): ConnectorInterface {
    const { baseUrl, headers = {}, simulation = false } = data;

    if (!baseUrl) {
      throw Error('Invalid api information');
    }

    if (name === ConnectorName.XERO) {
      return new ConnectorBuilder(new XeroApi(baseUrl, headers))
        .withParserFactory(new XeroParserFactory())
        .withValidatorFactory(new XeroValidatorFactory())
        .withSimulation(simulation)
        .build();
    }

    if (name === ConnectorName.MYOB) {
      return new ConnectorBuilder(new MYOBApi(baseUrl, headers))
        .withParserFactory(new MYOBParserFactory())
        .withValidatorFactory(new MYOBValidatorFactory())
        .withSimulation(simulation)
        .build();
    }

    throw Error('Invalid api');
  }
}
