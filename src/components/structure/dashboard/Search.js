import React from "react";
import { useState, useEffect, useRef } from "react";
import { addDoc } from "firebase/firestore";
import { colRefSongs } from "../../../config/firebase";

import { useRecoilState } from "recoil";
import { currentsongState } from "../../../recoil/atoms/currentsong";
import DisplaySong from "./DisplaySong";
import SelectedSong from "./SelectedSong";

import "../../../styles/app.css";

const Search = (props) => {
  console.log(props.username);

  //current date
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let currentDate =
    day + "/" + (month + 1) + "/" + year + " - " + hour + "h" + minutes + "m";


  //console.log(currentDate)

  const [txtSong, setTxtSong] = useState("");
  const [selectedSongInfo, setSelectedSongInfo] = useState([]);
  const [song, setSong] = useState("");
  const [play, setPlay] = useState(false);
  const [songLink, setSongLink] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useRecoilState(currentsongState);

  let audio = new Audio(songLink);

  // togglePlay = () => {};

  const txtSongHandler = (e) => {
    if (e.target.value == "") {
      setSongs(initialSongs.current);
    }

    setTxtSong(e.target.value);
  };

  const getSong = (elmt) => {
    setSelectedSongInfo(elmt);
  };

  const removeSelectedSong = () => {
    setSelectedSongInfo({});
  };

  const initialSongs = useRef([]);

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
          if (info.data != undefined) {
            setSongs(info.data);
            console.log(songs);
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [txtSong]);

  useEffect(() => {
    fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/6553547464", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "4bb5270137msh7798e1355b243c4p19e658jsna5b2299ba91e",
      },
    })
      .then((response) => {
        response.json().then((info) => {
          setSongs(info.tracks.data);
          initialSongs.current = info.tracks.data;
          console.log(initialSongs.current);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function insertSong() {
    addDoc(colRefSongs, {
      id: selectedSongInfo.id,
      image: selectedSongInfo.img,
      name: selectedSongInfo.artist,
      recommendedby: props.username,
      title: selectedSongInfo.title,
      date: currentDate,
      preview: selectedSongInfo.preview,
    });
  }

  let showSongs = songs.map((e, key) => {
    return (
      <DisplaySong
        key={key}
        title={e.title}
        artist={e.artist.name}
        img={e.album.cover_xl}
        id={e.id}
        preview={e.preview}
        getSong={getSong}
      />
    );
  });

  let emptyObject = Object.keys(selectedSongInfo).length === 0;

  return (
    <div className="displaySearch">
      <div className="displayLeft">
        <div className="displaySelectedSong">
          {!emptyObject ? (
            <SelectedSong
              title={selectedSongInfo.title}
              artist={selectedSongInfo.artist}
              img={selectedSongInfo.img}
            />
          ) : (
            <p>Adicione uma música</p>
          )}
          {!emptyObject ? (
            <button
              onClick={() => {
                removeSelectedSong();
              }}
            >
              {" "}
              Remover{" "}
            </button>
          ) : null}
        </div>
        <div className="displayInteraction">
          <input
            className="displaySelectSong"
            onChange={(e) => {
              txtSongHandler(e);
            }}
            placeholder="Search"
          ></input>

          <input className="commentary"></input>

          <button
            onClick={() => {
              insertSong();
            }}
          >
            Recomendar
          </button>
        </div>
      </div>

      <div className="displayRight">{showSongs}</div>
    </div>
  );
};

export default Search;
