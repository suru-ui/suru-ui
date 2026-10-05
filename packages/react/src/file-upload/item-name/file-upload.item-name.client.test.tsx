import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { FileUploadItem } from "../item/file-upload.item.jsx";
import { FileUploadRoot } from "../root/file-upload.root.jsx";
import "../file-upload.parts.js";
import { FileUploadItemName } from "./file-upload.item-name.jsx";
import "../../../tests/src/_locators.js";

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

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot size="lg">
        <FileUploadItem file={textFile}>
          <FileUploadItemName
            render={(props, state) => (
              <span {...props} data-probe={`${state.size}/${state.file.name}`} />
            )}
          />
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_file_upload_item_name").element().getAttribute("data-probe"),
    ).toBe("lg/hello.txt");
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
