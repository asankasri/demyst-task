export type GetBalanceSheetRequest = {
  fromDate?: string;
  toDate?: string;
};

type BalanceSheet = {
  year: number;
  month: number;
  profitOrLoss: number;
  assetsValue: number;
};

export type GetBalanceSheetResponse = BalanceSheet[];
