import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { Chip, ChipAPI, useChipAPI } from "./chip.jsx";
import "../../tests/src/_locators.js";

describe("ChipAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行
    const api = new ChipAPI({ size: "lg", color: "blue", children: "新着" });

    // 検証
    expect(api.getRootProps()).toStrictEqual({ size: "lg", color: "blue", children: "新着" });
  });
});

describe("useChipAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useChipAPI({ size: "lg", children: "新着" });
      return <span>{api.getRootProps().size}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});

describe("Chip", () => {
  test("既定のチップを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Chip>新着</Chip>);

    // 検証
    const root = screen.getByClassName("sui_chip").element();
    expect(root.tagName).toBe("SPAN");
    expect(root.classList.contains("sui_chip-size_sm")).toBe(true);
    expect(root.classList.contains("sui_chip-color_grey")).toBe(true);
    expect(root.classList.contains("sui_chip-radius_full")).toBe(true);
    expect(root.classList.contains("sui_chip-variant_liquid")).toBe(true);
    expect(screen.getByText("新着").query()).not.toBe(null);
  });

  test("指定した外観の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Chip size="lg" color="red" radius="md" variant="solid" outlined>
        警告
      </Chip>,
    );

    // 検証
    const root = screen.getByClassName("sui_chip").element();
    expect(root.classList.contains("sui_chip-color_red")).toBe(true);
    expect(root.classList.contains("sui_chip-outlined")).toBe(true);
    expect(root.classList.contains("sui_chip-radius_md")).toBe(true);
    expect(root.classList.contains("sui_chip-size_lg")).toBe(true);
    expect(root.classList.contains("sui_chip-variant_solid")).toBe(true);
  });

  test("利用者の props をルートへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Chip id="chip" data-testid="chip">
        新着
      </Chip>,
    );

    // 検証
    const root = screen.getByClassName("sui_chip").element();
    expect(root.getAttribute("data-testid")).toBe("chip");
    expect(root.getAttribute("id")).toBe("chip");
  });

  test("render に button を渡すと押せるチップになる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Chip
        // oxlint-disable-next-line jsx-a11y/control-has-associated-label -- `render` 先のボタンは子要素にテキストを含む
        render={<button type="button" onClick={() => {}} />}
      >
        新着
      </Chip>,
    );

    // 検証
    const root = screen.getByRole("button", { name: "新着" }).element();
    expect(root.classList.contains("sui_chip")).toBe(true);
    expect(root.tagName).toBe("BUTTON");
  });
});
