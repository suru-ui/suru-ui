import type { ReactNode } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { RadioGroup } from "../../src/forms/radio-group/index.js";
import { Radio } from "../../src/forms/radio/index.js";
import { clickElement } from "../_click.js";

function radio(labels: readonly string[]): ReactNode[] {
  return labels.map((label) => (
    <Radio key={label} value={label} aria-label={label}>
      {label}
    </Radio>
  ));
}

describe("RadioGroup", () => {
  test("グループ div をレンダリングする", async () => {
    // 実行
    const screen = await render(<RadioGroup>{...radio(["A", "B"])}</RadioGroup>);

    // 検証
    const group = screen.getByRole("radiogroup");

    await expect.element(group).toHaveClass("sui_radio_group");
    await expect.element(group).toHaveClass("sui_radio_group-orientation_vertical");
    await expect.element(group).toHaveAttribute("aria-orientation", "vertical");
  });

  test("defaultValue で初期選択を指定できる", async () => {
    // 実行
    const screen = await render(<RadioGroup defaultValue="A">{...radio(["A", "B"])}</RadioGroup>);

    // 検証
    await expect
      .element(screen.getByRole("radio", { name: "A" }))
      .toHaveAttribute("aria-checked", "true");
    await expect
      .element(screen.getByRole("radio", { name: "B" }))
      .toHaveAttribute("aria-checked", "false");
  });

  test("単一選択である", async () => {
    // 実行
    const screen = await render(<RadioGroup defaultValue="A">{...radio(["A", "B"])}</RadioGroup>);

    // 実行
    clickElement(screen.getByRole("radio", { name: "B" }));

    // 検証
    await expect
      .element(screen.getByRole("radio", { name: "A" }))
      .toHaveAttribute("aria-checked", "false");
    await expect
      .element(screen.getByRole("radio", { name: "B" }))
      .toHaveAttribute("aria-checked", "true");
  });

  test("onValueChange が選択値を通知する", async () => {
    // 準備
    let value: unknown;

    // 実行
    const screen = await render(
      <RadioGroup
        onValueChange={(nextValue) => {
          value = nextValue;
        }}
      >
        {...radio(["A", "B"])}
      </RadioGroup>,
    );
    clickElement(screen.getByRole("radio", { name: "B" }));

    // 検証
    expect(value).toBe("B");
  });

  test("disabled を指定すると全てのラジオボタンが無効化される", async () => {
    // 実行
    const screen = await render(<RadioGroup disabled>{...radio(["A", "B"])}</RadioGroup>);

    // 検証
    await expect.element(screen.getByRole("radio", { name: "A" })).toBeDisabled();
    await expect.element(screen.getByRole("radio", { name: "B" })).toBeDisabled();
  });

  test("グループのスタイルを子要素に伝播する", async () => {
    // 実行
    const screen = await render(
      <RadioGroup color="purple" size="sm" variant="liquid" radius="rounded">
        {...radio(["A"])}
      </RadioGroup>,
    );

    // 検証
    const radioElement = screen.getByRole("radio", { name: "A" });

    await expect.element(radioElement).toHaveClass("sui_radio-color_purple");
    await expect.element(radioElement).toHaveClass("sui_radio-size_sm");
    await expect.element(radioElement).toHaveClass("sui_radio-variant_liquid");
    await expect.element(radioElement).toHaveClass("sui_radio-radius_rounded");
  });

  test("name を指定すると入力欄に反映される", async () => {
    // 実行
    const screen = await render(<RadioGroup name="fruit">{...radio(["A", "B"])}</RadioGroup>);

    // 検証
    const inputs = screen.container.querySelectorAll<HTMLInputElement>("input[type='radio']");

    expect(inputs.length).toBe(2);
    expect(inputs[0]!.name).toBe("fruit");
    expect(inputs[1]!.name).toBe("fruit");
  });
});
