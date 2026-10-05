import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import {
  FileUpload,
  FileUploadAPI,
  useFileUploadAPI,
} from "../../../src/file-upload/file-upload.jsx";
import {
  type FileUploadAcceptEventDetails,
  type FileUploadRejectEventDetails,
} from "../../../src/file-upload/root/file-upload.root.jsx";
import "../../../src/file-upload/file-upload.parts.js";
import "../_locators.js";

const textFile = new File(["hello"], "hello.txt", { type: "text/plain" });
const anotherFile = new File(["world!"], "world.txt", { type: "text/plain" });

describe("FileUploadAPI", () => {
  test("Root の props から構成用の props を除く", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({ multiple: true, children: "添付", slotProps: {} });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.multiple).toBe(true);
    expect(rootProps).not.toHaveProperty("children");
    expect(rootProps).not.toHaveProperty("slotProps");
  });

  test("ドロップゾーンの既定の文言を返す", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({});

    // 検証
    expect(api.getDropzoneProps()).toStrictEqual({
      children: "ここにファイルをドラッグアンドドロップ、またはクリックして選択",
    });
  });

  test("ドロップゾーンの中身を差し替える", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({ children: "添付する" });

    // 検証
    expect(api.getDropzoneProps()).toStrictEqual({ children: "添付する" });
  });

  test("中身が null のときは既定の文言に置き換えない", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({ children: null });

    // 検証
    expect(api.getDropzoneProps()).toStrictEqual({ children: null });
  });

  test("slotProps のドロップゾーンを引き継ぐ", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({ slotProps: { dropzone: { "aria-label": "添付" } } });

    // 検証
    expect(api.getDropzoneProps()).toStrictEqual({
      "aria-label": "添付",
      children: "ここにファイルをドラッグアンドドロップ、またはクリックして選択",
    });
  });

  test("ファイルを項目の props に含める", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({ slotProps: { item: { id: "item" } } });

    // 検証
    expect(api.getItemProps(textFile)).toStrictEqual({ id: "item", file: textFile });
  });

  test("削除ボタンの既定の中身を返す", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({});

    // 検証
    expect(api.getItemDeleteTriggerProps()).toStrictEqual({ children: "×" });
  });

  test("削除ボタンの指定した中身を優先する", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({ slotProps: { itemDeleteTrigger: { children: "消す" } } });

    // 検証
    expect(api.getItemDeleteTriggerProps()).toStrictEqual({ children: "消す" });
  });

  test("削除ボタンの中身を空にできる", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({ slotProps: { itemDeleteTrigger: { children: null } } });

    // 検証
    expect(api.getItemDeleteTriggerProps()).toStrictEqual({ children: null });
  });

  test("指定のないパーツには空の props を返す", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({});
    const props = [
      api.getHiddenInputProps(),
      api.getItemGroupProps(),
      api.getItemNameProps(),
      api.getItemSizeTextProps(),
    ];

    // 検証
    expect(props).toStrictEqual([{}, {}, {}, {}]);
  });

  test("各パーツの slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new FileUploadAPI({
      slotProps: {
        hiddenInput: { id: "input" },
        itemGroup: { id: "group" },
        itemName: { id: "name" },
        itemSizeText: { id: "size" },
      },
    });

    // 検証
    expect(api.getHiddenInputProps()).toStrictEqual({ id: "input" });
    expect(api.getItemGroupProps()).toStrictEqual({ id: "group" });
    expect(api.getItemNameProps()).toStrictEqual({ id: "name" });
    expect(api.getItemSizeTextProps()).toStrictEqual({ id: "size" });
  });
});

describe("useFileUploadAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe(): React.ReactElement {
      const api = useFileUploadAPI({ children: "添付する" });
      return <span>{api.getDropzoneProps().children}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("添付する").query()?.textContent).toBe("添付する");
  });
});

describe("FileUpload", () => {
  test("隠し input とドロップゾーンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FileUpload />);
    const input = screen.getByClassName("sui_file_upload_hidden_input").element();
    const dropzone = screen.getByClassName("sui_file_upload_dropzone").element();

    // 検証
    expect(input.getAttribute("type")).toBe("file");
    expect(dropzone.textContent).toBe(
      "ここにファイルをドラッグアンドドロップ、またはクリックして選択",
    );
  });

  test("選択したファイルを一覧に表示する", async ({ expect }) => {
    // 準備
    const screen = await render(<FileUpload multiple />);

    // 実行
    await screen.getByClassName("sui_file_upload_hidden_input").upload(textFile);

    // 検証
    expect(screen.getByClassName("sui_file_upload_item_group").query()).not.toBe(null);
    expect(screen.getByText("hello.txt").query()?.textContent).toBe("hello.txt");
    expect(screen.getByText("5 B").query()?.textContent).toBe("5 B");
    expect(screen.getByRole("button", { name: "hello.txt を削除" }).query()).not.toBe(null);
  });

  test("削除ボタンで項目を削除する", async ({ expect }) => {
    // 準備
    const screen = await render(<FileUpload multiple />);
    await screen.getByClassName("sui_file_upload_hidden_input").upload(textFile);

    // 実行
    await screen.getByRole("button", { name: "hello.txt を削除" }).click();

    // 検証
    expect(screen.getByText("hello.txt").query()).toBe(null);
    expect(screen.getByClassName("sui_file_upload_item_group").query()).toBe(null);
  });

  test("複数選択では選択を積み重ねる", async ({ expect }) => {
    // 準備
    const screen = await render(<FileUpload multiple />);
    const input = screen.getByClassName("sui_file_upload_hidden_input");

    // 実行
    await input.upload(textFile);
    await input.upload(anotherFile);

    // 検証
    expect(screen.getByText("hello.txt").query()).not.toBe(null);
    expect(screen.getByText("world.txt").query()).not.toBe(null);
  });

  test("単一選択では選択を置き換える", async ({ expect }) => {
    // 準備
    const screen = await render(<FileUpload />);
    const input = screen.getByClassName("sui_file_upload_hidden_input");

    // 実行
    await input.upload(textFile);
    await input.upload(anotherFile);

    // 検証
    expect(screen.getByText("hello.txt").query()).toBe(null);
    expect(screen.getByText("world.txt").query()).not.toBe(null);
  });

  test("受け入れたファイルと拒否したファイルを報告する", async ({ expect }) => {
    // 準備
    const onFileAccept = vi.fn<(details: FileUploadAcceptEventDetails) => void>();
    const onFileReject = vi.fn<(details: FileUploadRejectEventDetails) => void>();
    const screen = await render(
      <FileUpload multiple maxFiles={1} onFileAccept={onFileAccept} onFileReject={onFileReject} />,
    );

    // 実行
    await screen.getByClassName("sui_file_upload_hidden_input").upload([textFile, anotherFile]);

    // 検証
    expect(onFileAccept).toHaveBeenCalledTimes(1);
    expect(onFileAccept).toHaveBeenCalledWith({ files: [textFile] });
    expect(onFileReject).toHaveBeenCalledTimes(1);
    expect(onFileReject).toHaveBeenCalledWith({
      acceptedFiles: [textFile],
      rejectedFiles: [{ file: anotherFile, reason: "max_files" }],
    });
  });

  test("選択内容の変更を通知する", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(files: File[]) => void>();
    const screen = await render(<FileUpload onValueChange={onValueChange} />);

    // 実行
    await screen.getByClassName("sui_file_upload_hidden_input").upload(textFile);

    // 検証
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith([textFile]);
  });

  test("制御された選択を反映する", async ({ expect }) => {
    // 準備
    function Controlled(): React.ReactElement {
      const [files, setFiles] = React.useState<readonly File[]>([]);

      return (
        <React.Fragment>
          <FileUpload value={files} multiple onValueChange={(next) => setFiles(next)} />
          <output className="sui_test_file_names">
            {files.map((file) => file.name).join(",")}
          </output>
        </React.Fragment>
      );
    }
    const screen = await render(<Controlled />);

    // 実行
    await screen.getByClassName("sui_file_upload_hidden_input").upload(textFile);

    // 検証
    expect(screen.getByClassName("sui_test_file_names").element().textContent).toBe("hello.txt");
  });

  test("slotProps を各パーツへ反映する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUpload
        slotProps={{
          hiddenInput: { id: "input" },
          dropzone: { "aria-label": "ファイルを添付" },
          itemGroup: { id: "group" },
          item: { id: "item" },
          itemName: { id: "name" },
          itemSizeText: { id: "size" },
          itemDeleteTrigger: { "aria-label": "削除" },
        }}
      />,
    );

    // 実行
    await screen.getByClassName("sui_file_upload_hidden_input").upload(textFile);

    // 検証
    expect(screen.getByClassName("sui_file_upload_hidden_input").element().id).toBe("input");
    expect(
      screen.getByClassName("sui_file_upload_dropzone").element().getAttribute("aria-label"),
    ).toBe("ファイルを添付");
    expect(screen.getByClassName("sui_file_upload_item_group").element().id).toBe("group");
    expect(screen.getByClassName("sui_file_upload_item").element().id).toBe("item");
    expect(screen.getByClassName("sui_file_upload_item_name").element().id).toBe("name");
    expect(screen.getByClassName("sui_file_upload_item_size_text").element().id).toBe("size");
    expect(screen.getByRole("button", { name: "削除" }).query()).not.toBe(null);
  });

  test("無効のときは操作を受け付けない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FileUpload disabled multiple />);

    // 検証
    expect(
      screen.getByClassName("sui_file_upload_hidden_input").element().hasAttribute("disabled"),
    ).toBe(true);
    expect(
      screen.getByClassName("sui_file_upload_dropzone").element().hasAttribute("disabled"),
    ).toBe(true);
  });
});
