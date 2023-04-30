import { GetBalanceSheetParser } from '../../myobConnector/parsers/GetBalanceSheetParser';
import {
  myobGetBalanceSheetRequest,
  myobGetBalanceSheetConvertedRequest,
  myobGetBalanceSheetResponse,
  myobGetBalanceSheetConvertedResponse,
} from '../../__data__/myob';

describe('MYOB GetBalanceSheetParser', () => {
  const parser = new GetBalanceSheetParser();

  test('convertRequest() should do parsing', () => {
    expect(parser.convertRequest(myobGetBalanceSheetRequest)).toEqual(
      myobGetBalanceSheetConvertedRequest,
    );
  });

  test('convertResponse() should do parsing', () => {
    expect(parser.convertResponse(myobGetBalanceSheetResponse)).toEqual(
      myobGetBalanceSheetConvertedResponse,
    );
  });
});
