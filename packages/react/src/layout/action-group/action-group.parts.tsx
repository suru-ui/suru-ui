import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { IComponent, IUseContext } from "../../types.js";

import "./action-group.css";

// Context
// -------

/**
 * {@link ActionGroupRoot} が子要素へ提供するスタイルです。
 */
export type ActionGroupContext = {
  /**
   * グループアイテムの色です。
   */
  readonly color: ActionGroupRootColor;

  /**
   * グループアイテムの向きです。
   */
  readonly orientation: ActionGroupRootOrientation;

  /**
   * グループアイテムの枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * グループアイテムの角丸です。
   */
  readonly radius: ActionGroupRootRadius;

  /**
   * グループアイテムのサイズです。
   */
  readonly size: ActionGroupRootSize;

  /**
   * グループアイテムのスタイルバリエーションです。
   */
  readonly variant: ActionGroupRootVariant;
};

/**
 * {@link ActionGroupRoot} のスタイルを子要素へ伝播するコンテキストです。
 */
export const ActionGroupContext: React.Context<ActionGroupContext | null> =
  React.createContext<ActionGroupContext | null>(null);

function useSuiActionGroupContext(optional?: false): ActionGroupContext;
function useSuiActionGroupContext(optional?: boolean): ActionGroupContext | null;
function useSuiActionGroupContext(optional?: boolean): ActionGroupContext | null {
  const context = React.use(ActionGroupContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "ActionGroupContext",
      providerName: "ActionGroupRoot",
    });
  }

  return context;
}

/**
 * {@link ActionGroupContext} を読み取るフックです。
 */
export const useActionGroupContext: IUseContext<ActionGroupContext> = useSuiActionGroupContext;

/**
 * {@link ActionGroupContext} です。
 */
export type Context = ActionGroupContext;

/**
 * {@link ActionGroupContext} です。
 */
export const Context: React.Context<ActionGroupContext | null> = ActionGroupContext;

/**
 * {@link useActionGroupContext} です。
 */
export const useContext: IUseContext<Context> = useActionGroupContext;

// Root
// ----

/**
 * アクショングループの色です。
 */
export type ActionGroupRootColor = Color;

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
 * アクショングループの向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type ActionGroupRootOrientation = "horizontal" | "vertical";

/**
 * {@link ActionGroupRoot} の状態です。
 */
export type ActionGroupRootState = {};

/**
 * {@link ActionGroupRoot} に渡すプロパティーです。
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
     * @default "md"
     */
    radius?: ActionGroupRootRadius | undefined;

    /**
     * グループアイテムのサイズを指定します。
     *
     * @default "md"
     */
    size?: ActionGroupRootSize | undefined;

    /**
     * グループアイテムのスタイルバリエーションを指定します。
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
    role = "group",
    size = "md",
    color = "grey",
    radius = "md",
    variant = "solid",
    outlined = false,
    orientation = "horizontal",
    "aria-orientation": ariaOrientation = orientation,
    ...otherProps
  } = props;
  const context = React.useMemo<ActionGroupContext>(
    () => ({ size, color, radius, variant, outlined, orientation }),
    [size, color, radius, variant, outlined, orientation],
  );
  const element = useRender({
    defaultTagName: "div",
    props: [
      otherProps,
      {
        role,
        className: cn(
          "sui_action_group",
          `sui_action_group-variant_${variant}`,
          `sui_action_group-color_${color}`,
          `sui_action_group-size_${size}`,
          `sui_action_group-radius_${radius}`,
          `sui_action_group-orientation_${orientation}`,
          outlined && "sui_action_group-outlined",
        ),
        "aria-orientation": ariaOrientation,
      },
    ],
  });

  return <Context value={context}>{element}</Context>;
};

/**
 * {@link ActionGroupRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ActionGroupRootState} です。
   */
  export type State = ActionGroupRootState;

  /**
   * {@link ActionGroupRootProps} です。
   */
  export type Props = ActionGroupRootProps;

  /**
   * {@link ActionGroupRootColor} です。
   */
  export type Color = ActionGroupRootColor;

  /**
   * {@link ActionGroupRootOrientation} です。
   */
  export type Orientation = ActionGroupRootOrientation;

  /**
   * {@link ActionGroupRootRadius} です。
   */
  export type Radius = ActionGroupRootRadius;

  /**
   * {@link ActionGroupRootSize} です。
   */
  export type Size = ActionGroupRootSize;

  /**
   * {@link ActionGroupRootVariant} です。
   */
  export type Variant = ActionGroupRootVariant;
}

/**
 * {@link ActionGroupRoot} です。
 */
export const Root: IComponent<Root.Props> = ActionGroupRoot;

// Separator
// ---------

/**
 * {@link ActionGroupSeparator} の状態です。
 */
export type ActionGroupSeparatorState = {};

/**
 * {@link ActionGroupSeparator} に渡すプロパティーです。
 */
export type ActionGroupSeparatorProps = Omit<
  React.ComponentProps<"div">,
  keyof RenderProps<ActionGroupSeparatorState> | "role"
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
    const context = useActionGroupContext(true);
    const {
      className,
      orientation: orientationProp,
      "aria-orientation": ariaOrientation = orientationProp ?? context?.orientation ?? "horizontal",
      ...otherProps
    } = props;
    const orientation = orientationProp ?? context?.orientation ?? "horizontal";

    return useRender({
      defaultTagName: "div",
      props: [
        otherProps,
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

/**
 * {@link ActionGroupSeparator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Separator {
  /**
   * {@link ActionGroupSeparatorState} です。
   */
  export type State = ActionGroupSeparatorState;

  /**
   * {@link ActionGroupSeparatorProps} です。
   */
  export type Props = ActionGroupSeparatorProps;
}

/**
 * {@link ActionGroupSeparator} です。
 */
export const Separator: IComponent<Separator.Props> = ActionGroupSeparator;
