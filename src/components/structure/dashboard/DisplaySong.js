import React, { useState, useRef } from "react";
import { IoMdPlay } from "react-icons/io";
import { IoMdPause } from "react-icons/io";

export default function DisplaySong(props) {
  const [isPlaying, setIsplaying] = useState(true);
  const audioPlayer = useRef();

  let dataSong = {
    id: props.id,
    title: props.title,
    artist: props.artist,
    img: props.img,
    preview: props.preview
  };

  const togglePlayPause = () => {
    setIsplaying(!isPlaying);
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  return (
    <div className="boxsongs">
      <div className="songs">
        <img src={props.img}></img>
        <div className="songInfo">
          <h2>{props.title}</h2>
          <h4>{props.artist}</h4>
        </div>
      </div>
      <div className="displayButton">
        <audio ref={audioPlayer} src={props.preview}></audio>

        <button
          className="buttonAdd"
          onClick={() => {
            props.getSong(dataSong);
          }}
        >
          Adicionar
        </button>

        <button
          className="buttonPlayPause"
          onClick={() => {
            togglePlayPause();
          }}
        >
          {isPlaying ? <IoMdPlay /> : <IoMdPause />}
        </button>
      </div>
    </div>
  );
}
