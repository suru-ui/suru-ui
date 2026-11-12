import * as theme from "@suru-ui/theme";
import {
  InfoIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  LoaderCircleIcon,
  AlertTriangleIcon,
} from "lucide-react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { Alert } from "./index.js";
import * as AlertParts from "./index.js";

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
  readonly title: string;
  readonly status: string;
  readonly description: string;
}[] = [
  {
    Icon: InfoIcon,
    color: "blue",
    title: "お知らせ",
    status: "info",
    description: "新しい更新があります。",
  },
  {
    Icon: CheckCircle2Icon,
    color: "green",
    title: "更新完了",
    status: "success",
    description: "プロフィールを更新しました。",
  },
  {
    Icon: AlertTriangleIcon,
    color: "yellow",
    title: "警告",
    status: "warning",
    description: "空き容量が残りわずかです。",
  },
  {
    Icon: AlertCircleIcon,
    color: "red",
    title: "保存に失敗",
    status: "error",
    description: "入力内容を確認して、もう一度お試しください。",
  },
];

const meta = preview.meta({
  title: "Alert",
  component: Alert,
});

export default meta;

const ctrl = controls(Alert, {
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  title: {
    control: "text",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  children: {
    control: "text",
  },
  outlined: {
    control: "boolean",
  },
  actionsPosition: {
    control: "select",
    options: ACTIONS_POSITIONS,
  },
  descriptionPosition: {
    control: "select",
    options: DESCRIPTION_POSITIONS,
  },
});

export const Basic = meta.story({
  name: "基本",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "muted",
    children: "プロフィールを更新しました。",
    outlined: true,
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
    size: "md",
    color: "blue",
    title: "更新完了",
    radius: undefined,
    children: "プロフィールを更新しました。",
    outlined: true,
    actionsPosition: "side",
    descriptionPosition: "bottom",
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
    size: "md",
    title: "更新完了",
    radius: undefined,
    variant: "muted",
    children: "プロフィールを更新しました。",
    outlined: true,
    descriptionPosition: "bottom",
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
    color: "grey",
    title: "更新完了",
    radius: undefined,
    variant: "muted",
    children: "プロフィールを更新しました。",
    outlined: true,
    descriptionPosition: "bottom",
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
    size: "md",
    color: "grey",
    title: "更新完了",
    variant: "muted",
    children: "プロフィールを更新しました。",
    outlined: true,
    descriptionPosition: "bottom",
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
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "muted",
    children: "説明文",
    descriptionPosition: "bottom",
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
    size: "md",
    radius: undefined,
    variant: "muted",
    outlined: true,
    descriptionPosition: "bottom",
  }),
  render(props) {
    return (
      <div className="flex w-[450px] flex-col gap-6">
        {STATUSES.map(({ Icon, color, title, status, description }) => (
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
    size: "md",
    color: "green",
    title: "更新完了",
    radius: undefined,
    variant: "muted",
    children: "プロフィールを更新しました。",
    outlined: true,
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
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "muted",
    children: "新しい更新があります。",
    outlined: true,
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
    size: "md",
    color: "green",
    radius: undefined,
    variant: "muted",
    children: "プロフィールを更新しました。",
    outlined: true,
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
    size: "md",
    color: "red",
    title: "保存できませんでした",
    radius: undefined,
    variant: "muted",
    children: "入力内容を確認して、もう一度お試しください。",
    outlined: true,
    descriptionPosition: "bottom",
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
    size: "md",
    color: "grey",
    title: "読み込み中",
    radius: undefined,
    variant: "muted",
    children: "29 % 完了",
    outlined: true,
    descriptionPosition: "side-end",
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
    size: "md",
    color: "blue",
    radius: undefined,
    variant: "muted",
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
