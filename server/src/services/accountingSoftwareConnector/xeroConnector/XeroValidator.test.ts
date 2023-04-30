import { XeroValidator } from '../xeroConnector/XeroValidator';
import { DummyValidator } from '../DummyValidator';

describe('XeroValidator', () => {
  const dummyValidator = new DummyValidator();
  const validator = new XeroValidator(dummyValidator);

  test('validate() should return boolean', () => {
    const request = { param1: 'value1', param2: 'value2' };

    expect(validator.validate(request)).toBeTruthy();
  });
});
