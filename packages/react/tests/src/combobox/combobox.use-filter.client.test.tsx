import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { useComboboxFilter } from "../../../src/combobox/use-filter/combobox.use-filter.js";

describe("useComboboxFilter", () => {
  test("照合関数を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const filter = useComboboxFilter();
      return (
        <span>
          {[typeof filter.contains, typeof filter.startsWith, typeof filter.endsWith].join(",")}
        </span>
      );
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("function,function,function").query()?.textContent).toBe(
      "function,function,function",
    );
  });
});
