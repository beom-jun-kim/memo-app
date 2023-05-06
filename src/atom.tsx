import { atom } from "recoil";

export interface IMemo {
  id:number;
  text:string; 
}

interface IMemoState {
  [key:string]:IMemo[],
}


export const memoState = atom<IMemoState>({
  key: "memo",
  default: {
    ToDO : [],
    Doing: [],
    Done: [],
  },
});
