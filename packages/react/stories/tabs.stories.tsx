import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Tabs, TabsTab, TabsList, TabsRoot, TabsPanel, TabsIndicator } from "../src/tabs/index.js";

const ACTIVE_VARIANTS: readonly Tabs.ActiveVariant[] = theme.COLOR_TEMPLATES;
const ORIENTATIONS: readonly Tabs.Orientation[] = ["horizontal", "vertical"];
const RADII: readonly Tabs.Radius[] = ["none", ...theme.SIZES];
const SIZES: readonly Tabs.Size[] = theme.SIZES;
const VARIANTS: readonly Tabs.Variant[] = ["segments", "line"];

const meta = preview.meta({
  title: "Tabs",
  component: Tabs,
});

export default meta;

const ctrl = controls(Tabs, {
  activeVariant: {
    control: "select",
    options: ACTIVE_VARIANTS,
  },
  orientation: {
    control: "select",
    options: ORIENTATIONS,
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
  variant: {
    control: "select",
    options: VARIANTS,
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
    activeVariant: "liquid",
    orientation: "horizontal",
    outlined: false,
    radius: "md",
    size: "md",
    variant: "line",
  }),
  render(props) {
    return (
      <Tabs
        {...props}
        items={usageItems}
        className="w-96"
        slotProps={{ panel: { className: "min-h-28" } }}
        defaultValue="overview"
      />
    );
  },
});

export const Variant = meta.story({
  name: "主な外観",
  ...ctrl({
    activeVariant: "liquid",
    orientation: "horizontal",
    outlined: false,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Tabs
              {...props}
              items={usageItems}
              variant={variant}
              className="w-96"
              slotProps={{ panel: { className: "min-h-28" } }}
              defaultValue="overview"
            />
          </div>
        ))}
      </div>
    );
  },
});

export const ActiveVariant = meta.story({
  name: "選択中の外観",
  ...ctrl({
    orientation: "horizontal",
    outlined: false,
    radius: "md",
    size: "md",
    variant: "segments",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {ACTIVE_VARIANTS.map((activeVariant) => (
          <div key={activeVariant} className="flex flex-col gap-2">
            <span>{activeVariant}</span>
            <Tabs
              {...props}
              items={usageItems}
              className="w-96"
              slotProps={{ panel: { className: "min-h-28" } }}
              defaultValue="overview"
              activeVariant={activeVariant}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    activeVariant: "liquid",
    orientation: "horizontal",
    outlined: false,
    size: "md",
    variant: "line",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2">
            <span>{radius}</span>
            <Tabs
              {...props}
              items={usageItems}
              radius={radius}
              className="w-96"
              slotProps={{ panel: { className: "min-h-28" } }}
              defaultValue="overview"
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    activeVariant: "liquid",
    orientation: "horizontal",
    outlined: false,
    radius: "md",
    variant: "line",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Tabs
              {...props}
              size={size}
              items={usageItems}
              className="w-96"
              slotProps={{ panel: { className: "min-h-28" } }}
              defaultValue="overview"
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Vertical = meta.story({
  name: "垂直方向",
  ...ctrl({
    activeVariant: "liquid",
    orientation: "vertical",
    outlined: true,
    radius: "md",
    size: "md",
    variant: "line",
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
    activeVariant: "liquid",
    orientation: "horizontal",
    outlined: true,
    radius: "md",
    size: "md",
    variant: "line",
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
          slotProps={{ panel: { className: "min-h-28" } }}
          onValueChange={(nextValue) => setValue(String(nextValue))}
        />
        <span>現在の値: {value}</span>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    activeVariant: "liquid",
    orientation: "horizontal",
    outlined: false,
    radius: "md",
    size: "md",
    variant: "line",
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
        slotProps={{ panel: { className: "min-h-28" } }}
        defaultValue="overview"
      />
    );
  },
});
