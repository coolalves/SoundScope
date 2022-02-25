import React, { useRef } from "react";
import Navbar from "../dashboard/Navbar";
import RecommendedSong from "../dashboard/RecommendedSong";

import { songs } from "../../../config/firebase";

export default function Feed() {
  console.log(songs);

  let mysongs = useRef([]);

  mysongs.current = songs.map((e, key) => {
    return (
      <div>
        <div className="userInfo">
          <img src="http://www.jokopost.com/wp-content/uploads/2015/09/%D7%90%D7%99%D7%A7%D7%A1-commons.wikimedia.org_.png"></img>
          <h2>{e.recommendedby}</h2>
        </div>

        <RecommendedSong
          key={key}
          image={e.image}
          title={e.title}
          name={e.name}
          date={e.date}
        />
      </div>
    );
  });

  console.log(mysongs);

  return (
    <div className="app">
      <Navbar />
      <div className="displayFeed">
        <div className="displayAllRecommendations">{mysongs.current}</div>
      </div>
    </div>
  );
}
