import { COLOR_TEMPLATES, COLORS, SIZES } from "@suru-ui/theme";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { ToggleButtonGroup } from "../../src/buttons/toggle-button-group/index.js";
import { ToggleButton } from "../../src/buttons/toggle-button/index.js";

const VALIANTS = COLOR_TEMPLATES.filter((variant) => variant !== "solid");

const meta = preview.meta({
  title: "Buttons / ToggleButtonGroup",
  component: ToggleButtonGroup,
});

export default meta;

const ctrl = controls(ToggleButtonGroup, {
  color: {
    options: COLORS,
    control: "select",
  },
  disabled: {
    control: "boolean",
  },
  detached: {
    control: "boolean",
  },
  multiple: {
    control: "boolean",
  },
  orientation: {
    options: ["horizontal", "vertical"],
    control: "select",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    options: ["none", "rounded", "full"],
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  variant: {
    options: VALIANTS,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
    multiple: false,
    detached: false,
    disabled: false,
  }),
  render(props) {
    return (
      <ToggleButtonGroup {...props}>
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
        <ToggleButton value="c">C</ToggleButton>
      </ToggleButtonGroup>
    );
  },
});

export const SelectionMode = meta.story({
  name: "選択モード",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
    multiple: false,
    detached: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">単一選択</span>
          <ToggleButtonGroup {...props}>
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">複数選択</span>
          <ToggleButtonGroup {...props} multiple>
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  },
});

export const DefaultSelected = meta.story({
  name: "初期選択値",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
    multiple: true,
    detached: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">単一選択</span>
          <ToggleButtonGroup {...props} multiple={false} defaultValue={["b"]}>
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">複数選択</span>
          <ToggleButtonGroup {...props} defaultValue={["a", "c"]}>
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
    multiple: true,
    detached: false,
    disabled: false,
  }),
  render(props) {
    const [selected, setSelected] = React.useState(["a"]);

    return (
      <div className="flex flex-col gap-4">
        <ToggleButtonGroup {...props} value={selected} onValueChange={setSelected}>
          <ToggleButton value="a">A</ToggleButton>
          <ToggleButton value="b">B</ToggleButton>
          <ToggleButton value="c">C</ToggleButton>
        </ToggleButtonGroup>
        <div className="text-center text-sm text-gray-500">選択中: {selected.join(", ")}</div>
      </div>
    );
  },
});

export const Orientation = meta.story({
  name: "向き",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    multiple: false,
    detached: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">横並び</span>
          <ToggleButtonGroup {...props} orientation="horizontal">
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">縦並び</span>
          <ToggleButtonGroup {...props} orientation="vertical">
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  },
});

export const Detached = meta.story({
  name: "分離表示",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    multiple: true,
    orientation: "horizontal",
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">通常</span>
          <ToggleButtonGroup {...props} detached={false}>
            <ToggleButton value="a" squared>
              <BoldIcon />
            </ToggleButton>
            <ToggleButton value="b" squared>
              <ItalicIcon />
            </ToggleButton>
            <ToggleButton value="c" squared>
              <UnderlineIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">分離表示</span>
          <ToggleButtonGroup {...props} detached>
            <ToggleButton value="a" squared>
              <BoldIcon />
            </ToggleButton>
            <ToggleButton value="b" squared>
              <ItalicIcon />
            </ToggleButton>
            <ToggleButton value="c" squared>
              <UnderlineIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
    multiple: false,
    detached: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">naked</span>
          <ToggleButtonGroup {...props} variant="naked">
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">liquid</span>
          <ToggleButtonGroup {...props} variant="liquid">
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">押下（solid）</span>
          <ToggleButtonGroup {...props} variant="naked" defaultValue={["b"]}>
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
    multiple: false,
    detached: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        {COLORS.map((color) => (
          <div className="flex flex-col items-center gap-2" key={color}>
            <span className="text-sm text-gray-500">{color}</span>
            <ToggleButtonGroup {...props} color={color}>
              <ToggleButton value="a">A</ToggleButton>
              <ToggleButton value="b">B</ToggleButton>
              <ToggleButton value="c">C</ToggleButton>
            </ToggleButtonGroup>
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "liquid",
    color: "blue",
    size: "md",
    outlined: false,
    orientation: "horizontal",
    multiple: false,
    detached: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">none</span>
          <ToggleButtonGroup {...props} radius="none">
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">rounded</span>
          <ToggleButtonGroup {...props} radius="rounded">
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">full</span>
          <ToggleButtonGroup {...props} radius="full">
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    color: "blue",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
    multiple: false,
    detached: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">sm</span>
          <ToggleButtonGroup {...props} size="sm">
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">md</span>
          <ToggleButtonGroup {...props} size="md">
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">lg</span>
          <ToggleButtonGroup {...props} size="lg">
            <ToggleButton value="a">A</ToggleButton>
            <ToggleButton value="b">B</ToggleButton>
            <ToggleButton value="c">C</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  },
});

export const WithIcons = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
    multiple: true,
    detached: false,
    disabled: false,
  }),
  render(props) {
    return (
      <ToggleButtonGroup {...props}>
        <ToggleButton value="bold" defaultPressed squared>
          <BoldIcon />
        </ToggleButton>
        <ToggleButton value="italic" squared>
          <ItalicIcon />
        </ToggleButton>
        <ToggleButton value="underline" squared>
          <UnderlineIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    orientation: "horizontal",
    multiple: false,
    detached: false,
    disabled: true,
  }),
  render(props) {
    return (
      <ToggleButtonGroup {...props}>
        <ToggleButton value="a" disabled>
          OFF
        </ToggleButton>
        <ToggleButton value="b" disabled defaultPressed>
          ON
        </ToggleButton>
        <ToggleButton value="c">有効</ToggleButton>
      </ToggleButtonGroup>
    );
  },
});
