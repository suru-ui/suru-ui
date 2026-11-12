/**
 * 検証フェーズの失敗を表す例外です。
 *
 * この例外が投げられた時点でファイルは一切書き換えていないため、そのまま再実行できます。
 * 実行フェーズの失敗とは区別し、呼び出し側で表示を切り替えます。
 */
class ValidationError extends Error {}

export { ValidationError };
