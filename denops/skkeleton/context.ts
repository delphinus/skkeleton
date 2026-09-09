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

// a kakutei whose bufferText is not known yet
// the completion engine writes to the buffer by itself, so where the cursor
// ends up is only learned from the prevInput of the next key handling
type PendingKakuteiResult = Omit<KakuteiResult, "bufferText">;

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
  pendingKakutei: PendingKakuteiResult | undefined;

  // complete a kakutei done by a completion engine
  // called on every key handling: prevInput has just been received from Vim,
  // so it tells where the completion has left the cursor
  resolvePendingKakutei() {
    const pending = this.pendingKakutei;
    if (!pending) {
      return;
    }
    this.pendingKakutei = void 0;
    this.lastKakutei = this.prevInput.endsWith(pending.kakutei)
      ? { ...pending, bufferText: this.prevInput }
      : void 0;
  }

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
