import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { AlertDialog } from "../../src/overlays/alert-dialog/index.js";
import * as AlertDialogParts from "../../src/overlays/alert-dialog/index.js";

const meta = preview.meta({
  title: "Overlays / AlertDialog",
  component: AlertDialog,
});

export default meta;

const ctrl = controls(AlertDialog, {});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({}),
  render() {
    return (
      <div className="flex flex-col items-center gap-4">
        <AlertDialog
          trigger={<Button color="red">下書きを破棄</Button>}
          title="下書きを破棄しますか?"
          description="この操作は元に戻せません。"
          reject={<Button>キャンセル</Button>}
          accept={<Button color="red">破棄する</Button>}
          onAccept={() => {
            alert("下書きを破棄しました");
          }}
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
    const handle = AlertDialogParts.createHandle();

    return (
      <>
        <AlertDialogParts.Trigger handle={handle}>
          <Button color="red">削除</Button>
        </AlertDialogParts.Trigger>

        <AlertDialogParts.Root handle={handle}>
          <AlertDialogParts.Portal>
            <AlertDialogParts.Backdrop />
            <AlertDialogParts.Viewport>
              <AlertDialogParts.Popup>
                <AlertDialogParts.Title>プロジェクトを削除しますか?</AlertDialogParts.Title>
                <AlertDialogParts.Description>
                  削除したプロジェクトは元に戻せません。この操作は取り消せないため、ご注意ください。
                </AlertDialogParts.Description>
                <div className="flex justify-end gap-2">
                  <AlertDialogParts.Close>
                    <Button variant="naked">キャンセル</Button>
                  </AlertDialogParts.Close>
                  <AlertDialogParts.Close>
                    <Button color="red">削除</Button>
                  </AlertDialogParts.Close>
                </div>
              </AlertDialogParts.Popup>
            </AlertDialogParts.Viewport>
          </AlertDialogParts.Portal>
        </AlertDialogParts.Root>
      </>
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
        <AlertDialog open={open} onOpenChange={setOpen} title="制御されたダイアログ">
          <p className="text-sm text-neutral-500">
            `open` と `onOpenChange` でダイアログを制御できます。
          </p>
        </AlertDialog>
        <button type="button" className="sui_alert_dialog_trigger" onClick={() => setOpen(true)}>
          開く
        </button>
      </>
    );
  },
});
