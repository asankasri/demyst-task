import { XeroParser } from '../xeroConnector/XeroParser';
import { DummyParser } from '../DummyParser';

describe('XeroParser', () => {
  const dummyParser = new DummyParser();
  const parser = new XeroParser(dummyParser);

  test('convertRequest() should do parsing', () => {
    const request = { param1: 'value1', param2: 'value2' };

    expect(parser.convertRequest(request)).toEqual(request);
  });

  test('convertResponse() should do parsing', () => {
    const response = { success: true };

    expect(parser.convertResponse(response)).toEqual({ success: true });
  });
});
