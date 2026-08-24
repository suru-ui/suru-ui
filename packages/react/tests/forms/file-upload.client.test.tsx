import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import type {
  FileUploadAcceptEventDetails,
  FileUploadRejectEventDetails,
} from "../../src/forms/file-upload/index.js";
import {
  FileUpload,
  ClearTrigger as FileUploadPartsClearTrigger,
  Dropzone as FileUploadPartsDropzone,
  HiddenInput as FileUploadPartsHiddenInput,
  Root as FileUploadPartsRoot,
  Trigger as FileUploadPartsTrigger,
} from "../../src/forms/file-upload/index.js";

function getRoot(container: HTMLElement): HTMLDivElement | null {
  return container.querySelector<HTMLDivElement>("div.sui_file_upload");
}

function getHiddenInput(container: HTMLElement): HTMLInputElement | null {
  return container.querySelector<HTMLInputElement>("input.sui_file_upload_hidden_input");
}

function getItemGroup(container: HTMLElement): HTMLUListElement | null {
  return container.querySelector<HTMLUListElement>("ul.sui_file_upload_item_group");
}

function createFile(content: string, name: string): File {
  return new File([content], name, { type: "text/plain" });
}

async function selectFiles(input: HTMLInputElement, files: File[]): Promise<void> {
  const transfer = new DataTransfer();
  for (const file of files) {
    transfer.items.add(file);
  }
  input.files = transfer.files;
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

describe("FileUpload", () => {
  test("ルートと隠し input を描画する", async () => {
    // 実行
    const screen = await render(<FileUpload />);

    // 検証
    const root = getRoot(screen.container);
    const input = getHiddenInput(screen.container);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("DIV");
    expect(input).not.toBeNull();
    expect(input!.type).toBe("file");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<FileUpload />);

    // 検証
    const root = getRoot(screen.container);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_file_upload-size_md");
    await expect.element(root).toHaveClass("sui_file_upload-color_grey");
    await expect.element(root).toHaveClass("sui_file_upload-radius_md");
    await expect.element(root).toHaveClass("sui_file_upload-variant_liquid");
    expect(root!.classList.contains("sui_file_upload-disabled")).toBe(false);
  });

  test("スタイルプロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(<FileUpload size="lg" color="red" radius="full" variant="naked" />);

    // 検証
    const root = getRoot(screen.container);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_file_upload-size_lg");
    await expect.element(root).toHaveClass("sui_file_upload-color_red");
    await expect.element(root).toHaveClass("sui_file_upload-radius_full");
    await expect.element(root).toHaveClass("sui_file_upload-variant_naked");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<FileUpload className="my-file-upload" />);

    // 検証
    const root = getRoot(screen.container);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("my-file-upload");
    await expect.element(root).toHaveClass("sui_file_upload");
  });

  test("ドロップゾーンの内容を指定できる", async () => {
    // 実行
    const screen = await render(<FileUpload>ここにドロップ</FileUpload>);

    // 検証
    const dropzone = screen.getByRole("button", { name: "ここにドロップ" });

    await expect.element(dropzone).toHaveTextContent("ここにドロップ");
  });

  test("選んだファイルを一覧へ表示する", async () => {
    // 準備
    const screen = await render(<FileUpload multiple />);
    const input = getHiddenInput(screen.container)!;

    // 実行
    await selectFiles(input, [createFile("hello", "hello.txt"), createFile("world!", "world.txt")]);

    // 検証
    const group = getItemGroup(screen.container);

    expect(group).not.toBeNull();
    expect(group!.children.length).toBe(2);
    await expect.element(screen.getByText("hello.txt")).toBeInTheDocument();
    await expect.element(screen.getByText("world.txt")).toBeInTheDocument();
    await expect.element(screen.getByText("5 B")).toBeInTheDocument();
    await expect.element(screen.getByText("6 B")).toBeInTheDocument();
  });

  test("単一選択では新しい選択で既存を選び直す", async () => {
    // 準備
    const screen = await render(<FileUpload />);
    const input = getHiddenInput(screen.container)!;
    await selectFiles(input, [createFile("first.txt", "first.txt")]);

    // 実行
    await selectFiles(input, [createFile("second.txt", "second.txt")]);

    // 検証
    const group = getItemGroup(screen.container);

    expect(group).not.toBeNull();
    expect(group!.children.length).toBe(1);
    await expect.element(screen.getByText("second.txt")).toBeInTheDocument();
  });

  test("複数選択で選んだファイルを追加する", async () => {
    // 準備
    const screen = await render(<FileUpload multiple />);
    const input = getHiddenInput(screen.container)!;

    // 実行
    await selectFiles(input, [createFile("a.txt", "a.txt")]);
    await selectFiles(input, [createFile("b.txt", "b.txt")]);

    // 検証
    const group = getItemGroup(screen.container);

    expect(group).not.toBeNull();
    expect(group!.children.length).toBe(2);
  });

  test("maxFiles を超えたファイルを拒否する", async () => {
    // 準備
    const onFileReject = vi.fn<(details: FileUploadRejectEventDetails) => void>();
    const screen = await render(<FileUpload multiple maxFiles={1} onFileReject={onFileReject} />);
    const input = getHiddenInput(screen.container)!;

    // 実行
    await selectFiles(input, [createFile("a", "a.txt"), createFile("b", "b.txt")]);

    // 検証
    const group = getItemGroup(screen.container);

    expect(group).not.toBeNull();
    expect(group!.children.length).toBe(1);
    expect(onFileReject).toHaveBeenCalledTimes(1);
    const details = onFileReject.mock.calls[0]![0]!;
    expect(details.acceptedFiles).toHaveLength(1);
    expect(details.rejectedFiles).toHaveLength(1);
    expect(details.rejectedFiles[0]!.reason).toBe("max_files");
    expect(details.rejectedFiles[0]!.file.name).toBe("b.txt");
  });

  test("maxFileSize を超えたファイルを拒否する", async () => {
    // 準備
    const onFileReject = vi.fn<(details: FileUploadRejectEventDetails) => void>();
    const screen = await render(<FileUpload maxFileSize={3} onFileReject={onFileReject} />);
    const input = getHiddenInput(screen.container)!;

    // 実行
    await selectFiles(input, [createFile("toolong", "big.txt")]);

    // 検証
    const group = getItemGroup(screen.container);

    expect(group).toBeNull();
    expect(onFileReject).toHaveBeenCalledTimes(1);
    expect(onFileReject.mock.calls[0]![0]!.rejectedFiles[0]!.reason).toBe("max_size");
  });

  test("minFileSize に満たないファイルを拒否する", async () => {
    // 準備
    const onFileReject = vi.fn<(details: FileUploadRejectEventDetails) => void>();
    const screen = await render(<FileUpload minFileSize={10} onFileReject={onFileReject} />);
    const input = getHiddenInput(screen.container)!;

    // 実行
    await selectFiles(input, [createFile("tiny", "tiny.txt")]);

    // 検証
    const group = getItemGroup(screen.container);

    expect(group).toBeNull();
    expect(onFileReject.mock.calls[0]![0]!.rejectedFiles[0]!.reason).toBe("min_size");
  });

  test("受け入れられたときにコールバックを呼ぶ", async () => {
    // 準備
    const onValueChange = vi.fn<(files: File[]) => void>();
    const onFileAccept = vi.fn<(details: FileUploadAcceptEventDetails) => void>();
    const screen = await render(
      <FileUpload onValueChange={onValueChange} onFileAccept={onFileAccept} />,
    );
    const input = getHiddenInput(screen.container)!;

    // 実行
    await selectFiles(input, [createFile("ok.txt", "ok.txt")]);

    // 検証
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0]![0]![0]!.name).toBe("ok.txt");
    expect(onFileAccept).toHaveBeenCalledTimes(1);
    expect(onFileAccept.mock.calls[0]![0]!.files[0]!.name).toBe("ok.txt");
  });

  test("削除トリガーでファイルを取り除ける", async () => {
    // 準備
    const screen = await render(<FileUpload defaultValue={[createFile("gone", "gone.txt")]} />);

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "gone.txt を削除" }));

    // 検証
    const group = getItemGroup(screen.container);

    expect(group).toBeNull();
  });

  test("無効状態ではドロップゾーンと隠し input を無効化する", async () => {
    // 準備
    const screen = await render(
      <FileUploadPartsRoot disabled>
        <FileUploadPartsHiddenInput />
        <FileUploadPartsDropzone>ドロップ</FileUploadPartsDropzone>
      </FileUploadPartsRoot>,
    );
    const input = getHiddenInput(screen.container)!;

    // 検証
    const root = getRoot(screen.container);
    const dropzone = screen.getByRole("button", { name: "ドロップ" });

    await expect.element(dropzone).toBeDisabled();
    await expect.element(root).toHaveClass("sui_file_upload-disabled");
    expect(input.disabled).toBe(true);
  });
});

describe("FileUploadParts.Root", () => {
  test("隠し input の属性を設定する", async () => {
    // 実行
    const screen = await render(
      <FileUploadPartsRoot accept=".txt,image/*" multiple name="attachment" required>
        <FileUploadPartsHiddenInput />
      </FileUploadPartsRoot>,
    );

    // 検証
    const input = getHiddenInput(screen.container);

    expect(input).not.toBeNull();
    expect(input!.accept).toBe(".txt,image/*");
    expect(input!.multiple).toBe(true);
    expect(input!.name).toBe("attachment");
    expect(input!.required).toBe(true);
  });
});

describe("FileUploadParts.Trigger", () => {
  test("押すとファイル選択ダイアログを開く", async () => {
    // 準備
    const screen = await render(
      <FileUploadPartsRoot>
        <FileUploadPartsHiddenInput />
        <FileUploadPartsTrigger>選択</FileUploadPartsTrigger>
      </FileUploadPartsRoot>,
    );
    const input = getHiddenInput(screen.container)!;
    const originalClick = input.click.bind(input);
    const clickSpy = vi.fn<() => void>();
    input.click = clickSpy;

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "選択" }));

    // 検証
    expect(clickSpy).toHaveBeenCalledTimes(1);
    input.click = originalClick;
  });
});

describe("FileUploadParts.ClearTrigger", () => {
  test("押すとすべてのファイルを削除する", async () => {
    // 準備
    const screen = await render(
      <FileUploadPartsRoot defaultValue={[createFile("a", "a.txt")]}>
        <FileUploadPartsClearTrigger>クリア</FileUploadPartsClearTrigger>
      </FileUploadPartsRoot>,
    );

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "クリア" }));

    // 検証
    const group = getItemGroup(screen.container);

    expect(group).toBeNull();
  });

  test("ファイルがないときは無効化する", async () => {
    // 準備
    const screen = await render(
      <FileUploadPartsRoot>
        <FileUploadPartsClearTrigger>クリア</FileUploadPartsClearTrigger>
      </FileUploadPartsRoot>,
    );

    // 検証
    await expect.element(screen.getByRole("button", { name: "クリア" })).toBeDisabled();
  });
});

describe("FileUploadParts.Dropzone", () => {
  test("ドラッグ中は dragover クラスを適用する", async () => {
    // 準備
    const screen = await render(
      <FileUploadPartsRoot>
        <FileUploadPartsDropzone>ドロップ</FileUploadPartsDropzone>
      </FileUploadPartsRoot>,
    );
    const dropzone = screen.container.querySelector<HTMLButtonElement>(
      "button.sui_file_upload_dropzone",
    )!;

    // 実行と検証
    dropzone.dispatchEvent(new Event("dragenter", { bubbles: true }));
    await expect.element(dropzone).toHaveClass("sui_file_upload_dropzone-dragover");

    dropzone.dispatchEvent(new Event("drop", { bubbles: true }));
    await expect.element(dropzone).not.toHaveClass("sui_file_upload_dropzone-dragover");
  });
});
