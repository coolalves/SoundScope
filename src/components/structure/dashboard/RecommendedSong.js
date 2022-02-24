import React from 'react'

export default function RecommendedSong(props) {
  return (
    <div className="displayRecommendation" key={props.key}>
        <div className="displaySongRecommended">
          <img src={props.image}></img>
          <div className="songRecommendInfo">
            <h2>{props.title}</h2>
            <h4>{props.name}</h4> 
          </div>
        </div>
        <div className="recommendationText">
          <p>Lorem ipsum dolor sit amet, consectetur adip </p>
        </div>
        <div className="recommendationDate">
           <p>{props.date}</p>
        </div>
      </div>
  )
}
