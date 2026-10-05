import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import {
  type PaginationContext,
  PaginationContext as PaginationContextProvider,
  usePaginationContext,
} from "../../../src/pagination/root/pagination.root.context.js";
import { PaginationRoot } from "../../../src/pagination/root/pagination.root.jsx";

describe("usePaginationContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePaginationContext();

      return (
        <span>
          {[ctx.size, ctx.color, ctx.radius, String(ctx.disabled), ctx.page, ctx.totalPages].join(
            ",",
          )}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <PaginationRoot color="blue" defaultPage={3} radius="full" size="lg" totalPages={10}>
        <Probe />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByText("lg,blue,full,false,3,10").query()?.textContent).toBe(
      "lg,blue,full,false,3,10",
    );
  });

  test("既定値を補完する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePaginationContext();

      return (
        <span>
          {[ctx.size, ctx.color, ctx.radius, String(ctx.disabled), ctx.page, ctx.totalPages].join(
            ",",
          )}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <PaginationRoot totalPages={5.9}>
        <Probe />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByText("md,grey,md,false,1,5").query()?.textContent).toBe(
      "md,grey,md,false,1,5",
    );
  });

  test("総ページ数を1以上の整数へ丸める", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePaginationContext();

      return <span>{ctx.totalPages}</span>;
    }

    // 実行
    const screen = await render(
      <PaginationRoot totalPages={0}>
        <Probe />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByText("1").query()?.textContent).toBe("1");
  });

  test("無効状態を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePaginationContext();

      return <span>{String(ctx.disabled)}</span>;
    }

    // 実行
    const screen = await render(
      <PaginationRoot disabled totalPages={5}>
        <Probe />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByText("true").query()?.textContent).toBe("true");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      usePaginationContext();

      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePaginationContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("直接提供した値を返す", async ({ expect }) => {
    // 準備
    const provided: PaginationContext = {
      color: "red",
      disabled: false,
      goToPage: () => undefined,
      page: 2,
      radius: "sm",
      size: "sm",
      totalPages: 5,
    };

    function Probe() {
      const ctx = usePaginationContext();

      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <PaginationContextProvider value={provided}>
        <Probe />
      </PaginationContextProvider>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
