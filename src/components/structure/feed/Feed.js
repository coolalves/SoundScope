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
          <img src="https://www.legalwiz.in/wp-content/uploads/default-user-profile01-600x600.png" alt="profilepic"></img>
          <h2>{e.recommendedby}</h2>
        </div>

        <RecommendedSong
          key={key}
          image={e.image}
          title={e.title}
          name={e.name}
          date={e.date}
          preview={e.preview}
          txtRecommendation={e.txtRecommendation}
        />
      </div>
    );
  });


  return (
    <div className="app">
      <Navbar />
      <div className="displayFeed">
        <div className="displayAllRecommendations">{mysongs.current}</div>
      </div>
    </div>
  );
}
