//react
import React from "react";

//css
import "../../../styles/app.css";
import logo from "../../../styles/logo.svg";

//router
import { useNavigate } from "react-router-dom";

//firebase
import { useAuth, upload } from "../../../config/firebase";
import { useState, useEffect, useRef } from "react";
import { users } from "../../../config/firebase";

//recoil
import { useRecoilValue, useRecoilState } from "recoil";

import { userState } from "../../../recoil/atoms/username";
import { userListState } from "../../../recoil/atoms/userlist";
import { getEmail } from "../../../recoil/selectors/getEmail";
import { getUsers } from "../../../recoil/selectors/getAllUsers";
import { getUid } from "../../../recoil/selectors/getUid";

//components
import Navbar from "./Navbar";
import Search from "./Search";
import PreviewPlayer from "./PreviewPlayer";
import MyRecommendations from "./MyRecommendations";

//react-icons
import { CgDisc } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [toRecommend, setToRecommend] = useState(true);

  const navigate = useNavigate();

  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  const [photo, setPhoto] = useState(null);
  const currentUser = useAuth();
  const [username, setUsername] = useRecoilState(userState);
  const email = useRecoilValue(getEmail);
  const uid = useRecoilValue(getUid);
  const [userlist, setUserlist] = useRecoilState(userListState);
  setUserlist(users);
  const allusers = useRecoilValue(getUsers);

  //Styles
  const activeStyle = useRef("active");
  const disabledStyle = useRef("disabled");

  for (let i = 0; i < allusers.length; i++) {
    console.log(allusers[i].uid);
    if (allusers[i].uid == uid) {
      setUsername(allusers[i].username);
    } else {
      console.log("erro!");
    }
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <>
        <img src="https://gifs.eco.br/wp-content/uploads/2021/08/imagens-e-gifs-de-loading-4.gif" />
      </>
    );
  }

  const toggleRecommended = () => {
    setRecommended(true);
    setToRecommend(false);
  };

  const toggleToRecommend = (e) => {
    setRecommended(false);
    setToRecommend(true);
  };

  console.log(username)

  if (username != "") {
    return (
      <div className="app">
        <Navbar recommended={recommended} toRecommend={toRecommend} />

        <div className="mainApp">
          <PreviewPlayer />
          {!recommended && toRecommend ? (
            <Search username={username} />
          ) : (
            <div className="allRecommendations">
              <MyRecommendations username={username} />
            </div>
          )}
        </div>

        <div className="menu">
          <a
            className={
              toRecommend && !recommended
                ? activeStyle.current
                : disabledStyle.current
            }
            onClick={() => {
              toggleToRecommend();
            }}
          >
            <CgDisc />
            RECOMENDAR
          </a>

          <a
            className={
              !toRecommend && recommended
                ? activeStyle.current
                : disabledStyle.current
            }
            onClick={() => {
              toggleRecommended();
            }}
          >
            <FaHeart />
            RECOMENDADAS
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="displayLogin">
        <div className="logo">
          <img src={logo}></img>
          <h1>SOUNDSCOPE</h1>
        </div>

        <p>Você não está logado. Para aceder a página, efetue o login.</p>

        <div className="login-signup">
          <button onClick={()=> navigate("/login")}>Login</button>

          <button onClick={()=> navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    );
  }
}
