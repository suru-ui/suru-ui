import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Switch } from "../../src/forms/switch/index.js";
import { clickElement } from "../_click.js";

describe("Switch", () => {
  test("スイッチをレンダリングする", async () => {
    // 実行
    const screen = await render(<Switch />);

    // 検証
    const sw = screen.getByRole("switch");

    await expect.element(sw).toHaveClass("sui_switch");
    await expect.element(sw).toHaveAttribute("aria-checked", "false");
    await expect.element(sw).toHaveAttribute("data-unchecked", "");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Switch />);

    // 検証
    const sw = screen.getByRole("switch");

    await expect.element(sw).toHaveClass("sui_switch-size_md");
    await expect.element(sw).toHaveClass("sui_switch-color_grey");
    await expect.element(sw).toHaveClass("sui_switch-variant_naked");
    await expect.element(sw).toHaveClass("sui_switch-radius_full");
    await expect.element(sw).toHaveClass("sui_switch-outlined");
  });

  test("size・color・variant・radius・outlined を指定できる", async () => {
    // 実行
    const screen = await render(
      <Switch size="lg" color="blue" variant="liquid" radius="rounded" outlined={false} />,
    );

    // 検証
    const sw = screen.getByRole("switch");

    await expect.element(sw).toHaveClass("sui_switch-size_lg");
    await expect.element(sw).toHaveClass("sui_switch-color_blue");
    await expect.element(sw).toHaveClass("sui_switch-variant_liquid");
    await expect.element(sw).toHaveClass("sui_switch-radius_rounded");
  });

  test("クリックするとチェック状態が切り替わる", async () => {
    // 実行
    const screen = await render(<Switch />);
    const sw = screen.getByRole("switch");

    // 実行
    clickElement(sw);

    // 検証
    await expect.element(sw).toHaveAttribute("aria-checked", "true");
    await expect.element(sw).toHaveAttribute("data-checked", "");

    // 実行
    clickElement(sw);

    // 検証
    await expect.element(sw).toHaveAttribute("aria-checked", "false");
  });

  test("defaultChecked で初期状態を指定できる", async () => {
    // 実行
    const screen = await render(<Switch defaultChecked />);

    // 検証
    const sw = screen.getByRole("switch");

    await expect.element(sw).toHaveAttribute("aria-checked", "true");
    await expect.element(sw).toHaveAttribute("data-checked", "");
  });

  test("onCheckedChange がチェック状態を通知する", async () => {
    // 準備
    const changes: boolean[] = [];

    // 実行
    const screen = await render(
      <Switch
        onCheckedChange={(checked) => {
          changes.push(checked);
        }}
      />,
    );
    clickElement(screen.getByRole("switch"));
    clickElement(screen.getByRole("switch"));

    // 検証
    expect(changes).toStrictEqual([true, false]);
  });

  test("checked を指定するとチェック済みになる", async () => {
    // 実行
    const screen = await render(<Switch checked />);

    // 検証
    await expect.element(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  test("disabled を指定すると無効化される", async () => {
    // 実行
    const screen = await render(<Switch disabled />);

    // 検証
    const sw = screen.getByRole("switch");

    await expect.element(sw).toBeDisabled();
    await expect.element(sw).toHaveClass("sui_switch-disabled");
  });

  test("disabled のときはクリックしても状態が変わらない", async () => {
    // 準備
    let checked: boolean | undefined;

    // 実行
    const screen = await render(
      <Switch
        disabled
        onCheckedChange={(nextChecked) => {
          checked = nextChecked;
        }}
      />,
    );
    clickElement(screen.getByRole("switch"));

    // 検証
    expect(checked).toBe(undefined);
    await expect.element(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  test("Thumb をレンダリングする", async () => {
    // 実行
    const screen = await render(<Switch defaultChecked />);

    // 検証
    const thumb = screen.container.querySelector<HTMLElement>(".sui_switch_thumb");

    await expect.element(thumb).toBeInTheDocument();
  });

  test("slotProps が Thumb に適用される", async () => {
    // 実行
    const screen = await render(
      <Switch slotProps={{ thumb: { className: "my-thumb" } }} defaultChecked />,
    );

    // 検証
    const thumb = screen.container.querySelector<HTMLElement>(".sui_switch_thumb");

    await expect.element(thumb).toBeInTheDocument();
    await expect.element(thumb).toHaveClass("my-thumb");
  });
});
