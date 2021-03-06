import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// state: trigger action, display items
import { useDispatch, useSelector } from "react-redux";
// bootstrap
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from "react-bootstrap";
// components
import Rating from "../components/Rating"; // get rating component to display
import Message from "../components/Message";
import Loader from "../components/Loader";
// actions
import { listProductDetails } from "../actions/productActions";

// use props.match to get url, destructure match
const ProductScreen = ({ history, match }) => {
  // manipulate state
  const [qty, setQty] = useState(1);

  // initialise dispatch
  const dispatch = useDispatch();

  // get product from state in store
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails; // destructure

  // fetch data: dispatch action
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            {/* flush removes border on ListGroup */}
            <ListGroup variant="flush">
              <ListGroupItem>
                <h4>{product.name}</h4>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroupItem>
              <ListGroupItem>${product.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? "In stock" : "Out of stock"}</Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={e => setQty(e.target.value)}>
                          {/* create a new array with empty slots equal to value of countInStock i.e countInStock = 4, [0,1,2,3]*/}
                          {[...Array(product.countInStock).keys()].map(item => (
                            <option key={item + 1} value={item + 1}>
                              {item + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button className="btn-success" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>
                    {product.countInStock > 0 ? "Add to cart" : "Out of stock"}
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
