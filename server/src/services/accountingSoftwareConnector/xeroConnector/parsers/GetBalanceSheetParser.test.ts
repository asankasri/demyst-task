import { GetBalanceSheetParser } from '../../xeroConnector/parsers/GetBalanceSheetParser';
import {
  xeroGetBalanceSheetRequest,
  xeroGetBalanceSheetConvertedRequest,
  xeroGetBalanceSheetResponse,
  xeroGetBalanceSheetConvertedResponse,
} from '../../__data__/xero';

describe('Xero GetBalanceSheetParser', () => {
  const parser = new GetBalanceSheetParser();

  test('convertRequest() should do parsing', () => {
    expect(parser.convertRequest(xeroGetBalanceSheetRequest)).toEqual(
      xeroGetBalanceSheetConvertedRequest,
    );
  });

  test('convertResponse() should do parsing', () => {
    expect(parser.convertResponse(xeroGetBalanceSheetResponse)).toEqual(
      xeroGetBalanceSheetConvertedResponse,
    );
  });
});
