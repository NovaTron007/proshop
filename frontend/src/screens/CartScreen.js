import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// state: trigger action, display items
import { useDispatch, useSelector } from "react-redux";
// boostrap
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message"; // error message
// actions
import { addToCart, removeFromCart } from "../actions/cartActions"; // addToCart method from action

// get props, match to get id,  window.location: gets query string ?, history for redirect
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // if query, get pos 1(?qty=1 is now qty = [qty, 1]) etc.

  // ready action
  const dispatch = useDispatch(); // ready action

  // redux store
  const cart = useSelector(state => state.cart); // cart from state from store, gotten from reducer
  const { cartItems } = cart; // destructure cart, get action values

  console.log(cartItems);

  // dispatch addToCart action
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty)); // get from url
    }
  }, [dispatch, productId, qty]); // watch for changes and trigger dispatch

  // dispatch removeFromCart action
  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="danger">
            No items in cart, <Link to="/">return home</Link>
          </Message>
        ) : (
          <ListGroup>
            {/* loop cartItems from store: uses fields in store */}
            {cartItems.map(item => (
              <ListGroup.Item key={item.product_id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control as="select" value={item.qty} onChange={e => dispatch(addToCart(item.product_id, Number(e.target.value)))}>
                      {/* create a new array with empty slots equal to value of countInStock i.e countInStock = 4, [0,1,2,3]*/}
                      {[...Array(item.countInStock).keys()].map(item => (
                        <option key={item + 1} value={item + 1}>
                          {item + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2} className="text-center">
                    <Button type="button" variant="dark" onClick={() => removeFromCartHandler(item.product_id)}>
                      <i className="fa fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>Subtotal: ({cartItems.reduce((acc, currItem) => acc + currItem.qty, 0)}) items</h2>${cartItems.reduce((acc, currItem) => acc + currItem.qty * currItem.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" onClick={checkoutHandler} disabled={cartItems.length === 0} className="btn-block btn-success">
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
