import { ConnectorInterface } from './ConnectorInterface';
import { Connector } from './Connector';
import { DummyParserFactory } from './DummyParserFactory';
import { DummyValidatorFactory } from './DummyValidatorFactory';

import { ParserFactoryInterface } from './ParserFactoryInterface';
import { ValidatorFactoryInterface } from './ValidatorFactoryInterface';

export class ConnectorBuilder {
  private parserFactory: ParserFactoryInterface;
  private validatorFactory: ValidatorFactoryInterface;

  constructor(private api: ConnectorInterface) {
    this.parserFactory = new DummyParserFactory();
    this.validatorFactory = new DummyValidatorFactory();
  }

  withParserFactory(parserFactory: ParserFactoryInterface): ConnectorBuilder {
    this.parserFactory = parserFactory;
    return this;
  }

  withValidatorFactory(validatorFactory: ValidatorFactoryInterface): ConnectorBuilder {
    this.validatorFactory = validatorFactory;
    return this;
  }

  build(): ConnectorInterface {
    if (!this.api) {
      throw new Error('Error');
    }

    return new Connector(this.api, this.parserFactory, this.validatorFactory);
  }
}
