import { selector } from "recoil";
import { emailState } from "../atoms/email";

export const getEmail = selector({
  key: "getEmail", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const email = get(emailState);

    return email;
  },
});
