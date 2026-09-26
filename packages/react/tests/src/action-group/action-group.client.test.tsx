import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  ActionGroup,
  ActionGroupAPI,
  useActionGroupAPI,
} from "../../../src/action-group/action-group.jsx";
import { Button } from "../../../src/button/button.js";

describe("ActionGroupAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行
    const api = new ActionGroupAPI({ size: "lg", color: "blue" });

    // 検証
    expect(api.getRootProps()).toStrictEqual({ size: "lg", color: "blue" });
  });
});

describe("useActionGroupAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useActionGroupAPI({ size: "lg" });
      return <span>{api.getRootProps().size}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});

describe("ActionGroup", () => {
  test("グループとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroup aria-label="操作" size="lg" color="blue">
        <Button>実行</Button>
      </ActionGroup>,
    );

    // 検証
    const root = screen.getByRole("group", { name: "操作" }).element();
    expect(root.classList.contains("sui_action_group-size_lg")).toBe(true);
    expect(root.classList.contains("sui_action_group-color_blue")).toBe(true);
    expect(screen.getByRole("button", { name: "実行" }).query()).not.toBe(null);
  });

  test("useContext でコンテキストを読み取れる", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = ActionGroup.useContext();
      return <span>{ctx.size}</span>;
    }

    // 実行
    const screen = await render(
      <ActionGroup size="lg">
        <Probe />
      </ActionGroup>,
    );

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});
