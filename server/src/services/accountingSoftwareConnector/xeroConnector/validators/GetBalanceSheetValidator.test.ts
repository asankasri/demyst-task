import { GetBalanceSheetValidator } from '../../xeroConnector/validators/GetBalanceSheetValidator';
import { xeroGetBalanceSheetRequest } from '../../__data__/xero';

describe('Xero GetBalanceSheetValidator', () => {
  const validator = new GetBalanceSheetValidator();

  test('validate() should return true for valid request params', () => {
    expect(validator.validate(xeroGetBalanceSheetRequest)).toBeTruthy();
  });

  test('validate() should throw error for invalid request params', () => {
    expect(() => {
      validator.validate({ ...xeroGetBalanceSheetRequest, fromDate: 'INVALID_DATE' });
    }).toThrow();
  });
});
