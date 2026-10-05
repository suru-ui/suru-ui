import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { FileUploadItem } from "../item/file-upload.item.jsx";
import { FileUploadRoot } from "../root/file-upload.root.jsx";
import "../file-upload.parts.js";
import { FileUploadItemSizeText } from "./file-upload.item-size-text.jsx";
import "../../../tests/src/_locators.js";

/**
 * 指定したサイズのファイルを生成します。
 * バイト数の表示が桁に応じて切り替わることを検証するために使用します。
 */
function createSizedFile(size: number): File {
  return new File([new Uint8Array(size)], `size-${size}.bin`, { type: "application/octet-stream" });
}

describe("FileUploadItemSizeText", () => {
  test.for([
    [0, "0 B"],
    [512, "512 B"],
    [1024, "1 KB"],
    [1536, "1.5 KB"],
    [1024 * 1024, "1 MB"],
  ] as const)("バイト数を桁に応じて表示する", async ([size, expected], { expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItem file={createSizedFile(size)}>
          <FileUploadItemSizeText />
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_file_upload_item_size_text").element().textContent).toBe(
      expected,
    );
  });

  test("表示内容を差し替えられる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItem file={createSizedFile(512)}>
          <FileUploadItemSizeText>512 バイト</FileUploadItemSizeText>
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_file_upload_item_size_text").element().textContent).toBe(
      "512 バイト",
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItem file={createSizedFile(512)}>
          <FileUploadItemSizeText className="custom" />
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証
    const size = screen.getByClassName("sui_file_upload_item_size_text").element();
    expect(size.classList.contains("custom")).toBe(true);
    expect(size.classList.contains("sui_file_upload_item_size_text")).toBe(true);
  });
});
