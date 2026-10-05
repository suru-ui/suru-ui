import { COLORS } from "@suru-ui/theme";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { AvatarGroupRoot } from "../../../src/avatar-group/root/avatar-group.root.jsx";
import { AvatarRoot } from "../../../src/avatar/root/avatar.root.jsx";
import "../_locators.js";

describe("AvatarGroupRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarGroupRoot aria-label="仲間" />);

    // 検証
    const root = screen.getByClassName("sui_avatar_group").element();
    expect(root.classList.contains("sui_avatar_group")).toBe(true);
    expect(root.classList.contains("sui_avatar_group-forward")).toBe(true);
    expect(root.classList.contains("sui_avatar_group-reverse")).toBe(false);
  });

  test("reverse では逆方向の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarGroupRoot aria-label="仲間" reverse />);

    // 検証
    const root = screen.getByClassName("sui_avatar_group").element();
    expect(root.classList.contains("sui_avatar_group-reverse")).toBe(true);
    expect(root.classList.contains("sui_avatar_group-forward")).toBe(false);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarGroupRoot aria-label="仲間" className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_avatar_group").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_avatar_group")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarGroupRoot aria-label="仲間" render={<section />} />);

    // 検証
    expect(screen.getByLabelText("仲間").element().tagName).toBe("SECTION");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot
        aria-label="仲間"
        size="lg"
        color="blue"
        radius="none"
        reverse
        render={(props, state) => (
          <section
            {...props}
            data-probe={`${state.size}/${state.color}/${state.radius}/${String(state.reverse)}`}
          />
        )}
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_avatar_group").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("lg/blue/none/true");
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarGroupRoot aria-label="仲間" />);

    // 検証
    expect(screen.getByClassName("sui_avatar_group").element().getAttribute("data-scope")).toBe("");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間">
        <AvatarRoot>一</AvatarRoot>
      </AvatarGroupRoot>,
    );

    // 検証
    expect(screen.getByText("一").query()).not.toBe(null);
  });

  test("大きさを子のアバターへ上書きする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AvatarRoot id="outside" size="sm" />
        <AvatarGroupRoot aria-label="仲間" size="lg">
          <AvatarRoot id="inside" size="sm" />
        </AvatarGroupRoot>
      </>,
    );

    // 検証
    const outside = screen.container.querySelector<HTMLElement>("#outside")!;
    const inside = screen.container.querySelector<HTMLElement>("#inside")!;
    expect(outside.classList.contains("sui_avatar-size_sm")).toBe(true);
    expect(inside.classList.contains("sui_avatar-size_lg")).toBe(true);
  });

  test("色と角丸はアバターの指定を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間" color="blue" radius="none">
        <AvatarRoot id="explicit" color="red" radius="full" />
        <AvatarRoot id="fallback" />
      </AvatarGroupRoot>,
    );

    // 検証
    const explicit = screen.container.querySelector<HTMLElement>("#explicit")!;
    expect(explicit.classList.contains("sui_avatar-color_red")).toBe(true);
    expect(explicit.classList.contains("sui_avatar-radius_full")).toBe(true);
    const fallback = screen.container.querySelector<HTMLElement>("#fallback")!;
    expect(fallback.classList.contains("sui_avatar-color_blue")).toBe(true);
    expect(fallback.classList.contains("sui_avatar-radius_none")).toBe(true);
  });

  test("色を自動で割り当てる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間">
        <AvatarRoot id="first" />
        <AvatarRoot id="second" />
        <AvatarRoot id="third" />
      </AvatarGroupRoot>,
    );

    // 検証
    const first = screen.container.querySelector<HTMLElement>("#first")!;
    const second = screen.container.querySelector<HTMLElement>("#second")!;
    const third = screen.container.querySelector<HTMLElement>("#third")!;
    expect(first.classList.contains("sui_avatar-color_blue")).toBe(true);
    expect(second.classList.contains("sui_avatar-color_purple")).toBe(true);
    expect(third.classList.contains("sui_avatar-color_magenta")).toBe(true);
  });

  test("色の割り当てを先頭へ戻して循環する", async ({ expect }) => {
    // 準備
    const autoColors = COLORS.filter((color) => color !== "grey");

    // 実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間">
        {autoColors.map((_, i) => (
          <AvatarRoot id={`color-${i}`} key={i} />
        ))}
        <AvatarRoot id="wrapped" />
      </AvatarGroupRoot>,
    );

    // 検証
    const first = screen.container.querySelector<HTMLElement>("#color-0")!;
    const wrapped = screen.container.querySelector<HTMLElement>("#wrapped")!;
    expect(first.classList.contains(`sui_avatar-color_${autoColors[0]}`)).toBe(true);
    expect(wrapped.classList.contains(`sui_avatar-color_${autoColors[0]}`)).toBe(true);
  });
});
