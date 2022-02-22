import React, {useEffect} from "react";
import "../../styles/app.css";

import { songs } from "../../config/firebase";

const MyRecommendations = (props) => {

    useEffect(() => {

    })
  let mysongs = [];
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].recommendedby == props.username) {
      mysongs.push(songs[i]);
      console.log(mysongs);
    }
  }

  return mysongs.map((e) => {
    return (
        
      <div className="boxsongs" key={e.title}>
        <div className="songs">
          <img src={e.image}></img>
          <div className="songInfo">
            <h2>{e.title}</h2>
            <h4>{e.name}</h4>
            <p>{e.date}</p>
          </div>
        </div>
      </div>
    );
  });
};

export default MyRecommendations;
