import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Field } from "../../src/forms/field/index.js";
import { Fieldset } from "../../src/forms/fieldset/index.js";

describe("Fieldset", () => {
  test("フィールドセットと凡例をレンダリングする", async () => {
    // 実行
    const screen = await render(
      <Fieldset.Root>
        <Fieldset.Legend>お支払い情報</Fieldset.Legend>
      </Fieldset.Root>,
    );

    // 検証
    const fieldset = screen.getByText("お支払い情報").element().parentElement;

    expect(fieldset?.tagName).toBe("FIELDSET");
  });

  test("disabled を指定すると子の入力欄が無効化される", async () => {
    // 実行
    const screen = await render(
      <Fieldset.Root disabled>
        <Fieldset.Legend>お支払い情報</Fieldset.Legend>
        <Field.Root name="card">
          <Field.Control />
        </Field.Root>
      </Fieldset.Root>,
    );

    // 検証
    const fieldset = screen.container.querySelector<HTMLElement>("fieldset");

    await expect.element(fieldset).toHaveAttribute("disabled");
    await expect.element(fieldset).toHaveClass("sui_fieldset-disabled");
    await expect.element(screen.getByRole("textbox")).toBeDisabled();
  });
});
