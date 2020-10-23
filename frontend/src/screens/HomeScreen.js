import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product"; // map products to this child component: product

const HomeScreen = () => {
  const [products, setProducts] = useState([]); // products is array of obj

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products"); // destructure res.data
      setProducts(data);
    };

    // call api
    fetchProducts();

    return () => {
      // cleanup;
    };
  }, []);
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
