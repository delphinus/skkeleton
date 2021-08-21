import type { Context } from "./context.ts";
import {
  deleteChar,
  henkanPoint,
  inputCancel,
  kanaInput,
} from "./function/input.ts";
import {
  henkanBackward,
  henkanFirst,
  henkanForward,
} from "./function/henkan.ts";
import { disable, escape } from "./function/disable.ts";
import { keyToNotation } from "./notation.ts";

type KeyHandler = (context: Context, char: string) => void | Promise<void>;

type KeyMap = {
  default: KeyHandler;
  map: Record<string, KeyHandler>;
};

const input: KeyMap = {
  default: kanaInput,
  map: {
    ";": henkanPoint,
    "<bs>": deleteChar,
    "<c-g>": inputCancel,
    "<c-h>": deleteChar,
    "<esc>": escape,
    "<space>": henkanFirst,
    "l": disable,
  },
};

const henkan: KeyMap = {
  default: kanaInput,
  map: {
    "<space>": henkanForward,
    "x": henkanBackward,
  },
};

const keyMaps: Record<string, KeyMap> = {
  "input": input,
  "henkan": henkan,
};

export async function handleKey(context: Context, key: string) {
  const keyMap = keyMaps[context.state.type];
  if (!keyMap) {
    throw new Error("Illegal State: " + context.state.type);
  }
  await ((keyMap.map[keyToNotation[key] ?? key] ?? keyMap.default)(
    context,
    key,
  ) ?? Promise.resolve());
}
