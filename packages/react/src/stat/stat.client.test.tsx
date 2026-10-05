import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./stat.parts.js";
import { Stat, StatAPI, useStatAPI } from "./stat.jsx";
import "../../tests/src/_locators.js";

describe("StatAPI", () => {
  test("表示する内容がないときはどのパーツも表示しない", ({ expect }) => {
    // 準備と実行
    const api = new StatAPI({});

    // 検証
    expect(api.getDescriptionProps()).toBe(null);
    expect(api.getLabelProps()).toBe(null);
    expect(api.getTrendProps()).toBe(null);
    expect(api.getValueProps()).toBe(null);
  });

  test.for([null, undefined, false, true])(
    "非表示の内容では表示しない (%s)",
    (content, { expect }) => {
      // 準備と実行
      const api = new StatAPI({
        label: content,
        trend: content,
        value: content,
        description: content,
      });

      // 検証
      expect(api.getDescriptionProps()).toBe(null);
      expect(api.getLabelProps()).toBe(null);
      expect(api.getTrendProps()).toBe(null);
      expect(api.getValueProps()).toBe(null);
    },
  );

  test("空文字は表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new StatAPI({ label: "", trend: "", value: "", description: "" });

    // 検証
    expect(api.getDescriptionProps()).toStrictEqual({ children: "" });
    expect(api.getLabelProps()).toStrictEqual({ children: "" });
    expect(api.getTrendProps()).toStrictEqual({ children: "" });
    expect(api.getValueProps()).toStrictEqual({ children: "" });
  });

  test("指定した内容を各パーツへ渡す", ({ expect }) => {
    // 準備と実行
    const api = new StatAPI({
      label: "閲覧者数",
      trend: "+200 (20 %)",
      value: "1,200",
      description: "先月より",
    });

    // 検証
    expect(api.getDescriptionProps()).toStrictEqual({ children: "先月より" });
    expect(api.getLabelProps()).toStrictEqual({ children: "閲覧者数" });
    expect(api.getTrendProps()).toStrictEqual({ children: "+200 (20 %)" });
    expect(api.getValueProps()).toStrictEqual({ children: "1,200" });
  });

  test("slotProps を各パーツへ渡す", ({ expect }) => {
    // 準備と実行
    const api = new StatAPI({
      label: "閲覧者数",
      trend: "+200 (20 %)",
      value: "1,200",
      slotProps: {
        label: { id: "label" },
        trend: { id: "trend" },
        value: { id: "value" },
        description: { id: "description" },
      },
      description: "先月より",
    });

    // 検証
    expect(api.getDescriptionProps()).toStrictEqual({ id: "description", children: "先月より" });
    expect(api.getLabelProps()).toStrictEqual({ id: "label", children: "閲覧者数" });
    expect(api.getTrendProps()).toStrictEqual({ id: "trend", children: "+200 (20 %)" });
    expect(api.getValueProps()).toStrictEqual({ id: "value", children: "1,200" });
  });

  test("ルートの HTML 属性を保持する", ({ expect }) => {
    // 準備と実行
    const api = new StatAPI({ id: "stat", label: "閲覧者数" });

    // 検証
    expect(api.getRootProps()).toStrictEqual({ id: "stat" });
  });

  test("Suru UI 専用の props をルートへ渡さない", ({ expect }) => {
    // 準備と実行
    const api = new StatAPI({ label: "閲覧者数", value: "1,200" });

    // 検証
    expect(api.getRootProps()).not.toHaveProperty("description");
    expect(api.getRootProps()).not.toHaveProperty("label");
    expect(api.getRootProps()).not.toHaveProperty("slotProps");
    expect(api.getRootProps()).not.toHaveProperty("trend");
    expect(api.getRootProps()).not.toHaveProperty("value");
  });
});

describe("useStatAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useStatAPI({ label: "閲覧者数", value: "1,200" });
      return <span>{api.getValueProps()?.children}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("1,200").query()?.textContent).toBe("1,200");
  });
});

describe("Stat", () => {
  test("ラベルと値とトレンドと説明を順に描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Stat label="閲覧者数" trend="+200 (20 %)" value="1,200" description="先月より" />,
    );

    // 検証
    const root = screen.getByClassName("sui_stat").element();
    expect(Array.from(root.children).map((child) => child.tagName)).toStrictEqual([
      "DT",
      "DD",
      "DD",
      "DD",
    ]);
    expect(root.querySelector(".sui_stat_label")?.textContent).toBe("閲覧者数");
    expect(root.querySelector(".sui_stat_value")?.textContent).toBe("1,200");
    expect(root.querySelector(".sui_stat_trend")?.textContent).toBe("+200 (20 %)");
    expect(root.querySelector(".sui_stat_description")?.textContent).toBe("先月より");
  });

  test("すべての内容を省略できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Stat />);

    // 検証
    const root = screen.getByClassName("sui_stat").element();
    expect(root.children.length).toBe(0);
  });

  test("内容が空文字でも描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Stat label="" trend="" value="" description="" />);

    // 検証
    const root = screen.getByClassName("sui_stat").element();
    expect(root.querySelector(".sui_stat_label")).not.toBe(null);
    expect(root.querySelector(".sui_stat_value")).not.toBe(null);
    expect(root.querySelector(".sui_stat_trend")).not.toBe(null);
    expect(root.querySelector(".sui_stat_description")).not.toBe(null);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Stat
        label="閲覧者数"
        trend="+200 (20 %)"
        value="1,200"
        slotProps={{
          label: { id: "label" },
          trend: { id: "trend" },
          value: { id: "value" },
          description: { id: "description" },
        }}
        description="先月より"
      />,
    );

    // 検証
    expect(screen.container.querySelector("#description")?.textContent).toBe("先月より");
    expect(screen.container.querySelector("#label")?.textContent).toBe("閲覧者数");
    expect(screen.container.querySelector("#trend")?.textContent).toBe("+200 (20 %)");
    expect(screen.container.querySelector("#value")?.textContent).toBe("1,200");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Stat label="閲覧者数" value="1,200" className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_stat").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_stat")).toBe(true);
  });
});
