import { ValidatorFactoryInterface } from '../ValidatorFactoryInterface';
import { ValidatorInterface } from '../ValidatorInterface';
import { DummyValidator } from '../DummyValidator';
import { GetBalanceSheetValidator } from './validators/GetBalanceSheetValidator';
import { MYOBValidator } from './MYOBValidator';
import { ApiName } from '../enums';

export class MYOBValidatorFactory implements ValidatorFactoryInterface {
  create(apiName: ApiName): ValidatorInterface {
    if (apiName === ApiName.GetBalanceSheet) {
      return new MYOBValidator(new GetBalanceSheetValidator());
    }

    return new MYOBValidator(new DummyValidator());
  }
}
