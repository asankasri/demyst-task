import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <h4>Welcome to Loanyst!</h4>
        <p>Click below button to start your loan application.</p>
        <Link to="/loan-application">
          <Button size="lg">START APPLICATION</Button>
        </Link>
      </Row>
    </Container>
  );
};

export default Home;
