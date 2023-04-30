import { MYOBParser } from '../myobConnector/MYOBParser';
import { DummyParser } from '../DummyParser';

describe('MYOBParser', () => {
  const dummyParser = new DummyParser();
  const parser = new MYOBParser(dummyParser);

  test('convertRequest() should do parsing', () => {
    const request = { param1: 'value1', param2: 'value2' };

    expect(parser.convertRequest(request)).toEqual(request);
  });

  test('convertResponse() should do parsing', () => {
    const response = { success: true };

    expect(parser.convertResponse(response)).toEqual({ success: true });
  });
});
