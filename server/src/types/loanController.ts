import { accountingSoftwares } from '../constants';
import { BalanceSheetItem } from './../services/accountingSoftwareConnector/types/getBalanceSheet';

export type AccountingSoftwareKey = keyof typeof accountingSoftwares;

type BusinessDetails = {
  name: string;
  establishedYear: number;
};

type AccountingProvider = {
  id: string;
  label: string;
};

export type GetAccountingProvidersResponse = AccountingProvider[];

export type GetBalanceSheetRequest = {
  businessDetails: BusinessDetails;
  loanAmount: number;
  accountingProvider: AccountingSoftwareKey;
};

export type GetBalanceSheetResponse = {
  accountingProvider: AccountingSoftwareKey;
  balanceSheet: BalanceSheetItem[];
};

export type SubmitApplicationRequest = {
  businessDetails: BusinessDetails;
  loanAmount: number;
  balanceSheet: BalanceSheetItem[];
};

export type SubmitApplicationResponse = {
  isApproved: boolean;
};
