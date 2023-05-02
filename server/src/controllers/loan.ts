import {
  GetBalanceSheetRequest,
  GetBalanceSheetResponse,
  AccountingSoftwareKey,
  SubmitApplicationRequest,
  SubmitApplicationResponse,
} from '../types/loanController';
import { ConnectorProvider as AccountingSoftwareConnector } from '../services/accountingSoftwareConnector/ConnectorProvider';
import { ConnectorProvider as DesignEngineConnector } from '../services/designEngineConnector/ConnectorProvider';
import { accountingSoftwares } from '../constants';
import getConfig from '../utils/getConfig';
import getPreAssessmentValue from '../utils/getPreAssessmentValue';

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
  const { enableAccountingSoftwareSimulation } = config;

  const {
    [accountingProvider as AccountingSoftwareKey]: {
      id: accountingSoftwareId,
      apiBaseURL: accountingSoftwareApiBaseURL,
    },
  } = accountingSoftwares;

  try {
    const connector = AccountingSoftwareConnector.getApi(accountingSoftwareId, {
      baseUrl: accountingSoftwareApiBaseURL,
      simulation: enableAccountingSoftwareSimulation,
    });

    // NOTE: as per current implementation, `fromDate` and `toDate` can be used as getBalanceSheet params if needed.
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

/**
 * Submit the application
 * @param data SubmitApplicationRequest
 * @return SubmitApplicationResponse
 */
export const submitApplication = async (
  data: SubmitApplicationRequest,
): Promise<SubmitApplicationResponse> => {
  const { businessDetails, loanAmount, balanceSheet } = data;
  const { decisionEngineBaseURL, enableDecisionEngineSimulation } = config;

  try {
    const connector = DesignEngineConnector.getApi({
      baseUrl: decisionEngineBaseURL,
      simulation: enableDecisionEngineSimulation,
    });

    const preAssessment = getPreAssessmentValue({
      loanAmount,
      balanceSheet,
    });

    const isApproved = await connector.getDecision({
      businessDetails,
      loanAmount,
      balanceSheet,
      preAssessment,
    });

    return { isApproved };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
