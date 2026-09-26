import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import {
  FileUploadItemContext,
  useFileUploadItemContext,
} from "../../../src/file-upload/file-upload.item.context.js";

const textFile = new File(["hello"], "hello.txt", { type: "text/plain" });

describe("useFileUploadItemContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe(): React.ReactElement {
      const ctx = useFileUploadItemContext();
      return <span>{ctx.file.name}</span>;
    }

    // 実行
    const screen = await render(
      <FileUploadItemContext value={{ file: textFile }}>
        <Probe />
      </FileUploadItemContext>,
    );

    // 検証
    expect(screen.getByText("hello.txt").query()?.textContent).toBe("hello.txt");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe(): null {
      useFileUploadItemContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe(): React.ReactElement {
      const ctx = useFileUploadItemContext(true);
      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
