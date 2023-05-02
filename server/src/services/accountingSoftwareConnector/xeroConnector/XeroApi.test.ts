import { XeroApi } from '../xeroConnector/XeroApi';
import { ApiPaths } from '../xeroConnector/enums';
import { HttpMethod } from '../../../enums';
import {
  xeroGetBalanceSheetConvertedRequest,
  xeroGetBalanceSheetResponse,
} from '../__test_data__/xero';

const mockGet = jest.fn().mockResolvedValueOnce({ data: xeroGetBalanceSheetResponse });

const mockPost = jest.fn();
const mockPut = jest.fn();
const mockPatch = jest.fn();

jest.mock('../../../utils/httpClient', () => {
  return jest.fn().mockImplementation(() => {
    return { post: mockPost, get: mockGet, put: mockPut, patch: mockPatch };
  });
});

const baseUrl = 'https://mockedXeroBaseUrl';
const headers = {};

describe('XeroApi', () => {
  const api = new XeroApi(baseUrl, headers);
  const performRequestSpy = jest.spyOn(XeroApi.prototype as any, 'performRequest');
  const performGetRequestSpy = jest.spyOn(XeroApi.prototype as any, 'performGetRequest');

  test('getBalanceSheet() should return expected result', async () => {
    const balanceSheet = await api.getBalanceSheet(xeroGetBalanceSheetConvertedRequest);

    expect(performRequestSpy).toHaveBeenLastCalledWith(
      HttpMethod.Get,
      ApiPaths.GetBalanceSheet,
      xeroGetBalanceSheetConvertedRequest,
      undefined,
    );
    expect(performGetRequestSpy).toHaveBeenLastCalledWith(
      `${ApiPaths.GetBalanceSheet}?startDate=${xeroGetBalanceSheetConvertedRequest.startDate}&endDate=${xeroGetBalanceSheetConvertedRequest.endDate}`,
    );
    expect(balanceSheet).toEqual(xeroGetBalanceSheetResponse);
  });
});
