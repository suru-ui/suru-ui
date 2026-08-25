import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Popover } from "../src/popover/index.js";
import * as PopoverParts from "../src/popover/index.js";

const meta = preview.meta({
  title: "Popover",
  component: Popover,
});

export default meta;

const ctrl = controls(Popover, {
  modal: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <Popover {...props} trigger={<Button>ヘルプ</Button>}>
        <PopoverParts.Title>この項目について</PopoverParts.Title>
        <PopoverParts.Description>
          項目をダブルクリックすると編集できます。変更は自動的に保存されます。
        </PopoverParts.Description>
        <PopoverParts.Close>
          <Button>閉じる</Button>
        </PopoverParts.Close>
      </Popover>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ",
  ...ctrl({}),
  render() {
    const handle = PopoverParts.createHandle();

    return (
      <PopoverParts.Root handle={handle}>
        <PopoverParts.Trigger handle={handle}>
          {(props) => (
            <button type="button" {...props}>
              詳細
            </button>
          )}
        </PopoverParts.Trigger>
        <PopoverParts.Portal>
          <PopoverParts.Positioner>
            <PopoverParts.Popup>
              <PopoverParts.Title>詳細</PopoverParts.Title>
              <PopoverParts.Description>ここに内容を表示します。</PopoverParts.Description>
            </PopoverParts.Popup>
          </PopoverParts.Positioner>
        </PopoverParts.Portal>
      </PopoverParts.Root>
    );
  },
});

export const Arrow = meta.story({
  name: "矢印",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <Popover
        {...props}
        trigger={<Button>ヘルプ</Button>}
        slotProps={{
          arrow: {},
        }}
      >
        <PopoverParts.Description>矢印付きのポップオーバーです。</PopoverParts.Description>
      </Popover>
    );
  },
});
