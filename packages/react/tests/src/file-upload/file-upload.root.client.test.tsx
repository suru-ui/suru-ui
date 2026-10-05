import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/file-upload/file-upload.parts.js";
import { FileUploadRoot } from "../../../src/file-upload/root/file-upload.root.jsx";
import "../_locators.js";

const textFile = new File(["hello"], "hello.txt", { type: "text/plain" });

describe("FileUploadRoot", () => {
  test("既定の基底クラスとスコープの始点を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FileUploadRoot />);

    // 検証
    const root = screen.getByClassName("sui_file_upload").element();
    expect(root.tagName).toBe("DIV");
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FileUploadRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_file_upload").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_file_upload")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FileUploadRoot render={<section />} />);

    // 検証
    const root = screen.getByClassName("sui_file_upload").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test.for(["sm", "md", "lg"] as const)(
    "大きさ %s の修飾クラスを付ける",
    async (size, { expect }) => {
      // 準備と実行
      const screen = await render(<FileUploadRoot size={size} />);

      // 検証
      const root = screen.getByClassName("sui_file_upload").element();
      expect(root.classList.contains(`sui_file_upload-size_${size}`)).toBe(true);
    },
  );

  test("配色・角丸・外観の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot size="lg" color="blue" radius="full" variant="naked" />,
    );

    // 検証
    const root = screen.getByClassName("sui_file_upload").element();
    expect(root.classList.contains("sui_file_upload-color_blue")).toBe(true);
    expect(root.classList.contains("sui_file_upload-radius_full")).toBe(true);
    expect(root.classList.contains("sui_file_upload-variant_naked")).toBe(true);
  });

  test("角丸は既定で大きさに合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FileUploadRoot size="sm" />);

    // 検証
    const root = screen.getByClassName("sui_file_upload").element();
    expect(root.classList.contains("sui_file_upload-radius_sm")).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot
        size="lg"
        color="blue"
        radius="full"
        variant="naked"
        multiple
        defaultValue={[textFile]}
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.color}/${state.radius}/${state.variant}/${String(
              state.multiple,
            )}/${state.files.map((file) => file.name).join(",")}`}
          />
        )}
      />,
    );

    // 検証
    expect(screen.getByClassName("sui_file_upload").element().getAttribute("data-probe")).toBe(
      "lg/blue/full/naked/true/hello.txt",
    );
  });

  test("無効を指定すると状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FileUploadRoot disabled />);

    // 検証
    const root = screen.getByClassName("sui_file_upload").element();
    expect(root.classList.contains("sui_file_upload-disabled")).toBe(true);
  });

  test("入力項目の名前を DOM へ漏らさない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FileUploadRoot name="attachments" />);

    // 検証
    const root = screen.getByClassName("sui_file_upload").element();
    expect(root.hasAttribute("name")).toBe(false);
  });
});
