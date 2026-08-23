import { Autocomplete } from "@base-ui/react/autocomplete";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import {
  type ScrollAreaRootProps,
  type ScrollAreaRootState,
  type ScrollAreaThumbProps,
  type ScrollAreaThumbState,
  type ScrollAreaCornerProps,
  type ScrollAreaCornerState,
  type ScrollAreaContentProps,
  type ScrollAreaContentState,
  type ScrollAreaViewportProps,
  type ScrollAreaViewportState,
  type ScrollAreaScrollbarProps,
  type ScrollAreaScrollbarState,
  ScrollAreaRoot as BaseScrollAreaRoot,
  ScrollAreaThumb as BaseScrollAreaThumb,
  ScrollAreaCorner as BaseScrollAreaCorner,
  ScrollAreaContent as BaseScrollAreaContent,
  ScrollAreaViewport as BaseScrollAreaViewport,
  ScrollAreaScrollbar as BaseScrollAreaScrollbar,
} from "../../navigation/scroll-area/index.js";
import type { IComponent, IUseContext } from "../../types.js";

import "./autocomplete.css";

// Context
// -------

/**
 * {@link AutocompleteRoot} が子パーツへ提供する状態です。
 */
export type AutocompleteContext = {
  /**
   * フォーカス時に枠線へ適用する色です。
   */
  readonly color: AutocompleteRootColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸です。
   */
  readonly radius: AutocompleteRootRadius;

  /**
   * 入力欄とリスト項目のサイズです。
   */
  readonly size: AutocompleteRootSize;

  /**
   * 入力欄の主な外観です。
   */
  readonly variant: AutocompleteRootVariant;
};

/**
 * オートコンプリートのスタイルを子要素へ伝播するコンテキストです。
 */
export const AutocompleteContext: React.Context<AutocompleteContext | null> =
  React.createContext<AutocompleteContext | null>(null);

function useSuiAutocompleteContext(optional?: false): AutocompleteContext;
function useSuiAutocompleteContext(optional?: boolean): AutocompleteContext | null;
function useSuiAutocompleteContext(optional?: boolean): AutocompleteContext | null {
  const context = React.use(AutocompleteContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "AutocompleteContext",
      providerName: "AutocompleteRoot",
    });
  }

  return context;
}

/**
 * {@link AutocompleteContext} を読み取るフックです。
 */
export const useAutocompleteContext: IUseContext<AutocompleteContext> = useSuiAutocompleteContext;

/**
 * {@link AutocompleteContext} です。
 */
export type Context = AutocompleteContext;

/**
 * {@link AutocompleteContext} です。
 */
export const Context: React.Context<AutocompleteContext | null> = AutocompleteContext;

/**
 * {@link useAutocompleteContext} です。
 */
export const useContext: IUseContext<Context> = useAutocompleteContext;

// Root
// ----

/**
 * オートコンプリートの色です。
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
 * {@link AutocompleteRoot} を命令的に操作するためのオブジェクトです。
 */
export type AutocompleteRootActions = Autocomplete.Root.Actions;

/**
 * {@link AutocompleteRoot} の値が変更された理由です。
 */
export type AutocompleteRootChangeEventReason = Autocomplete.Root.ChangeEventReason;

/**
 * {@link AutocompleteRoot} の値が変更されたイベントの詳細です。
 */
export type AutocompleteRootChangeEventDetails = Autocomplete.Root.ChangeEventDetails;

/**
 * {@link AutocompleteRoot} のアイテムがハイライト表示またはハイライト解除された理由です。
 */
export type AutocompleteRootHighlightEventReason = Autocomplete.Root.HighlightEventReason;

/**
 * {@link AutocompleteRoot} のアイテムがハイライト表示またはハイライト解除されたイベントの詳細です。
 */
export type AutocompleteRootHighlightEventDetails = Autocomplete.Root.HighlightEventDetails;

/**
 * {@link AutocompleteRoot} の状態です。
 */
export type AutocompleteRootState = Autocomplete.Root.State;

/**
 * {@link AutocompleteRoot} に渡すプロパティーです。
 */
export type AutocompleteRootProps = Autocomplete.Root.Props<any> & {
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

/**
 * オートコンプリートのルート要素です。
 *
 * 入力値とポップアップの開閉状態を管理し、各パーツをグループ化します。
 */
export const AutocompleteRoot: IComponent<AutocompleteRootProps> = function SuiAutocompleteRoot(
  props: AutocompleteRootProps,
) {
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = sizeProp,
    variant: variantProp = "liquid",
    outlined: outlinedProp = false,
    ...otherProps
  } = props;
  const size = sizeProp;
  const color = colorProp;
  const radius = radiusProp;
  const variant = variantProp;
  const outlined = outlinedProp;
  const context = React.useMemo<AutocompleteContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );

  return (
    <Context value={context}>
      <Autocomplete.Root {...otherProps} />
    </Context>
  );
};

/**
 * {@link AutocompleteRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link AutocompleteRootState} です。
   */
  export type State = AutocompleteRootState;

  /**
   * {@link AutocompleteRootProps} です。
   */
  export type Props = AutocompleteRootProps;

  /**
   * {@link AutocompleteRootActions} です。
   */
  export type Actions = AutocompleteRootActions;

  /**
   * {@link AutocompleteRootChangeEventDetails} です。
   */
  export type ChangeEventDetails = AutocompleteRootChangeEventDetails;

  /**
   * {@link AutocompleteRootChangeEventReason} です。
   */
  export type ChangeEventReason = AutocompleteRootChangeEventReason;

  /**
   * {@link AutocompleteRootColor} です。
   */
  export type Color = AutocompleteRootColor;

  /**
   * {@link AutocompleteRootHighlightEventDetails} です。
   */
  export type HighlightEventDetails = AutocompleteRootHighlightEventDetails;

  /**
   * {@link AutocompleteRootHighlightEventReason} です。
   */
  export type HighlightEventReason = AutocompleteRootHighlightEventReason;

  /**
   * {@link AutocompleteRootRadius} です。
   */
  export type Radius = AutocompleteRootRadius;

  /**
   * {@link AutocompleteRootSize} です。
   */
  export type Size = AutocompleteRootSize;

  /**
   * {@link AutocompleteRootVariant} です。
   */
  export type Variant = AutocompleteRootVariant;
}

/**
 * {@link AutocompleteRoot} です。
 */
export const Root: IComponent<Root.Props> = AutocompleteRoot;

// Value
// -----

// Suru UI では不要のため未実装です。

// Trigger
// -------

// トリガーを使えるコンポーネントを別途実装するかも？

// InputGroup
// ----------

/**
 * {@link AutocompleteInputGroup} の状態です。
 */
export type AutocompleteInputGroupState = Autocomplete.InputGroup.State;

/**
 * {@link AutocompleteInputGroup} に渡すプロパティーです。
 */
export type AutocompleteInputGroupProps = React.ComponentProps<typeof Autocomplete.InputGroup>;

/**
 * 入力欄とその付属コントロールをまとめるグループ要素です。
 */
export const AutocompleteInputGroup: IComponent<AutocompleteInputGroupProps> =
  function SuiAutocompleteInputGroup(props) {
    const { size, color, radius, variant, outlined } = useAutocompleteContext();
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.InputGroup
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete",
          `sui_autocomplete-size_${size}`,
          `sui_autocomplete-color_${color}`,
          `sui_autocomplete-radius_${radius}`,
          `sui_autocomplete-variant_${variant}`,
          outlined && "sui_autocomplete-outlined",
          (state) => state.disabled && "sui_autocomplete-disabled",
        )}
      />
    );
  };

/**
 * {@link AutocompleteInputGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace InputGroup {
  /**
   * {@link AutocompleteInputGroupState} です。
   */
  export type State = AutocompleteInputGroupState;

  /**
   * {@link AutocompleteInputGroupProps} です。
   */
  export type Props = AutocompleteInputGroupProps;
}

/**
 * {@link AutocompleteInputGroup} です。
 */
export const InputGroup: IComponent<InputGroup.Props> = AutocompleteInputGroup;

// Input
// -----

/**
 * {@link AutocompleteInput} の状態です。
 */
export type AutocompleteInputState = Autocomplete.Input.State;

/**
 * {@link AutocompleteInput} に渡すプロパティーです。
 */
export type AutocompleteInputProps = React.ComponentProps<typeof Autocomplete.Input>;

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
        (state) => state.disabled && "sui_autocomplete_input-disabled",
      )}
    />
  );
};

/**
 * {@link AutocompleteInput} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Input {
  /**
   * {@link AutocompleteInputState} です。
   */
  export type State = AutocompleteInputState;

  /**
   * {@link AutocompleteInputProps} です。
   */
  export type Props = AutocompleteInputProps;
}

/**
 * {@link AutocompleteInput} です。
 */
export const Input: IComponent<Input.Props> = AutocompleteInput;

// Addon
// -----

/**
 * {@link AutocompleteAddon} の状態です。
 */
export type AutocompleteAddonState = {};

/**
 * {@link AutocompleteAddon} に渡すプロパティーです。
 */
export type AutocompleteAddonProps = Omit<
  React.ComponentProps<"span">,
  keyof RenderProps<AutocompleteAddonState>
> &
  RenderProps<AutocompleteAddonState>;

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const AutocompleteAddon: IComponent<AutocompleteAddonProps> = function SuiAutocompleteAddon(
  props,
) {
  return useRender({
    defaultTagName: "span",
    props: [
      props,
      {
        className: "sui_autocomplete_addon",
      },
    ],
  });
};

/**
 * {@link AutocompleteAddon} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Addon {
  /**
   * {@link AutocompleteAddonState} です。
   */
  export type State = AutocompleteAddonState;

  /**
   * {@link AutocompleteAddonProps} です。
   */
  export type Props = AutocompleteAddonProps;
}

/**
 * {@link AutocompleteAddon} です。
 */
export const Addon: IComponent<Addon.Props> = AutocompleteAddon;

// Icon
// ----

// 必要性がよくわからないので未実装です。

// Clear
// -----

/**
 * {@link AutocompleteClear} の状態です。
 */
export type AutocompleteClearState = Autocomplete.Clear.State;

/**
 * {@link AutocompleteClear} に渡すプロパティーです。
 */
export type AutocompleteClearProps = React.ComponentProps<typeof Autocomplete.Clear>;

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

/**
 * {@link AutocompleteClear} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Clear {
  /**
   * {@link AutocompleteClearState} です。
   */
  export type State = AutocompleteClearState;

  /**
   * {@link AutocompleteClearProps} です。
   */
  export type Props = AutocompleteClearProps;
}

/**
 * {@link AutocompleteClear} です。
 */
export const Clear: IComponent<Clear.Props> = AutocompleteClear;

// ScrollArea
// ----------

/**
 * {@link AutocompleteScrollArea} の状態です。
 */
export type AutocompleteScrollAreaState = ScrollAreaRootState;

/**
 * {@link AutocompleteScrollArea} に渡すプロパティーです。
 */
export type AutocompleteScrollAreaProps = ScrollAreaRootProps;

/**
 * 検索結果リストをスクロール可能にするスクロール領域のルート要素です。
 */
export const AutocompleteScrollArea: IComponent<AutocompleteScrollAreaProps> =
  function SuiAutocompleteScrollArea(props) {
    const { className, ...otherProps } = props;

    return (
      <BaseScrollAreaRoot
        {...otherProps}
        className={cn(className, "sui_autocomplete_scroll_area")}
      />
    );
  };

/**
 * {@link AutocompleteScrollArea} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ScrollArea {
  /**
   * {@link AutocompleteScrollAreaState} です。
   */
  export type State = AutocompleteScrollAreaState;

  /**
   * {@link AutocompleteScrollAreaProps} です。
   */
  export type Props = AutocompleteScrollAreaProps;
}

/**
 * {@link AutocompleteScrollArea} です。
 */
export const ScrollArea: IComponent<ScrollArea.Props> = AutocompleteScrollArea;

// Viewport
// --------

/**
 * {@link AutocompleteViewport} の状態です。
 */
export type AutocompleteViewportState = ScrollAreaViewportState;

/**
 * {@link AutocompleteViewport} に渡すプロパティーです。
 */
export type AutocompleteViewportProps = ScrollAreaViewportProps;

/**
 * スクロール領域のうち、コンテンツをクリップしてスクロール操作を受け付けるビューポート要素です。
 */
export const AutocompleteViewport: IComponent<AutocompleteViewportProps> =
  function SuiAutocompleteViewport(props) {
    const { className, ...otherProps } = props;

    return (
      <BaseScrollAreaViewport
        {...otherProps}
        className={cn(className, "sui_autocomplete_viewport")}
      />
    );
  };

/**
 * {@link AutocompleteViewport} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Viewport {
  /**
   * {@link AutocompleteViewportState} です。
   */
  export type State = AutocompleteViewportState;

  /**
   * {@link AutocompleteViewportProps} です。
   */
  export type Props = AutocompleteViewportProps;
}

/**
 * {@link AutocompleteViewport} です。
 */
export const Viewport: IComponent<Viewport.Props> = AutocompleteViewport;

// Content
// -------

/**
 * {@link AutocompleteContent} の状態です。
 */
export type AutocompleteContentState = ScrollAreaContentState;

/**
 * {@link AutocompleteContent} に渡すプロパティーです。
 */
export type AutocompleteContentProps = ScrollAreaContentProps;

/**
 * スクロール領域のうち、スクロールされるコンテンツを保持する要素です。
 */
export const AutocompleteContent: IComponent<AutocompleteContentProps> =
  function SuiAutocompleteContent(props) {
    const { className, ...otherProps } = props;

    return (
      <BaseScrollAreaContent
        {...otherProps}
        className={cn(className, "sui_autocomplete_content")}
      />
    );
  };

/**
 * {@link AutocompleteContent} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Content {
  /**
   * {@link AutocompleteContentState} です。
   */
  export type State = AutocompleteContentState;

  /**
   * {@link AutocompleteContentProps} です。
   */
  export type Props = AutocompleteContentProps;
}

/**
 * {@link AutocompleteContent} です。
 */
export const Content: IComponent<Content.Props> = AutocompleteContent;

// Scrollbar
// ---------

/**
 * {@link AutocompleteScrollbar} の状態です。
 */
export type AutocompleteScrollbarState = ScrollAreaScrollbarState;

/**
 * {@link AutocompleteScrollbar} に渡すプロパティーです。
 */
export type AutocompleteScrollbarProps = ScrollAreaScrollbarProps;

/**
 * スクロール領域のスクロールバー要素です。
 *
 * 子要素として {@link AutocompleteThumb} を配置します。
 */
export const AutocompleteScrollbar: IComponent<AutocompleteScrollbarProps> =
  function SuiAutocompleteScrollbar(props) {
    const { className, ...otherProps } = props;

    return (
      <BaseScrollAreaScrollbar
        {...otherProps}
        className={cn(className, "sui_autocomplete_scrollbar")}
      />
    );
  };

/**
 * {@link AutocompleteScrollbar} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Scrollbar {
  /**
   * {@link AutocompleteScrollbarState} です。
   */
  export type State = AutocompleteScrollbarState;

  /**
   * {@link AutocompleteScrollbarProps} です。
   */
  export type Props = AutocompleteScrollbarProps;
}

/**
 * {@link AutocompleteScrollbar} です。
 */
export const Scrollbar: IComponent<Scrollbar.Props> = AutocompleteScrollbar;

// Thumb
// -----

/**
 * {@link AutocompleteThumb} の状態です。
 */
export type AutocompleteThumbState = ScrollAreaThumbState;

/**
 * {@link AutocompleteThumb} に渡すプロパティーです。
 */
export type AutocompleteThumbProps = ScrollAreaThumbProps;

/**
 * スクロール位置とスクロール可能な範囲を示す、スクロールバー内のつまみ要素です。
 */
export const AutocompleteThumb: IComponent<AutocompleteThumbProps> = function SuiAutocompleteThumb(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <BaseScrollAreaThumb {...otherProps} className={cn(className, "sui_autocomplete_thumb")} />
  );
};

/**
 * {@link AutocompleteThumb} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Thumb {
  /**
   * {@link AutocompleteThumbState} です。
   */
  export type State = AutocompleteThumbState;

  /**
   * {@link AutocompleteThumbProps} です。
   */
  export type Props = AutocompleteThumbProps;
}

/**
 * {@link AutocompleteThumb} です。
 */
export const Thumb: IComponent<Thumb.Props> = AutocompleteThumb;

// Corner
// ------

/**
 * {@link AutocompleteCorner} の状態です。
 */
export type AutocompleteCornerState = ScrollAreaCornerState;

/**
 * {@link AutocompleteCorner} に渡すプロパティーです。
 */
export type AutocompleteCornerProps = ScrollAreaCornerProps;

/**
 * 水平スクロールバーと垂直スクロールバーの交差部分を埋める要素です。
 */
export const AutocompleteCorner: IComponent<AutocompleteCornerProps> =
  function SuiAutocompleteCorner(props) {
    const { className, ...otherProps } = props;

    return (
      <BaseScrollAreaCorner {...otherProps} className={cn(className, "sui_autocomplete_corner")} />
    );
  };

/**
 * {@link AutocompleteCorner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Corner {
  /**
   * {@link AutocompleteCornerState} です。
   */
  export type State = AutocompleteCornerState;

  /**
   * {@link AutocompleteCornerProps} です。
   */
  export type Props = AutocompleteCornerProps;
}

/**
 * {@link AutocompleteCorner} です。
 */
export const Corner: IComponent<Corner.Props> = AutocompleteCorner;

// List
// ----

/**
 * {@link AutocompleteList} の状態です。
 */
export type AutocompleteListState = Autocomplete.List.State;

/**
 * {@link AutocompleteList} に渡すプロパティーです。
 */
export type AutocompleteListProps = React.ComponentProps<typeof Autocomplete.List>;

/**
 * 検索結果のリストを表示するコンテナー要素です。
 */
export const AutocompleteList: IComponent<AutocompleteListProps> = function SuiAutocompleteList(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.List {...otherProps} className={cn(className, "sui_autocomplete_list")} />;
};

/**
 * {@link AutocompleteList} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace List {
  /**
   * {@link AutocompleteListState} です。
   */
  export type State = AutocompleteListState;

  /**
   * {@link AutocompleteListProps} です。
   */
  export type Props = AutocompleteListProps;
}

/**
 * {@link AutocompleteList} です。
 */
export const List: IComponent<List.Props> = AutocompleteList;

// Status
// ------

/**
 * {@link AutocompleteStatus} の状態です。
 */
export type AutocompleteStatusState = Autocomplete.Status.State;

/**
 * {@link AutocompleteStatus} に渡すプロパティーです。
 */
export type AutocompleteStatusProps = React.ComponentProps<typeof Autocomplete.Status>;

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

/**
 * {@link AutocompleteStatus} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Status {
  /**
   * {@link AutocompleteStatusState} です。
   */
  export type State = AutocompleteStatusState;

  /**
   * {@link AutocompleteStatusProps} です。
   */
  export type Props = AutocompleteStatusProps;
}

/**
 * {@link AutocompleteStatus} です。
 */
export const Status: IComponent<Status.Props> = AutocompleteStatus;

// Portal
// ------

/**
 * {@link AutocompletePortal} の状態です。
 */
export type AutocompletePortalState = Autocomplete.Portal.State;

/**
 * {@link AutocompletePortal} に渡すプロパティーです。
 */
export type AutocompletePortalProps = React.ComponentProps<typeof Autocomplete.Portal>;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定では ポップアップを `<body>` の末尾に配置します。
 */
export const AutocompletePortal: IComponent<AutocompletePortalProps> =
  function SuiAutocompletePortal(props) {
    const { size, radius } = useAutocompleteContext();
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Portal
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete_portal",
          `sui_autocomplete_portal-size_${size}`,
          `sui_autocomplete_portal-radius_${radius}`,
        )}
      />
    );
  };

/**
 * {@link AutocompletePortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link AutocompletePortalState} です。
   */
  export type State = AutocompletePortalState;

  /**
   * {@link AutocompletePortalProps} です。
   */
  export type Props = AutocompletePortalProps;
}

/**
 * {@link AutocompletePortal} です。
 */
export const Portal: IComponent<Portal.Props> = AutocompletePortal;

// Backdrop
// --------

// Suru UI では不要のため未実装です。

// Positioner
// ----------

/**
 * {@link AutocompletePositioner} の状態です。
 */
export type AutocompletePositionerState = Autocomplete.Positioner.State;

/**
 * {@link AutocompletePositioner} に渡すプロパティーです。
 */
export type AutocompletePositionerProps = React.ComponentProps<typeof Autocomplete.Positioner>;

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

/**
 * {@link AutocompletePositioner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link AutocompletePositionerState} です。
   */
  export type State = AutocompletePositionerState;

  /**
   * {@link AutocompletePositionerProps} です。
   */
  export type Props = AutocompletePositionerProps;
}

/**
 * {@link AutocompletePositioner} です。
 */
export const Positioner: IComponent<Positioner.Props> = AutocompletePositioner;

// Popup
// -----

/**
 * {@link AutocompletePopup} の状態です。
 */
export type AutocompletePopupState = Autocomplete.Popup.State;

/**
 * {@link AutocompletePopup} に渡すプロパティーです。
 */
export type AutocompletePopupProps = React.ComponentProps<typeof Autocomplete.Popup>;

/**
 * 検索結果リストを表示するポップアップ要素です。
 */
export const AutocompletePopup: IComponent<AutocompletePopupProps> = function SuiAutocompletePopup(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Popup {...otherProps} className={cn(className, "sui_autocomplete_popup")} />;
};

/**
 * {@link AutocompletePopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link AutocompletePopupState} です。
   */
  export type State = AutocompletePopupState;

  /**
   * {@link AutocompletePopupProps} です。
   */
  export type Props = AutocompletePopupProps;
}

/**
 * {@link AutocompletePopup} です。
 */
export const Popup: IComponent<Popup.Props> = AutocompletePopup;

// Arrow
// -----

// Suru UI では不要のため未実装です。

// Group
// -----

/**
 * {@link AutocompleteGroup} の状態です。
 */
export type AutocompleteGroupState = Autocomplete.Group.State;

/**
 * {@link AutocompleteGroup} に渡すプロパティーです。
 */
export type AutocompleteGroupProps = React.ComponentProps<typeof Autocomplete.Group>;

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

/**
 * {@link AutocompleteGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  /**
   * {@link AutocompleteGroupState} です。
   */
  export type State = AutocompleteGroupState;

  /**
   * {@link AutocompleteGroupProps} です。
   */
  export type Props = AutocompleteGroupProps;
}

/**
 * {@link AutocompleteGroup} です。
 */
export const Group: IComponent<Group.Props> = AutocompleteGroup;

// GroupLabel
// ----------

/**
 * {@link GroupLabel} の状態です。
 */
export type AutocompleteGroupLabelState = Autocomplete.GroupLabel.State;

/**
 * {@link GroupLabel} に渡すプロパティーです。
 */
export type AutocompleteGroupLabelProps = React.ComponentProps<typeof Autocomplete.GroupLabel>;

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

/**
 * {@link AutocompleteGroupLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link AutocompleteGroupLabelState} です。
   */
  export type State = AutocompleteGroupLabelState;

  /**
   * {@link AutocompleteGroupLabelProps} です。
   */
  export type Props = AutocompleteGroupLabelProps;
}

/**
 * {@link AutocompleteGroupLabel} です。
 */
export const GroupLabel: IComponent<GroupLabel.Props> = AutocompleteGroupLabel;

// Item
// ----

/**
 * {@link AutocompleteItem} の状態です。
 */
export type AutocompleteItemState = Autocomplete.Item.State;

/**
 * {@link AutocompleteItem} に渡すプロパティーです。
 */
export type AutocompleteItemProps = React.ComponentProps<typeof Autocomplete.Item>;

/**
 * リストの個々の項目要素です。
 */
export const AutocompleteItem: IComponent<AutocompleteItemProps> = function SuiAutocompleteItem(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Item {...otherProps} className={cn(className, "sui_autocomplete_item")} />;
};

/**
 * {@link AutocompleteItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link AutocompleteItemState} です。
   */
  export type State = AutocompleteItemState;

  /**
   * {@link AutocompleteItemProps} です。
   */
  export type Props = AutocompleteItemProps;
}

/**
 * {@link AutocompleteItem} です。
 */
export const Item: IComponent<Item.Props> = AutocompleteItem;

// Row
// ---

/**
 * {@link AutocompleteRow} の状態です。
 */
export type AutocompleteRowState = Autocomplete.Row.State;

/**
 * {@link AutocompleteRow} に渡すプロパティーです。
 */
export type AutocompleteRowProps = React.ComponentProps<typeof Autocomplete.Row>;

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

/**
 * {@link AutocompleteRow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Row {
  /**
   * {@link AutocompleteRowState} です。
   */
  export type State = AutocompleteRowState;

  /**
   * {@link AutocompleteRowProps} です。
   */
  export type Props = AutocompleteRowProps;
}

/**
 * {@link AutocompleteRow} です。
 */
export const Row: IComponent<Row.Props> = AutocompleteRow;

// Collection
// ----------

/**
 * {@link AutocompleteCollection} の状態です。
 */
export type AutocompleteCollectionState = Autocomplete.Collection.State;

/**
 * {@link AutocompleteCollection} に渡すプロパティーです。
 */
export type AutocompleteCollectionProps = React.ComponentProps<typeof Autocomplete.Collection>;

/**
 * フィルタリングされた項目を列挙する要素です。
 *
 * これ自身は HTML 要素をレンダリングしません。
 */
export const AutocompleteCollection: IComponent<AutocompleteCollectionProps> =
  function SuiAutocompleteCollection(props) {
    return <Autocomplete.Collection {...props} />;
  };

/**
 * {@link AutocompleteCollection} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Collection {
  /**
   * {@link AutocompleteCollectionState} です。
   */
  export type State = AutocompleteCollectionState;

  /**
   * {@link AutocompleteCollectionProps} です。
   */
  export type Props = AutocompleteCollectionProps;
}

/**
 * {@link AutocompleteCollection} です。
 */
export const Collection: IComponent<Collection.Props> = AutocompleteCollection;

// Empty
// -----

/**
 * {@link AutocompleteEmpty} の状態です。
 */
export type AutocompleteEmptyState = Autocomplete.Empty.State;

/**
 * {@link AutocompleteEmpty} に渡すプロパティーです。
 */
export type AutocompleteEmptyProps = React.ComponentProps<typeof Autocomplete.Empty>;

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

/**
 * {@link AutocompleteEmpty} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Empty {
  /**
   * {@link AutocompleteEmptyState} です。
   */
  export type State = AutocompleteEmptyState;

  /**
   * {@link AutocompleteEmptyProps} です。
   */
  export type Props = AutocompleteEmptyProps;
}

/**
 * {@link AutocompleteEmpty} です。
 */
export const Empty: IComponent<Empty.Props> = AutocompleteEmpty;

// Separator
// ---------

// Suru UI では不要のため未実装です。

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

/**
 * {@link IUseAutocompleteFilter} に対応する型名前空間です。
 */
export namespace IUseAutocompleteFilter {
  /**
   * {@link IUseAutocompleteFilterOptions} です。
   */
  export type Options = IUseAutocompleteFilterOptions;

  /**
   * {@link IUseAutocompleteFilterReturn} です。
   */
  export interface Return extends IUseAutocompleteFilterReturn {}
}

function useSuiAutocompleteFilter(options?: IUseAutocompleteFilterOptions): AutocompleteFilter {
  return Autocomplete.useFilter(options);
}

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 */
export const useAutocompleteFilter: IUseAutocompleteFilter = useSuiAutocompleteFilter;

/**
 * {@link useAutocompleteFilter} です。
 */
export const useFilter: IUseAutocompleteFilter = useAutocompleteFilter;

// useFilteredItems
// ----------------

/**
 * フィルタリングされた項目の一覧です。
 */
export type AutocompleteFilteredItems<TItem = unknown> = readonly TItem[];

/**
 * {@link useAutocompleteFilteredItems} の戻り値です。
 */
export type IUseAutocompleteFilteredItemsReturn<TItem = unknown> = AutocompleteFilteredItems<TItem>;

/**
 * {@link useAutocompleteFilteredItems} の型です。
 */
export interface IUseAutocompleteFilteredItems {
  <TItem = unknown>(): IUseAutocompleteFilteredItemsReturn<TItem>;
}

/**
 * {@link IUseAutocompleteFilteredItems} に対応する型名前空間です。
 */
export namespace IUseAutocompleteFilteredItems {
  /**
   * {@link IUseAutocompleteFilteredItemsReturn} です。
   */
  export type Return<TItem = unknown> = IUseAutocompleteFilteredItemsReturn<TItem>;
}

function useSuiAutocompleteFilteredItems(): AutocompleteFilteredItems<any> {
  return Autocomplete.useFilteredItems();
}

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 */
export const useAutocompleteFilteredItems: IUseAutocompleteFilteredItems =
  useSuiAutocompleteFilteredItems;

/**
 * {@link useAutocompleteFilteredItems} です。
 */
export const useFilteredItems: IUseAutocompleteFilteredItems = useAutocompleteFilteredItems;
