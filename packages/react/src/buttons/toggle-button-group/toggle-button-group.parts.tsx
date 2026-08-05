import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";
import { useControlled } from "@base-ui/utils/useControlled";
import type { Color, ColorTemplate as Variant } from "@suru-ui/theme";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import splitRenderProps from "../../_split-render-props.js";
import cn from "../../cn.js";

import "./toggle-button-group.css";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

// Context
// -------

/**
 * {@link ToggleButtonGroupContext} の値です。
 */
export type ToggleButtonGroupContext = {
  readonly variant: Variant;

  readonly color: Color;

  readonly size: Size;

  readonly radius: "none" | "rounded" | "full";

  readonly outlined: boolean;

  readonly orientation: "horizontal" | "vertical";

  readonly detached: boolean;

  readonly selectionMode: "single" | "multiple";

  readonly disallowEmptySelection: boolean;

  readonly selectedValues: Set<string>;

  readonly onSelectionChange: (value: string) => void;
};

/**
 * トグルボタングループの状態を子要素に伝播するコンテキストです。
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
export type ToggleButtonGroupRootState = {};

/**
 * {@link Root} に渡すプロパティーです。
 */
export type ToggleButtonGroupRootProps = Omit<
  React.ComponentProps<"div">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ToggleButtonGroupRootState> & {
    /**
     * ボタンのスタイルバリエーションを指定します。
     */
    variant?: Variant | undefined;

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
     * ボタン群の向きを指定します。
     *
     * - `"horizontal"`: 横並び
     * - `"vertical"`: 縦並び
     *
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical" | undefined;

    /**
     * 1 つのボタンまたは複数のボタンを選択できるかどうかを指定します。
     *
     * - `"single"`: 単一選択（ラジオボタン風）
     * - `"multiple"`: 複数選択（チェックボックス風）
     *
     * @default "single"
     */
    selectionMode?: "single" | "multiple" | undefined;

    /**
     * 選択された値を制御します。
     *
     * 指定した場合、コンポーネントは制御モードで動作し、選択状態はこの値によって決定されます。
     */
    selectedValues?: Iterable<string> | undefined;

    /**
     * 非制御モードにおける初期選択値です。
     */
    defaultSelectedValues?: Iterable<string> | undefined;

    /**
     * 選択が変更されたときに呼び出されるコールバックです。
     *
     * @param values 現在選択されている値のセット。
     */
    onSelectionChange?: ((values: Set<string>) => void) | undefined;

    /**
     * すべての選択を解除することを防止するかどうかを指定します。
     *
     * `true` の場合、最後に選択されたボタンを解除できなくなります。
     *
     * @default false
     */
    disallowEmptySelection?: boolean | undefined;

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
 * グループの div 要素をレンダリングし、子要素の ToggleButton に選択状態を伝播します。
 *
 * @example
 * ```tsx
 * <ToggleButtonGroupParts.Root selectionMode="multiple">
 *   <ToggleButton value="a">A</ToggleButton>
 *   <ToggleButton value="b">B</ToggleButton>
 * </ToggleButtonGroupParts.Root>
 * ```
 */
export const ToggleButtonGroupRoot: Component<ToggleButtonGroupRootProps> =
  function SuiToggleButtonGroupRoot(props) {
    const [renderProps, componentProps] = splitRenderProps(props);
    const {
      role,
      size = "md",
      color = "grey",
      radius = "rounded",
      variant = "liquid",
      detached = false,
      outlined = false,
      orientation = "horizontal",
      selectionMode = "single",
      selectedValues: selectedValuesProp,
      onSelectionChange,
      defaultSelectedValues,
      disallowEmptySelection = false,
      "aria-orientation": ariaOrientation = orientation,
      ...elementProps
    } = componentProps;

    const defaultSet = React.useMemo(
      () =>
        defaultSelectedValues !== undefined ? new Set(defaultSelectedValues) : new Set<string>(),
      [defaultSelectedValues],
    );
    const controlledSet = React.useMemo(
      () => (selectedValuesProp !== undefined ? new Set<string>(selectedValuesProp) : undefined),
      [selectedValuesProp],
    );
    const [selectedValues, setSelectedValues] = useControlled<Set<string>>({
      name: "ToggleButtonGroup",
      state: "selectedValues",
      default: defaultSet,
      controlled: controlledSet,
    });

    const handleSelectionChange = React.useCallback(
      (value: string) => {
        const next = new Set(selectedValues);
        if (next.has(value)) {
          if (disallowEmptySelection && next.size === 1) {
            return;
          }

          next.delete(value);
        } else {
          if (selectionMode === "single") {
            next.clear();
          }

          next.add(value);
        }

        setSelectedValues(next);
        onSelectionChange?.(next);
      },
      [selectedValues, selectionMode, disallowEmptySelection, onSelectionChange, setSelectedValues],
    );

    const context: ToggleButtonGroupContext = {
      size,
      color,
      radius,
      variant,
      detached,
      outlined,
      orientation,
      selectionMode,
      selectedValues,
      onSelectionChange: handleSelectionChange,
      disallowEmptySelection,
    };

    const element = useRenderElement("div", renderProps, {
      props: {
        ...elementProps,
        role: role ?? (selectionMode === "single" ? "radiogroup" : "group"),
        className: cn(
          "sui_toggle_button_group",
          `sui_toggle_button_group-orientation_${orientation}`,
          detached && "sui_toggle_button_group-detached",
          selectionMode === "single" && "sui_toggle_button_group-radiogroup",
        ),
        "aria-orientation": ariaOrientation,
      },
    });

    return <Context value={context}>{element}</Context>;
  };

export namespace Root {
  export type State = ToggleButtonGroupRootState;
  export type Props = ToggleButtonGroupRootProps;
}

export const Root: Component<Root.Props> = ToggleButtonGroupRoot;
