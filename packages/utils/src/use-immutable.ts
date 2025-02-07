import * as React from "react";

export type UseImmutableOptions<T = unknown> = Readonly<{
  scope?: string | undefined;
  value?: string | undefined;
  equals?: ((a: T, b: T) => boolean) | undefined;
}>;

export default function useImmutable<T>(
  value: T,
  options?: UseImmutableOptions<T> | undefined | null | false | 0 | "",
): T {
  const [v] = React.useState(value);

  if (__DEV__) {
    const {
      scope = "utils",
      value: valueName = `値 ${String(v)}`,
      equals = (a: unknown, b: unknown) => Object.is(a, b),
    } = options || {};

    React.useEffect(
      () => {
        if (equals(v, value)) {
          return;
        }

        console.error(`suru-ui(${scope}): ${valueName} を変更することはできません。`);
      },
      [value],
    );
  }

  return v;
}
