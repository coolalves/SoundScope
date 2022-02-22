//react
import React from "react";

//css
import "../../styles/app.css";

//bootstrap
import { Card, Button, Form } from "react-bootstrap";

//router
import { Link, useNavigate } from "react-router-dom";

//firebase
import { logout, colRefSongs, useAuth, upload } from "../../config/firebase";
//import { onSnapshot, query, where, docs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { users } from "../../config/firebase";
//import { songs } from "../../config/firebase";

//recoil
import { useRecoilValue, useRecoilState } from "recoil";

import { userState } from "../../recoil/atoms/username";
import { userListState } from "../../recoil/atoms/userlist";
//import { getUser } from "../../recoil/selectors/getUsername";
import { getEmail } from "../../recoil/selectors/getEmail";
import { getUsers } from "../../recoil/selectors/getAllUsers";
import { getUid } from "../../recoil/selectors/getUid";

//components
import Search from "./Search";
import PreviewPlayer from "./PreviewPlayer";
import MyRecommendations from "./MyRecommendations";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [photo, setPhoto] = useState(null);
  //const [registered, setRegistered] = useState(false);

  const currentUser = useAuth();

  //console.log(currentUser);

  const [username, setUsername] = useRecoilState(userState);
  //const name = useRecoilValue(getUser);
  const email = useRecoilValue(getEmail);
  const uid = useRecoilValue(getUid);
  //console.log(uid);

  //const emailcerto = email;
  //console.log(useRecoilValue(getEmail));
  const [userlist, setUserlist] = useRecoilState(userListState);
  setUserlist(users);
  const allusers = useRecoilValue(getUsers);
  //console.log(allusers);

  for (let i = 0; i < allusers.length; i++) {
    console.log(allusers[i].uid);
    if (allusers[i].uid == uid) {
      setUsername(allusers[i].username);
    } else {
      console.log("corno");
    }
  }

  //const [nomecerto, setNomecerto] = useState("");

  //console.log(email)

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

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Dashboard</h1>
          <h2 className="text-center mb-4">Welcome, {username} !</h2>
          <p className="text-center mb-4">{email}</p>

          <Search username={username} />
          <div className="text-center w-100 text-center mt-3">
            <img
              style={{ borderRadius: 200, width: 65 }}
              src={photoURL}
              alt="Avatar"
              className="avatar"
            />
            <input
              type="file"
              className="text-center mt-2 mb-3"
              onChange={handleChange}
            />
            <Button disabled={loading || !photo} onClick={handleClick}>
              {" "}
              Upload Picture{" "}
            </Button>
          </div>

          <div className="w-100 text-center mt-2">
            <Button
              onClick={async (e) => {
                e.preventDefault();
                logout();
                alert("Logged Out");
                window.sessionStorage.clear();
                navigate("/login");
              }}
            >
              Log Out
            </Button>
          </div>
        </Card.Body>
      </Card>
      <PreviewPlayer />
      <MyRecommendations username={username}/>
    </>
  );
}
