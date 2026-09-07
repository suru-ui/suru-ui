import * as React from "react";

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

const fileItems = (
  <React.Fragment>
    <MenuParts.Item>新規作成</MenuParts.Item>
    <MenuParts.Item>開く</MenuParts.Item>
    <MenuParts.Separator />
    <MenuParts.Item>閉じる</MenuParts.Item>
  </React.Fragment>
);

const editItems = (
  <React.Fragment>
    <MenuParts.Item>切り取り</MenuParts.Item>
    <MenuParts.Item>コピー</MenuParts.Item>
    <MenuParts.Item>貼り付け</MenuParts.Item>
  </React.Fragment>
);

const viewItems = (
  <React.Fragment>
    <MenuParts.Item>拡大</MenuParts.Item>
    <MenuParts.Item>縮小</MenuParts.Item>
  </React.Fragment>
);

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
    orientation: "horizontal",
    items: [
      { label: "ファイル", children: fileItems },
      { label: "編集", children: editItems },
      { label: "表示", children: viewItems },
    ],
  }),
  render(props) {
    return <Menubar {...props} />;
  },
});

export const Children = meta.story({
  name: "子要素の直接指定",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <Menubar {...props}>
        <Menu trigger={<Button variant="naked">ファイル</Button>}>{fileItems}</Menu>
        <Menu trigger={<Button variant="naked">編集</Button>}>{editItems}</Menu>
        <Menu trigger={<Button variant="naked">表示</Button>}>{viewItems}</Menu>
      </Menubar>
    );
  },
});

export const Orientations = meta.story({
  name: "向き",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
  }),
  render(props) {
    const items = [
      { label: "ファイル", children: fileItems },
      { label: "編集", children: editItems },
      { label: "表示", children: viewItems },
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-1">
          <span>horizontal</span>
          <Menubar {...props} items={items} orientation="horizontal" />
        </div>
        <div className="flex flex-col items-start gap-1">
          <span>vertical</span>
          <Menubar {...props} items={items} orientation="vertical" />
        </div>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    disabled: true,
    loopFocus: true,
    modal: true,
    orientation: "horizontal",
    items: [
      { label: "ファイル", children: fileItems },
      { label: "編集", children: editItems },
      { label: "表示", children: viewItems },
    ],
  }),
  render(props) {
    return <Menubar {...props} />;
  },
});

export const Empty = meta.story({
  name: "空",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
    orientation: "horizontal",
    items: [],
  }),
  render(props) {
    return <Menubar {...props} />;
  },
});

export const LongLabels = meta.story({
  name: "長いラベル",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
    orientation: "horizontal",
    items: [
      { label: "とても長いメニュー名のファイル操作", children: fileItems },
      { label: "とても長いメニュー名の編集操作", children: editItems },
      { label: "表示", children: viewItems },
    ],
  }),
  render(props) {
    return (
      <div style={{ maxWidth: "320px" }}>
        <Menubar {...props} />
      </div>
    );
  },
});

export const ManyMenus = meta.story({
  name: "多数のメニュー",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
    orientation: "horizontal",
  }),
  render(props) {
    const items = Array.from({ length: 10 }, (_, index) => ({
      label: `メニュー${index + 1}`,
      children: (
        <React.Fragment>
          <MenuParts.Item>{`項目1`}</MenuParts.Item>
          <MenuParts.Item>{`項目2`}</MenuParts.Item>
        </React.Fragment>
      ),
    }));

    return (
      <div style={{ maxWidth: "480px" }}>
        <Menubar {...props} items={items} />
      </div>
    );
  },
});

export const CustomRenderer = meta.story({
  name: "カスタムレンダラー",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
    orientation: "horizontal",
  }),
  render(props) {
    return (
      <Menubar
        {...props}
        items={["ファイル", "編集", "表示"]}
        slotProps={{ menu: { modal: true } }}
      >
        {(label, index) => (
          <Menu key={index} trigger={<Button variant="naked">{label}</Button>}>
            <MenuParts.Item>{`${label}の項目1`}</MenuParts.Item>
            <MenuParts.Item>{`${label}の項目2`}</MenuParts.Item>
          </Menu>
        )}
      </Menubar>
    );
  },
});

export const EditorMenu = meta.story({
  name: "実UIパターン",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
    orientation: "horizontal",
  }),
  render(props) {
    const [showSidebar, setShowSidebar] = React.useState(true);

    return (
      <Menubar
        {...props}
        items={[
          {
            label: "ファイル",
            children: (
              <React.Fragment>
                <MenuParts.Item>新規作成</MenuParts.Item>
                <MenuParts.Item>開く</MenuParts.Item>
                <MenuParts.Separator />
                <MenuParts.Item>保存</MenuParts.Item>
                <MenuParts.Item>閉じる</MenuParts.Item>
              </React.Fragment>
            ),
          },
          {
            label: "編集",
            children: (
              <React.Fragment>
                <MenuParts.Item>元に戻す</MenuParts.Item>
                <MenuParts.Item>やり直し</MenuParts.Item>
                <MenuParts.Separator />
                <MenuParts.Item>切り取り</MenuParts.Item>
                <MenuParts.Item>コピー</MenuParts.Item>
                <MenuParts.Item>貼り付け</MenuParts.Item>
              </React.Fragment>
            ),
          },
          {
            label: "表示",
            children: (
              <React.Fragment>
                <MenuParts.CheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
                  <MenuParts.CheckboxItemIndicator>✓</MenuParts.CheckboxItemIndicator>
                  サイドバー
                </MenuParts.CheckboxItem>
                <MenuParts.Separator />
                <MenuParts.Item>拡大</MenuParts.Item>
                <MenuParts.Item>縮小</MenuParts.Item>
              </React.Fragment>
            ),
          },
        ]}
      />
    );
  },
});

export const Keyboard = meta.story({
  name: "キーボード操作",
  ...ctrl({
    disabled: false,
    modal: true,
    orientation: "horizontal",
  }),
  render(props) {
    const items = [
      { label: "ファイル", children: fileItems },
      { label: "編集", children: editItems },
      { label: "表示", children: viewItems },
    ];

    return (
      <div className="flex flex-col gap-6">
        <p>左右の矢印キーでメニュー間を移動し、上下の矢印キーで項目間を移動します。</p>
        <div className="flex flex-col items-start gap-1">
          <span>loopFocus: true</span>
          <Menubar {...props} items={items} loopFocus />
        </div>
        <div className="flex flex-col items-start gap-1">
          <span>loopFocus: false</span>
          <Menubar {...props} items={items} loopFocus={false} />
        </div>
      </div>
    );
  },
});

export const ComplexData = meta.story({
  name: "複雑なデータ",
  ...ctrl({
    disabled: false,
    loopFocus: true,
    modal: true,
    orientation: "horizontal",
    items: [
      {
        label: "ファイル",
        children: (
          <React.Fragment>
            <MenuParts.Item>新規作成</MenuParts.Item>
            <MenuParts.SubmenuRoot>
              <MenuParts.SubmenuTrigger>最近開いたファイル</MenuParts.SubmenuTrigger>
              <MenuParts.Portal>
                <MenuParts.Positioner>
                  <MenuParts.Popup>
                    <MenuParts.Item>ドキュメント1</MenuParts.Item>
                    <MenuParts.Item>ドキュメント2</MenuParts.Item>
                  </MenuParts.Popup>
                </MenuParts.Positioner>
              </MenuParts.Portal>
            </MenuParts.SubmenuRoot>
            <MenuParts.Separator />
            <MenuParts.LinkItem href="#">ヘルプを開く</MenuParts.LinkItem>
          </React.Fragment>
        ),
      },
      {
        label: "編集",
        children: (
          <React.Fragment>
            <MenuParts.Group>
              <MenuParts.GroupLabel>履歴</MenuParts.GroupLabel>
              <MenuParts.Item>元に戻す</MenuParts.Item>
              <MenuParts.Item>やり直し</MenuParts.Item>
            </MenuParts.Group>
            <MenuParts.Separator />
            <MenuParts.Item disabled>貼り付け</MenuParts.Item>
          </React.Fragment>
        ),
      },
    ],
  }),
  render(props) {
    return <Menubar {...props} />;
  },
});
