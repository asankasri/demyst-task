import React from "react";
import { Row, Col } from 'react-bootstrap';

const FormContentThree = ({ isApproved }: { isApproved: boolean; }) => {
  const message = isApproved
    ? 'Congratulations! Your application is approved.'
    : 'Sorry, your application is not approved.';

  return (
    <Row className="mb-3">
      <Col><p>{message}</p></Col>
    </Row>
  )
}

export default FormContentThree;
