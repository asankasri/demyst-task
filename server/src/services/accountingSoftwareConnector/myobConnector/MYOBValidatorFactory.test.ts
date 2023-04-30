import { MYOBValidatorFactory } from '../myobConnector/MYOBValidatorFactory';
import { MYOBValidator } from '../myobConnector/MYOBValidator';
import { GetBalanceSheetValidator } from './validators/GetBalanceSheetValidator';
import { ApiName } from '../enums/apiName';

describe('MYOBValidatorFactory', () => {
  test('should create a MYOBValidator', () => {
    const validatorFactory = new MYOBValidatorFactory();
    const validator = validatorFactory.create(ApiName.GetBalanceSheet);

    expect(validator).toBeInstanceOf(MYOBValidator);
    expect(validator['apiValidator']).toBeInstanceOf(GetBalanceSheetValidator);
  });
});
