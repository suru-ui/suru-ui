import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../avatar.parts.js";
import { AvatarGroupRoot } from "../../avatar-group/root/avatar-group.root.jsx";
import { AvatarRoot } from "./avatar.root.jsx";
import "../../../tests/src/_locators.js";

describe("AvatarRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarRoot />);

    // 検証
    const root = screen.getByClassName("sui_avatar").element();
    expect(root.classList.contains("sui_avatar")).toBe(true);
    expect(root.classList.contains("sui_avatar-size_md")).toBe(true);
    expect(root.classList.contains("sui_avatar-color_grey")).toBe(true);
    expect(root.classList.contains("sui_avatar-radius_full")).toBe(true);
  });

  test("span を既定の要素にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarRoot />);

    // 検証
    expect(screen.getByClassName("sui_avatar").element().tagName).toBe("SPAN");
  });

  test("指定した大きさの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AvatarRoot size="sm" />
        <AvatarRoot size="md" />
        <AvatarRoot size="lg" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_avatar-size_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-size_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-size_lg").query()).not.toBe(null);
  });

  test("指定した配色の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AvatarRoot color="blue" />
        <AvatarRoot color="purple" />
        <AvatarRoot color="magenta" />
        <AvatarRoot color="red" />
        <AvatarRoot color="orange" />
        <AvatarRoot color="yellow" />
        <AvatarRoot color="green" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_avatar-color_blue").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-color_purple").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-color_magenta").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-color_red").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-color_orange").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-color_yellow").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-color_green").query()).not.toBe(null);
  });

  test("指定した角丸の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AvatarRoot radius="none" />
        <AvatarRoot radius="sm" />
        <AvatarRoot radius="md" />
        <AvatarRoot radius="lg" />
        <AvatarRoot radius="full" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_avatar-radius_none").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-radius_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-radius_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-radius_lg").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar-radius_full").query()).not.toBe(null);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarRoot />);

    // 検証
    expect(screen.getByClassName("sui_avatar").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_avatar").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_avatar")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarRoot render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_avatar").element().tagName).toBe("SECTION");
  });

  test("render の関数へグループと自身の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot size="lg" color="blue" radius="sm" reverse>
        <AvatarRoot
          render={(props, state) => (
            <span
              {...props}
              data-probe={`${state.size}/${String(state.color)}/${state.radius}/${String(state.reverse)}`}
            />
          )}
        />
      </AvatarGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_avatar").element().getAttribute("data-probe")).toBe(
      "lg/blue/sm/true",
    );
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot>
        <span>内容</span>
      </AvatarRoot>,
    );

    // 検証
    expect(screen.getByText("内容").query()).not.toBe(null);
  });
});
