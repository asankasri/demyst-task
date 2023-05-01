export type GetBalanceSheetRequest = {
  fromDate?: string;
  toDate?: string;
};

export type BalanceSheetItem = {
  year: number;
  month: number;
  profitOrLoss: number;
  assetsValue: number;
};

export type GetBalanceSheetResponse = BalanceSheetItem[];
