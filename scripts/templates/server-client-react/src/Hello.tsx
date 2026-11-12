import type { JSX } from "react";

/**
 * 挨拶を表示するコンポーネントです。
 *
 * @param props コンポーネントのプロパティーです。
 * @param props.name 挨拶に含める名前です。
 *
 * @returns 挨拶の要素です。
 */
export function Hello({ name }: Readonly<{ name: string }>): JSX.Element {
  return <p>Hello, {name}!</p>;
}
