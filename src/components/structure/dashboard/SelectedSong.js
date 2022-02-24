import React from "react";

export default function SelectedSong(props) {
  return (
    <>
      <img src={props.img}></img>
      <h1>{props.title}</h1>
      <h2>{props.artist}</h2>
    </>
  );
}
