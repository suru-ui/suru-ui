import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Toast, useToastManager } from "../../src/overlays/toast/index.js";
import * as ToastParts from "../../src/overlays/toast/index.js";

const meta = preview.meta({
  title: "Overlays / Toast",
  component: Toast,
});

export default meta;

const ctrl = controls(Toast, {
  limit: {
    control: "number",
  },
  timeout: {
    control: "number",
  },
});

function CreateToastButton() {
  const toastManager = useToastManager();
  const [count, setCount] = React.useState(0);

  return (
    <button
      type="button"
      onClick={() => {
        const nextCount = count + 1;
        setCount(nextCount);
        toastManager.add({
          title: `通知 ${nextCount}`,
          description: "処理が完了しました。",
          actionProps: {
            children: "取り消す",
          },
        });
      }}
    >
      通知を追加
    </button>
  );
}

function PartsExample() {
  const { toasts } = ToastParts.useToastManager();

  return (
    <>
      <CreateToastButton />
      <ToastParts.Portal>
        <ToastParts.Viewport>
          {toasts.map((toast) => (
            <ToastParts.Root key={toast.id} toast={toast}>
              <ToastParts.Content>
                <div className="sui_toast_text">
                  <ToastParts.Title />
                  <ToastParts.Description />
                </div>
                <ToastParts.Action />
                <ToastParts.Close>閉じる</ToastParts.Close>
              </ToastParts.Content>
            </ToastParts.Root>
          ))}
        </ToastParts.Viewport>
      </ToastParts.Portal>
    </>
  );
}

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    limit: 3,
    timeout: 5000,
  }),
  render(props) {
    return (
      <Toast {...props}>
        <CreateToastButton />
      </Toast>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ",
  ...ctrl({}),
  render() {
    return (
      <ToastParts.Provider>
        <PartsExample />
      </ToastParts.Provider>
    );
  },
});

export const Types = meta.story({
  name: "種類",
  ...ctrl({}),
  render() {
    const [toastManager] = React.useState(ToastParts.createToastManager);

    return (
      <ToastParts.Provider toastManager={toastManager}>
        <button
          type="button"
          onClick={() => {
            toastManager.add({ type: "success", description: "成功しました。" });
            toastManager.add({ type: "info", description: "情報を確認してください。" });
            toastManager.add({ type: "error", description: "処理に失敗しました。" });
          }}
        >
          3 種類の通知を追加
        </button>
        <PartsExample />
      </ToastParts.Provider>
    );
  },
});
