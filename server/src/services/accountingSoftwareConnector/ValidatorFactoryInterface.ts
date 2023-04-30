import { ValidatorInterface } from './ValidatorInterface';
import { ApiName } from './enums';

export interface ValidatorFactoryInterface {
  create(apiName: ApiName): ValidatorInterface;
}
