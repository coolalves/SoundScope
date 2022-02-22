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
import { addDoc } from "firebase/firestore";
import {songs} from "../../config/firebase"

//recoil
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/username";
import { userListState } from "../../recoil/atoms/userlist";
import { getUser } from "../../recoil/selectors/getUsername";
import { getEmail } from "../../recoil/selectors/getEmail";
import { getUsers } from "../../recoil/selectors/getAllUsers";
import { getUid } from "../../recoil/selectors/getUid";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  //const uid = window.sessionStorage.getItem("id");
  const loggedname = window.sessionStorage.getItem("username");
  const navigate = useNavigate();

  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [photo, setPhoto] = useState(null);
  const [registered, setRegistered] = useState(false);
  const currentUser = useAuth();

  //console.log(currentUser);

  const [username, setUsername] = useRecoilState(userState);
  const name = useRecoilValue(getUser);
  const email = useRecoilValue(getEmail);
  const uid = useRecoilValue(getUid);
  console.log(uid);

  const emailcerto = email;
  console.log(useRecoilValue(getEmail));
  const [userlist, setUserlist] = useRecoilState(userListState);
  setUserlist(users);
  const allusers = useRecoilValue(getUsers);
  console.log(allusers);

  for (let i = 0; i < allusers.length; i++) {
    console.log(allusers[i].uid);
    if (allusers[i].uid == uid) {
      setUsername(allusers[i].username);
    } else {
      console.log("corno");
    }
  }

  const [nomecerto, setNomecerto] = useState("");

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

  const [txtSong, setTxtSong] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const [selectedSongInfo, setSelectedSongInfo] = useState([]);
  const [song, setSong] = useState("");

  const getSong = (e) => {
    console.log(e);
    setSelectedSongInfo(e)
    setSelectedSong(
      <div className="boxsongs">
        <div className="songs">
          <img src={e.album.cover_small}></img>

          <div className="songInfo">
            <h2>{e.title}</h2>

            <h4>{e.artist.name}</h4>
          </div>
        </div>
      </div>
    );

    setSong("");
  };

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
            return (
              <div className="boxsongs">
                <div className="songs">
                  <img src={elmt.album.cover_small}></img>
                  <div className="songInfo">
                    <h2>{elmt.title}</h2>
                    <h4>{elmt.artist.name}</h4>
                  </div>
                </div>
                <button
                  onClick={() => {
                    getSong(elmt);
                  }}
                >
                  Adicionar
                </button>
              </div>
            );
          });
          console.log(info.data[0]);
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
  function insertSong(){
    addDoc(colRefSongs, {
        id: selectedSongInfo.id,
        image: selectedSongInfo.album.cover,
        name: selectedSongInfo.artist.name,
        recomendedby: username,
        title: selectedSongInfo.title
      })
      //console.log(selectedSongInfo.id)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Dashboard</h1>
          <h2 className="text-center mb-4">Welcome, {username} !</h2>
          <p className="text-center mb-4">{email}</p>

          <div className="songs">
                  <img src={songs[0].image}></img>
                  <div className="songInfo">
                    <h2>{songs[0].name}</h2>
                    <h4>{songs[0].title}</h4>
                  </div>
        </div>

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

            <div>
              {selectedSong}
              <button onClick={()=>{insertSong()}}>
                recomendar
              </button>
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
