import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // trigger action, display items
import { listProducts } from "../actions/productActions"; // action
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product"; // map products to this child component: product

const HomeScreen = () => {
  // dispatch action
  const dispatch = useDispatch();
  // get products from state in store
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList; // destructure

  // fetch products
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {/* map products */}
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} /> {/* pass to product component */}
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
