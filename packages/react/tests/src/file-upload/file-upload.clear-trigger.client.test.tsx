import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { FileUploadClearTrigger } from "../../../src/file-upload/clear-trigger/file-upload.clear-trigger.jsx";
import { FileUploadHiddenInput } from "../../../src/file-upload/hidden-input/file-upload.hidden-input.jsx";
import "../../../src/file-upload/file-upload.parts.js";
import { FileUploadRoot } from "../../../src/file-upload/root/file-upload.root.jsx";
import "../_locators.js";
import FilesProbe from "./_probe.jsx";

const textFile = new File(["hello"], "hello.txt", { type: "text/plain" });

describe("FileUploadClearTrigger", () => {
  test("ファイルがないときは無効にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadClearTrigger>すべて削除</FileUploadClearTrigger>
      </FileUploadRoot>,
    );
    const clear = screen.getByClassName("sui_file_upload_clear_trigger").element();

    // 検証
    expect(clear.tagName).toBe("BUTTON");
    expect(clear.getAttribute("type")).toBe("button");
    expect(clear.hasAttribute("disabled")).toBe(true);
  });

  test("ファイルがあるときはすべて削除する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUploadRoot>
        <FileUploadHiddenInput />
        <FileUploadClearTrigger>すべて削除</FileUploadClearTrigger>
        <FilesProbe />
      </FileUploadRoot>,
    );
    await screen.getByClassName("sui_file_upload_hidden_input").upload(textFile);

    // 実行
    await screen.getByRole("button", { name: "すべて削除" }).click();

    // 検証
    expect(screen.getByClassName("sui_test_file_names").element().textContent).toBe("");
    expect(
      screen.getByClassName("sui_file_upload_clear_trigger").element().hasAttribute("disabled"),
    ).toBe(true);
  });

  test("ルートの無効に従う", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot disabled defaultValue={[textFile]}>
        <FileUploadClearTrigger>すべて削除</FileUploadClearTrigger>
      </FileUploadRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_file_upload_clear_trigger").element().hasAttribute("disabled"),
    ).toBe(true);
  });

  test("指定した無効を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot defaultValue={[textFile]}>
        <FileUploadClearTrigger disabled>すべて削除</FileUploadClearTrigger>
      </FileUploadRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_file_upload_clear_trigger").element().hasAttribute("disabled"),
    ).toBe(true);
  });
});
