import { test } from "vitest";
import { Template } from "../src";

test("CSS テキストを組み立てられる", ({ expect }) => {
  const css = (a: TemplateStringsArray, ...p: any[]) => new Template(a, p);

  const template = css`
    height: ${"2rem"};
    font-size: ${(css: any) => css`${css.size === "md" ? 2 : 1}rem`};
  `;

  expect(template.hashString).toMatch(/^[0-9a-z]+$/i);
  expect.soft(template.build({ size: "sm" })).toEqual({
    cssText: `
    height: 2rem;
    font-size: 1rem;
  `,
    paramsHashString: expect.stringMatching(/^[0-9a-z]+$/i),
  });
  expect.soft(template.build({ size: "md" })).toEqual({
    cssText: `
    height: 2rem;
    font-size: 2rem;
  `,
    paramsHashString: expect.stringMatching(/^[0-9a-z]+$/i),
  });
});
