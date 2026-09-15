import * as theme from "@suru-ui/theme";
// import {
//   CopyIcon,
//   PlusIcon,
//   FilesIcon,
//   PencilIcon,
//   Share2Icon,
//   Trash2Icon,
//   ScissorsIcon,
//   ClipboardPasteIcon,
// } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
// import cn from "../src/cn.js";
import { Menu } from "../src/menu/index.js";

const SIZES: readonly Menu.Size[] = theme.SIZES;
const RADII: readonly Menu.Radius[] = ["none", ...SIZES];
const VARIANTS: readonly Menu.Variant[] = theme.COLOR_TEMPLATES;

const meta = preview.meta({
  title: "Menu",
  component: Menu,
});

export default meta;

const ctrl = controls(Menu, {
  disabled: {
    control: "boolean",
  },
  modal: {
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
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: [
      {
        label: "新規作成",
      },
      {
        label: "開く",
      },
      {
        type: "separator",
      },
      {
        label: "閉じる",
      },
    ],
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    modal: true,
  }),
  render(props) {
    return <Menu {...props} trigger={<Button>ファイル</Button>} />;
  },
});

// export const Nested = meta.story({
//   name: "サブメニュー",
//   ...ctrl({
//     items: [
//       {
//         label: "編集",
//       },
//       {
//         label: "共有",
//         items: [
//           {
//             label: "リンクをコピー",
//           },
//           {
//             label: "メールで送る",
//           },
//         ],
//       },
//     ],
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     return <Menu {...props} trigger={<Button>操作</Button>} />;
//   },
// });

// export const CheckboxItems = meta.story({
//   name: "チェック項目",
//   ...ctrl({
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     const [showSidebar, setShowSidebar] = React.useState(true);
//     const [showMinimap, setShowMinimap] = React.useState(false);

//     return (
//       <Menu
//         {...props}
//         items={[
//           {
//             type: "checkbox",
//             label: "サイドバー",
//             checked: showSidebar,
//             onCheckedChange: setShowSidebar,
//           },
//           {
//             type: "checkbox",
//             label: "ミニマップ",
//             checked: showMinimap,
//             onCheckedChange: setShowMinimap,
//           },
//         ]}
//         trigger={<Button>表示</Button>}
//       />
//     );
//   },
// });

// export const RadioItems = meta.story({
//   name: "ラジオ項目",
//   ...ctrl({
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     const [value, setValue] = React.useState("name");

//     return (
//       <Menu
//         {...props}
//         items={[
//           {
//             type: "radio-group",
//             value,
//             onValueChange: setValue,
//             items: [
//               {
//                 type: "radio",
//                 label: "名前",
//                 value: "name",
//               },
//               {
//                 type: "radio",
//                 label: "日付",
//                 value: "date",
//               },
//             ],
//           },
//         ]}
//         trigger={<Button>並べ替え</Button>}
//       />
//     );
//   },
// });

// export const Groups = meta.story({
//   name: "グループ",
//   ...ctrl({
//     items: [
//       {
//         type: "group",
//         label: "アカウント",
//         items: [
//           {
//             label: "プロフィール",
//           },
//           {
//             label: "設定",
//           },
//         ],
//       },
//       {
//         type: "separator",
//       },
//       {
//         type: "group",
//         label: "チーム",
//         items: [
//           {
//             label: "新しいチーム",
//           },
//           {
//             label: "メンバーを招待",
//           },
//         ],
//       },
//       {
//         type: "separator",
//       },
//       {
//         type: "group",
//         items: [
//           {
//             label: "ログアウト",
//           },
//         ],
//       },
//     ],
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     return <Menu {...props} trigger={<Button>メニュー</Button>} />;
//   },
// });

// export const Shortcuts = meta.story({
//   name: "ショートカット",
//   ...ctrl({
//     items: [
//       {
//         label: (
//           <>
//             コピー
//             <Shortcut>⌘C</Shortcut>
//           </>
//         ),
//       },
//       {
//         label: (
//           <>
//             貼り付け
//             <Shortcut>⌘V</Shortcut>
//           </>
//         ),
//       },
//       {
//         type: "separator",
//       },
//       {
//         label: (
//           <>
//             すべて選択
//             <Shortcut>⌘A</Shortcut>
//           </>
//         ),
//       },
//     ],
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     return <Menu {...props} trigger={<Button>編集</Button>} />;
//   },
// });

// export const LinkItems = meta.story({
//   name: "リンク項目",
//   ...ctrl({
//     items: [
//       {
//         type: "link",
//         label: "ドキュメント",
//         href: "https://example.com/docs",
//       },
//       {
//         type: "link",
//         label: "サポート",
//         href: "https://example.com/support",
//       },
//       {
//         type: "separator",
//       },
//       {
//         type: "link",
//         label: "外部サイト",
//         href: "https://example.com",
//       },
//     ],
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     return <Menu {...props} trigger={<Button>ヘルプ</Button>} />;
//   },
// });

// export const Sizes = meta.story({
//   name: "大きさ",
//   ...ctrl({
//     items: [
//       {
//         label: "編集",
//       },
//       {
//         label: "複製",
//       },
//       {
//         type: "separator",
//       },
//       {
//         label: "削除",
//         color: "red",
//       },
//     ],
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-4">
//         {SIZES.map((size) => (
//           <div key={size}>
//             <p className="mb-2 text-sm">{size}</p>
//             <Menu {...props} size={size} trigger={<Button>操作</Button>} />
//           </div>
//         ))}
//       </div>
//     );
//   },
// });

// export const Outlined = meta.story({
//   name: "枠線",
//   ...ctrl({
//     items: [
//       {
//         label: "編集",
//       },
//       {
//         label: "複製",
//       },
//     ],
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-4">
//         <div>
//           <p className="mb-2 text-sm">なし</p>
//           <Menu {...props} trigger={<Button>操作</Button>} />
//         </div>
//         <div>
//           <p className="mb-2 text-sm">あり</p>
//           <Menu {...props} trigger={<Button>操作</Button>} outlined />
//         </div>
//       </div>
//     );
//   },
// });

// export const DisabledItems = meta.story({
//   name: "無効項目",
//   ...ctrl({
//     items: [
//       {
//         label: "編集",
//       },
//       {
//         label: "複製",
//         disabled: true,
//       },
//       {
//         type: "separator",
//       },
//       {
//         type: "checkbox",
//         label: "サイドバー",
//         checked: true,
//         disabled: true,
//         onCheckedChange: () => {},
//       },
//       {
//         label: "削除",
//         color: "red",
//         disabled: true,
//       },
//     ],
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     modal: true,
//   }),
//   render(props) {
//     return <Menu {...props} trigger={<Button>操作</Button>} />;
//   },
// });

// export const LongList = meta.story({
//   name: "長い一覧",
//   ...ctrl({
//     items: Array.from({ length: 30 }, (_, index) => ({
//       label: `項目 ${index + 1}`,
//     })),
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     return <Menu {...props} trigger={<Button>選択</Button>} />;
//   },
// });

// export const Sides = meta.story({
//   name: "配置",
//   ...ctrl({
//     items: [
//       {
//         label: "編集",
//       },
//       {
//         label: "共有",
//         items: [
//           {
//             label: "リンクをコピー",
//           },
//           {
//             label: "メールで送る",
//           },
//         ],
//       },
//     ],
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-4">
//         <div>
//           <p className="mb-2 text-sm">既定</p>
//           <Menu {...props} trigger={<Button>操作</Button>} />
//         </div>
//         <div>
//           <p className="mb-2 text-sm">sideOffset + align</p>
//           <Menu
//             {...props}
//             trigger={<Button>操作</Button>}
//             slotProps={{
//               positioner: {
//                 sideOffset: 24,
//                 align: "end",
//               },
//             }}
//           />
//         </div>
//       </div>
//     );
//   },
// });

// export const FileActions = meta.story({
//   name: "実践例：ファイル操作",
//   ...ctrl({
//     items: [
//       {
//         label: (
//           <>
//             <span className="flex items-center gap-2">
//               <PlusIcon />
//               新規ファイル
//             </span>
//             <Shortcut>⌘N</Shortcut>
//           </>
//         ),
//       },
//       {
//         label: (
//           <>
//             <span className="flex items-center gap-2">
//               <PencilIcon />
//               名前を変更
//             </span>
//             <Shortcut>F2</Shortcut>
//           </>
//         ),
//       },
//       {
//         label: (
//           <>
//             <span className="flex items-center gap-2">
//               <FilesIcon />
//               複製
//             </span>
//             <Shortcut>⌘D</Shortcut>
//           </>
//         ),
//       },
//       {
//         type: "separator",
//       },
//       {
//         label: (
//           <>
//             <span className="flex items-center gap-2">
//               <CopyIcon />
//               切り取り
//             </span>
//             <Shortcut>⌘X</Shortcut>
//           </>
//         ),
//       },
//       {
//         label: (
//           <>
//             <span className="flex items-center gap-2">
//               <ClipboardPasteIcon />
//               貼り付け
//             </span>
//             <Shortcut>⌘V</Shortcut>
//           </>
//         ),
//         disabled: true,
//       },
//       {
//         type: "separator",
//       },
//       {
//         label: (
//           <span className="flex items-center gap-2">
//             <Share2Icon />
//             共有
//           </span>
//         ),
//         items: [
//           {
//             label: "リンクをコピー",
//           },
//           {
//             label: "メールで送る",
//           },
//         ],
//       },
//       {
//         type: "separator",
//       },
//       {
//         label: (
//           <span className="flex items-center gap-2">
//             <Trash2Icon />
//             削除
//           </span>
//         ),
//         color: "red",
//       },
//     ],
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     return <Menu {...props} trigger={<Button>ファイル</Button>} />;
//   },
// });

// export const TextEdit = meta.story({
//   name: "実践例：テキスト編集",
//   ...ctrl({
//     items: [
//       {
//         label: (
//           <>
//             <span className="flex items-center gap-2">
//               <ScissorsIcon />
//               切り取り
//             </span>
//             <Shortcut>⌘X</Shortcut>
//           </>
//         ),
//       },
//       {
//         label: (
//           <>
//             <span className="flex items-center gap-2">
//               <CopyIcon />
//               コピー
//             </span>
//             <Shortcut>⌘C</Shortcut>
//           </>
//         ),
//       },
//       {
//         label: (
//           <>
//             <span className="flex items-center gap-2">
//               <ClipboardPasteIcon />
//               貼り付け
//             </span>
//             <Shortcut>⌘V</Shortcut>
//           </>
//         ),
//         disabled: true,
//       },
//       {
//         type: "separator",
//       },
//       {
//         label: (
//           <>
//             すべて選択
//             <Shortcut>⌘A</Shortcut>
//           </>
//         ),
//       },
//     ],
//     variant: "naked",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     modal: true,
//   }),
//   render(props) {
//     return <Menu {...props} trigger={<Button>編集</Button>} />;
//   },
// });

// function Shortcut(props: React.ComponentProps<"kbd">) {
//   const { className, ...otherProps } = props;

//   return <kbd {...otherProps} className={cn(className, "text-xs opacity-60")} />;
// }
