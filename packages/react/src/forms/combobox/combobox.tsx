import * as React from "react";

import cn from "../../cn.js";
import type { IComponent, IUseContext } from "../../types.js";
import {
  type ComboboxContext,
  type ComboboxRootSize,
  type ComboboxChipProps,
  type ComboboxIconProps,
  type ComboboxItemProps,
  type ComboboxListProps,
  type ComboboxRootColor,
  type ComboboxRootItems,
  type ComboboxRootProps,
  type ComboboxRootState,
  type ComboboxChipsProps,
  type ComboboxClearProps,
  type ComboboxEmptyProps,
  type ComboboxInputProps,
  type ComboboxLabelProps,
  type ComboboxPopupProps,
  type ComboboxRootRadius,
  type ComboboxValueProps,
  type ComboboxPortalProps,
  type ComboboxRootVariant,
  type ComboboxTriggerProps,
  type ComboboxChipRemoveProps,
  type ComboboxInputGroupProps,
  type ComboboxPositionerProps,
  type ComboboxItemIndicatorProps,
  ComboboxChip,
  ComboboxIcon,
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
  ComboboxChips,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxLabel,
  ComboboxPopup,
  ComboboxValue,
  ComboboxPortal,
  ComboboxTrigger,
  ComboboxChipRemove,
  ComboboxCollection,
  ComboboxGroupLabel,
  ComboboxInputGroup,
  ComboboxPositioner,
  useComboboxContext,
  ComboboxItemIndicator,
} from "./combobox.parts.jsx";

/**
 * {@link ComboboxRootColor} です。
 */
export type ComboboxColor = ComboboxRootColor;

/**
 * {@link ComboboxRootRadius} です。
 */
export type ComboboxRadius = ComboboxRootRadius;

/**
 * {@link ComboboxRootSize} です。
 */
export type ComboboxSize = ComboboxRootSize;

/**
 * {@link ComboboxRootVariant} です。
 */
export type ComboboxVariant = ComboboxRootVariant;

/**
 * {@link ComboboxRootItems} です。
 */
export type ComboboxItems<Value = unknown> = ComboboxRootItems<Value>;

/**
 * {@link Combobox} の各パーツに渡すプロパティーです。
 */
export type ComboboxSlotProps = {
  /**
   * {@link ComboboxChip} に渡すプロパティーです。
   */
  readonly chip?: ComboboxChipProps | undefined;

  /**
   * {@link ComboboxChipRemove} に渡すプロパティーです。
   */
  readonly chipRemove?: ComboboxChipRemoveProps | undefined;

  /**
   * {@link ComboboxChips} に渡すプロパティーです。
   */
  readonly chips?: ComboboxChipsProps | undefined;

  /**
   * {@link ComboboxClear} に渡すプロパティーです。
   */
  readonly clear?: ComboboxClearProps | undefined;

  /**
   * {@link ComboboxEmpty} に渡すプロパティーです。
   */
  readonly empty?: ComboboxEmptyProps | undefined;

  /**
   * {@link ComboboxIcon} に渡すプロパティーです。
   */
  readonly icon?: ComboboxIconProps | undefined;

  /**
   * {@link ComboboxInput} に渡すプロパティーです。
   */
  readonly input?: ComboboxInputProps | undefined;

  /**
   * {@link ComboboxInputGroup} に渡すプロパティーです。
   */
  readonly inputGroup?: ComboboxInputGroupProps | undefined;

  /**
   * {@link ComboboxItem} に渡すプロパティーです。
   */
  readonly item?: ComboboxItemProps | undefined;

  /**
   * {@link ComboboxItemIndicator} に渡すプロパティーです。
   */
  readonly itemIndicator?: ComboboxItemIndicatorProps | undefined;

  /**
   * {@link ComboboxLabel} に渡すプロパティーです。
   */
  readonly label?: ComboboxLabelProps | undefined;

  /**
   * {@link ComboboxList} に渡すプロパティーです。
   */
  readonly list?: ComboboxListProps | undefined;

  /**
   * {@link ComboboxPopup} に渡すプロパティーです。
   */
  readonly popup?: ComboboxPopupProps | undefined;

  /**
   * {@link ComboboxPortal} に渡すプロパティーです。
   */
  readonly portal?: ComboboxPortalProps | undefined;

  /**
   * {@link ComboboxPositioner} に渡すプロパティーです。
   */
  readonly positioner?: ComboboxPositionerProps | undefined;

  /**
   * {@link ComboboxTrigger} に渡すプロパティーです。
   */
  readonly trigger?: ComboboxTriggerProps | undefined;

  /**
   * {@link ComboboxValue} に渡すプロパティーです。
   */
  readonly value?: ComboboxValueProps | undefined;
};

/**
 * {@link Combobox} の状態です。
 */
export type ComboboxState = ComboboxRootState;

/**
 * {@link Combobox} コンポーネントのプロパティーです。
 */
export type ComboboxProps<Value = unknown, Multiple extends boolean | undefined = false> = Omit<
  ComboboxRootProps<Value, Multiple>,
  "children"
> & {
  /**
   * 候補項目の内容です。
   *
   * 関数を指定すると、項目の値とインデックスから各項目を作ります。
   * React ノードを指定すると、リストへそのまま表示します。
   */
  children?: React.ReactNode | ((item: Value, index: number) => React.ReactNode) | undefined;

  /**
   * 入力欄を含むグループ要素に適用するクラス名です。
   * `slotProps.inputGroup.className` と結合されます。
   */
  className?: ComboboxInputGroupProps["className"] | undefined;

  /**
   * トリガーに対応する表示ラベルです。
   */
  label?: React.ReactNode | undefined;

  /**
   * 入力欄のプレースホルダー文字列です。
   * 指定した場合は `slotProps.input.placeholder` より優先されます。
   */
  placeholder?: string | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: ComboboxSlotProps | undefined;
};

/**
 * {@link Combobox} のコンポーネント型です。
 */
interface ComboboxType extends IComponent<ComboboxProps<unknown, boolean | undefined>> {
  <Value, Multiple extends boolean | undefined = false>(
    props: ComboboxProps<Value, Multiple>,
  ): React.ReactElement | null;

  /**
   * {@link useComboboxContext} です。
   */
  readonly useContext: IUseContext<ComboboxContext>;
}

/**
 * 入力欄で候補を絞り込み、定義済みの項目を選択するコンポーネントです。
 *
 * `multiple` を指定すると、選択値をチップとして入力欄内に表示します。
 * Clear と Trigger に挿入するアイコンは `slotProps` で差し替えられます。
 */
export const Combobox: ComboboxType = /*#__PURE__*/ Object.assign(
  function SuiCombobox<Value, Multiple extends boolean | undefined = false>(
    props: ComboboxProps<Value, Multiple>,
  ) {
    const {
      label,
      children,
      multiple: multipleProp,
      className,
      slotProps: {
        chip: chipProps,
        icon: iconProps,
        item: itemProps,
        list: listProps,
        chips: chipsProps,
        clear: clearProps,
        empty: emptyProps,
        input: inputProps,
        label: labelProps,
        popup: popupProps,
        value: valueProps,
        portal: portalProps,
        trigger: triggerProps,
        chipRemove: chipRemoveProps,
        inputGroup: inputGroupProps,
        positioner: positionerProps,
        itemIndicator: itemIndicatorProps,
      } = {},
      placeholder,
      autoHighlight = true,
      openOnInputClick = true,
      ...rootProps
    } = props;
    const {
      children: clearChildren = <SuiClearIcon />,
      "aria-label": clearAriaLabel,
      ...restClearProps
    } = clearProps ?? {};
    const { children: iconChildren = <SuiChevronIcon />, ...restIconProps } = iconProps ?? {};
    const { "aria-label": triggerAriaLabel, ...restTriggerProps } = triggerProps ?? {};
    const {
      side = "bottom",
      align = "start",
      sideOffset = 8,
      ...restPositionerProps
    } = positionerProps ?? {};
    const { children: indicatorChildren = <SuiCheckIcon />, ...restIndicatorProps } =
      itemIndicatorProps ?? {};
    const { children: chipChildren, ...restChipProps } = chipProps ?? {};
    const { children: chipRemoveChildren = <SuiClearIcon />, ...restChipRemoveProps } =
      chipRemoveProps ?? {};
    const { children: emptyChildren = "候補がありません", ...restEmptyProps } = emptyProps ?? {};
    const multiple = multipleProp === true;

    const listChildren = React.useMemo(() => {
      if (typeof children !== "function" && children !== undefined) {
        return children;
      }

      const renderItem = (item: Value, index: number): React.ReactNode => {
        const itemLabel = getItemLabel(item, rootProps.itemToStringLabel);
        const content = typeof children === "function" ? children(item, index) : itemLabel;

        return (
          <ComboboxItem {...itemProps} key={index} value={item}>
            <ComboboxItemIndicator {...restIndicatorProps}>
              {indicatorChildren}
            </ComboboxItemIndicator>
            {content}
          </ComboboxItem>
        );
      };

      return (item: Value, index: number): React.ReactNode => {
        if (isItemGroup(item)) {
          return (
            <ComboboxGroup key={index} items={item.items}>
              {item.label !== undefined && <ComboboxGroupLabel>{item.label}</ComboboxGroupLabel>}
              <ComboboxCollection>
                {(groupItem, groupIndex) => renderItem(groupItem, groupIndex)}
              </ComboboxCollection>
            </ComboboxGroup>
          );
        }

        return renderItem(item, index);
      };
    }, [children, indicatorChildren, itemProps, restIndicatorProps, rootProps.itemToStringLabel]);

    const input = <ComboboxInput placeholder={placeholder} {...inputProps} />;

    return (
      <ComboboxRoot
        {...rootProps}
        multiple={multipleProp}
        autoHighlight={autoHighlight}
        openOnInputClick={openOnInputClick}
      >
        {("label" in props || !!labelProps) && <ComboboxLabel children={label} {...labelProps} />}
        <ComboboxInputGroup
          {...inputGroupProps}
          className={cn(className, inputGroupProps?.className)}
        >
          {multiple ? (
            <ComboboxChips {...chipsProps}>
              <ComboboxValue {...valueProps}>
                {(value) => (
                  <>
                    {Array.isArray(value) &&
                      value.map((item, index) => {
                        const itemLabel = getItemLabel(item, rootProps.itemToStringLabel);
                        return (
                          <ComboboxChip {...restChipProps} key={index}>
                            {chipChildren ?? itemLabel}
                            <ComboboxChipRemove
                              {...restChipRemoveProps}
                              aria-label={chipRemoveProps?.["aria-label"] ?? `${itemLabel}を削除`}
                            >
                              {chipRemoveChildren}
                            </ComboboxChipRemove>
                          </ComboboxChip>
                        );
                      })}
                    {input}
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
          ) : (
            input
          )}
          <ComboboxClear {...restClearProps} aria-label={clearAriaLabel ?? "クリア"}>
            {clearChildren}
          </ComboboxClear>
          <ComboboxTrigger {...restTriggerProps} aria-label={triggerAriaLabel ?? "選択肢を選択"}>
            <ComboboxIcon {...restIconProps}>{iconChildren}</ComboboxIcon>
          </ComboboxTrigger>
        </ComboboxInputGroup>
        <ComboboxPortal {...portalProps}>
          <ComboboxPositioner
            {...restPositionerProps}
            side={side}
            align={align}
            sideOffset={sideOffset}
          >
            <ComboboxPopup {...popupProps}>
              <ComboboxEmpty {...restEmptyProps}>{emptyChildren}</ComboboxEmpty>
              <ComboboxList {...listProps}>{listChildren}</ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>
    );
  },
  {
    useContext: useComboboxContext,
  },
);

/**
 * {@link Combobox} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Combobox {
  /**
   * {@link ComboboxState} です。
   */
  export type State = ComboboxState;

  /**
   * {@link ComboboxProps} です。
   *
   * @template Value 候補項目の値を表す型です。
   * @template Multiple 複数選択を有効にするかどうかです。
   */
  export type Props<Value = unknown, Multiple extends boolean | undefined = false> = ComboboxProps<
    Value,
    Multiple
  >;

  /**
   * {@link ComboboxSlotProps} です。
   */
  export type SlotProps = ComboboxSlotProps;

  /**
   * {@link ComboboxContext} です。
   */
  export type Context = ComboboxContext;

  /**
   * {@link ComboboxColor} です。
   */
  export type Color = ComboboxColor;

  /**
   * {@link ComboboxRadius} です。
   */
  export type Radius = ComboboxRadius;

  /**
   * {@link ComboboxSize} です。
   */
  export type Size = ComboboxSize;

  /**
   * {@link ComboboxVariant} です。
   */
  export type Variant = ComboboxVariant;

  /**
   * {@link ComboboxItems} です。
   */
  export type Items<Value = unknown> = ComboboxItems<Value>;
}

function isItemGroup<Value>(item: Value): item is Value & {
  items: readonly Value[];
  label?: React.ReactNode;
} {
  return typeof item === "object" && item !== null && "items" in item && Array.isArray(item.items);
}

function getItemLabel<Value>(
  item: Value,
  itemToStringLabel: ((item: Value) => string) | undefined,
): string {
  if (itemToStringLabel) {
    return itemToStringLabel(item);
  }

  if (typeof item === "object" && item !== null) {
    if ("label" in item && (typeof item.label === "string" || typeof item.label === "number")) {
      return String(item.label);
    }
    if ("value" in item && (typeof item.value === "string" || typeof item.value === "number")) {
      return String(item.value);
    }

    return "";
  }

  if (typeof item === "string") {
    return item;
  }
  if (typeof item === "number" || typeof item === "bigint" || typeof item === "boolean") {
    return item.toString();
  }

  return "";
}

function SuiClearIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 16 16" strokeLinecap="round" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

function SuiChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 16 16" strokeLinecap="round" {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function SuiCheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 16 16" strokeLinecap="round" {...props}>
      <path d="m3 8 3 3 7-7" />
    </svg>
  );
}
