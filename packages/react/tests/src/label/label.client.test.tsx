import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/input/input.parts.js";
import { Input } from "../../../src/input/input.jsx";
import { Label, LabelAPI, useLabelAPI } from "../../../src/label/label.jsx";
import "../_locators.js";

describe("LabelAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行
    const api = new LabelAPI({ children: "名前", color: "blue", disabled: true, size: "lg" });

    // 検証
    expect(api.getRootProps()).toStrictEqual({
      children: "名前",
      color: "blue",
      disabled: true,
      size: "lg",
    });
  });
});

describe("useLabelAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useLabelAPI({ size: "lg" });
      return <span>{api.getRootProps().size}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});

describe("Label", () => {
  test("既定の修飾クラスを付けてラベルを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Label>名前</Label>);

    // 検証
    const root = screen.getByText("名前").element();
    expect(root.tagName).toBe("LABEL");
    expect(root.classList.contains("sui_label")).toBe(true);
    expect(root.classList.contains("sui_label-size_md")).toBe(true);
    expect(root.classList.contains("sui_label-color_grey")).toBe(true);
  });

  test("htmlFor で紐付けた入力欄にフォーカスする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Label htmlFor="label-email">メールアドレス</Label>
        <Input id="label-email" />
      </>,
    );
    await screen.getByText("メールアドレス").click();

    // 検証
    expect(document.activeElement).toBe(
      screen.getByRole("textbox", { name: "メールアドレス" }).element(),
    );
  });

  test("子のコントロールに名前を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Label>
        名前
        <Input />
      </Label>,
    );

    // 検証
    expect(screen.getByRole("textbox", { name: "名前" }).query()).not.toBe(null);
  });

  test("利用者の props をルートへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Label title="名前のラベル">名前</Label>);

    // 検証
    expect(screen.getByText("名前").element().getAttribute("title")).toBe("名前のラベル");
  });
});
