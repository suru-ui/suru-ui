import * as theme from "@suru-ui/theme";
import { GlobeIcon, DeleteIcon, ItalicIcon, Trash2Icon, EllipsisIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "./index.js";
import * as ButtonParts from "./index.js";

const COLORS: readonly Button.Color[] = theme.COLORS;
const RADII: readonly Button.Radius[] = ["none", ...theme.BUTTON_SIZES, "full", "circle"];
const SIZES: readonly Button.Size[] = theme.BUTTON_SIZES;
const VARIANTS: readonly Button.Variant[] = theme.COLOR_TEMPLATES;

const meta = preview.meta({
  title: "Button",
  component: Button,
});

export default meta;

const ctrl = controls(Button, {
  size: {
    control: "select",
    options: SIZES,
  },
  thin: {
    control: "boolean",
  },
  color: {
    control: "select",
    options: COLORS,
  },
  muted: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  pending: {
    control: "boolean",
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  children: {
    control: "text",
  },
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    thin: false,
    color: "grey",
    muted: false,
    radius: undefined,
    pending: false,
    variant: "solid",
    children: "ボタン",
    disabled: false,
    outlined: false,
  }),
});

export const WithIcons = meta.story({
  name: "アイコン付き",
  ...ctrl({
    size: "md",
    color: "grey",
    muted: false,
    radius: undefined,
    pending: false,
    variant: "solid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-center gap-2">
          <span>水平</span>
          <div className="flex justify-center gap-3">
            <Button {...props}>
              <GlobeIcon />
              ボタン
            </Button>
            <Button {...props}>
              ボタン
              <DeleteIcon />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>垂直</span>
          <div className="flex justify-center gap-3">
            <Button
              {...props}
              className="[--sui_button_icon-size:28px] [--sui_button_pending_icon-size:28px]"
              slotProps={{
                content: {
                  className: "flex-col gap-[8px]",
                },
              }}
            >
              <GlobeIcon className="size-[28px]" />
              ボタン
            </Button>
          </div>
        </div>
      </div>
    );
  },
});

export const Squared = meta.story({
  name: "正方形",
  ...ctrl({
    size: "md",
    color: "grey",
    muted: false,
    radius: undefined,
    pending: false,
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <Button {...props} squared variant={variant}>
              <Trash2Icon />
            </Button>
          </div>
        ))}
      </div>
    );
  },
});

export const Thin = meta.story({
  name: "薄型",
  ...ctrl({
    color: "grey",
    muted: false,
    radius: undefined,
    pending: false,
    variant: "solid",
    children: "ボタン",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="grid grid-cols-5 items-center justify-items-start gap-3">
        <span />
        {SIZES.map((size) => (
          <span key={size} className="justify-self-center">
            {size}
          </span>
        ))}
        <span>通常</span>
        {SIZES.map((size) => (
          <Button key={size} {...props} size={size} />
        ))}
        <span>thin</span>
        {SIZES.map((size) => (
          <Button key={size} {...props} size={size} thin />
        ))}
      </div>
    );
  },
});

class FakeClient {
  readonly #size = 300;

  readonly #sleep = (t: number) => new Promise((r) => setTimeout(r, t));

  public async connect() {
    await this.#sleep(1e3);
  }

  public async stat(_resourceName: string) {
    return {
      size: this.#size,
    };
  }

  public async *read(_resourceName: string) {
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

  public async disconnect() {
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

function PendingProgress(props: {}) {
  const progress = useProgress();

  return (
    <Button
      {...props}
      value="foo.zip"
      onClick={progress.clickHandler}
      pending={progress.pending}
      percentage={progress.percentage}
    >
      ダウンロード
    </Button>
  );
}

function PendingCustomStyle(props: {}) {
  const Button = ButtonParts;

  const progress = useProgress();

  return (
    <Button.Root
      {...props}
      value="foo.zip"
      onClick={progress.clickHandler}
      pending={progress.pending}
    >
      <Button.Pending keepMounted>
        <Button.CircularProgress>
          <Button.CircularProgressTrack />
          <Button.CircularProgressFill>
            <Button.CircularProgressFillRotation />
          </Button.CircularProgressFill>
        </Button.CircularProgress>
      </Button.Pending>
      <Button.Content className="w-[100px]">
        {progress.pending && progress.percentage !== undefined
          ? `${Math.trunc(progress.percentage)}%完了`
          : "アップロード"}
      </Button.Content>
    </Button.Root>
  );
}

export const Pending = meta.story({
  name: "保留",
  ...ctrl({
    size: "md",
    color: "grey",
    muted: false,
    radius: undefined,
    variant: "solid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span>不定</span>
          <div className="flex flex-wrap gap-3">
            <Button {...props} pending>
              検索
            </Button>
            <Button {...props} pending squared>
              <Trash2Icon />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>進捗度付き</span>
          <div>
            <PendingProgress {...props} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>進捗度表記のカスタマイズ</span>
          <div>
            <PendingCustomStyle {...props} />
          </div>
        </div>
      </div>
    );
  },
});

export const FullWidth = meta.story({
  name: "最大幅",
  ...ctrl({
    size: "md",
    color: "grey",
    muted: false,
    radius: undefined,
    pending: false,
    variant: "solid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="space-y-3">
        <Button {...props} className="w-full">
          width: 100%
        </Button>
        <div className="flex w-[200px] gap-1">
          <Button {...props} className="w-full">
            width: 100%
          </Button>
          <Button {...props} squared>
            <EllipsisIcon />
          </Button>
        </div>
        <div className="flex w-[200px] gap-1">
          <Button {...props} className="flex-1">
            flex: 1
          </Button>
          <Button {...props} squared>
            <EllipsisIcon />
          </Button>
        </div>
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    size: "md",
    color: "grey",
    muted: false,
    radius: undefined,
    pending: false,
    children: "ボタン",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <Button {...props} variant={variant} />
          </div>
        ))}
      </div>
    );
  },
});

export const Muted = meta.story({
  name: "控えめ",
  ...ctrl({
    size: "md",
    color: "red",
    radius: undefined,
    pending: false,
    children: "削除",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <Button {...props} muted variant={variant} />
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
    muted: false,
    radius: undefined,
    pending: false,
    variant: "solid",
    children: "ボタン",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col items-center gap-2">
            <span>{color}</span>
            <Button {...props} color={color} />
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
    muted: false,
    radius: undefined,
    pending: false,
    variant: "solid",
    children: "ボタン",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <span>{size}</span>
              <Button {...props} size={size}>
                <ItalicIcon />
                {props.children}
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <span>{size}</span>
              <Button {...props} size={size} squared>
                <ItalicIcon />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>親要素に合わせる</span>
          <div className="flex justify-center gap-3 h-[50px]">
            <Button {...props}>
              <ItalicIcon />
              {props.children}
            </Button>
            <Button {...props} squared>
              <ItalicIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    size: "md",
    color: "grey",
    muted: false,
    pending: false,
    variant: "solid",
    children: "ボタン",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-2">
            <span>{radius}</span>
            <Button {...props} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    size: "md",
    color: "grey",
    muted: false,
    radius: undefined,
    pending: false,
    children: "ボタン",
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <Button {...props} variant={variant} outlined />
          </div>
        ))}
      </div>
    );
  },
});

export const RootOnly = meta.story({
  name: "ルートのみ",
  ...ctrl({
    size: "md",
    color: "grey",
    muted: false,
    radius: undefined,
    pending: false,
    variant: "solid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    const Button = ButtonParts;

    return (
      <div className="flex flex-wrap gap-3">
        <Button.Root {...props}>ボタン</Button.Root>
        <Button.Root {...props}>
          <GlobeIcon />
          ボタン
        </Button.Root>
        <Button.Root {...props} squared>
          <Trash2Icon />
        </Button.Root>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    size: "md",
    color: "grey",
    muted: false,
    radius: undefined,
    pending: false,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <div className="flex gap-1">
              <Button {...props} variant={variant} disabled>
                送信
              </Button>
              <Button {...props} squared variant={variant} disabled>
                <EllipsisIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  },
});
