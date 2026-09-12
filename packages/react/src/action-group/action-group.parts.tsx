import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./action-group.css";

// Context
// -------

/**
 * グループアイテムの配色です。
 */
export type ActionGroupContextColor = Color;

/**
 * グループアイテムの向きです。
 */
export type ActionGroupContextOrientation = "horizontal" | "vertical";

/**
 * グループアイテムの角丸です。
 */
export type ActionGroupContextRadius = "none" | Size | "full";

/**
 * グループアイテムのサイズです。
 */
export type ActionGroupContextSize = Size;

/**
 * グループアイテムの主な外観です。
 */
export type ActionGroupContextVariant = ColorTemplate;

/**
 * {@link ActionGroupRoot} が子パーツへ提供するコンテキストです。
 */
export type ActionGroupContext = {
  /**
   * グループアイテムの配色です。
   */
  readonly color: ActionGroupContextColor;

  /**
   * グループアイテムの向きです。
   */
  readonly orientation: ActionGroupContextOrientation;

  /**
   * グループアイテムの枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * グループアイテムの角丸です。
   */
  readonly radius: ActionGroupContextRadius;

  /**
   * グループアイテムのサイズです。
   */
  readonly size: ActionGroupContextSize;

  /**
   * グループアイテムの主な外観です。
   */
  readonly variant: ActionGroupContextVariant;
};

/**
 * {@link ActionGroupRoot} のスタイルを子要素へ伝播するコンテキストです。
 */
export const ActionGroupContext: React.Context<ActionGroupContext | null> =
  React.createContext<ActionGroupContext | null>(null);

function useSuiActionGroupContext(optional?: false): ActionGroupContext;
function useSuiActionGroupContext(optional?: boolean): ActionGroupContext | null;
function useSuiActionGroupContext(optional?: boolean): ActionGroupContext | null {
  const ctx = React.use(ActionGroupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ActionGroupContext",
      providerName: "ActionGroupRoot",
    });
  }

  return ctx;
}

/**
 * {@link ActionGroupContext} を読み取るフックです。
 */
export const useActionGroupContext: IUseContext<ActionGroupContext> = useSuiActionGroupContext;

export { ActionGroupContext as Context, useActionGroupContext as useContext };

export namespace Context {
  export type Color = ActionGroupContextColor;

  export type Orientation = ActionGroupContextOrientation;

  export type Radius = ActionGroupContextRadius;

  export type Size = ActionGroupContextSize;

  export type Variant = ActionGroupContextVariant;
}

// Root
// ----

/**
 * アクショングループの配色です。
 */
export type ActionGroupRootColor = Color;

/**
 * アクショングループの向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type ActionGroupRootOrientation = "horizontal" | "vertical";

/**
 * アクショングループの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ActionGroupRootRadius = "none" | Size | "full";

/**
 * アクショングループの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ActionGroupRootSize = Size;

/**
 * アクショングループの主な外観の種類です。
 *
 * - `"solid"`: 塗りつぶしスタイル
 * - `"naked"`: 背景のないテキストのみ
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ActionGroupRootVariant = ColorTemplate;

/**
 * {@link ActionGroupRoot} が持つ状態です。
 */
export type ActionGroupRootState = {};

export namespace ActionGroupRootProps {
  export type Render = RenderProps<ActionGroupRootState>;

  export type SuruUI = {
    /**
     * グループアイテムの色を指定します。
     *
     * @default "grey"
     */
    color?: ActionGroupRootColor | undefined;

    /**
     * グループアイテムの向きを指定します。
     *
     * @default "horizontal"
     */
    orientation?: ActionGroupRootOrientation | undefined;

    /**
     * グループアイテムの枠線を表示するかどうかを指定します。
     */
    outlined?: boolean | undefined;

    /**
     * グループアイテムの角丸を指定します。
     *
     * 既定値は {@link ActionGroupRootProps.size|size}
     */
    radius?: ActionGroupRootRadius | undefined;

    /**
     * グループアイテムのサイズを指定します。
     *
     * @default "md"
     */
    size?: ActionGroupRootSize | undefined;

    /**
     * グループアイテムの主な外観を指定します。
     *
     * @default "solid"
     */
    variant?: ActionGroupRootVariant | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ActionGroupRoot} に渡す props です。
 *
 * グループに指定したスタイルプロパティーは、グループアイテムの指定より優先されます。
 */
export type ActionGroupRootProps = ActionGroupRootProps.Render &
  ActionGroupRootProps.SuruUI &
  ActionGroupRootProps.BaseUI &
  ActionGroupRootProps.HTML;

/**
 * アクションをグループ化するルート要素です。
 *
 * スタイルプロパティーをコンテキストでグループアイテムへ伝播します。
 * ActionGroup を入れ子にした場合は、最も内側のグループの値が使用されます。
 */
export const ActionGroupRoot: IComponent<ActionGroupRootProps> = function SuiActionGroupRoot(
  props,
) {
  const {
    role = "group",
    size = "md",
    color = "grey",
    radius = size,
    variant = "solid",
    outlined = false,
    className,
    orientation = "horizontal",
    "aria-orientation": ariaOrientation = orientation,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;
  const ctx = React.useMemo<ActionGroupContext>(
    () => ({ size, color, radius, variant, outlined, orientation }),
    [size, color, radius, variant, outlined, orientation],
  );
  const element = useRender({
    props: [
      otherDivProps,
      {
        role,
        className: cn(
          className,
          "sui_action_group",
          `sui_action_group-size_${size}`,
          `sui_action_group-color_${color}`,
          `sui_action_group-radius_${radius}`,
          `sui_action_group-variant_${variant}`,
          `sui_action_group-orientation_${orientation}`,
          outlined && "sui_action_group-outlined",
        ),
        "aria-orientation": ariaOrientation,
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "div",
  });

  return <ActionGroupContext value={ctx}>{element}</ActionGroupContext>;
};

export { ActionGroupRoot as Root };

export namespace Root {
  export type State = ActionGroupRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ActionGroupRootProps.Render;

    export type SuruUI = ActionGroupRootProps.SuruUI;

    export type BaseUI = ActionGroupRootProps.BaseUI;

    export type HTML = ActionGroupRootProps.HTML;
  }

  export type Color = ActionGroupRootColor;

  export type Orientation = ActionGroupRootOrientation;

  export type Radius = ActionGroupRootRadius;

  export type Size = ActionGroupRootSize;

  export type Variant = ActionGroupRootVariant;
}

// Separator
// ---------

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
