import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { FileUploadDropzone } from "../../../src/file-upload/file-upload.dropzone.jsx";
import { FileUploadItemGroup } from "../../../src/file-upload/file-upload.item-group.jsx";
import { FileUploadItemName } from "../../../src/file-upload/file-upload.item-name.jsx";
import { FileUploadItemSizeText } from "../../../src/file-upload/file-upload.item-size-text.jsx";
import { FileUploadItem } from "../../../src/file-upload/file-upload.item.jsx";
import "../../../src/file-upload/file-upload.parts.js";
import { FileUploadRoot } from "../../../src/file-upload/file-upload.root.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

const textFile = new File(["hello"], "hello.txt", { type: "text/plain" });
const anotherFile = new File(["world!"], "world.txt", { type: "text/plain" });

describe("ファイルアップロードの配置", () => {
  test("ルートを縦並びにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadDropzone />
      </FileUploadRoot>,
    );

    // 検証
    const root = getComputedStyle(screen.getByClassName("sui_file_upload").element());
    expect(root.display).toBe("flex");
    expect(root.flexDirection).toBe("column");
  });

  test.skipIf(!supportsCustomFunctions())("ルートの間隔を大きさに合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot size="sm">
        <FileUploadDropzone>選ぶ</FileUploadDropzone>
        <span>補足</span>
      </FileUploadRoot>,
    );
    const rootElement = screen.getByClassName("sui_file_upload").element();
    const gap = Number.parseFloat(getComputedStyle(rootElement).rowGap);

    // 検証
    expect(gap).toBeGreaterThan(0);
    const dropzone = screen
      .getByClassName("sui_file_upload_dropzone")
      .element()
      .getBoundingClientRect();
    const note = screen.getByText("補足").element().getBoundingClientRect();
    expect(note.top - dropzone.bottom).toBeCloseTo(gap, 1);
  });

  test.skipIf(!supportsCustomFunctions())("大きさが大きいほど間隔を広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <React.Fragment>
        <FileUploadRoot size="sm">
          <FileUploadDropzone>小</FileUploadDropzone>
          <span>小の補足</span>
        </FileUploadRoot>
        <FileUploadRoot size="lg">
          <FileUploadDropzone>大</FileUploadDropzone>
          <span>大の補足</span>
        </FileUploadRoot>
      </React.Fragment>,
    );
    // 検証
    const small = Number.parseFloat(
      getComputedStyle(screen.getByClassName("sui_file_upload").nth(0).element()).rowGap,
    );
    const large = Number.parseFloat(
      getComputedStyle(screen.getByClassName("sui_file_upload").nth(1).element()).rowGap,
    );
    expect(large).toBeGreaterThan(small);
  });

  test("ドロップゾーンの中身を中央に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadDropzone>選ぶ</FileUploadDropzone>
      </FileUploadRoot>,
    );

    // 検証
    const dropzone = getComputedStyle(screen.getByClassName("sui_file_upload_dropzone").element());
    expect(dropzone.display).toBe("flex");
    expect(dropzone.alignItems).toBe("center");
    expect(dropzone.justifyContent).toBe("center");
  });

  test.skipIf(!supportsCustomFunctions())(
    "ドロップゾーンに枠線と余白を付ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <FileUploadRoot>
          <FileUploadDropzone>選ぶ</FileUploadDropzone>
        </FileUploadRoot>,
      );

      // 検証
      const dropzone = getComputedStyle(
        screen.getByClassName("sui_file_upload_dropzone").element(),
      );
      expect(dropzone.borderTopStyle).toBe("solid");
      expect(Number.parseFloat(dropzone.borderTopWidth)).toBeGreaterThan(0);
      expect(Number.parseFloat(dropzone.paddingLeft)).toBeGreaterThan(0);
    },
  );

  test("大きさに応じて縦幅を変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <React.Fragment>
        <FileUploadRoot size="sm">
          <FileUploadDropzone>小</FileUploadDropzone>
        </FileUploadRoot>
        <FileUploadRoot size="lg">
          <FileUploadDropzone>大</FileUploadDropzone>
        </FileUploadRoot>
      </React.Fragment>,
    );
    // 検証
    const small = Number.parseFloat(
      getComputedStyle(screen.getByClassName("sui_file_upload_dropzone").nth(0).element())
        .minHeight,
    );
    const large = Number.parseFloat(
      getComputedStyle(screen.getByClassName("sui_file_upload_dropzone").nth(1).element())
        .minHeight,
    );
    expect(large).toBeGreaterThan(small);
  });

  test("角丸を指定に合わせて変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <React.Fragment>
        <FileUploadRoot radius="sm">
          <FileUploadDropzone>小</FileUploadDropzone>
        </FileUploadRoot>
        <FileUploadRoot radius="full">
          <FileUploadDropzone>丸</FileUploadDropzone>
        </FileUploadRoot>
      </React.Fragment>,
    );
    // 検証
    const small = Number.parseFloat(
      getComputedStyle(screen.getByClassName("sui_file_upload_dropzone").nth(0).element())
        .borderTopLeftRadius,
    );
    const full = Number.parseFloat(
      getComputedStyle(screen.getByClassName("sui_file_upload_dropzone").nth(1).element())
        .borderTopLeftRadius,
    );
    expect(full).toBeGreaterThan(small);
  });

  test("外観によって背景色を変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <React.Fragment>
        <FileUploadRoot variant="naked">
          <FileUploadDropzone>素</FileUploadDropzone>
        </FileUploadRoot>
        <FileUploadRoot variant="liquid">
          <FileUploadDropzone>淡</FileUploadDropzone>
        </FileUploadRoot>
      </React.Fragment>,
    );
    // 検証
    const naked = getComputedStyle(
      screen.getByClassName("sui_file_upload_dropzone").nth(0).element(),
    ).backgroundColor;
    const liquid = getComputedStyle(
      screen.getByClassName("sui_file_upload_dropzone").nth(1).element(),
    ).backgroundColor;
    expect(naked).toBe("rgba(0, 0, 0, 0)");
    expect(liquid).not.toBe(naked);
  });

  test("一覧の余白を消す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItemGroup>
          <FileUploadItem file={textFile}>
            <FileUploadItemName />
          </FileUploadItem>
        </FileUploadItemGroup>
      </FileUploadRoot>,
    );

    // 検証
    const group = getComputedStyle(screen.getByClassName("sui_file_upload_item_group").element());
    expect(group.paddingTop).toBe("0px");
    expect(group.paddingBottom).toBe("0px");
    expect(group.paddingLeft).toBe("0px");
    expect(group.marginTop).toBe("0px");
    expect(group.marginBottom).toBe("0px");
    expect(group.marginLeft).toBe("0px");
    expect(group.listStyleType).toBe("none");
  });

  test.skipIf(!supportsCustomFunctions())("一覧項目の間隔を空ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItemGroup>
          <FileUploadItem file={textFile}>
            <FileUploadItemName />
          </FileUploadItem>
          <FileUploadItem file={anotherFile}>
            <FileUploadItemName />
          </FileUploadItem>
        </FileUploadItemGroup>
      </FileUploadRoot>,
    );
    const groupElement = screen.getByClassName("sui_file_upload_item_group").element();
    const gap = Number.parseFloat(getComputedStyle(groupElement).rowGap);

    // 検証
    expect(gap).toBeGreaterThan(0);
    const first = screen
      .getByClassName("sui_file_upload_item")
      .nth(0)
      .element()
      .getBoundingClientRect();
    const second = screen
      .getByClassName("sui_file_upload_item")
      .nth(1)
      .element()
      .getBoundingClientRect();
    expect(second.top - first.bottom).toBeCloseTo(gap, 1);
  });

  test("ファイル名を省略表示にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadItem file={textFile}>
          <FileUploadItemName />
          <FileUploadItemSizeText />
        </FileUploadItem>
      </FileUploadRoot>,
    );

    // 検証
    const name = getComputedStyle(screen.getByClassName("sui_file_upload_item_name").element());
    expect(name.overflow).toBe("hidden");
    expect(name.textOverflow).toBe("ellipsis");
    expect(name.whiteSpace).toBe("nowrap");
    expect(name.flexGrow).toBe("1");
    expect(name.minWidth).toBe("0px");
  });

  test("無効状態で操作不可の見た目にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <React.Fragment>
        <FileUploadRoot variant="liquid">
          <FileUploadDropzone>有効</FileUploadDropzone>
        </FileUploadRoot>
        <FileUploadRoot variant="liquid" disabled>
          <FileUploadDropzone>無効</FileUploadDropzone>
        </FileUploadRoot>
      </React.Fragment>,
    );
    // 検証
    const enabled = getComputedStyle(
      screen.getByClassName("sui_file_upload_dropzone").nth(0).element(),
    );
    const disabled = getComputedStyle(
      screen.getByClassName("sui_file_upload_dropzone").nth(1).element(),
    );
    expect(disabled.cursor).toBe("not-allowed");
    expect(disabled.backgroundColor).not.toBe(enabled.backgroundColor);
  });

  test("無効状態でも外観に応じた背景色にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <React.Fragment>
        <FileUploadRoot variant="naked" disabled>
          <FileUploadDropzone>素</FileUploadDropzone>
        </FileUploadRoot>
        <FileUploadRoot variant="liquid" disabled>
          <FileUploadDropzone>淡</FileUploadDropzone>
        </FileUploadRoot>
      </React.Fragment>,
    );
    // 検証
    const naked = getComputedStyle(
      screen.getByClassName("sui_file_upload_dropzone").nth(0).element(),
    ).backgroundColor;
    const liquid = getComputedStyle(
      screen.getByClassName("sui_file_upload_dropzone").nth(1).element(),
    ).backgroundColor;
    expect(naked).not.toBe(liquid);
  });
});
