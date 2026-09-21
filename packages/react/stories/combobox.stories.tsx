import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Combobox } from "../src/combobox/index.js";

const COLORS: readonly Combobox.Color[] = theme.COLORS;
const SIZES: readonly Combobox.Size[] = theme.SIZES;
const RADII: readonly Combobox.Radius[] = ["none", ...SIZES, "full"];
const VARIANTS: readonly Combobox.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Combobox",
  component: Combobox<Combobox.ItemValue | Combobox.ItemGroup, boolean>,
});

export default meta;

const ctrl = controls(Combobox<Combobox.ItemValue | Combobox.ItemGroup, boolean>, {
  arrow: {
    control: "boolean",
  },
  backdrop: {
    control: "boolean",
  },
  color: {
    control: "select",
    options: COLORS,
  },
  disabled: {
    control: "boolean",
  },
  items: {
    control: "object",
  },
  inputInPopup: {
    control: "boolean",
  },
  keepFilterOnSelect: {
    control: "boolean",
  },
  label: {
    control: "text",
  },
  multiple: {
    control: "boolean",
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

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

type DirectoryUser = {
  readonly email: string;
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly username: string;
};

const directoryUsers: readonly DirectoryUser[] = [
  {
    id: "yamada-taro",
    name: "山田 太郎",
    username: "yamada",
    email: "yamada.taro@example.com",
    title: "プロダクトマネージャー",
  },
  {
    id: "suzuki-hanako",
    name: "鈴木 花子",
    username: "suzuki",
    email: "suzuki.hanako@example.com",
    title: "マーケティングリード",
  },
  {
    id: "sato-ichiro",
    name: "佐藤 一郎",
    username: "sato",
    email: "sato.ichiro@example.com",
    title: "デザイナー",
  },
  {
    id: "takahashi-jiro",
    name: "高橋 二郎",
    username: "takahashi",
    email: "takahashi.jiro@example.com",
    title: "エンジニアリングマネージャー",
  },
  {
    id: "tanaka-saburo",
    name: "田中 三郎",
    username: "tanaka",
    email: "tanaka.saburo@example.com",
    title: "プロダクトデザイナー",
  },
  {
    id: "watanabe-shiro",
    name: "渡辺 四郎",
    username: "watanabe",
    email: "watanabe.shiro@example.com",
    title: "フロントエンドエンジニア",
  },
  {
    id: "yamamoto-goro",
    name: "山本 五郎",
    username: "yamamoto",
    email: "yamamoto.goro@example.com",
    title: "カスタマーサクセス",
  },
  {
    id: "nakamura-rokuro",
    name: "中村 六郎",
    username: "nakamura",
    email: "nakamura.rokuro@example.com",
    title: "セキュリティエンジニア",
  },
  {
    id: "kobayashi-nanako",
    name: "小林 奈々子",
    username: "kobayashi",
    email: "kobayashi.nanako@example.com",
    title: "データアナリスト",
  },
  {
    id: "ito-hachiro",
    name: "伊藤 八郎",
    username: "ito",
    email: "ito.hachiro@example.com",
    title: "QAスペシャリスト",
  },
  {
    id: "kato-kyoko",
    name: "加藤 京子",
    username: "kato",
    email: "kato.kyoko@example.com",
    title: "オペレーション",
  },
  {
    id: "yoshida-juro",
    name: "吉田 十郎",
    username: "yoshida",
    email: "yoshida.juro@example.com",
    title: "DevOpsエンジニア",
  },
];

async function searchDirectoryUsers(
  query: string,
  filter: Combobox.IFilter,
): Promise<{ error: string | null; users: DirectoryUser[] }> {
  // ネットワークの遅延を模擬します。
  await new Promise((resolve) => {
    setTimeout(resolve, 1_000);
  });

  // ネットワークエラーを模擬します (10% の確率、`will_error` と入力しても再現できます)。
  if (Math.random() < 0.1 || query === "will_error") {
    return {
      users: [],
      error: "担当者の取得に失敗しました。もう一度お試しください。",
    };
  }

  const users = directoryUsers.filter((user) => {
    return (
      filter.contains(user.name, query) ||
      filter.contains(user.username, query) ||
      filter.contains(user.email, query) ||
      filter.contains(user.title, query)
    );
  });

  return {
    users: [...users],
    error: null,
  };
}

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    multiple: false,
    arrow: false,
    backdrop: false,
    keepFilterOnSelect: false,
    disabled: false,
    label: "果物",
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return <Combobox {...props} className="w-[200px]" />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    multiple: false,
    arrow: false,
    backdrop: false,
    keepFilterOnSelect: false,
    disabled: false,
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant}>
            <Combobox {...props} label={variant} variant={variant} className="w-[200px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "配色",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    multiple: true,
    arrow: false,
    backdrop: false,
    keepFilterOnSelect: false,
    disabled: false,
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <div key={color}>
            <Combobox
              {...props}
              color={color}
              items={fruits}
              label={color}
              className="w-[200px]"
              defaultValue={props.multiple ? [fruits[0]] : fruits[0]}
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
    variant: "liquid",
    color: "grey",
    radius: undefined,
    outlined: false,
    multiple: false,
    arrow: false,
    backdrop: false,
    keepFilterOnSelect: false,
    disabled: false,
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size}>
            <Combobox {...props} size={size} items={fruits} label={size} className="w-[200px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    multiple: false,
    arrow: false,
    backdrop: false,
    keepFilterOnSelect: false,
    disabled: false,
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius}>
            <Combobox {...props} label={radius} radius={radius} outlined className="w-[200px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const WithOutline = meta.story({
  name: "枠線付き",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    multiple: false,
    arrow: false,
    backdrop: false,
    keepFilterOnSelect: false,
    disabled: false,
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant}>
            <Combobox {...props} label={variant} variant={variant} outlined className="w-[200px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const Multiple = meta.story({
  name: "複数選択",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    multiple: true,
    arrow: false,
    backdrop: false,
    keepFilterOnSelect: false,
    disabled: false,
    label: "言語",
    placeholder: "言語を追加",
    items: ["TypeScript", "Rust", "Go", "Python"],
  }),
  render(props) {
    return <Combobox {...props} multiple className="w-[300px]" defaultValue={["TypeScript"]} />;
  },
});

export const WithArrow = meta.story({
  name: "矢印付き",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    multiple: true,
    backdrop: false,
    keepFilterOnSelect: false,
    disabled: false,
    label: "果物",
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return <Combobox {...props} arrow className="w-[200px]" />;
  },
});

export const WithBackdrop = meta.story({
  name: "背景付き",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    multiple: true,
    keepFilterOnSelect: false,
    disabled: false,
    arrow: false,
    label: "果物",
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return <Combobox {...props} backdrop className="w-[200px]" />;
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    items: fruits,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-3">
            <div>{variant}</div>
            <div>
              <Combobox
                {...props}
                items={fruits}
                label="未選択"
                variant={variant}
                disabled
                className="w-[300px]"
                placeholder="選択"
              />
              <Combobox
                {...props}
                items={fruits}
                label="選択済み"
                variant={variant}
                disabled
                className="w-[300px]"
                defaultValue={props.items?.[0]}
              />
              <Combobox
                {...props}
                items={fruits}
                label="複数選択"
                variant={variant}
                disabled
                multiple
                className="w-[300px]"
                defaultValue={props.items?.slice(0, 2)}
              />
            </div>
          </div>
        ))}
      </div>
    );
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
    multiple: false,
    arrow: false,
    backdrop: false,
    keepFilterOnSelect: false,
    disabled: false,
    label: "食材",
    placeholder: "食材を選択",
    items: [
      { label: "果物", items: ["りんご", "ばなな", "みかん"] },
      { label: "野菜", items: ["にんじん", "きゅうり", "トマト"] },
    ],
  }),
  render(props) {
    return <Combobox {...props} className="w-[200px]" onValueChange={console.log} />;
  },
});

export const AsyncSearchSingle = meta.story({
  name: "非同期検索（単一）",
  render() {
    const [searchResults, setSearchResults] = React.useState<DirectoryUser[]>([]);
    const [selectedValue, setSelectedValue] = React.useState<DirectoryUser | null>(null);
    const [searchValue, setSearchValue] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [isPending, startTransition] = React.useTransition();

    const filter = Combobox.useFilter();

    const abortControllerRef = React.useRef<AbortController | null>(null);

    const trimmedSearchValue = searchValue.trim();

    const items = React.useMemo(() => {
      if (!selectedValue || searchResults.some((user) => user.id === selectedValue.id)) {
        return searchResults;
      }

      return [...searchResults, selectedValue];
    }, [searchResults, selectedValue]);

    function getStatus() {
      if (isPending) {
        return "検索中…";
      }

      if (error) {
        return error;
      }

      if (trimmedSearchValue === "") {
        return selectedValue ? null : "入力して担当者を検索…";
      }

      if (searchResults.length === 0) {
        return `「${trimmedSearchValue}」に一致する候補がありません。`;
      }

      return null;
    }

    function getEmptyMessage() {
      if (trimmedSearchValue === "" || isPending || searchResults.length > 0 || error) {
        return null;
      }

      return "別のキーワードで試してください。";
    }

    const status = getStatus();
    const emptyMessage = getEmptyMessage();

    return (
      <Combobox<DirectoryUser>
        empty={emptyMessage}
        items={items}
        label="担当者"
        filter={null}
        status={status}
        className="w-[300px]"
        placeholder="例：山田"
        onValueChange={(nextSelectedValue) => {
          setSelectedValue(nextSelectedValue);
          setSearchValue("");
          setError(null);
        }}
        itemLabelRenderer={(user: DirectoryUser) => (
          <span className="flex min-w-0 flex-col text-left">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs opacity-70">
              {user.email} ・ @{user.username} ・ {user.title}
            </span>
          </span>
        )}
        itemToStringLabel={(user) => user.name}
        isItemEqualToValue={(item, value) => item.id === value.id}
        onInputValueChange={(nextSearchValue, { reason }) => {
          setSearchValue(nextSearchValue);

          const controller = new AbortController();
          abortControllerRef.current?.abort();
          abortControllerRef.current = controller;

          if (nextSearchValue === "") {
            setSearchResults([]);
            setError(null);
            return;
          }

          if (reason === "item-press") {
            return;
          }

          startTransition(async () => {
            setError(null);

            const result = await searchDirectoryUsers(nextSearchValue, filter);

            if (controller.signal.aborted) {
              return;
            }

            startTransition(() => {
              setSearchResults(result.users);
              setError(result.error);
            });
          });
        }}
        onOpenChangeComplete={(open) => {
          if (!open && selectedValue) {
            setSearchResults([selectedValue]);
          }
        }}
      />
    );
  },
});

export const AsyncSearchMultiple = meta.story({
  name: "非同期検索（複数）",
  render() {
    const [searchResults, setSearchResults] = React.useState<DirectoryUser[]>([]);
    const [selectedValues, setSelectedValues] = React.useState<DirectoryUser[]>([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [blockStartStatus, setBlockStartStatus] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();

    const filter = Combobox.useFilter();

    const abortControllerRef = React.useRef<AbortController | null>(null);
    const selectedValuesRef = React.useRef<DirectoryUser[]>([]);

    const trimmedSearchValue = searchValue.trim();

    const items = React.useMemo(() => {
      if (selectedValues.length === 0) {
        return searchResults;
      }

      const merged = [...searchResults];

      selectedValues.forEach((user) => {
        if (!merged.some((result) => result.id === user.id)) {
          merged.push(user);
        }
      });

      return merged;
    }, [searchResults, selectedValues]);

    function getStatus() {
      if (isPending) {
        return "検索中…";
      }

      if (error) {
        return error;
      }

      if (trimmedSearchValue === "" && !blockStartStatus) {
        return selectedValues.length > 0 ? null : "入力して担当者を検索…";
      }

      if (searchResults.length === 0 && !blockStartStatus) {
        return `「${trimmedSearchValue}」に一致する候補がありません。`;
      }

      return null;
    }

    function getEmptyMessage() {
      if (trimmedSearchValue === "" || isPending || searchResults.length > 0 || error) {
        return null;
      }

      return "別のキーワードで試してください。";
    }

    const status = getStatus();
    const emptyMessage = getEmptyMessage();

    return (
      <Combobox<DirectoryUser, true>
        empty={emptyMessage}
        items={items}
        label="担当者"
        filter={null}
        status={status}
        multiple
        className="w-[300px]"
        placeholder="例：山田"
        onValueChange={(nextSelectedValues) => {
          selectedValuesRef.current = nextSelectedValues;
          setSelectedValues(nextSelectedValues);
          setSearchValue("");
          setError(null);

          if (nextSelectedValues.length === 0) {
            setSearchResults([]);
            setBlockStartStatus(false);
          } else {
            setBlockStartStatus(true);
          }
        }}
        chipLabelRenderer={(user: DirectoryUser) => user.name}
        itemLabelRenderer={(user: DirectoryUser) => (
          <span className="flex min-w-0 flex-col text-left">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs opacity-70">
              {user.email} ・ @{user.username} ・ {user.title}
            </span>
          </span>
        )}
        itemToStringLabel={(user) => user.name}
        isItemEqualToValue={(item, value) => item.id === value.id}
        onInputValueChange={(nextSearchValue, { reason }) => {
          setSearchValue(nextSearchValue);

          const controller = new AbortController();
          abortControllerRef.current?.abort();
          abortControllerRef.current = controller;

          if (nextSearchValue === "") {
            setSearchResults(selectedValuesRef.current);
            setError(null);
            setBlockStartStatus(false);
            return;
          }

          if (reason === "item-press") {
            return;
          }

          startTransition(async () => {
            setError(null);

            const result = await searchDirectoryUsers(nextSearchValue, filter);

            if (controller.signal.aborted) {
              return;
            }

            startTransition(() => {
              setSearchResults(result.users);
              setError(result.error);
            });
          });
        }}
        onOpenChangeComplete={(open) => {
          if (!open) {
            setSearchResults(selectedValuesRef.current);
            setBlockStartStatus(false);
          }
        }}
      />
    );
  },
});
