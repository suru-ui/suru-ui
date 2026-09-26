import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { AvatarGroupRoot } from "../../../src/avatar-group/avatar-group.root.jsx";
import { AvatarGroupSurplus } from "../../../src/avatar-group/avatar-group.surplus.jsx";

describe("AvatarGroupSurplus", () => {
  test("内容をそのまま表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarGroupSurplus>+3</AvatarGroupSurplus>);

    // 検証
    expect(screen.getByText("+3").query()?.textContent).toBe("+3");
  });

  test("グループの大きさと角丸を引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間" size="lg" radius="none">
        <AvatarGroupSurplus id="surplus">+3</AvatarGroupSurplus>
      </AvatarGroupRoot>,
    );

    // 検証
    const surplus = screen.container.querySelector<HTMLElement>("#surplus")!;
    expect(surplus.classList.contains("sui_avatar")).toBe(true);
    expect(surplus.classList.contains("sui_avatar-size_lg")).toBe(true);
    expect(surplus.classList.contains("sui_avatar-radius_none")).toBe(true);
  });

  test("既定で灰色にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間" color="blue">
        <AvatarGroupSurplus id="surplus">+3</AvatarGroupSurplus>
      </AvatarGroupRoot>,
    );

    // 検証
    const surplus = screen.container.querySelector<HTMLElement>("#surplus")!;
    expect(surplus.classList.contains("sui_avatar-color_grey")).toBe(true);
  });

  test("指定した色を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間" color="blue">
        <AvatarGroupSurplus id="surplus" color="red">
          +3
        </AvatarGroupSurplus>
      </AvatarGroupRoot>,
    );

    // 検証
    const surplus = screen.container.querySelector<HTMLElement>("#surplus")!;
    expect(surplus.classList.contains("sui_avatar-color_red")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarGroupSurplus className="custom">+3</AvatarGroupSurplus>);

    // 検証
    const surplus = screen.getByText("+3").element();
    expect(surplus.classList.contains("custom")).toBe(true);
    expect(surplus.classList.contains("sui_avatar")).toBe(true);
  });

  test("グループのないところでも既定値で描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarGroupSurplus id="surplus">+3</AvatarGroupSurplus>);

    // 検証
    const surplus = screen.container.querySelector<HTMLElement>("#surplus")!;
    expect(surplus.classList.contains("sui_avatar-size_md")).toBe(true);
    expect(surplus.classList.contains("sui_avatar-color_grey")).toBe(true);
    expect(surplus.classList.contains("sui_avatar-radius_full")).toBe(true);
  });
});
