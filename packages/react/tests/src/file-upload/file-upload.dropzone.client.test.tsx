import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { FileUploadDropzone } from "../../../src/file-upload/file-upload.dropzone.jsx";
import { FileUploadHiddenInput } from "../../../src/file-upload/file-upload.hidden-input.jsx";
import "../../../src/file-upload/file-upload.parts.js";
import {
  type FileUploadAcceptEventDetails,
  type FileUploadRejectEventDetails,
  FileUploadRoot,
} from "../../../src/file-upload/file-upload.root.jsx";
import "../_locators.js";
import FilesProbe from "./_probe.js";

const textFile = new File(["hello"], "hello.txt", { type: "text/plain" });

/**
 * データトランスファーにファイルを載せたドラッグイベントを生成します。
 * ドロップとドラッグ中の状態変化を実際の `DataTransfer` で検証するために使用します。
 */
function createDragEvent(type: string, files: readonly File[]): DragEvent {
  const dataTransfer = new DataTransfer();
  for (const file of files) {
    dataTransfer.items.add(file);
  }

  return new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer });
}

describe("FileUploadDropzone", () => {
  test("既定でボタンと基底クラスを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadDropzone>添付する</FileUploadDropzone>
      </FileUploadRoot>,
    );
    const dropzone = screen.getByClassName("sui_file_upload_dropzone").element();

    // 検証
    expect(dropzone.tagName).toBe("BUTTON");
    expect(dropzone.getAttribute("type")).toBe("button");
    expect(dropzone.textContent).toBe("添付する");
  });

  test("中身を差し替えられる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadDropzone>添付する</FileUploadDropzone>
      </FileUploadRoot>,
    );

    // 検証
    expect(screen.getByText("添付する").query()?.textContent).toBe("添付する");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <FileUploadDropzone className="custom" />
      </FileUploadRoot>,
    );

    // 検証
    const dropzone = screen.getByClassName("sui_file_upload_dropzone").element();
    expect(dropzone.classList.contains("custom")).toBe(true);
    expect(dropzone.classList.contains("sui_file_upload_dropzone")).toBe(true);
  });

  test("クリックでファイル選択を開く", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUploadRoot>
        <FileUploadHiddenInput />
        <FileUploadDropzone />
      </FileUploadRoot>,
    );
    const input = screen
      .getByClassName("sui_file_upload_hidden_input")
      .element() as HTMLInputElement;
    const click = vi.spyOn(input, "click");

    // 実行
    await screen.getByClassName("sui_file_upload_dropzone").click();

    // 検証
    expect(click).toHaveBeenCalledTimes(1);
  });

  test("ドラッグ中は状態クラスを付ける", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUploadRoot>
        <FileUploadDropzone />
      </FileUploadRoot>,
    );
    const dropzone = screen.getByClassName("sui_file_upload_dropzone").element();

    // 実行
    dropzone.dispatchEvent(createDragEvent("dragenter", []));

    // 検証
    await vi.waitFor(() => {
      expect(dropzone.classList.contains("sui_file_upload_dropzone-dragover")).toBe(true);
    });

    // 実行
    dropzone.dispatchEvent(createDragEvent("dragleave", []));

    // 検証
    await vi.waitFor(() => {
      expect(dropzone.classList.contains("sui_file_upload_dropzone-dragover")).toBe(false);
    });
  });

  test("ドロップしたファイルを選択する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUploadRoot>
        <FileUploadDropzone />
        <FilesProbe />
      </FileUploadRoot>,
    );
    const dropzone = screen.getByClassName("sui_file_upload_dropzone").element();

    // 実行
    dropzone.dispatchEvent(createDragEvent("drop", [textFile]));

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByClassName("sui_test_file_names").element().textContent).toBe("hello.txt");
    });
  });

  test("accept に一致しないファイルのドロップを拒否する", async ({ expect }) => {
    // 準備
    const onFileAccept = vi.fn<(details: FileUploadAcceptEventDetails) => void>();
    const onFileReject = vi.fn<(details: FileUploadRejectEventDetails) => void>();
    const screen = await render(
      <FileUploadRoot accept="image/*" onFileAccept={onFileAccept} onFileReject={onFileReject}>
        <FileUploadDropzone />
        <FilesProbe />
      </FileUploadRoot>,
    );
    const dropzone = screen.getByClassName("sui_file_upload_dropzone").element();

    // 実行
    dropzone.dispatchEvent(createDragEvent("drop", [textFile]));

    // 検証
    expect(onFileReject).toHaveBeenCalledTimes(1);
    expect(onFileReject).toHaveBeenCalledWith({
      acceptedFiles: [],
      rejectedFiles: [{ file: textFile, reason: "invalid_type" }],
    });
    expect(onFileAccept).not.toHaveBeenCalled();
    expect(screen.getByClassName("sui_test_file_names").element().textContent).toBe("");
  });

  test("accept に一致するファイルのドロップを受け入れる", async ({ expect }) => {
    // 準備
    const imageFile = new File(["image"], "photo.png", { type: "image/png" });
    const pdfFile = new File(["pdf"], "document.pdf", { type: "application/pdf" });
    const onFileReject = vi.fn<(details: FileUploadRejectEventDetails) => void>();
    const screen = await render(
      <FileUploadRoot accept={["image/png", ".pdf"]} multiple onFileReject={onFileReject}>
        <FileUploadDropzone />
        <FilesProbe />
      </FileUploadRoot>,
    );
    const dropzone = screen.getByClassName("sui_file_upload_dropzone").element();

    // 実行
    dropzone.dispatchEvent(createDragEvent("drop", [imageFile, pdfFile]));

    // 検証
    expect(onFileReject).not.toHaveBeenCalled();
    await vi.waitFor(() => {
      expect(screen.getByClassName("sui_test_file_names").element().textContent).toBe(
        "photo.png,document.pdf",
      );
    });
  });

  test("無効のときはクリックもドロップも受け付けない", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FileUploadRoot disabled>
        <FileUploadHiddenInput />
        <FileUploadDropzone />
        <FilesProbe />
      </FileUploadRoot>,
    );
    const dropzone = screen.getByClassName("sui_file_upload_dropzone").element();
    const input = screen
      .getByClassName("sui_file_upload_hidden_input")
      .element() as HTMLInputElement;
    const click = vi.spyOn(input, "click");

    // 検証
    expect(dropzone.hasAttribute("disabled")).toBe(true);

    // 実行
    dropzone.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    dropzone.dispatchEvent(createDragEvent("dragenter", []));
    dropzone.dispatchEvent(createDragEvent("drop", [textFile]));

    // 検証
    expect(click).not.toHaveBeenCalled();
    expect(dropzone.classList.contains("sui_file_upload_dropzone-dragover")).toBe(false);
    expect(screen.getByClassName("sui_test_file_names").element().textContent).toBe("");
  });
});
