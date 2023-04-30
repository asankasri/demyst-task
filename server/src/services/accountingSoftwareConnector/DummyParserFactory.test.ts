import { DummyParserFactory } from './DummyParserFactory';
import { DummyParser } from './DummyParser';

describe('DummyParserFactory', () => {
  test('should create a DummyParser', () => {
    const parserFactory = new DummyParserFactory();
    const parser = parserFactory.create();

    expect(parser).toBeInstanceOf(DummyParser);
  });
});
