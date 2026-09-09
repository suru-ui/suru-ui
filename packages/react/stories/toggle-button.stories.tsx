import * as theme from "@suru-ui/theme";
import { ItalicIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { ToggleButton } from "../src/toggle-button/index.js";

const COLORS: readonly ToggleButton.Color[] = theme.COLORS;
const RADII: readonly ToggleButton.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly ToggleButton.Size[] = theme.SIZES;
const VARIANTS: readonly ToggleButton.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "ToggleButton",
  component: ToggleButton,
});

export default meta;

const ctrl = controls(ToggleButton, {
  color: {
    control: "select",
    options: COLORS,
  },
  defaultPressed: {
    control: "boolean",
  },
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  pending: {
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
  squared: {
    control: "boolean",
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "切り替え",
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    pending: false,
    disabled: false,
  }),
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    const [pressed, setPressed] = React.useState(false);

    return (
      <ToggleButton {...props} pressed={pressed} onPressedChange={setPressed}>
        {pressed ? "ON" : "OFF"}
      </ToggleButton>
    );
  },
});

export const Pressed = meta.story({
  name: "押下状態",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <div className="flex gap-3">
              <ToggleButton {...props} variant={variant}>
                OFF
              </ToggleButton>
              <ToggleButton {...props} variant={variant} defaultPressed>
                ON
              </ToggleButton>
            </div>
          </div>
        ))}
      </div>
    );
  },
});

export const WithIcons = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-center gap-3">
          <ToggleButton {...props}>
            <ItalicIcon />
            切り替え
          </ToggleButton>
          <ToggleButton {...props}>
            切り替え
            <ItalicIcon />
          </ToggleButton>
        </div>
        <div className="flex justify-center gap-3">
          <ToggleButton
            {...props}
            slotProps={{
              content: {
                className: "flex-col",
              },
            }}
          >
            <ItalicIcon />
            切り替え
          </ToggleButton>
          <ToggleButton
            {...props}
            slotProps={{
              content: {
                className: "flex-col",
              },
            }}
          >
            切り替え
            <ItalicIcon />
          </ToggleButton>
        </div>
        <div className="flex justify-center gap-3">
          <ToggleButton
            {...props}
            slotProps={{
              content: {
                className: "flex-col gap-[8px]",
              },
            }}
          >
            <ItalicIcon className="size-[28px]" />
            切り替え
          </ToggleButton>
        </div>
      </div>
    );
  },
});

export const Squared = meta.story({
  name: "正方形",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <ToggleButton {...props} squared variant={variant}>
              <ItalicIcon />
            </ToggleButton>
          </div>
        ))}
      </div>
    );
  },
});

function useToggleFeature() {
  const [flag, setFlag] = React.useState(false);
  const [pending, startTransition] = React.useTransition();
  const clickHandler = () => {
    startTransition(async () => {
      const sleep = (t: number) => new Promise((r) => setTimeout(r, t));

      await sleep(1e3);
      setFlag((f) => !f);
    });
  };

  return {
    flag,
    pending,
    clickHandler,
  };
}

function useToggleProgress() {
  const [percentage, setPercentage] = React.useState<number>();
  const [pending, startTransition] = React.useTransition();
  const clickHandler = () => {
    startTransition(async () => {
      const sleep = (t: number) => new Promise((r) => setTimeout(r, t));

      setPercentage(0);
      for (let value = 0; value <= 100; value += 20) {
        await sleep(200);
        setPercentage(value);
      }

      await sleep(200);
      setPercentage(undefined);
    });
  };

  return {
    pending,
    percentage,
    clickHandler,
  };
}

export const Pending = meta.story({
  name: "保留",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    const feature = useToggleFeature();
    const progress = useToggleProgress();

    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span>不定</span>
          <div className="flex flex-wrap gap-3">
            <ToggleButton
              {...props}
              onClick={feature.clickHandler}
              pending={feature.pending}
              pressed={feature.flag}
            >
              {feature.flag ? "有効化済み" : "有効化する"}
            </ToggleButton>
            <ToggleButton {...props} pending squared>
              <ItalicIcon />
            </ToggleButton>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>進捗度付き</span>
          <div>
            <ToggleButton
              {...props}
              onClick={progress.clickHandler}
              pending={progress.pending}
              percentage={progress.percentage}
            >
              ダウンロード
            </ToggleButton>
          </div>
        </div>
      </div>
    );
  },
});

export const FullWidth = meta.story({
  name: "最大幅",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="space-y-1">
        <ToggleButton {...props} className="w-full">
          {"width: 100%"}
        </ToggleButton>
        <div className="flex w-[200px] gap-1">
          <ToggleButton {...props} className="w-full">
            {"width: 100%"}
          </ToggleButton>
          <ToggleButton {...props} squared>
            <ItalicIcon />
          </ToggleButton>
        </div>
        <div className="flex w-[200px] gap-1">
          <ToggleButton {...props} className="flex-1">
            {"flex: 1"}
          </ToggleButton>
          <ToggleButton {...props} squared>
            <ItalicIcon />
          </ToggleButton>
        </div>
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    children: "切り替え",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <ToggleButton {...props} variant={variant} />
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    children: "切り替え",
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col items-center gap-2">
            <span>{color}</span>
            <ToggleButton {...props} color={color} defaultPressed>
              切り替え
            </ToggleButton>
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    children: "切り替え",
    variant: "liquid",
    color: "grey",
    size: "md",
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-2">
            <span>{radius}</span>
            <ToggleButton {...props} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    children: "切り替え",
    color: "grey",
    size: "md",
    radius: undefined,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <ToggleButton {...props} variant={variant} outlined />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    children: "切り替え",
    variant: "liquid",
    color: "grey",
    radius: undefined,
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <span>{size}</span>
              <ToggleButton {...props} size={size}>
                <ItalicIcon />
                {props.children}
              </ToggleButton>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <span>{size}</span>
              <ToggleButton {...props} size={size} squared>
                <ItalicIcon />
              </ToggleButton>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>親要素に合わせる</span>
          <div className="flex justify-center gap-3 h-[50px]">
            <ToggleButton {...props}>
              <ItalicIcon />
              {props.children}
            </ToggleButton>
            <ToggleButton {...props} squared>
              <ItalicIcon />
            </ToggleButton>
          </div>
        </div>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    pending: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <div className="flex gap-3">
              <ToggleButton {...props} variant={variant} disabled>
                OFF
              </ToggleButton>
              <ToggleButton {...props} variant={variant} disabled defaultPressed>
                ON
              </ToggleButton>
              <ToggleButton {...props} squared variant={variant} disabled>
                <ItalicIcon />
              </ToggleButton>
            </div>
          </div>
        ))}
      </div>
    );
  },
});
