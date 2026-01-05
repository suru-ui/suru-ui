import { COLOR_LIST, COLOR_VARIANT_LIST, HEIGHT_LIST } from "@suru-ui/theme";
import { EditIcon, ExternalLinkIcon, MailIcon, SettingsIcon } from "lucide-react";
import preview from "../../.config/storybook/preview.js";
import { Button } from "../../src/actions/button/index.js";

const meta = preview.meta({
  title: "Actions / Button",
  component: Button,
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
    multiline: {
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
    children: "ボタン",
    colorScheme: "accent",
    sizing: "md",
    variant: "solid",
    outlined: false,
    loading: false,
    multiline: false,
    disabled: false,
  },
});

export const Sizing = meta.story({
  name: "大きさ",
  render(args) {
    return (
      <div className="space-x-2">
        {HEIGHT_LIST.map(sizing => (
          <Button
            {...args}
            key={sizing}
            sizing={sizing}
          />
        ))}
      </div>
    );
  },
  args: {
    children: "ボタン",
  },
});

export const Variants = meta.story({
  name: "外観",
  render(args) {
    return (
      <div className="space-y-2">
        <div className="space-x-2">
          {COLOR_VARIANT_LIST.map(variant => (
            <Button
              {...args}
              key={variant}
              variant={variant}
            />
          ))}
        </div>
        <div className="space-x-2">
          {COLOR_VARIANT_LIST.map(variant => (
            <Button
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
    children: "ボタン",
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
              <Button
                {...args}
                key={variant}
                variant={variant}
                colorScheme={colorScheme}
              />
            ))}
            {COLOR_VARIANT_LIST.map(variant => (
              <Button
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
    children: "ボタン",
  },
});

export const WithIcon = meta.story({
  name: "アイコン付き",
  args: {
    children: "設定",
    startIcon: <SettingsIcon />,
  },
});

export const Justified = meta.story({
  name: "整列",
  args: {
    children: "設定",
    startIcon: <SettingsIcon />,
    endIcon: <SettingsIcon />,
    style: {
      width: 200,
    },
  },
});

export const TextOverflow = meta.story({
  name: "複数行",
  render(args) {
    return (
      <div className="space-y-2">
        <div>
          <Button {...args} />
        </div>
        <div>
          <Button {...args} multiline />
        </div>
        <div>
          <Button multiline>
            <EditIcon size={28} />
            <span className="mt-2">編集</span>
          </Button>
        </div>
      </div>
    );
  },
  args: {
    children: "長いテキスト長いテキスト",
    startIcon: <SettingsIcon />,
    endIcon: <SettingsIcon />,
    style: {
      width: 200,
    },
  },
});

export const Link = meta.story({
  name: "リンク",
  args: {
    children: "リンク",
    startIcon: <ExternalLinkIcon />,
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
            <Button
              {...args}
              key={variant}
              variant={variant}
            />
          ))}
        </div>
        <div className="space-x-2">
          {COLOR_VARIANT_LIST.map(variant => (
            <Button
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
    children: "送信",
    startIcon: <MailIcon />,
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
            <Button
              {...args}
              key={variant}
              variant={variant}
            />
          ))}
        </div>
        <div className="space-x-2">
          {COLOR_VARIANT_LIST.map(variant => (
            <Button
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
    children: "送信",
    startIcon: <MailIcon />,
    disabled: true,
  },
});
