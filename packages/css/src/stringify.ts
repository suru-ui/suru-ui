import type {
  SerializableArray,
  SerializablePrimitive,
  SerializablePrimitiveObject,
} from "@suru-ui/hash";

/**
 * CSS 値の配列型です。
 */
export type CssValueArray = SerializableArray;

/**
 * CSS 値のプリミティブ型です。
 */
export type CssValuePrimitive = SerializablePrimitive;

/**
 * CSS 値のプリミティブになれるオブジェクト型です。
 */
export type CssValuePrimitiveObject = SerializablePrimitiveObject;

/**
 * CSS 値の型です。
 */
export type CssValue =
  | CssValueArray
  | CssValuePrimitive
  | CssValuePrimitiveObject;

/**
 * CSS 値を文字列に変換します。
 * この関数は、CSS in JS ライブラリにおいて、JavaScript の値を実際の CSS 文字列に変換するために使用されます。
 *
 * @param value CSS 値です。`CssValue` 型に定義されたあらゆる値を受け入れます。
 * @returns 文字列に変換された CSS 値です。変換できない場合は空文字列を返します。
 */
export default function stringify(value: CssValue): string {
  if (value == null) {
    return "";
  }

  switch (typeof value) {
    case "number":
      switch (value) {
        case Infinity:
          return "infinity";
        case -Infinity:
          return "-infinity";
        case value:
          return "" + value;
      }
      break;

    case "string":
      return value;

    case "object":
    case "function":
      switch (true) {
        case Object.hasOwn(value, "toPrimitive"):
          // @ts-expect-error `toPrimitive` メソッドの存在は `Object.hasOwn` で確認済みです。
          return stringify(value.toPrimitive());
        case Object.hasOwn(value, "toString"):
          return value.toString();
        case Object.hasOwn(value, "toJSON"):
          // @ts-expect-error `toJSON` メソッドの存在は `Object.hasOwn` で確認済みです。
          return stringify(value.toJSON());
        case Array.isArray(value): {
          let acc = "";
          for (let i = 0, n = value.length; i < n; i++) {
            acc += value[i];
            (i + 1 < n) && (acc += " ");
          }
          return acc;
        }
      }
      break;

    case "boolean":
      return value && "true" || "false";

    case "bigint":
      return "" + value;
  }

  if (__DEV__) {
    console.error("suru-ui(cssinjs): CSS の値に変換できない値が含まれています:", value);
  }

  return "";
}
