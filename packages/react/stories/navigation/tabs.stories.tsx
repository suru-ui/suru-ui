import { SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Tabs } from "../../src/navigation/tabs/index.js";
import * as TabsParts from "../../src/navigation/tabs/index.js";

const meta = preview.meta({
  title: "Navigation / Tabs",
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

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    orientation: "horizontal",
    outlined: false,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <Tabs {...props} defaultValue="overview" className="w-96">
        <TabsParts.List>
          <TabsParts.Tab value="overview">概要</TabsParts.Tab>
          <TabsParts.Tab value="projects">プロジェクト</TabsParts.Tab>
          <TabsParts.Tab value="account">アカウント</TabsParts.Tab>
          <TabsParts.Indicator />
        </TabsParts.List>
        <TabsParts.Panel value="overview">
          <p>ワークスペースの概要と最近のアクティビティを表示します。</p>
        </TabsParts.Panel>
        <TabsParts.Panel value="projects">
          <p>プロジェクトの進捗と期限を表示します。</p>
        </TabsParts.Panel>
        <TabsParts.Panel value="account">
          <p>プロフィールと設定を表示します。</p>
        </TabsParts.Panel>
      </Tabs>
    );
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
      <Tabs {...props} defaultValue="overview" className="w-96">
        <div className="flex">
          <TabsParts.List>
            <TabsParts.Tab value="overview">概要</TabsParts.Tab>
            <TabsParts.Tab value="projects">プロジェクト</TabsParts.Tab>
            <TabsParts.Tab value="account">アカウント</TabsParts.Tab>
            <TabsParts.Indicator />
          </TabsParts.List>
          <div className="min-w-0 flex-1">
            <TabsParts.Panel value="overview">ワークスペースの概要です。</TabsParts.Panel>
            <TabsParts.Panel value="projects">プロジェクトの進捗です。</TabsParts.Panel>
            <TabsParts.Panel value="account">アカウントの設定です。</TabsParts.Panel>
          </div>
        </div>
      </Tabs>
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
          className="w-96"
          value={value}
          onValueChange={(nextValue) => setValue(String(nextValue))}
        >
          <TabsParts.List>
            <TabsParts.Tab value="overview">概要</TabsParts.Tab>
            <TabsParts.Tab value="projects">プロジェクト</TabsParts.Tab>
            <TabsParts.Indicator />
          </TabsParts.List>
          <TabsParts.Panel value="overview">概要を選択しています。</TabsParts.Panel>
          <TabsParts.Panel value="projects">プロジェクトを選択しています。</TabsParts.Panel>
        </Tabs>
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
      <Tabs {...props} defaultValue="overview" className="w-96">
        <TabsParts.List>
          <TabsParts.Tab value="overview">概要</TabsParts.Tab>
          <TabsParts.Tab value="projects" disabled>
            プロジェクト
          </TabsParts.Tab>
          <TabsParts.Tab value="account">アカウント</TabsParts.Tab>
          <TabsParts.Indicator />
        </TabsParts.List>
        <TabsParts.Panel value="overview">概要を表示しています。</TabsParts.Panel>
        <TabsParts.Panel value="projects">プロジェクトを表示しています。</TabsParts.Panel>
        <TabsParts.Panel value="account">アカウントを表示しています。</TabsParts.Panel>
      </Tabs>
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
            <Tabs {...props} size={size} defaultValue="overview" className="w-96">
              <TabsParts.List>
                <TabsParts.Tab value="overview">概要</TabsParts.Tab>
                <TabsParts.Tab value="projects">プロジェクト</TabsParts.Tab>
                <TabsParts.Indicator />
              </TabsParts.List>
            </Tabs>
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
            <Tabs {...props} radius={radius} defaultValue="overview" className="w-96">
              <TabsParts.List>
                <TabsParts.Tab value="overview">概要</TabsParts.Tab>
                <TabsParts.Tab value="projects">プロジェクト</TabsParts.Tab>
                <TabsParts.Indicator />
              </TabsParts.List>
            </Tabs>
            <div>{radius}</div>
          </div>
        ))}
      </div>
    );
  },
});
