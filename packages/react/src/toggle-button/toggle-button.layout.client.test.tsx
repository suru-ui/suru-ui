import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./toggle-button.parts.js";
import { ButtonRoot } from "../button/root/button.root.jsx";
import { ToggleButtonCircularProgressFillRotation } from "./circular-progress-fill-rotation/toggle-button.circular-progress-fill-rotation.jsx";
import { ToggleButtonCircularProgressFill } from "./circular-progress-fill/toggle-button.circular-progress-fill.jsx";
import { ToggleButtonCircularProgressTrack } from "./circular-progress-track/toggle-button.circular-progress-track.jsx";
import { ToggleButtonCircularProgress } from "./circular-progress/toggle-button.circular-progress.jsx";
import { ToggleButtonContent } from "./content/toggle-button.content.jsx";
import { ToggleButtonPending } from "./pending/toggle-button.pending.jsx";
import "../../tests/src/_locators.js";
import { ToggleButtonRoot } from "./root/toggle-button.root.jsx";

describe("ToggleButtonRoot の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ToggleButtonRoot pending>
        <ToggleButtonContent>切り替え</ToggleButtonContent>
        <ToggleButtonPending>
          <ToggleButtonCircularProgress>
            <ToggleButtonCircularProgressTrack />
            <ToggleButtonCircularProgressFill>
              <ToggleButtonCircularProgressFillRotation />
            </ToggleButtonCircularProgressFill>
          </ToggleButtonCircularProgress>
        </ToggleButtonPending>
      </ToggleButtonRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_button_content").query()).not.toBe(null);
    expect(screen.getByClassName("sui_button_pending").query()).not.toBe(null);
    expect(screen.getByClassName("sui_button_circular_progress").query()).not.toBe(null);
    expect(screen.getByClassName("sui_button_circular_progress_track").query()).not.toBe(null);
    expect(screen.getByClassName("sui_button_circular_progress_fill").query()).not.toBe(null);
    expect(screen.getByClassName("sui_button_circular_progress_fill_rotation").query()).not.toBe(
      null,
    );

    for (const element of screen.container.querySelectorAll<HTMLElement>(".sui_button *")) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginInlineStart).toBe("0px");
    }
  });

  test("大きさに応じた最小の高さを持つ", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          style={{
            height: "var(--sui-size-xs)",
            display: "block",
          }}
          data-testid="xs-reference"
        />
        <span
          style={{
            height: "var(--sui-size-sm)",
            display: "block",
          }}
          data-testid="sm-reference"
        />
        <span
          style={{
            height: "var(--sui-size-md)",
            display: "block",
          }}
          data-testid="md-reference"
        />
        <span
          style={{
            height: "var(--sui-size-lg)",
            display: "block",
          }}
          data-testid="lg-reference"
        />
        <ToggleButtonRoot size="xs" data-testid="xs" />
        <ToggleButtonRoot size="sm" data-testid="sm" />
        <ToggleButtonRoot size="md" data-testid="md" />
        <ToggleButtonRoot size="lg" data-testid="lg" />
      </>,
    );

    // 検証。
    for (const size of ["xs", "sm", "md", "lg"] as const) {
      const height = screen.getByTestId(size).element().getBoundingClientRect().height;
      const reference = screen
        .getByTestId(`${size}-reference`)
        .element()
        .getBoundingClientRect().height;
      expect(height).toBeCloseTo(reference, 1);
    }
  });

  test("正方形では幅と高さを揃える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ToggleButtonRoot squared />);

    // 検証。
    const { width, height } = screen.getByClassName("sui_button").element().getBoundingClientRect();
    expect(width).toBeCloseTo(height, 1);
  });

  test("角丸 full は高さの半分にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ToggleButtonRoot radius="full" />);

    // 検証。
    const button = screen.getByClassName("sui_button").element();
    expect(Number.parseFloat(getComputedStyle(button).borderTopLeftRadius)).toBeCloseTo(
      button.getBoundingClientRect().height / 2,
      1,
    );
  });

  test("内容を中央に配置する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ToggleButtonRoot>
        <ToggleButtonContent>
          <span>切り替え</span>
        </ToggleButtonContent>
      </ToggleButtonRoot>,
    );

    // 検証。
    const root = screen.getByClassName("sui_button").element();
    const rootStyle = getComputedStyle(root);
    expect(rootStyle.display).toBe("inline-flex");
    expect(rootStyle.alignItems).toBe("center");
    expect(rootStyle.justifyContent).toBe("center");

    const content = screen.getByClassName("sui_button_content").element();
    const contentRect = content.getBoundingClientRect();
    const textRect = screen.getByText("切り替え").element().getBoundingClientRect();
    expect(textRect.left + textRect.width / 2).toBeCloseTo(
      contentRect.left + contentRect.width / 2,
      1,
    );
    expect(textRect.top + textRect.height / 2).toBeCloseTo(
      contentRect.top + contentRect.height / 2,
      1,
    );
  });

  test("Button と同じ余白と行の高さを持つ", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ButtonRoot size="md" data-testid="button">
          <span>切り替え</span>
        </ButtonRoot>
        <ToggleButtonRoot size="md" data-testid="toggle">
          <span>切り替え</span>
        </ToggleButtonRoot>
      </>,
    );

    // 検証。
    const button = getComputedStyle(screen.getByTestId("button").element());
    const toggle = getComputedStyle(screen.getByTestId("toggle").element());
    expect(toggle.paddingInlineStart).toBe(button.paddingInlineStart);
    expect(toggle.paddingInlineEnd).toBe(button.paddingInlineEnd);
    expect(toggle.minHeight).toBe(button.minHeight);
    expect(toggle.gap).toBe(button.gap);
    expect(toggle.fontSize).toBe(button.fontSize);
    expect(toggle.lineHeight).toBe(button.lineHeight);
  });

  test("保留中はオーバーレイで内容を隠す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ToggleButtonRoot pending>
        <ToggleButtonContent>切り替え</ToggleButtonContent>
        <ToggleButtonPending overlay>
          <ToggleButtonCircularProgress>
            <ToggleButtonCircularProgressTrack />
            <ToggleButtonCircularProgressFill />
          </ToggleButtonCircularProgress>
        </ToggleButtonPending>
      </ToggleButtonRoot>,
    );

    // 検証。
    const root = screen.getByClassName("sui_button").element();
    const content = screen.getByClassName("sui_button_content").element();
    expect(getComputedStyle(content).visibility).toBe("hidden");

    const pending = screen.getByClassName("sui_button_pending").element();
    expect(getComputedStyle(pending).position).toBe("absolute");

    const rootRect = root.getBoundingClientRect();
    const progressRect = screen
      .getByClassName("sui_button_circular_progress")
      .element()
      .getBoundingClientRect();
    expect(progressRect.left + progressRect.width / 2).toBeCloseTo(
      rootRect.left + rootRect.width / 2,
      1,
    );
    expect(progressRect.top + progressRect.height / 2).toBeCloseTo(
      rootRect.top + rootRect.height / 2,
      1,
    );
  });

  test("枠線を表示しても高さを変えない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ToggleButtonRoot data-testid="plain" />
        <ToggleButtonRoot outlined data-testid="outlined" />
      </>,
    );

    // 検証。
    expect(screen.getByTestId("outlined").element().getBoundingClientRect().height).toBeCloseTo(
      screen.getByTestId("plain").element().getBoundingClientRect().height,
      1,
    );
  });

  test("outlined では枠線を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ToggleButtonRoot outlined />);

    // 検証。
    const style = getComputedStyle(screen.getByClassName("sui_button").element());
    expect(style.borderTopStyle).toBe("solid");
    expect(Number.parseFloat(style.borderTopWidth)).toBeGreaterThan(0);
  });

  test("通常のトグルボタンはフォーカス時に焦点リングを表示する", async ({ expect }) => {
    // 準備。
    const screen = await render(<ToggleButtonRoot>切り替え</ToggleButtonRoot>);
    const button = screen.getByClassName("sui_button").element();

    // 実行。
    button.focus({ focusVisible: true });

    // 検証。
    expect(button.classList.contains("sui_button-item")).toBe(false);

    const style = getComputedStyle(button);
    expect(Number.parseFloat(style.outlineWidth)).toBeGreaterThan(0);
  });

  test("押下状態でないときは grey の liquid 配色を背景へ適用する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-grey-liquid-canvas-normal)" }}>基準</span>
        <ToggleButtonRoot>切り替え</ToggleButtonRoot>
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByText("基準").element()).backgroundColor;
    const button = getComputedStyle(screen.getByClassName("sui_button").element());
    expect(button.backgroundColor).toBe(expected);
  });

  test("押下状態では solid の配色を背景と文字へ適用する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          style={{
            color: "var(--sui-blue-solid-canvas_text-normal)",
            backgroundColor: "var(--sui-blue-solid-canvas-normal)",
          }}
        >
          基準
        </span>
        <ToggleButtonRoot color="blue" defaultPressed>
          切り替え
        </ToggleButtonRoot>
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByText("基準").element());
    const button = getComputedStyle(screen.getByClassName("sui_button").element());
    expect(button.color).toBe(expected.color);
    expect(button.backgroundColor).toBe(expected.backgroundColor);
  });
});
