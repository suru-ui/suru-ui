import * as theme from "@suru-ui/theme";
import { InfoIcon, AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Alert } from "../src/alert/index.js";
import { Button } from "../src/button/index.js";

const COLORS: readonly Alert.Color[] = theme.COLORS;
const RADII: readonly Alert.Radius[] = ["none", ...theme.SIZES];
const SIZES: readonly Alert.Size[] = theme.SIZES;
const VARIANTS: readonly Alert.Variant[] = ["muted", "naked", "liquid"];

const meta = preview.meta({
  title: "Alert",
  component: Alert,
});

export default meta;

const ctrl = controls(Alert, {
  children: {
    control: "text",
  },
  color: {
    control: "select",
    options: COLORS,
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
  title: {
    control: "text",
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "プロフィールを更新しました。",
    variant: "muted",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
  }),
});

export const WithIcon = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "muted",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-3">
        <Alert {...props} icon={<InfoIcon />}>
          新しい更新があります。
        </Alert>
        <Alert {...props} icon={<CheckCircle2Icon />} color="green">
          保存しました。
        </Alert>
        <Alert {...props} icon={<AlertCircleIcon />} color="red">
          保存できませんでした。
        </Alert>
      </div>
    );
  },
});

export const WithIndicator = meta.story({
  name: "インジケーター付き",
  ...ctrl({
    children: "プロフィールを更新しました。",
    variant: "muted",
    color: "green",
    size: "md",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="w-[450px]">
        <Alert {...props} icon="" />
      </div>
    );
  },
});

export const WithTitle = meta.story({
  name: "タイトル付き",
  ...ctrl({
    title: "更新完了",
    children: "プロフィールを更新しました。",
    variant: "muted",
    color: "green",
    size: "md",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="w-[450px]">
        <Alert {...props} icon={<CheckCircle2Icon />} />
      </div>
    );
  },
});

export const WithActions = meta.story({
  name: "アクション付き",
  ...ctrl({
    title: "保存できませんでした",
    children: "入力内容を確認して、もう一度お試しください。",
    variant: "muted",
    color: "red",
    size: "md",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="w-[450px]">
        <Alert
          {...props}
          icon={<AlertCircleIcon />}
          actions={
            <>
              <Button size={props.size} variant="naked">
                閉じる
              </Button>
              <Button size={props.size} color={props.color}>
                再試行
              </Button>
            </>
          }
        />
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    title: "更新完了",
    children: "プロフィールを更新しました。",
    color: "blue",
    size: "md",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2 w-[450px]">
            <span>{variant}</span>
            <Alert {...props} icon={<InfoIcon />} variant={variant} />
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    title: "更新完了",
    children: "プロフィールを更新しました。",
    variant: "muted",
    size: "md",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col gap-2 w-[450px]">
            <span>{color}</span>
            <Alert {...props} icon={<InfoIcon />} color={color} />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    title: "更新完了",
    children: "プロフィールを更新しました。",
    variant: "muted",
    color: "grey",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2 w-[450px]">
            <span>{size}</span>
            <Alert {...props} icon={<InfoIcon />} size={size} />
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    title: "更新完了",
    children: "プロフィールを更新しました。",
    variant: "muted",
    color: "grey",
    size: "md",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2 w-[450px]">
            <span>{radius}</span>
            <Alert {...props} icon={<InfoIcon />} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    children: "説明文",
    variant: "muted",
    color: "grey",
    size: "md",
    radius: undefined,
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-3">
        <Alert {...props} icon={<InfoIcon />} title="枠線付き" outlined />
        <Alert {...props} icon={<InfoIcon />} title="枠線無し" />
      </div>
    );
  },
});
