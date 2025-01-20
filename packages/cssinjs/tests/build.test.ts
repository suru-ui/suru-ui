import { expect, test } from "vitest";
import { build, compile } from "../src";

test("css テキストを組み立てられる", () => {
  const {
    hash: componentHash,
    template,
    factories,
  } = build(
    ["height:", ";font-size:", ";"] as unknown as TemplateStringsArray,
    [
      "2rem",
      css => css`${css["size" as never] === "md" ? 1 : 2}rem`,
    ],
  );
  const {
    hash: elementHash,
    cssText,
  } = compile(
    {
      size: "md",
    },
    template,
    factories,
  );

  expect.soft(componentHash).toBe("1cuwf12");
  expect.soft(elementHash).toBe("rbv6wr");
  expect.soft(cssText).toBe("height:2rem;font-size:1rem;");
});
