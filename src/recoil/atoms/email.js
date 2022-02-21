import { atom } from "recoil";

export const emailState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });