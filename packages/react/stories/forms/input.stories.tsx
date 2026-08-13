import { COLORS, SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Input } from "../../src/forms/input/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

const meta = preview.meta({
  title: "Forms / Input",
  component: Input,
});

export default meta;

const ctrl = controls(Input, {
  color: {
    options: COLORS,
    control: "select",
  },
  disabled: {
    control: "boolean",
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

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "田中 太郎",
  }),
  render(props) {
    return <Input {...props} className="w-64" />;
  },
});

// export const Variants = meta.story({
//   name: "バリエーション",
//   ...ctrl({
//     accentColor: "grey",
//     size: "md",
//     radius: "rounded",
//     outlined: undefined,
//     disabled: false,
//     placeholder: "田中 太郎",
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-3">
//         <Input {...props} variant="naked" className="w-64" />
//         <Input {...props} variant="liquid" className="w-64" />
//       </div>
//     );
//   },
// });

// export const Outlined = meta.story({
//   name: "枠線",
//   ...ctrl({
//     accentColor: "grey",
//     size: "md",
//     radius: "rounded",
//     outlined: true,
//     disabled: false,
//     placeholder: "田中 太郎",
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-3">
//         <Input {...props} variant="naked" className="w-64" />
//         <Input {...props} variant="liquid" className="w-64" />
//       </div>
//     );
//   },
// });

// export const AccentColors = meta.story({
//   name: "アクセントカラー",
//   ...ctrl({
//     variant: "naked",
//     size: "md",
//     radius: "rounded",
//     outlined: undefined,
//     disabled: false,
//     placeholder: "田中 太郎",
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-3">
//         {COLORS.map((color) => (
//           <Input key={color} {...props} accentColor={color} className="w-64" />
//         ))}
//       </div>
//     );
//   },
// });

// export const Sizes = meta.story({
//   name: "大きさ",
//   ...ctrl({
//     variant: "naked",
//     accentColor: "grey",
//     radius: "rounded",
//     outlined: undefined,
//     disabled: false,
//     placeholder: "田中 太郎",
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-3">
//         {SIZES.map((size) => (
//           <div key={size}>
//             <Input {...props} size={size} className="w-64" />
//             <div>{size}</div>
//           </div>
//         ))}
//       </div>
//     );
//   },
// });

// export const Radius = meta.story({
//   name: "角丸",
//   ...ctrl({
//     variant: "naked",
//     accentColor: "grey",
//     size: "md",
//     outlined: undefined,
//     disabled: false,
//     placeholder: "田中 太郎",
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-3">
//         {(["none", "rounded", "full"] as const).map((radius) => (
//           <div key={radius}>
//             <Input {...props} radius={radius} className="w-64" />
//             <div>{radius}</div>
//           </div>
//         ))}
//       </div>
//     );
//   },
// });

// export const Filled = meta.story({
//   name: "入力済み",
//   ...ctrl({
//     variant: "naked",
//     accentColor: "grey",
//     size: "md",
//     radius: "rounded",
//     outlined: undefined,
//     disabled: false,
//     placeholder: "田中 太郎",
//   }),
//   render(props) {
//     return <Input {...props} defaultValue="田仲 太郎" className="w-64" />;
//   },
// });

// export const Controlled = meta.story({
//   name: "制御",
//   ...ctrl({
//     variant: "naked",
//     accentColor: "grey",
//     size: "md",
//     radius: "rounded",
//     outlined: undefined,
//     disabled: false,
//     placeholder: "田中 太郎",
//   }),
//   render(props) {
//     const [value, setValue] = React.useState("");

//     return (
//       <div className="flex w-64 flex-col items-start gap-2">
//         <Input {...props} value={value} onValueChange={setValue} className="w-64" />
//         <p className="text-sm opacity-80">入力中: {value}</p>
//       </div>
//     );
//   },
// });

// export const Invalid = meta.story({
//   name: "エラー",
//   ...ctrl({
//     variant: "naked",
//     accentColor: "grey",
//     size: "md",
//     radius: "rounded",
//     outlined: undefined,
//     disabled: false,
//     placeholder: "田中 太郎",
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-3">
//         <Field.Root invalid>
//           <Input {...props} defaultValue="不正な値" className="w-64" />
//         </Field.Root>
//         <form className="flex w-64 flex-col items-start gap-2">
//           <Field.Root>
//             <Input {...props} required className="w-64" />
//           </Field.Root>
//           <button type="submit" className="underline">
//             送信
//           </button>
//           <p className="text-sm opacity-80">送信を試みると検証が適用されます</p>
//         </form>
//       </div>
//     );
//   },
// });

// export const Disabled = meta.story({
//   name: "無効",
//   ...ctrl({
//     variant: "naked",
//     accentColor: "grey",
//     size: "md",
//     radius: "rounded",
//     outlined: undefined,
//     placeholder: "田中 太郎",
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-3">
//         <Input {...props} disabled defaultValue="田仲 太郎" className="w-64" />
//         <Input {...props} disabled placeholder="田中 太郎" className="w-64" />
//       </div>
//     );
//   },
// });
