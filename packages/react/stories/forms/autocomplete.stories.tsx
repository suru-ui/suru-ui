import { SIZES, COLORS } from "@suru-ui/theme";
import { type ReactVirtualizer, useVirtualizer } from "@tanstack/react-virtual";
import { SearchIcon } from "lucide-react";
import { matchSorter, rankings } from "match-sorter";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteRoot,
  type AutocompleteProps,
  useAutocompleteFilter,
  useFilteredItems,
} from "../../src/forms/autocomplete/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

const meta = preview.meta({
  title: "Forms / Autocomplete",
  component: Autocomplete,
});

export default meta;

const ctrl = controls(Autocomplete, {
  color: {
    options: COLORS,
    control: "select",
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
    options: RADII,
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  variant: {
    options: VARIANTS,
    control: "select",
  },
});

const manyItems = Array.from({ length: 50 }, (_, index) => `候補 ${index + 1}`);

const RESULT_LIMIT = 8;
const VIRTUALIZED_ROW_HEIGHT = 32;
const VIRTUALIZED_MAX_VIEWPORT_HEIGHT = VIRTUALIZED_ROW_HEIGHT * 9;

type Movie = {
  readonly title: string;
  readonly year: number;
};

const movies: readonly Movie[] = [
  { title: "千と千尋の神隠し", year: 2001 },
  { title: "となりのトトロ", year: 1988 },
  { title: "もののけ姫", year: 1997 },
  { title: "天空の城ラピュタ", year: 1986 },
  { title: "風の谷のナウシカ", year: 1984 },
  { title: "魔女の宅急便", year: 1989 },
  { title: "紅の豚", year: 1992 },
  { title: "耳をすませば", year: 1995 },
  { title: "ハウルの動く城", year: 2004 },
  { title: "崖の上のポニョ", year: 2008 },
  { title: "借りぐらしのアリエッティ", year: 2010 },
  { title: "風立ちぬ", year: 2013 },
  { title: "君たちはどう生きるか", year: 2023 },
  { title: "すずめの戸締まり", year: 2022 },
  { title: "君の名は。", year: 2016 },
];

function searchMovies(query: string): Promise<readonly Movie[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        movies.filter((movie) => movie.title.includes(query) || String(movie.year).includes(query)),
      );
    }, 500);
  });
}

type DocItem = {
  readonly title: string;
  readonly description: string;
};

const docItems: readonly DocItem[] = [
  { title: "React Hooks", description: "useState や useEffect の使い方" },
  { title: "React Rendering", description: "再レンダリングの仕組みと最適化" },
  {
    title: "React Server Components",
    description: "サーバーで動作するコンポーネント",
  },
  {
    title: "TypeScript Generics",
    description: "ジェネリクスで再利用可能な型を作る",
  },
  {
    title: "TypeScript Utility Types",
    description: "Partial や Pick などのユーティリティー型",
  },
  { title: "CSS Flexbox", description: "flex コンテナーとアイテムのレイアウト" },
  { title: "CSS Grid", description: "2 次元グリッドレイアウト" },
  {
    title: "Accessibility Basics",
    description: "WAI-ARIA とキーボード操作",
  },
];

function fuzzyFilter(item: DocItem, query: string): boolean {
  if (query.trim() === "") {
    return true;
  }

  const results = matchSorter([item], query, {
    keys: [
      "title",
      "description",
      { key: "title", threshold: rankings.CONTAINS },
      { key: "description", threshold: rankings.WORD_STARTS_WITH },
    ],
  });

  return results.length > 0;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (query.trim() === "") {
    return text;
  }

  const lowerCasedQuery = Array.from(query.toLowerCase());
  let queryIndex = 0;

  return Array.from(text).map((character, index) => {
    if (
      queryIndex < lowerCasedQuery.length &&
      character.toLowerCase() === lowerCasedQuery[queryIndex]
    ) {
      queryIndex += 1;
      return (
        <mark key={index} className="bg-transparent font-bold">
          {character}
        </mark>
      );
    }
    return character;
  });
}

type VirtualizedItem = {
  readonly id: string;
  readonly name: string;
};

const virtualizedItems: readonly VirtualizedItem[] = Array.from({ length: 10000 }, (_, index) => ({
  id: String(index + 1),
  name: `項目 ${String(index + 1).padStart(4, "0")}`,
}));

type VirtualizerInstance = ReactVirtualizer<HTMLDivElement, HTMLDivElement>;

function VirtualizedList({
  virtualizerRef,
}: {
  virtualizerRef: React.RefObject<VirtualizerInstance | null>;
}) {
  const filteredItems = useFilteredItems<VirtualizedItem>();
  const scrollElementRef = React.useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => VIRTUALIZED_ROW_HEIGHT,
    overscan: 20,
    paddingStart: 4,
    paddingEnd: 4,
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
      role="presentation"
      ref={handleScrollElementRef}
      className="overflow-auto overscroll-contain"
      style={{ height: Math.min(VIRTUALIZED_MAX_VIEWPORT_HEIGHT, totalSize) }}
    >
      <div role="presentation" className="relative w-full" style={{ height: totalSize }}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = filteredItems[virtualItem.index];
          if (!item) {
            return null;
          }
          return (
            <AutocompleteItem
              key={virtualItem.key}
              index={virtualItem.index}
              value={item}
              aria-setsize={filteredItems.length}
              aria-posinset={virtualItem.index + 1}
              className="absolute inset-x-0"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: virtualItem.size,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {item.name}
            </AutocompleteItem>
          );
        })}
      </div>
    </div>
  );
}

function VirtualizedAutocomplete(props: Omit<AutocompleteProps, "children">) {
  const virtualizerRef = React.useRef<VirtualizerInstance | null>(null);

  return (
    <AutocompleteRoot
      {...props}
      virtualized
      openOnInputClick
      items={virtualizedItems}
      itemToStringValue={(item: VirtualizedItem) => item.name}
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
      <AutocompleteInputGroup className="w-[240px]">
        <AutocompleteInput placeholder="項目を検索" />
      </AutocompleteInputGroup>
      <AutocompletePortal>
        <AutocompletePositioner align="start" sideOffset={8}>
          <AutocompletePopup>
            <AutocompleteEmpty>該当なし</AutocompleteEmpty>
            <AutocompleteList className="gap-0">
              <VirtualizedList virtualizerRef={virtualizerRef} />
            </AutocompleteList>
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </AutocompleteRoot>
  );
}

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
    return (
      <div className="flex flex-col items-start gap-2">
        <label>フルーツ</label>
        <Autocomplete
          {...props}
          slotProps={{
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

export const ManyItems = meta.story({
  name: "項目が多い場合",
  ...ctrl({
    items: manyItems,
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "候補を検索",
  }),
  render(props) {
    return (
      <Autocomplete
        {...props}
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

export const AsyncSearch = meta.story({
  name: "非同期検索",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "タイトルまたは公開年を検索",
    empty: "該当する映画がありません",
  }),
  render(props) {
    const [searchValue, setSearchValue] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<readonly Movie[]>([]);
    const [isPending, startTransition] = React.useTransition();
    const abortControllerRef = React.useRef<AbortController | null>(null);

    const handleSearchValueChange = (value: string) => {
      setSearchValue(value);

      const controller = new AbortController();
      abortControllerRef.current?.abort();
      abortControllerRef.current = controller;

      startTransition(async () => {
        if (value === "") {
          setSearchResults([]);
          return;
        }

        const results = await searchMovies(value);
        if (!controller.signal.aborted) {
          setSearchResults(results);
        }
      });
    };

    let status: React.ReactNode = null;
    if (isPending) {
      status = "検索中…";
    } else if (searchValue !== "") {
      status = `${searchResults.length} 件見つかりました`;
    }

    return (
      <div className="flex flex-col items-start gap-2">
        <label>映画</label>
        <Autocomplete
          {...props}
          items={searchResults}
          filter={null}
          value={searchValue}
          onValueChange={handleSearchValueChange}
          itemToStringValue={(item: Movie) => item.title}
          itemToRenderedValue={(item: Movie) => (
            <span className="flex flex-col">
              <span>{item.title}</span>
              <span className="text-xs opacity-60">{item.year}</span>
            </span>
          )}
          slotProps={{
            inputGroup: {
              className: "w-[240px]",
            },
          }}
        />
        <p aria-live="polite">{status}</p>
      </div>
    );
  },
});

export const InlineAutocomplete = meta.story({
  name: "インライン補完",
  ...ctrl({
    items: ["feature", "fix", "bug", "docs", "internal", "mobile"],
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "入力すると補完されます",
  }),
  render(props) {
    return (
      <div className="flex flex-col items-start gap-2">
        <label>タグ</label>
        <Autocomplete
          {...props}
          mode="both"
          slotProps={{
            inputGroup: {
              className: "w-[240px]",
            },
          }}
        />
      </div>
    );
  },
});

export const FuzzyMatching = meta.story({
  name: "曖昧検索",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "例: rhk",
    empty: "該当なし",
  }),
  render(props) {
    const [value, setValue] = React.useState("");

    return (
      <div className="flex flex-col items-start gap-2">
        <label>ドキュメント</label>
        <Autocomplete
          {...props}
          items={docItems}
          filter={fuzzyFilter}
          value={value}
          onValueChange={setValue}
          itemToStringValue={(item: DocItem) => item.title}
          itemToRenderedValue={(item: DocItem) => (
            <span className="flex flex-col">
              <span>{highlightMatch(item.title, value)}</span>
              <span className="text-xs opacity-60">{highlightMatch(item.description, value)}</span>
            </span>
          )}
          slotProps={{
            inputGroup: {
              className: "w-[240px]",
            },
          }}
        />
      </div>
    );
  },
});

export const LimitResults = meta.story({
  name: "表示件数の制限",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "候補を検索",
    empty: "該当なし",
  }),
  render(props) {
    const [value, setValue] = React.useState("");
    const { contains } = useAutocompleteFilter();

    const matchedItems = React.useMemo(() => {
      const query = value.trim();
      if (query === "") {
        return manyItems;
      }
      return manyItems.filter((item) => contains(item, query));
    }, [value, contains]);

    const visibleItems = matchedItems.slice(0, RESULT_LIMIT);
    const hiddenCount = matchedItems.length - visibleItems.length;

    return (
      <div className="flex flex-col items-start gap-2">
        <label>候補</label>
        <Autocomplete
          {...props}
          items={manyItems}
          filteredItems={visibleItems}
          value={value}
          onValueChange={setValue}
          slotProps={{
            inputGroup: {
              className: "w-[240px]",
            },
          }}
        />
        {hiddenCount > 0 && <p>ほか {hiddenCount} 件を非表示中。キーワードで絞り込めます。</p>}
      </div>
    );
  },
});

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
    return (
      <div className="flex flex-col items-start gap-2">
        <label>項目</label>
        <VirtualizedAutocomplete {...props} />
      </div>
    );
  },
});
