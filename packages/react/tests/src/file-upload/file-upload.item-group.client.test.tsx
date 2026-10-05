import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { FileUploadItemGroup } from "../../../src/file-upload/item-group/file-upload.item-group.jsx";
import "../../../src/file-upload/file-upload.parts.js";
import { FileUploadRoot } from "../../../src/file-upload/root/file-upload.root.jsx";
import "../_locators.js";

describe("FileUploadItemGroup", () => {
  test("既定でリストと基底クラスを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItemGroup>
          <li>項目</li>
        </FileUploadItemGroup>
      </FileUploadRoot>,
    );
    const group = screen.getByClassName("sui_file_upload_item_group").element();

    // 検証
    expect(group.tagName).toBe("UL");
    expect(group.children.length).toBe(1);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItemGroup className="custom" />
      </FileUploadRoot>,
    );

    // 検証
    const group = screen.getByClassName("sui_file_upload_item_group").element();
    expect(group.classList.contains("custom")).toBe(true);
    expect(group.classList.contains("sui_file_upload_item_group")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItemGroup render={<div />} />
      </FileUploadRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_file_upload_item_group").element().tagName).toBe("DIV");
  });
});
