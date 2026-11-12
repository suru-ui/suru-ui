import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { DialogPopupContext, useDialogPopupContext } from "../popup/dialog.popup.context.js";
import { DialogPopup } from "../popup/dialog.popup.jsx";
import { DialogPortal } from "../portal/dialog.portal.jsx";
import { DialogViewport } from "../viewport/dialog.viewport.jsx";
import { DialogRoot } from "./dialog.root.jsx";

describe("useDialogPopupContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備。
    const provided = {
      open: true,
      size: "sm",
      nested: false,
      radius: "lg",
      variant: "stacked",
      outlined: true,
      nestedDialogOpen: false,
      transitionStatus: undefined,
    } as const;

    function Probe() {
      const ctx = useDialogPopupContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行。
    const screen = await render(
      <DialogPopupContext value={provided}>
        <Probe />
      </DialogPopupContext>,
    );

    // 検証。
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useDialogPopupContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.variant}`}</span>;
    }

    // 実行。
    const screen = await render(
      <DialogRoot defaultOpen>
        <DialogPortal>
          <DialogViewport>
            <DialogPopup size="sm" radius="lg" variant="stacked">
              <Probe />
            </DialogPopup>
          </DialogViewport>
        </DialogPortal>
      </DialogRoot>,
    );

    // 検証。
    expect(screen.getByText("sm/lg/stacked").query()?.textContent).toBe("sm/lg/stacked");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備。
    function Probe() {
      useDialogPopupContext();

      return null;
    }

    // 実行と検証。
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useDialogPopupContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
