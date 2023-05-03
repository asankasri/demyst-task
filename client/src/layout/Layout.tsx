import { Outlet, Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

const Layout = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="12">
            <h2><Link to="/">Loanyst</Link></h2>
          </Col>
        </Row>
      </Container>

      <Outlet />
    </>
  )
};

export default Layout;
