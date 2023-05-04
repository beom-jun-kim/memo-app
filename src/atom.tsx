import { atom } from "recoil";

interface IMemoState {
  [key:string]:string[],
}

export const memoState = atom<IMemoState>({
  key: "memo",
  default: {
    "To Do" : ["a","b"],
    Doing: ["c","d"],
    Done: ["f"],
  },
});
