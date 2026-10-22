import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { TextField } from "../text-field/index.js";
import { Dialog } from "./index.js";

const RADII = ["none", ...theme.SIZES] as const;
const VARIANTS = ["default", "stacked"] as const;

const meta = preview.meta({
  title: "Dialog",
  component: Dialog,
});

export default meta;

const ctrl = controls(Dialog, {
  size: {
    control: "select",
    options: theme.SIZES,
  },
  title: {
    control: "text",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  outlined: {
    control: "boolean",
  },
  description: {
    control: "text",
  },
  showCloseIconButton: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    title: "通知",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "新しい通知はありません。",
    showCloseIconButton: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Dialog
          {...props}
          close={<Button variant="naked">閉じる</Button>}
          trigger={<Button>通知を見る</Button>}
        >
          トリガーをクリックすると、ポップアップが中央に表示されます。
        </Dialog>
      </div>
    );
  },
});

export const Stacked = meta.story({
  name: "積み上げ式",
  ...ctrl({
    title: "通知",
    radius: "md",
    outlined: true,
    description: "新しい通知はありません。",
    showCloseIconButton: true,
  }),
  render(props) {
    return (
      <Dialog
        {...props}
        close={<Button variant="naked">閉じる</Button>}
        trigger={<Button>通知を見る</Button>}
        variant="stacked"
      >
        タイトルと説明文が中央に配置され、閉じるアイコンが右上に重なります。
      </Dialog>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    outlined: true,
    description: "角丸の大きさを切り替えられます。",
    showCloseIconButton: true,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {RADII.map((radius) => (
          <Dialog
            key={radius}
            {...props}
            close={<Button variant="naked">閉じる</Button>}
            title={`角丸: ${radius}`}
            radius={radius}
            trigger={<Button variant="liquid">{radius}</Button>}
          />
        ))}
      </div>
    );
  },
});

export const WithoutOutline = meta.story({
  name: "枠線なし",
  ...ctrl({
    title: "通知",
    radius: "md",
    variant: "default",
    description: "枠線を表示しないダイアログです。",
    showCloseIconButton: true,
  }),
  render(props) {
    return (
      <Dialog
        {...props}
        close={<Button variant="naked">閉じる</Button>}
        trigger={<Button>通知を見る</Button>}
        outlined={false}
      />
    );
  },
});

export const WithoutCloseIconButton = meta.story({
  name: "閉じるアイコンなし",
  ...ctrl({
    title: "通知",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "右上の閉じるアイコンを非表示にします。",
  }),
  render(props) {
    return (
      <Dialog
        {...props}
        close={<Button variant="naked">閉じる</Button>}
        trigger={<Button>通知を見る</Button>}
        showCloseIconButton={false}
      />
    );
  },
});

export const CustomAction = meta.story({
  name: "カスタム操作",
  ...ctrl({
    title: "下書きの編集",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "閉じるアイコンの手前に独自の内容を追加できます。",
    showCloseIconButton: true,
  }),
  render(props) {
    return (
      <Dialog
        {...props}
        close={<Button variant="naked">閉じる</Button>}
        action={<span className="text-xs text-neutral-500">自動保存済み</span>}
        trigger={<Button>下書きを開く</Button>}
      />
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    title: "制御されたダイアログ",
    description: "`open` と `onOpenChange` で制御できます。",
    showCloseIconButton: true,
  }),
  render(props) {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Dialog {...props} open={open} onOpenChange={setOpen}>
          <p className="text-sm text-neutral-500">外部のボタンからも開閉できます。</p>
        </Dialog>
        <Button onClick={() => setOpen(true)}>開く</Button>
      </>
    );
  },
});

export const Form = meta.story({
  name: "フォーム",
  ...ctrl({
    title: "プロフィールを編集",
    description: "表示名を変更して保存します。",
  }),
  render(props) {
    const [name, setName] = React.useState("田中 太郎");

    return (
      <Dialog
        {...props}
        close={<Button>保存する</Button>}
        trigger={<Button>プロフィールを編集</Button>}
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm text-neutral-500">表示名</span>
          <TextField
            value={name}
            placeholder="田中 太郎"
            onValueChange={(value) => setName(value)}
          />
        </div>
      </Dialog>
    );
  },
});

export const Confirm = meta.story({
  name: "確認",
  ...ctrl({
    title: "プロジェクトを削除しますか？",
    description: "この操作は取り消せません。削除するとすべてのデータが失われます。",
  }),
  render(props) {
    return (
      <Dialog
        {...props}
        close={<Button color="red">削除する</Button>}
        onClose={(evt) => {
          evt.preventBaseUIHandler();
        }}
        trigger={<Button color="red">プロジェクトを削除</Button>}
      />
    );
  },
});

export const Scrollable = meta.story({
  name: "長い本文",
  ...ctrl({
    title: "利用規約",
    description: "本文だけがスクロールし、見出しと操作は表示されたままです。",
  }),
  render(props) {
    return (
      <Dialog
        {...props}
        close={<Button>同意する</Button>}
        trigger={<Button>利用規約を読む</Button>}
      >
        <div className="flex max-h-[240px] flex-col gap-2 overflow-auto pr-2">
          {Array.from({ length: 30 }, (_, index) => (
            <div key={index}>
              第{index + 1}条: この規約はダイアログのスクロール表示を確認するための本文です。
            </div>
          ))}
        </div>
      </Dialog>
    );
  },
});

export const Imperative = meta.story({
  name: "命令的操作",
  ...ctrl({
    title: "命令的に制御されるダイアログ",
    description: "`createHandle` で作成したハンドルから開閉できます。",
  }),
  render(props) {
    const [handle] = React.useState(Dialog.createHandle);

    return (
      <div className="flex items-center gap-4">
        <Button onClick={() => handle.open(null)}>開く</Button>
        <Button onClick={() => handle.close()} variant="liquid">
          閉じる
        </Button>
        <Dialog {...props} close={<Button variant="naked">閉じる</Button>} handle={handle} />
      </div>
    );
  },
});

export const NonModal = meta.story({
  name: "非モーダル",
  ...ctrl({
    modal: false,
    title: "非モーダルのダイアログ",
    description: "背後の操作を妨げずに表示されます。",
  }),
  render(props) {
    return (
      <Dialog
        {...props}
        close={<Button variant="naked">閉じる</Button>}
        trigger={<Button>通知を見る</Button>}
      />
    );
  },
});

export const Persistent = meta.story({
  name: "明示的に閉じる",
  ...ctrl({
    title: "保存を確認",
    description: "外側のクリックや Esc では閉じません。ボタンで閉じます。",
    showCloseIconButton: false,
    disablePointerDismissal: true,
  }),
  render(props) {
    return (
      <Dialog
        {...props}
        close={<Button>変更を破棄せずに閉じる</Button>}
        trigger={<Button>保存する</Button>}
      />
    );
  },
});

export const Nested = meta.story({
  name: "入れ子",
  ...ctrl({
    title: "外側のダイアログ",
    description: "本文の中から別のダイアログを開けます。",
  }),
  render(props) {
    return (
      <Dialog
        {...props}
        close={<Button variant="naked">閉じる</Button>}
        trigger={<Button>外側を開く</Button>}
      >
        <Dialog
          close={<Button variant="naked">閉じる</Button>}
          title="内側のダイアログ"
          trigger={<Button variant="liquid">内側を開く</Button>}
          description="入れ子のダイアログです。"
        />
      </Dialog>
    );
  },
});

export const ValidationClose = meta.story({
  name: "検証して閉じる",
  ...ctrl({
    title: "確認コードを入力",
    description: "コードを入力しないとダイアログを閉じられません。",
  }),
  render(props) {
    const [code, setCode] = React.useState("");
    const invalid = code.trim() === "";

    return (
      <Dialog
        {...props}
        close={<Button>確定する</Button>}
        onClose={(evt) => {
          if (invalid) {
            evt.preventBaseUIHandler();
          }
        }}
        trigger={<Button>コードを入力</Button>}
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm text-neutral-500">確認コード</span>
          <TextField value={code} placeholder="123456" onValueChange={(value) => setCode(value)} />
          {invalid && <span className="text-sm text-red-500">確認コードを入力します。</span>}
        </div>
      </Dialog>
    );
  },
});
