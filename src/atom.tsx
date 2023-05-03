import { atom } from "recoil";

interface IMemoState {
  [key:string]:string[],
}

export const memoState = atom<IMemoState>({
  key: "memo",
  default: {
    to_do : ["a","b"],
    doing: ["c","d"],
    done: ["f"],
  },
});
