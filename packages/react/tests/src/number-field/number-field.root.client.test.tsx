import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ActionGroupRoot } from "../../../src/action-group/action-group.root.jsx";
import { FieldRoot } from "../../../src/field/field.root.jsx";
import { NumberFieldInput } from "../../../src/number-field/number-field.input.jsx";
import "../../../src/number-field/number-field.parts.js";
import {
  type NumberFieldRootProps,
  NumberFieldRoot,
} from "../../../src/number-field/number-field.root.jsx";
import "../_locators.js";

describe("NumberFieldRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberFieldRoot />);

    // 検証
    const root = screen.getByClassName("sui_number_field").element();
    expect(root.classList.contains("sui_number_field")).toBe(true);
    expect(root.classList.contains("sui_action_group_item")).toBe(true);
    expect(root.classList.contains("sui_number_field-size_md")).toBe(true);
    expect(root.classList.contains("sui_number_field-color_grey")).toBe(true);
    expect(root.classList.contains("sui_number_field-radius_md")).toBe(true);
    expect(root.classList.contains("sui_number_field-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_number_field-outlined")).toBe(false);
  });

  test("指定した大きさと配色と角丸と外観のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberFieldRoot color="blue" size="lg" variant="naked" />);

    // 検証
    const root = screen.getByClassName("sui_number_field").element();
    expect(root.classList.contains("sui_number_field-size_lg")).toBe(true);
    expect(root.classList.contains("sui_number_field-color_blue")).toBe(true);
    expect(root.classList.contains("sui_number_field-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_number_field-variant_naked")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <div id="sm">
          <NumberFieldRoot size="sm" />
        </div>
        <div id="full">
          <NumberFieldRoot radius="full" size="lg" />
        </div>
      </>,
    );

    // 検証
    expect(
      screen.container
        .querySelector("#sm .sui_number_field")
        ?.classList.contains("sui_number_field-radius_sm"),
    ).toBe(true);
    expect(
      screen.container
        .querySelector("#full .sui_number_field")
        ?.classList.contains("sui_number_field-radius_full"),
    ).toBe(true);
  });

  test("枠線の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberFieldRoot outlined />);

    // 検証
    expect(
      screen
        .getByClassName("sui_number_field")
        .element()
        .classList.contains("sui_number_field-outlined"),
    ).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberFieldRoot />);

    // 検証
    expect(screen.getByClassName("sui_number_field").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberFieldRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_number_field").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_number_field")).toBe(true);
  });

  test("利用者の props をルートと入力欄へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot defaultValue={3} id="field" max={10} min={0} step={2}>
        <NumberFieldInput />
      </NumberFieldRoot>,
    );

    // 検証
    const input = screen.getByClassName("sui_number_field_input").element() as HTMLInputElement;
    expect(input.id).toBe("field");
    expect(input.value).toBe("3");
    const hidden = screen.container.querySelector<HTMLInputElement>('input[type="number"]')!;
    expect(hidden.min).toBe("0");
    expect(hidden.max).toBe("10");
    expect(hidden.step).toBe("2");
  });

  test("値の変更を通知する", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<NonNullable<NumberFieldRootProps["onValueChange"]>>();
    const screen = await render(
      <NumberFieldRoot onValueChange={onValueChange}>
        <NumberFieldInput />
      </NumberFieldRoot>,
    );

    // 実行
    await screen.getByRole("textbox").fill("42");

    // 検証
    await vi.waitFor(() => {
      expect(onValueChange).toHaveBeenLastCalledWith(42, expect.anything());
    });
  });

  test("無効時は状態クラスと disabled 属性を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot disabled>
        <NumberFieldInput />
      </NumberFieldRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_number_field").element();
    expect(root.classList.contains("sui_number_field-disabled")).toBe(true);
    const input = screen.getByClassName("sui_number_field_input").element() as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  test("Field の検証状態を入力欄のクラスへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <FieldRoot invalid>
          <NumberFieldRoot>
            <NumberFieldInput />
          </NumberFieldRoot>
        </FieldRoot>
        <FieldRoot>
          <NumberFieldRoot>
            <NumberFieldInput />
          </NumberFieldRoot>
        </FieldRoot>
      </>,
    );

    // 検証
    const inputs = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_input");
    expect(inputs[0]?.classList.contains("sui_number_field_input-invalid")).toBe(true);
    expect(inputs[1]?.classList.contains("sui_number_field_input-unverified")).toBe(true);
  });

  test("ActionGroup のスタイルを引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot color="blue" outlined size="lg" variant="naked">
        <NumberFieldRoot />
      </ActionGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_number_field").element();
    expect(root.classList.contains("sui_number_field-size_lg")).toBe(true);
    expect(root.classList.contains("sui_number_field-color_blue")).toBe(true);
    expect(root.classList.contains("sui_number_field-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_number_field-outlined")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberFieldRoot render={<section />} />);

    // 検証
    const root = screen.getByClassName("sui_number_field").element();
    expect(root.tagName).toBe("SECTION");
  });
});
