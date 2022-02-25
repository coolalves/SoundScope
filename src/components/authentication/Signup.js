import React, { useState } from "react";
import { register, colRef, useAuth } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/username";
import { emailState } from "../../recoil/atoms/email";
import { userListState } from "../../recoil/atoms/userlist";
import logo from "../../styles/logo.svg";

export default function Login() {
  const [allUsers, setAllUsers] = useRecoilState(userListState);
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
        <img src={logo} alt="logo"></img>
        <h1>SOUNDSCOPE</h1>
      </div>

      <div className="displayInput">
        <h2>REGISTO</h2>

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
              if (username === e.username) {
                verifyUsers.push(username);
              }
            });

            console.log(verifyUsers);

            if (verifyUsers.length === 0) {
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
                  navigate("/dashboard/");
                })
                .catch((error) => alert(error.message));
            } else {
              alert("O username escolhido já está sendo utilizado!");
            }
          }}
          type="submit"
        >
          Registar
        </button>

        <div className="infoSign">
          Já tens conta? <Link to="/login">Entrar</Link>
        </div>
      </div>
    </div>
  );
}
