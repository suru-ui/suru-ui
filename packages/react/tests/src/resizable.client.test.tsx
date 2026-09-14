import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Resizable } from "../../src/resizable/index.js";

describe("Resizable", () => {
  test("orientation が vertical のときパネルを縦方向に並べる", async () => {
    // 準備
    const { container } = await render(
      <Resizable orientation="vertical">
        <Resizable.Panel defaultSize={50}>上部</Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={50}>下部</Resizable.Panel>
      </Resizable>,
    );

    // 検証
    const root = container.firstElementChild as HTMLElement;
    expect(root.classList.contains("sui_resizable-orientation_vertical")).toBe(true);
    expect(root.style.flexDirection).toBe("column");
    expect(root.querySelector(".sui_resizable_handle")?.getAttribute("aria-orientation")).toBe(
      "horizontal",
    );
  });

  test("orientation を省略したときパネルを横方向に並べる", async () => {
    // 準備
    const { container } = await render(
      <Resizable>
        <Resizable.Panel defaultSize={50}>左側</Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={50}>右側</Resizable.Panel>
      </Resizable>,
    );

    // 検証
    const root = container.firstElementChild as HTMLElement;
    expect(root.classList.contains("sui_resizable-orientation_horizontal")).toBe(true);
    expect(root.style.flexDirection).toBe("row");
    expect(root.querySelector(".sui_resizable_handle")?.getAttribute("aria-orientation")).toBe(
      "vertical",
    );
  });
});
