import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  RadioGroup,
  RadioGroupAPI,
  useRadioGroupAPI,
} from "../../../src/radio-group/radio-group.jsx";
import { Radio } from "../../../src/radio/radio.jsx";

describe("RadioGroupAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行
    const api = new RadioGroupAPI({ size: "lg", color: "blue" });

    // 検証
    expect(api.getRootProps()).toStrictEqual({ size: "lg", color: "blue" });
  });
});

describe("useRadioGroupAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useRadioGroupAPI({ size: "lg" });
      return <span>{api.getRootProps().size}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});

describe("RadioGroup", () => {
  test("グループとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroup
        aria-label="通知"
        color="blue"
        defaultValue="mail"
        orientation="horizontal"
        size="lg"
      >
        <Radio aria-label="メール" value="mail" />
      </RadioGroup>,
    );

    // 検証
    const root = screen.getByRole("radiogroup", { name: "通知" }).element();
    expect(root.classList.contains("sui_radio_group-orientation_horizontal")).toBe(true);
    const radio = screen.getByRole("radio", { name: "メール" }).element();
    expect(radio.classList.contains("sui_radio-size_lg")).toBe(true);
    expect(radio.classList.contains("sui_radio-color_blue")).toBe(true);
  });

  test("useContext でコンテキストを読み取れる", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = RadioGroup.useContext();
      return <span>{ctx.size}</span>;
    }

    // 実行
    const screen = await render(
      <RadioGroup size="lg">
        <Probe />
      </RadioGroup>,
    );

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});
