import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/avatar-group/avatar-group.parts.js";
import "../../../src/avatar/avatar.parts.js";
import { AvatarGroupRoot } from "../../../src/avatar-group/avatar-group.root.jsx";
import { AvatarRoot } from "../../../src/avatar/avatar.root.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";
import supportsSiblingIndex from "./_supports-sibling-index.js";

describe("AvatarGroupRoot の配置", () => {
  test("アバターを横一列に重ねて並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間">
        <AvatarRoot>一</AvatarRoot>
        <AvatarRoot>二</AvatarRoot>
        <AvatarRoot>三</AvatarRoot>
      </AvatarGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_avatar_group").element();
    const style = getComputedStyle(root);
    expect(style.display).toBe("inline-flex");
    expect(style.alignItems).toBe("center");
    const avatars = [...screen.container.querySelectorAll<HTMLElement>(".sui_avatar")];
    expect(avatars.length).toBe(3);
    const top = avatars[0]!.getBoundingClientRect().top;
    expect(avatars[1]!.getBoundingClientRect().top).toBeCloseTo(top, 1);
    expect(avatars[2]!.getBoundingClientRect().top).toBeCloseTo(top, 1);
  });

  test.skipIf(!supportsCustomFunctions())("隣り合うアバターを互いに重ねる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間">
        <AvatarRoot>一</AvatarRoot>
        <AvatarRoot>二</AvatarRoot>
        <AvatarRoot>三</AvatarRoot>
      </AvatarGroupRoot>,
    );

    // 検証
    const avatars = [...screen.container.querySelectorAll<HTMLElement>(".sui_avatar")];
    expect(getComputedStyle(avatars[0]!).marginInlineStart).toBe("0px");
    const overlap = Number.parseFloat(getComputedStyle(avatars[1]!).marginInlineStart);
    expect(overlap).toBeLessThan(0);
    expect(Number.parseFloat(getComputedStyle(avatars[2]!).marginInlineStart)).toBeCloseTo(
      overlap,
      1,
    );
    const first = avatars[0]!.getBoundingClientRect();
    const second = avatars[1]!.getBoundingClientRect();
    expect(first.right - second.left).toBeCloseTo(-overlap, 1);
  });

  test.skipIf(!supportsCustomFunctions())("reverse では逆側で重ねる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間" reverse>
        <AvatarRoot>一</AvatarRoot>
        <AvatarRoot>二</AvatarRoot>
        <AvatarRoot>三</AvatarRoot>
      </AvatarGroupRoot>,
    );

    // 検証
    const avatars = [...screen.container.querySelectorAll<HTMLElement>(".sui_avatar")];
    expect(getComputedStyle(avatars[2]!).marginInlineEnd).toBe("0px");
    const overlap = Number.parseFloat(getComputedStyle(avatars[0]!).marginInlineEnd);
    expect(overlap).toBeLessThan(0);
    expect(Number.parseFloat(getComputedStyle(avatars[1]!).marginInlineEnd)).toBeCloseTo(
      overlap,
      1,
    );
    const first = avatars[0]!.getBoundingClientRect();
    const second = avatars[1]!.getBoundingClientRect();
    expect(first.right - second.left).toBeCloseTo(-overlap, 1);
  });

  test.skipIf(!supportsSiblingIndex())("重なり順を前から後ろへ高くする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間">
        <AvatarRoot>一</AvatarRoot>
        <AvatarRoot>二</AvatarRoot>
        <AvatarRoot>三</AvatarRoot>
      </AvatarGroupRoot>,
    );

    // 検証
    const zIndexes = [...screen.container.querySelectorAll<HTMLElement>(".sui_avatar")].map(
      (avatar) => getComputedStyle(avatar).zIndex,
    );
    expect(zIndexes).toStrictEqual(["1", "2", "3"]);
  });

  test.skipIf(!supportsSiblingIndex())("reverse では重なり順を逆にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間" reverse>
        <AvatarRoot>一</AvatarRoot>
        <AvatarRoot>二</AvatarRoot>
        <AvatarRoot>三</AvatarRoot>
      </AvatarGroupRoot>,
    );

    // 検証
    const zIndexes = [...screen.container.querySelectorAll<HTMLElement>(".sui_avatar")].map(
      (avatar) => getComputedStyle(avatar).zIndex,
    );
    expect(zIndexes).toStrictEqual(["2", "1", "0"]);
  });

  test("大きさをグループで上書きする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AvatarRoot id="reference" size="lg" />
        <AvatarGroupRoot aria-label="仲間" size="lg">
          <AvatarRoot id="override" size="sm" />
        </AvatarGroupRoot>
      </>,
    );

    // 検証
    const reference = screen.container
      .querySelector<HTMLElement>("#reference")!
      .getBoundingClientRect();
    const override = screen.container
      .querySelector<HTMLElement>("#override")!
      .getBoundingClientRect();
    expect(reference.width).toBeCloseTo(36, 1);
    expect(override.width).toBeCloseTo(reference.width, 1);
    expect(override.height).toBeCloseTo(reference.height, 1);
  });

  test("色を自動で割り当てる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="blue" style={{ backgroundColor: "var(--sui-blue-solid-canvas-normal)" }} />
        <span id="purple" style={{ backgroundColor: "var(--sui-purple-solid-canvas-normal)" }} />
        <AvatarGroupRoot aria-label="仲間">
          <AvatarRoot id="first" />
          <AvatarRoot id="second" />
        </AvatarGroupRoot>
      </>,
    );

    // 検証
    const blue = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#blue")!,
    ).backgroundColor;
    const purple = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#purple")!,
    ).backgroundColor;
    expect(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#first")!).backgroundColor,
    ).toBe(blue);
    expect(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#second")!).backgroundColor,
    ).toBe(purple);
  });

  test("指定した色を子のアバターへ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="blue" style={{ backgroundColor: "var(--sui-blue-solid-canvas-normal)" }} />
        <span id="red" style={{ backgroundColor: "var(--sui-red-solid-canvas-normal)" }} />
        <AvatarGroupRoot aria-label="仲間" color="blue">
          <AvatarRoot id="fallback" />
          <AvatarRoot id="explicit" color="red" />
        </AvatarGroupRoot>
      </>,
    );

    // 検証
    const blue = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#blue")!,
    ).backgroundColor;
    const red = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#red")!,
    ).backgroundColor;
    expect(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#fallback")!).backgroundColor,
    ).toBe(blue);
    expect(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#explicit")!).backgroundColor,
    ).toBe(red);
  });

  test.skipIf(!supportsCustomFunctions())("枠線で重なりを区切る", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="canvas" style={{ backgroundColor: "var(--sui-canvas-1)" }} />
        <AvatarGroupRoot aria-label="仲間">
          <AvatarRoot>一</AvatarRoot>
        </AvatarGroupRoot>
      </>,
    );

    // 検証
    const shadow = getComputedStyle(screen.getByClassName("sui_avatar").element()).boxShadow;
    const canvas = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#canvas")!,
    ).backgroundColor;
    expect(shadow).not.toBe("none");
    expect(shadow).toContain(canvas);
    const spread = /0px 0px 0px ([\d.]+)px/.exec(shadow)?.[1];
    expect(spread).toBeDefined();
    expect(Number.parseFloat(spread!)).toBeCloseTo(3, 1);
  });

  test("角丸を子のアバターへ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AvatarRoot id="reference" radius="md" />
        <AvatarGroupRoot aria-label="仲間" radius="md">
          <AvatarRoot id="inherited" />
        </AvatarGroupRoot>
      </>,
    );

    // 検証
    const reference = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#reference")!,
    ).borderTopLeftRadius;
    const inherited = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#inherited")!,
    ).borderTopLeftRadius;
    expect(inherited).toBe(reference);
  });
});
