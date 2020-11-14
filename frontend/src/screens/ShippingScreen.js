import React, { useState } from "react";
// bootstrap
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; // call action, get state from store
import { saveShippingAddress } from "../actions/cartActions"; // action to save address in storage
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps"; // checkout nav

const ShippingScreen = ({ history }) => {
  // pull data from storage i.e inside initialState obj, the cart obj in store.js
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart; // desctructure from cart obj

  // form fields populated from localStorage obj in store.js
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  // ready dispatch
  const dispatch = useDispatch();

  const onSubmitHandler = e => {
    e.preventDefault();
    // dispatch save shipping as an object with the form fields
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment"); // redirect to payments screen
  };

  return (
    <FormContainer>
      {/* checkout nav: pass in step text to checkout to render conditions */}
      <CheckoutSteps step1 step2 />

      <h1>Shipping</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="address" value={address} required="true" onChange={e => setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="city" value={city} required="true" onChange={e => setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal code</Form.Label>
          <Form.Control type="text" placeholder="postalCode" value={postalCode} required="true" onChange={e => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="country" value={country} required="true" onChange={e => setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button className="btn-success" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
