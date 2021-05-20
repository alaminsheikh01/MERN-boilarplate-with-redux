import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../action/userAction";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password && email === "") {
      setMessage("Password and email is required");
    } else {
      dispatch(login(email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

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

              <Button type="submit" variant="primary">
                Sign In
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                Don't have an account? Create one{" "}
                <Link
                  to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                >
                  Sign Up
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginScreen;
