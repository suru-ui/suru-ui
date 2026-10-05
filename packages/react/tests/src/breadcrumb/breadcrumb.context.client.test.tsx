import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  BreadcrumbContext,
  useBreadcrumbContext,
} from "../../../src/breadcrumb/root/breadcrumb.root.context.js";
import { BreadcrumbRoot } from "../../../src/breadcrumb/root/breadcrumb.root.jsx";
import { ContextMissingError } from "../../../src/errors.js";

const items = [{ label: "ホーム", href: "/" }, { label: "現在" }] as const;

describe("useBreadcrumbContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided: BreadcrumbContext = { color: "blue", items: [...items], size: "lg" };
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
      <BreadcrumbRoot color="blue" items={[...items]} size="lg">
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
