import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Skeleton } from "../../src/data-display/skeleton/index.js";

const RADII = ["none", "sm", "md", "lg", "full"] as const;

const meta = preview.meta({
  title: "Data Display / Skeleton",
  component: Skeleton,
});

export default meta;

const ctrl = controls(Skeleton, {
  animated: {
    control: "boolean",
  },
  radius: {
    options: RADII,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    animated: true,
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-4">
        <Skeleton {...props} style={{ height: 48 }} />
        <Skeleton {...props} />
        <Skeleton {...props} />
        <Skeleton {...props} style={{ width: "60%" }} />
      </div>
    );
  },
});

export const Animated = meta.story({
  name: "アニメーション",
  ...ctrl({
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span>animated</span>
          <Skeleton {...props} animated />
        </div>
        <div className="flex flex-col gap-2">
          <span>static</span>
          <Skeleton {...props} animated={false} />
        </div>
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    animated: true,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-4">
        {RADII.map((radius) => (
          <div key={radius} className="flex items-center gap-4">
            <span className="w-12">{radius}</span>
            <Skeleton {...props} style={{ height: 24 }} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const ProfileCard = meta.story({
  name: "プロフィールカード",
  ...ctrl({
    animated: true,
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[320px] items-center gap-4">
        <Skeleton {...props} style={{ width: 48, height: 48 }} radius="full" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton {...props} style={{ height: 16 }} />
          <Skeleton {...props} style={{ height: 12, width: "70%" }} />
        </div>
      </div>
    );
  },
});
