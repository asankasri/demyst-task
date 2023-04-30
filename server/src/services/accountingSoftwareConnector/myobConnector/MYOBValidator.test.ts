import { MYOBValidator } from '../myobConnector/MYOBValidator';
import { DummyValidator } from '../DummyValidator';

describe('MYOBValidator', () => {
  const dummyValidator = new DummyValidator();
  const validator = new MYOBValidator(dummyValidator);

  test('validate() should return boolean', () => {
    const request = { param1: 'value1', param2: 'value2' };

    expect(validator.validate(request)).toBeTruthy();
  });
});
