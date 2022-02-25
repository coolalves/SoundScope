import { selector } from "recoil";
import { isLogged } from "../atoms/islogged";

export const getIsLogged = selector({
  key: "geIsLogged", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const loggedStatus = get(isLogged);

    return loggedStatus;
  },
});