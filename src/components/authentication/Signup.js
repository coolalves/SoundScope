import React, { useState } from "react";
import { register, colRef, useAuth } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, onSnapshot, query, where, docs } from "firebase/firestore";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/username";
import { emailState } from "../../recoil/atoms/email";
import { userListState } from "../../recoil/atoms/userlist";
import logo from "../../styles/logo.svg";

export function UseStorage(x = "", y = "") {
  window.sessionStorage.setItem(x, y);
}

export function get(user = "") {
  return window.sessionStorage.getItem(user);
}
console.log(window.sessionStorage);
export function useVerify(x = "") {
  window.sessionStorage.getItem(x);

  if (window.sessionStorage.getItem(x) != null) return true;
  else return false;
}

export function useGetStorage(x = "") {
  return window.sessionStorage.getItem(x);
}

export default function Login() {
  const [allUsers, setAllUsers] = useRecoilState(userListState);
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
    <div className="displayLogin">
      <div className="logo">
        <img src={logo}></img>
        <h1>SOUNDSCOPE</h1>
      </div>

      <div className="displayInput">
        <h2>REGISTER</h2>

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
            let verifyUsers = [];

            allUsers.forEach((e) => {
              if (username == e.username) {
                verifyUsers.push(username);
              }
            });

            console.log(verifyUsers);

            if (verifyUsers.length == 0) {
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
            } else {
              alert("O username escolhido já esá sendo utilizado!");
            }
          }}
          type="submit"
        >
          Register
        </button>

        <div>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
