const okuriTable: Record<string, string> = {
  "ぁ": "x",
  "あ": "a",
  "ぃ": "x",
  "い": "i",
  "ぅ": "x",
  "う": "u",
  "ぇ": "x",
  "え": "e",
  "ぉ": "x",
  "お": "o",
  "か": "k",
  "が": "g",
  "き": "k",
  "ぎ": "g",
  "く": "k",
  "ぐ": "g",
  "け": "k",
  "げ": "g",
  "こ": "k",
  "ご": "g",
  "さ": "s",
  "ざ": "z",
  "し": "s",
  "じ": "j",
  "す": "s",
  "ず": "z",
  "せ": "s",
  "ぜ": "z",
  "そ": "s",
  "ぞ": "z",
  "た": "t",
  "だ": "d",
  "ち": "t",
  "ぢ": "d",
  "っ": "x",
  "つ": "t",
  "づ": "d",
  "て": "t",
  "で": "d",
  "と": "t",
  "ど": "d",
  "な": "n",
  "に": "n",
  "ぬ": "n",
  "ね": "n",
  "の": "n",
  "は": "h",
  "ば": "b",
  "ぱ": "p",
  "ひ": "h",
  "び": "b",
  "ぴ": "p",
  "ふ": "h",
  "ぶ": "b",
  "ぷ": "p",
  "へ": "h",
  "べ": "b",
  "ぺ": "p",
  "ほ": "h",
  "ぼ": "b",
  "ぽ": "p",
  "ま": "m",
  "み": "m",
  "む": "m",
  "め": "m",
  "も": "m",
  "ゃ": "x",
  "や": "y",
  "ゅ": "x",
  "ゆ": "y",
  "ょ": "x",
  "よ": "y",
  "ら": "r",
  "り": "r",
  "る": "r",
  "れ": "r",
  "ろ": "r",
  "ゎ": "x",
  "わ": "w",
  "ゐ": "x",
  "ゑ": "x",
  "を": "w",
  "ん": "n",
};

export function getOkuriStr(word: string, okuri: string): string {
  // 「送っ」のような段階で変換する際は、タ行の入力がされているように振る舞う
  // libskkなどはこの動作を行う
  // 根拠として、促音のほとんどがタ行という調査結果が挙げられる
  // https://blog.atusy.net/2023/08/01/skk-azik-and-sokuon-okuri/
  if (okuri === "っ") {
    return word + "t";
  }
  const alpha = okuriTable[okuri.match(/[^っ]/)?.[0] ?? ""];
  return word + alpha;
}

/**
 * 読みを送り仮名の位置で切った [語幹, 送り仮名] の組を、送り仮名が短いものから
 * 順に返す。
 *
 * `minStemLength` に 2 以上を渡すと、語幹がその文字数に満たない組を落とす。
 * 補完のように送り仮名の位置を推測して引く場面では、全ての位置で切るので語幹が
 * 1 文字の組 (「あ」+「くせ」など) まで生まれる。語幹が短い見出しは候補を多く
 * 持つため、読みと無関係な候補 (「開くせ」…) が大量に出る。
 *
 * ただし送り仮名が 1 文字の組 (「あ」+「く」→「開く」) は、語幹が短くても読みと
 * 候補が食い違わないので落とさない。1 以下なら制限しない。
 */
export function okuriSplits(
  text: string,
  minStemLength = 0,
): [string, string][] {
  if (text === "") {
    return [];
  }
  const chars = [...text];
  const result: [string, string][] = [];
  for (let i = chars.length - 1; i >= 1; i--) {
    if (i < minStemLength && chars.length - i > 1) {
      continue;
    }
    result.push([chars.slice(0, i).join(""), chars.slice(i).join("")]);
  }
  return result;
}
