import { ConnectorBuilder } from './ConnectorBuilder';
import { Connector } from './Connector';

import { XeroApi } from './xeroConnector/XeroApi';
import { XeroParserFactory } from './xeroConnector/XeroParserFactory';
import { XeroValidatorFactory } from './xeroConnector/XeroValidatorFactory';

describe('ConnectorBuilder', () => {
  test('should build a Connector', () => {
    const xeroBuilder = new ConnectorBuilder(new XeroApi('mockedXeroBaseUrl', {}));
    const xeroParserFactory = new XeroParserFactory();
    const xeroValidatorFactory = new XeroValidatorFactory();

    const xeroBuild = xeroBuilder
      .withParserFactory(xeroParserFactory)
      .withValidatorFactory(xeroValidatorFactory)
      .build();

    expect(xeroBuilder.withParserFactory(xeroParserFactory)).toBeInstanceOf(ConnectorBuilder);
    expect(xeroBuilder.withValidatorFactory(xeroValidatorFactory)).toBeInstanceOf(ConnectorBuilder);
    expect(xeroBuild).toBeInstanceOf(Connector);
  });
});
