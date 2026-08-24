import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Sidebar } from "../../src/navigation/sidebar/index.js";
import type {
  SidebarCollapsible,
  SidebarProps,
  SidebarRootProps,
  SidebarSide,
  SidebarVariant,
} from "../../src/navigation/sidebar/index.js";

const meta = preview.meta({
  title: "Navigation / Sidebar",
  component: Sidebar,
});

export default meta;

const ctrl = controls(Sidebar, {
  defaultOpen: {
    control: "boolean",
  },
});

function DemoSidebar(
  props: Omit<SidebarProps, "children"> & Partial<Pick<SidebarRootProps, "collapsible" | "side" | "variant">>,
) {
  const { collapsible = "offcanvas", side = "left", variant = "sidebar", ...otherProps } = props;

  return (
    <Sidebar {...otherProps} className="h-96 overflow-hidden rounded-lg border">
      <Sidebar.Root collapsible={collapsible} side={side} variant={variant}>
        <Sidebar.Header>
          <p className="font-bold">Suru UI</p>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>プラットフォーム</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <a href="#dashboard">ダッシュボード</a>
              <a href="#projects">プロジェクト</a>
              <a href="#members">メンバー</a>
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>設定</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <a href="#general">一般</a>
              <a href="#security">セキュリティー</a>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <p>footer@example.com</p>
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar.Root>
      <Sidebar.Inset>
        <div className="flex items-center gap-2 p-4">
          <Sidebar.Trigger />
          <p>メインコンテンツ</p>
        </div>
      </Sidebar.Inset>
    </Sidebar>
  );
}

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    defaultOpen: true,
  }),
  render(props) {
    return <DemoSidebar defaultOpen={props.defaultOpen} />;
  },
});

export const Sides = meta.story({
  name: "辺",
  ...ctrl({
    collapsible: "offcanvas",
    defaultOpen: true,
    variant: "sidebar",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        {(["left", "right"] as readonly SidebarSide[]).map((side) => (
          <div key={side}>
            <p>{`辺 "${side}"`}</p>
            <DemoSidebar defaultOpen={props.defaultOpen} side={side} />
          </div>
        ))}
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "バリアント",
  ...ctrl({
    collapsible: "offcanvas",
    defaultOpen: true,
    side: "left",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        {(["sidebar", "floating", "inset"] as readonly SidebarVariant[]).map((variant) => (
          <div key={variant}>
            <p>{`バリアント "${variant}"`}</p>
            <DemoSidebar defaultOpen={props.defaultOpen} variant={variant} />
          </div>
        ))}
      </div>
    );
  },
});

export const Collapsibles = meta.story({
  name: "折りたたみ",
  ...ctrl({
    defaultOpen: true,
    side: "left",
    variant: "sidebar",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        {(["offcanvas", "icon", "none"] as readonly SidebarCollapsible[]).map((collapsible) => (
          <div key={collapsible}>
            <p>{`折りたたみ "${collapsible}"`}</p>
            <DemoSidebar collapsible={collapsible} defaultOpen={props.defaultOpen} />
          </div>
        ))}
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({}),
  render() {
    const [open, setOpen] = React.useState(true);

    return (
      <div className="flex flex-col gap-2">
        <p>{`開閉状態: ${open ? "展開" : "折りたたみ"}`}</p>
        <DemoSidebar open={open} onOpenChange={setOpen} />
      </div>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ構成",
  ...ctrl({}),
  render() {
    return (
      <Sidebar.Provider className="h-96 overflow-hidden rounded-lg border">
        <Sidebar.Root>
          <Sidebar.Header>
            <p className="font-bold">Suru UI</p>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>プラットフォーム</Sidebar.GroupLabel>
              <Sidebar.GroupContent>
                <a href="#dashboard">ダッシュボード</a>
                <a href="#projects">プロジェクト</a>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Footer>
            <p>footer@example.com</p>
          </Sidebar.Footer>
          <Sidebar.Rail />
        </Sidebar.Root>
        <Sidebar.Inset>
          <div className="flex items-center gap-2 p-4">
            <Sidebar.Trigger />
            <p>メインコンテンツ</p>
          </div>
        </Sidebar.Inset>
      </Sidebar.Provider>
    );
  },
});
