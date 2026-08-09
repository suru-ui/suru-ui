import { preview, controls } from "../../.config/storybook/preview.js";
import { ScrollArea } from "../../src/navigation/scroll-area/index.js";
import * as ScrollAreaParts from "../../src/navigation/scroll-area/index.js";

const meta = preview.meta({
  title: "Navigation / Scroll Area",
  component: ScrollArea,
});

export default meta;

const ctrl = controls(ScrollArea, {});

const paragraphs = Array.from({ length: 8 }, (_, index) => (
  <p key={index} className="mb-4 last:mb-0">
    {index + 1}. スクロール領域はネイティブのスクロール操作を保ちながら、macOS のような細い
    スクロールバーを表示します。キーボードやタッチ操作にも対応します。
  </p>
));

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({}),
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
  ...ctrl({}),
  render(props) {
    return (
      <ScrollArea {...props} horizontal className="h-64 w-80 rounded-lg bg-(--sui-canvas-1) p-4">
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

export const Parts = meta.story({
  name: "パーツ構成",
  ...ctrl({}),
  render() {
    return (
      <ScrollAreaParts.Root className="h-64 w-80">
        <ScrollAreaParts.Viewport className="rounded-lg bg-(--sui-canvas-1) p-4">
          <ScrollAreaParts.Content>{paragraphs}</ScrollAreaParts.Content>
        </ScrollAreaParts.Viewport>
        <ScrollAreaParts.Scrollbar>
          <ScrollAreaParts.Thumb />
        </ScrollAreaParts.Scrollbar>
      </ScrollAreaParts.Root>
    );
  },
});
