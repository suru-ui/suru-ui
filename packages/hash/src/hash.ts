// 参考: https://github.com/mikolalysenko/murmurhash-js
// 参考: https://github.com/fastify/fast-json-stringify/tree/v5.16.0

import utf8 from "./utf8";

/**
 * 文字列に変換することが可能なプリミティブ型です。
 */
export type SerializablePrimitive =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;

/**
 * 文字列に変換することが可能なプリミティブになれる型です。
 */
export type SerializablePrimitiveObject =
  | { readonly toJSON: () => string }
  | { readonly toString: () => string }
  | { readonly toPrimitive: () => SerializablePrimitive };

/**
 * 文字列に変換することが可能な配列です。
 */
export type SerializableArray = readonly SerializableValue[];

/**
 * 文字列に変換することが可能なオブジェクトです。
 */
export type SerializableObject = { readonly [_ in string]?: SerializableValue };

/**
 * 文字列に変換することが可能な値の型です。
 */
export type SerializableValue =
  | SerializablePrimitive
  | SerializablePrimitiveObject
  | SerializableArray
  | SerializableObject;

// 文字列のエスケープが必要な文字をチェックするための正規表現です。
const stringEscapeRegex = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]/;

/**
 * MurmurHash3 アルゴリズムを使用してハッシュダイジェストを生成するクラスです。
 */
export default class Hash {
  /**
   * 最後の更新時に余ったデータのバイト数です。
   */
  private m: number;

  /**
   * 全データのバイト数です。
   */
  private n: number;

  /**
   * 最後の更新時に使ったデータのバイト数です。
   */
  private b: number;

  /**
   * 最後の更新時における全データです。
   */
  private k: string;

  /**
   * ハッシュ計算の中間結果を保持するハッシュ値です。
   */
  private h1: number;

  /**
   * ハッシュダイジェストを生成するために使用できるハッシュオブジェクトを作成します。
   *
   * @param seed シード値です。ハッシュ計算の初期値として使用されます。
   */
  public constructor(seed: number | undefined = 0) {
    this.m = 0;
    this.n = 0;
    this.b = 0;
    this.k = "";
    this.h1 = seed;
  }

  /**
   * ハッシュ計算のために入力文字列を内部的に更新します。
   *
   * @param s 更新する文字列です。
   */
  // dprint-ignore
  private _update(s: string): void {
    if (__DEV__) {
      if (s.length !== utf8.encode(s).length) {
        console.error("suru-ui(hash): 文字コードが 0xFF を超える文字が含まれています:", s);
      }
    }

    let i = 0;
    let k1: number;
    let h1b: number;
    let mod = "";

    // 前回の update で余ったデータを取得します。
    if (this.m === 3) {
      mod = this.k[this.b]! + this.k[this.b + 1] + this.k[this.b + 2];
    } else if (this.m === 2) {
      mod = this.k[this.b]! + this.k[this.b + 1];
    } else if (this.m === 1) {
      mod = this.k[this.b]!;
    }

    // 変数 m, n, b, k を更新します。
    this.b = (this.k = mod + s).length - (this.m = this.k.length & 3);
    this.n += s.length;

    while (i < this.b) {
      k1 = (this.k.charCodeAt(i) & 0xff)
        | ((this.k.charCodeAt(++i) & 0xff) << 8)
        | ((this.k.charCodeAt(++i) & 0xff) << 16)
        | ((this.k.charCodeAt(++i) & 0xff) << 24);
      ++i;

      k1 = (((k1 & 0xffff) * 0xcc9e2d51) + ((((k1 >>> 16) * 0xcc9e2d51) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = (((k1 & 0xffff) * 0x1b873593) + ((((k1 >>> 16) * 0x1b873593) & 0xffff) << 16)) & 0xffffffff;

      this.h1 ^= k1;

      this.h1 = (this.h1 << 13) | (this.h1 >>> 19);
      h1b = (((this.h1 & 0xffff) * 5) + ((((this.h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
      this.h1 = ((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
    }
  }

  /**
   * ハッシュダイジェストの生成に必要な入力データを追加します。
   * さまざまな型の値を文字列に変換して内部のハッシュ状態を更新します。
   *
   * @param value 文字列に変換可能な値です。
   * @returns この Hash オブジェクト自体を返します。チェインメソッドを可能にします。
   */
  public update(value: SerializableValue): this {
    if (value === null) {
      // JSON ではないので null と undefined を区別します。
      this._update("null");
    } else if (value === undefined) {
      // JSON ではないので null と undefined を区別します。
      this._update("undefined");
    } else if (value === true) {
      this._update("true");
    } else if (value === false) {
      this._update("false");
    } else if (typeof value === "string") {
      const len = value.length;
      if (len <= 0) {
        this._update("\"\"");
      } else if (len < 5000 && !stringEscapeRegex.test(value)) {
        this._update("\"" + value + "\"");
      } else {
        this._update(JSON.stringify(value));
      }
    } else if (typeof value === "number") {
      // JSON ではないので NaN を許容し、Infinity と -Infinity を null と区別します。
      if (value !== value) {
        this._update("NaN");
      } else if (value === Infinity) {
        this._update("Inf");
      } else if (value === -Infinity) {
        this._update("-Inf");
      } else {
        this._update("" + value);
      }
    } else if (typeof value === "bigint") {
      this._update("" + value);
    } else if (Object.hasOwn(value, "toPrimitive")) {
      // @ts-expect-error
      this.update(value.toPrimitive());
    } else if (Object.hasOwn(value, "toString")) {
      this.update(value.toString());
    } else if (Object.hasOwn(value, "toJSON")) {
      // @ts-expect-error
      this.update(value.toJSON());
    } else if (Array.isArray(value)) {
      this._update("[");
      for (let i = 0, n = value.length; i < n; i++) {
        this.update(value[i]);
        this._update(",");
      }
      this._update("]");
    } else if (typeof value === "object") {
      this._update("{");
      for (
        let i = 0,
          key: string,
          keys = Object.keys(value),
          nKeys = keys.length;
        i < nKeys;
        i++
      ) {
        this._update((key = keys[i]!) + ":");
        this.update((value as SerializableObject)[key]);
        this._update(",");
      }
      this._update("}");
    } else if (__DEV__) {
      console.error(
        "suru-ui(hash): 文字列に変換できない値が入力されました:",
        value satisfies never,
      );
    }

    return this;
  }

  /**
   * ハッシュダイジェストを生成し、その数値を返します。
   * 内部の状態を最終的にミキシングしてハッシュ値を完成させます。
   *
   * @returns 32 ビット符号なし整数のハッシュダイジェストです。
   */
  // dprint-ignore
  public digest(): number {
    let k1 = 0;

    if (this.m === 3) {
      k1 ^= (this.k.charCodeAt(this.b + 2) & 0xff) << 16;
    } else if (this.m === 2) {
      k1 ^= (this.k.charCodeAt(this.b + 1) & 0xff) << 8;
    } else if (this.m === 1) {
      k1 ^= this.k.charCodeAt(this.b) & 0xff
    }

    k1 = (((k1 & 0xffff) * 0xcc9e2d51) + ((((k1 >>> 16) * 0xcc9e2d51) & 0xffff) << 16)) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = (((k1 & 0xffff) * 0x1b873593) + ((((k1 >>> 16) * 0x1b873593) & 0xffff) << 16)) & 0xffffffff;

    this.h1 ^= k1;

    this.h1 ^= this.n;

    this.h1 ^= this.h1 >>> 16;
    this.h1 = (((this.h1 & 0xffff) * 0x85ebca6b) + ((((this.h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
    this.h1 ^= this.h1 >>> 13;
    this.h1 = (((this.h1 & 0xffff) * 0xc2b2ae35) + ((((this.h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff;
    this.h1 ^= this.h1 >>> 16;

    return this.h1 >>> 0
  }
}
