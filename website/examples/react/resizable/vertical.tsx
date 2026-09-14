import "../../_fixture";
import { Resizable } from "@suru-ui/react/resizable";

export default function Vertical() {
  return (
    <Resizable
      orientation="vertical"
      style={{ height: "36rem" }}
      className="w-full max-w-5xl overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3) bg-(--sui-canvas-1) shadow-sm"
    >
      <Resizable.Panel className="bg-(--sui-canvas-2) p-6" defaultSize={40}>
        <h2 className="mb-2 text-lg font-semibold">上部パネル</h2>
        <p>上下の境界をドラッグして高さを変更できます。</p>
      </Resizable.Panel>
      <Resizable.Handle />
      <Resizable.Panel className="bg-(--sui-canvas-1) p-6" defaultSize={60}>
        <h2 className="mb-2 text-lg font-semibold">下部パネル</h2>
        <p>縦方向のリサイズ操作を確認できます。</p>
      </Resizable.Panel>
    </Resizable>
  );
}
