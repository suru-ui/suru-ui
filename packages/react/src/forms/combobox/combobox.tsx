import * as React from "react";

import cn from "../../cn.js";
import * as ComboboxParts from "./combobox.parts.jsx";

/**
 * {@link Combobox} コンポーネントのプロパティーです。
 */
export type ComboboxProps<Value = unknown, Multiple extends boolean | undefined = false> = Omit<
  ComboboxParts.Root.Props<Value, Multiple>,
  "children"
> & {
  /**
   * トリガーに対応する表示ラベルです。
   */
  label?: React.ReactNode | undefined;

  /**
   * 入力欄を含むグループ要素に適用するクラス名です。
   * `slotProps.inputGroup.className` と結合されます。
   */
  className?: ComboboxParts.InputGroup.Props["className"] | undefined;

  /**
   * 入力欄のプレースホルダー文字列です。
   * 指定した場合は `slotProps.input.placeholder` より優先されます。
   */
  placeholder?: string | undefined;

  /**
   * 候補項目の内容です。
   *
   * 関数を指定すると、項目の値とインデックスから各項目を作ります。
   * React ノードを指定すると、リストへそのまま表示します。
   */
  children?: React.ReactNode | ((item: Value, index: number) => React.ReactNode) | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        readonly chip?: ComboboxParts.Chip.Props | undefined;
        readonly chipRemove?: ComboboxParts.ChipRemove.Props | undefined;
        readonly chips?: ComboboxParts.Chips.Props | undefined;
        readonly clear?: ComboboxParts.Clear.Props | undefined;
        readonly empty?: ComboboxParts.Empty.Props | undefined;
        readonly icon?: ComboboxParts.Icon.Props | undefined;
        readonly input?: ComboboxParts.Input.Props | undefined;
        readonly inputGroup?: ComboboxParts.InputGroup.Props | undefined;
        readonly item?: ComboboxParts.Item.Props | undefined;
        readonly itemIndicator?: ComboboxParts.ItemIndicator.Props | undefined;
        readonly label?: ComboboxParts.Label.Props | undefined;
        readonly list?: ComboboxParts.List.Props | undefined;
        readonly popup?: ComboboxParts.Popup.Props | undefined;
        readonly portal?: ComboboxParts.Portal.Props | undefined;
        readonly positioner?: ComboboxParts.Positioner.Props | undefined;
        readonly trigger?: ComboboxParts.Trigger.Props | undefined;
        readonly value?: ComboboxParts.Value.Props | undefined;
      }
    | undefined;
};

/**
 * {@link Combobox} のコンポーネント型です。
 */
export interface ComboboxComponent {
  <Value, Multiple extends boolean | undefined = false>(
    props: ComboboxProps<Value, Multiple>,
  ): React.ReactElement | null;

  displayName?: string | undefined;
}

/**
 * 入力欄で候補を絞り込み、定義済みの項目を選択するコンポーネントです。
 *
 * `multiple` を指定すると、選択値をチップとして入力欄内に表示します。
 * Clear と Trigger に挿入するアイコンは `slotProps` で差し替えられます。
 *
 * @example 基本
 * ```tsx
 * <Combobox items={["りんご", "ばなな", "みかん"]} placeholder="果物を選択" />
 * ```
 *
 * @example 複数選択
 * ```tsx
 * <Combobox items={["TypeScript", "Rust", "Go"]} multiple />
 * ```
 *
 * @example オブジェクト項目
 * ```tsx
 * <Combobox
 *   items={[{ value: "jp", label: "日本" }]}
 *   itemToStringLabel={(item) => item.label}
 * >
 *   {(item) => item.label}
 * </Combobox>
 * ```
 */
export const Combobox: ComboboxComponent = function SuiCombobox<
  Value,
  Multiple extends boolean | undefined = false,
>(props: ComboboxProps<Value, Multiple>) {
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
        <ComboboxParts.Item {...itemProps} key={index} value={item}>
          <ComboboxParts.ItemIndicator {...restIndicatorProps}>
            {indicatorChildren}
          </ComboboxParts.ItemIndicator>
          {content}
        </ComboboxParts.Item>
      );
    };

    return (item: Value, index: number): React.ReactNode => {
      if (isItemGroup(item)) {
        return (
          <ComboboxParts.Group key={index} items={item.items}>
            {item.label !== undefined && (
              <ComboboxParts.GroupLabel>{item.label}</ComboboxParts.GroupLabel>
            )}
            <ComboboxParts.Collection>
              {(groupItem, groupIndex) => renderItem(groupItem, groupIndex)}
            </ComboboxParts.Collection>
          </ComboboxParts.Group>
        );
      }

      return renderItem(item, index);
    };
  }, [children, indicatorChildren, itemProps, restIndicatorProps, rootProps.itemToStringLabel]);

  const input = <ComboboxParts.Input placeholder={placeholder} {...inputProps} />;

  return (
    <ComboboxParts.Root
      {...rootProps}
      autoHighlight={autoHighlight}
      multiple={multipleProp}
      openOnInputClick={openOnInputClick}
    >
      {label !== undefined && <ComboboxParts.Label {...labelProps}>{label}</ComboboxParts.Label>}
      <ComboboxParts.InputGroup
        {...inputGroupProps}
        className={cn(inputGroupProps?.className, className)}
      >
        {multiple ? (
          <ComboboxParts.Chips {...chipsProps}>
            <ComboboxParts.Value {...valueProps}>
              {(value) => (
                <>
                  {Array.isArray(value) &&
                    value.map((item, index) => {
                      const itemLabel = getItemLabel(item, rootProps.itemToStringLabel);
                      return (
                        <ComboboxParts.Chip {...restChipProps} key={index}>
                          {chipChildren ?? itemLabel}
                          <ComboboxParts.ChipRemove
                            {...restChipRemoveProps}
                            aria-label={chipRemoveProps?.["aria-label"] ?? `${itemLabel}を削除`}
                          >
                            {chipRemoveChildren}
                          </ComboboxParts.ChipRemove>
                        </ComboboxParts.Chip>
                      );
                    })}
                  {input}
                </>
              )}
            </ComboboxParts.Value>
          </ComboboxParts.Chips>
        ) : (
          input
        )}
        <ComboboxParts.Clear {...restClearProps} aria-label={clearAriaLabel ?? "クリア"}>
          {clearChildren}
        </ComboboxParts.Clear>
        <ComboboxParts.Trigger
          {...restTriggerProps}
          aria-label={triggerAriaLabel ?? "選択肢を選択"}
        >
          <ComboboxParts.Icon {...restIconProps}>{iconChildren}</ComboboxParts.Icon>
        </ComboboxParts.Trigger>
      </ComboboxParts.InputGroup>
      <ComboboxParts.Portal {...portalProps}>
        <ComboboxParts.Positioner
          {...restPositionerProps}
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <ComboboxParts.Popup {...popupProps}>
            <ComboboxParts.Empty {...restEmptyProps}>{emptyChildren}</ComboboxParts.Empty>
            <ComboboxParts.List {...listProps}>{listChildren}</ComboboxParts.List>
          </ComboboxParts.Popup>
        </ComboboxParts.Positioner>
      </ComboboxParts.Portal>
    </ComboboxParts.Root>
  );
};

function isItemGroup<Value>(item: Value): item is Value & {
  label?: React.ReactNode;
  items: readonly Value[];
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
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

function SuiChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function SuiCheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="m3 8 3 3 7-7" />
    </svg>
  );
}
