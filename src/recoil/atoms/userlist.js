import { atom } from "recoil";

export const userListState = atom({
  key: "userList",
  default: [],
});