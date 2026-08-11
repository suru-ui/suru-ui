import type { Color, ColorTemplate as Variant, Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

import "./action-group.css";

// Context
// -------

/**
 * {@link ActionGroupRoot} が子要素へ提供するスタイルです。
 */
export type ActionGroupContext = {
  /**
   * グループアイテムのスタイルバリエーションです。
   */
  readonly variant: Variant;

  /**
   * グループアイテムの色です。
   */
  readonly color: Color;

  /**
   * グループアイテムのサイズです。
   */
  readonly size: Size;

  /**
   * グループアイテムの角丸です。
   */
  readonly radius: "none" | "sm" | "md" | "lg" | "full";

  /**
   * グループアイテムの枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * グループアイテムの向きです。
   */
  readonly orientation: "horizontal" | "vertical";
};

/**
 * {@link ActionGroupRoot} のスタイルを子要素へ伝播するコンテキストです。
 */
export const ActionGroupContext: React.Context<ActionGroupContext | null> =
  React.createContext<ActionGroupContext | null>(null);

/**
 * {@link ActionGroupRoot} のコンテキストを読み取るフックです。
 */
export function useActionGroupContext(optional?: false): ActionGroupContext;
export function useActionGroupContext(optional?: boolean): ActionGroupContext | null;
export function useActionGroupContext(optional?: boolean): ActionGroupContext | null {
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
 * {@link useActionGroupContext} の別名です。
 */
export function useContext(optional?: false): ActionGroupContext;
export function useContext(optional?: boolean): ActionGroupContext | null;
export function useContext(optional?: boolean): ActionGroupContext | null {
  return useActionGroupContext(optional);
}

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
    variant?: Variant | undefined;

    /**
     * グループアイテムの色を指定します。
     *
     * @default "grey"
     */
    color?: Color | undefined;

    /**
     * グループアイテムのサイズを指定します。
     *
     * @default "md"
     */
    size?: Size | undefined;

    /**
     * グループアイテムの角丸を指定します。
     *
     * @default "md"
     */
    radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;

    /**
     * グループアイテムの枠線を表示するかどうかを指定します。
     */
    outlined?: boolean | undefined;

    /**
     * グループアイテムの向きを指定します。
     *
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical" | undefined;
  };

/**
 * アクションをグループ化するルート要素です。
 *
 * スタイルプロパティーをコンテキストでグループアイテムへ伝播します。
 * ActionGroup を入れ子にした場合は、最も内側のグループの値が使用されます。
 *
 * @example
 * ```tsx
 * <ActionGroupParts.Root color="blue">
 *   <Button>保存</Button>
 *   <Button>キャンセル</Button>
 * </ActionGroupParts.Root>
 * ```
 */
export const ActionGroupRoot: Component<ActionGroupRootProps> = function SuiActionGroupRoot(props) {
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
export const Root: Component<Root.Props> = ActionGroupRoot;

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
    orientation?: "horizontal" | "vertical" | undefined;
  };

/**
 * ActionGroup 内のアイテムを区切る要素です。
 *
 * @example
 * ```tsx
 * <ActionGroupParts.Root>
 *   <Button>戻る</Button>
 *   <ActionGroupParts.Separator />
 *   <Button>進む</Button>
 * </ActionGroupParts.Root>
 * ```
 */
export const ActionGroupSeparator: Component<ActionGroupSeparatorProps> =
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
export const Separator: Component<Separator.Props> = ActionGroupSeparator;
