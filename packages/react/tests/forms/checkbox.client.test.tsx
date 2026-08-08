import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Checkbox } from "../../src/forms/checkbox/index.js";
import { clickElement } from "../_click.js";

describe("Checkbox", () => {
  test("チェックボックスをレンダリングする", async () => {
    // 実行
    const screen = await render(<Checkbox />);

    // 検証
    const checkbox = screen.getByRole("checkbox");

    await expect.element(checkbox).toHaveClass("sui_checkbox");
    await expect.element(checkbox).toHaveAttribute("aria-checked", "false");
  });

  test("クリックするとチェック状態が切り替わる", async () => {
    // 実行
    const screen = await render(<Checkbox />);

    // 実行
    const checkbox = screen.getByRole("checkbox");
    clickElement(checkbox);

    // 検証
    await expect.element(checkbox).toHaveAttribute("aria-checked", "true");
  });

  test("defaultChecked で初期状態を指定できる", async () => {
    // 実行
    const screen = await render(<Checkbox defaultChecked />);

    // 検証
    await expect.element(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  test("disabled を指定すると無効化される", async () => {
    // 実行
    const screen = await render(<Checkbox disabled />);

    // 検証
    const checkbox = screen.getByRole("checkbox");

    await expect.element(checkbox).toBeDisabled();
    await expect.element(checkbox).toHaveClass("sui_checkbox-disabled");
  });

  test("onCheckedChange がチェック状態を通知する", async () => {
    // 準備
    let checked: boolean | undefined;

    // 実行
    const screen = await render(
      <Checkbox
        onCheckedChange={(nextChecked) => {
          checked = nextChecked;
        }}
      />,
    );
    clickElement(screen.getByRole("checkbox"));

    // 検証
    expect(checked).toBe(true);
  });

  test("indeterminate を指定すると aria-checked が mixed になる", async () => {
    // 実行
    const screen = await render(<Checkbox indeterminate />);

    // 検証
    await expect.element(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  });

  test("size・color・variant・radius・outlined のクラスを適用する", async () => {
    // 実行
    const screen = await render(
      <Checkbox size="lg" color="blue" variant="liquid" radius="full" outlined={false} />,
    );

    // 検証
    const checkbox = screen.getByRole("checkbox");

    await expect.element(checkbox).toHaveClass("sui_checkbox-size_lg");
    await expect.element(checkbox).toHaveClass("sui_checkbox-color_blue");
    await expect.element(checkbox).toHaveClass("sui_checkbox-variant_liquid");
    await expect.element(checkbox).toHaveClass("sui_checkbox-radius_full");
  });

  test("チェックすると Indicator のコンテンツが表示される", async () => {
    // 実行
    const screen = await render(<Checkbox>✓</Checkbox>);

    // 検証
    expect(screen.container.querySelector<HTMLElement>(".sui_checkbox_indicator")).toBeNull();

    // 実行
    clickElement(screen.getByRole("checkbox"));

    // 検証
    const indicator = screen.container.querySelector<HTMLElement>(".sui_checkbox_indicator");

    await expect.element(indicator).toBeInTheDocument();
    await expect.element(indicator).toHaveClass("sui_checkbox_indicator");
    await expect.element(indicator).toHaveTextContent("✓");
  });

  test("コンテンツがない場合は Indicator を生成しない", async () => {
    // 実行
    const screen = await render(<Checkbox defaultChecked />);

    // 検証
    expect(screen.container.querySelector(".sui_checkbox_indicator")).toBeNull();
  });

  test("slotProps.indicator を指定するとコンテンツがなくても Indicator を生成する", async () => {
    // 実行
    const screen = await render(
      <Checkbox defaultChecked slotProps={{ indicator: { className: "custom-indicator" } }} />,
    );

    // 検証
    const indicator = screen.container.querySelector<HTMLElement>(".sui_checkbox_indicator");

    await expect.element(indicator).toHaveClass("custom-indicator");
  });
});
