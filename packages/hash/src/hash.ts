// See: https://github.com/fastify/fast-json-stringify/tree/v5.16.0

import createContext, { type Context } from "./create-context";
import digest from "./digest";
import type { SerializableObject, SerializableValue } from "./types";
import update from "./update";

const stringEscapeRegex = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]/;

function inner(c: Context, value: SerializableValue): void {
  if (value === null) {
    // JSON ではないので null と undefined を区別する。
    update(c, "null");
  } else if (value === undefined) {
    // JSON ではないので null と undefined を区別する。
    update(c, "undefined");
  } else if (value === true) {
    update(c, "true");
  } else if (value === false) {
    update(c, "false");
  } else if (typeof value === "string") {
    const nBytes = value.length;

    if (nBytes <= 0) {
      update(c, "\"\"");
    } else if (nBytes < 5000 && !stringEscapeRegex.test(value)) {
      update(c, "\"" + value + "\"");
    } else {
      update(c, JSON.stringify(value));
    }
  } else if (typeof value === "number") {
    // JSON ではないので NaN を許容し、Infinity と -Infinity を null と区別する。
    if (value !== value) {
      update(c, "NaN");
    } else if (value === Infinity) {
      update(c, "Infinity");
    } else if (value === -Infinity) {
      update(c, "-Infinity");
    } else {
      update(c, "" + value);
    }
  } else if (typeof value === "bigint") {
    update(c, "" + value);
  } else if (Object.hasOwn(value, "toPrimitive")) {
    // @ts-expect-error
    inner(c, value.toPrimitive());
  } else if (Object.hasOwn(value, "toString")) {
    inner(c, value.toString());
  } else if (Array.isArray(value)) {
    update(c, "[");

    for (let i = 0, n = value.length; i < n; i++) {
      inner(c, value[i]);
      update(c, ",");
    }

    update(c, "]");
  } else {
    update(c, "{");

    for (
      let i = 0,
        key: string,
        keys = Object.keys(value),
        nKeys = keys.length;
      i < nKeys;
      i++
    ) {
      update(c, (key = keys[i]!) + ":");
      inner(c, (value as SerializableObject)[key]);
      update(c, ",");
    }

    update(c, "}");
  }
}

/**
 * JavaScript の値のハッシュ値を計算する。
 *
 * @param value ハッシュ化する値
 * @returns 36 進数表記のハッシュ値
 */
export default function hash(value: SerializableValue): string {
  if (value === "") {
    // コンテキストの h1 の初期値が 0 なので、空文字列の場合は "0" を返す。
    return "0";
  }

  const c = createContext();
  inner(c, value);

  return digest(c).toString(36);
}
