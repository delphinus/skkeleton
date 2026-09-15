import {
  buildCompleteItems,
  buildOkuriariCompleteItems,
  buildOkurinasiCompleteItems,
} from "./completion.ts";

import { assertEquals } from "@std/assert/equals";

Deno.test({
  name: "buildOkurinasiCompleteItems",
  fn() {
    const items = buildOkurinasiCompleteItems(
      [
        ["い", ["伊"]],
        ["あ", ["亜亜;note", "唖"]],
      ],
      [
        ["亜亜;note", 2],
        ["唖", 5],
      ],
    );

    assertEquals(
      items.map((item) => [item.word, item.abbr, item.info]),
      [
        ["唖", "唖", ""],
        ["亜亜", "亜亜", "note"],
        ["伊", "伊", ""],
      ],
    );
    assertEquals(JSON.parse(items[1].user_data), {
      tag: "skkeleton",
      midasi: "あ",
      word: "亜亜;note",
      type: "okurinasi",
    });
  },
});

Deno.test({
  name: "buildOkurinasiCompleteItems splits annotation at the first ';'",
  fn() {
    const items = buildOkurinasiCompleteItems(
      [["あ", ["亜;アジアの亜", "愛;love;愛情", ";注釈だけ"]]],
      [],
    );

    assertEquals(
      items.map((item) => [item.word, item.abbr, item.info]),
      [
        ["亜", "亜", "アジアの亜"],
        ["愛", "愛", "love;愛情"],
        ["", "", "注釈だけ"],
      ],
    );
  },
});

Deno.test({
  name: "buildOkurinasiCompleteItems keeps candidates sharing a word",
  fn() {
    const items = buildOkurinasiCompleteItems(
      [["ほん", ["本;book", "本;origin"]]],
      [],
    );

    assertEquals(items.map((item) => [item.word, item.info, item.dup]), [
      ["本", "book", 1],
      ["本", "origin", 1],
    ]);
  },
});

Deno.test({
  name: "buildOkuriariCompleteItems",
  async fn() {
    const items = await buildOkuriariCompleteItems("あた", (midasi) => {
      assertEquals(midasi, "あt");
      return Promise.resolve(["当方;hit"]);
    });

    assertEquals(
      items.map((item) => [item.word, item.abbr, item.info]),
      [["当方た", "当方た", "hit"]],
    );
    assertEquals(JSON.parse(items[0].user_data), {
      tag: "skkeleton",
      midasi: "あt",
      word: "当方;hit",
      type: "okuriari",
    });
  },
});

Deno.test({
  name: "buildCompleteItems",
  async fn() {
    const items = await buildCompleteItems(
      [["あ", ["亜"]]],
      [],
      "あた",
      () => Promise.resolve(["当"]),
    );

    assertEquals(
      items.map((item) => item.word),
      ["亜", "当た"],
    );
  },
});

Deno.test({
  name: "buildCompleteItems with minStemLength",
  async fn() {
    const looked: string[] = [];
    const getCandidates = (midasi: string) => {
      looked.push(midasi);
      return Promise.resolve(["当"]);
    };

    // 制限なしでは読みを全ての位置で切るので、語幹 1 文字の見出しまで引く
    looked.length = 0;
    const all = await buildCompleteItems([], [], "あたり", getCandidates);
    assertEquals(looked, ["あたr", "あt"]);
    assertEquals(all.map((item) => item.word), ["当り", "当たり"]);

    // 語幹 2 文字以上に絞ると、「あ」+「たり」が落ちる
    looked.length = 0;
    const limited = await buildCompleteItems(
      [],
      [],
      "あたり",
      getCandidates,
      2,
    );
    assertEquals(looked, ["あたr"]);
    assertEquals(limited.map((item) => item.word), ["当り"]);

    // 語幹が下限に満たなくても、送り仮名 1 文字の組は残る
    looked.length = 0;
    const shortKana = await buildCompleteItems(
      [],
      [],
      "あた",
      getCandidates,
      2,
    );
    assertEquals(looked, ["あt"]);
    assertEquals(shortKana.map((item) => item.word), ["当た"]);

    // 送りなしの候補は下限の影響を受けない
    looked.length = 0;
    const withOkurinasi = await buildCompleteItems(
      [["あ", ["亜"]]],
      [],
      "あたり",
      getCandidates,
      2,
    );
    assertEquals(withOkurinasi.map((item) => item.word), ["亜", "当り"]);
  },
});
