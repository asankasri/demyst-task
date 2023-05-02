import { ConnectorProvider } from './ConnectorProvider';
import { Connector } from './Connector';

describe('ConnectorProvider', () => {
  test('should provide the Connector', () => {
    const xeroConnector = ConnectorProvider.getApi({
      baseUrl: 'mockedBaseUrl',
    });

    expect(xeroConnector).toBeInstanceOf(Connector);
    expect(xeroConnector).toHaveProperty('getDecision');
  });

  test('should throw error for incomplete data', () => {
    expect(() => {
      ConnectorProvider.getApi({
        baseUrl: '',
      });
    }).toThrow();
  });

  test('should provide Connector with simulation', () => {
    const xeroConnector = ConnectorProvider.getApi({
      baseUrl: 'mockedBaseUrl',
      simulation: true,
    });

    expect(xeroConnector['simulation']).toBe(true);
  });
});
