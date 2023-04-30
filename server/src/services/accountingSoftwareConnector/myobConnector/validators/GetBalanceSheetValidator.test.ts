import { GetBalanceSheetValidator } from '../../myobConnector/validators/GetBalanceSheetValidator';
import { myobGetBalanceSheetRequest } from '../../__data__/myob';

describe('MYOB GetBalanceSheetValidator', () => {
  const validator = new GetBalanceSheetValidator();

  test('validate() should return true for valid request params', () => {
    expect(validator.validate(myobGetBalanceSheetRequest)).toBeTruthy();
  });

  test('validate() should throw error for invalid request params', () => {
    expect(() => {
      validator.validate({ ...myobGetBalanceSheetRequest, fromDate: 'INVALID_DATE' });
    }).toThrow();
  });
});
