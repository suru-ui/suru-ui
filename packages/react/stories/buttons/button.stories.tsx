import { COLOR_TEMPLATES as VALIANTS, COLORS, SIZES } from "@suru-ui/theme";
import { CogIcon, DeleteIcon, EllipsisIcon, GlobeIcon, Trash2Icon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import * as ButtonParts from "../../src/buttons/button/index.js";

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
    outlined: false,
    pending: false,
    disabled: false,
  }),
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
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

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    variant: "solid",
    size: "md",
    radius: "rounded",
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <Button {...props} key={color} color={color}>
            ボタン
          </Button>
        ))}
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
    outlined: false,
    pending: false,
    disabled: false,
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
          <Button {...props} color="blue" slotProps={{ content: { className: "flex-col" } }}>
            <GlobeIcon />
            検索
          </Button>
          <Button {...props} color="red" slotProps={{ content: { className: "flex-col" } }}>
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
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Button {...props} squared>
          <EllipsisIcon />
        </Button>
        <Button {...props} squared>
          <CogIcon />
        </Button>
        <Button {...props} squared>
          <Trash2Icon />
        </Button>
      </div>
    );
  },
});

class FakeClient {
  #size = 300;

  #sleep = (t: number) => new Promise((r) => setTimeout(r, t));

  async connect() {
    await this.#sleep(1e3);
  }

  async stat(_resourceName: string) {
    return {
      size: this.#size,
    };
  }

  async *read(_resourceName: string) {
    let total = 0;
    while (total < this.#size) {
      const latency = Math.random() * 1e3;
      await this.#sleep(latency);

      const chunkSize = (() => {
        const claim = Math.random() * 30;
        const acc = total;
        total += claim;
        total = Math.min(total, this.#size);

        return total - acc;
      })();

      yield {
        length: chunkSize,
      };
    }
  }

  async disconnect() {
    await this.#sleep(1e3);
  }
}

function useProgress() {
  const [percentage, setPercentage] = React.useState<number>();
  const [pending, startTransition] = React.useTransition();
  const clickHandler = (evt: { currentTarget: { value: string } }) => {
    const resourceName = evt.currentTarget.value;
    startTransition(async () => {
      const client = new FakeClient();

      await client.connect();
      const { size } = await client.stat(resourceName);

      setPercentage(0);

      let total = 0;
      for await (const chunk of client.read(resourceName)) {
        total += chunk.length;
        setPercentage((total / size) * 100);
      }

      await client.disconnect();

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
    variant: "solid",
    color: "grey",
    size: "md",
    radius: "rounded",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    const progress1 = useProgress();
    const progress2 = useProgress();

    return (
      <div className="flex flex-wrap gap-3">
        <Button {...props} pending>
          検索
        </Button>
        <Button {...props} pending squared>
          <Trash2Icon />
        </Button>
        <Button
          {...props}
          value="foo.zip"
          pending={progress1.pending}
          onClick={progress1.clickHandler}
          percentage={progress1.percentage}
        >
          ダウンロード
        </Button>
        <ButtonParts.Root
          {...props}
          value="foo.zip"
          pending={progress2.pending}
          onClick={progress2.clickHandler}
          className="w-[120px]"
        >
          <ButtonParts.Content>
            <ButtonParts.Pending>
              <ButtonParts.CircularProgress>
                <ButtonParts.CircularProgressTrack />
                <ButtonParts.CircularProgressFill>
                  <ButtonParts.CircularProgressFillRotation />
                </ButtonParts.CircularProgressFill>
              </ButtonParts.CircularProgress>
            </ButtonParts.Pending>

            {progress2.pending && progress2.percentage !== undefined
              ? `${Math.trunc(progress2.percentage)}%完了`
              : "アップロード"}
          </ButtonParts.Content>
        </ButtonParts.Root>
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
    outlined: false,
    pending: false,
    disabled: false,
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
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Button {...props} variant="solid" outlined>
          ソリッド
        </Button>
        <Button {...props} variant="naked" outlined>
          ネイキッド
        </Button>
        <Button {...props} variant="liquid" outlined>
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
    outlined: false,
    pending: false,
    disabled: false,
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
          <Button {...props} size="sm" squared>
            <Trash2Icon />
          </Button>
          <Button {...props} size="md" squared>
            <Trash2Icon />
          </Button>
          <Button {...props} size="lg" squared>
            <Trash2Icon />
          </Button>
        </div>
        <div className="flex justify-center gap-3 h-[50px]">
          <Button {...props}>
            <Trash2Icon />
            ボタン
          </Button>
          <Button {...props} squared>
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
    outlined: false,
    pending: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="space-y-1">
        <Button {...props} className="w-full">
          {"width: 100%"}
        </Button>
        <div className="flex w-[200px] gap-1">
          <Button {...props} className="w-full">
            {"width: 100%"}
          </Button>
          <Button {...props} squared>
            <EllipsisIcon />
          </Button>
        </div>
        <div className="flex w-[200px] gap-1">
          <Button {...props} className="flex-1">
            {"flex: 1"}
          </Button>
          <Button {...props} squared>
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
    outlined: false,
    pending: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Button {...props} disabled>
          送信
        </Button>
        <Button {...props} disabled squared>
          <EllipsisIcon />
        </Button>
      </div>
    );
  },
});
