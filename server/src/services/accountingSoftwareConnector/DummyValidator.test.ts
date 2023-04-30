import { DummyValidator } from './DummyValidator';

describe('DummyValidator', () => {
  const validator = new DummyValidator();

  test('validate() must return true always', () => {
    const request = { param1: 'value1', param2: 'value2' };

    expect(validator.validate(request)).toBeTruthy();
  });
});
