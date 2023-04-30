import { MYOBParserFactory } from '../myobConnector/MYOBParserFactory';
import { MYOBParser } from '../myobConnector/MYOBParser';
import { GetBalanceSheetParser } from './parsers/GetBalanceSheetParser';
import { ApiName } from '../enums/apiName';

describe('MYOBParserFactory', () => {
  test('should create a MYOBParser', () => {
    const parserFactory = new MYOBParserFactory();
    const parser = parserFactory.create(ApiName.GetBalanceSheet);

    expect(parser).toBeInstanceOf(MYOBParser);
    expect(parser['apiParser']).toBeInstanceOf(GetBalanceSheetParser);
  });
});
