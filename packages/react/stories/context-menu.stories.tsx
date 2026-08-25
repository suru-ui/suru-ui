import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import cn from "../src/cn.js";
import { ContextMenu } from "../src/context-menu/index.js";
import * as ContextMenuParts from "../src/context-menu/index.js";

const meta = preview.meta({
  title: "Overlays / ContextMenu",
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
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    disabled: false,
    highlightItemOnHover: true,
  }),
  render(props) {
    return (
      <ContextMenu {...props} trigger={<TriggerArea />}>
        <ContextMenuParts.Item>編集</ContextMenuParts.Item>
        <ContextMenuParts.Item>複製</ContextMenuParts.Item>
        <ContextMenuParts.Separator />
        <ContextMenuParts.Item>削除</ContextMenuParts.Item>
      </ContextMenu>
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
      <ContextMenu trigger={<TriggerArea />}>
        <ContextMenuParts.CheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
          <ContextMenuParts.CheckboxItemIndicator>✓</ContextMenuParts.CheckboxItemIndicator>
          サイドバー
        </ContextMenuParts.CheckboxItem>
        <ContextMenuParts.CheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
          <ContextMenuParts.CheckboxItemIndicator>✓</ContextMenuParts.CheckboxItemIndicator>
          ミニマップ
        </ContextMenuParts.CheckboxItem>
      </ContextMenu>
    );
  },
});

export const Nested = meta.story({
  name: "サブメニュー",
  ...ctrl({}),
  render() {
    return (
      <ContextMenu trigger={<TriggerArea />}>
        <ContextMenuParts.Item>編集</ContextMenuParts.Item>
        <ContextMenuParts.SubmenuRoot>
          <ContextMenuParts.SubmenuTrigger>
            共有
            <span aria-hidden="true">›</span>
          </ContextMenuParts.SubmenuTrigger>
          <ContextMenuParts.Portal>
            <ContextMenuParts.Positioner sideOffset={4}>
              <ContextMenuParts.Popup>
                <ContextMenuParts.Item>リンクをコピー</ContextMenuParts.Item>
                <ContextMenuParts.Item>メールで送る</ContextMenuParts.Item>
              </ContextMenuParts.Popup>
            </ContextMenuParts.Positioner>
          </ContextMenuParts.Portal>
        </ContextMenuParts.SubmenuRoot>
      </ContextMenu>
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
