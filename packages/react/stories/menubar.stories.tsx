import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Menu } from "../src/menu/index.js";
import * as MenuParts from "../src/menu/index.js";
import { Menubar } from "../src/menubar/index.js";

const meta = preview.meta({
  title: "Menubar",
  component: Menubar,
});

export default meta;

const ctrl = controls(Menubar, {
  disabled: {
    control: "boolean",
  },
  loopFocus: {
    control: "boolean",
  },
  modal: {
    control: "boolean",
  },
  orientation: {
    control: "select",
    options: ["horizontal", "vertical"],
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <Menubar {...props}>
        <Menu trigger={<Button variant="naked">ファイル</Button>}>
          <MenuParts.Item>新規作成</MenuParts.Item>
          <MenuParts.Item>開く</MenuParts.Item>
          <MenuParts.Separator />
          <MenuParts.Item>閉じる</MenuParts.Item>
        </Menu>
        <Menu trigger={<Button variant="naked">編集</Button>}>
          <MenuParts.Item>切り取り</MenuParts.Item>
          <MenuParts.Item>コピー</MenuParts.Item>
          <MenuParts.Item>貼り付け</MenuParts.Item>
        </Menu>
        <Menu trigger={<Button variant="naked">表示</Button>}>
          <MenuParts.Item>拡大</MenuParts.Item>
          <MenuParts.Item>縮小</MenuParts.Item>
        </Menu>
      </Menubar>
    );
  },
});

export const Vertical = meta.story({
  name: "垂直方向",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
    orientation: "vertical",
  }),
  render(props) {
    return (
      <Menubar {...props}>
        <Menu trigger={<Button variant="naked">ファイル</Button>}>
          <MenuParts.Item>新規作成</MenuParts.Item>
          <MenuParts.Item>開く</MenuParts.Item>
        </Menu>
        <Menu trigger={<Button variant="naked">編集</Button>}>
          <MenuParts.Item>コピー</MenuParts.Item>
          <MenuParts.Item>貼り付け</MenuParts.Item>
        </Menu>
      </Menubar>
    );
  },
});
