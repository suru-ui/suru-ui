import { COLORS, SIZES, COLOR_TEMPLATES as VARIANTS } from "@suru-ui/theme";
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Alert } from "../../src/data-display/alert/index.js";

const RADII = ["none", ...SIZES] as const;

const meta = preview.meta({
  title: "Data Display / Alert",
  component: Alert,
});

export default meta;

const ctrl = controls(Alert, {
  children: {
    control: "text",
  },
  color: {
    options: COLORS,
    control: "select",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    options: RADII,
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  title: {
    control: "text",
  },
  variant: {
    options: VARIANTS,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "プロフィールを更新しました。",
    variant: "solid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
  }),
});

export const WithIcon = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-96 flex-col gap-3">
        <Alert {...props} icon={<InfoIcon />}>
          新しい更新があります。
        </Alert>
        <Alert {...props} color="green" icon={<CheckCircle2Icon />}>
          保存しました。
        </Alert>
        <Alert {...props} color="red" icon={<AlertCircleIcon />}>
          保存できませんでした。
        </Alert>
      </div>
    );
  },
});

export const WithTitle = meta.story({
  name: "タイトル付き",
  ...ctrl({
    title: "更新完了",
    children: "プロフィールを更新しました。",
    variant: "solid",
    color: "green",
    size: "md",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="w-96">
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
    variant: "solid",
    color: "red",
    size: "md",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="w-96">
        <Alert
          {...props}
          icon={<AlertCircleIcon />}
          actions={
            <>
              <Button variant="naked">閉じる</Button>
              <Button color="red">再試行</Button>
            </>
          }
        />
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    title: "更新完了",
    children: "プロフィールを更新しました。",
    color: "blue",
    size: "md",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2 w-96">
            <span className="text-sm">{variant}</span>
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
    variant: "solid",
    size: "md",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col gap-2 w-96">
            <span className="text-sm">{color}</span>
            <Alert {...props} icon={<InfoIcon />} color={color} />
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
    variant: "solid",
    color: "grey",
    size: "md",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-96 flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2 w-96">
            <span className="text-sm">{radius}</span>
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
    variant: "solid",
    color: "grey",
    size: "md",
    radius: undefined,
  }),
  render(props) {
    return (
      <div className="flex w-96 flex-col gap-3">
        <Alert {...props} icon={<InfoIcon />} title="枠線付き" outlined />
        <Alert {...props} icon={<InfoIcon />} title="枠線無し" />
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    title: "更新完了",
    children: "プロフィールを更新しました。",
    variant: "solid",
    color: "grey",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-96 flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2 w-96">
            <span className="text-sm">{size}</span>
            <Alert {...props} icon={<InfoIcon />} size={size} />
          </div>
        ))}
      </div>
    );
  },
});
