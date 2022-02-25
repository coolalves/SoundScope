import React, { useEffect } from "react";
import "../../../styles/app.css";
import RecommendedSong from "./RecommendedSong";

import { songs } from "../../../config/firebase";

const MyRecommendations = (props) => {
  let mysongs = [];
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].recommendedby == props.username) {
      mysongs.push(songs[i]);
      console.log(mysongs);
    }
  }

  return mysongs.map((e,key) => {
    return (

      <RecommendedSong key={key} image={e.image} title={e.title} name = {e.name} date = {e.date} preview ={e.preview}/>

    );
  });
};

export default MyRecommendations;
