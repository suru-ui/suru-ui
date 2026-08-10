import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { AvatarGroup, AvatarGroupRoot } from "../../src/data-display/avatar-group/index.js";
import { Avatar } from "../../src/data-display/avatar/index.js";

describe("AvatarGroup", () => {
  test("アバターをグループ化する", async () => {
    const screen = await render(
      <AvatarGroup>
        <Avatar>太</Avatar>
        <Avatar>花</Avatar>
      </AvatarGroup>,
    );
    const group = screen.container.querySelector(".sui_avatar_group");

    expect(group).not.toBeNull();
    expect(group?.querySelectorAll(":scope > .sui_avatar")).toHaveLength(2);
    await expect.element(screen.getByText("太")).toBeVisible();
    await expect.element(screen.getByText("花")).toBeVisible();
  });

  test("左側のアバターを手前に表示する", async () => {
    const screen = await render(
      <AvatarGroup>
        <Avatar>太</Avatar>
        <Avatar>花</Avatar>
        <Avatar>次</Avatar>
      </AvatarGroup>,
    );
    const avatars = screen.container.querySelectorAll<HTMLElement>(
      ":scope > .sui_avatar_group > .sui_avatar",
    );

    expect(avatars).toHaveLength(3);
    await expect.element(avatars[0]!).toHaveStyle({ zIndex: "3" });
    await expect.element(avatars[1]!).toHaveStyle({ zIndex: "2" });
    await expect.element(avatars[2]!).toHaveStyle({ zIndex: "1" });
  });

  test("最大数を超えたアバターを省略する", async () => {
    const screen = await render(
      <AvatarGroup max={4}>
        <Avatar>太</Avatar>
        <Avatar>花</Avatar>
        <Avatar>次</Avatar>
        <Avatar>桜</Avatar>
        <Avatar>健</Avatar>
        <Avatar>葵</Avatar>
      </AvatarGroup>,
    );

    expect(screen.container.querySelectorAll(".sui_avatar")).toHaveLength(4);
    await expect.element(screen.getByText("+3")).toBeVisible();
  });

  test("省略アバターをカスタマイズする", async () => {
    const screen = await render(
      <AvatarGroup max={3} renderSurplus={(surplus) => <Avatar color="red">残り{surplus}</Avatar>}>
        <Avatar>太</Avatar>
        <Avatar>花</Avatar>
        <Avatar>次</Avatar>
        <Avatar>桜</Avatar>
      </AvatarGroup>,
    );

    await expect.element(screen.getByText("残り2")).toBeVisible();
    await expect.element(screen.getByText("残り2")).toHaveClass("sui_avatar_fallback");
  });

  test("render でルート要素を置き換える", async () => {
    const screen = await render(
      <AvatarGroup render={<section data-testid="avatar-group" />}>
        <Avatar>太</Avatar>
      </AvatarGroup>,
    );

    const group = screen.getByTestId("avatar-group");
    await expect.element(group).toHaveClass("sui_avatar_group");
  });
});

describe("AvatarGroupParts", () => {
  test("Root を直接使用できる", async () => {
    const screen = await render(
      <AvatarGroupRoot>
        <Avatar>太</Avatar>
      </AvatarGroupRoot>,
    );

    await expect.element(screen.getByText("太")).toBeVisible();
    expect(screen.container.querySelector(".sui_avatar_group")).not.toBeNull();
  });
});
