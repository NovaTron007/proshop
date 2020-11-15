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
import { register } from "../actions/userActions";

// destructure window.location and history
const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  // ready action
  const dispatch = useDispatch(); // ready dispatch

  // redux store
  const userRegister = useSelector(state => state.userRegister); // get state from store, gotten from reducer
  const userLogin = useSelector(state => state.userLogin); // get login status
  const { userInfo } = userLogin; // destructure userLogin: get data from action
  const { loading, error } = userRegister; // loading, error: get data from action

  // redirect: set redirect to shipping else to home '/' if logged in
  // if has ?query, split at equals->becomes array: get pos 1(?redirect=shipping). const redirect = [redirect, shipping] or '/'
  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log("RegisterScreen redirect:" + redirect);

  // check user login: redirect if logged in
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]); // run again if these change

  const submitHandler = e => {
    e.preventDefault();
    // dispatch register action send form values
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>

      {/* check loading and error */}
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" className="btn-success">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          {/* option for redirect */}
          Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Signin</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
