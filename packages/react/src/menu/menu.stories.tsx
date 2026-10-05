import * as theme from "@suru-ui/theme";
import {
  CopyIcon,
  PlusIcon,
  FilesIcon,
  PencilIcon,
  Share2Icon,
  Trash2Icon,
  ClipboardPasteIcon,
} from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import cn from "../cn.js";
import { Menu } from "./index.js";

const SIZES: readonly Menu.Size[] = theme.SIZES;
const RADII: readonly Menu.Radius[] = ["none", ...SIZES];
const VARIANTS: readonly Menu.Variant[] = theme.COLOR_TEMPLATES;

const meta = preview.meta({
  title: "Menu",
  component: Menu<Menu.ItemObject>,
});

export default meta;

const ctrl = controls(Menu<Menu.ItemObject>, {
  size: {
    control: "select",
    options: SIZES,
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
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    items: [
      {
        label: "新規作成",
      },
      {
        label: "開く",
      },
      {
        color: "red",
        label: "削除",
      },
    ],
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return <Menu {...props} trigger={<Button>ファイル</Button>} />;
  },
});

export const Submenu = meta.story({
  name: "サブメニュー",
  ...ctrl({
    size: "md",
    items: [
      {
        label: "編集",
      },
      {
        type: "submenu",
        items: [
          {
            label: "リンクをコピー",
          },
          {
            label: "メールで送る",
          },
        ],
        label: "共有",
      },
    ],
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return <Menu {...props} trigger={<Button>操作</Button>} />;
  },
});

export const Checkbox = meta.story({
  name: "チェック項目",
  ...ctrl({
    size: "md",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    const [showSidebar, setShowSidebar] = React.useState(true);
    const [showMinimap, setShowMinimap] = React.useState(false);

    return (
      <Menu
        {...props}
        items={[
          {
            type: "checkbox",
            label: "サイドバー",
            checked: showSidebar,
            onCheckedChange: setShowSidebar,
          },
          {
            type: "checkbox",
            label: "ミニマップ",
            checked: showMinimap,
            onCheckedChange: setShowMinimap,
          },
        ]}
        trigger={<Button>表示</Button>}
      />
    );
  },
});

export const Radio = meta.story({
  name: "ラジオ項目",
  ...ctrl({
    size: "md",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    const [value, setValue] = React.useState("name");

    return (
      <Menu
        {...props}
        items={[
          {
            type: "radio-group",
            items: [
              {
                type: "radio",
                label: "名前",
                value: "name",
              },
              {
                type: "radio",
                label: "日付",
                value: "date",
              },
            ],
            value,
            onValueChange: setValue,
          },
        ]}
        trigger={<Button>並べ替え</Button>}
      />
    );
  },
});

export const Groups = meta.story({
  name: "グループ",
  ...ctrl({
    size: "md",
    items: [
      {
        items: [
          {
            label: "プロフィール",
          },
          {
            label: "設定",
          },
        ],
        label: "アカウント",
      },
      {
        items: [
          {
            label: "新しいチーム",
          },
          {
            label: "メンバーを招待",
          },
        ],
        label: "チーム",
      },
      {
        items: [
          {
            label: "ログアウト",
          },
        ],
      },
    ],
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return <Menu {...props} trigger={<Button>メニュー</Button>} />;
  },
});

export const Shortcuts = meta.story({
  name: "ショートカット",
  ...ctrl({
    size: "md",
    items: [
      {
        label: (
          <>
            コピー
            <Shortcut>⌘C</Shortcut>
          </>
        ),
      },
      {
        label: (
          <>
            貼り付け
            <Shortcut>⌘V</Shortcut>
          </>
        ),
      },
      {
        label: (
          <>
            すべて選択
            <Shortcut>⌘A</Shortcut>
          </>
        ),
      },
    ],
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return <Menu {...props} trigger={<Button>編集</Button>} />;
  },
});

export const Link = meta.story({
  name: "リンク項目",
  ...ctrl({
    size: "md",
    items: [
      {
        href: "https://example.com/docs",
        type: "link",
        label: "ドキュメント",
        target: "_blank",
      },
      {
        href: "https://example.com/support",
        type: "link",
        label: "サポート",
        target: "_blank",
      },
      {
        href: "https://example.com",
        type: "link",
        label: "外部サイト",
        target: "_blank",
      },
    ],
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return <Menu {...props} trigger={<Button>ヘルプ</Button>} />;
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    size: "md",
    items: [
      {
        label: "編集",
      },
      {
        label: "複製",
      },
      {
        color: "red",
        label: "削除",
      },
    ],
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        {SIZES.map((size) => (
          <div key={size}>
            <p className="mb-2">{size}</p>
            <Menu {...props} size={size} trigger={<Button>操作</Button>} />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    size: "md",
    items: [
      {
        label: "編集",
      },
      {
        label: "複製",
      },
    ],
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2">なし</p>
          <Menu {...props} trigger={<Button>操作</Button>} />
        </div>
        <div>
          <p className="mb-2">あり</p>
          <Menu {...props} trigger={<Button>操作</Button>} outlined />
        </div>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効項目",
  ...ctrl({
    size: "md",
    items: [
      {
        label: "編集",
      },
      {
        label: "複製",
        disabled: true,
      },
      {
        type: "checkbox",
        label: "サイドバー",
        checked: true,
        disabled: true,
        onCheckedChange: () => {},
      },
      {
        color: "red",
        label: "削除",
        disabled: true,
      },
    ],
    radius: undefined,
    variant: "naked",
    outlined: false,
  }),
  render(props) {
    return <Menu {...props} trigger={<Button>操作</Button>} />;
  },
});

export const FileActions = meta.story({
  name: "実践例：ファイル操作",
  ...ctrl({
    size: "md",
    items: [
      {
        items: [
          {
            label: (
              <>
                <span className="flex items-center gap-2">
                  <PlusIcon />
                  新規ファイル
                </span>
                <Shortcut>⌘N</Shortcut>
              </>
            ),
          },
          {
            label: (
              <>
                <span className="flex items-center gap-2">
                  <PencilIcon />
                  名前を変更
                </span>
                <Shortcut>F2</Shortcut>
              </>
            ),
          },
          {
            label: (
              <>
                <span className="flex items-center gap-2">
                  <FilesIcon />
                  複製
                </span>
                <Shortcut>⌘D</Shortcut>
              </>
            ),
          },
        ],
      },
      {
        items: [
          {
            label: (
              <>
                <span className="flex items-center gap-2">
                  <CopyIcon />
                  切り取り
                </span>
                <Shortcut>⌘X</Shortcut>
              </>
            ),
          },
          {
            label: (
              <>
                <span className="flex items-center gap-2">
                  <ClipboardPasteIcon />
                  貼り付け
                </span>
                <Shortcut>⌘V</Shortcut>
              </>
            ),
            disabled: true,
          },
        ],
      },
      {
        items: [
          {
            items: [
              {
                label: "リンクをコピー",
              },
              {
                label: "メールで送る",
              },
            ],
            label: (
              <span className="flex items-center gap-2">
                <Share2Icon className="size-[14px]" />
                共有
              </span>
            ),
          },
        ],
      },
      {
        items: [
          {
            color: "red",
            label: (
              <span className="flex items-center gap-2">
                <Trash2Icon />
                削除
              </span>
            ),
          },
        ],
      },
    ],
    modal: true,
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return <Menu {...props} trigger={<Button>ファイル</Button>} />;
  },
});

function Shortcut(props: React.ComponentProps<"kbd">) {
  const { className, ...otherProps } = props;

  return <kbd {...otherProps} className={cn(className, "text-xs opacity-60")} />;
}
