import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import {
  getAccountingProviders,
  AccountingProviderType,
  getBalanceSheet,
  BalanceSheetItemType,
  submitApplication
} from "../../utils/Api";
import Loader from "../../components/Loader";
import FetchError from "../../components/FetchError";
import { FormContent } from "./components";

const LoanApplication = () => {
  const [formStep, setFormStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorInLoading, setIsErrorInLoading] = useState(false);
  const [accountingProviders, setAccountingProviders] = useState([] as AccountingProviderType[]);
  const [selectedAccountingProvider, setSelectedAccountingProvider] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessEstablishedYear, setBusinessEstablishedYear] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [balanceSheet, setBalanceSheet] = useState([] as BalanceSheetItemType[]);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsErrorInLoading(false);
      try {
        const accountingProvidersList = await getAccountingProviders();
        setAccountingProviders(accountingProvidersList);
      } catch (error) {
        console.log(error);
        setIsErrorInLoading(true);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleBusinessNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessName(e.target.value);
  }, []);

  const handleBusinessEstablishedYearChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setBusinessEstablishedYear(e.target.value);
  }, []);

  const handleLoanAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(e.target.value);
  }, []);

  const handleAccountingProviderChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccountingProvider(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (formStep === 1) {
        try {
          const balanceSheetRes = await getBalanceSheet({
            businessDetails: {
              name: businessName,
              establishedYear: Number(businessEstablishedYear)
            },
            loanAmount: Number(loanAmount),
            accountingProvider: selectedAccountingProvider
          });

          setFormStep(2);
          setBalanceSheet(balanceSheetRes.balanceSheet);
        } catch (error) {
          console.log(error);
        }

        return setIsLoading(false);
      }

      try {
        const submitApplicationRes = await submitApplication({
          businessDetails: {
            name: businessName,
            establishedYear: Number(businessEstablishedYear)
          },
          loanAmount: Number(loanAmount),
          balanceSheet: balanceSheet
        });

        setFormStep(3);
        setIsApproved(submitApplicationRes.isApproved);
      } catch (error) {
        console.log(error);
      }

      return setIsLoading(false);
    }

    fetchData();
  }, [
    formStep,
    businessName,
    businessEstablishedYear,
    loanAmount,
    selectedAccountingProvider,
    balanceSheet
  ]);

  const renderFormButton = () => {
    if (formStep > 2) {
      return null;
    }

    return (
      <Row className="mb-3">
        <Col md="6" xs="12">
          <Button
            data-testid="submit-button"
            variant="primary"
            disabled={!!!selectedAccountingProvider || !!!businessName || !!!businessEstablishedYear || !!!loanAmount}
            onClick={handleSubmit}
          >
            {formStep === 1 ? 'Submit': 'Confirm'}
          </Button>
        </Col>
      </Row>
    )
  }

  const renderForm = () => {
    if (isLoading) {
      return <Col><Loader /></Col>;
    }

    if (isErrorInLoading) {
      return <Col><FetchError type="accounting providers" /></Col>;
    }

    if (accountingProviders.length === 0) {
      return <Col>Sorry, there is no accounting providers yet</Col>
    }

    const formTitle = `Loan Application ${formStep < 3 ? ` - Step ${formStep}`: ''}`;

    return (
      <>
        <h4>{formTitle}</h4>
        <Form>
          <FormContent
            formStep={formStep}
            accountingProviders={accountingProviders}
            selectedAccountingProvider={selectedAccountingProvider}
            handleAccountingProviderChange={handleAccountingProviderChange}
            businessName={businessName}
            handleBusinessNameChange={handleBusinessNameChange}
            businessEstablishedYear={businessEstablishedYear}
            handleBusinessEstablishedYearChange={handleBusinessEstablishedYearChange}
            loanAmount={loanAmount}
            handleLoanAmountChange={handleLoanAmountChange}
            balanceSheet={balanceSheet}
            isApproved={isApproved}
          />
          {renderFormButton()}
        </Form>
      </>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        {renderForm()}
      </Row>
    </Container>
  );
};

export default LoanApplication;
