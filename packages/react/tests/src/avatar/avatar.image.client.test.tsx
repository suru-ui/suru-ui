import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/avatar/avatar.parts.js";
import { type AvatarImageProps, AvatarImage } from "../../../src/avatar/avatar.image.jsx";
import { AvatarRoot } from "../../../src/avatar/avatar.root.jsx";
import "../_locators.js";

const imageSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

describe("AvatarImage", () => {
  test("画像と修飾クラスを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot>
        <AvatarImage alt="プロフィール画像" src={imageSrc} />
      </AvatarRoot>,
    );

    // 検証
    await vi.waitFor(() => {
      const image = screen.getByAltText("プロフィール画像").query();
      expect(image).not.toBe(null);
      expect(image?.classList.contains("sui_avatar_image")).toBe(true);
      expect(image?.tagName).toBe("IMG");
    });
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot>
        <AvatarImage alt="プロフィール画像" className="custom" src={imageSrc} />
      </AvatarRoot>,
    );

    // 検証
    await vi.waitFor(() => {
      const image = screen.getByAltText("プロフィール画像").query();
      expect(image?.classList.contains("custom")).toBe(true);
      expect(image?.classList.contains("sui_avatar_image")).toBe(true);
    });
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot>
        <AvatarImage alt="プロフィール画像" render={<span />} src={imageSrc} />
      </AvatarRoot>,
    );

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByClassName("sui_avatar_image").element().tagName).toBe("SPAN");
    });
  });

  test("読み込み状態の変化を通知する", async ({ expect }) => {
    // 準備
    const onLoadingStatusChange = vi.fn<NonNullable<AvatarImageProps["onLoadingStatusChange"]>>();

    // 実行
    await render(
      <AvatarRoot>
        <AvatarImage
          alt="プロフィール画像"
          src={imageSrc}
          onLoadingStatusChange={onLoadingStatusChange}
        />
      </AvatarRoot>,
    );

    // 検証
    await vi.waitFor(() => {
      expect(onLoadingStatusChange).toHaveBeenCalledWith("loaded");
    });
  });
});
