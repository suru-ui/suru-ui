import { afterEach, describe, expect, test } from "vitest";

import "../src/source.css";
import "../src/tokens.suru.light.css";

const TOKENS_CLASS = "layer__sui_tokens";

function createTokensElement(): HTMLElement {
  const element = document.createElement("div");
  element.className = TOKENS_CLASS;
  document.body.append(element);
  return element;
}

function getTokenValue(element: HTMLElement, name: string): string {
  return getComputedStyle(element).getPropertyValue(name).trim().toLowerCase();
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("ライトテーマのトークン", () => {
  test("テーマ名を提供する", () => {
    // 準備
    const element = createTokensElement();

    // 検証
    expect(getTokenValue(element, "--sui-scheme")).toBe("light");
  });

  test("キャンバスの色を提供する", () => {
    // 準備
    const element = createTokensElement();

    // 検証
    expect(getTokenValue(element, "--sui-canvas-1")).toBe("#fffcf0");
    expect(getTokenValue(element, "--sui-canvas-2")).toBe("#f2f0e5");
  });

  test("色トークンと var() の連鎖を解決する", () => {
    // 準備
    const element = createTokensElement();

    // 検証
    expect(getTokenValue(element, "--sui-blue-60")).toBe("#205ea6");
    expect(getTokenValue(element, "--sui-blue-solid-canvas-normal")).toBe("#205ea6");
    expect(getTokenValue(element, "--sui-blue-naked-canvas-normal")).toBe("transparent");
  });

  test("サイズ・角丸・フォーカスリングのトークンを提供する", () => {
    // 準備
    const element = createTokensElement();

    // 検証
    expect(getTokenValue(element, "--sui-size-xs")).toBe("22px");
    expect(getTokenValue(element, "--sui-size-md")).toBe("32px");
    expect(getTokenValue(element, "--sui-corner_radius-base")).toBe("4px");
    expect(getTokenValue(element, "--sui-focusring_color")).toBe(
      "color-mix(in oklab, #d0a215 65%, transparent)",
    );
  });
});
