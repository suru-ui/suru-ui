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

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: false,
    arrow: false,
    label: "果物",
    placeholder: "果物を選択",
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
    disabled: false,
    multiple: false,
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

export const Multiple = meta.story({
  name: "複数選択",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: true,
    label: "言語",
    placeholder: "言語を追加",
    items: ["TypeScript", "Rust", "Go", "Python"],
  }),
  render(props) {
    return <Combobox {...props} multiple className="w-[300px]" defaultValue={["TypeScript"]} />;
  },
});

// export const Grouped = meta.story({
//   name: "グループ化",
//   ...ctrl({
//     variant: "liquid",
//     color: "grey",
//     size: "md",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     multiple: false,
//     placeholder: "食材を選択",
//   }),
//   render(props) {
//     return (
//       <Combobox
//         {...props}
//         items={[
//           { label: "果物", items: ["りんご", "ばなな", "みかん"] },
//           { label: "野菜", items: ["にんじん", "きゅうり", "トマト"] },
//         ]}
//         label="食材"
//         className="w-[300px]"
//         placeholder="食材を選択"
//       />
//     );
//   },
// });

// export const Sizes = meta.story({
//   name: "大きさ",
//   ...ctrl({
//     items: fruits,
//     variant: "liquid",
//     color: "grey",
//     radius: undefined,
//     outlined: false,
//     disabled: false,
//     multiple: false,
//     placeholder: "選択",
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-3">
//         {SIZES.map((size) => (
//           <div key={size}>
//             <Combobox {...props} size={size} items={fruits} className="w-[200px]" />
//             <div>{size}</div>
//           </div>
//         ))}
//       </div>
//     );
//   },
// });

export const Colors = meta.story({
  name: "配色",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: true,
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

// export const Radii = meta.story({
//   name: "角丸",
//   ...ctrl({
//     items: fruits,
//     variant: "liquid",
//     color: "grey",
//     size: "md",
//     outlined: false,
//     disabled: false,
//     multiple: false,
//     placeholder: "選択",
//   }),
//   render(props) {
//     return (
//       <div className="flex flex-col gap-3">
//         {RADII.map((radius) => (
//           <div key={radius}>
//             <Combobox {...props} radius={radius} className="w-[200px]" />
//             <div>{radius}</div>
//           </div>
//         ))}
//       </div>
//     );
//   },
// });
