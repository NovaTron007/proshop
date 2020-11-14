import React, { useState } from "react";
// bootstrap
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; // call action, get state from store
import { savePaymentMethod } from "../actions/cartActions"; // action to save address in storage
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps"; // checkout nav

const PaymentScreen = ({ history }) => {
  // pull data from storage i.e inside initialState obj, the cart obj in store.js
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart; // desctructure from cart obj

  if (!shippingAddress) {
    history.push("/shipping");
  }

  // form fields populated from localStorage obj in store.js
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  // ready dispatch
  const dispatch = useDispatch();

  const onSubmitHandler = e => {
    e.preventDefault();
    // dispatch save shipping as an object with the form fields
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder"); // redirect to payments screen
  };

  return (
    <FormContainer>
      {/* checkout nav: pass in step text to checkout to render conditions */}
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select method</Form.Label>
          <Col>
            <Form.Check type="radio" onChange={e => setPaymentMethod(e.target.value)} value="PayPal" checked label="Paypal or credit card" id="id" name="paymentMethod"></Form.Check>
          </Col>
        </Form.Group>

        <Button className="btn-success" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
