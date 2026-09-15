import { Accordion } from "@base-ui/react/accordion";
import type { NativeButtonProps, BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ChevronIcon } from "../_icons.jsx";
import toReactNode from "../_to-react-node.js";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type $InferItemValue, isItemObject } from "./_accordion.jsx";

import "./accordion.css";

// Root
// ----

/**
 * アコーディオンの項目の開閉状態を変更するイベントの詳細です。
 */
export type AccordionRootChangeEventDetails = Accordion.Root.ChangeEventDetails;

/**
 * アコーディオンの項目の開閉状態を変更する理由です。
 */
export type AccordionRootChangeEventReason = Accordion.Root.ChangeEventReason;

/**
 * アコーディオンの項目を表すオブジェクトです。
 *
 * `title` と `content` を含み、その他のプロパティーは {@link AccordionItem} に渡されます。
 */
export type AccordionRootItemObject = Omit<AccordionItemProps, "title"> & {
  /**
   * 項目のパネルに表示する内容です。
   */
  content: React.ReactNode;

  /**
   * 項目の見出しに表示するタイトルです。
   */
  title: React.ReactNode;

  /**
   * {@link https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/title|title}
   */
  htmlTitle?: React.HTMLAttributes<HTMLDivElement>["title"];
};

/**
 * アコーディオンの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IAccordionRootItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}

/**
 * アコーディオンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AccordionRootRadius = "none" | Size;

/**
 * アコーディオンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AccordionRootSize = Size;

/**
 * アコーディオンの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AccordionRootVariant = "naked" | "liquid";

/**
 * アコーディオンの項目の値です。
 *
 * @template TValue 項目の値の型です。
 */
export type AccordionRootValue<TValue = any> = Accordion.Root.Value<TValue>;

/**
 * {@link AccordionRoot} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type AccordionRootState<TValue = any> = Accordion.Root.State<TValue>;

export namespace AccordionRootProps {
  export type Render<TValue = any> = RenderProps<AccordionRootState<TValue>>;

  export type SuruUI<TItem = any> = {
    /**
     * アコーディオンの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link AccordionRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IAccordionRootItemRenderer<TItem>;

    /**
     * アコーディオンの項目です。
     *
     * `children` に関数を指定した場合、この配列の各項目が引数として渡されます。
     */
    items?: readonly TItem[] | undefined;

    /**
     * アコーディオンの枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * アコーディオンの角丸の大きさを指定します。
     *
     * 既定値は {@link AccordionRootProps.size|size}
     */
    radius?: AccordionRootRadius | undefined;

    /**
     * アコーディオンの項目が隣接する項目の区切り線を表示するかどうかを指定します。
     *
     * @default false
     */
    separator?: boolean | undefined;

    /**
     * アコーディオンの大きさを指定します。
     *
     * @default "md"
     */
    size?: AccordionRootSize | undefined;

    /**
     * アコーディオンの主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: AccordionRootVariant | undefined;
  };

  export type BaseUI<TValue = any> = Pick<
    React.ComponentProps<typeof Accordion.Root<TValue>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AccordionRootProps:
      | "value"
      | "defaultValue"
      | "disabled"
      | "hiddenUntilFound"
      | "keepMounted"
      | "loopFocus"
      | "onValueChange"
      | "multiple"
      | "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TValue = any> = Omit<
    React.ComponentProps<typeof Accordion.Root<TValue>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 * @template TValue 項目の値の型です。
 */
export type AccordionRootProps<TItem = any, TValue = any> = AccordionRootProps.Render<TValue> &
  AccordionRootProps.SuruUI<TItem> &
  AccordionRootProps.BaseUI<TValue> &
  AccordionRootProps.HTML<TValue>;

interface IAccordionRoot extends IComponent<AccordionRootProps> {
  /**
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   */
  <TItem = never, TValue = $InferItemValue<TItem>>(
    props: AccordionRootProps<TItem, TValue>,
  ): IComponent.Return;
}

/**
 * アコーディオンのルートコンポーネントです。
 */
export const AccordionRoot: IAccordionRoot = function SuiAccordionRoot(props: AccordionRootProps) {
  const {
    size = "md",
    items = [],
    radius = size,
    variant = "liquid",
    children = defaultRootItemRenderer,
    outlined = false,
    className,
    separator = false,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Accordion.Root
      {...otherProps}
      className={cn(
        className,
        "sui_accordion",
        `sui_accordion-size_${size}`,
        `sui_accordion-radius_${radius}`,
        `sui_accordion-variant_${variant}`,
        outlined && "sui_accordion-outlined",
        separator && "sui_accordion-separator",
        (state) => state.disabled && "sui_accordion-disabled",
      )}
      data-scope={dataScope}
    >
      {typeof children === "function" ? items.map(children) : children}
    </Accordion.Root>
  );
};

const defaultRootItemRenderer: IAccordionRootItemRenderer = (item, index) => {
  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  const { title, content, htmlTitle, ...otherItemProps } = item;

  return (
    <AccordionItem {...otherItemProps} key={index} title={htmlTitle}>
      <AccordionHeading>
        <AccordionTrigger>
          {toReactNode(title)}
          <AccordionIndicator />
        </AccordionTrigger>
      </AccordionHeading>
      <AccordionContent>{toReactNode(content)}</AccordionContent>
    </AccordionItem>
  );
};

export { AccordionRoot as Root };

export namespace Root {
  export type State<TValue = any> = AccordionRootState<TValue>;

  export type Props<TItem = any, TValue = any> = Props.Render<TValue> &
    Props.SuruUI<TItem> &
    Props.BaseUI<TValue> &
    Props.HTML<TValue>;

  export namespace Props {
    export type Render<TValue = any> = AccordionRootProps.Render<TValue>;

    export type SuruUI<TItem = any> = AccordionRootProps.SuruUI<TItem>;

    export type BaseUI<TValue = any> = AccordionRootProps.BaseUI<TValue>;

    export type HTML<TValue = any> = AccordionRootProps.HTML<TValue>;
  }

  export type ChangeEventDetails = AccordionRootChangeEventDetails;

  export type ChangeEventReason = AccordionRootChangeEventReason;

  export type ItemObject = AccordionRootItemObject;

  export interface IItemRenderer<TItem = any> extends IAccordionRootItemRenderer<TItem> {}

  export type Radius = AccordionRootRadius;

  export type Size = AccordionRootSize;

  export type Value<TValue = any> = AccordionRootValue<TValue>;

  export type Variant = AccordionRootVariant;
}

// Item
// ----

/**
 * アコーディオンの項目の開閉状態が変更するイベントの詳細です。
 */
export type AccordionItemChangeEventDetails = Accordion.Item.ChangeEventDetails;

/**
 * アコーディオンの項目の開閉状態を変更する理由です。
 */
export type AccordionItemChangeEventReason = Accordion.Item.ChangeEventReason;

/**
 * {@link AccordionItem} が持つ状態です。
 */
export type AccordionItemState = Accordion.Item.State;

export namespace AccordionItemProps {
  export type Render = RenderProps<AccordionItemState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Accordion.Item>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // Pick<UseCollapsibleRootParameters, 'disabled'>:
      | "disabled"
      // AccordionItemProps:
      | "value"
      | "onOpenChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Accordion.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionItem} に渡す props です。
 */
export type AccordionItemProps = AccordionItemProps.Render &
  AccordionItemProps.SuruUI &
  AccordionItemProps.BaseUI &
  AccordionItemProps.HTML;

/**
 * アコーディオンの項目コンポーネントです。
 */
export const AccordionItem: IComponent<AccordionItemProps> = function SuiAccordionItem(props) {
  const { className, ...otherProps } = props;

  return (
    <Accordion.Item
      {...otherProps}
      className={cn(
        className,
        "sui_accordion_item",
        (state) => state.open && "sui_accordion_item-open",
        (state) => state.disabled && "sui_accordion_item-disabled",
      )}
    />
  );
};

export { AccordionItem as Item };

export namespace Item {
  export type State = AccordionItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AccordionItemProps.Render;

    export type SuruUI = AccordionItemProps.SuruUI;

    export type BaseUI = AccordionItemProps.BaseUI;

    export type HTML = AccordionItemProps.HTML;
  }

  export type ChangeEventDetails = AccordionItemChangeEventDetails;

  export type ChangeEventReason = AccordionItemChangeEventReason;
}

// Heading
// -------

/**
 * {@link AccordionHeading} が持つ状態です。
 */
export type AccordionHeadingState = Accordion.Header.State;

export namespace AccordionHeadingProps {
  export type Render = RenderProps<AccordionHeadingState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Accordion.Header>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AccordionHeaderProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Accordion.Header>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionHeading} に渡す props です。
 */
export type AccordionHeadingProps = AccordionHeadingProps.Render &
  AccordionHeadingProps.SuruUI &
  AccordionHeadingProps.BaseUI &
  AccordionHeadingProps.HTML;

/**
 * アコーディオンの見出しコンポーネントです。
 */
export const AccordionHeading: IComponent<AccordionHeadingProps> = function SuiAccordionHeading(
  props,
) {
  const { className, ...otherProps } = props;

  return <Accordion.Header {...otherProps} className={cn(className, "sui_accordion_heading")} />;
};

export { AccordionHeading as Heading };

export namespace Heading {
  export type State = AccordionHeadingState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AccordionHeadingProps.Render;

    export type SuruUI = AccordionHeadingProps.SuruUI;

    export type BaseUI = AccordionHeadingProps.BaseUI;

    export type HTML = AccordionHeadingProps.HTML;
  }
}

// Trigger
// -------

/**
 * {@link AccordionTrigger} が持つ状態です。
 */
export type AccordionTriggerState = Accordion.Trigger.State;

export namespace AccordionTriggerProps {
  export type Render = RenderProps<AccordionTriggerState>;

  export type SuruUI = {
    /**
     * `true` にすると Suru UI のスタイルがつかなくなります。
     *
     * これは主に、`render` prop でボタンコンポーネントを描画する際に使用されます。
     *
     * @default false
     */
    unstyled?: boolean | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Accordion.Trigger>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // AccordionTriggerProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Accordion.Trigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionTrigger} に渡す props です。
 */
export type AccordionTriggerProps = AccordionTriggerProps.Render &
  AccordionTriggerProps.SuruUI &
  AccordionTriggerProps.BaseUI &
  AccordionTriggerProps.HTML;

/**
 * アコーディオンの開閉ボタンコンポーネントです。
 */
export const AccordionTrigger: IComponent<AccordionTriggerProps> = function SuiAccordionTrigger(
  props,
) {
  const { unstyled = false, className, ...otherProps } = props;

  return (
    <Accordion.Trigger
      {...otherProps}
      className={cn(
        className,
        "sui_accordion_trigger",
        unstyled && "sui_accordion_trigger-unstyled",
      )}
    />
  );
};

export { AccordionTrigger as Trigger };

export namespace Trigger {
  export type State = AccordionTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AccordionTriggerProps.Render;

    export type SuruUI = AccordionTriggerProps.SuruUI;

    export type BaseUI = AccordionTriggerProps.BaseUI;

    export type HTML = AccordionTriggerProps.HTML;
  }
}

// Indicator
// ---------

/**
 * {@link AccordionIndicator} が持つ状態です。
 */
export type AccordionIndicatorState = {};

export namespace AccordionIndicatorProps {
  export type Render = RenderProps<AccordionIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionIndicator} に渡す props です。
 */
export type AccordionIndicatorProps = AccordionIndicatorProps.Render &
  AccordionIndicatorProps.SuruUI &
  AccordionIndicatorProps.BaseUI &
  AccordionIndicatorProps.HTML;

/**
 * アコーディオンの展開状態を示すアイコンを表示するコンポーネントです。
 */
export const AccordionIndicator: IComponent<AccordionIndicatorProps> =
  function SuiAccordionIndicator(props) {
    const { children = <ChevronIcon />, ...otherSpanProps } = props;

    return useRender({
      props: [
        otherSpanProps,
        {
          children,
          className: "sui_accordion_indicator",
        },
      ],
      defaultTagName: "span",
    });
  };

export { AccordionIndicator as Indicator };

export namespace Indicator {
  export type State = AccordionIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AccordionIndicatorProps.Render;

    export type SuruUI = AccordionIndicatorProps.SuruUI;

    export type BaseUI = AccordionIndicatorProps.BaseUI;

    export type HTML = AccordionIndicatorProps.HTML;
  }
}

// Content
// -------

/**
 * {@link AccordionContent} が持つ状態です。
 */
export type AccordionContentState = Accordion.Panel.State;

export namespace AccordionContentProps {
  export type Render = RenderProps<AccordionContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Accordion.Panel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // Pick<AccordionRoot.Props, 'hiddenUntilFound' | 'keepMounted'>:
      | "hiddenUntilFound"
      | "keepMounted"
      // AccordionPanelProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Accordion.Panel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionContent} に渡す props です。
 */
export type AccordionContentProps = AccordionContentProps.Render &
  AccordionContentProps.SuruUI &
  AccordionContentProps.BaseUI &
  AccordionContentProps.HTML;

/**
 * アコーディオンのパネルコンポーネントです。
 */
export const AccordionContent: IComponent<AccordionContentProps> = function SuiAccordionContent(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Accordion.Panel
      {...otherProps}
      className={cn(
        className,
        "sui_accordion_content",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_accordion_content-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { AccordionContent as Content };

export namespace Content {
  export type State = AccordionContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AccordionContentProps.Render;

    export type SuruUI = AccordionContentProps.SuruUI;

    export type BaseUI = AccordionContentProps.BaseUI;

    export type HTML = AccordionContentProps.HTML;
  }
}
