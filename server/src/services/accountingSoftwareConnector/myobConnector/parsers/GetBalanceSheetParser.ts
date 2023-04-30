import { ParserInterface } from '../../ParserInterface';

export class GetBalanceSheetParser implements ParserInterface {
  convertRequest(request: any): any {
    return {
      StartDate: `${request.fromDate}T00:00:00`,
      EndDate: `${request.toDate}T23:59:59`,
    };
  }

  convertResponse(response: any): any {
    return response.map((res: any) => {
      const { Year: year, Month: month, ProfitOrLoss: profitOrLoss, AssetVal: assetsValue } = res;

      return {
        year,
        month,
        profitOrLoss,
        assetsValue,
      };
    });
  }
}
