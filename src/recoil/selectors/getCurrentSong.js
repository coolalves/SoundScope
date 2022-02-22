import { selector } from "recoil";
import { currentsongState } from "../atoms/currentsong";

export const getCurrentSong = selector({
  key: "getCurrentSong",
  get: ({ get }) => {
    const currentsong = get(currentsongState);

    return currentsong;
  },
});
