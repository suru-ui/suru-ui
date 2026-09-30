import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { FileUploadItem } from "../../../src/file-upload/file-upload.item.jsx";
import "../../../src/file-upload/file-upload.parts.js";
import { FileUploadRoot } from "../../../src/file-upload/file-upload.root.jsx";
import "../_locators.js";

const textFile = new File(["hello"], "hello.txt", { type: "text/plain" });

describe("FileUploadItem", () => {
  test("既定で項目と基底クラスを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItem file={textFile}>中身</FileUploadItem>
      </FileUploadRoot>,
    );
    const item = screen.getByClassName("sui_file_upload_item").element();

    // 検証
    expect(item.tagName).toBe("LI");
    expect(item.textContent).toBe("中身");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItem file={textFile} className="custom" />
      </FileUploadRoot>,
    );

    // 検証
    const item = screen.getByClassName("sui_file_upload_item").element();
    expect(item.classList.contains("custom")).toBe(true);
    expect(item.classList.contains("sui_file_upload_item")).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot size="lg">
        <FileUploadItem
          file={textFile}
          render={(props, state) => (
            <li {...props} data-probe={`${state.size}/${state.file.name}`} />
          )}
        />
      </FileUploadRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_file_upload_item").element().getAttribute("data-probe")).toBe(
      "lg/hello.txt",
    );
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItem file={textFile} render={<div />} />
      </FileUploadRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_file_upload_item").element().tagName).toBe("DIV");
  });
});
