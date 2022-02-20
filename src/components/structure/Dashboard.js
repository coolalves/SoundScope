import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout, colRef, useAuth, upload } from "../../config/firebase";
import { onSnapshot, query, where, docs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const email = window.sessionStorage.getItem("useremail");
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

  async function getUserData() {
    setLoading(true);
    onSnapshot(q, (snapshot) => {
      let userdata = [];
      snapshot.docs.forEach((doc) => {
        userdata.push({ ...doc.data(), id: doc.id });
      });
      try {
        setName(userdata[0].username);
        updateProfile(currentUser, { displayName: name });
        setRegistered(true);
        setLoading(false);
      } catch {
        setRegistered(false);
        console.log(userdata);
        setName(loggedname);
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
          <h2 className="text-center mb-4">Welcome, {name} !</h2>
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
