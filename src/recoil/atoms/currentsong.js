import { atom } from "recoil";

export const currentsongState = atom({
  key: "currentsong", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
