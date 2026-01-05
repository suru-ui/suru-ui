import { COLOR_LIST, COLOR_VARIANT_LIST, HEIGHT_LIST } from "@suru-ui/theme";
import { MailIcon, ShareIcon } from "lucide-react";
import preview from "../../.config/storybook/preview.js";
import { IconButton } from "../../src/actions/icon-button/index.js";

const meta = preview.meta({
  title: "Actions / IconButton",
  component: IconButton,
});

export default meta;

export const Usage = meta.story({
  name: "使い方",
  argTypes: {
    colorScheme: {
      options: COLOR_LIST,
      control: "select",
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    outlined: {
      control: "boolean",
    },
    sizing: {
      options: HEIGHT_LIST,
      control: "select",
    },
    variant: {
      options: COLOR_VARIANT_LIST,
      control: "select",
    },
  },
  args: {
    children: <ShareIcon />,
    colorScheme: "accent",
    sizing: "md",
    variant: "solid",
    outlined: false,
    loading: false,
    disabled: false,
  },
});

export const Sizing = meta.story({
  name: "大きさ",
  render(args) {
    return (
      <div className="space-x-2">
        {HEIGHT_LIST.map(sizing => (
          <IconButton
            {...args}
            key={sizing}
            sizing={sizing}
          />
        ))}
      </div>
    );
  },
  args: {
    children: <ShareIcon />,
  },
});

export const Variants = meta.story({
  name: "外観",
  render(args) {
    return (
      <div className="space-y-2">
        <div className="space-x-2">
          {COLOR_VARIANT_LIST.map(variant => (
            <IconButton
              {...args}
              key={variant}
              variant={variant}
            />
          ))}
        </div>
        <div className="space-x-2">
          {COLOR_VARIANT_LIST.map(variant => (
            <IconButton
              {...args}
              key={variant}
              variant={variant}
              outlined
            />
          ))}
        </div>
      </div>
    );
  },
  args: {
    children: <ShareIcon />,
  },
});

export const Colors = meta.story({
  name: "色",
  render(args) {
    return (
      <div className="space-y-2">
        {COLOR_LIST.map(colorScheme => (
          <div key={colorScheme} className="space-x-2">
            {COLOR_VARIANT_LIST.map(variant => (
              <IconButton
                {...args}
                key={variant}
                variant={variant}
                colorScheme={colorScheme}
              />
            ))}
            {COLOR_VARIANT_LIST.map(variant => (
              <IconButton
                {...args}
                key={variant}
                variant={variant}
                outlined
                colorScheme={colorScheme}
              />
            ))}
          </div>
        ))}
      </div>
    );
  },
  args: {
    children: <ShareIcon />,
  },
});

export const Link = meta.story({
  name: "リンク",
  args: {
    children: <ShareIcon />,
    render: <a href="https://example.com" target="_blank" />,
    nonNativeButton: true,
  },
});

export const LoadingState = meta.story({
  name: "読み込み状態",
  render(args) {
    return (
      <div className="space-y-2">
        <div className="space-x-2">
          {COLOR_VARIANT_LIST.map(variant => (
            <IconButton
              {...args}
              key={variant}
              variant={variant}
            />
          ))}
        </div>
        <div className="space-x-2">
          {COLOR_VARIANT_LIST.map(variant => (
            <IconButton
              {...args}
              key={variant}
              variant={variant}
              outlined
            />
          ))}
        </div>
      </div>
    );
  },
  args: {
    children: <MailIcon />,
    loading: true,
  },
});

export const Disabled = meta.story({
  name: "無効化",
  render(args) {
    return (
      <div className="space-y-2">
        <div className="space-x-2">
          {COLOR_VARIANT_LIST.map(variant => (
            <IconButton
              {...args}
              key={variant}
              variant={variant}
            />
          ))}
        </div>
        <div className="space-x-2">
          {COLOR_VARIANT_LIST.map(variant => (
            <IconButton
              {...args}
              key={variant}
              variant={variant}
              outlined
            />
          ))}
        </div>
      </div>
    );
  },
  args: {
    children: <MailIcon />,
    disabled: true,
  },
});
