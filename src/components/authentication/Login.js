import React, { useState } from "react";
import { login } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { UseStorage } from "./Signup";
import { useRecoilState } from "recoil";
import { emailState } from "../../recoil/atoms/email";
import { uidState } from "../../recoil/atoms/uid";

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
  const [uid, setUid] = useRecoilState(uidState);
  const UserParam = (i) => {
    setUid(i);
  };
  //console.log(uid);
  return (
    <>
      <h2>Welcome</h2>

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
              UseStorage("useremail", response.user.email);
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
    </>
  );
}
