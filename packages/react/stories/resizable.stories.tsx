import { preview, controls } from "../.config/storybook/preview.js";
import { Resizable, ResizablePanel, ResizableHandle } from "../src/resizable/index.js";

const meta = preview.meta({
  title: "Resizable",
  component: Resizable,
});

export default meta;

const ctrl = controls(Resizable, {
  direction: {
    control: "select",
    options: ["horizontal", "vertical"],
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

export const WithoutGrip = meta.story({
  name: "グリップなし",
  ...ctrl({}),
  render(props) {
    return (
      <Resizable
        {...props}
        style={{ height: "28rem" }}
        className="w-full max-w-5xl overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3) bg-(--sui-canvas-1) shadow-sm"
      >
        <ResizablePanel className="bg-(--sui-canvas-2) p-6" defaultSize={40}>
          左側
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="bg-(--sui-canvas-1) p-6" defaultSize={60}>
          右側
        </ResizablePanel>
      </Resizable>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({}),
  render(props) {
    return (
      <Resizable
        {...props}
        style={{ height: "28rem" }}
        className="w-full max-w-5xl overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3) bg-(--sui-canvas-1) shadow-sm"
      >
        <ResizablePanel className="bg-(--sui-canvas-2) p-6" defaultSize={40}>
          左側
        </ResizablePanel>
        <ResizableHandle disabled withHandle />
        <ResizablePanel className="bg-(--sui-canvas-1) p-6" defaultSize={60}>
          右側
        </ResizablePanel>
      </Resizable>
    );
  },
});
