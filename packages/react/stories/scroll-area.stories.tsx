import { preview, controls } from "../.config/storybook/preview.js";
import { ScrollArea } from "../src/scroll-area/index.js";

const meta = preview.meta({
  title: "Scroll Area",
  component: ScrollArea,
});

export default meta;

const ctrl = controls(ScrollArea, {
  alwaysShowScrollbar: {
    control: "boolean",
  },
  horizontal: {
    control: "boolean",
  },
});

const paragraphs = Array.from({ length: 8 }, (_, index) => (
  <p key={index} className="mb-4 last:mb-0">
    {index + 1}. スクロール領域はネイティブのスクロール操作を保ちながら、macOS のような細い
    スクロールバーを表示します。キーボードやタッチ操作にも対応します。
  </p>
));

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    horizontal: false,
  }),
  render(props) {
    return (
      <ScrollArea {...props} className="h-64 w-80 rounded-lg bg-(--sui-canvas-1) p-4">
        {paragraphs}
      </ScrollArea>
    );
  },
});

export const BothScrollbars = meta.story({
  name: "縦横スクロール",
  ...ctrl({
    horizontal: true,
  }),
  render(props) {
    return (
      <ScrollArea {...props} className="h-64 w-80 rounded-lg bg-(--sui-canvas-1) p-4">
        <div className="grid w-[720px] grid-cols-8 gap-2">
          {Array.from({ length: 80 }, (_, index) => (
            <div key={index} className="rounded-md bg-(--sui-canvas-2) p-3 text-center">
              {index + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  },
});

export const AlwaysShowScrollbar = meta.story({
  name: "スクロールバーを常に表示",
  ...ctrl({
    alwaysShowScrollbar: true,
    horizontal: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <ScrollArea {...props} className="h-64 w-80 rounded-lg bg-(--sui-canvas-1) p-4">
          {paragraphs}
        </ScrollArea>
        <p className="w-80">
          `alwaysShowScrollbar`
          を指定すると、スクロール領域をホバーしていなくてもスクロールバーを表示します。
        </p>
      </div>
    );
  },
});

export const KeepMounted = meta.story({
  name: "非スクロール時の保持",
  ...ctrl({
    horizontal: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <ScrollArea
          {...props}
          className="h-64 w-80 rounded-lg bg-(--sui-canvas-1) p-4"
          slotProps={{ scrollbar: { keepMounted: true } }}
        >
          {paragraphs.slice(0, 2)}
        </ScrollArea>
        <p className="w-80">
          `slotProps.scrollbar.keepMounted` を指定すると、スクロール不要な場合もスクロールバーを DOM
          に保持します。
        </p>
      </div>
    );
  },
});
