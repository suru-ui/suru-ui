import "@suru-ui/theme/suru.css";
import * as React from "react";
import { vi, test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { useToastClient } from "./client/toast.client.js";
import "./toast.parts.js";
import "../../tests/src/_locators.js";
import { Toast } from "./toast.jsx";

/**
 * 通知を追加するボタンを描画します。
 * 通知の配置や重なりの検証で通知を追加する目的で使用します。
 */
function AddButton() {
  const client = useToastClient();

  return (
    <button type="button" onClick={() => client.add({ title: "通知" })}>
      追加
    </button>
  );
}

describe("Toast の配置", () => {
  test("表示領域を右下に固定する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_toast_viewport").element());
    expect(style.position).toBe("fixed");
    expect(style.right).toBe("0px");
    expect(style.bottom).toBe("0px");
    expect(style.zIndex).toBe("1000");
    expect(style.pointerEvents).toBe("none");
  });

  test("通知の移動を滑らかにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_toast").element());
    expect(style.transitionProperty).toBe("translate, scale, opacity, height");
    expect(style.transitionDuration).toBe("0.5s, 0.5s, 0.5s, 0.15s");
  });

  test("通知を表示領域の内側に余白を空けて置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const viewport = screen.getByClassName("sui_toast_viewport").element();
    const root = screen.getByClassName("sui_toast").element();
    expect(getComputedStyle(viewport).rowGap).toBe("12px");
    expect(getComputedStyle(viewport).paddingTop).toBe("8px");
    expect(getComputedStyle(viewport).paddingLeft).toBe("8px");
    expect(getComputedStyle(root).right).toBe("8px");
    expect(getComputedStyle(root).bottom).toBe("8px");
    await vi.waitFor(() => {
      const viewportRect = viewport.getBoundingClientRect();
      const rootRect = root.getBoundingClientRect();
      expect(viewportRect.right - rootRect.right).toBeCloseTo(8, 1);
      expect(viewportRect.bottom - rootRect.bottom).toBeCloseTo(8, 1);
    });
  });

  test("重ねた通知を手前の通知より上にずらす", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );
    await screen.getByRole("button", { name: "追加" }).click();

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const roots = screen.getByClassName("sui_toast").elements();
    expect(getComputedStyle(roots[0]!).zIndex).toBe("1000");
    expect(getComputedStyle(roots[1]!).zIndex).toBe("999");
    await vi.waitFor(() => {
      const front = roots[0]!.getBoundingClientRect();
      const back = roots[1]!.getBoundingClientRect();
      expect(front.top - back.top).toBeCloseTo(12, 1);
    });
  });

  test("手前以外の通知の内容を薄くする", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );
    await screen.getByRole("button", { name: "追加" }).click();

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const contents = screen.getByClassName("sui_toast_content").elements();
    expect(contents[0]!.classList.contains("sui_toast_content-behind")).toBe(false);
    expect(contents[1]!.classList.contains("sui_toast_content-behind")).toBe(true);
    const behindTitle = contents[1]!.querySelector<HTMLElement>(".sui_alert_title")!;
    await vi.waitFor(() => {
      expect(getComputedStyle(behindTitle).opacity).toBe("0");
    });
    const frontTitle = contents[0]!.querySelector<HTMLElement>(".sui_alert_title")!;
    expect(getComputedStyle(frontTitle).opacity).toBe("1");
  });

  test("表示領域を展開すると後ろの通知の内容を表示する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );
    await screen.getByRole("button", { name: "追加" }).click();
    await screen.getByRole("button", { name: "追加" }).click();

    // 実行
    await screen.getByClassName("sui_toast").first().hover();

    // 検証
    const viewport = screen.getByClassName("sui_toast_viewport").element();
    await vi.waitFor(() => {
      expect(viewport.classList.contains("sui_toast_viewport-expanded")).toBe(true);
    });
    const contents = screen.getByClassName("sui_toast_content").elements();
    const behindTitle = contents[1]!.querySelector<HTMLElement>(".sui_alert_title")!;
    await vi.waitFor(() => {
      expect(getComputedStyle(behindTitle).opacity).toBe("1");
    });
  });
});
