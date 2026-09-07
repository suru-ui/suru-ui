import { SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Tabs, TabsTab, TabsList, TabsRoot, TabsPanel, TabsIndicator } from "../src/tabs/index.js";

const meta = preview.meta({
  title: "Tabs",
  component: Tabs,
});

export default meta;

const ctrl = controls(Tabs, {
  orientation: {
    control: "select",
    options: ["horizontal", "vertical"],
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: ["none", "sm", "md", "lg"],
  },
  size: {
    control: "select",
    options: SIZES,
  },
});

const usageItems = [
  {
    value: "overview",
    label: "概要",
    content: <p>ワークスペースの概要と最近のアクティビティを表示します。</p>,
  },
  {
    value: "projects",
    label: "プロジェクト",
    content: <p>プロジェクトの進捗と期限を表示します。</p>,
  },
  {
    value: "account",
    label: "アカウント",
    content: <p>プロフィールと設定を表示します。</p>,
  },
];

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    orientation: "horizontal",
    outlined: false,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return <Tabs {...props} items={usageItems} className="w-96" defaultValue="overview" />;
  },
});

export const Vertical = meta.story({
  name: "垂直方向",
  ...ctrl({
    orientation: "vertical",
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <TabsRoot {...props} className="w-96" defaultValue="overview">
        <div className="flex">
          <TabsList>
            <TabsTab value="overview">概要</TabsTab>
            <TabsTab value="projects">プロジェクト</TabsTab>
            <TabsTab value="account">アカウント</TabsTab>
            <TabsIndicator />
          </TabsList>
          <div className="min-w-0 flex-1">
            <TabsPanel value="overview">ワークスペースの概要です。</TabsPanel>
            <TabsPanel value="projects">プロジェクトの進捗です。</TabsPanel>
            <TabsPanel value="account">アカウントの設定です。</TabsPanel>
          </div>
        </div>
      </TabsRoot>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    orientation: "horizontal",
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    const [value, setValue] = React.useState("overview");

    return (
      <div className="flex w-96 flex-col gap-2">
        <Tabs
          {...props}
          items={usageItems}
          value={value}
          className="w-96"
          onValueChange={(nextValue) => setValue(String(nextValue))}
        />
        <span>現在の値: {value}</span>
      </div>
    );
  },
});

export const DisabledTab = meta.story({
  name: "無効な Tab",
  ...ctrl({
    orientation: "horizontal",
    outlined: false,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <Tabs
        {...props}
        items={[
          {
            value: "overview",
            label: "概要",
            content: <p>ワークスペースの概要と最近のアクティビティを表示します。</p>,
          },
          {
            value: "projects",
            label: "プロジェクト",
            disabled: true,
            content: <p>プロジェクトの進捗と期限を表示します。</p>,
          },
          {
            value: "account",
            label: "アカウント",
            content: <p>プロフィールと設定を表示します。</p>,
          },
        ]}
        className="w-96"
        defaultValue="overview"
      />
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    orientation: "horizontal",
    outlined: false,
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size}>
            <Tabs
              {...props}
              size={size}
              items={usageItems}
              className="w-96"
              defaultValue="overview"
            />
            <div>{size}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    orientation: "horizontal",
    outlined: false,
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {(["none", "sm", "md", "lg"] as const).map((radius) => (
          <div key={radius}>
            <Tabs
              {...props}
              items={usageItems}
              radius={radius}
              className="w-96"
              defaultValue="overview"
            />
            <div>{radius}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Keyboard = meta.story({
  name: "キーボード操作",
  ...ctrl({
    orientation: "horizontal",
    outlined: false,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <Tabs
        {...props}
        items={usageItems}
        className="w-96"
        slotProps={{ list: { activateOnFocus: true, loopFocus: true } }}
        defaultValue="overview"
      />
    );
  },
});

export const SlotProps = meta.story({
  name: "パーツの調整",
  ...ctrl({
    orientation: "horizontal",
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <Tabs
        {...props}
        items={usageItems}
        className="w-96"
        slotProps={{ list: { "aria-label": "ワークスペースの切替" } }}
        defaultValue="overview"
      />
    );
  },
});
