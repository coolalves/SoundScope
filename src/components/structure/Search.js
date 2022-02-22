import React from "react";
import { useState, useEffect } from "react";
import { addDoc } from "firebase/firestore";
import { colRefSongs } from "../../config/firebase";

import { getUser } from "../../recoil/selectors/getUsername";
import { useRecoilValue } from "recoil";

import "../../styles/app.css";

const Search = (props) => {
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
  const [selectedSong, setSelectedSong] = useState("");
  const [selectedSongInfo, setSelectedSongInfo] = useState([]);
  const [song, setSong] = useState("");
  //const username = useRecoilValue(getUser);

  const txtSongHandler = (e) => {
    setTxtSong(e.target.value);

    if (e.target.value === "") {
      setSong("");
    }
  };

  const getSong = (e) => {
    console.log(e);
    setSelectedSongInfo(e);
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

  function insertSong() {
    addDoc(colRefSongs, {
      id: selectedSongInfo.id,
      image: selectedSongInfo.album.cover,
      name: selectedSongInfo.artist.name,
      recomendedby: props.username,
      title: selectedSongInfo.title,
      date: currentDate,
    });
    //console.log(selectedSongInfo.id)
  }

  return (
    <>
      <label>Search</label>

      <input
        onChange={(e) => {
          txtSongHandler(e);
        }}
        placeholder="Search"
      ></input>

      <div>
        {txtSong}
        {song}
      </div>

      <div>
        {selectedSong}
        <button
          onClick={() => {
            insertSong();
          }}
        >
          recomendar
        </button>
      </div>
    </>
  );
};

export default Search;
