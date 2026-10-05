import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/number-field/number-field.parts.js";
import {
  NumberField,
  NumberFieldAPI,
  useNumberFieldAPI,
} from "../../../src/number-field/number-field.jsx";
import { NumberFieldRoot } from "../../../src/number-field/root/number-field.root.jsx";
import "../_locators.js";

describe("NumberFieldAPI", () => {
  test("Suru UI 専用の props をルートへ渡さない", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({
      decrement: true,
      endAddons: [],
      increment: true,
      placeholder: "数量",
      scrubArea: "数量",
      slotProps: {},
      startAddons: [],
    });

    // 検証
    expect(api.getRootProps()).not.toHaveProperty("decrement");
    expect(api.getRootProps()).not.toHaveProperty("placeholder");
    expect(api.getRootProps()).not.toHaveProperty("scrubArea");
    expect(api.getRootProps()).not.toHaveProperty("slotProps");
  });

  test("入力欄へ案内文を引き継ぐ", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({ placeholder: "数量" });

    // 検証
    expect(api.getInputProps().placeholder).toBe("数量");
  });

  test("入力欄は slotProps の案内文を優先する", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({
      placeholder: "数量",
      slotProps: { input: { placeholder: "個数" } },
    });

    // 検証
    expect(api.getInputProps().placeholder).toBe("個数");
  });

  test("指定しないときはステッパーとスクラブ領域を表示しない", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({});

    // 検証
    expect(api.getDecrementProps()).toBe(null);
    expect(api.getIncrementProps()).toBe(null);
    expect(api.getScrubAreaProps()).toBe(null);
  });

  test("true ではステッパーを既定のアイコンで表示する", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({ decrement: true, increment: true });

    // 検証
    expect(api.getDecrementProps()).toStrictEqual({ children: undefined });
    expect(api.getIncrementProps()).toStrictEqual({ children: undefined });
  });

  test("指定した内容をステッパーへ渡す", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({ decrement: "減", increment: "増" });

    // 検証
    expect(api.getDecrementProps()).toStrictEqual({ children: "減" });
    expect(api.getIncrementProps()).toStrictEqual({ children: "増" });
  });

  test("slotProps だけでもステッパーを表示する", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({
      slotProps: { decrement: { id: "decrement" }, increment: { id: "increment" } },
    });

    // 検証
    expect(api.getDecrementProps()).toStrictEqual({ id: "decrement", children: undefined });
    expect(api.getIncrementProps()).toStrictEqual({ id: "increment", children: undefined });
  });

  test("スクラブ領域を表示する", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({ scrubArea: "数量" });

    // 検証
    expect(api.getScrubAreaProps()).not.toBe(null);
  });

  test("slotProps のカーソルだけでもスクラブ領域を表示する", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({ slotProps: { scrubAreaCursor: { id: "cursor" } } });

    // 検証
    expect(api.getScrubAreaProps()).not.toBe(null);
  });

  test("先頭と末尾の Addon へ props を配る", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({
      endAddons: ["円"],
      slotProps: { addon: { id: "addon" } },
      startAddons: ["¥"],
    });

    // 検証
    expect([...api.mapStartAddons((addon) => api.getAddonProps(addon))]).toStrictEqual([
      { id: "addon", children: "¥" },
    ]);
    expect([...api.mapEndAddons((addon) => api.getAddonProps(addon))]).toStrictEqual([
      { id: "addon", children: "円" },
    ]);
  });

  test("slotProps を各パーツへ渡す", ({ expect }) => {
    // 準備と実行
    const api = new NumberFieldAPI({
      slotProps: { group: { id: "group" }, input: { id: "input" } },
    });

    // 検証
    expect(api.getGroupProps()).toStrictEqual({ id: "group" });
    expect(api.getInputProps()).toStrictEqual({ id: "input", placeholder: undefined });
  });
});

describe("useNumberFieldAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useNumberFieldAPI({ decrement: true, placeholder: "数量" });

      return (
        <span>{`${api.getInputProps().placeholder}/${api.getDecrementProps() !== null}`}</span>
      );
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("数量/true").query()?.textContent).toBe("数量/true");
  });
});

describe("NumberField", () => {
  test("入力欄とグループを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberField aria-label="数量" />);

    // 検証
    expect(screen.getByClassName("sui_number_field").query()).not.toBe(null);
    expect(screen.getByRole("group").query()).not.toBe(null);
    expect(screen.getByRole("textbox").query()).not.toBe(null);
  });

  test("指定したパーツを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberField decrement increment scrubArea="数量" />);

    // 検証
    expect(screen.getByClassName("sui_number_field_scrub_area").query()).not.toBe(null);
    expect(screen.getByClassName("sui_number_field_decrement").query()).not.toBe(null);
    expect(screen.getByClassName("sui_number_field_increment").query()).not.toBe(null);
  });

  test("先頭と末尾の Addon を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberField endAddons={["円"]} startAddons={["¥"]} />);

    // 検証
    expect(screen.getByText("¥").query()).not.toBe(null);
    expect(screen.getByText("円").query()).not.toBe(null);
  });

  test("利用者の props をルートと入力欄へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<NumberField defaultValue={3} id="field" />);

    // 検証
    const input = screen.getByRole("textbox").element() as HTMLInputElement;
    expect(input.id).toBe("field");
    expect(input.value).toBe("3");
  });

  test("NumberField.useContext でコンテキストを読み取る", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = NumberField.useContext();

      return <span>{`${ctx.size}/${ctx.variant}/${String(ctx.outlined)}`}</span>;
    }

    // 実行
    const screen = await render(
      <NumberFieldRoot outlined size="lg" variant="naked">
        <Probe />
      </NumberFieldRoot>,
    );

    // 検証
    expect(screen.getByText("lg/naked/true").query()?.textContent).toBe("lg/naked/true");
  });
});
