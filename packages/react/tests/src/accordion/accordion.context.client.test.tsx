import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { AccordionHeading } from "../../../src/accordion/heading/accordion.heading.jsx";
import { AccordionItem } from "../../../src/accordion/item/accordion.item.jsx";
import {
  AccordionContext,
  useAccordionContext,
} from "../../../src/accordion/root/accordion.root.context.js";
import { AccordionRoot } from "../../../src/accordion/root/accordion.root.jsx";
import {
  AccordionTriggerContext,
  useAccordionTriggerContext,
} from "../../../src/accordion/trigger/accordion.trigger.context.js";
import { AccordionTrigger } from "../../../src/accordion/trigger/accordion.trigger.jsx";
import { ContextMissingError } from "../../../src/errors.js";

describe("useAccordionContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided = { radius: "md", separator: true, size: "lg" } as const;
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
      disabled: false,
      hidden: false,
      index: 0,
      open: true,
      orientation: "vertical",
      radius: "md",
      separator: true,
      size: "lg",
      unstyled: true,
      value: ["a"],
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
