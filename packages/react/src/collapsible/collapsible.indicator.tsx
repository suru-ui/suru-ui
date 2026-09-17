import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import { ChevronRightIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link CollapsibleIndicator} が持つ状態です。
 */
export type CollapsibleIndicatorState = {};

export namespace CollapsibleIndicatorProps {
  export type Render = RenderProps<CollapsibleIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CollapsibleIndicator} に渡す props です。
 */
export type CollapsibleIndicatorProps = CollapsibleIndicatorProps.Render &
  CollapsibleIndicatorProps.SuruUI &
  CollapsibleIndicatorProps.BaseUI &
  CollapsibleIndicatorProps.HTML;

/**
 * コラプシブルの展開状態を示すアイコンを表示するコンポーネントです。
 *
 * 開閉に合わせて回転し、現在の状態を視覚的に伝えます。
 */
export const CollapsibleIndicator: IComponent<CollapsibleIndicatorProps> =
  function SuiCollapsibleIndicator(props) {
    const { children = <ChevronRightIcon />, ...otherSpanProps } = props;

    return useRender({
      props: [
        otherSpanProps,
        {
          children,
          className: "sui_collapsible_indicator",
        },
      ],
      defaultTagName: "span",
    });
  };

export { CollapsibleIndicator as Indicator };

export namespace Indicator {
  export type State = CollapsibleIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CollapsibleIndicatorProps.Render;

    export type SuruUI = CollapsibleIndicatorProps.SuruUI;

    export type BaseUI = CollapsibleIndicatorProps.BaseUI;

    export type HTML = CollapsibleIndicatorProps.HTML;
  }
}
