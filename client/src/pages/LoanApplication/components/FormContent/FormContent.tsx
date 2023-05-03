import React from "react";

import { AccountingProviderType, BalanceSheetItemType } from "../../../../utils/Api";
import FormContentStepOne from './FormContentStepOne';
import FormContentStepTwo from './FormContentStepTwo';
import FormContentThree from "./FormContentThree";

const FormContent = ({
  formStep,
  accountingProviders,
  selectedAccountingProvider,
  handleAccountingProviderChange,
  businessName,
  handleBusinessNameChange,
  businessEstablishedYear,
  handleBusinessEstablishedYearChange,
  loanAmount,
  handleLoanAmountChange,
  balanceSheet,
  isApproved
}: {
  formStep: number;
  accountingProviders: AccountingProviderType[];
  selectedAccountingProvider: string;
  handleAccountingProviderChange: React.ChangeEventHandler<HTMLSelectElement>;
  businessName: string;
  handleBusinessNameChange: React.ChangeEventHandler<HTMLInputElement>;
  businessEstablishedYear: string;
  handleBusinessEstablishedYearChange: React.ChangeEventHandler<HTMLSelectElement>;
  loanAmount: string;
  handleLoanAmountChange: React.ChangeEventHandler<HTMLInputElement>;
  balanceSheet: BalanceSheetItemType[];
  isApproved: boolean;
}) => {
  const renderContent = () => {
    if (formStep === 1) {
      return <FormContentStepOne
        accountingProviders={accountingProviders}
        selectedAccountingProvider={selectedAccountingProvider}
        handleAccountingProviderChange={handleAccountingProviderChange}
        businessName={businessName}
        handleBusinessNameChange={handleBusinessNameChange}
        businessEstablishedYear={businessEstablishedYear}
        handleBusinessEstablishedYearChange={handleBusinessEstablishedYearChange}
        loanAmount={loanAmount}
        handleLoanAmountChange={handleLoanAmountChange}
      />;
    }

    if (formStep === 2) {
      return <FormContentStepTwo balanceSheet={balanceSheet} />;
    }

    return <FormContentThree isApproved={isApproved} />
  };

  return renderContent();
};

export default FormContent;
