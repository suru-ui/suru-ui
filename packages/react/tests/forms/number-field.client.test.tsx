import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { NumberField } from "../../src/forms/number-field/index.js";
import { clickElement } from "../_click.js";

describe("NumberField", () => {
  test("数値入力欄をレンダリングする", async () => {
    // 実行
    const screen = await render(<NumberField defaultValue={100} />);

    // 検証
    const input = screen.getByRole("textbox");

    await expect.element(input).toHaveClass("sui_number_field_input");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<NumberField />);

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_number_field");
    const group = screen.container.querySelector<HTMLElement>(".sui_number_field_group");
    const decrement = screen.container.querySelector<HTMLElement>(".sui_number_field_decrement");
    const increment = screen.container.querySelector<HTMLElement>(".sui_number_field_increment");

    await expect.element(root).toHaveClass("sui_number_field-size_md");
    await expect.element(root).toHaveClass("sui_number_field-variant_naked");
    await expect.element(root).toHaveClass("sui_number_field-radius_rounded");
    await expect.element(root).toHaveClass("sui_number_field-accent_color_grey");
    await expect.element(root).toHaveClass("sui_number_field-outlined");

    await expect.element(group).toBeInTheDocument();
    await expect.element(decrement).toBeInTheDocument();
    await expect.element(increment).toBeInTheDocument();
  });

  test("variant・size・radius・outlined を指定できる", async () => {
    // 実行
    const screen = await render(
      <NumberField variant="liquid" size="lg" radius="full" outlined={false} />,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_number_field");

    await expect.element(root).toHaveClass("sui_number_field-variant_liquid");
    await expect.element(root).toHaveClass("sui_number_field-size_lg");
    await expect.element(root).toHaveClass("sui_number_field-radius_full");
  });

  test("outlined は variant による既定値より優先される", async () => {
    // 実行
    const screen = await render(
      <>
        <NumberField variant="liquid" aria-label="既定" />
        <NumberField variant="liquid" outlined aria-label="明示" />
      </>,
    );

    // 検証
    const roots = screen.container.querySelectorAll<HTMLElement>(".sui_number_field");

    await expect.element(roots[0]).not.toHaveClass("sui_number_field-outlined");
    await expect.element(roots[1]).toHaveClass("sui_number_field-outlined");
  });

  test("accentColor に応じたクラスを適用する", async () => {
    // 実行
    const screen = await render(<NumberField accentColor="blue" />);

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_number_field");

    await expect.element(root).toHaveClass("sui_number_field-accent_color_blue");
  });

  test("Increment と Decrement をレンダリングする", async () => {
    // 実行
    const screen = await render(<NumberField />);

    // 検証
    const increment = screen.getByRole("button", { name: "Increase" });
    const decrement = screen.getByRole("button", { name: "Decrease" });

    await expect.element(increment).toHaveClass("sui_number_field_increment");
    await expect.element(decrement).toHaveClass("sui_number_field_decrement");
  });

  test("Input の右側に Decrement と Increment をまとめて表示する", async () => {
    // 実行
    const screen = await render(<NumberField />);

    // 検証
    const group = screen.container.querySelector<HTMLElement>(".sui_number_field_group");
    const classNames = group ? Array.from(group.children).map((child) => child.className) : [];
    const inputIndex = classNames.findIndex((name) => name.includes("sui_number_field_input"));
    const decrementIndex = classNames.findIndex((name) =>
      name.includes("sui_number_field_decrement"),
    );
    const incrementIndex = classNames.findIndex((name) =>
      name.includes("sui_number_field_increment"),
    );

    expect(inputIndex).toBeGreaterThanOrEqual(0);
    expect(inputIndex).toBeLessThan(decrementIndex);
    expect(decrementIndex).toBeLessThan(incrementIndex);
  });

  test("Increment をクリックすると値が増える", async () => {
    // 実行
    const screen = await render(<NumberField defaultValue={100} />);
    const input = screen.getByRole("textbox");
    clickElement(screen.getByRole("button", { name: "Increase" }));

    // 検証
    await expect.element(input).toHaveValue("101");
  });

  test("Decrement をクリックすると値が減る", async () => {
    // 実行
    const screen = await render(<NumberField defaultValue={100} />);
    const input = screen.getByRole("textbox");
    clickElement(screen.getByRole("button", { name: "Decrease" }));

    // 検証
    await expect.element(input).toHaveValue("99");
  });

  test("step に応じて増減する", async () => {
    // 実行
    const screen = await render(<NumberField defaultValue={0} step={5} />);
    const input = screen.getByRole("textbox");
    clickElement(screen.getByRole("button", { name: "Increase" }));

    // 検証
    await expect.element(input).toHaveValue("5");
  });

  test("min と max を指定すると範囲に制限される", async () => {
    // 実行
    const screen = await render(<NumberField defaultValue={0} min={0} max={10} />);
    const input = screen.getByRole("textbox");
    const increment = screen.getByRole("button", { name: "Increase" });
    const decrement = screen.getByRole("button", { name: "Decrease" });

    clickElement(decrement);
    await expect.element(input).toHaveValue("0");

    for (let i = 1; i <= 10; i++) {
      clickElement(increment);
      await expect.element(input).toHaveValue(String(i));
    }
    clickElement(increment);

    // 検証
    await expect.element(input).toHaveValue("10");
  });

  test("onValueChange が値を通知する", async () => {
    // 準備
    const changes: number[] = [];

    // 実行
    const screen = await render(
      <NumberField
        defaultValue={1}
        onValueChange={(value) => {
          if (value != null) {
            changes.push(value);
          }
        }}
      />,
    );
    clickElement(screen.getByRole("button", { name: "Increase" }));
    await expect.element(screen.getByRole("textbox")).toHaveValue("2");
    clickElement(screen.getByRole("button", { name: "Decrease" }));
    await expect.element(screen.getByRole("textbox")).toHaveValue("1");

    // 検証
    expect(changes).toStrictEqual([2, 1]);
  });

  test("制御モードで value を表示する", async () => {
    // 実行
    const screen = await render(<NumberField value={100} />);

    // 検証
    await expect.element(screen.getByRole("textbox")).toHaveValue("100");
  });

  test("slotProps を各パーツに適用する", async () => {
    // 実行
    const screen = await render(
      <NumberField
        slotProps={{
          group: { className: "my-group" },
          input: { className: "my-input" },
          increment: { className: "my-increment" },
          decrement: { className: "my-decrement" },
        }}
      />,
    );

    // 検証
    const group = screen.container.querySelector<HTMLElement>(".my-group");
    const input = screen.container.querySelector<HTMLElement>(".my-input");
    const increment = screen.container.querySelector<HTMLElement>(".my-increment");
    const decrement = screen.container.querySelector<HTMLElement>(".my-decrement");

    await expect.element(group).toBeInTheDocument();
    await expect.element(input).toBeInTheDocument();
    await expect.element(increment).toBeInTheDocument();
    await expect.element(decrement).toBeInTheDocument();
  });

  test("slotProps.increment でアイコンを差し替えられる", async () => {
    // 実行
    const screen = await render(
      <NumberField
        slotProps={{ increment: { children: <span className="custom-icon">＋</span> } }}
      />,
    );

    // 検証
    await expect
      .element(screen.container.querySelector<HTMLElement>(".custom-icon"))
      .toBeInTheDocument();
  });

  test("slotProps.scrubArea を渡すと ScrubArea を表示する", async () => {
    // 実行
    const screen = await render(<NumberField slotProps={{ scrubArea: { children: "100%" } }} />);

    // 検証
    const scrubArea = screen.getByText("100%");

    await expect.element(scrubArea).toHaveClass("sui_number_field_scrub_area");
  });

  test("disabled を指定すると無効化される", async () => {
    // 実行
    const screen = await render(<NumberField disabled defaultValue={100} />);

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_number_field");

    await expect.element(screen.getByRole("textbox")).toBeDisabled();
    await expect.element(root).toHaveClass("sui_number_field-disabled");
  });

  test("disabled のときはクリックしても値が変わらない", async () => {
    // 実行
    const screen = await render(<NumberField disabled defaultValue={100} />);
    const input = screen.getByRole("textbox");
    clickElement(screen.getByRole("button", { name: "Increase" }));

    // 検証
    await expect.element(input).toHaveValue("100");
  });
});
