import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { IComponent, IUseContext } from "../../types.js";

import "./action-group.css";

// Types
// -----

/**
 * アクショングループの色です。
 */
export type ActionGroupColor = Color;

/**
 * アクショングループの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ActionGroupRadius = "none" | Size | "full";

/**
 * アクショングループの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ActionGroupSize = Size;

/**
 * アクショングループの主な外観の種類です。
 *
 * - `"solid"`: 塗りつぶしスタイル
 * - `"naked"`: 背景のないテキストのみ
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ActionGroupVariant = ColorTemplate;

/**
 * アクショングループの向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type ActionGroupOrientation = "horizontal" | "vertical";

// Context
// -------

/**
 * {@link ActionGroupRoot} が子要素へ提供するスタイルです。
 */
export type ActionGroupContext = {
  /**
   * グループアイテムのスタイルバリエーションです。
   */
  readonly variant: ActionGroupVariant;

  /**
   * グループアイテムの色です。
   */
  readonly color: ActionGroupColor;

  /**
   * グループアイテムのサイズです。
   */
  readonly size: ActionGroupSize;

  /**
   * グループアイテムの角丸です。
   */
  readonly radius: ActionGroupRadius;

  /**
   * グループアイテムの枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * グループアイテムの向きです。
   */
  readonly orientation: ActionGroupOrientation;
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
 * {@link ActionGroupContext} の別名です。
 */
export type Context = ActionGroupContext;

/**
 * {@link ActionGroupContext} の別名です。
 */
export const Context: React.Context<ActionGroupContext | null> = ActionGroupContext;

/**
 * {@link ActionGroupContext} を読み取るフックです。
 */
export const useActionGroupContext: IUseContext<ActionGroupContext> = useSuiActionGroupContext;

/**
 * {@link useActionGroupContext} の別名です。
 */
export const useContext: IUseContext<Context> = useActionGroupContext;

// Root
// ----

/**
 * {@link ActionGroupRoot} の状態です。
 */
export type ActionGroupRootState = {};

/**
 * {@link ActionGroupRoot} に渡すプロパティーです。
 *
 * グループに指定したスタイルプロパティーは、グループアイテムの指定より優先されます。
 */
export type ActionGroupRootProps = Omit<React.ComponentProps<"div">, keyof RenderProps<{}>> &
  RenderProps<ActionGroupRootState> & {
    /**
     * グループアイテムのスタイルバリエーションを指定します。
     *
     * @default "solid"
     */
    variant?: ActionGroupVariant | undefined;

    /**
     * グループアイテムの色を指定します。
     *
     * @default "grey"
     */
    color?: ActionGroupColor | undefined;

    /**
     * グループアイテムのサイズを指定します。
     *
     * @default "md"
     */
    size?: ActionGroupSize | undefined;

    /**
     * グループアイテムの角丸を指定します。
     *
     * @default "md"
     */
    radius?: ActionGroupRadius | undefined;

    /**
     * グループアイテムの枠線を表示するかどうかを指定します。
     */
    outlined?: boolean | undefined;

    /**
     * グループアイテムの向きを指定します。
     *
     * @default "horizontal"
     */
    orientation?: ActionGroupOrientation | undefined;
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
    variant = "solid",
    color = "grey",
    size = "md",
    radius = "md",
    outlined = false,
    orientation = "horizontal",
    "aria-orientation": ariaOrientation = orientation,
    ...otherProps
  } = props;
  const context = React.useMemo<ActionGroupContext>(
    () => ({ color, orientation, outlined, radius, size, variant }),
    [color, orientation, outlined, radius, size, variant],
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
   * {@link ActionGroupRoot} の状態型です。
   */
  export type State = ActionGroupRootState;

  /**
   * {@link ActionGroupRoot} のプロパティー型です。
   */
  export type Props = ActionGroupRootProps;
}

/**
 * {@link ActionGroupRoot} の別名です。
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
    orientation?: ActionGroupOrientation | undefined;
  };

/**
 * ActionGroup 内のアイテムを区切る要素です。
 */
export const ActionGroupSeparator: IComponent<ActionGroupSeparatorProps> =
  function SuiActionGroupSeparator(props) {
    const context = useActionGroupContext(true);
    const {
      orientation: orientationProp,
      "aria-orientation": ariaOrientation = orientationProp ?? context?.orientation ?? "horizontal",
      className,
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
   * {@link ActionGroupSeparator} の状態型です。
   */
  export type State = ActionGroupSeparatorState;

  /**
   * {@link ActionGroupSeparator} のプロパティー型です。
   */
  export type Props = ActionGroupSeparatorProps;
}

/**
 * {@link ActionGroupSeparator} の別名です。
 */
export const Separator: IComponent<Separator.Props> = ActionGroupSeparator;
