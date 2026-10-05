import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import {
  type FileUploadContext,
  FileUploadContext as Context,
  useFileUploadContext,
} from "./file-upload.root.context.js";
import "../file-upload.parts.js";
import { FileUploadRoot } from "./file-upload.root.jsx";

const file = new File(["hello"], "hello.txt", { type: "text/plain" });

function Probe(): React.ReactElement {
  const ctx = useFileUploadContext();

  return (
    <span>
      {[
        ctx.accept ?? "",
        String(ctx.disabled),
        String(ctx.multiple),
        String(ctx.required),
        ctx.name ?? "",
        ctx.files.map((selected) => selected.name).join(","),
        ctx.size,
        ctx.color,
        ctx.radius,
        ctx.variant,
      ].join(",")}
    </span>
  );
}

describe("useFileUploadContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot name="attachments" accept="image/*" disabled multiple required>
        <Probe />
      </FileUploadRoot>,
    );

    // 検証
    expect(
      screen.getByText("image/*,true,true,true,attachments,,md,grey,md,liquid").query()
        ?.textContent,
    ).toBe("image/*,true,true,true,attachments,,md,grey,md,liquid");
  });

  test("既定値を補完する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot>
        <Probe />
      </FileUploadRoot>,
    );

    // 検証
    expect(screen.getByText(",false,false,false,,,md,grey,md,liquid").query()?.textContent).toBe(
      ",false,false,false,,,md,grey,md,liquid",
    );
  });

  test("ファイルの種類の配列をカンマ区切りにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot accept={["image/png", ".pdf"]}>
        <Probe />
      </FileUploadRoot>,
    );

    // 検証
    expect(
      screen.getByText("image/png,.pdf,false,false,false,,,md,grey,md,liquid").query()?.textContent,
    ).toBe("image/png,.pdf,false,false,false,,,md,grey,md,liquid");
  });

  test("スタイル情報を提供する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FileUploadRoot size="lg" color="blue" radius="full" variant="naked">
        <Probe />
      </FileUploadRoot>,
    );

    // 検証
    expect(screen.getByText(",false,false,false,,,lg,blue,full,naked").query()?.textContent).toBe(
      ",false,false,false,,,lg,blue,full,naked",
    );
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Missing(): null {
      useFileUploadContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Missing />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Optional(): React.ReactElement {
      const ctx = useFileUploadContext(true);
      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Optional />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("直接提供した値を返す", async ({ expect }) => {
    // 準備
    const provided: FileUploadContext = {
      name: "manual",
      open() {},
      size: "md",
      clear() {},
      color: "grey",
      files: [file],
      accept: undefined,
      radius: "md",
      remove() {},
      variant: "liquid",
      disabled: false,
      multiple: false,
      required: false,
      selectFiles() {},
      setInputElement() {},
    };
    function Same(): React.ReactElement {
      const ctx = useFileUploadContext();
      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <Context value={provided}>
        <Same />
      </Context>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
