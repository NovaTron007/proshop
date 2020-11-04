import React from "react";
// bootstrap
import { Container, Row, Col } from "react-bootstrap";

// destructure text between component call (props)
const FormContainer = ({ children }) => {
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormContainer;
