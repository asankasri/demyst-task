export const myobGetBalanceSheetRequest = {
  fromDate: '2023-01-01',
  toDate: '2023-05-31',
};

export const myobGetBalanceSheetConvertedRequest = {
  StartDate: `${myobGetBalanceSheetRequest.fromDate}T00:00:00`,
  EndDate: `${myobGetBalanceSheetRequest.toDate}T23:59:59`,
};

export const myobGetBalanceSheetResponse = [
  {
    Year: 2023,
    Month: 1,
    ProfitOrLoss: 250000,
    AssetVal: 1234,
  },
  {
    Year: 2023,
    Month: 2,
    ProfitOrLoss: 1150,
    AssetVal: 5789,
  },
  {
    Year: 2023,
    Month: 3,
    ProfitOrLoss: 2500,
    AssetVal: 22345,
  },
  {
    Year: 2023,
    Month: 4,
    ProfitOrLoss: -187000,
    AssetVal: 223452,
  },
  {
    Year: 2023,
    Month: 5,
    ProfitOrLoss: -10345,
    AssetVal: 223500,
  },
];

export const myobGetBalanceSheetConvertedResponse = [
  {
    year: myobGetBalanceSheetResponse[0].Year,
    month: myobGetBalanceSheetResponse[0].Month,
    profitOrLoss: myobGetBalanceSheetResponse[0].ProfitOrLoss,
    assetsValue: myobGetBalanceSheetResponse[0].AssetVal,
  },
  {
    year: myobGetBalanceSheetResponse[1].Year,
    month: myobGetBalanceSheetResponse[1].Month,
    profitOrLoss: myobGetBalanceSheetResponse[1].ProfitOrLoss,
    assetsValue: myobGetBalanceSheetResponse[1].AssetVal,
  },
  {
    year: myobGetBalanceSheetResponse[2].Year,
    month: myobGetBalanceSheetResponse[2].Month,
    profitOrLoss: myobGetBalanceSheetResponse[2].ProfitOrLoss,
    assetsValue: myobGetBalanceSheetResponse[2].AssetVal,
  },
  {
    year: myobGetBalanceSheetResponse[3].Year,
    month: myobGetBalanceSheetResponse[3].Month,
    profitOrLoss: myobGetBalanceSheetResponse[3].ProfitOrLoss,
    assetsValue: myobGetBalanceSheetResponse[3].AssetVal,
  },
  {
    year: myobGetBalanceSheetResponse[4].Year,
    month: myobGetBalanceSheetResponse[4].Month,
    profitOrLoss: myobGetBalanceSheetResponse[4].ProfitOrLoss,
    assetsValue: myobGetBalanceSheetResponse[4].AssetVal,
  },
];
