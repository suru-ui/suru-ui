import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  FormatNumber,
  FormatNumberAPI,
  useFormatNumberAPI,
} from "../../../src/format-number/format-number.jsx";

describe("FormatNumberAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行
    const api = new FormatNumberAPI({
      locales: "en-US",
      style: "currency",
      currency: "USD",
      value: 1234.5,
    });

    // 検証
    expect(api.getRootProps()).toStrictEqual({
      locales: "en-US",
      style: "currency",
      currency: "USD",
      value: 1234.5,
    });
  });
});

describe("useFormatNumberAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useFormatNumberAPI({ locales: "en-US", value: 1234.5 });
      return <span>{api.getRootProps().value}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("1234.5").query()?.textContent).toBe("1234.5");
  });
});

describe("FormatNumber", () => {
  test("数値を書式化して表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FormatNumber locales="en-US" value={1234.5} />);

    // 検証
    expect(screen.container.textContent).toBe("1,234.5");
  });
});
