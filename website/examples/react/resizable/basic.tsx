import "../../_fixture";
import { Resizable } from "@suru-ui/react/resizable";

export default function Basic() {
  return (
    <Resizable
      style={{ height: "32rem" }}
      className="w-full max-w-5xl overflow-hidden rounded-xl border-1 border-solid border-(--sui-canvas_text-3) bg-(--sui-canvas-1) shadow-sm"
    >
      <Resizable.Panel minSize={20} className="bg-(--sui-canvas-2) p-6" defaultSize={35}>
        <h2 className="mb-2 text-lg font-semibold">サイドバー</h2>
        <p>パネルの境界をドラッグして幅を変更できます。</p>
      </Resizable.Panel>
      <Resizable.Handle />
      <Resizable.Panel className="bg-(--sui-canvas-1) p-6" defaultSize={65}>
        <h2 className="mb-2 text-lg font-semibold">コンテンツ</h2>
        <p>キーボードの矢印キーでもサイズを変更できます。</p>
      </Resizable.Panel>
    </Resizable>
  );
}
