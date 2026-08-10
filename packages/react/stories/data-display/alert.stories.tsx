import { COLORS, SIZES } from "@suru-ui/theme";
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Alert } from "../../src/data-display/alert/index.js";
import * as AlertParts from "../../src/data-display/alert/index.js";

const VARIANTS = ["naked", "liquid"] as const;
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
  variant: {
    options: VARIANTS,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "プロフィールを更新しました。",
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
  }),
});

export const WithIcon = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
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
    color: "blue",
    outlined: false,
    radius: "md",
    size: "md",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="w-96">
        <Alert {...props} icon={<CheckCircle2Icon />} title="更新完了">
          プロフィールを更新しました。
        </Alert>
      </div>
    );
  },
});

export const WithActions = meta.story({
  name: "アクション付き",
  ...ctrl({
    color: "red",
    outlined: false,
    radius: "md",
    size: "md",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="w-96">
        <Alert
          {...props}
          icon={<AlertCircleIcon />}
          title="保存できませんでした"
          actions={
            <>
              <Button variant="naked">閉じる</Button>
              <Button color="red">再試行</Button>
            </>
          }
        >
          入力内容を確認して、もう一度お試しください。
        </Alert>
      </div>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ",
  ...ctrl({}),
  render() {
    return (
      <div className="w-96">
        <AlertParts.Root color="blue" radius="md" variant="liquid">
          <AlertParts.Icon>
            <InfoIcon />
          </AlertParts.Icon>
          <AlertParts.Title>お知らせ</AlertParts.Title>
          <AlertParts.Description>
            パーツを組み合わせてアラートの内容を組み立てられます。
          </AlertParts.Description>
          <AlertParts.Actions>
            <Button>詳細を見る</Button>
          </AlertParts.Actions>
        </AlertParts.Root>
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    color: "blue",
    outlined: false,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex w-96 flex-col gap-3">
        {VARIANTS.map((variant) => (
          <Alert {...props} key={variant} variant={variant}>
            {variant === "naked" ? "ネイキッド" : "リキッド"}
          </Alert>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "blue",
    radius: "md",
    size: "md",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-96 flex-col gap-3">
        <Alert {...props} outlined={false}>
          通常
        </Alert>
        <Alert {...props} outlined>
          枠線付き
        </Alert>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    outlined: false,
    radius: "md",
    size: "md",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-96 flex-col gap-3">
        {COLORS.map((color) => (
          <Alert {...props} key={color} color={color}>
            {color}
          </Alert>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    color: "blue",
    outlined: false,
    size: "md",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-96 flex-col gap-3">
        {RADII.map((radius) => (
          <Alert {...props} key={radius} radius={radius}>
            {radius}
          </Alert>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    color: "blue",
    outlined: false,
    radius: "md",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-96 flex-col gap-3">
        {SIZES.map((size) => (
          <Alert {...props} key={size} size={size}>
            {size}
          </Alert>
        ))}
      </div>
    );
  },
});
