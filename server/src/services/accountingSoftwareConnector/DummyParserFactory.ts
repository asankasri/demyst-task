import { ParserFactoryInterface } from './ParserFactoryInterface';
import { ParserInterface } from './ParserInterface';
import { DummyParser } from './DummyParser';

export class DummyParserFactory implements ParserFactoryInterface {
  create(): ParserInterface {
    return new DummyParser();
  }
}
