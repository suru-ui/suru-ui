import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useBreadcrumbContext } from "../root/breadcrumb.root.context.js";
import type { BreadcrumbItemContext } from "./breadcrumb.item.context.js";

/**
 * {@link BreadcrumbItem} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type BreadcrumbItemState<TItem = any> = BreadcrumbItemContext<TItem>;

export namespace BreadcrumbItemProps {
  export type Render<TItem = any> = RenderProps<BreadcrumbItemState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<BaseUIComponentProps<"li", never, never>, keyof Render | keyof SuruUI>;
}

/**
 * {@link BreadcrumbItem} に渡す props です。
 */
export type BreadcrumbItemProps = BreadcrumbItemProps.Render &
  BreadcrumbItemProps.SuruUI &
  BreadcrumbItemProps.BaseUI &
  BreadcrumbItemProps.HTML;

export type IBreadcrumbItem = IComponent<BreadcrumbItemProps>;

/** パンくずの項目コンポーネントです。 */
export const BreadcrumbItem: IBreadcrumbItem = (props) => {
  const ctx = useBreadcrumbContext();

  return useRender({
    props: [
      props,
      {
        className: cn<BreadcrumbItemState>(
          "sui_breadcrumb_item",
          (state) => `sui_breadcrumb_item-size_${state.size}`,
          (state) => `sui_breadcrumb_item-color_${state.color}`,
        ),
      },
    ],
    state: ctx,
    defaultTagName: "li",
  });
};

export { BreadcrumbItem as Item };
export namespace Item {
  export type State<TItem = any> = BreadcrumbItemState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = BreadcrumbItemProps.Render<TItem>;

    export type SuruUI = BreadcrumbItemProps.SuruUI;

    export type BaseUI = BreadcrumbItemProps.BaseUI;

    export type HTML = BreadcrumbItemProps.HTML;
  }
}
