import { Autocomplete } from "@base-ui/react/autocomplete";
import type {
  NativeButtonProps,
  BaseUIComponentProps,
  NonNativeButtonProps,
} from "@base-ui/react/internals/types";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import useRender, { type RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { Override, IComponent, IUseContext } from "../types.js";

import "./autocomplete.css";

// Context
// -------

/**
 * フォーカス時に枠線へ適用する配色です。
 */
type AutocompleteContextColor = Color;

/**
 * 入力を含むグループ要素の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
type AutocompleteContextRadius = "none" | Size | "full";

/**
 * 入力欄とリスト項目のサイズです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
type AutocompleteContextSize = Size;

/**
 * 入力欄の主な外観です。
 *
 * - `"naked"`: 背景のない入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
type AutocompleteContextVariant = "naked" | "liquid";

/**
 * {@link AutocompleteRoot} が子パーツへ提供する状態です。
 */
export type AutocompleteContext = {
  /**
   * フォーカス時に枠線へ適用する配色です。
   */
  readonly color: AutocompleteContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸です。
   */
  readonly radius: AutocompleteContextRadius;

  /**
   * 入力欄とリスト項目のサイズです。
   */
  readonly size: AutocompleteContextSize;

  /**
   * 入力欄の主な外観です。
   */
  readonly variant: AutocompleteContextVariant;
};

/**
 * オートコンプリートのスタイルを子要素へ伝播するコンテキストです。
 */
export const AutocompleteContext: React.Context<AutocompleteContext | null> =
  React.createContext<AutocompleteContext | null>(null);

function useSuiAutocompleteContext(optional?: false): AutocompleteContext;
function useSuiAutocompleteContext(optional?: boolean): AutocompleteContext | null;
function useSuiAutocompleteContext(optional?: boolean): AutocompleteContext | null {
  const ctx = React.use(AutocompleteContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AutocompleteContext",
      providerName: "AutocompleteRoot",
    });
  }

  return ctx;
}

/**
 * {@link AutocompleteContext} を読み取るフックです。
 */
export const useAutocompleteContext: IUseContext<AutocompleteContext> = useSuiAutocompleteContext;

export { AutocompleteContext as Context, useAutocompleteContext as useContext };

export namespace Context {
  export type Color = AutocompleteContextColor;

  export type Radius = AutocompleteContextRadius;

  export type Size = AutocompleteContextSize;

  export type Variant = AutocompleteContextVariant;
}

// Root
// ----

/**
 * {@link AutocompleteRoot} を命令的に操作するためのオブジェクトです。
 */
export type AutocompleteRootActions = Autocomplete.Root.Actions;

/**
 * {@link AutocompleteRoot} の値が変更されたイベントの詳細です。
 */
export type AutocompleteRootChangeEventDetails = Autocomplete.Root.ChangeEventDetails;

/**
 * {@link AutocompleteRoot} の値が変更された理由です。
 */
export type AutocompleteRootChangeEventReason = Autocomplete.Root.ChangeEventReason;

/**
 * {@link AutocompleteRoot} のアイテムがハイライト表示またはハイライト解除されたイベントの詳細です。
 */
export type AutocompleteRootHighlightEventDetails = Autocomplete.Root.HighlightEventDetails;

/**
 * {@link AutocompleteRoot} のアイテムがハイライト表示またはハイライト解除された理由です。
 */
export type AutocompleteRootHighlightEventReason = Autocomplete.Root.HighlightEventReason;

/**
 * オートコンプリートの配色です。
 */
export type AutocompleteRootColor = Color;

/**
 * オートコンプリートの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type AutocompleteRootRadius = "none" | Size | "full";

/**
 * オートコンプリートの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type AutocompleteRootSize = Size;

/**
 * オートコンプリートの主な外観の種類です。
 *
 * - `"naked"`: 背景のない入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AutocompleteRootVariant = "naked" | "liquid";

/**
 * {@link AutocompleteRoot} の状態です。
 */
export type AutocompleteRootState = Autocomplete.Root.State;

export namespace AutocompleteRootProps {
  export type Render = RenderProps<AutocompleteRootState>;

  export type SuruUI = {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: AutocompleteRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * 入力を含むグループ要素の角丸を指定します。
     *
     * 既定値は {@link AutocompleteRootProps.size|size} です。
     */
    radius?: AutocompleteRootRadius | undefined;

    /**
     * 入力欄とリスト項目のサイズを指定します。
     *
     * @default "md"
     */
    size?: AutocompleteRootSize | undefined;

    /**
     * 入力欄の主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: AutocompleteRootVariant | undefined;
  };

  export type BaseUI<TItemValue = any> = Pick<
    Autocomplete.Root.Props<TItemValue>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteRootProps + AriaCombobox.Props:
      | "actionsRef"
      | "autoHighlight"
      | "defaultOpen"
      | "defaultValue"
      | "disabled"
      | "filter"
      | "filteredItems"
      | "form"
      | "grid"
      | "highlightItemOnHover"
      | "id"
      | "inline"
      | "inputRef"
      | "itemToStringValue"
      | "items"
      | "keepHighlight"
      | "limit"
      | "locale"
      | "loopFocus"
      | "modal"
      | "mode"
      | "name"
      | "onItemHighlighted"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "onValueChange"
      | "open"
      | "openOnInputClick"
      | "readOnly"
      | "required"
      | "submitOnItemClick"
      | "value"
      | "virtualized",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TItemValue = any> = Omit<
    Autocomplete.Root.Props<TItemValue>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteRoot} に渡すプロパティーです。
 *
 * @template TItemValue 項目の値の型です。
 */
export type AutocompleteRootProps<TItemValue = any> = AutocompleteRootProps.Render &
  AutocompleteRootProps.SuruUI &
  AutocompleteRootProps.BaseUI<TItemValue> &
  AutocompleteRootProps.HTML<TItemValue>;

interface IAutocompleteRoot extends IComponent<AutocompleteRootProps> {
  /**
   * @template TItemValue 項目の値の型です。
   */
  <TItemValue = any>(props: AutocompleteRootProps<TItemValue>): IComponent.Return;
}

/**
 * オートコンプリートのルート要素です。
 *
 * 入力値とポップアップの開閉状態を管理し、各パーツをグループ化します。
 */
export const AutocompleteRoot: IAutocompleteRoot = function SuiAutocompleteRoot(
  props: AutocompleteRootProps,
) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    variant = "liquid",
    outlined = false,
    ...otherProps
  } = props;
  const ctx = React.useMemo<AutocompleteContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );

  return (
    <AutocompleteContext value={ctx}>
      <Autocomplete.Root {...otherProps} />
    </AutocompleteContext>
  );
};

export { AutocompleteRoot as Root };

export namespace Root {
  export type State = AutocompleteRootState;

  export type Props<TItemValue = any> = Props.Render &
    Props.SuruUI &
    Props.BaseUI<TItemValue> &
    Props.HTML<TItemValue>;

  export namespace Props {
    export type Render = AutocompleteRootProps.Render;

    export type SuruUI = AutocompleteRootProps.SuruUI;

    export type BaseUI<TItemValue = any> = AutocompleteRootProps.BaseUI<TItemValue>;

    export type HTML<TItemValue = any> = AutocompleteRootProps.HTML<TItemValue>;
  }

  export type Actions = AutocompleteRootActions;

  export type ChangeEventDetails = AutocompleteRootChangeEventDetails;

  export type ChangeEventReason = AutocompleteRootChangeEventReason;

  export type Color = AutocompleteRootColor;

  export type HighlightEventDetails = AutocompleteRootHighlightEventDetails;

  export type HighlightEventReason = AutocompleteRootHighlightEventReason;

  export type Radius = AutocompleteRootRadius;

  export type Size = AutocompleteRootSize;

  export type Variant = AutocompleteRootVariant;
}

// InputGroup
// ----------

/**
 * {@link AutocompleteInputGroup} の状態です。
 */
export type AutocompleteInputGroupState = Autocomplete.InputGroup.State;

export namespace AutocompleteInputGroupProps {
  export type Render = RenderProps<AutocompleteInputGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.InputGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteInputGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.InputGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteInputGroup} に渡すプロパティーです。
 */
export type AutocompleteInputGroupProps = AutocompleteInputGroupProps.Render &
  AutocompleteInputGroupProps.SuruUI &
  AutocompleteInputGroupProps.BaseUI &
  AutocompleteInputGroupProps.HTML;

/**
 * 入力欄とその付属コントロールをまとめるグループ要素です。
 */
export const AutocompleteInputGroup: IComponent<AutocompleteInputGroupProps> =
  function SuiAutocompleteInputGroup(props) {
    const ctx = useAutocompleteContext();
    const {
      className,
      // @ts-expect-error
      "data-scope": dataScope = "",
      ...otherProps
    } = props;

    return (
      <Autocomplete.InputGroup
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete",
          `sui_autocomplete-size_${ctx.size}`,
          `sui_autocomplete-color_${ctx.color}`,
          `sui_autocomplete-radius_${ctx.radius}`,
          `sui_autocomplete-variant_${ctx.variant}`,
          ctx.outlined && "sui_autocomplete-outlined",
          (state) => state.disabled && "sui_autocomplete-disabled",
        )}
        data-scope={dataScope}
      />
    );
  };

export { AutocompleteInputGroup as InputGroup };

export namespace InputGroup {
  export type State = AutocompleteInputGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteInputGroupProps.Render;

    export type SuruUI = AutocompleteInputGroupProps.SuruUI;

    export type BaseUI = AutocompleteInputGroupProps.BaseUI;

    export type HTML = AutocompleteInputGroupProps.HTML;
  }
}

// Input
// -----

/**
 * {@link AutocompleteInput} の状態です。
 */
export type AutocompleteInputState = Autocomplete.Input.State;

export namespace AutocompleteInputProps {
  export type Render = RenderProps<AutocompleteInputState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Input>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxInputProps:
      "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteInput} に渡すプロパティーです。
 */
export type AutocompleteInputProps = AutocompleteInputProps.Render &
  AutocompleteInputProps.SuruUI &
  AutocompleteInputProps.BaseUI &
  AutocompleteInputProps.HTML;

/**
 * 検索文字列を入力するテキスト入力欄です。
 */
export const AutocompleteInput: IComponent<AutocompleteInputProps> = function SuiAutocompleteInput(
  props,
) {
  const { type = "text", className, ...otherProps } = props;

  return (
    <Autocomplete.Input
      {...otherProps}
      type={type}
      className={cn(
        className,
        "sui_autocomplete_input",
        (state) => state.valid === true && "sui_autocomplete_input-valid",
        (state) => state.valid === false && "sui_autocomplete_input-invalid",
        (state) => state.valid === null && "sui_autocomplete_input-unverified",
      )}
    />
  );
};

export { AutocompleteInput as Input };

export namespace Input {
  export type State = AutocompleteInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteInputProps.Render;

    export type SuruUI = AutocompleteInputProps.SuruUI;

    export type BaseUI = AutocompleteInputProps.BaseUI;

    export type HTML = AutocompleteInputProps.HTML;
  }
}

// Addon
// -----

/**
 * {@link AutocompleteAddon} の状態です。
 */
export type AutocompleteAddonState = {};

export namespace AutocompleteAddonProps {
  export type Render = RenderProps<AutocompleteAddonState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteAddon} に渡すプロパティーです。
 */
export type AutocompleteAddonProps = AutocompleteAddonProps.Render &
  AutocompleteAddonProps.SuruUI &
  AutocompleteAddonProps.BaseUI &
  AutocompleteAddonProps.HTML;

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const AutocompleteAddon: IComponent<AutocompleteAddonProps> = function SuiAutocompleteAddon(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_autocomplete_addon",
      },
    ],
    defaultTagName: "span",
  });
};

export { AutocompleteAddon as Addon };

export namespace Addon {
  export type State = AutocompleteAddonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteAddonProps.Render;

    export type SuruUI = AutocompleteAddonProps.SuruUI;

    export type BaseUI = AutocompleteAddonProps.BaseUI;

    export type HTML = AutocompleteAddonProps.HTML;
  }
}

// Clear
// -----

/**
 * {@link AutocompleteClear} の状態です。
 */
export type AutocompleteClearState = Autocomplete.Clear.State;

export namespace AutocompleteClearProps {
  export type Render = RenderProps<AutocompleteClearState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Clear>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // ComboboxClearProps:
      | "disabled"
      | "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Clear>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteClear} に渡すプロパティーです。
 */
export type AutocompleteClearProps = AutocompleteClearProps.Render &
  AutocompleteClearProps.SuruUI &
  AutocompleteClearProps.BaseUI &
  AutocompleteClearProps.HTML;

/**
 * 入力値を消去するボタン要素です。
 *
 * 入力値があるときだけ表示されます。
 */
export const AutocompleteClear: IComponent<AutocompleteClearProps> = function SuiAutocompleteClear(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Clear {...otherProps} className={cn(className, "sui_autocomplete_clear")} />;
};

export { AutocompleteClear as Clear };

export namespace Clear {
  export type State = AutocompleteClearState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteClearProps.Render;

    export type SuruUI = AutocompleteClearProps.SuruUI;

    export type BaseUI = AutocompleteClearProps.BaseUI;

    export type HTML = AutocompleteClearProps.HTML;
  }
}

// List
// ----

/**
 * {@link AutocompleteList} の状態です。
 */
export type AutocompleteListState = Autocomplete.List.State;

export namespace AutocompleteListProps {
  export type Render = RenderProps<AutocompleteListState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.List>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxListProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteList} に渡すプロパティーです。
 */
export type AutocompleteListProps = AutocompleteListProps.Render &
  AutocompleteListProps.SuruUI &
  AutocompleteListProps.BaseUI &
  AutocompleteListProps.HTML;

/**
 * 検索結果のリストを表示するコンテナー要素です。
 */
export const AutocompleteList: IComponent<AutocompleteListProps> = function SuiAutocompleteList(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.List {...otherProps} className={cn(className, "sui_autocomplete_list")} />;
};

export { AutocompleteList as List };

export namespace List {
  export type State = AutocompleteListState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteListProps.Render;

    export type SuruUI = AutocompleteListProps.SuruUI;

    export type BaseUI = AutocompleteListProps.BaseUI;

    export type HTML = AutocompleteListProps.HTML;
  }
}

// Status
// ------

/**
 * {@link AutocompleteStatus} の状態です。
 */
export type AutocompleteStatusState = Autocomplete.Status.State;

export namespace AutocompleteStatusProps {
  export type Render = RenderProps<AutocompleteStatusState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Status>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxStatusProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Status>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteStatus} に渡すプロパティーです。
 */
export type AutocompleteStatusProps = AutocompleteStatusProps.Render &
  AutocompleteStatusProps.SuruUI &
  AutocompleteStatusProps.BaseUI &
  AutocompleteStatusProps.HTML;

/**
 * リストの状態を読み上げるための非表示の要素です。
 *
 * この要素は常に DOM にマウントされたままにしてください。内容を変更するときは、要素を出し入れするのではなく children を差し替えます。
 */
export const AutocompleteStatus: IComponent<AutocompleteStatusProps> =
  function SuiAutocompleteStatus(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Status {...otherProps} className={cn(className, "sui_autocomplete_status")} />
    );
  };

export { AutocompleteStatus as Status };

export namespace Status {
  export type State = AutocompleteStatusState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteStatusProps.Render;

    export type SuruUI = AutocompleteStatusProps.SuruUI;

    export type BaseUI = AutocompleteStatusProps.BaseUI;

    export type HTML = AutocompleteStatusProps.HTML;
  }
}

// Portal
// ------

/**
 * {@link AutocompletePortal} の状態です。
 */
export type AutocompletePortalState = Autocomplete.Portal.State;

export namespace AutocompletePortalProps {
  export type Render = RenderProps<AutocompletePortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxPortalProps:
      "container" | "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompletePortal} に渡すプロパティーです。
 */
export type AutocompletePortalProps = AutocompletePortalProps.Render &
  AutocompletePortalProps.SuruUI &
  AutocompletePortalProps.BaseUI &
  AutocompletePortalProps.HTML;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定では ポップアップを `<body>` の末尾に配置します。
 */
export const AutocompletePortal: IComponent<AutocompletePortalProps> =
  function SuiAutocompletePortal(props) {
    const { size, radius } = useAutocompleteContext();
    const {
      className,
      // @ts-expect-error
      "data-scope": dataScope = "",
      ...otherProps
    } = props;

    return (
      <Autocomplete.Portal
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete_portal",
          `sui_autocomplete_portal-size_${size}`,
          `sui_autocomplete_portal-radius_${radius}`,
        )}
        data-scope={dataScope}
      />
    );
  };

export { AutocompletePortal as Portal };

export namespace Portal {
  export type State = AutocompletePortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompletePortalProps.Render;

    export type SuruUI = AutocompletePortalProps.SuruUI;

    export type BaseUI = AutocompletePortalProps.BaseUI;

    export type HTML = AutocompletePortalProps.HTML;
  }
}

// Positioner
// ----------

/**
 * {@link AutocompletePositioner} の状態です。
 */
export type AutocompletePositionerState = Autocomplete.Positioner.State;

export namespace AutocompletePositionerProps {
  export type Render = RenderProps<AutocompletePositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Positioner>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters:
      | "align"
      | "alignOffset"
      | "anchor"
      | "arrowPadding"
      | "collisionAvoidance"
      | "collisionBoundary"
      | "collisionPadding"
      | "disableAnchorTracking"
      | "positionMethod"
      | "side"
      | "sideOffset"
      | "sticky",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompletePositioner} に渡すプロパティーです。
 */
export type AutocompletePositionerProps = AutocompletePositionerProps.Render &
  AutocompletePositionerProps.SuruUI &
  AutocompletePositionerProps.BaseUI &
  AutocompletePositionerProps.HTML;

/**
 * ポップアップを入力欄に位置合わせする要素です。
 */
export const AutocompletePositioner: IComponent<AutocompletePositionerProps> =
  function SuiAutocompletePositioner(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Positioner
        {...otherProps}
        className={cn(className, "sui_autocomplete_positioner")}
      />
    );
  };

export { AutocompletePositioner as Positioner };

export namespace Positioner {
  export type State = AutocompletePositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompletePositionerProps.Render;

    export type SuruUI = AutocompletePositionerProps.SuruUI;

    export type BaseUI = AutocompletePositionerProps.BaseUI;

    export type HTML = AutocompletePositionerProps.HTML;
  }
}

// Popup
// -----

/**
 * {@link AutocompletePopup} の状態です。
 */
export type AutocompletePopupState = Autocomplete.Popup.State;

export namespace AutocompletePopupProps {
  export type Render = RenderProps<AutocompletePopupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxPopupProps:
      "finalFocus" | "initialFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompletePopup} に渡すプロパティーです。
 */
export type AutocompletePopupProps = AutocompletePopupProps.Render &
  AutocompletePopupProps.SuruUI &
  AutocompletePopupProps.BaseUI &
  AutocompletePopupProps.HTML;

/**
 * 検索結果リストを表示するポップアップ要素です。
 */
export const AutocompletePopup: IComponent<AutocompletePopupProps> = function SuiAutocompletePopup(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Popup {...otherProps} className={cn(className, "sui_autocomplete_popup")} />;
};

export { AutocompletePopup as Popup };

export namespace Popup {
  export type State = AutocompletePopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompletePopupProps.Render;

    export type SuruUI = AutocompletePopupProps.SuruUI;

    export type BaseUI = AutocompletePopupProps.BaseUI;

    export type HTML = AutocompletePopupProps.HTML;
  }
}

// Group
// -----

/**
 * {@link AutocompleteGroup} の状態です。
 */
export type AutocompleteGroupState = Autocomplete.Group.State;

export namespace AutocompleteGroupProps {
  export type Render = RenderProps<AutocompleteGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxGroupProps:
      "items",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteGroup} に渡すプロパティーです。
 */
export type AutocompleteGroupProps = AutocompleteGroupProps.Render &
  AutocompleteGroupProps.SuruUI &
  AutocompleteGroupProps.BaseUI &
  AutocompleteGroupProps.HTML;

/**
 * 関連する項目をまとめるグループ要素です。
 *
 * {@link Root} の `items` にグループの配列を渡したときに使います。
 */
export const AutocompleteGroup: IComponent<AutocompleteGroupProps> = function SuiAutocompleteGroup(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Group {...otherProps} className={cn(className, "sui_autocomplete_group")} />;
};

export { AutocompleteGroup as Group };

export namespace Group {
  export type State = AutocompleteGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteGroupProps.Render;

    export type SuruUI = AutocompleteGroupProps.SuruUI;

    export type BaseUI = AutocompleteGroupProps.BaseUI;

    export type HTML = AutocompleteGroupProps.HTML;
  }
}

// GroupLabel
// ----------

/**
 * {@link GroupLabel} の状態です。
 */
export type AutocompleteGroupLabelState = Autocomplete.GroupLabel.State;

export namespace AutocompleteGroupLabelProps {
  export type Render = RenderProps<AutocompleteGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.GroupLabel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxGroupLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.GroupLabel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link GroupLabel} に渡すプロパティーです。
 */
export type AutocompleteGroupLabelProps = AutocompleteGroupLabelProps.Render &
  AutocompleteGroupLabelProps.SuruUI &
  AutocompleteGroupLabelProps.BaseUI &
  AutocompleteGroupLabelProps.HTML;

/**
 * グループに自動的に対応付けられるラベル要素です。
 */
export const AutocompleteGroupLabel: IComponent<AutocompleteGroupLabelProps> =
  function SuiAutocompleteGroupLabel(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.GroupLabel
        {...otherProps}
        className={cn(className, "sui_autocomplete_group_label")}
      />
    );
  };

export { AutocompleteGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State = AutocompleteGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteGroupLabelProps.Render;

    export type SuruUI = AutocompleteGroupLabelProps.SuruUI;

    export type BaseUI = AutocompleteGroupLabelProps.BaseUI;

    export type HTML = AutocompleteGroupLabelProps.HTML;
  }
}

// Item
// ----

/**
 * {@link AutocompleteItem} の状態です。
 */
export type AutocompleteItemState = Override<Button.Root.State, Autocomplete.Item.State>;

export namespace AutocompleteItemProps {
  export type Render = RenderProps<AutocompleteItemState>;

  export type SuruUI = {};

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Autocomplete.Item>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // ContextMenuItemProps:
        | "children"
        | "onClick"
        | "index"
        | "value"
        | "disabled",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteItem} に渡すプロパティーです。
 */
export type AutocompleteItemProps = AutocompleteItemProps.Render &
  AutocompleteItemProps.SuruUI &
  AutocompleteItemProps.BaseUI &
  AutocompleteItemProps.HTML;

/**
 * リストの個々の項目要素です。
 */
export const AutocompleteItem: IComponent<AutocompleteItemProps> = function SuiAutocompleteItem(
  props,
) {
  const {
    index,
    style,
    value,
    render = <div />,
    onClick,
    children,
    disabled,
    className,
    nativeButton = false,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<AutocompleteItemProps.BaseUI> = {
    index,
    value,
    onClick,
    children,
    disabled,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Autocomplete.Item
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, state) => {
        const buttonRootProps: Required<Button.Root.Props.SuruUI & Button.Root.Props.BaseUI> &
          Pick<Button.Root.Props.HTML, "disabled"> = {
          item: true,
          size: undefined,
          color: "grey",
          muted: undefined,
          radius: undefined,
          pending: undefined,
          squared: undefined,
          variant: "naked",
          disabled: state.disabled,
          outlined: undefined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps(state, {
                style,
                render,
                className: cn(className, "sui_autocomplete_item"),
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { AutocompleteItem as Item };

export namespace Item {
  export type State = AutocompleteItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteItemProps.Render;

    export type SuruUI = AutocompleteItemProps.SuruUI;

    export type BaseUI = AutocompleteItemProps.BaseUI;

    export type HTML = AutocompleteItemProps.HTML;
  }
}

// Row
// ---

/**
 * {@link AutocompleteRow} の状態です。
 */
export type AutocompleteRowState = Autocomplete.Row.State;

export namespace AutocompleteRowProps {
  export type Render = RenderProps<AutocompleteRowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Row>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxRowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Row>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteRow} に渡すプロパティーです。
 */
export type AutocompleteRowProps = AutocompleteRowProps.Render &
  AutocompleteRowProps.SuruUI &
  AutocompleteRowProps.BaseUI &
  AutocompleteRowProps.HTML;

/**
 * グリッドリストの 1 行を表示する要素です。
 *
 * {@link Root} の `grid` プロパティーと一緒に使います。
 */
export const AutocompleteRow: IComponent<AutocompleteRowProps> = function SuiAutocompleteRow(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Row {...otherProps} className={cn(className, "sui_autocomplete_row")} />;
};

export { AutocompleteRow as Row };

export namespace Row {
  export type State = AutocompleteRowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteRowProps.Render;

    export type SuruUI = AutocompleteRowProps.SuruUI;

    export type BaseUI = AutocompleteRowProps.BaseUI;

    export type HTML = AutocompleteRowProps.HTML;
  }
}

// Collection
// ----------

/**
 * {@link AutocompleteCollection} の状態です。
 */
export type AutocompleteCollectionState = Autocomplete.Collection.State;

export namespace AutocompleteCollectionProps {
  export type Render = RenderProps<AutocompleteCollectionState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Collection>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxCollectionProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Collection>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteCollection} に渡すプロパティーです。
 */
export type AutocompleteCollectionProps = AutocompleteCollectionProps.Render &
  AutocompleteCollectionProps.SuruUI &
  AutocompleteCollectionProps.BaseUI &
  AutocompleteCollectionProps.HTML;

/**
 * フィルタリングされた項目を列挙する要素です。
 *
 * これ自身は HTML 要素をレンダリングしません。
 */
export const AutocompleteCollection: IComponent<AutocompleteCollectionProps> =
  function SuiAutocompleteCollection(props) {
    return <Autocomplete.Collection {...props} />;
  };

export { AutocompleteCollection as Collection };

export namespace Collection {
  export type State = AutocompleteCollectionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteCollectionProps.Render;

    export type SuruUI = AutocompleteCollectionProps.SuruUI;

    export type BaseUI = AutocompleteCollectionProps.BaseUI;

    export type HTML = AutocompleteCollectionProps.HTML;
  }
}

// Empty
// -----

/**
 * {@link AutocompleteEmpty} の状態です。
 */
export type AutocompleteEmptyState = Autocomplete.Empty.State;

export namespace AutocompleteEmptyProps {
  export type Render = RenderProps<AutocompleteEmptyState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Empty>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxEmptyProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Empty>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteEmpty} に渡すプロパティーです。
 */
export type AutocompleteEmptyProps = AutocompleteEmptyProps.Render &
  AutocompleteEmptyProps.SuruUI &
  AutocompleteEmptyProps.BaseUI &
  AutocompleteEmptyProps.HTML;

/**
 * リストが空のときだけ、その children を表示する要素です。
 *
 * この要素自体は常に DOM に残します。表示内容の切り替えは children で行います。
 */
export const AutocompleteEmpty: IComponent<AutocompleteEmptyProps> = function SuiAutocompleteEmpty(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Empty {...otherProps} className={cn(className, "sui_autocomplete_empty")} />;
};

export { AutocompleteEmpty as Empty };

export namespace Empty {
  export type State = AutocompleteEmptyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteEmptyProps.Render;

    export type SuruUI = AutocompleteEmptyProps.SuruUI;

    export type BaseUI = AutocompleteEmptyProps.BaseUI;

    export type HTML = AutocompleteEmptyProps.HTML;
  }
}

// useFilter
// ---------

/**
 * 項目を検索文字列と照合するフィルターです。
 */
export interface AutocompleteFilter extends ReturnType<typeof Autocomplete.useFilter> {}

/**
 * {@link useAutocompleteFilter} のオプションです。
 */
export type IUseAutocompleteFilterOptions =
  Parameters<typeof Autocomplete.useFilter> extends readonly [arg0?: infer TArg0, ...never[]]
    ? NonNullable<TArg0>
    : unknown;

/**
 * {@link useAutocompleteFilter} の戻り値です。
 */
export interface IUseAutocompleteFilterReturn extends AutocompleteFilter {}

/**
 * {@link useAutocompleteFilter} の型です。
 */
export interface IUseAutocompleteFilter {
  (options?: IUseAutocompleteFilterOptions): IUseAutocompleteFilterReturn;
}

export namespace IUseAutocompleteFilter {
  export type Options = IUseAutocompleteFilterOptions;

  export interface Return extends IUseAutocompleteFilterReturn {}
}

function useSuiAutocompleteFilter(options?: IUseAutocompleteFilterOptions): AutocompleteFilter {
  return Autocomplete.useFilter(options);
}

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 */
export const useAutocompleteFilter: IUseAutocompleteFilter = useSuiAutocompleteFilter;

export { useAutocompleteFilter as useFilter };

// useFilteredItems
// ----------------

/**
 * フィルタリングされた項目の一覧です。
 */
export type AutocompleteFilteredItems<TItem = any> = readonly TItem[];

/**
 * {@link useAutocompleteFilteredItems} の戻り値です。
 */
export type IUseAutocompleteFilteredItemsReturn<TItem = any> = AutocompleteFilteredItems<TItem>;

/**
 * {@link useAutocompleteFilteredItems} の型です。
 */
export interface IUseAutocompleteFilteredItems {
  <TItem = any>(): IUseAutocompleteFilteredItemsReturn<TItem>;
}

export namespace IUseAutocompleteFilteredItems {
  export type Return<TItem = any> = IUseAutocompleteFilteredItemsReturn<TItem>;
}

function useSuiAutocompleteFilteredItems(): AutocompleteFilteredItems<any> {
  return Autocomplete.useFilteredItems();
}

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 */
export const useAutocompleteFilteredItems: IUseAutocompleteFilteredItems =
  useSuiAutocompleteFilteredItems;

export { useAutocompleteFilteredItems as useFilteredItems };
