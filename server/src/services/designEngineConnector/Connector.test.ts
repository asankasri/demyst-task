import { when } from 'jest-when';

import { Connector } from './Connector';
import { ApiPaths } from './enums';

const baseUrl = 'https://mockedBaseUrl';
const headers = {};

const mockRequestBody = {
  businessDetails: {
    name: 'MyBusiness',
    establishedYear: 2000,
  },
  balanceSheet: [],
  loanAmount: 1000000,
  preAssessment: 60,
};

const mockGet = jest.fn();
when(mockGet)
  .calledWith(ApiPaths.GetDecision, mockRequestBody)
  .mockResolvedValueOnce({ data: true });

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

  describe('getDecision', () => {
    test('should return expected result for valid request', async () => {
      const connector = new Connector(baseUrl, headers);
      const decision = await connector.getDecision(mockRequestBody);

      expect(decision).toEqual(true);
    });

    test('should return simulated data if simulation is set', async () => {
      const requestBody = {
        ...mockRequestBody,
        loanAmount: 1234567890,
      };

      const connector = new Connector(baseUrl, headers, true);
      const decision = await connector.getDecision(requestBody);

      expect(decision).toEqual(false);
    });
  });
});
