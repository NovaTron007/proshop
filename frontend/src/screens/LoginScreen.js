import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// bootstrap
import { Form, Button, Row, Col } from "react-bootstrap";
// state: trigger action, display items
import { useDispatch, useSelector } from "react-redux";
// components
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
//actions
import { login } from "../actions/userActions";

// destructure window.location and history
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ready action
  const dispatch = useDispatch(); // ready dispatch

  // redux store
  const userLogin = useSelector(state => state.userLogin); // get state from store, gotten from reducer
  const { loading, error, userInfo } = userLogin; // destructure userLogin, get data from action

  // redirect: set redirect to shipping else to home '/' if logged in
  // if has ?query, split at equals->becomes array: get pos 1(?redirect=shipping). const redirect = [redirect, shipping] or '/'
  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log("redirect:" + redirect);

  // check user login: redirect if logged in
  useEffect(() => {
    if (userInfo) {
      history.push(redirect); // login redirect: redirect to home '/' if logged in
    }
  }, [history, userInfo, redirect]); // run again if these change

  const submitHandler = e => {
    e.preventDefault();
    // dispatch login action send form values
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {/* check loading and error */}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" className="btn-success">
          Sign in
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          {/* option for redirect */}
          New customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
