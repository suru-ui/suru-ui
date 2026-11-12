import * as theme from "@suru-ui/theme";
import {
  InfoIcon,
  Trash2Icon,
  AlertCircleIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
} from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { TextField } from "../text-field/index.js";
import { AlertDialog } from "./index.js";
import * as AlertDialogParts from "./index.js";

const SIZES: readonly AlertDialog.Size[] = theme.SIZES;
const RADII: readonly AlertDialog.Radius[] = ["none", ...theme.SIZES];
const VARIANTS: readonly AlertDialog.Variant[] = ["default", "stacked"];
const STATUSES: readonly {
  readonly Icon: typeof InfoIcon;
  readonly color: "blue" | "green" | "yellow" | "red";
  readonly title: string;
  readonly status: string;
  readonly trigger: string;
  readonly description: string;
  readonly confirmColor: "blue" | "green" | "yellow" | "red";
}[] = [
  {
    Icon: InfoIcon,
    color: "blue",
    title: "サインアウトしますか？",
    status: "info",
    trigger: "サインアウト",
    description: "再度サインインするまで、アカウントにアクセスできません。",
    confirmColor: "blue",
  },
  {
    Icon: CheckCircle2Icon,
    color: "green",
    title: "タスクを完了しますか？",
    status: "success",
    trigger: "タスクを完了",
    description: "完了したタスクはチーム全員に通知されます。",
    confirmColor: "green",
  },
  {
    Icon: AlertTriangleIcon,
    color: "yellow",
    title: "変更を破棄しますか？",
    status: "warning",
    trigger: "変更を破棄",
    description: "保存していない変更はすべて失われます。",
    confirmColor: "yellow",
  },
  {
    Icon: AlertCircleIcon,
    color: "red",
    title: "アカウントを削除しますか？",
    status: "error",
    trigger: "アカウントを削除",
    description: "すべてのデータがサーバーから削除され、元に戻せません。",
    confirmColor: "red",
  },
];

const meta = preview.meta({
  title: "AlertDialog",
  component: AlertDialog,
});

export default meta;

const ctrl = controls(AlertDialog, {
  icon: {
    control: "boolean",
  },
  size: {
    control: "select",
    options: SIZES,
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
  showCancelIconButton: {
    control: "boolean",
  },
});

export const Basic = meta.story({
  name: "基本",
  ...ctrl({
    icon: false,
    size: "md",
    title: "プロジェクトを削除しますか？",
    radius: undefined,
    variant: "default",
    outlined: true,
    description:
      "このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。",
    showCancelIconButton: false,
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon === true && <Trash2Icon />}
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
    icon: false,
    title: "プロジェクトを削除しますか？",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "`open` と `onOpenChange` で開閉を制御できます。",
    showCancelIconButton: false,
  }),
  render(props) {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="m-0 text-sm text-neutral-500">
          状態: <span className="font-mono">{open ? "open" : "closed"}</span>
        </p>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            開く
          </Button>
          <Button
            variant="liquid"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            切り替え
          </Button>
        </div>
        <AlertDialog
          {...props}
          icon={props.icon === true && <Trash2Icon />}
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
    icon: false,
    title: "プロジェクトを削除しますか？",
    radius: "md",
    outlined: true,
    description:
      "このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。",
    showCancelIconButton: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {VARIANTS.map((variant) => (
          <AlertDialog
            key={variant}
            {...props}
            icon={props.icon === true && <Trash2Icon />}
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
    icon: false,
    title: "プロジェクトを削除しますか？",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "大きさを切り替えられます。",
    showCancelIconButton: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {SIZES.map((size) => (
          <AlertDialog
            key={size}
            {...props}
            icon={props.icon === true && <Trash2Icon />}
            size={size}
            title={`大きさ: ${size}`}
            cancel={
              <Button size={size} variant="naked">
                キャンセル
              </Button>
            }
            confirm={
              <Button size={size} color="red">
                削除する
              </Button>
            }
            trigger={
              <Button size={size} variant="liquid">
                {size}
              </Button>
            }
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
    icon: false,
    title: "プロジェクトを削除しますか？",
    variant: "default",
    outlined: true,
    description: "角丸の大きさを切り替えられます。",
    showCancelIconButton: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {RADII.map((radius) => (
          <AlertDialog
            key={radius}
            {...props}
            icon={props.icon === true && <Trash2Icon />}
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
    icon: false,
    title: "プロジェクトを削除しますか？",
    radius: "md",
    variant: "default",
    description: "枠線を表示したダイアログです。",
    showCancelIconButton: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <AlertDialog
          {...props}
          icon={props.icon === true && <Trash2Icon />}
          cancel={<Button variant="naked">キャンセル</Button>}
          confirm={<Button color="red">削除する</Button>}
          trigger={
            <Button variant="liquid" outlined>
              枠線付き
            </Button>
          }
          slotProps={{
            icon: {
              color: "red",
              muted: true,
            },
          }}
        />
        <AlertDialog
          {...props}
          icon={props.icon === true && <Trash2Icon />}
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
    radius: "md",
    variant: "default",
    outlined: true,
    showCancelIconButton: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {STATUSES.map(({ Icon, color, title, status, trigger, description, confirmColor }) => (
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
    title: "プロジェクトを完全に削除しますか？",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "この操作は取り消せません。すべてのデータがサーバーから完全に削除されます。",
    showCancelIconButton: false,
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
    title: "プロジェクトを削除しますか？",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "アイコンで操作の重要度を伝えます。",
    showCancelIconButton: false,
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
    icon: false,
    title: "プロジェクトを削除しますか？",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "削除される内容を確認してから操作します。",
    showCancelIconButton: false,
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon === true && <Trash2Icon />}
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
    icon: false,
    title: "利用規約",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "本文だけがスクロールし、見出しと操作は表示されたままです。",
    showCancelIconButton: false,
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon === true && <Trash2Icon />}
        cancel={<Button variant="naked">閉じる</Button>}
        confirm={<Button>同意する</Button>}
        trigger={<Button>利用規約を読む</Button>}
        className="mx-auto w-[calc(100%-2rem)] max-w-[80rem]"
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      >
        {LONG_TEXT.split("\n").map((line) => (
          <p key={line}>{line}</p>
        ))}
      </AlertDialog>
    );
  },
});

export const WithCancelIconButton = meta.story({
  name: "隅に閉じるアイコンを表示",
  ...ctrl({
    icon: false,
    title: "プロジェクトを削除しますか？",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "右上の閉じるアイコンからも中止できます。",
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon === true && <Trash2Icon />}
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
//         icon={props.icon === true && <Trash2Icon />}        action={<span className="text-xs text-neutral-500">自動保存済み</span>}        cancel={<Button variant="naked">キャンセル</Button>}        confirm={<Button color="red">削除する</Button>}        trigger={<Button color="red">下書きを削除</Button>}        slotProps={{
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
    icon: false,
    title: "命令的に制御されるダイアログ",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "`createHandle` で作成したハンドルから開閉できます。",
    showCancelIconButton: false,
  }),
  render(props) {
    const [handle] = React.useState(AlertDialog.createHandle);

    return (
      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            handle.open(null);
          }}
        >
          開く
        </Button>
        <Button
          variant="liquid"
          onClick={() => {
            handle.close();
          }}
        >
          閉じる
        </Button>
        <AlertDialog
          {...props}
          icon={props.icon === true && <Trash2Icon />}
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
    title: "確認コードを入力",
    radius: "md",
    variant: "default",
    outlined: true,
    description: "コードを入力しないと削除を実行できません。",
    showCancelIconButton: false,
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
          <TextField
            value={code}
            placeholder="123456"
            onValueChange={(value) => {
              setCode(value);
            }}
          />
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

const LONG_TEXT = `
利用規約

本利用規約（以下「本規約」といいます。）は、架空のサービス「Suru UI」（以下「本サービス」といいます。）の利用条件を定めるものです。本サービスは、文章、画像、音声、その他のデジタル情報を作成、保存、整理、共有することを目的として提供される架空のサービスです。本規約に記載された名称、組織、制度、手続き、料金、権利義務その他の事項は、すべてダミーデータとして作成されたものであり、実際のサービス提供、契約締結、法的義務の発生を意図するものではありません。

第1条（目的）

本規約は、本サービスの利用に関する基本的な条件を定め、利用者と本サービスの運営主体との間で想定される権利、義務、責任および手続きについて、サンプルとして説明することを目的とします。本規約は、利用規約の表示確認、文章量の検証、システムの動作確認、データベースへの登録試験、文書レイアウトの調整、その他の開発および検証作業に利用できるように作成されています。

第2条（定義）

本規約において使用する用語の意味は、次のとおりとします。

「本サービス」とは、Suru UI という名称で表現される架空の情報管理サービスをいいます。
「運営者」とは、本サービスを提供する主体として仮に設定された架空の組織をいいます。
「利用者」とは、本規約を参照し、本サービスの利用者として想定される個人または組織をいいます。
「登録情報」とは、利用者が登録画面その他の入力手段を通じて入力した情報をいいます。
「利用コンテンツ」とは、利用者が本サービス上で作成、投稿、保存または共有する文章、画像、音声、ファイルその他の情報をいいます。
「本サイト」とは、本サービスの提供画面として仮に想定されたウェブページ、アプリケーション画面および関連する表示領域をいいます。
「本システム」とは、本サービスの動作を実現するものとして仮に想定されたソフトウェア、データベース、通信機能その他の技術的構成をいいます。
「外部サービス」とは、本サービスとの連携先として例示される、第三者が提供する架空または実在のサービスをいいます。
「本データ」とは、本サービスに関連して取り扱われる情報全般をいいます。
「本規約等」とは、本規約および本サービスに関連するものとして仮に想定された各種説明文書をいいます。

第3条（本規約の適用）

本規約は、本サービスの利用に関する基本的な条件を示すものとして作成されています。実際のサービスを運営する場合には、利用者に適用される規約の範囲、適用開始時期、同意の取得方法および関連文書との優先関係を別途明確に定めるものとします。

本規約に含まれる条項は、実際の契約条件として利用されることを前提としていません。実際のサービスに適用する場合には、対象となるサービスの機能、運営体制、料金体系、個人情報の取扱いおよび適用される法令などを確認したうえで、必要な修正を行うものとします。

第4条（利用資格）

本サービスは、年齢、居住地、職業、所属組織その他の条件を限定しない架空のサービスとして設定されています。ただし、実際のサービスを提供する場合には、利用者の年齢、契約締結能力、利用環境、保護者の同意の必要性などを考慮し、適切な利用資格を定めるものとします。

利用者が本サービスの利用を開始する際には、画面に表示された説明、利用条件および操作上の注意事項を確認することが想定されています。利用者は、テスト環境においては、実在する人物の個人情報や機密情報を入力せず、必要に応じて架空の情報を使用するものとします。

第5条（利用登録）

本サービスに利用登録機能が存在すると仮定した場合、利用希望者は、所定の登録画面に必要事項を入力し、仮の登録手続きを行うものとします。登録事項には、表示名、連絡先、アカウント識別子、利用目的その他の情報が含まれる場合があります。

利用希望者は、登録画面に入力する情報がテスト用の情報であることを確認し、実際のサービスで使用する情報と混同しないように注意するものとします。登録手続きが正常に完了したことを示す表示は、サンプル画面上の動作を説明するものであり、現実のアカウント作成や契約成立を意味するものではありません。

第6条（登録情報の管理）

利用者は、登録情報を入力する場合、その内容を適切に管理することが想定されています。登録情報に誤りがある場合、サンプル画面の表示、検索結果、通知内容その他のテスト結果に影響する可能性があります。

実際のサービスにおいて登録情報の変更機能を設ける場合には、変更可能な項目、本人確認の方法、変更が反映されるまでの期間および変更後の通知方法などを別途定めるものとします。

第7条（アカウントの管理）

本サービスにアカウント機能が存在すると仮定した場合、利用者は、自らのアカウント識別子および認証情報を管理するものとします。認証情報には、パスワード、認証コード、秘密鍵その他の認証に使用する情報が含まれる場合があります。

テスト環境では、実際に利用しているパスワードや他のサービスと共通する認証情報を使用しないことを推奨します。また、認証情報をサンプル文書、公開ログ、スクリーンショットなどに記載する場合には、架空の値を使用するものとします。

第8条（サービスの内容）

本サービスは、情報の作成、編集、保存、分類、検索、共有および閲覧を支援する機能を備えた架空のサービスとして設定されています。具体的な機能として、メモ作成、フォルダー管理、タグ付け、全文検索、通知表示、共有リンク生成、履歴表示およびデータ出力などを想定します。

これらの機能は、利用規約のサンプルとして説明するために記載したものであり、実際に動作する機能の存在を保証するものではありません。機能の名称、仕様、対応形式、処理速度、利用可能な容量および対応端末などは、実際のサービスを設計する際に別途定義する必要があります。

第9条（利用料金）

本サービスは、利用料金を請求しない架空のサンプルサービスとして設定されています。ただし、利用規約のテストにおいて料金に関する条項が必要となる場合には、月額料金、年額料金、従量課金、追加機能料金、試用期間および返金条件などを例示的に設定することができます。

実際に有料サービスを提供する場合には、料金額、支払時期、決済手段、請求周期、税金の取扱い、解約後の精算方法および返金条件などを、利用者が事前に確認できる形で明示するものとします。本条は、実際の請求または支払義務を発生させるものではありません。

第10条（支払方法）

本サービスに決済機能が存在すると仮定した場合、利用者は、所定の決済画面に表示される方法を選択することが想定されています。決済方法としては、クレジットカード、銀行振込、電子決済その他の方法が例示されます。

本規約は、実際の決済処理を実行するものではありません。テスト環境において決済画面を作成する場合には、実際のカード番号、口座番号、認証コードなどの機密性の高い情報を使用せず、決済事業者が提供するテスト用の情報を使用するものとします。

第11条（禁止事項）

利用者は、本サービスの利用にあたり、次の行為を行わないものとすることが想定されています。

法令または公序良俗に反する行為。
他の利用者または第三者の権利や利益を不当に侵害する行為。
虚偽の情報を用いて他人になりすます行為。
本サービスの運営または提供を妨害する行為。
不正なアクセス、認証回避またはアクセス制御の無効化を試みる行為。
本システムに過度な負荷を与える行為。
本サービスを通じて有害なプログラムを配布する行為。
許可されていない情報を収集、複製または公開する行為。
他の利用者に対して嫌がらせ、脅迫または差別的な言動を行う行為。
本サービスの画面、名称または表示を不正に利用する行為。
運営者または第三者の知的財産権を侵害する行為。
本サービスの想定された目的を著しく逸脱する行為。
その他、実際のサービスにおいて合理的に禁止する必要があると定められた行為。

本条は、架空のサービスにおける禁止事項の記載例です。実際のサービスに適用する際には、禁止行為の定義、判断基準、調査方法および違反が確認された場合の対応を具体的に検討する必要があります。

第12条（利用コンテンツ）

利用者が本サービスに文章、画像、音声、動画、ファイルその他のコンテンツを登録する機能が存在すると仮定した場合、利用者は、当該コンテンツを適法に利用するために必要な権利を有していることを確認するものとします。

利用者は、第三者の著作物、商標、肖像、個人情報その他の権利に関係するコンテンツを取り扱う場合、その利用条件を確認することが想定されています。テスト用のデータを作成する場合には、架空の文章、独自に作成した画像および公開に問題のない素材を利用するものとします。

第13条（コンテンツの権利）

利用者が作成したコンテンツの権利は、実際のサービスにおいて別途定められる条件に従って取り扱われるものとします。本サンプルでは、利用者が作成した文章その他のコンテンツについて、運営者への権利移転が自動的に生じるものとは想定していません。

サービスの運営に必要な範囲でコンテンツの保存、表示、変換または共有を行う場合には、その目的、範囲、期間および利用者による設定変更の可否を明確にすることが望まれます。実際の規約を作成する際には、コンテンツの権利帰属とサービス提供に必要な利用許諾を区別して記載するものとします。

第14条（データの保存）

本サービスにデータ保存機能が存在すると仮定した場合、利用者は、保存した情報が常に完全な状態で維持されるとは限らないことを理解するものとします。実際のサービスでは、保存容量、保存期間、バックアップ頻度、復元手順および削除後の取扱いなどを明示する必要があります。

利用者は、重要な情報について必要に応じて別の場所にも保存し、データの消失に備えることが想定されています。ただし、本条は、実際のデータ保存機能、バックアップ機能または復元機能の存在を保証するものではありません。

第15条（個人情報の取扱い）

本サービスにおいて個人情報を取り扱う場合には、実際のサービス運営者が、取得する情報の種類、利用目的、保存期間、第三者提供の有無、安全管理措置および利用者からの問い合わせ方法などを別途明示するものとします。

本規約は、個人情報の取扱いに関する正式な説明文書ではありません。実際の個人情報を用いたテストは必要最小限にとどめ、可能な限り架空の氏名、架空の連絡先およびその他のダミーデータを使用するものとします。

第16条（情報の安全管理）

本サービスの運営にあたっては、情報への不正アクセス、情報漏えい、改ざん、破壊およびその他の事故を防止するため、適切な安全管理措置を講じることが想定されています。

安全管理措置の例として、アクセス権限の制御、認証機能の実装、通信の暗号化、ログの監視、脆弱性への対応、バックアップの作成および障害発生時の復旧手順の整備が挙げられます。これらは一般的な設計項目の例示であり、本サービスにおいて実施済みであることを示すものではありません。

第17条（通知および連絡）

本サービスに関する通知は、サービス画面への表示、電子メール、アプリケーション内の通知、その他の方法によって行われるものと仮定します。通知方法、通知の到達時点および利用者が連絡先を変更した場合の取扱いについては、実際のサービスに応じて定めるものとします。

利用者からの問い合わせについては、専用フォーム、電子メールその他の窓口を設けることが想定されています。ただし、本規約には実在する問い合わせ窓口や連絡先は設定されていません。

第18条（サービスの変更）

運営者は、実際のサービスを提供する場合、機能の改善、技術上の変更、セキュリティ上の対応その他の理由により、サービスの内容を変更することがあります。

変更によって利用者に重要な影響が生じる場合には、変更内容、実施時期および利用者に必要な対応を、適切な方法で事前に案内することが望まれます。本条は、実際のサービスの変更を予告したり、変更を実行したりするものではありません。

第19条（サービスの一時停止）

本サービスは、保守作業、障害対応、システム更新、通信環境の問題その他の理由によって、一時的に利用できなくなる場合があるものとして想定されています。

実際のサービスを運営する場合には、停止が予定されている場合の事前告知、緊急停止時の案内、利用者への影響の評価および復旧後の確認手順を定めるものとします。停止時間、復旧時間および稼働率について、具体的な保証がある場合には、その条件を別途明示する必要があります。

第20条（サービスの終了）

運営者が実際のサービスを終了する場合には、終了の理由、終了予定日、利用者が行うべき手続き、データの取得方法および保存情報の削除時期などを、状況に応じて案内するものとします。

サービスの終了に伴い、保存された情報や利用履歴が利用できなくなる可能性がある場合には、その影響について事前に説明することが望まれます。本条は、本サービスの終了を予定するものではなく、終了手続きの例を示すものです。

第21条（利用制限）

実際のサービスにおいて、利用者が本規約または別途定められた条件に違反した場合、運営者は、違反の内容、影響の程度、再発の可能性その他の事情を考慮し、必要な対応を検討することが想定されています。

対応の例として、利用者への注意喚起、一部機能の制限、コンテンツの非表示、アカウントの一時停止または利用契約の終了などが挙げられます。実際に適用する場合には、対応の要件、通知方法、異議申立ての手続きおよび利用者への影響を明確にする必要があります。

第22条（免責に関する説明）

本サンプルは、架空のサービスを題材として作成された文章であり、実際のサービスの品質、安全性、可用性、正確性または継続的な提供を保証するものではありません。

実際のサービスに免責に関する条項を設ける場合には、運営者が負う責任の範囲、免責が認められる条件、利用者に生じた損害との関係および適用される法令上の制限を慎重に検討する必要があります。免責条項を設けることによって、あらゆる責任が当然に排除されるわけではありません。

第23条（損害への対応）

実際のサービスに関連して損害が発生した場合には、損害の内容、発生原因、当事者の行為、予見可能性その他の事情に応じて、適用される法令および契約条件に基づき対応を検討するものとします。

損害賠償に関する条項を作成する際には、対象となる損害、責任の上限、例外事項および利用者の権利に関する制限について、明確かつ適切な記載を行う必要があります。本条は、特定の損害賠償責任を発生させるものではありません。

第24条（外部サービスとの連携）

本サービスに外部サービスとの連携機能が存在すると仮定した場合、利用者は、連携先のサービスに適用される利用条件やプライバシーに関する説明を確認することが想定されています。

外部サービスの仕様変更、提供停止、障害または利用条件の変更によって、本サービスの一部機能に影響が生じる場合があります。実際に連携機能を提供する場合には、情報の送信先、送信される情報の種類、連携解除の方法および障害発生時の対応を明示するものとします。

第25条（知的財産権）

本サービスの名称、ロゴ、画面デザイン、文章、プログラムおよびその他の構成要素について、実際のサービスでは、それぞれの権利者および利用条件を確認するものとします。

本規約に記載された「Suru UI」という名称および関連する説明は、ダミーサービスの例として設定されたものです。本規約の文章をテスト目的で使用する場合であっても、実在する第三者の名称、商標または素材を含める際には、その利用条件を別途確認するものとします。

第26条（規約の変更）

実際のサービスにおいて利用規約を変更する場合には、変更内容、変更理由、適用開始日および利用者への影響を確認し、必要に応じて利用者への周知や同意取得などの手続きを実施するものとします。

変更前後の規約を比較できるようにし、重要な変更については利用者が容易に把握できる形で説明することが望まれます。本条は、現在のダミー規約を実際に変更するものではありません。

第27条（契約上の地位等）

実際のサービスにおいて、利用者が利用契約上の地位または契約に基づく権利義務を第三者に移転する場合には、移転の可否、必要な手続きおよび運営者の承諾の要否などを、適用される法令に従って定めるものとします。

この条項は、契約上の地位の移転に関する一般的な記載例です。本サンプルを閲覧または利用することによって、現実の契約上の地位が発生したり、移転したりするものではありません。

第28条（条項の分離可能性）

本規約の一部の条項が、実際のサービスにおいて適用されないと判断された場合であっても、他の条項の取扱いについては、適用される法令および個別の事情を踏まえて検討するものとします。

ただし、特定の条項が無効または適用不能となった場合に他の条項がどのような効力を有するかについては、具体的な事情によって異なる可能性があります。本条は、いかなる場合にも他の条項の効力が維持されることを保証するものではありません。

第29条（準拠法および紛争への対応）

実際のサービスにおいて準拠法や紛争解決に関する条項を設ける場合には、サービスの提供地域、利用者の属性、適用される法令およびその他の事情を踏まえ、適切な条件を定めるものとします。

紛争が生じた場合には、当事者間での協議、問い合わせ窓口への連絡、第三者機関の利用その他の方法による解決が検討される場合があります。本サンプルは、特定の裁判所、法域または紛争解決機関を指定するものではありません。

第30条（問い合わせ）

本サービスに関する問い合わせ窓口を設ける場合には、窓口の名称、受付方法、対応時間、必要な情報および回答までの目安を利用者に案内するものとします。

問い合わせを受け付ける際には、利用者が送信する情報の内容と利用目的を明確にし、不要な個人情報や機密情報を収集しないよう配慮することが望まれます。本サンプルには、実在する問い合わせ先、電話番号または電子メールアドレスは含まれていません。

第31条（利用者へのお願い）

利用者は、本サービスのテストを行う場合、入力データの内容、操作手順、表示結果およびエラーの発生状況を確認し、必要に応じて記録するものとします。

テスト結果を共有する場合には、個人情報、認証情報、機密情報および第三者の権利に関係する情報が含まれていないことを確認するものとします。また、テスト環境と本番環境が存在する場合には、両者を混同しないように注意し、実際のデータに意図しない変更を加えないようにすることが望まれます。

第32条（本規約の位置付け）

本規約は、利用規約の構成、文章量、条番号、段落構成、長文表示およびデータ処理の検証などに使用するための架空の文章です。記載された条項は、実在するサービスの提供条件や、特定の組織が実際に採用している規則を示すものではありません。

本規約に含まれる例示、仮定、説明および手続きは、実際のサービスにおいてそのまま実施できることを保証するものではありません。実際の利用規約として使用する場合には、対象サービスの内容、適用される法令、事業上の要件および利用者保護の観点から、専門家による確認を含む適切な見直しを行う必要があります。

第33条（施行日および改訂履歴）

本規約のサンプル作成日は、2026年10月20日と仮定します。この日付は、文書管理やテストデータの識別に利用するための仮の日付であり、実際の契約条件の適用開始日を示すものではありません。

改訂履歴の例として、初版を「バージョン1.0」、文章構成を変更した版を「バージョン1.1」、条項の追加を行った版を「バージョン1.2」として管理する方法が考えられます。実際に文書を管理する場合には、改訂日、改訂者、変更箇所、変更理由および承認状況などを記録することが望まれます。

第34条（最終確認）

本規約をテストデータとして使用する者は、文書の内容が架空のものであることを理解し、実際の利用契約、料金請求、アカウント登録、個人情報の取得またはサービス提供の根拠として扱わないものとします。

本規約の内容を編集、複製、分割、並べ替えまたは別のテスト文書に組み込む場合には、用途に応じて必要な変更を行うことができます。テスト目的に適した文章量、文字種、改行数、条番号および記号の使用状況を確認し、必要に応じて追加のダミーデータを作成するものとします。

以上をもって、架空サービス「Suru UI」のダミー利用規約を終了します。

本書はサンプルデータであり、実在するサービスの利用規約ではありません。実際の権利義務、契約関係または法的責任を定めることを目的としたものではありません。
`;
