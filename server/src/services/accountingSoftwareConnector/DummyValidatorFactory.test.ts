import { DummyValidatorFactory } from './DummyValidatorFactory';
import { DummyValidator } from './DummyValidator';

describe('DummyValidatorFactory', () => {
  test('should create a DummyValidator', () => {
    const validatorFactory = new DummyValidatorFactory();
    const validator = validatorFactory.create();

    expect(validator).toBeInstanceOf(DummyValidator);
  });
});
