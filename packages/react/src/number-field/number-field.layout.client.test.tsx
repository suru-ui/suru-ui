import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { FieldRoot } from "../field/root/field.root.jsx";
import "./number-field.parts.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";
import "../../tests/src/_locators.js";
import { NumberField } from "./number-field.jsx";

describe("NumberField の配置", () => {
  test("外部の余白を持たずルート幅いっぱいに広がる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberField style={{ width: "320px" }} />);

    // 検証
    const root = screen.getByClassName("sui_number_field").element();
    const rootStyle = getComputedStyle(root);
    expect(rootStyle.marginTop).toBe("0px");
    expect(rootStyle.marginInlineStart).toBe("0px");
    const group = screen.getByClassName("sui_number_field_group").element();
    const groupStyle = getComputedStyle(group);
    expect(groupStyle.marginTop).toBe("0px");
    expect(groupStyle.marginInlineStart).toBe("0px");
    expect(root.getBoundingClientRect().width).toBeCloseTo(320, 1);
    expect(group.getBoundingClientRect().width).toBeCloseTo(root.getBoundingClientRect().width, 1);
  });

  test.skipIf(!supportsCustomFunctions())(
    "スクラブ領域とグループを縦に並べる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <span id="expected" style={{ gap: "--sui-gap(2)", display: "block" }} />
          <NumberField scrubArea="数量" />
        </>,
      );

      // 検証
      const expected = Number.parseFloat(
        getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!).rowGap,
      );
      const root = screen.getByClassName("sui_number_field").element();
      expect(getComputedStyle(root).flexDirection).toBe("column");
      const scrubRect = screen
        .getByClassName("sui_number_field_scrub_area")
        .element()
        .getBoundingClientRect();
      const groupRect = screen
        .getByClassName("sui_number_field_group")
        .element()
        .getBoundingClientRect();
      expect(scrubRect.bottom).toBeLessThanOrEqual(groupRect.top + 0.5);
      expect(groupRect.top - scrubRect.bottom).toBeCloseTo(expected, 0);
    },
  );

  test("大きさに応じたグループの最小高さを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <NumberField size="sm" />
        <NumberField size="md" />
        <NumberField size="lg" />
      </>,
    );

    // 検証
    const groups = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_group");
    expect(getComputedStyle(groups[0]!).minHeight).toBe("26px");
    expect(getComputedStyle(groups[1]!).minHeight).toBe("32px");
    expect(getComputedStyle(groups[2]!).minHeight).toBe("36px");
  });

  test.skipIf(!supportsCustomFunctions())("大きさに応じた水平余白を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ display: "block", paddingInline: "--sui-space(1.5)" }} />
        <span id="expected-md" style={{ display: "block", paddingInline: "--sui-space(2.5)" }} />
        <span id="expected-lg" style={{ display: "block", paddingInline: "--sui-space(3.5)" }} />
        <NumberField size="sm" />
        <NumberField size="md" />
        <NumberField size="lg" />
      </>,
    );

    // 検証
    const groups = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_group");
    for (const [index, id] of (["expected-sm", "expected-md", "expected-lg"] as const).entries()) {
      const expected = getComputedStyle(
        screen.container.querySelector<HTMLElement>(`#${id}`)!,
      ).paddingInlineStart;
      expect(getComputedStyle(groups[index]!).paddingInlineStart).toBe(expected);
    }
  });

  test("大きさに応じた活字を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <NumberField size="sm" endAddons={["円"]} />
        <NumberField size="md" endAddons={["円"]} />
        <NumberField size="lg" endAddons={["円"]} />
      </>,
    );

    // 検証
    const inputs = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_input");
    const addons = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_addon");
    for (const [index, fontSize] of (["12px", "14px", "17px"] as const).entries()) {
      expect(getComputedStyle(inputs[index]!).fontSize).toBe(fontSize);
      expect(getComputedStyle(addons[index]!).fontSize).toBe(fontSize);
    }
  });

  test("数値を等幅で表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberField />);

    // 検証
    expect(
      getComputedStyle(screen.getByClassName("sui_number_field_input").element())
        .fontVariantNumeric,
    ).toContain("tabular-nums");
  });

  test("指定した角丸でグループとステッパーを切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ borderTopLeftRadius: "4px" }} />
        <span id="expected-lg" style={{ borderTopLeftRadius: "12px" }} />
        <NumberField radius="none" decrement />
        <NumberField radius="sm" decrement />
        <NumberField radius="lg" decrement />
        <NumberField radius="full" decrement />
      </>,
    );

    // 検証
    const groups = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_group");
    const steppers = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_decrement");
    expect(getComputedStyle(groups[0]!).borderTopLeftRadius).toBe("0px");
    expect(getComputedStyle(groups[1]!).borderTopLeftRadius).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-sm")!)
        .borderTopLeftRadius,
    );
    expect(getComputedStyle(groups[2]!).borderTopLeftRadius).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-lg")!)
        .borderTopLeftRadius,
    );
    const fullGroup = getComputedStyle(groups[3]!);
    expect(Number.parseFloat(fullGroup.borderTopLeftRadius)).toBeCloseTo(
      Number.parseFloat(fullGroup.minHeight) / 2,
      1,
    );
    expect(getComputedStyle(steppers[2]!).borderTopLeftRadius).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-lg")!)
        .borderTopLeftRadius,
    );
  });

  test("ステッパーを正方形に揃える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <NumberField size="sm" decrement increment />
        <NumberField size="md" decrement increment />
        <NumberField size="lg" decrement increment />
      </>,
    );

    // 検証
    const steppers = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_decrement");
    for (const stepper of steppers) {
      const rect = stepper.getBoundingClientRect();
      expect(rect.width).toBeCloseTo(rect.height, 1);
    }
  });

  test("入力欄と Addon とステッパーを横一列に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberField
        style={{ width: "320px" }}
        decrement
        endAddons={["円"]}
        increment
        startAddons={["¥"]}
        defaultValue={100}
      />,
    );

    // 検証
    const groupRect = screen
      .getByClassName("sui_number_field_group")
      .element()
      .getBoundingClientRect();
    const addons = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_addon");
    const inputRect = screen
      .getByClassName("sui_number_field_input")
      .element()
      .getBoundingClientRect();
    const decrementRect = screen
      .getByClassName("sui_number_field_decrement")
      .element()
      .getBoundingClientRect();
    const incrementRect = screen
      .getByClassName("sui_number_field_increment")
      .element()
      .getBoundingClientRect();
    expect(
      getComputedStyle(screen.getByClassName("sui_number_field_group").element()).display,
    ).toBe("flex");
    const startAddonRect = addons[0]!.getBoundingClientRect();
    const endAddonRect = addons[1]!.getBoundingClientRect();
    expect(startAddonRect.right).toBeLessThanOrEqual(inputRect.left + 0.5);
    expect(inputRect.right).toBeLessThanOrEqual(endAddonRect.left + 0.5);
    expect(endAddonRect.right).toBeLessThanOrEqual(decrementRect.left + 0.5);
    expect(decrementRect.right).toBeLessThanOrEqual(incrementRect.left + 0.5);
    expect(incrementRect.right).toBeLessThanOrEqual(groupRect.right + 0.5);
    for (const rect of [inputRect, decrementRect, incrementRect]) {
      expect(rect.top + rect.height / 2).toBeCloseTo(groupRect.top + groupRect.height / 2, 0);
    }
  });

  test("外観に応じた背景色を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected-naked"
          style={{ backgroundColor: "var(--sui-grey-naked-canvas-normal)" }}
        />
        <span
          id="expected-liquid"
          style={{ backgroundColor: "var(--sui-grey-liquid-canvas-normal)" }}
        />
        <NumberField variant="naked" />
        <NumberField variant="liquid" />
      </>,
    );

    // 検証
    const groups = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_group");
    expect(getComputedStyle(groups[0]!).backgroundColor).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-naked")!)
        .backgroundColor,
    );
    expect(getComputedStyle(groups[1]!).backgroundColor).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-liquid")!)
        .backgroundColor,
    );
    expect(getComputedStyle(groups[0]!).backgroundColor).not.toBe(
      getComputedStyle(groups[1]!).backgroundColor,
    );
  });

  test.skipIf(!supportsCustomFunctions())(
    "outlined で入力グループに枠線を描く",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <span
            id="expected"
            style={{
              borderColor: "var(--sui-grey-naked-border-normal)",
              borderStyle: "solid",
              borderWidth: "--sui-border_width(1)",
            }}
          />
          <NumberField outlined />
        </>,
      );

      // 検証
      const expected = getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!);
      const after = getComputedStyle(
        screen.getByClassName("sui_number_field_group").element(),
        "::after",
      );
      expect(Number.parseFloat(after.borderTopWidth)).toBeGreaterThan(0.5);
      expect(Number.parseFloat(after.borderTopWidth)).toBeLessThan(1.5);
      expect(after.borderTopColor).toBe(expected.borderTopColor);
    },
  );

  test("outlined では hover で枠線色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <NumberField outlined />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const group = screen.getByClassName("sui_number_field_group").element();
    await screen.getByText("待避").hover();
    const idle = getComputedStyle(group, "::after").borderTopColor;

    // 実行
    await screen.getByClassName("sui_number_field_group").hover();

    // 検証
    expect(getComputedStyle(group, "::after").borderTopColor).not.toBe(idle);
  });

  test("outlined では focus-visible で枠線とフォーカスリングを変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <NumberField outlined />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const group = screen.getByClassName("sui_number_field_group").element();
    const input = screen.getByRole("textbox").element();
    await screen.getByText("待避").hover();
    const idle = getComputedStyle(group, "::after").borderTopColor;

    // 実行
    input.focus({ focusVisible: true });

    // 検証
    expect(getComputedStyle(group, "::after").borderTopColor).not.toBe(idle);
    expect(Number.parseFloat(getComputedStyle(group).outlineWidth)).toBeGreaterThan(0);
  });

  test("不正な Field では枠線色を変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected"
          style={{
            borderColor: "var(--sui-red-naked-canvas_text-normal)",
            borderStyle: "solid",
          }}
        >
          枠線の基準
        </span>
        <FieldRoot invalid>
          <NumberField outlined />
        </FieldRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("枠線の基準").element()).borderTopColor;
    expect(
      getComputedStyle(screen.getByClassName("sui_number_field_group").element(), "::after")
        .borderTopColor,
    ).toBe(expected);
  });

  test("無効時は配色を変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected-naked"
          style={{
            color: "var(--sui-disabled-naked-canvas_text)",
            backgroundColor: "var(--sui-disabled-naked-canvas)",
          }}
        >
          無効な背景なしの基準
        </span>
        <NumberField variant="naked" disabled defaultValue={1} />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("無効な背景なしの基準").element());
    expect(getComputedStyle(screen.getByClassName("sui_number_field_input").element()).color).toBe(
      expected.color,
    );
    expect(
      getComputedStyle(screen.getByClassName("sui_number_field_group").element()).backgroundColor,
    ).toBe(expected.backgroundColor);
  });

  test("公開変数でグループの最小高さとステッパーの大きさを上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberField decrement />);
    const group = screen.getByClassName("sui_number_field_group").element();
    const decrement = screen.getByClassName("sui_number_field_decrement").element();
    group.style.setProperty("--sui_number_field_group-min_height", "48px");
    decrement.style.setProperty("--sui_number_field_stepper-size", "32px");

    // 検証
    expect(getComputedStyle(group).minHeight).toBe("48px");
    expect(decrement.getBoundingClientRect().width).toBeCloseTo(32, 1);
  });
});
