import React from "react";
import { Row, Col, Form } from 'react-bootstrap';

import { AccountingProviderType } from "../../../../utils/Api";
import { getEstablishedYears } from "../../utils";

const FormContentStepOne = ({
  accountingProviders,
  selectedAccountingProvider,
  handleAccountingProviderChange,
  businessName,
  handleBusinessNameChange,
  businessEstablishedYear,
  handleBusinessEstablishedYearChange,
  loanAmount,
  handleLoanAmountChange,
}: {
  accountingProviders: AccountingProviderType[];
  selectedAccountingProvider: string;
  handleAccountingProviderChange: React.ChangeEventHandler<HTMLSelectElement>;
  businessName: string;
  handleBusinessNameChange: React.ChangeEventHandler<HTMLInputElement>;
  businessEstablishedYear: string;
  handleBusinessEstablishedYearChange: React.ChangeEventHandler<HTMLSelectElement>;
  loanAmount: string;
  handleLoanAmountChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <>
    <Row className="mb-3">
      <Col md="6" xs="12">
        <Form.Label htmlFor="accountingProvider">Accounting Provider</Form.Label>
        <Form.Select
          data-testid="accounting-provider-select-input"
          id="accountingProvider"
          required
          value={selectedAccountingProvider}
          onChange={handleAccountingProviderChange}
        >
          <option>Select</option>
          {accountingProviders.map((provider) => (
            <option key={provider.label.toLowerCase()} value={provider.id}>{provider.label}</option>
          ))}
        </Form.Select>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col md="6" xs="12">
        <Form.Label htmlFor="businessName">Business Name</Form.Label>
        <Form.Control
          data-testid="business-name-text-input"
          type="text"
          id="businessName"
          required
          value={businessName}
          onChange={handleBusinessNameChange}
        />
      </Col>
      <Col md="6" xs="12">
        <Form.Label htmlFor="businessEstablishedYear">Business Established Year</Form.Label>
        <Form.Select
          data-testid="business-year-select-input"
          id="businessEstablishedYear"
          required
          value={businessEstablishedYear}
          onChange={handleBusinessEstablishedYearChange}
        >
          <option>Select</option>
          {getEstablishedYears().map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Form.Select>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col md="6" xs="12">
        <Form.Label htmlFor="loanAmount">Loan Amount</Form.Label>
        <Form.Control
          data-testid="loan-amount-text-input"
          type="number"
          id="loanAmount"
          required
          value={loanAmount}
          onChange={handleLoanAmountChange}
        />
      </Col>
    </Row>
  </>
);

export default FormContentStepOne;
