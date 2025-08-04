declare global {
  var sui__hash__utf8__buffer: Uint8Array | undefined;
  var sui__hash__utf8__encoder: TextEncoder | undefined;
}

const KiB = 1024;
// UTF-8 エンコードに使用するバッファーのサイズを定義します。
const BUFFER_SIZE = 6 * KiB;
// 安全にバッファーに収まる文字列の最大長を定義します。BUFFER_SIZE の 3 分の 1 のサイズです。
const SAFE_STRING_LENGTH = 2 * KiB;

/**
 * Uint8Array、または Node.js の Buffer 型のいずれかを表す型エイリアスです。
 */
export type Uint8ArrayLike =
  | Uint8Array
  | (typeof globalThis extends { Buffer: new(...args: any) => infer B } ? B : never);

export default {
  /**
   * 引数として渡された文字列を UTF-8 エンコードして `Uint8Array` を返します。
   * 文字列の長さが SAFE_STRING_LENGTH を超える場合は、新しいバッファーを割り当ててエンコードします。
   * それ以外の場合は、パフォーマンス向上のため、事前に準備されたグローバルバッファーを使用してエンコードします。
   *
   * @param input エンコードするテキストが入った文字列です。
   * @returns エンコードされたバイトデータを含む `Uint8Array` です。
   */
  encode(input: string): Uint8Array {
    if (input.length > SAFE_STRING_LENGTH) {
      // バッファーに収まらない可能性があるので、それを使わずにエンコードします。
      return encoder().encode(input);
    }

    // 高速化のために、文字列が一定の長さ以下であれば、事前に準備したバッファーに書き込むことで、頻繁なアロケーションを防止します。
    // 上の処理で文字列の長さが SAFE_STRING_LENGTH 以下であることは確定しています。
    // また、エンコード後の配列の長さが .length の 3 倍を超えることはないので、BUFFER_SIZE のバッファーに収まります。
    // 参考: https://developer.mozilla.org/docs/Web/API/TextEncoder/encodeInto
    const buf = buffer();
    const res = this.encodeInto(input, buf);
    return buf.slice(0, res.written); // コピーします。
  },

  /**
   * エンコードする文字列と、UTF-8 エンコード後のテキスト格納先となるバッファーを受け取り、
   * エンコードの進行状況を示すオブジェクトを返します。
   * このメソッドは TextEncoder の `encodeInto` メソッドのラッパーです。
   *
   * @param input エンコードするテキストが入った文字列です。
   * @param dest UTF-8 エンコードされたテキストを格納するための `Uint8ArrayLike` バッファーです。
   * このバッファーには、バッファーの許容範囲内でエンコードされたテキストが書き込まれます。
   * @returns エンコード操作の結果を示す `TextEncoderEncodeIntoResult` オブジェクトです。
   */
  encodeInto(input: string, dest: Uint8ArrayLike): TextEncoderEncodeIntoResult {
    return encoder().encodeInto(input, dest);
  },
};

/**
 * グローバルスコープにキャッシュされた `Uint8Array` バッファーを返します。
 * バッファーが存在しない場合は、`BUFFER_SIZE` で新しい `Uint8Array` を初期化してキャッシュし、それを返します。
 * この関数は、`sui__hash__utf8__buffer` グローバル変数を遅延初期化するために使用されます。
 *
 * @returns UTF-8 エンコード用の `Uint8Array` バッファーです。
 */
function buffer(): Uint8Array {
  return globalThis.sui__hash__utf8__buffer ||= new Uint8Array(BUFFER_SIZE);
}

/**
 * グローバルスコープにキャッシュされた `TextEncoder` インスタンスを返します。
 * インスタンスが存在しない場合は、新しい `TextEncoder` を初期化してキャッシュし、それを返します。
 * この関数は、`sui__hash__utf8__encoder` グローバル変数を遅延初期化するために使用されます。
 *
 * @returns UTF-8 エンコード用の `TextEncoder` インスタンスです。
 */
function encoder(): TextEncoder {
  return globalThis.sui__hash__utf8__encoder ||= new TextEncoder();
}
