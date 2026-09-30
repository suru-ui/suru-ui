import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Button, ButtonAPI, useButtonAPI } from "../../../src/button/button.jsx";
import "../_locators.js";

describe("ButtonAPI", () => {
  test("getRootProps はボタン固有の props を除いたルートの props を返す", ({ expect }) => {
    // 準備と実行
    const api = new ButtonAPI({
      children: "送信",
      color: "blue",
      indeterminate: true,
      percentage: 50,
      size: "lg",
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps).toStrictEqual({ color: "blue", size: "lg" });
  });

  test("getContentProps は内容を子要素にして slotProps を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new ButtonAPI({
      children: "送信",
      slotProps: { content: { id: "content" } },
    });

    // 検証
    expect(api.getContentProps()).toStrictEqual({ id: "content", children: "送信" });
  });

  test("getPendingProps は既定でオーバーレイ表示にする", ({ expect }) => {
    // 準備と実行
    const api = new ButtonAPI({});

    // 検証
    expect(api.getPendingProps()).toStrictEqual({ overlay: true });
  });

  test("getPendingProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new ButtonAPI({
      slotProps: { pending: { overlay: false, keepMounted: true } },
    });

    // 検証
    expect(api.getPendingProps()).toStrictEqual({ overlay: false, keepMounted: true });
  });

  test("getCircularProgressProps は進捗率と不定モードを返す", ({ expect }) => {
    // 準備と実行
    const api = new ButtonAPI({
      indeterminate: true,
      percentage: 40,
      slotProps: { circularProgress: { id: "progress" } },
    });
    const progressProps = api.getCircularProgressProps();

    // 検証
    expect(progressProps.id).toBe("progress");
    expect(progressProps.percentage).toBe(40);
    expect(progressProps.indeterminate).toBe(true);
  });

  test("getCircularProgressFillProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new ButtonAPI({
      slotProps: { circularProgressFill: { strokeWidth: 2 } },
    });

    // 検証
    expect(api.getCircularProgressFillProps()).toStrictEqual({ strokeWidth: 2 });
  });

  test("getCircularProgressTrackProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new ButtonAPI({
      slotProps: { circularProgressTrack: { id: "track" } },
    });

    // 検証
    expect(api.getCircularProgressTrackProps()).toStrictEqual({ id: "track" });
  });

  test("getCircularProgressFillRotationProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new ButtonAPI({
      slotProps: { circularProgressFillRotation: { dur: "1s" } },
    });

    // 検証
    expect(api.getCircularProgressFillRotationProps()).toStrictEqual({ dur: "1s" });
  });
});

describe("useButtonAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useButtonAPI({ children: "送信" });
      return <span>{api.getContentProps().children}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("送信").query()?.textContent).toBe("送信");
  });
});

describe("Button", () => {
  test("ボタン要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Button color="blue" size="lg" variant="naked">
        送信
      </Button>,
    );

    // 検証
    const button = screen.getByRole("button").element();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("type")).toBe("button");
    expect(button.classList.contains("sui_button-size_lg")).toBe(true);
    expect(button.classList.contains("sui_button-color_blue")).toBe(true);
    expect(button.classList.contains("sui_button-variant_naked")).toBe(true);
    expect(screen.getByClassName("sui_button_content").element().textContent).toBe("送信");
  });

  test("保留中は内容を隠してスピナーを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Button pending>送信</Button>);

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-pending")).toBe(true);
    expect(button.classList.contains("sui_button-disabled")).toBe(false);
    expect(screen.getByClassName("sui_button_pending-overlay").query()).not.toBe(null);
    expect(screen.getByClassName("sui_button_circular_progress").query()).not.toBe(null);
    expect(screen.container.querySelector("animateTransform")).not.toBe(null);
    const content = screen.getByClassName("sui_button_content").element();
    expect(getComputedStyle(content).visibility).toBe("hidden");
  });

  test("進捗率を円弧のずれへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Button pending percentage={40}>
        送信
      </Button>,
    );

    // 検証
    const fill = screen.container.querySelector(".sui_button_circular_progress_fill");
    expect(fill?.getAttribute("stroke-dashoffset")).toBe("60");
    expect(screen.container.querySelector("animateTransform")).toBe(null);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Button
        pending
        slotProps={{
          circularProgressFill: { id: "fill", strokeWidth: 2 },
          content: { id: "content" },
          pending: { id: "pending" },
        }}
      >
        送信
      </Button>,
    );

    // 検証
    expect(screen.getByClassName("sui_button_content").element().id).toBe("content");
    expect(screen.getByClassName("sui_button_pending").element().id).toBe("pending");
    const fill = screen.container.querySelector(".sui_button_circular_progress_fill");
    expect(fill?.id).toBe("fill");
    expect(fill?.getAttribute("stroke-width")).toBe("2px");
  });

  test("子パーツの render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Button
        pending
        color="blue"
        size="lg"
        slotProps={{
          content: {
            render: (props, state) => (
              <span
                {...props}
                data-probe={`${state.size}/${state.color}/${String(state.pending)}`}
              />
            ),
          },
          pending: {
            render: (props, state) => (
              <span
                {...props}
                data-probe={`${state.size}/${String(state.disabled)}/${String(state.pending)}`}
              />
            ),
          },
        }}
      >
        送信
      </Button>,
    );

    // 検証
    expect(screen.getByClassName("sui_button_content").element().getAttribute("data-probe")).toBe(
      "lg/blue/true",
    );
    expect(screen.getByClassName("sui_button_pending").element().getAttribute("data-probe")).toBe(
      "lg/true/true",
    );
  });

  test("keepMounted を指定すると保留中でなくてもスピナーを保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Button slotProps={{ pending: { keepMounted: true } }}>送信</Button>,
    );

    // 検証
    expect(screen.getByClassName("sui_button_pending").query()).not.toBe(null);
    expect(screen.getByClassName("sui_button_pending-visibility_hidden").query()).not.toBe(null);
  });

  test("無効時は無効の状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Button disabled>送信</Button>);

    // 検証
    expect(
      screen.getByClassName("sui_button").element().classList.contains("sui_button-disabled"),
    ).toBe(true);
  });
});
