import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./button.parts.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";
import { ButtonCircularProgressFillRotation } from "./circular-progress-fill-rotation/button.circular-progress-fill-rotation.jsx";
import { ButtonCircularProgressFill } from "./circular-progress-fill/button.circular-progress-fill.jsx";
import { ButtonCircularProgressTrack } from "./circular-progress-track/button.circular-progress-track.jsx";
import { ButtonCircularProgress } from "./circular-progress/button.circular-progress.jsx";
import { ButtonContent } from "./content/button.content.jsx";
import { ButtonPending } from "./pending/button.pending.jsx";
import "../../tests/src/_locators.js";
import { ButtonRoot } from "./root/button.root.jsx";

describe("ButtonRoot の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ButtonRoot pending>
        <ButtonContent>送信</ButtonContent>
        <ButtonPending>
          <ButtonCircularProgress>
            <ButtonCircularProgressTrack />
            <ButtonCircularProgressFill>
              <ButtonCircularProgressFillRotation />
            </ButtonCircularProgressFill>
          </ButtonCircularProgress>
        </ButtonPending>
      </ButtonRoot>,
    );

    // 検証
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
    // 準備と実行
    const screen = await render(
      <>
        <ButtonRoot id="xs" size="xs" />
        <ButtonRoot id="sm" size="sm" />
        <ButtonRoot id="md" size="md" />
        <ButtonRoot id="lg" size="lg" />
      </>,
    );

    // 検証
    expect(getComputedStyle(screen.container.querySelector("#xs")!).minHeight).toBe("22px");
    expect(getComputedStyle(screen.container.querySelector("#sm")!).minHeight).toBe("26px");
    expect(getComputedStyle(screen.container.querySelector("#md")!).minHeight).toBe("32px");
    expect(getComputedStyle(screen.container.querySelector("#lg")!).minHeight).toBe("36px");
  });

  test("正方形では幅と高さを揃える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot squared />);

    // 検証
    const { width, height } = screen.getByClassName("sui_button").element().getBoundingClientRect();
    expect(width).toBeCloseTo(32, 1);
    expect(height).toBeCloseTo(32, 1);
  });

  test("角丸 full は高さの半分にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot radius="full" />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_button").element());
    expect(style.borderTopLeftRadius).toBe("16px");
  });

  test("内容を中央に配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ButtonRoot>
        <ButtonContent>
          <span>送信</span>
        </ButtonContent>
      </ButtonRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_button").element();
    const rootStyle = getComputedStyle(root);
    expect(rootStyle.display).toBe("inline-flex");
    expect(rootStyle.alignItems).toBe("center");
    expect(rootStyle.justifyContent).toBe("center");
    const content = screen.getByClassName("sui_button_content").element();
    const contentStyle = getComputedStyle(content);
    expect(contentStyle.display).toBe("flex");
    expect(contentStyle.alignItems).toBe("center");
    const contentRect = content.getBoundingClientRect();
    const textRect = screen.getByText("送信").element().getBoundingClientRect();
    expect(textRect.left + textRect.width / 2).toBeCloseTo(
      contentRect.left + contentRect.width / 2,
      1,
    );
    expect(textRect.top + textRect.height / 2).toBeCloseTo(
      contentRect.top + contentRect.height / 2,
      1,
    );
  });

  test("item では内容を両端に配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ButtonRoot item style={{ width: "200px" }}>
        <span>項目</span>
        <span>✓</span>
      </ButtonRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_button").element();
    const style = getComputedStyle(root);
    const paddingStart = Number.parseFloat(style.paddingInlineStart);
    const paddingEnd = Number.parseFloat(style.paddingInlineEnd);
    const button = root.getBoundingClientRect();
    const first = screen.getByText("項目").element().getBoundingClientRect();
    const last = screen.getByText("✓").element().getBoundingClientRect();
    expect(first.left).toBeCloseTo(button.left + paddingStart, 0);
    expect(last.right).toBeCloseTo(button.right - paddingEnd, 0);
  });

  test("保留中はオーバーレイで内容を隠す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ButtonRoot pending>
        <ButtonContent>送信</ButtonContent>
        <ButtonPending overlay>
          <ButtonCircularProgress>
            <ButtonCircularProgressTrack />
            <ButtonCircularProgressFill />
          </ButtonCircularProgress>
        </ButtonPending>
      </ButtonRoot>,
    );

    // 検証
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
    // 準備と実行
    const screen = await render(
      <>
        <ButtonRoot id="plain" />
        <ButtonRoot id="outlined" outlined />
      </>,
    );

    // 検証
    const plain = screen.container.querySelector<HTMLElement>("#plain")!;
    const outlined = screen.container.querySelector<HTMLElement>("#outlined")!;
    expect(outlined.getBoundingClientRect().height).toBeCloseTo(
      plain.getBoundingClientRect().height,
      1,
    );
  });

  test.skipIf(!supportsCustomFunctions())("outlined では枠線を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot outlined />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_button").element());
    expect(style.borderTopStyle).toBe("solid");
    expect(Number.parseFloat(style.borderTopWidth)).toBeGreaterThan(0);
  });

  test("通常のボタンはフォーカス時に焦点リングを表示する", async ({ expect }) => {
    // 準備
    const screen = await render(<ButtonRoot>実行</ButtonRoot>);
    const button = screen.getByClassName("sui_button").element();

    // 実行
    button.focus({ focusVisible: true });

    // 検証
    const style = getComputedStyle(button);
    expect(Number.parseFloat(style.outlineWidth)).toBeGreaterThan(0);
  });

  test("リストアイテムはハイライト中は焦点リングを表示しない", async ({ expect }) => {
    // 準備
    const screen = await render(
      <ButtonRoot item className="sui_menu_item-highlighted">
        項目
      </ButtonRoot>,
    );
    const button = screen.getByClassName("sui_button").element();

    // 実行
    button.focus({ focusVisible: true });

    // 検証
    const style = getComputedStyle(button);
    expect(style.outlineWidth).toBe("0px");
  });

  test("配色を背景と文字へ適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          style={{
            color: "var(--sui-blue-solid-canvas_text-normal)",
            backgroundColor: "var(--sui-blue-solid-canvas-normal)",
          }}
        >
          色の基準
        </span>
        <ButtonRoot color="blue" variant="solid">
          送信
        </ButtonRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("色の基準").element());
    const button = getComputedStyle(screen.getByClassName("sui_button").element());
    expect(button.color).toBe(expected.color);
    expect(button.backgroundColor).toBe(expected.backgroundColor);
  });
});
