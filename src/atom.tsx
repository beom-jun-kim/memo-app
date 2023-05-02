import { atom } from "recoil";

export const memoState = atom({
  key: "memo",
  default: ["a", "b", "c", "d"],
});
