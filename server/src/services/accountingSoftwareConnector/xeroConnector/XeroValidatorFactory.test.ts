import { XeroValidatorFactory } from '../xeroConnector/XeroValidatorFactory';
import { XeroValidator } from '../xeroConnector/XeroValidator';
import { GetBalanceSheetValidator } from './validators/GetBalanceSheetValidator';
import { ApiName } from '../enums/apiName';

describe('XeroValidatorFactory', () => {
  test('should create a XeroValidator', () => {
    const validatorFactory = new XeroValidatorFactory();
    const validator = validatorFactory.create(ApiName.GetBalanceSheet);

    expect(validator).toBeInstanceOf(XeroValidator);
    expect(validator['apiValidator']).toBeInstanceOf(GetBalanceSheetValidator);
  });
});
