import React, { useState } from "react";
import { login } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { UseStorage } from "./Signup";
import { useRecoilState, useRecoilValue } from "recoil";
import { emailState } from "../../recoil/atoms/email";
import { uidState } from "../../recoil/atoms/uid";
import { isLogged } from "../../recoil/atoms/islogged";
import logo from "../../styles/logo.svg";

export default function Login() {
  const [email, setEmail] = useRecoilState(emailState);
  const [useIsLogged, setIsLogged] = useRecoilState(isLogged);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [uid, setUid] = useRecoilState(uidState);
  const UserParam = (i) => {
    setUid(i);
  };

  return (
    <div className="displayLogin">
      <div className ="logo">
        <img src={logo}></img>
        <h1>SOUNDSCOPE</h1>
      </div>

      <div className="displayInput">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.trim());
          }}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />

        <button
          onClick={async (e) => {
            e.preventDefault();
            await login(email, password)
              .then((response) => {
                alert("Successfully Logged In");
                UserParam(response.user.uid);
      
                setIsLogged({loggedIn: true})
                navigate("/dashboard/");
              })
              .catch((error) => alert(error.message));
          }}
          type="submit"
        >
          Log In
        </button>

        <div>
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
