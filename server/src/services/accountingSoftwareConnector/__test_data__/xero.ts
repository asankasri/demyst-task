export const xeroGetBalanceSheetRequest = {
  fromDate: '2023-01-01',
  toDate: '2023-05-31',
};

export const xeroGetBalanceSheetConvertedRequest = {
  startDate: xeroGetBalanceSheetRequest.fromDate,
  endDate: xeroGetBalanceSheetRequest.toDate,
};

export const xeroGetBalanceSheetResponse = [
  {
    balanceDate: '2023-01-31',
    profitOrLoss: 250000,
    asset: { total: 1234 },
  },
  {
    balanceDate: '2023-02-28',
    profitOrLoss: 1150,
    asset: { total: 5789 },
  },
  {
    balanceDate: '2023-03-31',
    profitOrLoss: 2500,
    asset: { total: 22345 },
  },
  {
    balanceDate: '2023-04-30',
    profitOrLoss: -187000,
    asset: { total: 223452 },
  },
  {
    balanceDate: '2023-05-31',
    profitOrLoss: -10345,
    asset: { total: 223500 },
  },
];

export const xeroGetBalanceSheetConvertedResponse = [
  {
    year: 2023,
    month: 1,
    profitOrLoss: xeroGetBalanceSheetResponse[0].profitOrLoss,
    assetsValue: xeroGetBalanceSheetResponse[0].asset.total,
  },
  {
    year: 2023,
    month: 2,
    profitOrLoss: xeroGetBalanceSheetResponse[1].profitOrLoss,
    assetsValue: xeroGetBalanceSheetResponse[1].asset.total,
  },
  {
    year: 2023,
    month: 3,
    profitOrLoss: xeroGetBalanceSheetResponse[2].profitOrLoss,
    assetsValue: xeroGetBalanceSheetResponse[2].asset.total,
  },
  {
    year: 2023,
    month: 4,
    profitOrLoss: xeroGetBalanceSheetResponse[3].profitOrLoss,
    assetsValue: xeroGetBalanceSheetResponse[3].asset.total,
  },
  {
    year: 2023,
    month: 5,
    profitOrLoss: xeroGetBalanceSheetResponse[4].profitOrLoss,
    assetsValue: xeroGetBalanceSheetResponse[4].asset.total,
  },
];
