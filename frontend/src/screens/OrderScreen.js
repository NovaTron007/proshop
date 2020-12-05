import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
// state
import { useDispatch, useSelector } from "react-redux"; // call action, get state from store
// bootstrap
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
// components
import Loader from "../components/Loader"; // checkout nav
import Message from "../components/Message";
// action
import { getOrderDetails, payOrder } from "../actions/orderActions"; // orderActions
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id; // get id in url
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  // get order state from store
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails; // destructure order

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay; // destructure orderPay and can rename keys (new trick)

  if (!loading) {
    // add correct decimal places
    const addDecimals = number => {
      return Math.round((number * 100) / 100).toFixed(2);
    };
    // add decimals
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)); // reduce get each item and process, acc start at 0
    order.taxPrice = addDecimals(order.taxPrice);
    order.shippingPrice = addDecimals(order.shippingPrice);
    order.totalPrice = addDecimals(order.totalPrice);
  }
  const successPaymentHandler = paymentResult => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  useEffect(() => {
    // hit server.js endpoint for paypal id, add paypal script
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script); // add paypal script to body
    };

    // if order not there or successPay show details
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
    // if order isn't paid show script and paypal btn
    else if (!order.isPaid) {
      // if paypal script not on page add it
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, successPay, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <b>Name:</b> {order.user.name}
                </p>
                <p>
                  <b>Email: </b>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <b>Address:</b>
                </p>
                {/* access shipping items in cart obj in store */}
                <p>
                  {order.shippingAddress.address}, <br />
                  {order.shippingAddress.city}, <br />
                  {order.shippingAddress.postalCode}, <br />
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Delivery pending</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>Method: {order.paymentMethod}</p>
                {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">Payment pending</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Orders:</h2> {/* map cart, get data */}
                {/* access orderItems in cart obj in store */}
                {order.orderItems === 0 ? (
                  <Message>Your order is empty.</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            {/* pass product id to placeholder */}
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
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
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
