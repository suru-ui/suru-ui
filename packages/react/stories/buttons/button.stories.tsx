import { COLOR_TEMPLATES as VALIANTS, COLORS, SIZES } from "@suru-ui/theme";
import { CogIcon, DeleteIcon, EllipsisIcon, GlobeIcon, Trash2Icon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";

const meta = preview.meta({
  title: "Buttons / Button",
  component: Button,
});

export default meta;

const ctrl = controls(Button, {
  color: {
    options: COLORS,
    control: "select",
  },
  isDisabled: {
    control: "boolean",
  },
  isOutlined: {
    control: "boolean",
  },
  isPending: {
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
    children: "ボタン",
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    isOutlined: false,
    isPending: false,
    isDisabled: false,
  }),
});

export const Variants = meta.story({
  name: "外観",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "rounded",
    isOutlined: false,
    isPending: false,
    isDisabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Button {...props} variant="solid">
          ソリッド
        </Button>
        <Button {...props} variant="naked">
          ネイキッド
        </Button>
        <Button {...props} variant="liquid">
          リキッド
        </Button>
      </div>
    );
  },
});

export const WithIcons = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "solid",
    size: "md",
    radius: "rounded",
    isOutlined: false,
    isPending: false,
    isDisabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-center gap-3">
          <Button {...props} color="blue">
            <GlobeIcon />
            検索
          </Button>
          <Button {...props} color="red">
            削除
            <DeleteIcon />
          </Button>
        </div>
        <div className="flex justify-center gap-3">
          <Button {...props} color="blue" direction="column">
            <GlobeIcon />
            検索
          </Button>
          <Button {...props} color="red" direction="column">
            削除
            <DeleteIcon />
          </Button>
        </div>
      </div>
    );
  },
});

export const Squared = meta.story({
  name: "正方形",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    isOutlined: false,
    isPending: false,
    isDisabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Button {...props} isSquared>
          <EllipsisIcon />
        </Button>
        <Button {...props} isSquared>
          <CogIcon />
        </Button>
        <Button {...props} isSquared>
          <Trash2Icon />
        </Button>
      </div>
    );
  },
});

export const Pending = meta.story({
  name: "保留",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    isOutlined: false,
    isDisabled: false,
  }),
  render(props) {
    const [progressValue, setProgressValue] = React.useState<number>();
    const [isPending, startTransition] = React.useTransition();
    const handlePress = () => {
      startTransition(async () => {
        const client = {
          _size: 300,
          _sleep: (t: number) => new Promise((r) => setTimeout(r, t)),
          async connect() {
            await this._sleep(1e3);
          },
          async stat(_resourceName: string) {
            return {
              size: this._size,
            };
          },
          async *read(_resourceName: string) {
            let total = 0;
            while (total < this._size) {
              const latency = Math.random() * 1e3;
              await this._sleep(latency);

              const chunkSize = (() => {
                const claim = Math.random() * 30;
                const acc = total;
                total += claim;
                total = Math.min(total, this._size);

                return total - acc;
              })();

              yield {
                length: chunkSize,
              };
            }
          },
          async disconnect() {
            await this._sleep(1e3);
          },
        };

        setProgressValue(0);

        await client.connect();
        const { size } = await client.stat("foo.zip");

        let total = 0;
        for await (const chunk of client.read("foo.zip")) {
          total += chunk.length;
          const percentage = (total / size) * 100;
          setProgressValue(percentage);
        }

        await client.disconnect();

        setProgressValue(undefined);
      });
    };

    return (
      <div className="flex flex-wrap gap-3">
        <Button {...props} isPending>
          検索
        </Button>
        <Button {...props} isPending isSquared>
          <Trash2Icon />
        </Button>
        <Button
          {...props}
          isPending={isPending}
          progressValue={progressValue}
          onPress={handlePress}
        >
          進捗度付き
        </Button>
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    isOutlined: false,
    isPending: false,
    isDisabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Button {...props} radius="none">
          NONE
        </Button>
        <Button {...props} radius="rounded">
          ROUNDED
        </Button>
        <Button {...props} radius="full">
          FULL
        </Button>
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "rounded",
    isPending: false,
    isDisabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Button {...props} variant="solid" isOutlined>
          ソリッド
        </Button>
        <Button {...props} variant="naked" isOutlined>
          ネイキッド
        </Button>
        <Button {...props} variant="liquid" isOutlined>
          リキッド
        </Button>
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "solid",
    color: "grey",
    radius: "rounded",
    isOutlined: false,
    isPending: false,
    isDisabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          <Button {...props} size="sm">
            <Trash2Icon />
            Small
          </Button>
          <Button {...props} size="md">
            <Trash2Icon />
            Medium
          </Button>
          <Button {...props} size="lg">
            <Trash2Icon />
            Large
          </Button>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button {...props} size="sm" isSquared>
            <Trash2Icon />
          </Button>
          <Button {...props} size="md" isSquared>
            <Trash2Icon />
          </Button>
          <Button {...props} size="lg" isSquared>
            <Trash2Icon />
          </Button>
        </div>
      </div>
    );
  },
});

export const FullWidth = meta.story({
  name: "最大幅",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    isOutlined: false,
    isPending: false,
    isDisabled: false,
  }),
  render(props) {
    return (
      <div className="space-y-1">
        <Button {...props} className="w-full">
          {"width: 100%"}
        </Button>
        <div className="flex w-[200px] gap-1">
          <Button {...props} className="flex-1">
            {"flex: 1"}
          </Button>
          <Button {...props} isSquared>
            <EllipsisIcon />
          </Button>
        </div>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    isOutlined: false,
    isPending: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Button {...props} isDisabled>
          送信
        </Button>
        <Button {...props} isDisabled isSquared>
          <EllipsisIcon />
        </Button>
      </div>
    );
  },
});
