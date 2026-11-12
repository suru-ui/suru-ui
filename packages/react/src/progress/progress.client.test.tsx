import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./progress.parts.js";
import { Progress, ProgressAPI, useProgressAPI } from "./progress.jsx";
import "../../tests/src/_locators.js";

describe("ProgressAPI", () => {
  test("現在値の既定値を null にする", ({ expect }) => {
    // 準備と実行。
    const api = new ProgressAPI({});

    // 検証。
    expect(api.getRootProps().value).toBe(null);
  });

  test("利用者の HTML 属性をルートへ引き継ぐ", ({ expect }) => {
    // 準備と実行。
    const api = new ProgressAPI({
      id: "progress",
      value: 25,
    });

    // 検証。
    expect(api.getRootProps().id).toBe("progress");
    expect(api.getRootProps().value).toBe(25);
  });

  test("ラベルがないときはラベルと値を表示しない", ({ expect }) => {
    // 準備と実行。
    const api = new ProgressAPI({ value: 25 });

    // 検証。
    expect(api.getLabelProps()).toBe(null);
    expect(api.getValueProps()).toBe(null);
  });

  test.for([[null], [undefined], [false], [true]] as const)(
    "非表示のラベルでは表示しない (%o)",
    ([label], { expect }) => {
      // 準備と実行。
      const api = new ProgressAPI({ label });

      // 検証。
      expect(api.getLabelProps()).toBe(null);
      expect(api.getValueProps()).toBe(null);
    },
  );

  test("空文字は表示対象にする", ({ expect }) => {
    // 準備と実行。
    const api = new ProgressAPI({ label: "" });

    // 検証。
    expect(api.getLabelProps()).toStrictEqual({ children: "" });
    expect(api.getValueProps()).toStrictEqual({});
  });

  test("ラベルがあるときはラベルと値を表示する", ({ expect }) => {
    // 準備と実行。
    const api = new ProgressAPI({ label: "読み込み中" });

    // 検証。
    expect(api.getLabelProps()).toStrictEqual({ children: "読み込み中" });
    expect(api.getValueProps()).toStrictEqual({});
  });

  test("slotProps を各パーツへ渡す", ({ expect }) => {
    // 準備と実行。
    const api = new ProgressAPI({
      label: "読み込み中",
      value: 25,
      slotProps: {
        label: { id: "label" },
        track: { id: "track" },
        value: { id: "value" },
        indicator: { id: "indicator" },
      },
    });

    // 検証。
    expect(api.getLabelProps()).toStrictEqual({
      id: "label",
      children: "読み込み中",
    });
    expect(api.getTrackProps()).toStrictEqual({ id: "track" });
    expect(api.getValueProps()).toStrictEqual({ id: "value" });
    expect(api.getIndicatorProps()).toStrictEqual({ id: "indicator" });
  });

  test("Suru UI 専用の props をルートへ渡さない", ({ expect }) => {
    // 準備と実行。
    const api = new ProgressAPI({
      label: "読み込み中",
      value: 25,
    });

    // 検証。
    expect(api.getRootProps()).not.toHaveProperty("label");
    expect(api.getRootProps()).not.toHaveProperty("slotProps");
  });
});

describe("useProgressAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useProgressAPI({
        label: "読み込み中",
        value: 25,
      });

      return <span>{api.getLabelProps()?.children}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("読み込み中").query()?.textContent).toBe("読み込み中");
  });
});

describe("Progress", () => {
  test("ラベルと値とトラックとインジケーターを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Progress label="読み込み中" value={25} />);

    // 検証。
    expect(screen.getByText("読み込み中").query()).not.toBe(null);
    expect(screen.getByText("25%").query()).not.toBe(null);
    expect(screen.getByClassName("sui_progress_track").query()).not.toBe(null);
    expect(screen.getByClassName("sui_progress_indicator").query()).not.toBe(null);
  });

  test("ラベルを省略すると値も表示しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Progress value={25} />);

    // 検証。
    expect(screen.getByClassName("sui_progress_label").query()).toBe(null);
    expect(screen.getByClassName("sui_progress_value").query()).toBe(null);
    expect(screen.getByClassName("sui_progress_track").query()).not.toBe(null);
  });

  test("現在値の既定値で不確定状態のクラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Progress label="読み込み中" />);

    // 検証。
    const root = screen.getByClassName("sui_progress").element();
    expect(root.classList.contains("sui_progress-status_indeterminate")).toBe(true);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Progress
        label="読み込み中"
        value={25}
        slotProps={{
          label: { id: "label" },
          track: { id: "track" },
          value: { id: "value" },
          indicator: { id: "indicator" },
        }}
      />,
    );

    // 検証。
    expect(screen.container.querySelector("#label")?.textContent).toBe("読み込み中");
    expect(screen.container.querySelector("#value")?.textContent).toBe("25%");
    expect(screen.container.querySelector("#track")).not.toBe(null);
    expect(screen.container.querySelector("#indicator")).not.toBe(null);
  });

  test("slotProps の描画関数で値を差し替える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Progress
        label="読み込み中"
        value={25}
        slotProps={{ value: { children: (formattedValue) => `${formattedValue} 完了` } }}
      />,
    );

    // 検証。
    expect(screen.getByText("25% 完了").query()).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Progress label="読み込み中" value={25} className="custom" />);

    // 検証。
    const root = screen.getByClassName("sui_progress").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_progress")).toBe(true);
  });
});
