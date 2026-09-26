import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import { FileUploadItemName } from "../../../src/file-upload/file-upload.item-name.jsx";
import { FileUploadItem } from "../../../src/file-upload/file-upload.item.jsx";
import "../../../src/file-upload/file-upload.parts.js";
import { FileUploadRoot } from "../../../src/file-upload/file-upload.root.jsx";
import "../_locators.js";

const textFile = new File(["hello"], "hello.txt", { type: "text/plain" });

describe("FileUploadItemName", () => {
  test("ファイル名を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItem file={textFile}>
          <FileUploadItemName />
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証
    const name = screen.getByClassName("sui_file_upload_item_name").element();
    expect(name.tagName).toBe("SPAN");
    expect(name.textContent).toBe("hello.txt");
  });

  test("表示内容を差し替えられる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItem file={textFile}>
          <FileUploadItemName>添付ファイル</FileUploadItemName>
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_file_upload_item_name").element().textContent).toBe(
      "添付ファイル",
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItem file={textFile}>
          <FileUploadItemName className="custom" />
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証
    const name = screen.getByClassName("sui_file_upload_item_name").element();
    expect(name.classList.contains("custom")).toBe(true);
    expect(name.classList.contains("sui_file_upload_item_name")).toBe(true);
  });

  test("項目の提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe(): React.ReactElement {
      return <FileUploadItemName />;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });
});
