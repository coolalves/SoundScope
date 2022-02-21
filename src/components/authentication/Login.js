import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { login } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { UseStorage } from "./Signup";
import { useRecoilState } from "recoil";
import { emailState } from "../../recoil/atoms/email";

export function get(user = "") {
  return window.sessionStorage.getItem(user);
}

export function useVerify(x = "") {
  window.sessionStorage.getItem(x);

  if (window.sessionStorage.getItem(x) != null) return true;
  else return false;
}

export function useGetStorage(x = "") {
  return window.sessionStorage.getItem(x);
}

export default function Login() {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [dados, setDados] = useState("");
  const UserParam = (i) => {
    setDados(i);
  };
  console.log(dados);
  return (
    <>
      <Card>
        <Card.Body>
          <Form>
            <h2 className="text-center mb-4">Welcome</h2>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.trim());
                }}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Button
              onClick={async (e) => {
                e.preventDefault();
                await login(email, password)
                  .then((response) => {
                    alert("Successfully Logged In");
                    UserParam(response.user.uid);
                    UseStorage("useremail", response.user.email);
                    navigate("/dashboard/");
                  })
                  .catch((error) => alert(error.message));
              }}
              className="w-100 mt-3 mb-3"
              type="submit"
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
