import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { AvatarGroupRoot } from "../root/avatar-group.root.jsx";
import { AvatarGroupSurplus } from "./avatar-group.surplus.jsx";

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
      <AvatarGroupRoot size="lg" radius="none" aria-label="仲間">
        <AvatarGroupSurplus id="surplus">+3</AvatarGroupSurplus>
      </AvatarGroupRoot>,
    );

    // 検証
    const surplus = screen.container.querySelector<HTMLElement>("#surplus")!;
    expect(surplus.classList.contains("sui_avatar")).toBe(true);
    expect(surplus.classList.contains("sui_avatar-size_lg")).toBe(true);
    expect(surplus.classList.contains("sui_avatar-radius_none")).toBe(true);
  });

  test("グループの色を引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot color="blue" aria-label="仲間">
        <AvatarGroupSurplus id="surplus">+3</AvatarGroupSurplus>
      </AvatarGroupRoot>,
    );

    // 検証
    const surplus = screen.container.querySelector<HTMLElement>("#surplus")!;
    expect(surplus.classList.contains("sui_avatar-color_blue")).toBe(true);
  });

  test("render の関数へグループの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot size="lg" color="blue" radius="none" reverse aria-label="仲間">
        <AvatarGroupSurplus
          id="surplus"
          render={(props, state) => (
            <span
              {...props}
              data-probe={`${state.size}/${state.color}/${state.radius}/${String(state.reverse)}/${state.imageLoadingStatus}`}
            />
          )}
        >
          +3
        </AvatarGroupSurplus>
      </AvatarGroupRoot>,
    );

    // 検証
    const surplus = screen.container.querySelector<HTMLElement>("#surplus")!;
    expect(surplus.tagName).toBe("SPAN");
    expect(surplus.getAttribute("data-probe")).toBe("lg/blue/none/true/idle");
  });

  test("指定した色を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot color="blue" aria-label="仲間">
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
