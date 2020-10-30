import React from "react";
import { Alert } from "react-bootstrap";

// pass props into message component
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info"
};
export default Message;
