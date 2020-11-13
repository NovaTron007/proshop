import React, { useState, useEffect } from "react";
// bootstrap
import { Form, Button, Row, Col } from "react-bootstrap";
// state: trigger action, display items
import { useDispatch, useSelector } from "react-redux";
// components
import Message from "../components/Message";
import Loader from "../components/Loader";
//actions
import { getUserDetails, updateUserProfile } from "../actions/userActions";

// destructure window.location and history
const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  // ready action
  const dispatch = useDispatch(); // ready dispatch

  // redux store
  const userDetails = useSelector(state => state.userDetails); // get state from store, gotten from reducer
  const { loading, error, user } = userDetails; // destructure userDetails, (in reducer assigned from action values)

  const userLogin = useSelector(state => state.userLogin); // get state from store, gotten from reducer
  const { userInfo } = userLogin; // destructure userInfo: (in reducer assigned from action values)

  const userUpdateProfile = useSelector(state => state.userUpdateProfile); // get state from store, gotten from reducer
  const { success } = userUpdateProfile; // destructure success from userUpdateProfile

  // check if user is logged in
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]); // run again if these change

  const submitHandler = e => {
    e.preventDefault();
    // dispatch register action send form values
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      // dispatch updateProfile
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Update profile</h2>
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile updated!</Message>}

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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
