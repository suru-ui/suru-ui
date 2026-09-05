import * as React from "react";

type Config = {
  /**
   * `children` 以外のプロパティーを設定に結合して子孫に提供するコンポーネントです。
   *
   * 親の設定を引き継ぎ、変更されたキーのみを上書きします。
   * すべての値が `Object.is` で等しい場合は親の設定を使い回すため、余分な再レンダーを起こしません。
   */
  readonly Context: {
    (props: { children?: React.ReactNode; [key: string]: unknown }): React.ReactElement;
    displayName?: string | undefined;
  };

  readonly get: {
    /**
     * キーに対応する値をそのまま返します。
     *
     * @param key 取り出す値のキーです。
     * @returns キーに対応する値です。
     */
    (key: string): unknown;

    /**
     * 値が型ガードを満たす場合のみその値を返します。
     * 満たさない場合は `null` を返します。
     *
     * @param key 取り出す値のキーです。
     * @param typeGuard 値の型を判定する型ガードです。
     * @returns 型ガードを満たす値または `null` です。
     */
    <TValue>(key: string, typeGuard: (value: any) => value is TValue): TValue | null;

    /**
     * 値が型ガードを満たす場合のみその値を返します。
     * 満たさない場合は既定値を返します。
     *
     * @param key 取り出す値のキーです。
     * @param typeGuard 値の型を判定する型ガードです。
     * @param defaultValue 型ガードを満たさない場合に返す値です。
     * @returns 型ガードを満たす値または既定値です。
     */
    <TValue, const TDefaultValue>(
      key: string,
      typeGuard: (value: any) => value is TValue,
      defaultValue: TDefaultValue,
    ): TValue | TDefaultValue;
  };
};

/**
 * 対応表を持つ内部的な設定です。
 */
type ConfigState = Config & {
  /**
   * キーと値の対応表です。
   *
   * @internal
   */
  readonly map: Record<string, unknown>;
};

/**
 * 何も持たない初期設定です。
 *
 * コンテキストの既定値として使います。
 */
const config: ConfigState = {
  map: {},

  get(
    key: string,
    typeGuard: (value: any) => boolean = () => true,
    defaultValue: unknown = null,
  ): unknown {
    const value = this.map[key];
    if (typeGuard(value)) {
      return value;
    }

    return defaultValue;
  },

  Context(props: { children?: React.ReactNode; [key: string]: unknown }): React.ReactElement {
    const config = React.use(Config) as ConfigState;
    const { children, ...values } = props;

    const set: Record<string, unknown> = {};
    let dirty = false;
    for (const key in values) {
      if (!Object.is(config.map[key], values[key])) {
        set[key] = values[key];
        dirty = true;
      }
    }

    return (
      <Config value={dirty ? { ...config, map: { ...config.map, ...set } } : config}>
        {children}
      </Config>
    );
  },
};

/**
 * グローバルな値を共有するコンテキストです。
 *
 * `React.use(Config)` で設定を取り出し、`get` で読み取ります。
 * 値は取り出した設定の `Context` から提供します。
 */
const Config: React.Context<Config> = React.createContext<Config>(config);

export default Config;
