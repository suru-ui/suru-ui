import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { AccordionHeading } from "../heading/accordion.heading.jsx";
import { AccordionItem } from "../item/accordion.item.jsx";
import {
  AccordionTriggerContext,
  useAccordionTriggerContext,
} from "../trigger/accordion.trigger.context.js";
import { AccordionTrigger } from "../trigger/accordion.trigger.jsx";
import { AccordionContext, useAccordionContext } from "./accordion.root.context.js";
import { AccordionRoot } from "./accordion.root.jsx";

describe("useAccordionContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided = { size: "lg", radius: "md", separator: true } as const;
    function Probe() {
      const ctx = useAccordionContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.separator}`}</span>;
    }

    // 実行
    const screen = await render(
      <AccordionContext value={provided}>
        <Probe />
      </AccordionContext>,
    );

    // 検証
    expect(screen.getByText("lg/md/true").query()?.textContent).toBe("lg/md/true");
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAccordionContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.separator}`}</span>;
    }

    // 実行
    const screen = await render(
      <AccordionRoot size="lg" radius="none" separator>
        <Probe />
      </AccordionRoot>,
    );

    // 検証
    expect(screen.getByText("lg/none/true").query()?.textContent).toBe("lg/none/true");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useAccordionContext();

      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAccordionContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});

describe("useAccordionTriggerContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided: AccordionTriggerContext = {
      open: true,
      size: "lg",
      index: 0,
      value: ["a"],
      hidden: false,
      radius: "md",
      disabled: false,
      unstyled: true,
      separator: true,
      orientation: "vertical",
    };
    function Probe() {
      const ctx = useAccordionTriggerContext();

      return (
        <span>{`${ctx.size}/${ctx.radius}/${ctx.separator}/${String(ctx.open)}/${String(ctx.unstyled)}`}</span>
      );
    }

    // 実行
    const screen = await render(
      <AccordionTriggerContext value={provided}>
        <Probe />
      </AccordionTriggerContext>,
    );

    // 検証
    expect(screen.getByText("lg/md/true/true/true").query()?.textContent).toBe(
      "lg/md/true/true/true",
    );
  });

  test("トリガーの状態を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAccordionTriggerContext();

      return (
        <span>{`${ctx.size}/${ctx.radius}/${ctx.separator}/${String(ctx.open)}/${String(ctx.unstyled)}`}</span>
      );
    }

    // 実行
    const screen = await render(
      <AccordionRoot size="lg" radius="none" separator defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionHeading>
            <AccordionTrigger unstyled>
              <Probe />
            </AccordionTrigger>
          </AccordionHeading>
        </AccordionItem>
      </AccordionRoot>,
    );

    // 検証
    expect(screen.getByText("lg/none/true/true/true").query()?.textContent).toBe(
      "lg/none/true/true/true",
    );
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useAccordionTriggerContext();

      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAccordionTriggerContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
