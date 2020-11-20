import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// state
import { useDispatch, useSelector } from "react-redux"; // call action, get state from store
// bootstrap
import { Button, Row, Col, Image, ListGroup, Card } from "react-bootstrap";
// components
import Loader from "../components/Loader"; // checkout nav
import Message from "../components/Message";
// action
import { getOrderDetails } from "../actions/orderActions"; // order action

const OrderScreen = ({ match }) => {
  const orderId = match.params.id; // get id in url

  const dispatch = useDispatch();

  // get order from state
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails; // desctructure order

  if (!loading) {
    // add correct decimal places
    const addDecimals = number => {
      return Math.round((number * 100) / 100).toFixed(2);
    };
    // add decimals
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)); // reduce get each item and process, acc start at 0
    order.taxPrice = addDecimals(order.taxPrice);
    order.shippingPrice = addDecimals(order.shippingPrice);
  }

  // check no order use, latest order
  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId]);

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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
