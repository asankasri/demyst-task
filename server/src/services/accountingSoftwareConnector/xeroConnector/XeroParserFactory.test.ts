import { XeroParserFactory } from '../xeroConnector/XeroParserFactory';
import { XeroParser } from '../xeroConnector/XeroParser';
import { GetBalanceSheetParser } from './parsers/GetBalanceSheetParser';
import { ApiName } from '../enums/apiName';

describe('XeroParserFactory', () => {
  test('should create a XeroParser', () => {
    const parserFactory = new XeroParserFactory();
    const parser = parserFactory.create(ApiName.GetBalanceSheet);

    expect(parser).toBeInstanceOf(XeroParser);
    expect(parser['apiParser']).toBeInstanceOf(GetBalanceSheetParser);
  });
});
