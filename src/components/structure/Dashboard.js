//react
import React from "react";

//bootstrap
import { Card, Button, Form } from "react-bootstrap";

//router
import { Link, useNavigate } from "react-router-dom";

//firebase
import { logout, colRef, useAuth, upload } from "../../config/firebase";
import { onSnapshot, query, where, docs } from "firebase/firestore";
import { useState, useEffect } from "react";
import {users} from "../../config/firebase";

//recoil
import { useRecoilValue } from "recoil";
import {useRecoilState } from "recoil"
import {userState} from "../../recoil/atoms/username"
import {userListState} from "../../recoil/atoms/userlist"
import { getUser } from "../../recoil/selectors/getUsername"
import { getEmail } from "../../recoil/selectors/getEmail"
import { getUsers } from "../../recoil/selectors/getAllUsers"

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  
  const uid = window.sessionStorage.getItem("id");
  const loggedname = window.sessionStorage.getItem("username");
  const navigate = useNavigate();
  const q = query(colRef, where("uid", "==", uid));
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [photo, setPhoto] = useState(null);
  const [registered, setRegistered] = useState(false);
  const currentUser = useAuth();
  const [song, setSong] = useState("");
  const [txtSong, setTxtSong] = useState("");
  console.log(currentUser);
  
  const [username, setUsername] = useRecoilState(userState);
  const name = useRecoilValue(getUser);
  const email = useRecoilValue(getEmail);
  console.log(email)
  const[userlist, setUserlist] = useRecoilState(userListState)
  setUserlist(users)
  const allusers = useRecoilValue(getUsers)
  console.log(allusers)

  async function getUserData() {
    setLoading(true);

    onSnapshot(q, (snapshot) => {
      let userdata = [];
      snapshot.docs.forEach((doc) => {
        userdata.push({ ...doc.data(), id: doc.id });
      });
      try {
        if(userdata == []){

        }
        if(name == undefined){
            setUsername(userdata[0].username)
        }
        setLoading(false);
      } catch {
        setRegistered(false);
        console.log(userdata);
        //setName(loggedname);
        setLoading(false);
      }
    });
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

  useEffect(() => {
    getUserData();
  }, []);

 
  
  var songList;
  useEffect(() => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${txtSong}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "4bb5270137msh7798e1355b243c4p19e658jsna5b2299ba91e",
      },
    })
      .then((response) => {
        response.json().then((info) => {
          songList = info.data.map((elmt) => {
            return <p>{elmt.title}</p>;
          });
          setSong(songList);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [txtSong]);

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
          <p className="text-center mb-4">{uid}</p>

          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control
              placeholder="Song name"
              onChange={(e) => {
                setTxtSong(e.target.value);
              }}
            />
            <div>
              {txtSong}
              {song}
            </div>
          </Form.Group>

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
    </>
  );
}
