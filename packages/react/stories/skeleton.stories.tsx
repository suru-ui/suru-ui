import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Skeleton } from "../src/skeleton/index.js";

const RADII: readonly Skeleton.Radius[] = ["none", "sm", "md", "lg"];

const ANIMATIONS: readonly Skeleton.Animation[] = ["pulse", "shine", "none"];

const meta = preview.meta({
  title: "Skeleton",
  component: Skeleton,
});

export default meta;

const ctrl = controls(Skeleton, {
  animation: {
    control: "select",
    options: ANIMATIONS,
  },
  overlay: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    animation: "pulse",
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-4">
        <Skeleton {...props} className="h-12" />
        <Skeleton {...props} className="h-4" />
        <Skeleton {...props} className="h-4" />
        <Skeleton {...props} className="h-4 w-[60%]" />
      </div>
    );
  },
});

export const Animation = meta.story({
  name: "アニメーション",
  ...ctrl({
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-4">
        {ANIMATIONS.map((animation) => (
          <div key={animation} className="flex items-center gap-4">
            <span className="w-16">{animation}</span>
            <Skeleton {...props} animation={animation} className="h-4" />
          </div>
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    animation: "pulse",
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-4">
        {RADII.map((radius) => (
          <div key={radius} className="flex items-center gap-4">
            <span className="w-12">{radius}</span>
            <Skeleton {...props} radius={radius} className="h-6" />
          </div>
        ))}
      </div>
    );
  },
});

export const Article = meta.story({
  name: "記事",
  ...ctrl({
    animation: "pulse",
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-4">
        <Skeleton {...props} className="h-6 w-[40%]" />
        <div className="flex flex-col gap-2">
          <Skeleton {...props} className="h-4" />
          <Skeleton {...props} className="h-4" />
          <Skeleton {...props} className="h-4 w-[80%]" />
        </div>
      </div>
    );
  },
});

export const ProfileCard = meta.story({
  name: "プロフィールカード",
  ...ctrl({
    animation: "pulse",
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-[320px] items-center gap-4">
        <Skeleton {...props} radius="lg" className="h-12 w-12 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton {...props} className="h-4 w-full" />
          <Skeleton {...props} className="h-3 w-[70%]" />
        </div>
      </div>
    );
  },
});

export const Overlay = meta.story({
  name: "オーバーレイ",
  ...ctrl({
    animation: "pulse",
    radius: "md",
  }),
  render(props) {
    return (
      <div className="relative h-32 w-[300px] p-4">
        読み込み済みのコンテンツ
        <Skeleton {...props} overlay />
      </div>
    );
  },
});
