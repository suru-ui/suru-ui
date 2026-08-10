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
 * {@link ToggleButtonGroupRoot} が子パーツへ提供する状態です。
 */
export type ToggleButtonGroupContext = {
  /**
   * 子要素のトグルボタンに適用するバリエーションです。
   */
  readonly variant: Exclude<Variant, "solid">;

  /**
   * 子要素のトグルボタンに適用する色です。
   */
  readonly color: Color;

  /**
   * 子要素のトグルボタンに適用するサイズです。
   */
  readonly size: Size;

  /**
   * 子要素のトグルボタンに適用する角丸です。
   */
  readonly radius: "none" | "rounded" | "full";

  /**
   * 子要素のトグルボタンに適用する枠線の有無です。
   */
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
 * {@link ToggleButtonGroupRoot} の Provider 配下で使用する必要があります。
 * Provider がない場合、`optional` が `true` でなければ {@link ContextMissingError} を投げます。
 * `optional` に `true` を指定すると、Provider がない場合に `null` を返します。
 *
 * @param optional Provider がなくても `null` を返すかどうかを指定します。
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
 * {@link ToggleButtonGroupContext} の別名です。
 */
export type Context = ToggleButtonGroupContext;

/**
 * {@link ToggleButtonGroupContext} の別名です。
 */
export const Context: React.Context<ToggleButtonGroupContext | null> = ToggleButtonGroupContext;

/**
 * {@link useToggleButtonGroupContext} の別名です。
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
 * {@link ToggleButtonGroupRoot} の状態です。
 */
export type ToggleButtonGroupRootState = ToggleGroup.State;

/**
 * {@link ToggleButtonGroupRoot} に渡すプロパティーです。
 *
 * グループに指定したスタイルプロパティーは、子要素の指定より優先されません。
 * 子要素の {@link ToggleButtonRootProps} に同じスタイルプロパティーを指定すると、子要素の値が優先されます。
 * 指定後に値を変更すると、グループと子要素のスタイルも更新されます。
 */
export type ToggleButtonGroupRootProps = React.ComponentProps<typeof ToggleGroup> & {
  /**
   * ボタンのスタイルバリエーションを指定します。
   *
   * トグルボタンでは `"solid"` は指定できません。押下状態の表示は
   * {@link ToggleButton} の `variant` を参照してください。
   *
   * `"naked"` または `"liquid"` を指定できます。
   *
   * @default "liquid"
   */
  variant?: Exclude<Variant, "solid"> | undefined;

  /**
   * ボタンの色を指定します。
   *
   * {@link Color} で定義された色を指定できます。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * ボタンのサイズを指定します。
   *
   * {@link Size} で定義されたサイズを指定できます。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * ボタンの角丸を指定します。
   *
   * `"none"`、`"rounded"`、`"full"` のいずれかを指定できます。
   *
   * @default "rounded"
   */
  radius?: "none" | "rounded" | "full" | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * `true` の場合に枠線を表示します。
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
    const context = React.useMemo<ToggleButtonGroupContext>(
      () => ({ size, color, radius, variant, outlined }),
      [color, outlined, radius, size, variant],
    );

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
  /**
   * {@link ToggleButtonGroupRoot} の状態型です。
   */
  export type State = ToggleButtonGroupRootState;

  /**
   * {@link ToggleButtonGroupRoot} のプロパティー型です。
   */
  export type Props = ToggleButtonGroupRootProps;
}

/**
 * {@link ToggleButtonGroupRoot} の別名です。
 */
export const Root: Component<Root.Props> = ToggleButtonGroupRoot;
