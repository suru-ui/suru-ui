import { locators, type Locator } from "vitest/browser";

/**
 * クラス名で要素を特定するカスタム Locator です。
 * 見た目だけを持つ要素（ポップアップや区切りなど）の表示検証のために使用します。
 */
locators.extend({
  getByClassName(className: string) {
    return `.${className}`;
  },
});

declare module "vitest/browser" {
  interface LocatorSelectors {
    getByClassName(className: string): Locator;
  }
}
