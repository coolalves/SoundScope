import { selector } from "recoil";
import { recommendedState } from "../atoms/recommended";

export const getRecommended = selector({
  key: "getRecommended",
  get: ({ get }) => {
    const recommendedList = get(recommendedState);

    return recommendedList;
  },
});
