import { when } from 'jest-when';

import { Connector } from './Connector';
import { DummyParserFactory } from './DummyParserFactory';
import { DummyValidatorFactory } from './DummyValidatorFactory';
import { ApiMethod } from './enums';

import { XeroApi } from './xeroConnector/XeroApi';
import { ApiPaths as XeroApiPaths } from './xeroConnector/enums';
import { XeroParserFactory } from './xeroConnector/XeroParserFactory';
import { XeroValidatorFactory } from './xeroConnector/XeroValidatorFactory';

import { MYOBApi } from './myobConnector/MYOBApi';
import { ApiPaths as MYOBApiPaths } from './myobConnector/enums';
import { MYOBParserFactory } from './myobConnector/MYOBParserFactory';
import { MYOBValidatorFactory } from './myobConnector/MYOBValidatorFactory';

import {
  xeroGetBalanceSheetRequest,
  xeroGetBalanceSheetConvertedRequest,
  xeroGetBalanceSheetResponse,
  xeroGetBalanceSheetConvertedResponse,
} from './__test_data__/xero';

import {
  myobGetBalanceSheetRequest,
  myobGetBalanceSheetConvertedRequest,
  myobGetBalanceSheetResponse,
  myobGetBalanceSheetConvertedResponse,
} from './__test_data__/myob';

import simulatedBalanceSheet from './__simulation_data__/balanceSheet';

const xeroBaseUrl = 'https://mockedXeroBaseUrl';
const xeroHeaders = {};

const myobBaseUrl = 'https://mockedMYOBBaseUrl';
const myobHeaders = {};

const mockGet = jest.fn();
when(mockGet)
  .calledWith(
    `${XeroApiPaths.GetBalanceSheet}?startDate=${xeroGetBalanceSheetConvertedRequest.startDate}&endDate=${xeroGetBalanceSheetConvertedRequest.endDate}`,
  )
  .mockResolvedValueOnce({ data: xeroGetBalanceSheetResponse })
  .calledWith(
    `${MYOBApiPaths.GetBalanceSheet}?StartDate=${myobGetBalanceSheetConvertedRequest.StartDate}&EndDate=${myobGetBalanceSheetConvertedRequest.EndDate}`,
  )
  .mockResolvedValueOnce({ data: myobGetBalanceSheetResponse });

const mockPost = jest.fn();
const mockPut = jest.fn();
const mockPatch = jest.fn();

jest.mock('../../utils/httpClient', () => {
  return jest.fn().mockImplementation(() => {
    return { post: mockPost, get: mockGet, put: mockPut, patch: mockPatch };
  });
});

describe('Connector', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const xeroApi = new XeroApi(xeroBaseUrl, xeroHeaders);
  const xeroParserFactory = new XeroParserFactory();
  const xeroValidatorFactory = new XeroValidatorFactory();

  test('should able to call getters', () => {
    const dummyParserFactory = new DummyParserFactory();
    const dummyValidatorFactory = new DummyValidatorFactory();

    const connector = new Connector(xeroApi, dummyParserFactory, dummyValidatorFactory);

    expect(connector.getApi()).toBeInstanceOf(XeroApi);
    expect(connector.getParserFactory()).toBeInstanceOf(DummyParserFactory);
    expect(connector.getValidatorFactory()).toBeInstanceOf(DummyValidatorFactory);
  });

  test('should able to set simulation', () => {
    const connector = new Connector(
      xeroApi,
      new DummyParserFactory(),
      new DummyValidatorFactory(),
      true,
    );

    expect(connector.getSimulation()).toBe(true);
  });

  describe('Xero Connector', () => {
    const xeroConnector = new Connector(xeroApi, xeroParserFactory, xeroValidatorFactory);
    const expectedErrorObj = {
      response: {
        data: {
          error: { statusCode: 400, name: 'ValidationError', message: 'Validation failed' },
        },
      },
    };
    const performRequestSpy = jest.spyOn(XeroApi.prototype as any, 'performRequest');
    const performGetRequestSpy = jest.spyOn(XeroApi.prototype as any, 'performGetRequest');

    describe('getBalanceSheet', () => {
      test('should return expected result for valid request', async () => {
        const balanceSheet = await xeroConnector.getBalanceSheet(xeroGetBalanceSheetRequest);

        expect(performRequestSpy).toHaveBeenLastCalledWith(
          ApiMethod.Get,
          XeroApiPaths.GetBalanceSheet,
          xeroGetBalanceSheetConvertedRequest,
          undefined,
        );
        expect(performGetRequestSpy).toHaveBeenLastCalledWith(
          `${XeroApiPaths.GetBalanceSheet}?startDate=${xeroGetBalanceSheetConvertedRequest.startDate}&endDate=${xeroGetBalanceSheetConvertedRequest.endDate}`,
        );
        expect(balanceSheet).toEqual(xeroGetBalanceSheetConvertedResponse);
      });

      test('should return error for invalid request', async () => {
        let thrownError;
        try {
          await xeroConnector.getBalanceSheet({
            fromDate: 'INVALID_DATE',
          });
        } catch (error) {
          thrownError = error;
        }

        const errObj = { ...expectedErrorObj };
        errObj.response.data.error.message = 'Invalid fromDate value';
        expect(thrownError).toEqual(errObj);
      });

      test('should return simulated data if simulation is set', async () => {
        const simulatedXeroConnector = new Connector(
          xeroApi,
          xeroParserFactory,
          xeroValidatorFactory,
          true,
        );

        const balanceSheet = await simulatedXeroConnector.getBalanceSheet(
          xeroGetBalanceSheetRequest,
        );

        expect(performRequestSpy).not.toHaveBeenCalled();
        expect(performGetRequestSpy).not.toHaveBeenCalled();
        expect(balanceSheet).toEqual(simulatedBalanceSheet);
      });
    });
  });

  describe('MYOB Connector', () => {
    const myobApi = new MYOBApi(myobBaseUrl, myobHeaders);
    const myobParserFactory = new MYOBParserFactory();
    const myobValidatorFactory = new MYOBValidatorFactory();

    const myobConnector = new Connector(myobApi, myobParserFactory, myobValidatorFactory);
    const expectedErrorObj = {
      response: {
        data: {
          error: { statusCode: 400, name: 'ValidationError', message: 'Validation failed' },
        },
      },
    };
    const performRequestSpy = jest.spyOn(MYOBApi.prototype as any, 'performRequest');
    const performGetRequestSpy = jest.spyOn(MYOBApi.prototype as any, 'performGetRequest');

    describe('getBalanceSheet', () => {
      test('should return expected result for valid request', async () => {
        const balanceSheet = await myobConnector.getBalanceSheet(myobGetBalanceSheetRequest);

        expect(performRequestSpy).toHaveBeenLastCalledWith(
          ApiMethod.Get,
          MYOBApiPaths.GetBalanceSheet,
          myobGetBalanceSheetConvertedRequest,
          undefined,
        );
        expect(performGetRequestSpy).toHaveBeenLastCalledWith(
          `${MYOBApiPaths.GetBalanceSheet}?StartDate=${myobGetBalanceSheetConvertedRequest.StartDate}&EndDate=${myobGetBalanceSheetConvertedRequest.EndDate}`,
        );
        expect(balanceSheet).toEqual(myobGetBalanceSheetConvertedResponse);
      });

      test('should return error for invalid request', async () => {
        let thrownError;
        try {
          await myobConnector.getBalanceSheet({
            fromDate: 'INVALID_DATE',
          });
        } catch (error) {
          thrownError = error;
        }

        const errObj = { ...expectedErrorObj };
        errObj.response.data.error.message = 'Invalid fromDate value';
        expect(thrownError).toEqual(errObj);
      });
    });
  });
});
