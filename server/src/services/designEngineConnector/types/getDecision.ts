import { BalanceSheetItem } from '../../accountingSoftwareConnector/types/getBalanceSheet';

type BusinessDetails = {
  name: string;
  establishedYear: number;
};

export type GetDecisionRequest = {
  businessDetails: BusinessDetails;
  balanceSheet: BalanceSheetItem[];
  loanAmount: number;
  preAssessment: number;
};

export type GetDecisionResponse = boolean;
