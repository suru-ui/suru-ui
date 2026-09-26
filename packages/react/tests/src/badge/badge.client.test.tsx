import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Badge, BadgeAPI, useBadgeAPI } from "../../../src/badge/badge.jsx";
import "../_locators.js";

describe("BadgeAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行
    const api = new BadgeAPI({ children: "42", color: "blue", size: "lg" });

    // 検証
    expect(api.getRootProps()).toStrictEqual({ children: "42", color: "blue", size: "lg" });
  });
});

describe("useBadgeAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useBadgeAPI({ children: "42", size: "lg" });
      return <span>{api.getRootProps().size}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});

describe("Badge", () => {
  test("既定のバッジを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Badge>42</Badge>);

    // 検証
    const root = screen.getByClassName("sui_badge").element();
    expect(root.tagName).toBe("SPAN");
    expect(root.classList.contains("sui_badge-size_sm")).toBe(true);
    expect(root.classList.contains("sui_badge-color_grey")).toBe(true);
    expect(root.classList.contains("sui_badge-radius_full")).toBe(true);
    expect(root.classList.contains("sui_badge-overlap_rectangular")).toBe(true);
    expect(root.classList.contains("sui_badge-variant_standard")).toBe(true);
    expect(screen.getByText("42").query()).not.toBe(null);
  });

  test("dot では内容を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Badge variant="dot">42</Badge>);

    // 検証
    expect(screen.getByClassName("sui_badge-variant_dot").query()).not.toBe(null);
    expect(screen.getByText("42").query()).toBe(null);
  });

  test("位置指定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Badge position="top-right">42</Badge>);

    // 検証
    expect(screen.getByClassName("sui_badge-position_top_right").query()).not.toBe(null);
  });

  test("リングと枠線の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Badge outlined ring>
        42
      </Badge>,
    );

    // 検証
    const root = screen.getByClassName("sui_badge").element();
    expect(root.classList.contains("sui_badge-outlined")).toBe(true);
    expect(root.classList.contains("sui_badge-ring")).toBe(true);
  });

  test("利用者の props をルートへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Badge aria-label="未読 3 件" data-testid="badge">
        3
      </Badge>,
    );

    // 検証
    const root = screen.getByClassName("sui_badge").element();
    expect(root.getAttribute("aria-label")).toBe("未読 3 件");
    expect(root.getAttribute("data-testid")).toBe("badge");
  });
});
