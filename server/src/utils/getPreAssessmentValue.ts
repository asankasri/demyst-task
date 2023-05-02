import { BalanceSheetItem } from './../services/accountingSoftwareConnector/types/getBalanceSheet';
import getYearAndMonthOfTwelveMonthsAgo from './getYearAndMonthOfTwelveMonthsAgo';

const getCurrentYear = () => new Date().getFullYear();

const getCurrentMonth = () => {
  const monthIndex = new Date().getFullYear();
  return monthIndex === 0 ? 1 : monthIndex + 1;
};

const getFilteredBalanceSheet = (balanceSheet: BalanceSheetItem[]): BalanceSheetItem[] => {
  const currentYear = getCurrentYear();
  const currentMonth = getCurrentMonth();
  const { year: lastYear, month: lastYearMonth } = getYearAndMonthOfTwelveMonthsAgo();

  return balanceSheet.filter(
    (item) =>
      (item.year === currentYear && item.month <= currentMonth) ||
      (item.year === lastYear && item.month >= lastYearMonth),
  );
};

export default function getPreAssessmentValue({
  loanAmount,
  balanceSheet,
}: {
  loanAmount: number;
  balanceSheet: BalanceSheetItem[];
}): number {
  const DEFAULT_PRE_ASSESSMENT_VALUE = 20;

  const filteredBalanceSheet = getFilteredBalanceSheet(balanceSheet);

  if (!filteredBalanceSheet || filteredBalanceSheet.length === 0) {
    return DEFAULT_PRE_ASSESSMENT_VALUE;
  }

  const totalProfit = filteredBalanceSheet.reduce((acc, item) => acc + item.profitOrLoss, 0);

  if (totalProfit > 0) {
    return 60;
  }

  const averageAssetValue =
    filteredBalanceSheet.reduce((acc, item) => acc + item.assetsValue, 0) /
    filteredBalanceSheet.length;

  if (averageAssetValue > loanAmount) {
    return 100;
  }

  return DEFAULT_PRE_ASSESSMENT_VALUE;
}
