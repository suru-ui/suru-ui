import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { AccordionContent } from "./content/accordion.content.jsx";
import { AccordionHeading } from "./heading/accordion.heading.jsx";
import { AccordionIndicator } from "./indicator/accordion.indicator.jsx";
import { AccordionItem } from "./item/accordion.item.jsx";
import { AccordionRoot } from "./root/accordion.root.jsx";
import { AccordionTrigger } from "./trigger/accordion.trigger.jsx";
import "../../tests/src/_locators.js";

describe("Accordion の状態", () => {
  test("ルートの render と className と style へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AccordionRoot
        size="lg"
        style={(state) => ({ opacity: state.separator ? "0.5" : "1" })}
        radius="none"
        render={(props, state) => (
          <div {...props} data-probe={`${state.size}/${state.radius}/${state.separator}`} />
        )}
        className={(state) => `probe-size_${state.size}`}
        separator
      />,
    );

    // 検証。
    const root = screen.getByClassName("sui_accordion").element();
    expect(root.getAttribute("data-probe")).toBe("lg/none/true");
    expect(root.classList.contains("probe-size_lg")).toBe(true);
    expect(root.style.opacity).toBe("0.5");
  });

  test("項目の render へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AccordionRoot size="lg" radius="none" separator defaultValue={["a"]}>
        <AccordionItem
          value="a"
          render={(props, state) => (
            <div
              {...props}
              data-probe={`${state.size}/${state.radius}/${state.separator}/${String(state.open)}`}
            />
          )}
        >
          <AccordionHeading>
            <AccordionTrigger>項目A</AccordionTrigger>
          </AccordionHeading>
          <AccordionContent>内容A</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_accordion_item").element().getAttribute("data-probe")).toBe(
      "lg/none/true/true",
    );
  });

  test("見出しの render へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AccordionRoot size="lg" radius="none" separator defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionHeading
            render={(props, state) => (
              // oxlint-disable-next-line jsx-a11y/heading-has-content
              <h3 {...props} data-probe={`${state.size}/${String(state.open)}`} />
            )}
          >
            <AccordionTrigger>項目A</AccordionTrigger>
          </AccordionHeading>
          <AccordionContent>内容A</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    // 検証。
    expect(
      screen.getByClassName("sui_accordion_heading").element().getAttribute("data-probe"),
    ).toBe("lg/true");
  });

  test("トリガーの render へスタイル情報とトリガーの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AccordionRoot size="lg" radius="none" separator defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionHeading>
            <AccordionTrigger
              render={(props, state) => (
                <button
                  {...props}
                  data-probe={`${state.size}/${String(state.open)}/${String(state.unstyled)}`}
                />
              )}
              unstyled
            >
              項目A
            </AccordionTrigger>
          </AccordionHeading>
          <AccordionContent>内容A</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    // 検証。
    expect(
      screen.getByClassName("sui_accordion_trigger").element().getAttribute("data-probe"),
    ).toBe("lg/true/true");
  });

  test("インジケーターの render へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AccordionRoot size="lg" radius="none" separator defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionHeading>
            <AccordionTrigger>
              項目A
              <AccordionIndicator
                render={(props, state) => (
                  <span {...props} data-probe={`${state.size}/${String(state.open)}`} />
                )}
              />
            </AccordionTrigger>
          </AccordionHeading>
          <AccordionContent>内容A</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    // 検証。
    expect(
      screen.getByClassName("sui_accordion_indicator").element().getAttribute("data-probe"),
    ).toBe("lg/true");
  });

  test("内容の render へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AccordionRoot size="lg" radius="none" separator defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionHeading>
            <AccordionTrigger>項目A</AccordionTrigger>
          </AccordionHeading>
          <AccordionContent
            render={(props, state) => (
              <div {...props} data-probe={`${state.size}/${state.radius}/${String(state.open)}`} />
            )}
          >
            内容A
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    // 検証。
    expect(
      screen.getByClassName("sui_accordion_content").element().getAttribute("data-probe"),
    ).toBe("lg/none/true");
  });
});
