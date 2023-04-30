import { ConnectorProvider } from './ConnectorProvider';
import { Connector } from './Connector';
import { ConnectorName, ApiName } from './enums';

describe('ConnectorProvider', () => {
  test('should provide Xero Connector', () => {
    const xeroConnector = ConnectorProvider.getApi(ConnectorName.XERO, {
      baseUrl: 'mockedXeroBaseUrl',
    });

    expect(xeroConnector).toBeInstanceOf(Connector);
    expect(xeroConnector).toHaveProperty(ApiName.GetBalanceSheet);
  });

  test('should provide MYOB Connector', () => {
    const myobConnector = ConnectorProvider.getApi(ConnectorName.MYOB, {
      baseUrl: 'mockedMYOBBaseUrl',
    });

    expect(myobConnector).toBeInstanceOf(Connector);
    expect(myobConnector).toHaveProperty(ApiName.GetBalanceSheet);
  });

  test('should throw error for invalid name', () => {
    expect(() => {
      ConnectorProvider.getApi('INVALID_TYPE' as ConnectorName, {
        baseUrl: 'mockedXeroBaseUrl',
      });
    }).toThrow();
  });

  test('should throw error for incomplete data', () => {
    expect(() => {
      ConnectorProvider.getApi(ConnectorName.XERO, {
        baseUrl: '',
      });
    }).toThrow();
  });

  test('should provide Connector with simulation', () => {
    const xeroConnector = ConnectorProvider.getApi(ConnectorName.XERO, {
      baseUrl: 'mockedXeroBaseUrl',
      simulation: true,
    });

    expect(xeroConnector['simulation']).toBe(true);
  });
});
