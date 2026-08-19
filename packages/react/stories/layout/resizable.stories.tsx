import { preview, controls } from "../../.config/storybook/preview.js";
import { Resizable, ResizablePanel, ResizableHandle } from "../../src/layout/resizable/index.js";
import * as ResizableParts from "../../src/layout/resizable/index.js";

const meta = preview.meta({
  title: "Layout / Resizable",
  component: Resizable,
});

export default meta;

const ctrl = controls(Resizable, {
  direction: {
    options: ["horizontal", "vertical"],
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({}),
  render(props) {
    return (
      <Resizable
        {...props}
        style={{ height: "32rem" }}
        className="w-full max-w-5xl overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3) bg-(--sui-canvas-1) shadow-sm"
      >
        <ResizablePanel minSize={20} className="bg-(--sui-canvas-2) p-6" defaultSize={35}>
          <h2 className="mb-2 text-lg font-semibold">サイドバー</h2>
          <p>パネルの境界をドラッグして幅を変更できます。</p>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="bg-(--sui-canvas-1) p-6" defaultSize={65}>
          <h2 className="mb-2 text-lg font-semibold">コンテンツ</h2>
          <p>キーボードの矢印キーでもサイズを変更できます。</p>
        </ResizablePanel>
      </Resizable>
    );
  },
});

export const Vertical = meta.story({
  name: "縦方向",
  ...ctrl({
    direction: "vertical",
  }),
  render(props) {
    return (
      <Resizable
        {...props}
        style={{ height: "36rem" }}
        className="w-full max-w-5xl overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3) bg-(--sui-canvas-1) shadow-sm"
      >
        <ResizablePanel className="bg-(--sui-canvas-2) p-6" defaultSize={40}>
          <h2 className="mb-2 text-lg font-semibold">上部パネル</h2>
          <p>上下の境界をドラッグして高さを変更できます。</p>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="bg-(--sui-canvas-1) p-6" defaultSize={60}>
          <h2 className="mb-2 text-lg font-semibold">下部パネル</h2>
          <p>縦方向のリサイズ操作を確認できます。</p>
        </ResizablePanel>
      </Resizable>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ構成",
  ...ctrl({}),
  render() {
    return (
      <ResizableParts.Root
        style={{ height: "28rem" }}
        className="w-full max-w-5xl overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3) bg-(--sui-canvas-1) shadow-sm"
      >
        <ResizableParts.Panel className="bg-(--sui-canvas-2) p-6" defaultSize={40}>
          左側
        </ResizableParts.Panel>
        <ResizableParts.Handle />
        <ResizableParts.Panel className="bg-(--sui-canvas-1) p-6" defaultSize={60}>
          右側
        </ResizableParts.Panel>
      </ResizableParts.Root>
    );
  },
});
