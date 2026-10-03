import * as theme from "@suru-ui/theme";
import {
  XIcon,
  InfoIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  LoaderCircleIcon,
  AlertTriangleIcon,
} from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Alert } from "../src/alert/index.js";
import * as AlertParts from "../src/alert/index.js";
import { Button } from "../src/button/index.js";

const ACTIONS_POSITIONS: readonly Alert.ActionsPosition[] = ["bottom", "side"];
const DESCRIPTION_POSITIONS: readonly Alert.DescriptionPosition[] = [
  "bottom",
  "side-start",
  "side-end",
];
const COLORS: readonly Alert.Color[] = theme.COLORS;
const RADII: readonly Alert.Radius[] = ["none", ...theme.SIZES];
const SIZES: readonly Alert.Size[] = theme.SIZES;
const VARIANTS: readonly Alert.Variant[] = ["muted", "naked", "liquid"];
const STATUSES: readonly {
  readonly Icon: typeof InfoIcon;
  readonly color: Alert.Color;
  readonly description: string;
  readonly status: string;
  readonly title: string;
}[] = [
  {
    status: "info",
    title: "お知らせ",
    description: "新しい更新があります。",
    color: "blue",
    Icon: InfoIcon,
  },
  {
    status: "success",
    title: "更新完了",
    description: "プロフィールを更新しました。",
    color: "green",
    Icon: CheckCircle2Icon,
  },
  {
    status: "warning",
    title: "警告",
    description: "空き容量が残りわずかです。",
    color: "yellow",
    Icon: AlertTriangleIcon,
  },
  {
    status: "error",
    title: "保存に失敗",
    description: "入力内容を確認して、もう一度お試しください。",
    color: "red",
    Icon: AlertCircleIcon,
  },
];

const meta = preview.meta({
  title: "Alert",
  component: Alert,
});

export default meta;

const ctrl = controls(Alert, {
  actionsPosition: {
    control: "select",
    options: ACTIONS_POSITIONS,
  },
  children: {
    control: "text",
  },
  color: {
    control: "select",
    options: COLORS,
  },
  descriptionPosition: {
    control: "select",
    options: DESCRIPTION_POSITIONS,
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

export const Basic = meta.story({
  name: "基本",
  ...ctrl({
    variant: "muted",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
    children: "プロフィールを更新しました。",
  }),
  render(props) {
    return (
      <div className="w-[450px]">
        <Alert {...props} />
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    color: "blue",
    size: "md",
    radius: undefined,
    outlined: true,
    actionsPosition: "side",
    descriptionPosition: "bottom",
    title: "更新完了",
    children: "プロフィールを更新しました。",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2 w-[450px]">
            <span>{variant}</span>
            <Alert
              {...props}
              icon={<InfoIcon />}
              actions={
                <>
                  <Button size={props.size} variant="naked">
                    閉じる
                  </Button>
                  <Button size={props.size} color={props.color}>
                    確認する
                  </Button>
                </>
              }
              variant={variant}
            />
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
    descriptionPosition: "bottom",
    variant: "muted",
    size: "md",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
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
    variant: "muted",
    color: "grey",
    radius: undefined,
    outlined: true,
    descriptionPosition: "bottom",
    title: "更新完了",
    children: "プロフィールを更新しました。",
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-6">
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

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    title: "更新完了",
    children: "プロフィールを更新しました。",
    descriptionPosition: "bottom",
    variant: "muted",
    color: "grey",
    size: "md",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-6">
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

export const Outline = meta.story({
  name: "枠線",
  ...ctrl({
    children: "説明文",
    descriptionPosition: "bottom",
    variant: "muted",
    color: "grey",
    size: "md",
    radius: undefined,
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-6">
        <Alert {...props} icon={<InfoIcon />} title="枠線付き" outlined />
        <Alert {...props} icon={<InfoIcon />} title="枠線無し" />
      </div>
    );
  },
});

export const Statuses = meta.story({
  name: "状態",
  ...ctrl({
    variant: "muted",
    size: "md",
    radius: undefined,
    outlined: true,
    descriptionPosition: "bottom",
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-6">
        {STATUSES.map(({ status, title, description, color, Icon }) => (
          <div key={status} className="flex flex-col gap-2">
            <span>{status}</span>
            <Alert {...props} icon={<Icon />} color={color} title={title}>
              {description}
            </Alert>
          </div>
        ))}
      </div>
    );
  },
});

export const WithTitle = meta.story({
  name: "タイトル付き",
  ...ctrl({
    variant: "muted",
    color: "green",
    size: "md",
    radius: undefined,
    outlined: true,
    title: "更新完了",
    children: "プロフィールを更新しました。",
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span>タイトル下部に説明文</span>
          <Alert {...props} icon={<CheckCircle2Icon />} />
        </div>
        <div className="flex flex-col gap-2">
          <span>タイトル側面のすぐ隣に説明文</span>
          <Alert {...props} icon={<CheckCircle2Icon />} descriptionPosition="side-start" />
        </div>
        <div className="flex flex-col gap-2">
          <span>タイトル側面の離れに説明文</span>
          <Alert {...props} icon={<CheckCircle2Icon />} descriptionPosition="side-end" />
        </div>
      </div>
    );
  },
});

export const WithIcon = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "muted",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
    children: "新しい更新があります。",
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span>アイコン付き</span>
          <Alert {...props} icon={<InfoIcon />} />
        </div>
        <div className="flex flex-col gap-2">
          <span>アイコンなし</span>
          <Alert {...props} />
        </div>
      </div>
    );
  },
});

export const WithIndicator = meta.story({
  name: "インジケーター付き",
  ...ctrl({
    variant: "muted",
    color: "green",
    size: "md",
    radius: undefined,
    outlined: true,
    children: "プロフィールを更新しました。",
  }),
  render(props) {
    return (
      <div className="w-[450px]">
        <Alert {...props} icon="" />
      </div>
    );
  },
});

export const WithActions = meta.story({
  name: "アクション付き",
  ...ctrl({
    variant: "muted",
    color: "red",
    size: "md",
    radius: undefined,
    outlined: true,
    descriptionPosition: "bottom",
    title: "保存できませんでした",
    children: "入力内容を確認して、もう一度お試しください。",
  }),
  render(props) {
    const actions = (
      <>
        <Button size={props.size} variant="naked">
          閉じる
        </Button>
        <Button size={props.size} color={props.color}>
          再試行
        </Button>
      </>
    );

    return (
      <div className="flex w-[450px] flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span>下部</span>
          <Alert {...props} icon={<AlertCircleIcon />} actions={actions} actionsPosition="bottom" />
        </div>
        <div className="flex flex-col gap-2">
          <span>側面</span>
          <Alert {...props} icon={<AlertCircleIcon />} actions={actions} actionsPosition="side" />
        </div>
      </div>
    );
  },
});

export const Loading = meta.story({
  name: "読み込み中",
  ...ctrl({
    variant: "muted",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
    descriptionPosition: "side-end",
    title: "読み込み中",
    children: "29 % 完了",
  }),
  render(props) {
    return (
      <div className="w-[450px]">
        <Alert {...props} icon={<LoaderCircleIcon className="animate-spin" />} />
      </div>
    );
  },
});

export const CustomComposition = meta.story({
  name: "独自構成",
  ...ctrl({
    variant: "muted",
    color: "blue",
    size: "md",
    radius: undefined,
    outlined: true,
    actionsPosition: "side",
    descriptionPosition: "bottom",
  }),
  render(props) {
    const Alert = AlertParts;
    const { size, color, radius, variant, outlined, actionsPosition, descriptionPosition } = props;

    return (
      <div className="w-[450px]">
        <Alert.Root
          size={size}
          color={color}
          radius={radius}
          variant={variant}
          outlined={outlined}
          actionsPosition={actionsPosition}
          descriptionPosition={descriptionPosition}
        >
          <Alert.Icon>
            <InfoIcon />
          </Alert.Icon>
          <Alert.Title>更新完了</Alert.Title>
          <Alert.Description>
            プロフィールを更新しました。詳しくはお知らせをご覧ください。
          </Alert.Description>
          <Alert.Actions>
            <Button size={props.size} variant="naked">
              閉じる
            </Button>
            <Button size={props.size} color={props.color}>
              確認する
            </Button>
          </Alert.Actions>
        </Alert.Root>
      </div>
    );
  },
});
