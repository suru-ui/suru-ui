import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Tooltip } from "../../src/overlays/tooltip/index.js";
import * as TooltipParts from "../../src/overlays/tooltip/index.js";

describe("Tooltip", () => {
  test("トリガーとポップアップを表示する", async () => {
    // 実行
    const screen = await render(
      <Tooltip
        defaultOpen
        trigger={<button type="button">保存</button>}
        slotProps={{ trigger: { "aria-label": "保存", delay: 0 } }}
      >
        保存します
      </Tooltip>,
    );

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "保存" }))
      .toHaveClass("sui_tooltip_trigger");
    const popup = screen.getByRole("tooltip");
    await expect.element(popup).toHaveClass("sui_tooltip_popup");
    await expect.element(popup).toHaveTextContent("保存します");
    expect(getComputedStyle(popup.element().parentElement as HTMLElement).position).toBe("fixed");
    const arrow = popup.element().querySelector<HTMLElement>(".sui_tooltip_arrow");
    expect(arrow).not.toBeNull();
    await expect.element(arrow as HTMLElement).toHaveClass("sui_tooltip_arrow");
  });

  test("トリガーをホバーするとポップアップが開く", async () => {
    // 準備と実行
    const screen = await render(
      <Tooltip
        trigger={<button type="button">共有</button>}
        slotProps={{ trigger: { "aria-label": "共有", delay: 0 } }}
      >
        リンクを共有します
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "共有" });
    await userEvent.hover(trigger);

    // 検証
    await expect.element(screen.getByRole("tooltip")).toBeVisible();
  });

  test("disabled を指定するとポップアップが開かない", async () => {
    // 準備と実行
    const screen = await render(
      <Tooltip
        disabled
        trigger={<button type="button">削除</button>}
        slotProps={{ trigger: { "aria-label": "削除", delay: 0 } }}
      >
        削除します
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole("button", { name: "削除" }));

    // 検証
    await expect.element(screen.getByRole("tooltip")).not.toBeInTheDocument();
  });

  test("slotProps で各パーツにクラスを追加できる", async () => {
    // 準備と実行
    const screen = await render(
      <Tooltip
        defaultOpen
        trigger={<button type="button">詳細</button>}
        slotProps={{
          trigger: { "aria-label": "詳細", className: "custom-trigger", delay: 0 },
          portal: { className: "custom-portal" },
          positioner: { className: "custom-positioner" },
          popup: { className: "custom-popup" },
          arrow: { className: "custom-arrow" },
        }}
      >
        詳細を表示します
      </Tooltip>,
    );

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "詳細" }))
      .toHaveClass("custom-trigger");
    const popup = screen.getByRole("tooltip");
    await expect.element(popup).toHaveClass("custom-popup");
    const arrow = popup.element().querySelector<HTMLElement>(".sui_tooltip_arrow");
    expect(arrow).not.toBeNull();
    await expect.element(arrow as HTMLElement).toHaveClass("custom-arrow");
    const portal = popup.element().parentElement?.parentElement;
    expect(portal).not.toBeNull();
    await expect.element(portal as HTMLElement).toHaveClass("custom-portal");
    await expect
      .element(popup.element().parentElement as HTMLElement)
      .toHaveClass("custom-positioner");
  });
});

describe("TooltipParts", () => {
  test("Root と Trigger を組み合わせて開ける", async () => {
    // 準備と実行
    const screen = await render(
      <TooltipParts.Root>
        <TooltipParts.Trigger aria-label="開く" delay={0}>
          {(props) => (
            <button type="button" {...props}>
              開く
            </button>
          )}
        </TooltipParts.Trigger>
        <TooltipParts.Portal>
          <TooltipParts.Positioner>
            <TooltipParts.Popup>
              <TooltipParts.Arrow />
              説明
            </TooltipParts.Popup>
          </TooltipParts.Positioner>
        </TooltipParts.Portal>
      </TooltipParts.Root>,
    );
    await userEvent.hover(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByRole("tooltip")).toBeInTheDocument();
    await expect.element(screen.getByRole("tooltip")).toHaveClass("sui_tooltip_popup");
  });
});
