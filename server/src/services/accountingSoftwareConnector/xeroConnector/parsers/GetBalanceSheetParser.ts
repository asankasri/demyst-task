import { ParserInterface } from '../../ParserInterface';

export class GetBalanceSheetParser implements ParserInterface {
  convertRequest(request: any): any {
    return {
      startDate: request.fromDate,
      endDate: request.toDate,
    };
  }

  convertResponse(response: any): any {
    return response.map((res: any) => {
      const {
        balanceDate,
        profitOrLoss,
        asset: { total: assetsValue },
      } = res;

      const [year, month] = balanceDate.split('-');

      return {
        year: Number(year),
        month: Number(month),
        profitOrLoss,
        assetsValue,
      };
    });
  }
}
