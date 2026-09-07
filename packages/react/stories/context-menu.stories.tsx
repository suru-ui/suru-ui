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
        type: "separator",
      },
      {
        label: "削除",
        color: "red",
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

export const Nested = meta.story({
  name: "サブメニュー",
  ...ctrl({}),
  render() {
    return (
      <ContextMenu
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
        trigger={<TriggerArea />}
      />
    );
  },
});

export const CheckboxItems = meta.story({
  name: "チェック項目",
  ...ctrl({}),
  render() {
    const [showSidebar, setShowSidebar] = React.useState(true);
    const [showMinimap, setShowMinimap] = React.useState(false);

    return (
      <ContextMenu
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
  ...ctrl({}),
  render() {
    const [value, setValue] = React.useState("name");

    return (
      <ContextMenu
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
