import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { Avatar } from "../avatar/avatar.jsx";
import { AvatarGroup, AvatarGroupAPI, useAvatarGroupAPI } from "./avatar-group.jsx";
import "../../tests/src/_locators.js";

describe("AvatarGroupAPI", () => {
  test("getRootProps は省略アバターの分を除いた子を返す", ({ expect }) => {
    // 準備と実行
    const api = new AvatarGroupAPI({ max: 3, children: ["一", "二", "三", "四", "五"] });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.children).toStrictEqual(["一", "二"]);
  });

  test("getRootProps は slotProps.root を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new AvatarGroupAPI({
      className: "custom",
      slotProps: { root: { id: "root" } },
    });

    // 検証
    expect(api.getRootProps()).toStrictEqual({ id: "root", children: [], className: "custom" });
  });

  test("getRootProps は slotProps.root の指定を優先する", ({ expect }) => {
    // 準備と実行
    const api = new AvatarGroupAPI({
      className: "top",
      slotProps: { root: { className: "slot" } },
    });

    // 検証
    expect(api.getRootProps().className).toBe("slot");
  });

  test("getSurplusProps は最大数を超えないとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AvatarGroupAPI({ max: 2, children: ["一", "二"] });

    // 検証
    expect(api.getSurplusProps()).toBe(null);
  });

  test("getSurplusProps は超過分だけを数える", ({ expect }) => {
    // 準備と実行
    const api = new AvatarGroupAPI({ max: 3, children: ["一", "二", "三", "四", "五"] });

    // 検証
    expect(api.getSurplusProps()).toStrictEqual({ children: "+3" });
  });

  test("getSurplusProps は slotProps.surplus を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new AvatarGroupAPI({
      max: 2,
      children: ["一", "二", "三"],
      slotProps: { surplus: { id: "surplus" } },
    });

    // 検証
    expect(api.getSurplusProps()).toStrictEqual({ id: "surplus", children: "+2" });
  });

  test("max が 0 のときはすべてのアバターを省略する", ({ expect }) => {
    // 準備と実行
    const api = new AvatarGroupAPI({ max: 0, children: ["一"] });

    // 検証
    expect(api.getRootProps().children).toStrictEqual([]);
    expect(api.getSurplusProps()).toStrictEqual({ children: "+1" });
  });
});

describe("useAvatarGroupAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useAvatarGroupAPI({ max: 1, children: ["一", "二"] });
      const surplusProps = api.getSurplusProps();
      return <span>{surplusProps?.children}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("+2").query()?.textContent).toBe("+2");
  });
});

describe("AvatarGroup", () => {
  test("最大数までアバターを表示して超過分をまとめる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroup max={4} aria-label="仲間">
        <Avatar>一</Avatar>
        <Avatar>二</Avatar>
        <Avatar>三</Avatar>
        <Avatar>四</Avatar>
        <Avatar>五</Avatar>
        <Avatar>六</Avatar>
      </AvatarGroup>,
    );

    // 検証
    expect(screen.container.querySelectorAll(".sui_avatar").length).toBe(4);
    expect(screen.getByText("一").query()).not.toBe(null);
    expect(screen.getByText("二").query()).not.toBe(null);
    expect(screen.getByText("三").query()).not.toBe(null);
    expect(screen.getByText("四").query()).toBe(null);
    expect(screen.getByText("+3").query()?.textContent).toBe("+3");
  });

  test("max を下回るときは省略アバターを表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroup aria-label="仲間">
        <Avatar>一</Avatar>
        <Avatar>二</Avatar>
      </AvatarGroup>,
    );

    // 検証
    expect(screen.container.querySelectorAll(".sui_avatar").length).toBe(2);
    expect(screen.getByText(/\+/).query()).toBe(null);
  });

  test("useContext でコンテキストを読み取れる", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = AvatarGroup.useContext();
      return <span>{ctx.size}</span>;
    }

    // 実行
    const screen = await render(
      <AvatarGroup size="lg">
        <Probe />
      </AvatarGroup>,
    );

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });

  test("slotProps をルートと省略アバターへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarGroup max={2} slotProps={{ root: { id: "root" }, surplus: { id: "surplus" } }}>
        <Avatar>一</Avatar>
        <Avatar>二</Avatar>
        <Avatar>三</Avatar>
      </AvatarGroup>,
    );

    // 検証
    expect(screen.getByClassName("sui_avatar_group").element().id).toBe("root");
    expect(screen.getByText("+2").element().id).toBe("surplus");
  });

  test("子のないときはルートだけを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarGroup aria-label="仲間" />);

    // 検証
    expect(screen.getByClassName("sui_avatar_group").query()).not.toBe(null);
    expect(screen.container.querySelectorAll(".sui_avatar").length).toBe(0);
  });
});
