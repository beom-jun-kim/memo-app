import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface IMemo {
  id: number;
  text: string;
}

interface IMemoState {
  [key: string]: IMemo[];
}

export const memoState = atom<IMemoState>({
  key: "memo",
  default: {
    ToDO: [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
