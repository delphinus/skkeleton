import { okuriSplits } from "./okuri.ts";

import { assertEquals } from "@std/assert/equals";

Deno.test({
  name: "split",
  fn() {
    const expect = [
      ["ばりか", "た"],
      ["ばり", "かた"],
      ["ば", "りかた"],
    ];
    assertEquals(okuriSplits("ばりかた"), expect);
    assertEquals(okuriSplits("あ"), []);
    assertEquals(okuriSplits(""), []);
  },
});

Deno.test({
  name: "split with minStemLength",
  fn() {
    // 語幹が下限に満たない組が落ちる
    assertEquals(okuriSplits("ばりかた", 2), [
      ["ばりか", "た"],
      ["ばり", "かた"],
    ]);
    assertEquals(okuriSplits("ばりかた", 3), [["ばりか", "た"]]);
    // 下限が読みの長さを超えても、送り仮名 1 文字の組は残る
    assertEquals(okuriSplits("ばりかた", 99), [["ばりか", "た"]]);
    // 1 以下は制限なし (従来の動作)
    assertEquals(okuriSplits("ばりかた", 1), okuriSplits("ばりかた"));
    assertEquals(okuriSplits("ばりかた", 0), okuriSplits("ばりかた"));
    assertEquals(okuriSplits("ばりかた", -1), okuriSplits("ばりかた"));
    // 語幹 1 文字でも送り仮名が 1 文字なら残す (「あ」+「く」→「開く」)
    assertEquals(okuriSplits("あく", 2), [["あ", "く"]]);
    assertEquals(okuriSplits("あ", 2), []);
    assertEquals(okuriSplits("", 2), []);
    // 語幹 1 文字 + 送り仮名 2 文字以上 (候補を大量に持つ見出しになる) が落ちる
    assertEquals(okuriSplits("あくせ", 2), [["あく", "せ"]]);
    assertEquals(
      okuriSplits("きんようびのよてい", 2).map(([word]) => word),
      [
        "きんようびのよて",
        "きんようびのよ",
        "きんようびの",
        "きんようび",
        "きんよう",
        "きんよ",
        "きん",
      ],
    );
  },
});
