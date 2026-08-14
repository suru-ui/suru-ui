import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Avatar, AvatarFallback, AvatarRoot } from "../../src/data-display/avatar/index.js";

describe("Avatar", () => {
  test("フォールバックを表示する", async () => {
    const screen = await render(<Avatar>太</Avatar>);

    await expect.element(screen.getByText("太")).toBeVisible();
    await expect.element(screen.getByText("太")).toHaveClass("sui_avatar_fallback");
  });

  test("画像とフォールバックを表示する", async () => {
    const screen = await render(
      <Avatar
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        alt="太郎"
      >
        太
      </Avatar>,
    );

    await expect.element(screen.getByRole("img")).toHaveAttribute("alt", "太郎");
  });

  test("Root にサイズ・色・角丸のクラスを適用する", async () => {
    const screen = await render(<Avatar size="lg" color="blue" radius="md" />);
    const avatar = screen.container.querySelector(".sui_avatar");

    expect(avatar).not.toBeNull();
    await expect.element(avatar as SVGElement).toHaveClass("sui_avatar-size_lg");
    await expect.element(avatar as SVGElement).toHaveClass("sui_avatar-color_blue");
    await expect.element(avatar as SVGElement).toHaveClass("sui_avatar-radius_md");
  });
});

describe("AvatarParts", () => {
  test("パーツを組み合わせて表示する", async () => {
    const screen = await render(
      <AvatarRoot>
        <AvatarFallback>AB</AvatarFallback>
      </AvatarRoot>,
    );

    await expect.element(screen.getByText("AB")).toBeVisible();
  });
});
