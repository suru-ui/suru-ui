import { ResizableContext, useResizableContext } from "../root/resizable.root.context.js";

// ResizablePanel は Context を変更・拡張しないため、親の ResizableContext をそのまま使う。
export {
  ResizableContext as PanelContext,
  useResizableContext as usePanelContext,
  ResizableContext as ResizablePanelContext,
  useResizableContext as useResizablePanelContext,
};
