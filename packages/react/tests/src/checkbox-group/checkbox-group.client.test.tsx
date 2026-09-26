import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  CheckboxGroup,
  CheckboxGroupAPI,
  useCheckboxGroupAPI,
} from "../../../src/checkbox-group/checkbox-group.jsx";
import { Checkbox } from "../../../src/checkbox/checkbox.jsx";

describe("CheckboxGroupAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行
    const api = new CheckboxGroupAPI({ size: "lg", color: "blue" });

    // 検証
    expect(api.getRootProps()).toStrictEqual({ size: "lg", color: "blue" });
  });
});

describe("useCheckboxGroupAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useCheckboxGroupAPI({ size: "lg" });
      return <span>{api.getRootProps().size}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});

describe("CheckboxGroup", () => {
  test("グループとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroup aria-label="通知" orientation="horizontal" size="lg" color="blue">
        <Checkbox aria-label="メール" value="mail" />
      </CheckboxGroup>,
    );

    // 検証
    const root = screen.getByRole("group", { name: "通知" }).element();
    expect(root.classList.contains("sui_checkbox_group-orientation_horizontal")).toBe(true);
    const checkbox = screen.getByRole("checkbox", { name: "メール" }).element();
    expect(checkbox.classList.contains("sui_checkbox-size_lg")).toBe(true);
    expect(checkbox.classList.contains("sui_checkbox-color_blue")).toBe(true);
  });

  test("useContext でコンテキストを読み取れる", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = CheckboxGroup.useContext();
      return <span>{ctx.size}</span>;
    }

    // 実行
    const screen = await render(
      <CheckboxGroup size="lg">
        <Probe />
      </CheckboxGroup>,
    );

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});
