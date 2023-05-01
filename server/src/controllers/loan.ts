import {
  GetBalanceSheetRequest,
  GetBalanceSheetResponse,
  AccountingSoftwareKey,
} from '../types/loanController';
import { ConnectorProvider as AccountingSoftwareConnector } from '../services/accountingSoftwareConnector/ConnectorProvider';
import { accountingSoftwares } from '../constants';
import getConfig from '../utils/getConfig';

const config = getConfig();

/**
 * Get the balance sheet
 * @param data GetBalanceSheetRequest
 * @return GetBalanceSheetResponse
 */
export const getBalanceSheet = async (
  data: GetBalanceSheetRequest,
): Promise<GetBalanceSheetResponse> => {
  const { accountingProvider } = data;

  const {
    [accountingProvider as AccountingSoftwareKey]: {
      id: accountingSoftwareId,
      apiBaseURL: accountingSoftwareApiBaseURL,
    },
  } = accountingSoftwares;

  try {
    const connector = AccountingSoftwareConnector.getApi(accountingSoftwareId, {
      baseUrl: accountingSoftwareApiBaseURL,
      simulation: config.enableSimulation,
    });

    const balanceSheet = await connector.getBalanceSheet({});

    return {
      accountingProvider,
      balanceSheet,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
