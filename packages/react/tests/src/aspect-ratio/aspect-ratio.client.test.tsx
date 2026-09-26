import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  AspectRatio,
  AspectRatioAPI,
  useAspectRatioAPI,
} from "../../../src/aspect-ratio/aspect-ratio.jsx";
import "../_locators.js";

describe("AspectRatioAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行
    const api = new AspectRatioAPI({ ratio: 16 / 9, radius: "md" });

    // 検証
    expect(api.getRootProps()).toStrictEqual({ ratio: 16 / 9, radius: "md" });
  });
});

describe("useAspectRatioAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useAspectRatioAPI({ ratio: 1.5 });
      return <span>{api.getRootProps().ratio}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("1.5").query()?.textContent).toBe("1.5");
  });
});

describe("AspectRatio", () => {
  test("比率と角丸を付けて描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AspectRatio ratio={4 / 3} radius="lg">
        <div>内容</div>
      </AspectRatio>,
    );

    // 検証
    const root = screen.getByClassName("sui_aspect_ratio").element();
    expect(root.classList.contains("sui_aspect_ratio-radius_lg")).toBe(true);
    expect(root.style.getPropertyValue("--sui_aspect_ratio-ratio")).toBe(`${4 / 3}`);
    expect(screen.getByText("内容").query()).not.toBe(null);
  });

  test("既定の角丸で描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AspectRatio>内容</AspectRatio>);

    // 検証
    const root = screen.getByClassName("sui_aspect_ratio").element();
    expect(root.classList.contains("sui_aspect_ratio-radius_none")).toBe(true);
    expect(screen.getByText("内容").query()).not.toBe(null);
  });
});
