import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { at } from "../../tests/src/_at.js";
import { TooltipGroup } from "./tooltip-group.jsx";
import "../../tests/src/_locators.js";

describe("TooltipGroup の余白と配置", () => {
  test("子要素の間隔と余白をグループの外と同じにする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <div
          style={{
            gap: "8px",
            display: "flex",
          }}
          className="grouped"
        >
          <TooltipGroup>
            <button>保存</button>
            <button>共有</button>
          </TooltipGroup>
        </div>
        <div
          style={{
            gap: "8px",
            display: "flex",
          }}
          className="standalone"
        >
          <button>保存</button>
          <button>共有</button>
        </div>
      </>,
    );

    // 検証。
    const grouped = screen.getByClassName("grouped").element();
    const standalone = screen.getByClassName("standalone").element();
    const groupedButtons = grouped.querySelectorAll("button");
    const standaloneButtons = standalone.querySelectorAll("button");
    expect(groupedButtons).toHaveLength(2);
    expect(standaloneButtons).toHaveLength(2);

    const groupedGap =
      at(groupedButtons, 1).getBoundingClientRect().left -
      at(groupedButtons, 0).getBoundingClientRect().right;
    const standaloneGap =
      at(standaloneButtons, 1).getBoundingClientRect().left -
      at(standaloneButtons, 0).getBoundingClientRect().right;
    expect(groupedGap).toBeCloseTo(standaloneGap, 1);

    const groupedStyle = getComputedStyle(at(groupedButtons, 0));
    const standaloneStyle = getComputedStyle(at(standaloneButtons, 0));
    expect(groupedStyle.margin).toBe(standaloneStyle.margin);
    expect(groupedStyle.padding).toBe(standaloneStyle.padding);
    expect(groupedStyle.height).toBe(standaloneStyle.height);
  });
});
