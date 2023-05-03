import React from "react";
import { Row, Col, Table } from 'react-bootstrap';

import { BalanceSheetItemType } from "../../../../utils/Api";
import { getYearAndMonthLabel, getFormattedNumber } from "../../utils";

const FormContentStepTwo = ({ balanceSheet }: { balanceSheet: BalanceSheetItemType[]; }) => (
  <Row className="mb-3">
    <Col>
      <p>Review the balance sheet and confirm.</p>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Year / Month</th>
            <th>Profit or Loss</th>
            <th>Assets Value</th>
          </tr>
        </thead>
        <tbody>
          {balanceSheet.map(item => (
            <tr>
              <td>{getYearAndMonthLabel(item.year, item.month)}</td>
              <td>{getFormattedNumber(item.profitOrLoss)}</td>
              <td>{getFormattedNumber(item.assetsValue)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  </Row>
);

export default FormContentStepTwo;
