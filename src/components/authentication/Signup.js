import React, { useState } from "react";
import { register, colRef, useAuth } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, onSnapshot, query, where, docs } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/username";
import { emailState } from "../../recoil/atoms/email";

export function UseStorage(x = "", y = "") {
  window.sessionStorage.setItem(x, y);
}

export function get(user = "") {
  return window.sessionStorage.getItem(user);
}
console.log(window.sessionStorage)
export function useVerify(x = "") {
  window.sessionStorage.getItem(x);

  if (window.sessionStorage.getItem(x) != null) return true;
  else return false;
}

export function useGetStorage(x = "") {
  return window.sessionStorage.getItem(x);
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useRecoilState(userState);
  const navigate = useNavigate();
  const [dados, setDados] = useState("");
  const currentUser = useAuth();

  const UserParam = (i) => {
    setDados(i);
  };

  return (
    <>
      <h2>Register</h2>
      <div></div>

      <label>Username:</label>
      <input
        type="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value.trim());
        }}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value.trim());
        }}
        required
      />

      <label>Password:</label>
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
          await register(email, password)
            .then(async (response) => {
              alert("Successfully Registered");
              UserParam(response.user.uid);
              addDoc(colRef, {
                uid: response.user.uid,
                username: username,
                email: email,
              });
              UseStorage("username", response.user.displayName);
              UseStorage("useremail", response.user.email);
              UseStorage("id", response.user.uid);

              navigate("/dashboard/");
            })
            .catch((error) => alert(error.message));
        }}
        type="submit"
      >
        Register
      </button>

      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </>
  );
}
