/**
 * 文字コードが大文字のアルファベットかどうかを判定する。
 *
 * @param code 文字コード
 * @returns 文字コードが大文字のアルファベットなら `true`、そうでなければ `false`
 */
function isUpperAlphabet(code: number): boolean {
  return code >= 65 && code <= 90; // A-Z
}

/**
 * ハンドラーのプロパティー名かどうかを判定する。
 *
 * @param name プロパティー名
 * @returns ハンドラーのプロパティー名なら `true`、そうでなければ `false`
 */
export default function isHandlerPropName(name: string): boolean {
  return (name.charCodeAt(0) === 111 && name.charCodeAt(1) === 110) // on
    && isUpperAlphabet(name.charCodeAt(2));
}
