import { BalanceSheetItem } from './../services/accountingSoftwareConnector/types/getBalanceSheet';
import getPreAssessmentValue from './getPreAssessmentValue';

const mockBalanceSheet: BalanceSheetItem[] = [
  {
    year: 2023,
    month: 1,
    profitOrLoss: 100000,
    assetsValue: 25000,
  },
  {
    year: 2023,
    month: 2,
    profitOrLoss: 200000,
    assetsValue: 30000,
  },
  {
    year: 2023,
    month: 3,
    profitOrLoss: 3000000,
    assetsValue: 40000,
  },
  {
    year: 2023,
    month: 4,
    profitOrLoss: -150000,
    assetsValue: 30000,
  },
  {
    year: 2023,
    month: 5,
    profitOrLoss: 100000,
    assetsValue: 40000,
  },
];

describe('utils/calculatePreAssessmentValue', () => {
  beforeEach(() => {
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2023);
    jest.spyOn(Date.prototype, 'getMonth').mockReturnValue(5); // 5 is the index of June
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return default if teh balance sheet is empty', () => {
    const preAssessmentValue = getPreAssessmentValue({
      balanceSheet: [],
      loanAmount: 10000000,
    });

    expect(preAssessmentValue).toBe(20);
  });

  describe('when there is a profit', () => {
    test('should return 60', () => {
      const preAssessmentValue = getPreAssessmentValue({
        balanceSheet: mockBalanceSheet,
        loanAmount: 10000000,
      });

      expect(preAssessmentValue).toBe(60);
    });
  });

  describe('when there is a lost', () => {
    const balanceSheet = JSON.parse(JSON.stringify(mockBalanceSheet));
    balanceSheet[4].profitOrLoss = -500000000000000000;

    test('should return 100 if average asset value is greater than the loan amount', () => {
      const preAssessmentValue = getPreAssessmentValue({
        balanceSheet,
        loanAmount: 1000,
      });

      expect(preAssessmentValue).toBe(100);
    });

    test('should return default if average asset value is lesser than the loan amount', () => {
      const preAssessmentValue = getPreAssessmentValue({
        balanceSheet,
        loanAmount: 10000000,
      });

      expect(preAssessmentValue).toBe(20);
    });
  });

  test('should filter balance sheets of last 12 months', () => {
    const balanceSheet = mockBalanceSheet.map((item) => ({
      ...item,
      year: 2020,
    }));

    const preAssessmentValue = getPreAssessmentValue({
      balanceSheet,
      loanAmount: 10000000,
    });

    expect(preAssessmentValue).toBe(20);
  });
});
