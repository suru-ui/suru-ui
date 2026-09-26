import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/action-group/action-group.parts.js";
import { ActionGroupRoot } from "../../../src/action-group/action-group.root.jsx";
import { Button } from "../../../src/button/button.js";
import { Select } from "../../../src/select/select.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

describe("ActionGroupRoot の配置", () => {
  test("横並びでは項目を隙間なく横に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作">
        <Button>1</Button>
        <Button>2</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const rootStyle = getComputedStyle(screen.getByRole("group", { name: "操作" }).element());
    expect(rootStyle.display).toBe("flex");
    expect(rootStyle.flexDirection).toBe("row");
    expect(rootStyle.flexWrap).toBe("nowrap");
    expect(rootStyle.alignItems).toBe("stretch");
    const first = screen.getByRole("button", { name: "1" }).element().getBoundingClientRect();
    const second = screen.getByRole("button", { name: "2" }).element().getBoundingClientRect();
    expect(second.left).toBeCloseTo(first.right, 1);
  });

  test("縦並びでは項目を隙間なく縦に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作" orientation="vertical">
        <Button>1</Button>
        <Button>2</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const rootStyle = getComputedStyle(screen.getByRole("group", { name: "操作" }).element());
    expect(rootStyle.flexDirection).toBe("column");
    expect(rootStyle.alignItems).toBe("stretch");
    const first = screen.getByRole("button", { name: "1" }).element().getBoundingClientRect();
    const second = screen.getByRole("button", { name: "2" }).element().getBoundingClientRect();
    expect(second.top).toBeCloseTo(first.bottom, 1);
  });

  test("横並びでは端以外の角丸を落とす", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const first = getComputedStyle(screen.getByRole("button", { name: "1" }).element());
    const middle = getComputedStyle(screen.getByRole("button", { name: "2" }).element());
    const last = getComputedStyle(screen.getByRole("button", { name: "3" }).element());
    expect(Number.parseFloat(first.borderTopLeftRadius)).toBeGreaterThan(0);
    expect(first.borderTopRightRadius).toBe("0px");
    expect(first.borderBottomRightRadius).toBe("0px");
    expect(middle.borderTopLeftRadius).toBe("0px");
    expect(middle.borderTopRightRadius).toBe("0px");
    expect(middle.borderBottomLeftRadius).toBe("0px");
    expect(middle.borderBottomRightRadius).toBe("0px");
    expect(last.borderTopLeftRadius).toBe("0px");
    expect(last.borderBottomLeftRadius).toBe("0px");
    expect(Number.parseFloat(last.borderTopRightRadius)).toBeGreaterThan(0);
  });

  test("縦並びでは端以外の角丸を落とす", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作" orientation="vertical">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const first = getComputedStyle(screen.getByRole("button", { name: "1" }).element());
    const middle = getComputedStyle(screen.getByRole("button", { name: "2" }).element());
    const last = getComputedStyle(screen.getByRole("button", { name: "3" }).element());
    expect(Number.parseFloat(first.borderTopLeftRadius)).toBeGreaterThan(0);
    expect(first.borderBottomLeftRadius).toBe("0px");
    expect(first.borderBottomRightRadius).toBe("0px");
    expect(middle.borderTopLeftRadius).toBe("0px");
    expect(middle.borderTopRightRadius).toBe("0px");
    expect(middle.borderBottomLeftRadius).toBe("0px");
    expect(middle.borderBottomRightRadius).toBe("0px");
    expect(last.borderTopLeftRadius).toBe("0px");
    expect(last.borderTopRightRadius).toBe("0px");
    expect(Number.parseFloat(last.borderBottomRightRadius)).toBeGreaterThan(0);
  });

  test("outlined でも項目を離さない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作" outlined>
        <Button>1</Button>
        <Button>2</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const first = screen.getByRole("button", { name: "1" }).element().getBoundingClientRect();
    const second = screen.getByRole("button", { name: "2" }).element().getBoundingClientRect();
    expect(first.right - second.left).toBeGreaterThanOrEqual(0);
    expect(first.right - second.left).toBeLessThan(2);
  });

  test.skipIf(!supportsCustomFunctions())(
    "outlined では項目を枠線の幅だけ重ねる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <ActionGroupRoot aria-label="操作" outlined>
          <Button>1</Button>
          <Button>2</Button>
        </ActionGroupRoot>,
      );

      // 検証
      const firstElement = screen.getByRole("button", { name: "1" }).element();
      const secondElement = screen.getByRole("button", { name: "2" }).element();
      const margin = Number.parseFloat(getComputedStyle(secondElement).marginInlineStart);
      expect(margin).toBeLessThan(0);
      expect(Number.parseFloat(getComputedStyle(firstElement).marginInlineStart)).toBe(0);
      const first = firstElement.getBoundingClientRect();
      const second = secondElement.getBoundingClientRect();
      expect(first.right - second.left).toBeCloseTo(-margin, 1);
      expect(first.right - second.left).toBeLessThan(2);
    },
  );

  test("色と大きさと角丸を項目へ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Button aria-label="基準" color="blue" variant="naked" size="lg">
          基準
        </Button>
        <ActionGroupRoot aria-label="操作" color="blue" variant="naked" size="lg">
          <Button aria-label="項目">項目</Button>
        </ActionGroupRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByRole("button", { name: "基準" }).element());
    const actual = getComputedStyle(screen.getByRole("button", { name: "項目" }).element());
    expect(actual.backgroundColor).toBe(expected.backgroundColor);
    expect(actual.color).toBe(expected.color);
    expect(actual.minHeight).toBe(expected.minHeight);
    expect(actual.borderTopLeftRadius).toBe(expected.borderTopLeftRadius);
  });

  test("色を Select の項目へ伝える", async ({ expect }) => {
    // 準備と実行
    const items = ["りんご"];
    const screen = await render(
      <>
        <Select aria-label="基準" items={items} placeholder="選択" />
        <ActionGroupRoot aria-label="操作" color="blue" variant="liquid">
          <Button aria-label="項目">項目</Button>
          <Select aria-label="選択項目" items={items} placeholder="選択" />
        </ActionGroupRoot>
      </>,
    );

    // 検証
    const groupButton = getComputedStyle(screen.getByRole("button", { name: "項目" }).element());
    const select = getComputedStyle(screen.getByLabelText("選択項目").element());
    const standalone = getComputedStyle(screen.getByLabelText("基準").element());
    expect(select.color).toBe(groupButton.color);
    expect(select.color).not.toBe(standalone.color);
  });
});
