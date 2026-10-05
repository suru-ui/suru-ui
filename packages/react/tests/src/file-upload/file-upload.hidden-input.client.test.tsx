import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { FileUploadHiddenInput } from "../../../src/file-upload/hidden-input/file-upload.hidden-input.jsx";
import "../../../src/file-upload/file-upload.parts.js";
import { FileUploadRoot } from "../../../src/file-upload/root/file-upload.root.jsx";
import "../_locators.js";
import FilesProbe from "./_probe.jsx";

const textFile = new File(["hello"], "hello.txt", { type: "text/plain" });
const anotherFile = new File(["world!"], "world.txt", { type: "text/plain" });

describe("FileUploadHiddenInput", () => {
  test("既定でファイル入力と基底クラスを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadHiddenInput />
      </FileUploadRoot>,
    );
    const input = screen.getByClassName("sui_file_upload_hidden_input").element();

    // 検証
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("type")).toBe("file");
  });

  test("ルートの設定を属性へ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot accept={["image/png", ".pdf"]} name="attachments" multiple required disabled>
        <FileUploadHiddenInput />
      </FileUploadRoot>,
    );
    const input = screen.getByClassName("sui_file_upload_hidden_input").element();

    // 検証
    expect(input.getAttribute("accept")).toBe("image/png,.pdf");
    expect(input.getAttribute("name")).toBe("attachments");
    expect(input.hasAttribute("multiple")).toBe(true);
    expect(input.hasAttribute("required")).toBe(true);
    expect(input.hasAttribute("disabled")).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot size="lg" accept="image/*">
        <FileUploadHiddenInput
          render={(props, state) => (
            <input {...props} data-probe={`${state.size}/${state.accept ?? ""}`} />
          )}
        />
      </FileUploadRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_file_upload_hidden_input").element().getAttribute("data-probe"),
    ).toBe("lg/image/*");
  });

  test("選んだファイルを状態へ反映する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUploadRoot>
        <FileUploadHiddenInput />
        <FilesProbe />
      </FileUploadRoot>,
    );

    // 実行
    await screen.getByClassName("sui_file_upload_hidden_input").upload(textFile);

    // 検証
    const probe = screen.getByClassName("sui_test_file_names").element();
    expect(probe.textContent).toBe("hello.txt");
  });

  test("複数選択では同じファイルをもう一度選べる", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUploadRoot multiple>
        <FileUploadHiddenInput />
        <FilesProbe />
      </FileUploadRoot>,
    );
    const input = screen.getByClassName("sui_file_upload_hidden_input");

    // 実行
    await input.upload(textFile);
    await input.upload(textFile);

    // 検証
    const probe = screen.getByClassName("sui_test_file_names").element();
    expect(probe.textContent).toBe("hello.txt,hello.txt");
  });

  test("複数選択を許可しないときは選択を置き換える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUploadRoot>
        <FileUploadHiddenInput />
        <FilesProbe />
      </FileUploadRoot>,
    );
    const input = screen.getByClassName("sui_file_upload_hidden_input");

    // 実行
    await input.upload(textFile);
    await input.upload(anotherFile);

    // 検証
    const probe = screen.getByClassName("sui_test_file_names").element();
    expect(probe.textContent).toBe("world.txt");
  });
});
