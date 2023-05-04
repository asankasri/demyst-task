import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import LoanApplication from "./LoanApplication";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAccountingProviders = [
  {
    id: 'XERO',
    label: 'Xero'
  },
  {
    id: 'MYOB',
    label: 'MYOB'
  }
];

const mockBalanceSheet = {
  accountingProvider: 'MYOB',
  balanceSheet: [
    {
      year: 2023,
      month: 5,
      profitOrLoss: 2500000000,
      assetsValue: 184909
    }
  ]
};

describe('pages/LoanApplication/LoanApplication', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockAccountingProviders,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const fillFormInputs = () => {
    fireEvent.change(screen.getByTestId("accounting-provider-select-input"), { target: { value: 'MYOB' } });
    fireEvent.change(screen.getByTestId("business-name-text-input"), { target: { value: 'My Business' } });
    fireEvent.change(screen.getByTestId("business-year-select-input"), { target: { value: '2020' } });
    fireEvent.change(screen.getByTestId("loan-amount-text-input"), { target: { value: '100000' } });
  };

  test('should show loading message in the initial loading', () => {
    render(<LoanApplication />);

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  test('should show accounting providers in the dropdown', async () => {
    render(<LoanApplication />);

    expect(screen.queryByTestId("accounting-provider-select-input")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("accounting-provider-select-input")).toBeInTheDocument();
    });
  });

  test('should show the submit button as disabled after initial loading', async () => {
    render(<LoanApplication />);

    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    expect(screen.getByTestId("submit-button")).toBeDisabled();
    expect(screen.getByTestId("submit-button")).toHaveTextContent('Submit');
  });

  test('should able to submit the form (step 1)', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockBalanceSheet,
    });

    render(<LoanApplication />);

    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    fillFormInputs();

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByText("2,500,000,000")).toBeInTheDocument();
    });

    expect(screen.getByTestId("submit-button")).toHaveTextContent('Confirm');
  });

  test('should able to submit the form (step 2) and show loan approved message', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockBalanceSheet,
    });

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        isApproved: true
      },
    });

    render(<LoanApplication />);

    await waitFor(() => {
      expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    fillFormInputs();

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByTestId("submit-button")).toHaveTextContent('Confirm');
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByText("Congratulations! Your application is approved.")).toBeInTheDocument();
    });
  });

  test('should able to show loan not approved message', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockBalanceSheet,
    });

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        isApproved: false
      },
    });

    render(<LoanApplication />);

    await waitFor(() => {
      expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    fillFormInputs();

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByTestId("submit-button")).toHaveTextContent('Confirm');
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByText("Sorry, your application is not approved.")).toBeInTheDocument();
    });
  });
});
