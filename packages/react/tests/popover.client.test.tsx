import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Popover } from "../src/popover/index.js";
import * as PopoverParts from "../src/popover/index.js";

describe("Popover", () => {
  test("トリガーをクリックするとポップアップを表示する", async () => {
    // 準備
    const screen = await render(
      <Popover trigger={<button type="button">開く</button>}>
        <PopoverParts.Description>ポップオーバーの内容</PopoverParts.Description>
      </Popover>,
    );

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByText("ポップオーバーの内容")).toBeVisible();
  });

  test("既定では下側に配置する", async () => {
    // 準備
    const screen = await render(
      <Popover trigger={<button type="button">開く</button>}>
        <PopoverParts.Description>ポップオーバーの内容</PopoverParts.Description>
      </Popover>,
    );

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "開く" }));

    // 検証
    const positioner = screen.baseElement.querySelector<HTMLElement>(".sui_popover_positioner");

    expect(positioner).not.toBeNull();
    expect(positioner!.getAttribute("data-side")).toBe("bottom");
    expect(positioner!.getAttribute("data-align")).toBe("start");
  });

  test("slotProps.positioner で配置を変更できる", async () => {
    // 準備
    const screen = await render(
      <Popover
        trigger={<button type="button">開く</button>}
        slotProps={{ positioner: { side: "right", align: "end" } }}
      >
        <PopoverParts.Description>ポップオーバーの内容</PopoverParts.Description>
      </Popover>,
    );

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "開く" }));

    // 検証
    const positioner = screen.baseElement.querySelector<HTMLElement>(".sui_popover_positioner");

    expect(positioner).not.toBeNull();
    expect(positioner!.getAttribute("data-side")).toBe("right");
  });

  test("slotProps.arrow を指定すると矢印を表示する", async () => {
    // 準備
    const screen = await render(
      <Popover trigger={<button type="button">開く</button>} slotProps={{ arrow: {} }}>
        <PopoverParts.Description>ポップオーバーの内容</PopoverParts.Description>
      </Popover>,
    );

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "開く" }));

    // 検証
    const arrow = screen.baseElement.querySelector(".sui_popover_arrow");

    expect(arrow).not.toBeNull();
  });

  test("slotProps.arrow を指定しないときは矢印を表示しない", async () => {
    // 準備
    const screen = await render(
      <Popover trigger={<button type="button">開く</button>}>
        <PopoverParts.Description>ポップオーバーの内容</PopoverParts.Description>
      </Popover>,
    );

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "開く" }));

    // 検証
    expect(screen.baseElement.querySelector(".sui_popover_arrow")).toBeNull();
  });

  test("Close パーツでポップアップを閉じられる", async () => {
    // 準備
    const screen = await render(
      <Popover trigger={<button type="button">開く</button>}>
        <PopoverParts.Close>
          <button type="button">閉じる</button>
        </PopoverParts.Close>
      </Popover>,
    );
    await userEvent.click(screen.getByRole("button", { name: "開く" }));
    await expect
      .element(screen.baseElement.querySelector<HTMLElement>(".sui_popover_popup")!)
      .toBeInTheDocument();

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "閉じる" }));

    // 検証
    await vi.waitFor(() => {
      expect(screen.baseElement.querySelector(".sui_popover_popup")).toBeNull();
    });
  });

  test("trigger を指定しないときはトリガーを描画しない", async () => {
    // 実行
    const screen = await render(
      <Popover open>
        <PopoverParts.Description>ポップオーバーの内容</PopoverParts.Description>
      </Popover>,
    );

    // 検証
    expect(screen.container.querySelector(".sui_popover_trigger")).toBeNull();
    await expect.element(screen.getByText("ポップオーバーの内容")).toBeVisible();
  });
});

describe("PopoverParts.Root", () => {
  test("Trigger と Popup をグループ化できる", async () => {
    // 準備
    function TestPopover() {
      return (
        <PopoverParts.Root>
          <PopoverParts.Trigger>
            {(props) => (
              <button type="button" {...props}>
                開く
              </button>
            )}
          </PopoverParts.Trigger>
          <PopoverParts.Portal>
            <PopoverParts.Positioner>
              <PopoverParts.Popup>
                <PopoverParts.Title>タイトル</PopoverParts.Title>
              </PopoverParts.Popup>
            </PopoverParts.Positioner>
          </PopoverParts.Portal>
        </PopoverParts.Root>
      );
    }
    const screen = await render(<TestPopover />);

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByRole("heading", { name: "タイトル" })).toBeVisible();
  });
});

describe("PopoverParts.createHandle", () => {
  test("Root と Trigger を別々の場所に配置できる", async () => {
    // 準備
    function TestPopover() {
      const handle = PopoverParts.createHandle();

      return (
        <>
          <PopoverParts.Trigger handle={handle}>
            {(props) => (
              <button type="button" {...props}>
                開く
              </button>
            )}
          </PopoverParts.Trigger>
          <PopoverParts.Root handle={handle}>
            <PopoverParts.Portal>
              <PopoverParts.Positioner>
                <PopoverParts.Popup>
                  <PopoverParts.Description>ポップオーバーの内容</PopoverParts.Description>
                </PopoverParts.Popup>
              </PopoverParts.Positioner>
            </PopoverParts.Portal>
          </PopoverParts.Root>
        </>
      );
    }
    const screen = await render(<TestPopover />);

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByText("ポップオーバーの内容")).toBeVisible();
  });
});
