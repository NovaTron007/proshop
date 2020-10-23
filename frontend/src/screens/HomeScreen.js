import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product"; // map products to this child component: product

const HomeScreen = () => {
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {/* map products */}
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} /> {/* pass to product component */}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
