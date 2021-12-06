import { disable } from "../function/disable.ts";
import { henkanFirst } from "../function/henkan.ts";
import { henkanPoint } from "../function/input.ts";
import { zenkaku } from "../function/mode.ts";
import { katakana } from "../function/mode.ts";
import type { KanaTable } from "./type.ts";

export const romToHira: KanaTable = [
  ["<s-l>", zenkaku],
  [" ", henkanFirst],
  ["!", ["！", ""]],
  [",", ["、", ""]],
  ["-", ["ー", ""]],
  [".", ["。", ""]],
  [":", ["：", ""]],
  [";", henkanPoint],
  ["?", ["？", ""]],
  ["[", ["「", ""]],
  ["]", ["」", ""]],
  ["a", ["あ", ""]],
  ["ba", ["ば", ""]],
  ["bb", ["っ", "b"]],
  ["be", ["べ", ""]],
  ["bi", ["び", ""]],
  ["bo", ["ぼ", ""]],
  ["bu", ["ぶ", ""]],
  ["bya", ["びゃ", ""]],
  ["bye", ["びぇ", ""]],
  ["byi", ["びぃ", ""]],
  ["byo", ["びょ", ""]],
  ["byu", ["びゅ", ""]],
  ["cc", ["っ", "c"]],
  ["cha", ["ちゃ", ""]],
  ["che", ["ちぇ", ""]],
  ["chi", ["ち", ""]],
  ["cho", ["ちょ", ""]],
  ["chu", ["ちゅ", ""]],
  ["cya", ["ちゃ", ""]],
  ["cye", ["ちぇ", ""]],
  ["cyi", ["ちぃ", ""]],
  ["cyo", ["ちょ", ""]],
  ["cyu", ["ちゅ", ""]],
  ["da", ["だ", ""]],
  ["dd", ["っ", "d"]],
  ["de", ["で", ""]],
  ["dha", ["でゃ", ""]],
  ["dhe", ["でぇ", ""]],
  ["dhi", ["でぃ", ""]],
  ["dho", ["でょ", ""]],
  ["dhu", ["でゅ", ""]],
  ["di", ["ぢ", ""]],
  ["do", ["ど", ""]],
  ["du", ["づ", ""]],
  ["dya", ["ぢゃ", ""]],
  ["dye", ["ぢぇ", ""]],
  ["dyi", ["ぢぃ", ""]],
  ["dyo", ["ぢょ", ""]],
  ["dyu", ["ぢゅ", ""]],
  ["e", ["え", ""]],
  ["fa", ["ふぁ", ""]],
  ["fe", ["ふぇ", ""]],
  ["ff", ["っ", "f"]],
  ["fi", ["ふぃ", ""]],
  ["fo", ["ふぉ", ""]],
  ["fu", ["ふ", ""]],
  ["fya", ["ふゃ", ""]],
  ["fye", ["ふぇ", ""]],
  ["fyi", ["ふぃ", ""]],
  ["fyo", ["ふょ", ""]],
  ["fyu", ["ふゅ", ""]],
  ["ga", ["が", ""]],
  ["ge", ["げ", ""]],
  ["gg", ["っ", "g"]],
  ["gi", ["ぎ", ""]],
  ["go", ["ご", ""]],
  ["gu", ["ぐ", ""]],
  ["gya", ["ぎゃ", ""]],
  ["gye", ["ぎぇ", ""]],
  ["gyi", ["ぎぃ", ""]],
  ["gyo", ["ぎょ", ""]],
  ["gyu", ["ぎゅ", ""]],
  ["ha", ["は", ""]],
  ["he", ["へ", ""]],
  ["hh", ["っ", "h"]],
  ["hi", ["ひ", ""]],
  ["ho", ["ほ", ""]],
  ["hu", ["ふ", ""]],
  ["hya", ["ひゃ", ""]],
  ["hye", ["ひぇ", ""]],
  ["hyi", ["ひぃ", ""]],
  ["hyo", ["ひょ", ""]],
  ["hyu", ["ひゅ", ""]],
  ["i", ["い", ""]],
  ["ja", ["じゃ", ""]],
  ["je", ["じぇ", ""]],
  ["ji", ["じ", ""]],
  ["jj", ["っ", "j"]],
  ["jo", ["じょ", ""]],
  ["ju", ["じゅ", ""]],
  ["jya", ["じゃ", ""]],
  ["jye", ["じぇ", ""]],
  ["jyi", ["じぃ", ""]],
  ["jyo", ["じょ", ""]],
  ["jyu", ["じゅ", ""]],
  ["ka", ["か", ""]],
  ["ke", ["け", ""]],
  ["ki", ["き", ""]],
  ["kk", ["っ", "k"]],
  ["ko", ["こ", ""]],
  ["ku", ["く", ""]],
  ["kya", ["きゃ", ""]],
  ["kye", ["きぇ", ""]],
  ["kyi", ["きぃ", ""]],
  ["kyo", ["きょ", ""]],
  ["kyu", ["きゅ", ""]],
  ["l", disable],
  ["ma", ["ま", ""]],
  ["me", ["め", ""]],
  ["mi", ["み", ""]],
  ["mm", ["っ", "m"]],
  ["mo", ["も", ""]],
  ["mu", ["む", ""]],
  ["mya", ["みゃ", ""]],
  ["mye", ["みぇ", ""]],
  ["myi", ["みぃ", ""]],
  ["myo", ["みょ", ""]],
  ["myu", ["みゅ", ""]],
  ["n", ["ん", ""]],
  ["n'", ["ん", ""]],
  ["na", ["な", ""]],
  ["ne", ["ね", ""]],
  ["ni", ["に", ""]],
  ["nn", ["ん", ""]],
  ["no", ["の", ""]],
  ["nu", ["ぬ", ""]],
  ["nya", ["にゃ", ""]],
  ["nye", ["にぇ", ""]],
  ["nyi", ["にぃ", ""]],
  ["nyo", ["にょ", ""]],
  ["nyu", ["にゅ", ""]],
  ["o", ["お", ""]],
  ["pa", ["ぱ", ""]],
  ["pe", ["ぺ", ""]],
  ["pi", ["ぴ", ""]],
  ["po", ["ぽ", ""]],
  ["pp", ["っ", "p"]],
  ["pu", ["ぷ", ""]],
  ["pya", ["ぴゃ", ""]],
  ["pye", ["ぴぇ", ""]],
  ["pyi", ["ぴぃ", ""]],
  ["pyo", ["ぴょ", ""]],
  ["pyu", ["ぴゅ", ""]],
  ["q", katakana],
  ["ra", ["ら", ""]],
  ["re", ["れ", ""]],
  ["ri", ["り", ""]],
  ["ro", ["ろ", ""]],
  ["rr", ["っ", "r"]],
  ["ru", ["る", ""]],
  ["rya", ["りゃ", ""]],
  ["rye", ["りぇ", ""]],
  ["ryi", ["りぃ", ""]],
  ["ryo", ["りょ", ""]],
  ["ryu", ["りゅ", ""]],
  ["sa", ["さ", ""]],
  ["se", ["せ", ""]],
  ["sha", ["しゃ", ""]],
  ["she", ["しぇ", ""]],
  ["shi", ["し", ""]],
  ["sho", ["しょ", ""]],
  ["shu", ["しゅ", ""]],
  ["si", ["し", ""]],
  ["so", ["そ", ""]],
  ["ss", ["っ", "s"]],
  ["su", ["す", ""]],
  ["sya", ["しゃ", ""]],
  ["sye", ["しぇ", ""]],
  ["syi", ["しぃ", ""]],
  ["syo", ["しょ", ""]],
  ["syu", ["しゅ", ""]],
  ["ta", ["た", ""]],
  ["te", ["て", ""]],
  ["tha", ["てぁ", ""]],
  ["the", ["てぇ", ""]],
  ["thi", ["てぃ", ""]],
  ["tho", ["てょ", ""]],
  ["thu", ["てゅ", ""]],
  ["ti", ["ち", ""]],
  ["to", ["と", ""]],
  ["tsu", ["つ", ""]],
  ["tt", ["っ", "t"]],
  ["tu", ["つ", ""]],
  ["tya", ["ちゃ", ""]],
  ["tye", ["ちぇ", ""]],
  ["tyi", ["ちぃ", ""]],
  ["tyo", ["ちょ", ""]],
  ["tyu", ["ちゅ", ""]],
  ["u", ["う", ""]],
  ["va", ["ゔぁ", ""]],
  ["ve", ["ゔぇ", ""]],
  ["vi", ["ゔぃ", ""]],
  ["vo", ["ゔぉ", ""]],
  ["vu", ["ゔ", ""]],
  ["vv", ["っ", "v"]],
  ["wa", ["わ", ""]],
  ["we", ["うぇ", ""]],
  ["wi", ["うぃ", ""]],
  ["wo", ["を", ""]],
  ["wu", ["う", ""]],
  ["ww", ["っ", "w"]],
  ["xa", ["ぁ", ""]],
  ["xe", ["ぇ", ""]],
  ["xi", ["ぃ", ""]],
  ["xka", ["か", ""]],
  ["xke", ["け", ""]],
  ["xo", ["ぉ", ""]],
  ["xtsu", ["っ", ""]],
  ["xtu", ["っ", ""]],
  ["xu", ["ぅ", ""]],
  ["xwa", ["ゎ", ""]],
  ["xwe", ["ゑ", ""]],
  ["xwi", ["ゐ", ""]],
  ["xx", ["っ", "x"]],
  ["xya", ["ゃ", ""]],
  ["xyo", ["ょ", ""]],
  ["xyu", ["ゅ", ""]],
  ["ya", ["や", ""]],
  ["ye", ["いぇ", ""]],
  ["yo", ["よ", ""]],
  ["yu", ["ゆ", ""]],
  ["yy", ["っ", "y"]],
  ["z,", ["‥", ""]],
  ["z-", ["～", ""]],
  ["z.", ["…", ""]],
  ["z/", ["・", ""]],
  ["z[", ["『", ""]],
  ["z]", ["』", ""]],
  ["za", ["ざ", ""]],
  ["ze", ["ぜ", ""]],
  ["zh", ["←", ""]],
  ["zi", ["じ", ""]],
  ["zj", ["↓", ""]],
  ["zk", ["↑", ""]],
  ["zl", ["→", ""]],
  ["zo", ["ぞ", ""]],
  ["zu", ["ず", ""]],
  ["zya", ["じゃ", ""]],
  ["zye", ["じぇ", ""]],
  ["zyi", ["じぃ", ""]],
  ["zyo", ["じょ", ""]],
  ["zyu", ["じゅ", ""]],
  ["zz", ["っ", "z"]],
];
