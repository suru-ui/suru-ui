import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Menu } from "../src/menu/index.js";
import * as MenuParts from "../src/menu/index.js";

const meta = preview.meta({
  title: "Overlays / Menu",
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
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    disabled: false,
    modal: true,
  }),
  render(props) {
    return (
      <Menu {...props} trigger={<Button>ファイル</Button>}>
        <MenuParts.Item>新規作成</MenuParts.Item>
        <MenuParts.Item>開く</MenuParts.Item>
        <MenuParts.Separator />
        <MenuParts.Item>閉じる</MenuParts.Item>
      </Menu>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ",
  ...ctrl({}),
  render() {
    const handle = MenuParts.createHandle();

    return (
      <MenuParts.Root handle={handle}>
        <MenuParts.Trigger handle={handle}>
          {(props) => (
            <button type="button" {...props}>
              操作
            </button>
          )}
        </MenuParts.Trigger>
        <MenuParts.Portal>
          <MenuParts.Positioner>
            <MenuParts.Popup>
              <MenuParts.Item>編集</MenuParts.Item>
              <MenuParts.Item>複製</MenuParts.Item>
            </MenuParts.Popup>
          </MenuParts.Positioner>
        </MenuParts.Portal>
      </MenuParts.Root>
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
      <Menu trigger={<Button>表示</Button>}>
        <MenuParts.CheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
          <MenuParts.CheckboxItemIndicator>✓</MenuParts.CheckboxItemIndicator>
          サイドバー
        </MenuParts.CheckboxItem>
        <MenuParts.CheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
          <MenuParts.CheckboxItemIndicator>✓</MenuParts.CheckboxItemIndicator>
          ミニマップ
        </MenuParts.CheckboxItem>
      </Menu>
    );
  },
});

export const RadioItems = meta.story({
  name: "ラジオ項目",
  ...ctrl({}),
  render() {
    const [value, setValue] = React.useState("name");

    return (
      <Menu trigger={<Button>並べ替え</Button>}>
        <MenuParts.RadioGroup value={value} onValueChange={setValue}>
          <MenuParts.GroupLabel>並べ替え</MenuParts.GroupLabel>
          <MenuParts.RadioItem value="name">
            <MenuParts.RadioItemIndicator>✓</MenuParts.RadioItemIndicator>
            名前
          </MenuParts.RadioItem>
          <MenuParts.RadioItem value="date">
            <MenuParts.RadioItemIndicator>✓</MenuParts.RadioItemIndicator>
            日付
          </MenuParts.RadioItem>
        </MenuParts.RadioGroup>
      </Menu>
    );
  },
});

export const Nested = meta.story({
  name: "サブメニュー",
  ...ctrl({}),
  render() {
    return (
      <Menu trigger={<Button>操作</Button>}>
        <MenuParts.Item>編集</MenuParts.Item>
        <MenuParts.SubmenuRoot>
          <MenuParts.SubmenuTrigger>
            共有
            <span aria-hidden="true">›</span>
          </MenuParts.SubmenuTrigger>
          <MenuParts.Portal>
            <MenuParts.Positioner sideOffset={4}>
              <MenuParts.Popup>
                <MenuParts.Item>リンクをコピー</MenuParts.Item>
                <MenuParts.Item>メールで送る</MenuParts.Item>
              </MenuParts.Popup>
            </MenuParts.Positioner>
          </MenuParts.Portal>
        </MenuParts.SubmenuRoot>
      </Menu>
    );
  },
});
