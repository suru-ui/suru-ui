import * as React from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { useButtonGroupContext } from "../../src/buttons/button-group/button-group.parts.jsx";
import { ButtonGroup } from "../../src/buttons/button-group/index.js";
import { Button } from "../../src/buttons/button/index.js";

describe("ButtonGroup", () => {
  test("グループ div をレンダリングする", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup>
        <Button>A</Button>
      </ButtonGroup>,
    );

    // 検証
    const group = screen.getByRole("group");

    await expect.element(group).toHaveClass("sui_button_group");
    await expect.element(group).toHaveClass("sui_button_group-orientation_horizontal");
    await expect.element(group).toHaveAttribute("aria-orientation", "horizontal");
  });

  test("orientation を指定するとクラスと属性が切り替わる", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup orientation="vertical">
        <Button>A</Button>
      </ButtonGroup>,
    );

    // 検証
    const group = screen.getByRole("group");

    await expect.element(group).toHaveClass("sui_button_group-orientation_vertical");
    await expect.element(group).toHaveAttribute("aria-orientation", "vertical");
  });

  test("グループのスタイルを子要素に伝播する", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup variant="liquid" color="blue" size="sm" radius="full" outlined>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    );

    // 検証
    for (const name of ["A", "B"]) {
      const button = screen.getByRole("button", { name });

      await expect.element(button).toHaveClass("sui_button-variant_liquid");
      await expect.element(button).toHaveClass("sui_button-color_blue");
      await expect.element(button).toHaveClass("sui_button-size_sm");
      await expect.element(button).toHaveClass("sui_button-radius_full");
      await expect.element(button).toHaveClass("sui_button-outlined");
    }
  });

  test("グループは子要素が指定したスタイルより優先される", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup color="blue">
        <Button color="red">A</Button>
      </ButtonGroup>,
    );

    // 検証
    const button = screen.getByRole("button");

    await expect.element(button).toHaveClass("sui_button-color_blue");
  });

  test("区切り線は横並びで先頭以外のボタンに表示される", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup outlined>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    );

    // 検証
    const [a, b] = [
      screen.getByRole("button", { name: "A" }).element(),
      screen.getByRole("button", { name: "B" }).element(),
    ];

    expect(getComputedStyle(a!).borderRightWidth).toBe("0px");
    expect(getComputedStyle(b!).borderLeftWidth).toBe("1px");
    expect(getComputedStyle(b!).borderLeftColor).toBe(getComputedStyle(b!).borderTopColor);
    expect(getComputedStyle(b!).borderLeftColor).toBe(getComputedStyle(a!).borderTopColor);
  });

  test("区切り線は縦並びで先頭以外のボタンに表示される", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup orientation="vertical" outlined>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    );

    // 検証
    const [a, b] = [
      screen.getByRole("button", { name: "A" }).element(),
      screen.getByRole("button", { name: "B" }).element(),
    ];

    expect(getComputedStyle(a!).borderBottomWidth).toBe("0px");
    expect(getComputedStyle(b!).borderTopWidth).toBe("1px");
    expect(getComputedStyle(b!).borderTopColor).toBe(getComputedStyle(b!).borderLeftColor);
  });

  test("無効化されたボタンでも区切り線が 1px に保たれる", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup outlined>
        <Button disabled>A</Button>
        <Button disabled>B</Button>
      </ButtonGroup>,
    );

    // 検証
    const [a, b] = [
      screen.getByRole("button", { name: "A" }).element(),
      screen.getByRole("button", { name: "B" }).element(),
    ];

    expect(getComputedStyle(a!).borderRightWidth).toBe("0px");
    expect(getComputedStyle(b!).borderLeftWidth).toBe("1px");
  });

  test("スタイルが変わらない再レンダーではコンテキスト利用者を再レンダーしない", async () => {
    // 準備
    let consumerRenderCount = 0;

    const Consumer = React.memo(function Consumer() {
      useButtonGroupContext();
      consumerRenderCount += 1;
      return null;
    });

    function Example() {
      const [, setUpdated] = React.useState(false);

      return (
        <>
          <button type="button" onClick={() => setUpdated((value) => !value)}>
            更新
          </button>
          <ButtonGroup>
            <Consumer />
          </ButtonGroup>
        </>
      );
    }

    // 実行
    const screen = await render(<Example />);
    await screen.getByRole("button", { name: "更新" }).click();

    // 検証
    expect(consumerRenderCount).toBe(1);
  });
});
