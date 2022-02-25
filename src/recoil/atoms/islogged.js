import { atom } from "recoil";


export const isLogged = atom({
  key: "loggedState", // unique ID (with respect to other atoms/selectors)
  default: {loggedIn: false}, // default value (aka initial value)
  
});
