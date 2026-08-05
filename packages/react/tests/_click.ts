import type { Locator } from "vitest/browser";

export const clickElement = (locator: Locator): void => {
  (locator.element() as HTMLElement).click();
};
