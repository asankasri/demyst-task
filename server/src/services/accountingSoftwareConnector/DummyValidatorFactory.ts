import { ValidatorFactoryInterface } from './ValidatorFactoryInterface';
import { ValidatorInterface } from './ValidatorInterface';
import { DummyValidator } from './DummyValidator';

export class DummyValidatorFactory implements ValidatorFactoryInterface {
  create(): ValidatorInterface {
    return new DummyValidator();
  }
}
