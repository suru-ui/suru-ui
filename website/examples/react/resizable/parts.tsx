import "../../_fixture";
import * as ResizableParts from "@suru-ui/react/resizable";

export default function Parts() {
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
}
