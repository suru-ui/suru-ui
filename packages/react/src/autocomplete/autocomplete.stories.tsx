import * as theme from "@suru-ui/theme";
import { type ReactVirtualizer, useVirtualizer } from "@tanstack/react-virtual";
import { SearchIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Field } from "../index.js";
import * as Autocomplete_ from "./autocomplete.parts.js";
import { Autocomplete } from "./index.js";

const COLORS: readonly Autocomplete.Color[] = theme.COLORS;
const SIZES: readonly Autocomplete.Size[] = theme.SIZES;
const RADII: readonly Autocomplete.Radius[] = ["none", ...SIZES, "full"];
const VARIANTS: readonly Autocomplete.Variant[] = ["naked", "liquid"];

const fruits = ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"];

const VIRTUALIZED_ROW_HEIGHT = 32;
const VIRTUALIZED_MAX_VIEWPORT_HEIGHT = VIRTUALIZED_ROW_HEIGHT * 9;

type VirtualizedItem = {
  readonly id: string;
  readonly name: string;
};

const virtualizedItems: readonly VirtualizedItem[] = Array.from({ length: 10000 }, (_, index) => ({
  id: String(index + 1),
  name: `項目 ${String(index + 1).padStart(4, "0")}`,
}));

type VirtualizerInstance = ReactVirtualizer<HTMLDivElement, HTMLDivElement>;

function VirtualizedList(props: { virtualizerRef: React.RefObject<VirtualizerInstance | null> }) {
  const Autocomplete = Autocomplete_;

  const { virtualizerRef } = props;
  const filteredItems = Autocomplete.useFilteredItems<VirtualizedItem>();
  const scrollElementRef = React.useRef<HTMLDivElement | null>(null);

  // oxlint-disable-next-line react/incompatible-library -- サードパーティーフックのため
  const virtualizer = useVirtualizer<HTMLDivElement, HTMLDivElement>({
    count: filteredItems.length,
    overscan: 20,
    paddingEnd: 4,
    estimateSize: () => VIRTUALIZED_ROW_HEIGHT,
    paddingStart: 4,
    getScrollElement: () => scrollElementRef.current,
    scrollPaddingEnd: 4,
    scrollPaddingStart: 4,
  });

  React.useImperativeHandle(virtualizerRef, () => virtualizer);

  const handleScrollElementRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      scrollElementRef.current = element;
      if (element) {
        virtualizer.measure();
      }
    },
    [virtualizer],
  );

  if (filteredItems.length === 0) {
    return null;
  }

  const totalSize = virtualizer.getTotalSize();

  return (
    <div
      ref={handleScrollElementRef}
      role="presentation"
      style={{
        height: Math.min(VIRTUALIZED_MAX_VIEWPORT_HEIGHT, totalSize),
      }}
      className="overflow-auto overscroll-contain"
    >
      <div
        role="presentation"
        style={{
          height: totalSize,
        }}
        className="relative w-full"
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = filteredItems[virtualItem.index];
          if (!item) {
            return null;
          }

          return (
            <Autocomplete.Item
              key={virtualItem.key}
              ref={virtualizer.measureElement}
              index={virtualItem.index}
              style={{
                top: 0,
                left: 0,
                width: "calc(100% - 4px * 2)",
                height: virtualItem.size,
                position: "absolute",
                transform: `translateY(${virtualItem.start}px)`,
                marginBlock: "2px",
                marginInline: "4px",
              }}
              value={item}
              aria-setsize={filteredItems.length}
              aria-posinset={virtualItem.index + 1}
              data-index={virtualItem.index}
            >
              {item.name}
            </Autocomplete.Item>
          );
        })}
      </div>
    </div>
  );
}

const meta = preview.meta({
  title: "Autocomplete",
  component: Autocomplete,
});

export default meta;

const ctrl = controls(Autocomplete, {
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  empty: {
    control: "text",
  },
  items: {
    control: "object",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  backdrop: {
    control: "boolean",
  },
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  readOnly: {
    control: "boolean",
  },
  separator: {
    control: "boolean",
  },
  placeholder: {
    control: "text",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    color: "grey",
    items: fruits,
    radius: undefined,
    variant: "liquid",
    backdrop: false,
    disabled: false,
    outlined: false,
    readOnly: false,
    placeholder: "フルーツを検索",
  }),
  render(props) {
    return <Autocomplete {...props} className="w-[200px]" />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    size: "md",
    color: "grey",
    items: fruits,
    radius: undefined,
    backdrop: false,
    disabled: false,
    outlined: false,
    readOnly: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-3">
            <span>{variant}</span>
            <Autocomplete {...props} variant={variant} className="w-[200px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "配色",
  ...ctrl({
    size: "md",
    empty: "該当なし",
    items: fruits,
    radius: undefined,
    variant: "liquid",
    backdrop: false,
    disabled: false,
    outlined: true,
    readOnly: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col gap-3">
            <span>{color}</span>
            <Autocomplete
              {...props}
              color={color}
              items={fruits}
              className="w-[200px]"
              defaultValue={fruits[0]}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    color: "grey",
    empty: "該当なし",
    items: fruits,
    radius: undefined,
    variant: "liquid",
    backdrop: false,
    disabled: false,
    outlined: false,
    readOnly: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-3">
            <span>{size}</span>
            <Autocomplete {...props} size={size} className="w-[200px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    size: "md",
    color: "grey",
    empty: "該当なし",
    items: fruits,
    variant: "liquid",
    backdrop: false,
    disabled: false,
    outlined: false,
    readOnly: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-3">
            <span>{radius}</span>
            <Autocomplete {...props} radius={radius} outlined className="w-[200px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const WithOutline = meta.story({
  name: "枠線付き",
  ...ctrl({
    size: "md",
    color: "grey",
    empty: "該当なし",
    items: fruits,
    radius: undefined,
    backdrop: false,
    disabled: false,
    readOnly: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-3">
            <span>{variant}</span>
            <Autocomplete {...props} variant={variant} outlined className="w-[200px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    size: "md",
    color: "grey",
    items: fruits,
    radius: undefined,
    outlined: false,
    readOnly: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-3">
            <div>{variant}</div>
            <div className="flex flex-col gap-3">
              <span>未選択</span>
              <Autocomplete
                {...props}
                items={fruits}
                variant={variant}
                disabled
                className="w-[300px]"
                placeholder="プレースホルダー"
              />

              <span>選択済み</span>
              <Autocomplete
                {...props}
                items={fruits}
                variant={variant}
                disabled
                className="w-[300px]"
                defaultValue={props.items?.[0]}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
});

export const ReadOnly = meta.story({
  name: "読み取り専用",
  ...ctrl({
    size: "md",
    color: "grey",
    items: fruits,
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-3">
            <div>{variant}</div>
            <div className="flex flex-col gap-3">
              <span>未選択</span>
              <Autocomplete
                {...props}
                items={fruits}
                variant={variant}
                readOnly
                className="w-[300px]"
                placeholder="プレースホルダー"
              />

              <span>選択済み</span>
              <Autocomplete
                {...props}
                items={fruits}
                variant={variant}
                readOnly
                className="w-[300px]"
                defaultValue={props.items?.[0]}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
});

export const Addons = meta.story({
  name: "付属要素",
  ...ctrl({
    size: "md",
    color: "grey",
    items: fruits,
    radius: undefined,
    variant: "liquid",
    backdrop: false,
    disabled: false,
    outlined: false,
    readOnly: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        <Autocomplete
          {...props}
          className="w-[240px]"
          endAddons={["について"]}
          startAddons={[<SearchIcon key={0} />]}
        />
      </div>
    );
  },
});

export const Filled = meta.story({
  name: "入力済み",
  ...ctrl({
    size: "md",
    color: "grey",
    items: fruits,
    radius: undefined,
    variant: "liquid",
    backdrop: false,
    disabled: false,
    outlined: false,
    readOnly: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        <Autocomplete {...props} className="w-[200px]" defaultValue="りんご" />
      </div>
    );
  },
});

export const Labeled = meta.story({
  name: "ラベル付き",
  ...ctrl({
    size: "md",
    color: "grey",
    items: fruits,
    radius: undefined,
    variant: "liquid",
    backdrop: false,
    disabled: false,
    outlined: false,
    readOnly: false,
    placeholder: "フルーツを検索",
  }),
  render(props) {
    const { disabled, ...otherProps } = props;

    return (
      <Field label="フルーツ" disabled={disabled}>
        <Autocomplete {...otherProps} className="w-[200px]" />
      </Field>
    );
  },
});

export const Grouped = meta.story({
  name: "グループ化",
  ...ctrl({
    size: "md",
    color: "grey",
    items: [
      {
        items: ["りんご", "バナナ", "みかん"],
        label: "果物",
      },
      {
        items: ["にんじん", "きゅうり", "トマト"],
        label: "野菜",
      },
    ],
    radius: undefined,
    variant: "liquid",
    backdrop: false,
    disabled: false,
    outlined: false,
    readOnly: false,
    separator: false,
    placeholder: "食材を選択",
  }),
  render(props) {
    return <Autocomplete {...props} className="w-[200px]" onValueChange={console.log} />;
  },
});

export const Objects = meta.story({
  name: "オブジェクトの項目",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    backdrop: false,
    disabled: false,
    outlined: false,
    readOnly: false,
    placeholder: "都道府県を検索",
  }),
  render(props) {
    type Prefecture = {
      readonly label: string;
      readonly value: string;
    };

    const prefectures: readonly Prefecture[] = [
      { label: "東京都", value: "13" },
      { label: "大阪府", value: "27" },
      { label: "京都府", value: "26" },
      { label: "福岡県", value: "40" },
    ];

    return <Autocomplete {...props} items={prefectures} className="w-[200px]" />;
  },
});

export const Virtualized = meta.story({
  name: "仮想化",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    const Autocomplete = Autocomplete_;

    const id = React.useId();
    const virtualizerRef = React.useRef<VirtualizerInstance | null>(null);

    return (
      <div className="flex flex-col items-start gap-2">
        <label htmlFor={id}>項目</label>
        <Autocomplete.Root<VirtualizedItem>
          {...props}
          items={virtualizedItems}
          virtualized
          openOnInputClick
          itemToStringValue={(item) => item.name}
          onItemHighlighted={(item, eventDetails) => {
            const virtualizer = virtualizerRef.current;
            if (item === undefined || !virtualizer) {
              return;
            }

            const isStart = eventDetails.index === 0;
            const isEnd = eventDetails.index === virtualizer.options.count - 1;
            const shouldScroll =
              eventDetails.reason === "none" ||
              (eventDetails.reason === "keyboard" && (isStart || isEnd));

            if (shouldScroll) {
              queueMicrotask(() => {
                virtualizer.scrollToIndex(eventDetails.index, {
                  align: isEnd ? "start" : "end",
                });
              });
            }
          }}
        >
          <Autocomplete.InputGroup>
            <Autocomplete.Input id={id} placeholder="項目を検索" />
          </Autocomplete.InputGroup>
          <Autocomplete.Portal>
            <Autocomplete.Positioner align="start" sideOffset={8}>
              <Autocomplete.Popup>
                <Autocomplete.Empty>該当なし</Autocomplete.Empty>
                <Autocomplete.List className="gap-0">
                  <VirtualizedList virtualizerRef={virtualizerRef} />
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      </div>
    );
  },
});
