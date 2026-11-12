import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import { ChevronRightIcon } from "../../_icons.jsx";
import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useBreadcrumbContext } from "../root/breadcrumb.root.context.js";
import type { BreadcrumbSeparatorContext } from "./breadcrumb.separator.context.js";

/**
 * {@link BreadcrumbSeparator} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type BreadcrumbSeparatorState<TItem = any> = BreadcrumbSeparatorContext<TItem>;

export namespace BreadcrumbSeparatorProps {
  export type Render<TItem = any> = RenderProps<BreadcrumbSeparatorState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<BaseUIComponentProps<"li", never, never>, keyof Render | keyof SuruUI>;
}

/**
 * {@link BreadcrumbSeparator} に渡す props です。
 */
export type BreadcrumbSeparatorProps = BreadcrumbSeparatorProps.Render &
  BreadcrumbSeparatorProps.SuruUI &
  BreadcrumbSeparatorProps.BaseUI &
  BreadcrumbSeparatorProps.HTML;

export type IBreadcrumbSeparator = IComponent<BreadcrumbSeparatorProps>;

/** パンくずの項目を区切るセパレーターコンポーネントです。 */
export const BreadcrumbSeparator: IBreadcrumbSeparator = (props) => {
  const ctx = useBreadcrumbContext();
  const {
    children = <ChevronRightIcon />,
    "aria-hidden": ariaHidden = true,
    ...otherLiProps
  } = props;

  return useRender({
    props: [
      otherLiProps,
      {
        children,
        className: cn<BreadcrumbSeparatorState>(
          "sui_breadcrumb_separator",
          (state) => `sui_breadcrumb_separator-size_${state.size}`,
          (state) => `sui_breadcrumb_separator-color_${state.color}`,
        ),
        "aria-hidden": ariaHidden,
      },
    ],
    state: ctx,
    defaultTagName: "li",
  });
};

export { BreadcrumbSeparator as Separator };
export namespace Separator {
  export type State<TItem = any> = BreadcrumbSeparatorState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = BreadcrumbSeparatorProps.Render<TItem>;

    export type SuruUI = BreadcrumbSeparatorProps.SuruUI;

    export type BaseUI = BreadcrumbSeparatorProps.BaseUI;

    export type HTML = BreadcrumbSeparatorProps.HTML;
  }
}
