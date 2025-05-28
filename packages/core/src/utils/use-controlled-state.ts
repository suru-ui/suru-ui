import * as React from "react";

function useControlledState<T>(
  args: Readonly<{
    controlledValue?: T | undefined;
    initialValue: T;
    onChange?: (React.Dispatch<T>) | undefined;
  }>,
): [
  T,
  React.Dispatch<T>,
];

function useControlledState<T>(
  args: Readonly<{
    controlledValue?: T | undefined;
    initialValue?: T | undefined;
    onChange?: (React.Dispatch<T>) | undefined;
  }>,
): [
  T | undefined,
  React.Dispatch<T>,
];

function useControlledState<T>(
  args: Readonly<{
    controlledValue?: T | undefined;
    initialValue?: T | undefined;
    onChange?: (React.Dispatch<T>) | undefined;
  }>,
): [
  T | undefined,
  React.Dispatch<T>,
] {
  const {
    onChange,
    initialValue,
    controlledValue,
  } = args;
  const isControlled = controlledValue !== undefined;
  const initialIsControlled = React.useMemo(() => isControlled, []);
  const [value, setValue] = React.useState(initialValue);

  if (__DEV__) {
    if (initialIsControlled !== isControlled) {
      throw new Error(
        `suru-ui(core): ${initialIsControlled ? "制御された" : "制御されていない"}状態から`
          + `${isControlled ? "制御された" : "制御されていない"}状態に変更することはできません。`,
      );
    }
  }

  return [
    isControlled ? controlledValue : value,
    React.useCallback(
      (newValue: T) => {
        if (!isControlled) {
          setValue(newValue);
        }

        onChange?.(newValue);
      },
      [
        isControlled,
        onChange,
      ],
    ),
  ];
}

export default useControlledState;
