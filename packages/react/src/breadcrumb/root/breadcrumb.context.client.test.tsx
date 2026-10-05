import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { BreadcrumbContext, useBreadcrumbContext } from "./breadcrumb.root.context.js";
import { BreadcrumbRoot } from "./breadcrumb.root.jsx";

const items = [{ href: "/", label: "ホーム" }, { label: "現在" }] as const;

describe("useBreadcrumbContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided: BreadcrumbContext = { size: "lg", color: "blue", items: [...items] };
    function Probe() {
      const ctx = useBreadcrumbContext();

      return <span>{`${ctx.size}/${ctx.color}/${ctx.items.length}`}</span>;
    }

    // 実行
    const screen = await render(
      <BreadcrumbContext value={provided}>
        <Probe />
      </BreadcrumbContext>,
    );

    // 検証
    expect(screen.getByText("lg/blue/2").query()?.textContent).toBe("lg/blue/2");
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useBreadcrumbContext();

      return <span>{`${ctx.size}/${ctx.color}/${ctx.items.length}`}</span>;
    }

    // 実行
    const screen = await render(
      <BreadcrumbRoot size="lg" color="blue" items={[...items]}>
        <Probe />
      </BreadcrumbRoot>,
    );

    // 検証
    expect(screen.getByText("lg/blue/2").query()?.textContent).toBe("lg/blue/2");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useBreadcrumbContext();

      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useBreadcrumbContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
