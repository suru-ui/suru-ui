import { preview } from "../.config/storybook/preview.js";
import { Resizable } from "../src/resizable/index.js";

const meta = preview.meta({
  title: "Resizable",
  component: Resizable,
});

export default meta;

export const Usage = meta.story({
  name: "使い方",
  render(props) {
    return (
      <div className="h-[200px] w-[500px]">
        <Resizable {...props} className="rounded-xl border-1 border-solid">
          <Resizable.Panel minSize={20} className="bg-(--sui-canvas-2) p-6" defaultSize={50}>
            <h2 className="mb-2 text-lg font-semibold">サイドバー</h2>
            <p>パネルの境界をドラッグして幅を変更できます。</p>
          </Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel className="bg-(--sui-canvas-1) p-6" defaultSize={50}>
            <h2 className="mb-2 text-lg font-semibold">コンテンツ</h2>
            <p>キーボードの矢印キーでもサイズを変更できます。</p>
          </Resizable.Panel>
        </Resizable>
      </div>
    );
  },
});

export const Vertical = meta.story({
  name: "縦方向",
  render(props) {
    return (
      <div className="h-[400px] w-[400px]">
        <Resizable {...props} className="rounded-xl border-1 border-solid" orientation="vertical">
          <Resizable.Panel className="bg-(--sui-canvas-2) p-6" defaultSize={50}>
            <h2 className="mb-2 text-lg font-semibold">上部パネル</h2>
            <p>上下の境界をドラッグして高さを変更できます。</p>
          </Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel className="bg-(--sui-canvas-1) p-6" defaultSize={50}>
            <h2 className="mb-2 text-lg font-semibold">下部パネル</h2>
            <p>縦方向のリサイズ操作を確認できます。</p>
          </Resizable.Panel>
        </Resizable>
      </div>
    );
  },
});

export const Invisible = meta.story({
  name: "非表示",
  render(props) {
    return (
      <div className="h-[100px] w-[400px]">
        <Resizable {...props} className="rounded-xl border-1 border-solid">
          <Resizable.Panel className="bg-(--sui-canvas-2) p-6" defaultSize={50}>
            左側
          </Resizable.Panel>
          <Resizable.Handle invisible />
          <Resizable.Panel className="bg-(--sui-canvas-1) p-6" defaultSize={50}>
            右側
          </Resizable.Panel>
        </Resizable>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  render(props) {
    return (
      <div className="h-[100px] w-[400px]">
        <Resizable {...props} className="rounded-xl border-1 border-solid">
          <Resizable.Panel className="bg-(--sui-canvas-2) p-6" defaultSize={50}>
            左側
          </Resizable.Panel>
          <Resizable.Handle disabled />
          <Resizable.Panel className="bg-(--sui-canvas-1) p-6" defaultSize={50}>
            右側
          </Resizable.Panel>
        </Resizable>
      </div>
    );
  },
});
