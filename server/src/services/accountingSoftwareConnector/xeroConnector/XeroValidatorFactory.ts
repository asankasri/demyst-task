import { ValidatorFactoryInterface } from '../ValidatorFactoryInterface';
import { ValidatorInterface } from '../ValidatorInterface';
import { DummyValidator } from '../DummyValidator';
import { GetBalanceSheetValidator } from './validators/GetBalanceSheetValidator';
import { XeroValidator } from './XeroValidator';
import { ApiName } from '../enums';

export class XeroValidatorFactory implements ValidatorFactoryInterface {
  // eslint-disable-next-line class-methods-use-this
  create(apiName: ApiName): ValidatorInterface {
    if (apiName === ApiName.GetBalanceSheet) {
      return new XeroValidator(new GetBalanceSheetValidator());
    }

    return new XeroValidator(new DummyValidator());
  }
}
