import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useActionGroupContext } from "./action-group.context.js";
import type { ActionGroupRootOrientation } from "./action-group.root.jsx";

/**
 * {@link ActionGroupSeparator} が持つ状態です。
 */
export type ActionGroupSeparatorState = {};

export namespace ActionGroupSeparatorProps {
  export type Render = RenderProps<ActionGroupSeparatorState>;

  export type SuruUI = {
    /**
     * 区切り線の向きを指定します。省略時は親 ActionGroup の向きを使用します。
     */
    orientation?: ActionGroupRootOrientation | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ActionGroupSeparator} に渡す props です。
 */
export type ActionGroupSeparatorProps = ActionGroupSeparatorProps.Render &
  ActionGroupSeparatorProps.SuruUI &
  ActionGroupSeparatorProps.BaseUI &
  ActionGroupSeparatorProps.HTML;

/**
 * ActionGroup 内のアイテムを区切る要素です。
 */
export const ActionGroupSeparator: IComponent<ActionGroupSeparatorProps> =
  function SuiActionGroupSeparator(props) {
    const ctx = useActionGroupContext(true);
    const {
      className,
      orientation: orientationProp,
      "aria-orientation": ariaOrientation = orientationProp ?? ctx?.orientation ?? "horizontal",
      ...otherDivProps
    } = props;
    const orientation = orientationProp ?? ctx?.orientation ?? "horizontal";

    return useRender({
      props: [
        otherDivProps,
        {
          role: "separator",
          className: cn(
            className,
            "sui_action_group_separator",
            `sui_action_group_separator-orientation_${orientation}`,
          ),
          "aria-orientation": ariaOrientation,
        },
      ],
      defaultTagName: "div",
    });
  };

export { ActionGroupSeparator as Separator };

export namespace Separator {
  export type State = ActionGroupSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ActionGroupSeparatorProps.Render;

    export type SuruUI = ActionGroupSeparatorProps.SuruUI;

    export type BaseUI = ActionGroupSeparatorProps.BaseUI;

    export type HTML = ActionGroupSeparatorProps.HTML;
  }
}
