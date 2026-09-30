import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { FileUploadHiddenInput } from "../../../src/file-upload/file-upload.hidden-input.jsx";
import "../../../src/file-upload/file-upload.parts.js";
import { FileUploadRoot } from "../../../src/file-upload/file-upload.root.jsx";
import { FileUploadTrigger } from "../../../src/file-upload/file-upload.trigger.jsx";
import "../_locators.js";

describe("FileUploadTrigger", () => {
  test("既定でボタンと基底クラスを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadTrigger>ファイルを選択</FileUploadTrigger>
      </FileUploadRoot>,
    );
    const trigger = screen.getByClassName("sui_file_upload_trigger").element();

    // 検証
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.getAttribute("type")).toBe("button");
    expect(trigger.textContent).toBe("ファイルを選択");
  });

  test("クリックでファイル選択を開く", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUploadRoot>
        <FileUploadHiddenInput />
        <FileUploadTrigger>ファイルを選択</FileUploadTrigger>
      </FileUploadRoot>,
    );
    const input = screen
      .getByClassName("sui_file_upload_hidden_input")
      .element() as HTMLInputElement;
    const click = vi.spyOn(input, "click");

    // 実行
    await screen.getByRole("button", { name: "ファイルを選択" }).click();

    // 検証
    expect(click).toHaveBeenCalledTimes(1);
  });

  test("ルートの無効に従う", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUploadRoot disabled>
        <FileUploadHiddenInput />
        <FileUploadTrigger>ファイルを選択</FileUploadTrigger>
      </FileUploadRoot>,
    );
    const trigger = screen.getByClassName("sui_file_upload_trigger").element();
    const input = screen
      .getByClassName("sui_file_upload_hidden_input")
      .element() as HTMLInputElement;
    const click = vi.spyOn(input, "click");

    // 実行
    trigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // 検証
    expect(trigger.hasAttribute("disabled")).toBe(true);
    expect(click).not.toHaveBeenCalled();
  });

  test("指定した無効を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadTrigger disabled>ファイルを選択</FileUploadTrigger>
      </FileUploadRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_file_upload_trigger").element().hasAttribute("disabled"),
    ).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot size="lg">
        <FileUploadTrigger
          disabled
          render={(props, state) => (
            <button {...props} data-probe={`${state.size}/${String(state.disabled)}`} />
          )}
        >
          ファイルを選択
        </FileUploadTrigger>
      </FileUploadRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_file_upload_trigger").element().getAttribute("data-probe"),
    ).toBe("lg/true");
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadTrigger render={<a href="#select" aria-label="ファイルを選択" />}>
          ファイルを選択
        </FileUploadTrigger>
      </FileUploadRoot>,
    );

    // 検証
    const trigger = screen.getByClassName("sui_file_upload_trigger").element();
    expect(trigger.tagName).toBe("A");
    expect(trigger.getAttribute("href")).toBe("#select");
  });
});
