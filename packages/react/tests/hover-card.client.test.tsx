import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { HoverCard } from "../src/hover-card/index.js";
import * as HoverCardParts from "../src/hover-card/index.js";

describe("HoverCard", () => {
  test("トリガーをホバーするとポップアップを表示する", async () => {
    // 準備
    const screen = await render(
      <HoverCard trigger={<button type="button">開く</button>}>ホバーカードの内容</HoverCard>,
    );

    // 実行
    await userEvent.hover(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByText("ホバーカードの内容")).toBeVisible();
  });

  test("既定では下側に配置する", async () => {
    // 準備
    const screen = await render(
      <HoverCard trigger={<button type="button">開く</button>}>ホバーカードの内容</HoverCard>,
    );

    // 実行
    await userEvent.hover(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByText("ホバーカードの内容")).toBeVisible();
    const positioner = screen.baseElement.querySelector<HTMLElement>(".sui_hovercard_positioner");

    expect(positioner).not.toBeNull();
    expect(positioner!.getAttribute("data-side")).toBe("bottom");
    expect(positioner!.getAttribute("data-align")).toBe("start");
  });

  test("slotProps.positioner で配置を変更できる", async () => {
    // 準備
    const screen = await render(
      <HoverCard
        trigger={<button type="button">開く</button>}
        slotProps={{ positioner: { side: "right", align: "end" } }}
      >
        ホバーカードの内容
      </HoverCard>,
    );

    // 実行
    await userEvent.hover(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByText("ホバーカードの内容")).toBeVisible();
    const positioner = screen.baseElement.querySelector<HTMLElement>(".sui_hovercard_positioner");

    expect(positioner!.getAttribute("data-side")).toBe("right");
  });

  test("slotProps.arrow を指定すると矢印を表示する", async () => {
    // 準備
    const screen = await render(
      <HoverCard trigger={<button type="button">開く</button>} slotProps={{ arrow: {} }}>
        ホバーカードの内容
      </HoverCard>,
    );

    // 実行
    await userEvent.hover(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByText("ホバーカードの内容")).toBeVisible();
    const arrow = screen.baseElement.querySelector(".sui_hovercard_arrow");

    expect(arrow).not.toBeNull();
  });

  test("slotProps.arrow を指定しないときは矢印を表示しない", async () => {
    // 準備
    const screen = await render(
      <HoverCard trigger={<button type="button">開く</button>}>ホバーカードの内容</HoverCard>,
    );

    // 実行
    await userEvent.hover(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByText("ホバーカードの内容")).toBeVisible();
    expect(screen.baseElement.querySelector(".sui_hovercard_arrow")).toBeNull();
  });

  test("trigger を指定しないときはトリガーを描画しない", async () => {
    // 実行
    const screen = await render(<HoverCard open>ホバーカードの内容</HoverCard>);

    // 検証
    expect(screen.container.querySelector(".sui_hovercard_trigger")).toBeNull();
    await expect.element(screen.getByText("ホバーカードの内容")).toBeVisible();
  });
});

describe("HoverCardParts.Root", () => {
  test("Trigger と Popup をグループ化できる", async () => {
    // 準備
    function TestHoverCard() {
      return (
        <HoverCardParts.Root>
          <HoverCardParts.Trigger delay={0}>
            {(props) => (
              <a {...props} href="#">
                開く
              </a>
            )}
          </HoverCardParts.Trigger>
          <HoverCardParts.Portal>
            <HoverCardParts.Positioner>
              <HoverCardParts.Popup>ホバーカードの内容</HoverCardParts.Popup>
            </HoverCardParts.Positioner>
          </HoverCardParts.Portal>
        </HoverCardParts.Root>
      );
    }
    const screen = await render(<TestHoverCard />);

    // 実行
    await userEvent.hover(screen.getByRole("link", { name: "開く" }));

    // 検証
    await expect.element(screen.getByText("ホバーカードの内容")).toBeVisible();
  });
});

describe("HoverCardParts.createHandle", () => {
  test("Root と Trigger を別々の場所に配置できる", async () => {
    // 準備
    function TestHoverCard() {
      const handle = HoverCardParts.createHandle();

      return (
        <>
          <HoverCardParts.Trigger handle={handle} delay={0}>
            {(props) => (
              <a {...props} href="#">
                開く
              </a>
            )}
          </HoverCardParts.Trigger>
          <HoverCardParts.Root handle={handle}>
            <HoverCardParts.Portal>
              <HoverCardParts.Positioner>
                <HoverCardParts.Popup>ホバーカードの内容</HoverCardParts.Popup>
              </HoverCardParts.Positioner>
            </HoverCardParts.Portal>
          </HoverCardParts.Root>
        </>
      );
    }
    const screen = await render(<TestHoverCard />);

    // 実行
    await userEvent.hover(screen.getByRole("link", { name: "開く" }));

    // 検証
    await expect.element(screen.getByText("ホバーカードの内容")).toBeVisible();
  });
});
