import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import FilesProbe from "../_probe.jsx";
import { FileUploadItem } from "../item/file-upload.item.jsx";
import "../file-upload.parts.js";
import { FileUploadRoot } from "../root/file-upload.root.jsx";
import "../../../tests/src/_locators.js";
import { FileUploadItemDeleteTrigger } from "./file-upload.item-delete-trigger.jsx";

const textFile = new File(["hello"], "hello.txt", { type: "text/plain" });
describe("FileUploadItemDeleteTrigger", () => {
  test("既定でボタンと基底クラスを持つ", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FileUploadRoot defaultValue={[textFile]}>
        <FileUploadItem file={textFile}>
          <FileUploadItemDeleteTrigger aria-label="削除" />
        </FileUploadItem>
      </FileUploadRoot>,
    );
    const trigger = screen.getByClassName("sui_file_upload_item_delete_trigger").element();

    // 検証。
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.getAttribute("type")).toBe("button");
    expect(trigger.getAttribute("aria-label")).toBe("削除");
  });

  test("押すと項目のファイルを削除する", async ({ expect }) => {
    // 準備。
    const screen = await render(
      <FileUploadRoot defaultValue={[textFile]}>
        <FileUploadItem file={textFile}>
          <FileUploadItemDeleteTrigger aria-label="hello.txt を削除" />
        </FileUploadItem>
        <FilesProbe />
      </FileUploadRoot>,
    );

    // 実行。
    await screen.getByRole("button", { name: "hello.txt を削除" }).click();

    // 検証。
    expect(screen.getByClassName("sui_test_file_names").element().textContent).toBe("");
  });

  test("ルートの無効に従う", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FileUploadRoot disabled defaultValue={[textFile]}>
        <FileUploadItem file={textFile}>
          <FileUploadItemDeleteTrigger aria-label="削除" />
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証。
    expect(
      screen
        .getByClassName("sui_file_upload_item_delete_trigger")
        .element()
        .hasAttribute("disabled"),
    ).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FileUploadRoot size="lg" defaultValue={[textFile]}>
        <FileUploadItem file={textFile}>
          <FileUploadItemDeleteTrigger
            render={(props, state) => (
              <button {...props} data-probe={`${state.size}/${state.file.name}`} />
            )}
            aria-label="削除"
          />
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証。
    expect(
      screen
        .getByClassName("sui_file_upload_item_delete_trigger")
        .element()
        .getAttribute("data-probe"),
    ).toBe("lg/hello.txt");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FileUploadRoot defaultValue={[textFile]}>
        <FileUploadItem file={textFile}>
          <FileUploadItemDeleteTrigger className="custom" aria-label="削除" />
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証。
    const trigger = screen.getByClassName("sui_file_upload_item_delete_trigger").element();
    expect(trigger.classList.contains("custom")).toBe(true);
    expect(trigger.classList.contains("sui_file_upload_item_delete_trigger")).toBe(true);
  });

  test("項目の提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備。
    function Probe(): React.ReactElement {
      return <FileUploadItemDeleteTrigger />;
    }

    // 実行と検証。
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });
});
