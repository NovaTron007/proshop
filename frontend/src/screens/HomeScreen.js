import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // trigger action, display items
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product"; // map products to this child component: product
import { listProducts } from "../actions/productActions"; // action

const HomeScreen = () => {
  // initialise dispatch
  const dispatch = useDispatch();

  // get products from state in store
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList; // destructure

  // fetch products: dispatch the listActions action
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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
