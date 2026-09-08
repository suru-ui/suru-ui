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
  /**
   * {@link ActionGroupContextColor}
   */
  export type Color = ActionGroupContextColor;

  /**
   * {@link ActionGroupContextOrientation}
   */
  export type Orientation = ActionGroupContextOrientation;

  /**
   * {@link ActionGroupContextRadius}
   */
  export type Radius = ActionGroupContextRadius;

  /**
   * {@link ActionGroupContextSize}
   */
  export type Size = ActionGroupContextSize;

  /**
   * {@link ActionGroupContextVariant}
   */
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

/**
 * {@link ActionGroupRoot} に渡す props です。
 *
 * グループに指定したスタイルプロパティーは、グループアイテムの指定より優先されます。
 */
export type ActionGroupRootProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<ActionGroupRootState> & {
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
    size = "md",
    color = "grey",
    radius = size,
    variant = "solid",
    outlined = false,
    orientation = "horizontal",
    // @ts-expect-error
    "data-scope": dataScope = "",
    className,
    role = "group",
    "aria-orientation": ariaOrientation = orientation,
    ...otherDivProps
  } = props;
  const ctx = React.useMemo<ActionGroupContext>(
    () => ({ size, color, radius, variant, outlined, orientation }),
    [size, color, radius, variant, outlined, orientation],
  );
  const element = useRender({
    defaultTagName: "div",
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
  });

  return <ActionGroupContext value={ctx}>{element}</ActionGroupContext>;
};

export { ActionGroupRoot as Root };

export namespace Root {
  /**
   * {@link ActionGroupRootState}
   */
  export type State = ActionGroupRootState;

  /**
   * {@link ActionGroupRootProps}
   */
  export type Props = ActionGroupRootProps;

  /**
   * {@link ActionGroupRootColor}
   */
  export type Color = ActionGroupRootColor;

  /**
   * {@link ActionGroupRootOrientation}
   */
  export type Orientation = ActionGroupRootOrientation;

  /**
   * {@link ActionGroupRootRadius}
   */
  export type Radius = ActionGroupRootRadius;

  /**
   * {@link ActionGroupRootSize}
   */
  export type Size = ActionGroupRootSize;

  /**
   * {@link ActionGroupRootVariant}
   */
  export type Variant = ActionGroupRootVariant;
}

// Separator
// ---------

/**
 * {@link ActionGroupSeparator} が持つ状態です。
 */
export type ActionGroupSeparatorState = {};

/**
 * {@link ActionGroupSeparator} に渡す props です。
 */
export type ActionGroupSeparatorProps = Omit<
  React.ComponentProps<"div">,
  keyof RenderProps | "role"
> &
  RenderProps<ActionGroupSeparatorState> & {
    /**
     * 区切り線の向きを指定します。省略時は親 ActionGroup の向きを使用します。
     */
    orientation?: ActionGroupRootOrientation | undefined;
  };

/**
 * ActionGroup 内のアイテムを区切る要素です。
 */
export const ActionGroupSeparator: IComponent<ActionGroupSeparatorProps> =
  function SuiActionGroupSeparator(props) {
    const ctx = useActionGroupContext(true);
    const {
      orientation: orientationProp,
      className,
      "aria-orientation": ariaOrientation = orientationProp ?? ctx?.orientation ?? "horizontal",
      ...otherDivProps
    } = props;
    const orientation = orientationProp ?? ctx?.orientation ?? "horizontal";

    return useRender({
      defaultTagName: "div",
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
    });
  };

export { ActionGroupSeparator as Separator };

export namespace Separator {
  /**
   * {@link ActionGroupSeparatorState}
   */
  export type State = ActionGroupSeparatorState;

  /**
   * {@link ActionGroupSeparatorProps}
   */
  export type Props = ActionGroupSeparatorProps;
}
