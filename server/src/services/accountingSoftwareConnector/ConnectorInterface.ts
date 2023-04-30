import { GetBalanceSheetRequest, GetBalanceSheetResponse } from './types';

export interface ConnectorInterface {
  getBalanceSheet(request: GetBalanceSheetRequest): Promise<GetBalanceSheetResponse>;
}
