import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link BreadcrumbItem} が持つ状態です。
 */
export type BreadcrumbItemState = {};

export namespace BreadcrumbItemProps {
  export type Render = RenderProps<BreadcrumbItemState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"li", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link BreadcrumbItem} に渡す props です。
 */
export type BreadcrumbItemProps = BreadcrumbItemProps.Render &
  BreadcrumbItemProps.SuruUI &
  BreadcrumbItemProps.BaseUI &
  BreadcrumbItemProps.HTML;

/**
 * パンくずの項目コンポーネントです。
 */
export const BreadcrumbItem: IComponent<BreadcrumbItemProps> = function SuiBreadcrumbItem(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_breadcrumb_item",
      },
    ],
    defaultTagName: "li",
  });
};

export { BreadcrumbItem as Item };

export namespace Item {
  export type State = BreadcrumbItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = BreadcrumbItemProps.Render;

    export type SuruUI = BreadcrumbItemProps.SuruUI;

    export type BaseUI = BreadcrumbItemProps.BaseUI;

    export type HTML = BreadcrumbItemProps.HTML;
  }
}
