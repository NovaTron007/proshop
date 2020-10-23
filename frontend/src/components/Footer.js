import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // import bs react components

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Dwayne Man</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
