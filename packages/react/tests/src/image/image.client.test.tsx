import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Image, ImageAPI, useImageAPI } from "../../../src/image/image.jsx";
import "../_locators.js";

const imageSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

describe("ImageAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備
    const props = { alt: "風景", fit: "cover", radius: "md", src: imageSrc } as const;

    // 実行
    const api = new ImageAPI(props);

    // 検証
    expect(api.getRootProps()).toStrictEqual(props);
  });
});

describe("useImageAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useImageAPI({ fit: "contain", radius: "lg" });
      return <span>{`${api.getRootProps().fit}/${api.getRootProps().radius}`}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("contain/lg").query()?.textContent).toBe("contain/lg");
  });
});

describe("Image", () => {
  test("画像と修飾クラスを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Image alt="風景" fit="cover" radius="md" src={imageSrc} />);

    // 検証
    const root = screen.getByAltText("風景").element();
    expect(root.tagName).toBe("IMG");
    expect(root.classList.contains("sui_image")).toBe(true);
    expect(root.classList.contains("sui_image-fit_cover")).toBe(true);
    expect(root.classList.contains("sui_image-radius_md")).toBe(true);
  });

  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Image alt="風景" src={imageSrc} />);

    // 検証
    const root = screen.getByAltText("風景").element();
    expect(root.classList.contains("sui_image-radius_none")).toBe(true);
    expect(root.className).not.toContain("sui_image-fit_");
  });

  test("利用者の props をルートへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Image alt="装飾画像" aria-hidden="true" src={imageSrc} />);

    // 検証
    const root = screen.getByClassName("sui_image").element();
    expect(root.getAttribute("alt")).toBe("装飾画像");
    expect(root.getAttribute("aria-hidden")).toBe("true");
    expect(root.getAttribute("src")).toBe(imageSrc);
  });
});
