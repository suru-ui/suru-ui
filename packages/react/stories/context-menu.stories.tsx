import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import cn from "../src/cn.js";
import { ContextMenu } from "../src/context-menu/index.js";
// import * as ContextMenuParts from "../src/context-menu/index.js";

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
  highlightItemOnHover: {
    control: "boolean",
  },
  items: {
    control: "object",
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
    disabled: false,
    highlightItemOnHover: true,
    items: [
      {
        label: "編集",
      },
      {
        label: "複製",
      },
      {
        label: "削除",
      },
    ],
    outlined: false,
    radius: undefined,
    size: "md",
  }),
  render(props) {
    return <ContextMenu {...props} trigger={<TriggerArea />} />;
  },
});

// export const CheckboxItems = meta.story({
//   name: "チェック項目",
//   ...ctrl({}),
//   render() {
//     const [showSidebar, setShowSidebar] = React.useState(true);
//     const [showMinimap, setShowMinimap] = React.useState(false);

//     return (
//       <ContextMenu trigger={<TriggerArea />}>
//         <ContextMenuParts.CheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
//           <ContextMenuParts.CheckboxItemIndicator>✓</ContextMenuParts.CheckboxItemIndicator>
//           サイドバー
//         </ContextMenuParts.CheckboxItem>
//         <ContextMenuParts.CheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
//           <ContextMenuParts.CheckboxItemIndicator>✓</ContextMenuParts.CheckboxItemIndicator>
//           ミニマップ
//         </ContextMenuParts.CheckboxItem>
//       </ContextMenu>
//     );
//   },
// });

export const Nested = meta.story({
  name: "サブメニュー",
  ...ctrl({}),
  render() {
    return (
      <ContextMenu
        trigger={<TriggerArea />}
        items={[
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
        ]}
      />
    );
  },
});

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
