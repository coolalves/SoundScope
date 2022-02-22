import React from "react";
import { useRecoilValue } from "recoil";
import { getCurrentSong } from "../../recoil/selectors/getCurrentSong";
//css
import "../../styles/app.css";

const PreviewPlayer = () => {
  const currentSong = useRecoilValue(getCurrentSong);
  console.log(currentSong);
  if (currentSong) {
    return (
      <div className="boxsongs">
        <div className="songs">
          <img src={currentSong.album.cover_small}></img>
          <div className="songInfo">
            <h2>{currentSong.title}</h2>
            <h4>{currentSong.artist.name}</h4>
          </div>
        </div>
      </div>
    );
  }else{
      return<></>
  }
};

export default PreviewPlayer;
