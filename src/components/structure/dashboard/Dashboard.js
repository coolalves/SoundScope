//react
import React from "react";

//css
import "../../../styles/app.css";

//router
import { useNavigate } from "react-router-dom";

//firebase
import { logout, useAuth, upload } from "../../../config/firebase";
import { useState, useEffect } from "react";
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

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState(false);

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

  function toggleRecommended() {
    setRecommended(!recommended);
  }

  return (
    <>
      <Navbar />

      <div className="mainApp">
        <h1>Dashboard</h1>
        <h2>Welcome, {username} !</h2>
        <p>{email}</p>

        <Search username={username} />
        <div>
          <img
            style={{ borderRadius: 200, width: 65 }}
            src={photoURL}
            alt="Avatar"
          />
          <input type="file" onChange={handleChange} />
          <button disabled={loading || !photo} onClick={handleClick}>
            {" "}
            Upload Picture{" "}
          </button>
        </div>

        <div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              logout();
              alert("Logged Out");
              window.sessionStorage.clear();
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </div>

        <PreviewPlayer />

        <button
          onClick={() => {
            toggleRecommended();
          }}
        >
          minhas recomendações
        </button>
        {recommended ? <MyRecommendations username={username} /> : null}
      </div>
      
    </>
  );
}
