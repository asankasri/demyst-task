import HttpClient, { HttpClientRequestBody } from "./HttpClient";

const BASE_URL = "http://localhost:3001"; // todo set as an environment variable

const httpClientInstance = new HttpClient(BASE_URL);

export type AccountingProviderType = {
  id: string;
  label: string;
};

export type BalanceSheetItemType = {
  year: number;
  month: number;
  profitOrLoss: number;
  assetsValue: number;
};

export type BusinessDetailsType = {
  name: string;
  establishedYear: number;
};

export type GetBalanceSheetRequestBodyType = {
  businessDetails: BusinessDetailsType,
  loanAmount: number;
  accountingProvider: string;
};

export type GetBalanceSheetResponseType = {
  accountingProvider: string;
  balanceSheet: BalanceSheetItemType[]
};

export type SubmitApplicationRequestBodyType = {
  businessDetails: BusinessDetailsType;
  loanAmount: number;
  balanceSheet: BalanceSheetItemType[]
};

export type SubmitApplicationResponseType = {
  isApproved: boolean;
}

export async function getAccountingProviders(): Promise<AccountingProviderType[]> {
  const response = await httpClientInstance.get("/v1/getAccountingProviders");
  return response.data as AccountingProviderType[];
}

export async function getBalanceSheet(requestBody: GetBalanceSheetRequestBodyType): Promise<GetBalanceSheetResponseType> {
  const response = await httpClientInstance.get("/v1/getBalanceSheet", requestBody as unknown as HttpClientRequestBody);
  return response.data as GetBalanceSheetResponseType;
}

export async function submitApplication(requestBody: SubmitApplicationRequestBodyType): Promise<SubmitApplicationResponseType> {
  const response = await httpClientInstance.post("/v1/submitApplication", requestBody as unknown as HttpClientRequestBody);
  return response.data as SubmitApplicationResponseType;
}
