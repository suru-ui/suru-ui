import { HEIGHT_LIST } from "@suru-ui/theme";
import preview from "../../.config/storybook/preview.js";
import { Input } from "../../src/inputs/input/index.js";

const meta = preview.meta({
  title: "Inputs / Input",
  component: Input,
});

export default meta;

export const Usage = meta.story({
  name: "使い方",
  argTypes: {
    disabled: {
      control: "boolean",
    },
    sizing: {
      options: HEIGHT_LIST,
      control: "select",
    },
    variant: {
      options: ["outlined", "underlined"],
      control: "select",
    },
  },
  args: {
    sizing: "md",
    variant: "outlined",
    disabled: false,
    placeholder: "入力内容",
  },
});

export const Sizing = meta.story({
  name: "大きさ",
  render(args) {
    return (
      <div className="space-x-2">
        {HEIGHT_LIST.map(sizing => (
          <Input
            {...args}
            key={sizing}
            sizing={sizing}
          />
        ))}
      </div>
    );
  },
  args: {
    placeholder: "入力内容",
  },
});

export const Variants = meta.story({
  name: "外観",
  render(args) {
    return (
      <div className="space-x-2">
        {(["outlined", "underlined"] as const).map(variant => (
          <Input
            {...args}
            key={variant}
            variant={variant}
          />
        ))}
      </div>
    );
  },
  args: {
    placeholder: "入力内容",
  },
});

export const Disabled = meta.story({
  name: "無効化",
  render(args) {
    return (
      <div className="space-x-2">
        {(["outlined", "underlined"] as const).map(variant => (
          <Input
            {...args}
            key={variant}
            variant={variant}
          />
        ))}
      </div>
    );
  },
  args: {
    disabled: true,
    placeholder: "入力内容",
  },
});
