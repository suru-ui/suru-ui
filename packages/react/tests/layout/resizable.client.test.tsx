import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Resizable, ResizableHandle, ResizablePanel } from "../../src/layout/resizable/index.js";
import * as ResizableParts from "../../src/layout/resizable/index.js";

function panels() {
  return (
    <>
      <ResizablePanel defaultSize={35}>左側</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>右側</ResizablePanel>
    </>
  );
}

describe("Resizable", () => {
  test("パネルとリサイズハンドルを表示する", async () => {
    const screen = await render(
      <Resizable className="custom-resizable" style={{ minHeight: "120px" }}>
        {panels()}
      </Resizable>,
    );

    const root = screen.container.querySelector<HTMLElement>(".sui_resizable");
    const panelElements = screen.container.querySelectorAll(".sui_resizable_panel");
    const handle = screen.getByRole("separator");

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_resizable");
    await expect.element(root).toHaveClass("custom-resizable");
    await expect.element(root).toHaveAttribute("data-direction", "horizontal");
    expect(panelElements).toHaveLength(2);
    await expect.element(handle).toHaveClass("sui_resizable_handle");
    expect(getComputedStyle(handle.element(), "::after").width).toBe("16px");
    await expect.element(screen.getByText("左側")).toBeVisible();
    await expect.element(screen.getByText("右側")).toBeVisible();
  });

  test("vertical で向きを変更する", async () => {
    const screen = await render(
      <Resizable direction="vertical" style={{ minHeight: "120px" }}>
        {panels()}
      </Resizable>,
    );

    const root = screen.container.querySelector<HTMLElement>(".sui_resizable");

    await expect.element(root).toHaveClass("sui_resizable-direction_vertical");
    await expect.element(root).toHaveAttribute("data-direction", "vertical");
    await expect
      .element(screen.getByRole("separator"))
      .toHaveAttribute("aria-orientation", "horizontal");
  });

  test("withHandle でグリップを表示する", async () => {
    const screen = await render(<Resizable style={{ minHeight: "120px" }}>{panels()}</Resizable>);

    const grip = screen.container.querySelector(".sui_resizable_handle_grip");

    expect(grip).not.toBeNull();
    expect(getComputedStyle(grip!).width).toBe("12px");
    expect(getComputedStyle(grip!).height).toBe("16px");
  });

  test("Handle を無効化する", async () => {
    const screen = await render(
      <Resizable style={{ minHeight: "120px" }}>
        <ResizablePanel>左側</ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel>右側</ResizablePanel>
      </Resizable>,
    );

    await expect
      .element(screen.getByRole("separator"))
      .toHaveClass("sui_resizable_handle-disabled");
  });

  test("矢印キーでレイアウトを変更する", async () => {
    const userChanges: boolean[] = [];
    const screen = await render(
      <Resizable
        style={{ minHeight: "120px" }}
        onLayoutChanged={(_, meta) => {
          userChanges.push(meta.isUserInteraction);
        }}
      >
        {panels()}
      </Resizable>,
    );
    const handle = screen.getByRole("separator");

    (handle.element() as HTMLElement).focus();
    await userEvent.keyboard("{ArrowRight}");

    expect(userChanges).toContain(true);
  });

  test("線の外側の操作領域からドラッグできる", async () => {
    const screen = await render(<Resizable style={{ minHeight: "120px" }}>{panels()}</Resizable>);
    const handle = screen.getByRole("separator");
    const rect = handle.element().getBoundingClientRect();
    const clientX = rect.left + rect.width / 2 + 7;
    const clientY = rect.top + rect.height / 2;

    document.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        button: 0,
        clientX,
        clientY,
        pointerType: "mouse",
      }),
    );
    await expect.element(handle).toHaveAttribute("data-separator", "active");

    document.dispatchEvent(
      new PointerEvent("pointerup", {
        bubbles: true,
        clientX: clientX + 40,
        clientY,
        pointerType: "mouse",
      }),
    );
  });
});

describe("ResizableParts", () => {
  test("Root、Panel、Handle を個別に使用できる", async () => {
    const screen = await render(
      <ResizableParts.Root style={{ minHeight: "120px" }}>
        <ResizableParts.Panel defaultSize={50}>パーツ左</ResizableParts.Panel>
        <ResizableParts.Handle />
        <ResizableParts.Panel defaultSize={50}>パーツ右</ResizableParts.Panel>
      </ResizableParts.Root>,
    );

    await expect.element(screen.getByText("パーツ左")).toBeVisible();
    await expect.element(screen.getByText("パーツ右")).toBeVisible();
    await expect.element(screen.getByRole("separator")).toHaveClass("sui_resizable_handle");
  });
});
