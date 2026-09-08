const segmenter = new Intl.Segmenter("ja");

// how many backspaces are needed to delete the string
export function graphemeLength(str: string): number {
  return [...segmenter.segment(str)].length;
}

// 現在の文字列の状態を覚えておいて削除命令を発行することで擬似的にVimでIMEのPreEditを実現する
export class PreEdit {
  #current = "";
  #kakutei = "";

  // the pre-edit string currently written to the buffer
  get current(): string {
    return this.#current;
  }

  doKakutei(str: string) {
    this.#kakutei += str;
  }

  output(next: string): string {
    let ret: string;
    // 補完ウィンドウのちらつき防止のため必要のないバックスペースを送らない
    if (!this.#kakutei && next.startsWith(this.#current)) {
      ret = next.slice(this.#current.length);
    } else {
      ret = "\b".repeat(graphemeLength(this.#current)) +
        this.#kakutei + next;
    }
    this.#current = next;
    this.#kakutei = "";
    return ret;
  }
}
