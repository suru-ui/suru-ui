import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Dialog } from "../../src/overlays/dialog/index.js";
import * as DialogParts from "../../src/overlays/dialog/index.js";

const meta = preview.meta({
  title: "Overlays / Dialog",
  component: Dialog,
});

export default meta;

const ctrl = controls(Dialog, {});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({}),
  render() {
    return (
      <div className="flex flex-col items-center gap-4">
        <Dialog
          trigger={<Button>通知を見る</Button>}
          title="通知"
          description="新しい通知はありません。"
          close={<Button variant="naked">閉じる</Button>}
        />
        <p className="text-sm text-neutral-500">
          トリガーをクリックすると、ポップアップが中央に表示されます。
        </p>
      </div>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ",
  ...ctrl({}),
  render() {
    const handle = DialogParts.createHandle();

    return (
      <DialogParts.Root handle={handle}>
        <DialogParts.Trigger handle={handle}>
          {(props) => (
            <button type="button" {...props}>
              通知を見る
            </button>
          )}
        </DialogParts.Trigger>
        <DialogParts.Portal>
          <DialogParts.Backdrop />
          <DialogParts.Viewport>
            <DialogParts.Popup>
              <DialogParts.Title>通知</DialogParts.Title>
              <DialogParts.Description>新しい通知はありません。</DialogParts.Description>
              <DialogParts.Close>
                {(props) => (
                  <button type="button" {...props}>
                    閉じる
                  </button>
                )}
              </DialogParts.Close>
            </DialogParts.Popup>
          </DialogParts.Viewport>
        </DialogParts.Portal>
      </DialogParts.Root>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({}),
  render() {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Dialog open={open} onOpenChange={setOpen} title="制御されたダイアログ">
          <p className="text-sm text-neutral-500">`open` と `onOpenChange` で制御できます。</p>
        </Dialog>
        <Button onClick={() => setOpen(true)}>開く</Button>
      </>
    );
  },
});
