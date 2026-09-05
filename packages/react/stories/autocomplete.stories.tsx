import * as theme from "@suru-ui/theme";
import { type ReactVirtualizer, useVirtualizer } from "@tanstack/react-virtual";
import { SearchIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import * as Autocomplete_ from "../src/autocomplete/autocomplete.parts.jsx";
import { Autocomplete } from "../src/autocomplete/index.js";

const COLORS: readonly Autocomplete.Color[] = theme.COLORS;
const SIZES: readonly Autocomplete.Size[] = theme.SIZES;
const RADII: readonly Autocomplete.Radius[] = ["none", ...SIZES, "full"];
const VARIANTS: readonly Autocomplete.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Autocomplete",
  component: Autocomplete,
});

export default meta;

const ctrl = controls(Autocomplete, {
  color: {
    control: "select",
    options: COLORS,
  },
  disabled: {
    control: "boolean",
  },
  empty: {
    control: "text",
  },
  items: {
    control: "object",
  },
  outlined: {
    control: "boolean",
  },
  placeholder: {
    control: "text",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  size: {
    control: "select",
    options: SIZES,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"],
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "フルーツを検索",
  }),
  render(props) {
    const id = React.useId();

    return (
      <div className="flex flex-col items-start gap-2">
        <label htmlFor={id}>フルーツ</label>
        <Autocomplete
          {...props}
          slotProps={{
            input: {
              id,
            },
            inputGroup: {
              className: "w-[200px]",
            },
          }}
        />
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    items: ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"],
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Autocomplete
              {...props}
              variant={variant}
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
    disabled: false,
    placeholder: "検索",
    empty: "該当なし",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Autocomplete
              {...props}
              variant={variant}
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: true,
    disabled: false,
    placeholder: "検索",
    empty: "該当なし",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <Autocomplete
            key={color}
            {...props}
            color={color}
            slotProps={{
              inputGroup: {
                className: "w-[200px]",
              },
            }}
          />
        ))}
      </div>
    );
  },
});

export const Addons = meta.story({
  name: "付属要素",
  ...ctrl({
    items: ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"],
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Autocomplete
          {...props}
          endAddons={["について"]}
          slotProps={{
            inputGroup: {
              className: "w-[240px]",
            },
          }}
          startAddons={[<SearchIcon key={0} />]}
        />
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "検索",
    empty: "該当なし",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Autocomplete
              {...props}
              size={size}
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    outlined: false,
    disabled: false,
    placeholder: "検索",
    empty: "該当なし",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2">
            <span>{radius}</span>
            <Autocomplete
              {...props}
              radius={radius}
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Filled = meta.story({
  name: "入力済み",
  ...ctrl({
    items: ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"],
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Autocomplete
          {...props}
          slotProps={{
            inputGroup: {
              className: "w-[200px]",
            },
          }}
          defaultValue="りんご"
        />
      </div>
    );
  },
});

export const Objects = meta.story({
  name: "オブジェクトの項目",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
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

    return <Autocomplete {...props} items={prefectures} />;
  },
});

export const Grouped = meta.story({
  name: "グループ化",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <Autocomplete
        {...props}
        items={[
          {
            label: "果物",
            items: ["りんご", "バナナ", "みかん"],
          },
          {
            label: "野菜",
            items: ["にんじん", "きゅうり", "トマト"],
          },
        ]}
        slotProps={{
          inputGroup: {
            className: "w-[200px]",
          },
        }}
      />
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Autocomplete
              {...props}
              variant={variant}
              disabled
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
              defaultValue="値"
            />
            <Autocomplete
              {...props}
              variant={variant}
              disabled
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
              placeholder="プレースホルダー"
            />
          </div>
        ))}
      </div>
    );
  },
});

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
                position: "absolute",
                top: 0,
                left: 0,
                width: "calc(100% - 4px * 2)",
                height: virtualItem.size,
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

export const Virtualized = meta.story({
  name: "仮想化",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
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
