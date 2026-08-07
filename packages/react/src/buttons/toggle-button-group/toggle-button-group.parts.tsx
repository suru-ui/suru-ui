import { ToggleGroup } from "@base-ui/react/toggle-group";
import type { Color, ColorTemplate as Variant, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

import "./toggle-button-group.css";

// Context
// -------

/**
 * {@link ToggleButtonGroupContext} の値です。
 */
export type ToggleButtonGroupContext = {
  readonly variant: Exclude<Variant, "solid">;

  readonly color: Color;

  readonly size: Size;

  readonly radius: "none" | "rounded" | "full";

  readonly outlined: boolean;
};

/**
 * トグルボタングループのスタイルを子要素へ伝播するコンテキストです。
 */
export const ToggleButtonGroupContext: React.Context<ToggleButtonGroupContext | null> =
  React.createContext<ToggleButtonGroupContext | null>(null);

/**
 * {@link ToggleButtonGroupContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useToggleButtonGroupContext(optional?: false): ToggleButtonGroupContext;
export function useToggleButtonGroupContext(optional?: boolean): ToggleButtonGroupContext | null;
export function useToggleButtonGroupContext(optional?: boolean): ToggleButtonGroupContext | null {
  const context = React.use(ToggleButtonGroupContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "ToggleButtonGroupContext",
      providerName: "ToggleButtonGroupRoot",
    });
  }

  return context;
}

/**
 * {@link ToggleButtonGroupContext} のエイリアスです。
 */
export type Context = ToggleButtonGroupContext;

/**
 * {@link ToggleButtonGroupContext} のエイリアスです。
 */
export const Context: React.Context<ToggleButtonGroupContext | null> = ToggleButtonGroupContext;

/**
 * {@link useToggleButtonGroupContext} のエイリアスです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useContext(optional?: false): ToggleButtonGroupContext;
export function useContext(optional?: boolean): ToggleButtonGroupContext | null;
export function useContext(optional?: boolean): ToggleButtonGroupContext | null {
  return useToggleButtonGroupContext(optional);
}

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type ToggleButtonGroupRootState = ToggleGroup.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type ToggleButtonGroupRootProps = React.ComponentProps<typeof ToggleGroup> & {
  /**
   * ボタンのスタイルバリエーションを指定します。
   *
   * トグルボタンでは `"solid"` は指定できません。押下状態の表示は
   * {@link ToggleButton} の `variant` を参照してください。
   */
  variant?: Exclude<Variant, "solid"> | undefined;

  /**
   * ボタンの色を指定します。
   */
  color?: Color | undefined;

  /**
   * ボタンのサイズを指定します。
   */
  size?: Size | undefined;

  /**
   * ボタンの角丸を指定します。
   */
  radius?: "none" | "rounded" | "full" | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * ボタンが視覚的に隙間で区切られているかどうかを指定します。
   *
   * `true` の場合、グループの境界に応じた枠線や角丸の調整は行われません。
   *
   * @default false
   */
  detached?: boolean | undefined;
};

/**
 * トグルボタングループのルート要素です。
 *
 * Base UI の {@link ToggleGroup} をラップし、子要素の ToggleButton に選択状態とスタイルを伝播します。
 *
 * @example
 * ```tsx
 * <ToggleButtonGroupParts.Root multiple defaultValue={["a"]}>
 *   <ToggleButton value="a">A</ToggleButton>
 *   <ToggleButton value="b">B</ToggleButton>
 * </ToggleButtonGroupParts.Root>
 * ```
 */
export const ToggleButtonGroupRoot: Component<ToggleButtonGroupRootProps> =
  function SuiToggleButtonGroupRoot(props) {
    const {
      role: roleProps,
      size = "md",
      color = "grey",
      radius = "rounded",
      variant = "liquid",
      outlined = false,
      multiple = false,
      orientation = "horizontal",
      detached = false,
      className,
      ...otherProps
    } = props;
    const role = roleProps ?? (multiple ? "group" : "radiogroup");
    const context: ToggleButtonGroupContext = {
      size,
      color,
      radius,
      variant,
      outlined,
    };

    return (
      <Context value={context}>
        <ToggleGroup
          {...otherProps}
          role={role}
          multiple={multiple}
          orientation={orientation}
          aria-orientation={orientation}
          className={cn(
            className,
            "sui_toggle_button_group",
            `sui_toggle_button_group-orientation_${orientation}`,
            detached && "sui_toggle_button_group-detached",
            !multiple && "sui_toggle_button_group-radiogroup",
          )}
        />
      </Context>
    );
  };

export namespace Root {
  export type State = ToggleButtonGroupRootState;
  export type Props = ToggleButtonGroupRootProps;
}

export const Root: Component<Root.Props> = ToggleButtonGroupRoot;
