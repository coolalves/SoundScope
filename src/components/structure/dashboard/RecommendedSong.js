import React, { useState, useRef } from "react";
import { IoMdPlay } from "react-icons/io";
import { IoMdPause } from "react-icons/io";

export default function RecommendedSong(props) {
  const [isPlaying, setIsplaying] = useState(true);
  const audioPlayer = useRef();

  const togglePlayPause = () => {
    setIsplaying(!isPlaying);

    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  return (
    <div className="displayRecommendation" key={props.key}>
      <div className="displaySongRecommended">
        <img src={props.image} alt="img"></img>
        <div className="songRecommendInfo">
          <h2>{props.title}</h2>
          <h4>{props.name}</h4>
        </div>
      </div>
      <div className="recommendationText">
        <p>{props.txtRecommendation} </p>
      </div>
      <div className="recommendationDate">
        <audio ref={audioPlayer} src={props.preview}></audio>
        <p>{props.date}</p>
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
