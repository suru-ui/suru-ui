import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import { ChevronRightIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { defaultBreadcrumbContext } from "./_breadcrumb.jsx";
import { type BreadcrumbContext, useBreadcrumbContext } from "./breadcrumb.context.js";

/**
 * {@link BreadcrumbSeparator} が持つ状態です。
 */
export type BreadcrumbSeparatorState = BreadcrumbContext;

export namespace BreadcrumbSeparatorProps {
  export type Render = RenderProps<BreadcrumbSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"li", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link BreadcrumbSeparator} に渡す props です。
 */
export type BreadcrumbSeparatorProps = BreadcrumbSeparatorProps.Render &
  BreadcrumbSeparatorProps.SuruUI &
  BreadcrumbSeparatorProps.BaseUI &
  BreadcrumbSeparatorProps.HTML;

export type IBreadcrumbSeparator = IComponent<BreadcrumbSeparatorProps>;

/**
 * パンくずの項目を区切るセパレーターコンポーネントです。
 */
export const BreadcrumbSeparator: IBreadcrumbSeparator = function SuiBreadcrumbSeparator(props) {
  const ctx = useBreadcrumbContext(true);
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
        className: "sui_breadcrumb_separator",
        "aria-hidden": ariaHidden,
      },
    ],
    state: { ...defaultBreadcrumbContext, ...ctx },
    defaultTagName: "li",
  });
};

export { BreadcrumbSeparator as Separator };

export namespace Separator {
  export type State = BreadcrumbSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = BreadcrumbSeparatorProps.Render;

    export type SuruUI = BreadcrumbSeparatorProps.SuruUI;

    export type BaseUI = BreadcrumbSeparatorProps.BaseUI;

    export type HTML = BreadcrumbSeparatorProps.HTML;
  }
}
