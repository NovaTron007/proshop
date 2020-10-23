import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import Rating from "../components/Rating"; // get rating component to display
import products from "../products";

// use props.match to get url
const ProductScreen = ({ match }) => {
  // destructure props.match to get url
  const product = products.find(item => item._id === match.params.id); // get product where match :id placeholder in route

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid /> {/*stop overlap, keep within container*/}
        </Col>

        <Col md={3}>
          {/* flush removes border on ListGroup */}
          <ListGroup variant="flush">
            <ListGroupItem>
              <h4>{product.name}</h4>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroupItem>
            <ListGroupItem>${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? "In stock" : "Out of stock"}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button className="btn btn-success" type="button" disabled={product.countInStock === 0}>
                  {product.countInStock > 0 ? "Add to cart" : "Out of stock"}
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
