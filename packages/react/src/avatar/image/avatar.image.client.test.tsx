import { vi, test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../avatar.parts.js";
import { AvatarRoot } from "../root/avatar.root.jsx";
import { AvatarImage } from "./avatar.image.jsx";
import "../../../tests/src/_locators.js";

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
        <AvatarImage alt="プロフィール画像" src={imageSrc} className="custom" />
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
        <AvatarImage alt="プロフィール画像" src={imageSrc} render={<span />} />
      </AvatarRoot>,
    );

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByClassName("sui_avatar_image").element().tagName).toBe("SPAN");
    });
  });
});
