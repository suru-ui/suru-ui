import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./resizable.parts.js";
import { Resizable, ResizableAPI, useResizableAPI } from "./resizable.jsx";
import "../../tests/src/_locators.js";

describe("Resizable", () => {
  test("ルートを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Resizable>
        <Resizable.Panel defaultSize={50}>左</Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={50}>右</Resizable.Panel>
      </Resizable>,
    );

    // 検証。
    const root = screen.getByClassName("sui_resizable").element();
    expect(root.classList.contains("sui_resizable-orientation_horizontal")).toBe(true);
    expect(root.querySelectorAll(".sui_resizable_panel").length).toBe(2);
    expect(root.querySelector(".sui_resizable_handle")).not.toBe(null);
  });

  test("指定した向きを反映する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Resizable orientation="vertical">
        <Resizable.Panel defaultSize={50}>上</Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={50}>下</Resizable.Panel>
      </Resizable>,
    );

    // 検証。
    expect(
      screen
        .getByClassName("sui_resizable")
        .element()
        .classList.contains("sui_resizable-orientation_vertical"),
    ).toBe(true);
  });

  test("PanelGroup はルートの別名として扱う", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Resizable.PanelGroup />);

    // 検証。
    expect(screen.getByClassName("sui_resizable").query()).not.toBe(null);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Resizable
        render={(props, state) => {
          const {
            orientation: _orientation,
            resizeTargetMinimumSize: _resizeTargetMinimumSize,
            ...rest
          } = props as Record<string, unknown>;

          return <section {...rest} data-probe={state.orientation} />;
        }}
        orientation="vertical"
      />,
    );

    // 検証。
    const root = screen.getByClassName("sui_resizable").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("vertical");
  });

  test("useContext で向きを読み取れる", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = Resizable.useContext();

      return <span>{ctx.orientation}</span>;
    }

    // 実行。
    const screen = await render(
      <Resizable orientation="vertical">
        <Probe />
      </Resizable>,
    );

    // 検証。
    expect(screen.getByText("vertical").query()?.textContent).toBe("vertical");
  });

  test("useResizableAPI でルートの props を作成する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useResizableAPI({ orientation: "vertical" });

      return <span>{`${api instanceof ResizableAPI}:${api.getRootProps().orientation}`}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("true:vertical").query()?.textContent).toBe("true:vertical");
  });
});
