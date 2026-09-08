import { config } from "./config.ts";
import { HenkanType } from "./dictionary.ts";
import { PreEdit } from "./preedit.ts";
import { HenkanState, initializeState, State, toString } from "./state.ts";

import type { Denops } from "@denops/std";

type CandidateResult = {
  type: HenkanType;
  word: string;
  candidate: string;
};

// what |skkeleton-functions-kakuteiUndo| needs to take the last kakutei back
type KakuteiResult = {
  // the string the kakutei has inserted into the buffer
  kakutei: string;
  // the line before the cursor as it was right after the kakutei
  // used to make sure that the buffer has not been changed since then
  bufferText: string;
  // the henkan state just before the kakutei
  state: HenkanState;
  // the skkeleton mode at the kakutei
  mode: string;
};

export class Context {
  denops?: Denops;
  state: State = initializeState({});
  // g:skkeleton#mode copy
  // set from modeChange()
  mode = "hira"; // state of skkeleton#mode
  preEdit = new PreEdit();
  vimMode = "";
  // the line before the cursor
  // received from Vim on every handle()
  prevInput = "";
  lastCandidate: CandidateResult = {
    type: "okurinasi",
    word: "",
    candidate: "",
  };
  lastKakutei: KakuteiResult | undefined;

  kakutei(str: string) {
    this.preEdit.doKakutei(str);
  }

  kakuteiWithUndoPoint(str: string) {
    if (config.setUndoPoint && this.vimMode === "i") {
      str += "\x07u";
    }
    this.preEdit.doKakutei(str);
  }

  toString() {
    return toString(this.state);
  }
}
