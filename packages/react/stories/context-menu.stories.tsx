import * as theme from "@suru-ui/theme";
import {
  CopyIcon,
  LinkIcon,
  MailIcon,
  PlusIcon,
  FilesIcon,
  PencilIcon,
  Share2Icon,
  Trash2Icon,
  ScissorsIcon,
  ClipboardPasteIcon,
} from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import cn from "../src/cn.js";
import { ContextMenu } from "../src/context-menu/index.js";

const SIZES: readonly ContextMenu.Size[] = theme.SIZES;
const RADII: readonly ContextMenu.Radius[] = ["none", ...SIZES, "full"];

const meta = preview.meta({
  title: "ContextMenu",
  component: ContextMenu,
});

export default meta;

const ctrl = controls(ContextMenu, {
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  size: {
    control: "select",
    options: SIZES,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: [
      {
        label: "編集",
      },
      {
        label: "複製",
      },
      {
        type: "separator",
      },
      {
        label: "削除",
        color: "red",
      },
    ],
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

export const Nested = meta.story({
  name: "サブメニュー",
  ...ctrl({
    items: [
      {
        label: "編集",
      },
      {
        label: "共有",
        items: [
          {
            label: "リンクをコピー",
          },
          {
            label: "メールで送る",
          },
        ],
      },
    ],
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

export const CheckboxItems = meta.story({
  name: "チェック項目",
  ...ctrl({
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    const [showSidebar, setShowSidebar] = React.useState(true);
    const [showMinimap, setShowMinimap] = React.useState(false);

    return (
      <ContextMenu
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
        trigger={<TriggerArea />}
      />
    );
  },
});

export const RadioItems = meta.story({
  name: "ラジオ項目",
  ...ctrl({
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    const [value, setValue] = React.useState("name");

    return (
      <ContextMenu
        {...props}
        items={[
          {
            type: "radio-group",
            value,
            onValueChange: setValue,
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
          },
        ]}
        trigger={<TriggerArea />}
      />
    );
  },
});

export const Groups = meta.story({
  name: "グループ",
  ...ctrl({
    items: [
      {
        type: "group",
        label: "アカウント",
        items: [
          {
            label: "プロフィール",
          },
          {
            label: "設定",
          },
        ],
      },
      {
        type: "separator",
      },
      {
        type: "group",
        label: "チーム",
        items: [
          {
            label: "新しいチーム",
          },
          {
            label: "メンバーを招待",
          },
        ],
      },
      {
        type: "separator",
      },
      {
        type: "group",
        items: [
          {
            label: "ログアウト",
          },
        ],
      },
    ],
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

export const Shortcuts = meta.story({
  name: "ショートカット",
  ...ctrl({
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
        type: "separator",
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
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

export const Icons = meta.story({
  name: "アイコン",
  ...ctrl({
    items: [
      {
        label: (
          <>
            <span className="flex items-center gap-2">
              <CopyIcon />
              コピー
            </span>
            <Shortcut>⌘C</Shortcut>
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
      },
      {
        type: "separator",
      },
      {
        label: (
          <>
            <span className="flex items-center gap-2">
              <ScissorsIcon />
              切り取り
            </span>
            <Shortcut>⌘X</Shortcut>
          </>
        ),
      },
    ],
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

export const Destructive = meta.story({
  name: "破壊的操作",
  ...ctrl({
    items: [
      {
        label: "名前を変更",
      },
      {
        label: "複製",
      },
      {
        type: "separator",
      },
      {
        label: "アーカイブ",
      },
      {
        label: "削除",
        color: "red",
      },
    ],
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

export const LinkItems = meta.story({
  name: "リンク項目",
  ...ctrl({
    items: [
      {
        type: "link",
        label: "ドキュメント",
        href: "https://example.com/docs",
      },
      {
        type: "link",
        label: "サポート",
        href: "https://example.com/support",
      },
      {
        type: "separator",
      },
      {
        type: "link",
        label: "外部サイト",
        href: "https://example.com",
      },
    ],
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    items: [
      {
        label: "編集",
      },
      {
        label: "複製",
      },
      {
        type: "separator",
      },
      {
        label: "削除",
        color: "red",
      },
    ],
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        {SIZES.map((size) => (
          <div key={size}>
            <p className="mb-2 text-sm">{size}</p>
            <ContextMenu {...props} size={size} trigger={<TriggerArea />} />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    items: [
      {
        label: "編集",
      },
      {
        label: "複製",
      },
    ],
    size: "md",
    radius: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-sm">なし</p>
          <ContextMenu {...props} trigger={<TriggerArea />} />
        </div>
        <div>
          <p className="mb-2 text-sm">あり</p>
          <ContextMenu {...props} outlined trigger={<TriggerArea />} />
        </div>
      </div>
    );
  },
});

export const DisabledItems = meta.story({
  name: "無効項目",
  ...ctrl({
    items: [
      {
        label: "編集",
      },
      {
        label: "複製",
        disabled: true,
      },
      {
        type: "separator",
      },
      {
        type: "checkbox",
        label: "サイドバー",
        checked: true,
        disabled: true,
        onCheckedChange: () => {},
      },
      {
        label: "削除",
        color: "red",
        disabled: true,
      },
    ],
    size: "md",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

export const Sides = meta.story({
  name: "配置",
  ...ctrl({
    items: [
      {
        label: "編集",
      },
      {
        label: "共有",
        items: [
          {
            label: "リンクをコピー",
          },
          {
            label: "メールで送る",
          },
        ],
      },
    ],
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-sm">既定</p>
          <ContextMenu {...props} trigger={<TriggerArea />} />
        </div>
        <div>
          <p className="mb-2 text-sm">sideOffset + align</p>
          <ContextMenu
            {...props}
            trigger={<TriggerArea />}
            slotProps={{
              positioner: {
                sideOffset: 24,
                align: "end",
              },
            }}
          />
        </div>
      </div>
    );
  },
});

export const FileActions = meta.story({
  name: "実践例：ファイル操作",
  ...ctrl({
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
      {
        type: "separator",
      },
      {
        label: (
          <span className="flex items-center gap-2">
            <Share2Icon />
            共有
          </span>
        ),
        items: [
          {
            label: (
              <span className="flex items-center gap-2">
                <LinkIcon />
                リンクをコピー
              </span>
            ),
          },
          {
            label: (
              <span className="flex items-center gap-2">
                <MailIcon />
                メールで送る
              </span>
            ),
          },
        ],
      },
      {
        type: "separator",
      },
      {
        label: (
          <span className="flex items-center gap-2">
            <Trash2Icon />
            削除
          </span>
        ),
        color: "red",
      },
    ],
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

export const TextEdit = meta.story({
  name: "実践例：テキスト編集",
  ...ctrl({
    items: [
      {
        label: (
          <>
            <span className="flex items-center gap-2">
              <ScissorsIcon />
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
              <CopyIcon />
              コピー
            </span>
            <Shortcut>⌘C</Shortcut>
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
      {
        type: "separator",
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
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

function Shortcut(props: React.ComponentProps<"kbd">) {
  const { className, ...otherProps } = props;

  return <kbd {...otherProps} className={cn(className, "text-xs opacity-60")} />;
}

function TriggerArea(props: React.ComponentProps<"div">) {
  const { className, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={cn(
        className,
        "rounded-md border border-dashed border-neutral-400 p-8 text-center",
      )}
    >
      右クリックしてください
    </div>
  );
}
