import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { Avatar, AvatarAPI, useAvatarAPI } from "../../../src/avatar/avatar.jsx";
import "../_locators.js";

const imageSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

describe("AvatarAPI", () => {
  test("getRootProps はアバター固有の props を除いたルートの props を返す", ({ expect }) => {
    // 準備と実行
    const api = new AvatarAPI({
      alt: "プロフィール画像",
      children: "名",
      color: "blue",
      size: "lg",
      src: imageSrc,
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps).toStrictEqual({ color: "blue", size: "lg" });
  });

  test("getImageProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AvatarAPI({ children: "名" });

    // 検証
    expect(api.getImageProps()).toBe(null);
  });

  test("getImageProps は代替テキストと URL を返す", ({ expect }) => {
    // 準備と実行
    const api = new AvatarAPI({ alt: "プロフィール画像", src: imageSrc });

    // 検証
    expect(api.getImageProps()).toStrictEqual({ alt: "プロフィール画像", src: imageSrc });
  });

  test("getImageProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new AvatarAPI({
      alt: "プロフィール画像",
      src: imageSrc,
      slotProps: { image: { id: "image" } },
    });

    // 検証
    expect(api.getImageProps()).toStrictEqual({
      id: "image",
      alt: "プロフィール画像",
      src: imageSrc,
    });
  });

  test("getImageProps は URL が undefined のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AvatarAPI({ src: undefined });

    // 検証
    expect(api.getImageProps()).toBe(null);
  });

  test("getImageProps は空文字の URL を表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new AvatarAPI({ src: "" });

    // 検証
    expect(api.getImageProps()).toStrictEqual({ alt: undefined, src: "" });
  });

  test("getFallbackProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AvatarAPI({ src: imageSrc });

    // 検証
    expect(api.getFallbackProps()).toBe(null);
  });

  test.for([null, undefined, false])(
    "getFallbackProps は非表示の内容 (%s) で null を返す",
    (children, { expect }) => {
      // 準備と実行
      const api = new AvatarAPI({ children });

      // 検証
      expect(api.getFallbackProps()).toBe(null);
    },
  );

  test("getFallbackProps は内容を子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AvatarAPI({ children: "名" });

    // 検証
    expect(api.getFallbackProps()).toStrictEqual({ children: "名" });
  });

  test("getFallbackProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new AvatarAPI({ children: "名", slotProps: { fallback: { id: "fallback" } } });

    // 検証
    expect(api.getFallbackProps()).toStrictEqual({ id: "fallback", children: "名" });
  });
});

describe("useAvatarAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useAvatarAPI({ children: "名" });
      return <span>{api.getFallbackProps()?.children}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("名").query()?.textContent).toBe("名");
  });
});

describe("Avatar", () => {
  test("画像がないときはフォールバックだけを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Avatar>名</Avatar>);

    // 検証
    expect(screen.getByClassName("sui_avatar").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar_fallback").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar_image").query()).toBe(null);
  });

  test("画像を読み込めたら画像だけを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Avatar alt="プロフィール画像" src={imageSrc}>
        名
      </Avatar>,
    );

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByAltText("プロフィール画像").query()).not.toBe(null);
      expect(screen.getByClassName("sui_avatar_fallback").query()).toBe(null);
    });
  });

  test("画像を読み込めないときはフォールバックを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Avatar alt="プロフィール画像" src="">
        名
      </Avatar>,
    );

    // 検証
    expect(screen.getByClassName("sui_avatar_fallback").query()).not.toBe(null);
    expect(screen.getByAltText("プロフィール画像").query()).toBe(null);
  });

  test("slotProps を画像へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Avatar alt="プロフィール画像" src={imageSrc} slotProps={{ image: { id: "image" } }} />,
    );

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByAltText("プロフィール画像").element().id).toBe("image");
    });
  });

  test("slotProps をフォールバックへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Avatar slotProps={{ fallback: { id: "fallback" } }}>名</Avatar>);

    // 検証
    expect(screen.getByClassName("sui_avatar_fallback").element().id).toBe("fallback");
  });

  test("内容も画像もないときはルートだけを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Avatar aria-label="アバター" />);

    // 検証
    expect(screen.getByClassName("sui_avatar").query()).not.toBe(null);
    expect(screen.getByClassName("sui_avatar_image").query()).toBe(null);
    expect(screen.getByClassName("sui_avatar_fallback").query()).toBe(null);
  });
});
