import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ListItem} が持つ状態です。
 */
export type ListItemState = {};

export namespace ListItemProps {
  export type Render = RenderProps<ListItemState>;

  export type SuruUI = {
    /**
     * 項目を無効な見た目にするかどうかを指定します。
     *
     * @default false
     */
    disabled?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"li", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ListItem} に渡す props です。
 */
export type ListItemProps = ListItemProps.Render &
  ListItemProps.SuruUI &
  ListItemProps.BaseUI &
  ListItemProps.HTML;

/**
 * リストの項目コンポーネントです。
 */
export const ListItem: IComponent<ListItemProps> = function SuiListItem(props) {
  const { disabled = false, ...otherLiProps } = props;

  return useRender({
    props: [
      otherLiProps,
      {
        className: cn("sui_list_item", disabled && "sui_list_item-disabled"),
      },
    ],
    defaultTagName: "li",
  });
};

export { ListItem as Item };

export namespace Item {
  export type State = ListItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ListItemProps.Render;

    export type SuruUI = ListItemProps.SuruUI;

    export type BaseUI = ListItemProps.BaseUI;

    export type HTML = ListItemProps.HTML;
  }
}
