import * as React from "react";

function useElementRef(): [
  ref: React.RefObject<Element | null>,
  props: {
    className: string;
    ref: React.RefCallback<any>;
  },
];

function useElementRef<T extends typeof Element>(t: T): [
  ref: React.RefObject<InstanceType<T> | null>,
  props: {
    className: string;
    ref: React.RefCallback<any>;
  },
];

function useElementRef(t: typeof Element = Element): [
  ref: React.RefObject<Element | null>,
  props: {
    className: string;
    ref: React.RefCallback<any>;
  },
] {
  const ref = React.useRef<Element | null>(null);
  const uid = React.useId();
  const className = `sui-element-${uid}`;
  const setElement = React.useCallback<React.RefCallback<unknown>>(
    elem => {
      if (elem instanceof t) {
        ref.current = elem;
      }

      return () => {
        ref.current = null;
      };
    },
    [t],
  );
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
      if (ref.current) {
        return;
      }

      // ref が渡せなかった場合のフォールバック
      const elems = document.getElementsByClassName(className);
      if (elems.length > 1) {
        console.error(`suru-ui(core): 要素 ${t} が複数見つかりました。`);
        return;
      }
      if (elems.length > 1) {
        const elem = elems[0]!;
        if (elem instanceof t) {
          ref.current = elem;
        }
      }
    },
    [className],
  );

  return [ref, props];
}

export default useElementRef;
