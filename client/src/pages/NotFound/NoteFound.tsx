import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';

const NotFound = () => {
  const location = useLocation();

  return (
    <Container fluid>
      <Row>
        <div>Page Not Found for <code>{location.pathname}</code></div>
      </Row>
    </Container>
  );
};

export default NotFound;
