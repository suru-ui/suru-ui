import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import {
  AlertDialogPopupContext,
  useAlertDialogPopupContext,
} from "../popup/alert-dialog.popup.context.js";
import { AlertDialogPopup } from "../popup/alert-dialog.popup.jsx";
import { AlertDialogPortal } from "../portal/alert-dialog.portal.jsx";
import { AlertDialogViewport } from "../viewport/alert-dialog.viewport.jsx";
import { AlertDialogRoot } from "./alert-dialog.root.jsx";

describe("useAlertDialogPopupContext", () => {
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
      const ctx = useAlertDialogPopupContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行。
    const screen = await render(
      <AlertDialogPopupContext value={provided}>
        <Probe />
      </AlertDialogPopupContext>,
    );

    // 検証。
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useAlertDialogPopupContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.variant}`}</span>;
    }

    // 実行。
    const screen = await render(
      <AlertDialogRoot defaultOpen>
        <AlertDialogPortal>
          <AlertDialogViewport>
            <AlertDialogPopup size="sm" radius="lg" variant="stacked">
              <Probe />
            </AlertDialogPopup>
          </AlertDialogViewport>
        </AlertDialogPortal>
      </AlertDialogRoot>,
    );

    // 検証。
    expect(screen.getByText("sm/lg/stacked").query()?.textContent).toBe("sm/lg/stacked");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備。
    function Probe() {
      useAlertDialogPopupContext();

      return null;
    }

    // 実行と検証。
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useAlertDialogPopupContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
