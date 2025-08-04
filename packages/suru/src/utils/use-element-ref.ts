import * as React from "react";

export default function useElementRef(): [
  ref: React.RefObject<unknown>,
  props: {
    className: string;
    ref: React.RefCallback<any>;
  },
] {
  const ref = React.useRef<unknown>(null);
  const uid = React.useId();
  const className = `sui-element-${uid}`;
  const setElement = React.useCallback<React.RefCallback<unknown>>(elem => {
    ref.current = elem;

    return () => {
      ref.current = null;
    };
  }, []);
  const props = React.useMemo(
    () => ({
      ref: setElement,
      className,
    }),
    [
      setElement,
      className,
    ],
  );

  React.useEffect(
    () => {
      // ref が渡せなかった場合のフォールバック
      if (!ref.current) {
        ref.current = document.getElementsByClassName(className).item(0);
      }
    },
    [className],
  );

  return [ref, props];
}
