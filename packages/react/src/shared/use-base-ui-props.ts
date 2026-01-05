import MemoMap from "./memo-map.js";
import toBaseUiProps, { type UnknownBaseUiProps } from "./to-base-ui-props.js";
import useSingleton from "./use-singleton.js";

/**
 * Suru UI のコンポーネントに渡されたプロパティー (`userProps`) と、コンポーネント内部で定義されたデフォルト/ベースのプロパティー (`componentProps`) を結合し、Base UI コンポーネントに渡すためのプロパティーオブジェクトを返します。
 *
 * このフックは、プロパティーの結合と変換に加えて、`MemoMap` を使用したプロパティーのキャッシュメカニズムを提供します。これにより、不必要な結合処理やイベントハンドラーの再生成を防ぎ、パフォーマンスを最適化します。
 *
 * @template TUserProps ユーザーからコンポーネントに渡されたプロパティーの型です。
 * @template TComponentProps コンポーネント内部で設定されたベースプロパティー（デフォルト値など）の型です。
 * @param userProps ユーザーがコンポーネントに指定したプロパティーオブジェクトです。
 * @param componentProps コンポーネント自身が定義した、結合対象となるベースのプロパティーオブジェクトです。
 * @returns 結合および変換された Base UI 用のプロパティーオブジェクトです。
 */
export default function useBaseUiProps<
  TUserProps extends UnknownBaseUiProps,
  TComponentProps extends UnknownBaseUiProps,
>(
  userProps: TUserProps,
  componentProps: TComponentProps,
) {
  const kvs = useSingleton(() => new Map());
  using cache = new MemoMap(kvs);
  const props = toBaseUiProps(componentProps, userProps, cache);

  return props;
}
