import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../action/userAction";
import { useDispatch, useSelector } from "react-redux";

const RegisterSceen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password));
      console.log("data saved");
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col md={6} className="offset-md-3">
            <h1 className="text-center">Sign Up</h1>

            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={onSubmitHandler}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Sign Up
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                Have an account?{" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Sign In
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterSceen;
