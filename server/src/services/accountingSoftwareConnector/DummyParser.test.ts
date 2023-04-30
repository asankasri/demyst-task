import { DummyParser } from './DummyParser';

describe('DummyParser', () => {
  const parser = new DummyParser();

  test('convertRequest() must never do any parsing at all', () => {
    const request = { param1: 'value1', param2: 'value2' };

    expect(parser.convertRequest(request)).toEqual(request);
  });

  test('convertResponse() must never do any parsing at all', () => {
    const response = { success: true };

    expect(parser.convertResponse(response)).toEqual(response);
  });
});
