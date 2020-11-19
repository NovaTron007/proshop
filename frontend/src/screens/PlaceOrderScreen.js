import React, {useEffect} from "react";
import { Link } from "react-router-dom";
// state
import { useDispatch, useSelector } from "react-redux"; // call action, get state from store
// bootstrap
import { Button, Row, Col, Image, ListGroup, Card } from "react-bootstrap";
// components
import CheckoutSteps from "../components/CheckoutSteps"; // checkout nav
import Message from "../components/Message";
// action
import { createOrder } from '../actions/orderActions'; // order action

const PlaceOrderScreen = ({history}) => {
  const cart = useSelector(state => state.cart); // get cart state

  // add correct decimal places
  const addDecimals = number => {
    return Math.round((number * 100) / 100).toFixed(2);
  };

  // calculate prices and create new cart keys in cart, reduce get each item and process
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)); // acc start at 0
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2))); //  parse to num
  cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));
  cart.paymentMethod = "paypal";

  const dispatch = useDispatch();

  const orderCreate = useSelector(state => state.orderCreate);// get store
  const { order, success, error } = orderCreate; // destructure state (action data in store)
 
  useEffect(() => {
    if(success){
      history.push(`/order/${order._id}`);
    }
  },[history, success, order]);

  const placeOrderHandler = () => {
    // dispatch action, with storage values
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    }));
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>Address:</p>
                {/* access shipping items in cart obj in store */}
                {cart.shippingAddress.address}, <br />
                {cart.shippingAddress.city}, <br />
                {cart.shippingAddress.postalCode}, <br />
                {cart.shippingAddress.country}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                Method: {cart.paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Orders:</h2> {/* map cart, get data */}
                {/* access cartItems in cart obj in store */}
                {cart.cartItems === 0 ? (
                  <Message>Your cart is empty.</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            {/* pass product id to placeholder */}
                            <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x $ {item.price} = $ {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              {/* ListGroup.Items are spacious divs */}
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
                <Button disabled={cart.cartItems.length === 0} onClick={placeOrderHandler} type="button" className="btn-success">
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
