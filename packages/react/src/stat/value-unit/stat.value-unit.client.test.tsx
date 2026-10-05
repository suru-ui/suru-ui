import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../stat.parts.js";
import { StatRoot } from "../root/stat.root.jsx";
import { StatValue } from "../value/stat.value.jsx";
import { StatValueUnit } from "./stat.value-unit.jsx";
import "../../../tests/src/_locators.js";

describe("StatValueUnit", () => {
  test("span として単位を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatValue>
          1<StatValueUnit>時間</StatValueUnit>
        </StatValue>
      </StatRoot>,
    );

    // 検証
    const unit = screen.getByText("時間").element();
    expect(unit.tagName).toBe("SPAN");
    expect(unit.textContent).toBe("時間");
    expect(unit.classList.contains("sui_stat_value_unit")).toBe(true);
  });

  test("値の子として並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatValue>
          1<StatValueUnit>時間</StatValueUnit>23<StatValueUnit>分</StatValueUnit>
        </StatValue>
      </StatRoot>,
    );

    // 検証
    const units = screen.getByClassName("sui_stat_value_unit").elements();
    expect(units.length).toBe(2);
    expect(units[0]?.textContent).toBe("時間");
    expect(units[1]?.textContent).toBe("分");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatValue>
          <StatValueUnit className="custom">時間</StatValueUnit>
        </StatValue>
      </StatRoot>,
    );

    // 検証
    const unit = screen.getByText("時間").element();
    expect(unit.classList.contains("custom")).toBe(true);
    expect(unit.classList.contains("sui_stat_value_unit")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatValue>
          <StatValueUnit render={<small />}>時間</StatValueUnit>
        </StatValue>
      </StatRoot>,
    );

    // 検証
    expect(screen.getByText("時間").element().tagName).toBe("SMALL");
  });
});
