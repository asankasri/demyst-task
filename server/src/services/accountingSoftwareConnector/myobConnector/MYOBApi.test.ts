import { MYOBApi } from '../myobConnector/MYOBApi';
import { ApiPaths } from '../myobConnector/enums';
import { ApiMethod } from '../enums';
import {
  myobGetBalanceSheetConvertedRequest,
  myobGetBalanceSheetResponse,
} from '../__test_data__/myob';

const mockGet = jest.fn().mockResolvedValueOnce({ data: myobGetBalanceSheetResponse });

const mockPost = jest.fn();
const mockPut = jest.fn();
const mockPatch = jest.fn();

jest.mock('../../../utils/httpClient', () => {
  return jest.fn().mockImplementation(() => {
    return { post: mockPost, get: mockGet, put: mockPut, patch: mockPatch };
  });
});

describe('MYOBApi', () => {
  const baseUrl = 'https://mockedMYOBBaseUrl';
  const headers = {};

  const api = new MYOBApi(baseUrl, headers);
  const performRequestSpy = jest.spyOn(MYOBApi.prototype as any, 'performRequest');
  const performGetRequestSpy = jest.spyOn(MYOBApi.prototype as any, 'performGetRequest');

  test('getBalanceSheet() should return expected result', async () => {
    const balanceSheet = await api.getBalanceSheet(myobGetBalanceSheetConvertedRequest);

    expect(performRequestSpy).toHaveBeenLastCalledWith(
      ApiMethod.Get,
      ApiPaths.GetBalanceSheet,
      myobGetBalanceSheetConvertedRequest,
      undefined,
    );
    expect(performGetRequestSpy).toHaveBeenLastCalledWith(
      `${ApiPaths.GetBalanceSheet}?StartDate=${myobGetBalanceSheetConvertedRequest.StartDate}&EndDate=${myobGetBalanceSheetConvertedRequest.EndDate}`,
    );
    expect(balanceSheet).toEqual(myobGetBalanceSheetResponse);
  });
});
