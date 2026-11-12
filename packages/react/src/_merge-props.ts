// 参考 : https://github.com/mui/base-ui/blob/v1.7.0/packages/react/src/merge-props/mergeProps.ts。

import type { WithBaseUIEvent } from "@base-ui/react/internals/types";
import { mergePropsN, mergeClassNames } from "@base-ui/react/merge-props";
import { mergeObjects } from "@base-ui/utils/mergeObjects";
import type * as React from "react";

import type { RenderProps } from "./_use-render.js";

type ElementType = React.ElementType;

type PropsOf<T extends React.ElementType> = WithBaseUIEvent<React.ComponentPropsWithRef<T>>;

type InputProps<T extends React.ElementType> =
  | PropsOf<T>
  | ((otherProps: PropsOf<T>) => PropsOf<T>)
  | undefined;

export default function mergeProps<T extends ElementType>(propsList: InputProps<T>[]): PropsOf<T> {
  if (propsList.length < 2) {
    return mergePropsN(propsList);
  }

  const renderProps: RenderProps = {};
  const mergedProps = mergePropsN(
    propsList.map((propsItem) => {
      if (typeof propsItem === "function") {
        const propsFactory = propsItem;

        // oxlint-disable-next-line typescript/explicit-function-return-type -- mergePropsN が返り値の型を推論します。
        return (...args) => {
          const { style, render, className, ...props } = propsFactory(...args);
          mergeInto(renderProps, {
            style,
            render,
            className,
          });

          return props;
        };
      }

      if (propsItem) {
        const { style, render, className, ...props } = propsItem;
        mergeInto(renderProps, {
          style,
          render,
          className,
        });

        return props;
      }

      // oxlint-disable-next-line typescript/consistent-return -- 未定義の項目はそのまま返します。
      return propsItem satisfies undefined;
    }),
  );

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- 呼び出し元の props 型に依存するため。
  return {
    ...mergedProps,
    ...renderProps,
  } as any;
}

function mergeInto(merged: RenderProps, input: Required<RenderProps> | undefined): RenderProps {
  if (!input) {
    return merged;
  }

  const { style, render, className } = input;

  if (style !== undefined) {
    if (merged.style === undefined) {
      merged.style = style;
    } else if (typeof merged.style !== "function" && typeof style !== "function") {
      merged.style = mergeObjects(merged.style, style);
    } else {
      const ourStyle = merged.style;
      const theirStyle = style;
      merged.style = function mergedStyle(state): React.CSSProperties | undefined {
        return mergeObjects(resolveStyle(ourStyle, state), resolveStyle(theirStyle, state));
      };
    }
  }

  if (className !== undefined) {
    if (merged.className === undefined) {
      merged.className = className;
    } else if (typeof merged.className === "string" && typeof className === "string") {
      merged.className = mergeClassNames(merged.className, className);
    } else {
      const ourClassName = merged.className;
      const theirClassName = className;
      merged.className = function mergedClassName(state): string | undefined {
        return mergeClassNames(
          resolveClassName(ourClassName, state),
          resolveClassName(theirClassName, state),
        );
      };
    }
  }

  if (render !== undefined) {
    merged.render = render;
  }

  return merged;
}

function resolveStyle(style: RenderProps["style"], state: any): React.CSSProperties | undefined {
  return typeof style === "function" ? style(state) : style;
}

function resolveClassName(className: RenderProps["className"], state: any): string | undefined {
  return typeof className === "function" ? className(state) : className;
}
