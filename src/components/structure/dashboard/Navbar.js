import logo from "../../../styles/logo.svg";

import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../../../recoil/atoms/username";
import react, { useRef, useState, useEffect } from "react";
import { logout, useAuth, upload } from "../../../config/firebase";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(userState);

  return (
    <header>
      <div className="logo">
        <img src={logo}></img>
        <h1>SOUNDSCOPE</h1>
      </div>

      <div>
        <a
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          RECOMENDAR
        </a>
        <a
          onClick={() => {
            navigate("/feed");
          }}
        >
          DESCOBRIR
        </a>

        <a
          onClick={async (e) => {
            e.preventDefault();
            logout();
            alert("Logged Out");
            window.sessionStorage.clear();
            setUsername("");
            navigate("/login");
          }}
        >
          LOG OUT
        </a>

        <div className="displayWelcome">welcome, {username}</div>
        
      </div>
    </header>
  );
}
