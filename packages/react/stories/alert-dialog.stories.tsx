import * as theme from "@suru-ui/theme";
import {
  InfoIcon,
  Trash2Icon,
  AlertCircleIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
} from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { AlertDialog } from "../src/alert-dialog/index.js";
import * as AlertDialogParts from "../src/alert-dialog/index.js";
import { Button } from "../src/button/index.js";
import { TextField } from "../src/text-field/index.js";

const SIZES: readonly AlertDialog.Size[] = theme.SIZES;
const RADII: readonly AlertDialog.Radius[] = ["none", ...theme.SIZES];
const VARIANTS: readonly AlertDialog.Variant[] = ["default", "stacked"];
const STATUSES: readonly {
  readonly Icon: typeof InfoIcon;
  readonly color: "blue" | "green" | "yellow" | "red";
  readonly confirmColor: "blue" | "green" | "yellow" | "red";
  readonly description: string;
  readonly status: string;
  readonly title: string;
  readonly trigger: string;
}[] = [
  {
    status: "info",
    title: "サインアウトしますか？",
    description: "再度サインインするまで、アカウントにアクセスできません。",
    color: "blue",
    confirmColor: "blue",
    trigger: "サインアウト",
    Icon: InfoIcon,
  },
  {
    status: "success",
    title: "タスクを完了しますか？",
    description: "完了したタスクはチーム全員に通知されます。",
    color: "green",
    confirmColor: "green",
    trigger: "タスクを完了",
    Icon: CheckCircle2Icon,
  },
  {
    status: "warning",
    title: "変更を破棄しますか？",
    description: "保存していない変更はすべて失われます。",
    color: "yellow",
    confirmColor: "yellow",
    trigger: "変更を破棄",
    Icon: AlertTriangleIcon,
  },
  {
    status: "error",
    title: "アカウントを削除しますか？",
    description: "すべてのデータがサーバーから削除され、元に戻せません。",
    color: "red",
    confirmColor: "red",
    trigger: "アカウントを削除",
    Icon: AlertCircleIcon,
  },
];

const meta = preview.meta({
  title: "AlertDialog",
  component: AlertDialog,
});

export default meta;

const ctrl = controls(AlertDialog, {
  description: {
    control: "text",
  },
  icon: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  showCancelIconButton: {
    control: "boolean",
  },
  size: {
    control: "select",
    options: SIZES,
  },
  title: {
    control: "text",
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

export const Basic = meta.story({
  name: "基本",
  ...ctrl({
    variant: "default",
    size: "md",
    radius: undefined,
    outlined: true,
    showCancelIconButton: false,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description:
      "このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。",
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon && <Trash2Icon />}
        cancel={
          <Button size={props.size} variant="naked">
            キャンセル
          </Button>
        }
        confirm={
          <Button size={props.size} color="red">
            削除する
          </Button>
        }
        trigger={
          <Button size={props.size} color="red">
            プロジェクトを削除
          </Button>
        }
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      />
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description: "`open` と `onOpenChange` で開閉を制御できます。",
  }),
  render(props) {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="m-0 text-sm text-neutral-500">
          状態: <span className="font-mono">{open ? "open" : "closed"}</span>
        </p>
        <div className="flex items-center gap-2">
          <Button onClick={() => setOpen(true)}>開く</Button>
          <Button onClick={() => setOpen((prev) => !prev)} variant="liquid">
            切り替え
          </Button>
        </div>
        <AlertDialog
          {...props}
          icon={props.icon && <Trash2Icon />}
          open={open}
          cancel={<Button variant="naked">キャンセル</Button>}
          confirm={<Button color="red">削除する</Button>}
          slotProps={{
            icon: {
              color: "red",
              muted: true,
            },
          }}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description:
      "このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {VARIANTS.map((variant) => (
          <AlertDialog
            key={variant}
            {...props}
            icon={props.icon && <Trash2Icon />}
            title={`外観: ${variant}`}
            cancel={<Button variant="naked">キャンセル</Button>}
            confirm={<Button color="red">削除する</Button>}
            trigger={<Button variant="liquid">{variant}</Button>}
            variant={variant}
            slotProps={{
              icon: {
                color: "red",
                muted: true,
              },
            }}
          />
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description: "大きさを切り替えられます。",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {SIZES.map((size) => (
          <AlertDialog
            key={size}
            {...props}
            icon={props.icon && <Trash2Icon />}
            size={size}
            title={`大きさ: ${size}`}
            cancel={<Button variant="naked">キャンセル</Button>}
            confirm={<Button color="red">削除する</Button>}
            trigger={<Button variant="liquid">{size}</Button>}
            slotProps={{
              icon: {
                color: "red",
                muted: true,
              },
            }}
          />
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "default",
    outlined: true,
    showCancelIconButton: false,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description: "角丸の大きさを切り替えられます。",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {RADII.map((radius) => (
          <AlertDialog
            key={radius}
            {...props}
            icon={props.icon && <Trash2Icon />}
            title={`角丸: ${radius}`}
            cancel={<Button variant="naked">キャンセル</Button>}
            radius={radius}
            confirm={<Button color="red">削除する</Button>}
            trigger={<Button variant="liquid">{radius}</Button>}
            slotProps={{
              icon: {
                color: "red",
                muted: true,
              },
            }}
          />
        ))}
      </div>
    );
  },
});

export const Outline = meta.story({
  name: "枠線",
  ...ctrl({
    variant: "default",
    radius: "md",
    showCancelIconButton: false,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description: "枠線を表示したダイアログです。",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <AlertDialog
          {...props}
          icon={props.icon && <Trash2Icon />}
          cancel={<Button variant="naked">キャンセル</Button>}
          confirm={<Button color="red">削除する</Button>}
          trigger={<Button>枠線付き</Button>}
          outlined
          slotProps={{
            icon: {
              color: "red",
              muted: true,
            },
          }}
        />
        <AlertDialog
          {...props}
          icon={props.icon && <Trash2Icon />}
          cancel={<Button variant="naked">キャンセル</Button>}
          confirm={<Button color="red">削除する</Button>}
          trigger={<Button variant="liquid">枠線無し</Button>}
          outlined={false}
          slotProps={{
            icon: {
              color: "red",
              muted: true,
            },
          }}
        />
      </div>
    );
  },
});

export const Statuses = meta.story({
  name: "ステータス",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {STATUSES.map(({ status, title, description, color, confirmColor, trigger, Icon }) => (
          <AlertDialog
            key={status}
            {...props}
            icon={<Icon />}
            title={title}
            cancel={<Button variant="naked">キャンセル</Button>}
            confirm={<Button color={confirmColor}>確認する</Button>}
            trigger={<Button color={color}>{trigger}</Button>}
            slotProps={{
              icon: {
                color,
                muted: true,
              },
            }}
            description={description}
          />
        ))}
      </div>
    );
  },
});

export const Destructive = meta.story({
  name: "破壊的操作",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    title: "プロジェクトを完全に削除しますか？",
    description: "この操作は取り消せません。すべてのデータがサーバーから完全に削除されます。",
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={<Trash2Icon />}
        cancel={<Button variant="naked">キャンセル</Button>}
        confirm={<Button color="red">完全に削除する</Button>}
        trigger={<Button color="red">プロジェクトを削除</Button>}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      />
    );
  },
});

export const WithIcon = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    title: "プロジェクトを削除しますか？",
    description: "アイコンで操作の重要度を伝えます。",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <AlertDialog
          {...props}
          cancel={<Button variant="naked">キャンセル</Button>}
          confirm={<Button color="red">削除する</Button>}
          trigger={<Button variant="liquid">アイコン無し</Button>}
          slotProps={{
            icon: {
              color: "red",
              muted: true,
            },
          }}
        />
        <AlertDialog
          {...props}
          icon={<Trash2Icon />}
          cancel={<Button variant="naked">キャンセル</Button>}
          confirm={<Button color="red">削除する</Button>}
          trigger={<Button variant="liquid">規定のアイコン</Button>}
          slotProps={{
            icon: {
              color: "red",
              muted: true,
            },
          }}
        />
        <AlertDialog
          {...props}
          icon={<AlertTriangleIcon />}
          cancel={<Button variant="naked">キャンセル</Button>}
          confirm={<Button>送信する</Button>}
          trigger={<Button variant="liquid">独自のアイコン</Button>}
          slotProps={{
            icon: {
              color: "yellow",
              muted: true,
            },
          }}
        />
      </div>
    );
  },
});

export const WithBody = meta.story({
  name: "本文付き",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description: "削除される内容を確認してから操作します。",
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon && <Trash2Icon />}
        cancel={<Button variant="naked">キャンセル</Button>}
        confirm={<Button color="red">削除する</Button>}
        trigger={<Button color="red">内容を確認して削除</Button>}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      >
        <div className="flex flex-col gap-2 text-sm text-canvas_text-2">
          <span>削除される項目</span>
          <ul className="m-0 flex flex-col gap-1 pl-5">
            <li>プロジェクトの設定</li>
            <li>保存されたファイル（12 件）</li>
            <li>招待中のメンバー（3 名）</li>
          </ul>
        </div>
      </AlertDialog>
    );
  },
});

export const Scrollable = meta.story({
  name: "長い本文",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    icon: false,
    title: "利用規約",
    description: "本文だけがスクロールし、見出しと操作は表示されたままです。",
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon && <Trash2Icon />}
        cancel={<Button variant="naked">閉じる</Button>}
        confirm={<Button>同意する</Button>}
        trigger={<Button>利用規約を読む</Button>}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      >
        {Array.from({ length: 30 }, (_, index) => (
          <div key={index}>
            第{index + 1}条: この規約はダイアログのスクロール表示を確認するための本文です。
          </div>
        ))}
      </AlertDialog>
    );
  },
});

export const WithCancelIconButton = meta.story({
  name: "隅に閉じるアイコンを表示",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description: "右上の閉じるアイコンからも中止できます。",
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon && <Trash2Icon />}
        cancel={<Button variant="naked">キャンセル</Button>}
        confirm={<Button color="red">削除する</Button>}
        trigger={<Button color="red">プロジェクトを削除</Button>}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
        showCancelIconButton
      />
    );
  },
});

// export const WithHelp = meta.story({
//   name: "ヘルプ付き",
//   ...ctrl({
//     variant: "default",
//     radius: "md",
//     outlined: true,
//     showCancelIconButton: true,
//     icon: false,
//     title: "下書きの削除",
//     description: "閉じるアイコンの手前に独自の内容を追加できます。",
//   }),
//   render(props) {
//     return (
//       <AlertDialog
//         {...props}
//         icon={props.icon && <Trash2Icon />}
//         action={<span className="text-xs text-neutral-500">自動保存済み</span>}
//         cancel={<Button variant="naked">キャンセル</Button>}
//         confirm={<Button color="red">削除する</Button>}
//         trigger={<Button color="red">下書きを削除</Button>}
//         slotProps={{
//           icon: {
//             color: "red",
//             muted: true,
//           },
//         }}
//       />
//     );
//   },
// });

export const Imperative = meta.story({
  name: "命令的操作",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    icon: false,
    title: "命令的に制御されるダイアログ",
    description: "`createHandle` で作成したハンドルから開閉できます。",
  }),
  render(props) {
    const [handle] = React.useState(AlertDialog.createHandle);

    return (
      <div className="flex items-center gap-4">
        <Button onClick={() => handle.open(null)}>開く</Button>
        <Button onClick={() => handle.close()} variant="liquid">
          閉じる
        </Button>
        <AlertDialog
          {...props}
          icon={props.icon && <Trash2Icon />}
          cancel={<Button variant="naked">キャンセル</Button>}
          handle={handle}
          confirm={<Button color="red">削除する</Button>}
          slotProps={{
            icon: {
              color: "red",
              muted: true,
            },
          }}
        />
      </div>
    );
  },
});

export const ValidationClose = meta.story({
  name: "検証して閉じる",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    title: "確認コードを入力",
    description: "コードを入力しないと削除を実行できません。",
  }),
  render(props) {
    const [code, setCode] = React.useState("");
    const invalid = code.trim() === "";

    return (
      <AlertDialog
        {...props}
        icon={<Trash2Icon />}
        cancel={<Button variant="naked">キャンセル</Button>}
        confirm={<Button color="red">削除する</Button>}
        trigger={<Button color="red">プロジェクトを削除</Button>}
        onConfirm={(evt) => {
          if (invalid) {
            evt.preventBaseUIHandler();
          }
        }}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm text-neutral-500">確認コード</span>
          <TextField value={code} placeholder="123456" onValueChange={(value) => setCode(value)} />
          {invalid && <span className="text-sm text-red-500">確認コードを入力します。</span>}
        </div>
      </AlertDialog>
    );
  },
});

export const CustomComposition = meta.story({
  name: "独自構成",
  ...ctrl({
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
  }),
  render(props) {
    const AlertDialog = AlertDialogParts;
    const { size, radius, variant, outlined } = props;

    return (
      <div className="flex items-center gap-4">
        <AlertDialog.Root>
          <AlertDialog.ToggleTrigger>
            <Button color="red">プロジェクトを削除</Button>
          </AlertDialog.ToggleTrigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Viewport>
              <AlertDialog.Popup size={size} radius={radius} variant={variant} outlined={outlined}>
                <AlertDialog.Header>
                  <AlertDialog.Icon color="red" muted>
                    <Trash2Icon />
                  </AlertDialog.Icon>
                  <AlertDialog.Title>プロジェクトを削除しますか？</AlertDialog.Title>
                  <AlertDialog.Description>
                    このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。
                  </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Content>
                  削除される前に、必要なファイルが保存されているか確認します。
                </AlertDialog.Content>
                <AlertDialog.Footer>
                  <AlertDialog.CloseTrigger>
                    <Button variant="naked">キャンセル</Button>
                  </AlertDialog.CloseTrigger>
                  <AlertDialog.CloseTrigger>
                    <Button color="red">削除する</Button>
                  </AlertDialog.CloseTrigger>
                </AlertDialog.Footer>
              </AlertDialog.Popup>
            </AlertDialog.Viewport>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
    );
  },
});
