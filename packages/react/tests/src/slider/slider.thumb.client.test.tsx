import "@suru-ui/theme/suru.css";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "../../../src/slider/slider.parts.js";
import { SliderControl } from "../../../src/slider/slider.control.jsx";
import { type SliderRootChangeEventDetails, SliderRoot } from "../../../src/slider/slider.root.jsx";
import { SliderThumb } from "../../../src/slider/slider.thumb.jsx";
import { SliderTrack } from "../../../src/slider/slider.track.jsx";
import "../_locators.js";

describe("SliderThumb", () => {
  test("つまみと範囲の入力欄を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    const thumb = screen.getByClassName("sui_slider_thumb").element();
    expect(thumb.tagName).toBe("DIV");
    expect(thumb.classList.contains("sui_slider_thumb")).toBe(true);
    const slider = screen.getByRole("slider").element();
    expect(slider.getAttribute("aria-valuenow")).toBe("25");
    expect(slider.getAttribute("type")).toBe("range");
  });

  test("矢印キーで値を増減する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25} min={0} max={100}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );
    const slider = screen.getByRole("slider").element();
    await screen.getByClassName("sui_slider_thumb").click();
    await vi.waitFor(() => {
      expect(document.activeElement).toBe(slider);
    });
    await userEvent.keyboard("{ArrowRight}");

    // 検証
    expect(slider.getAttribute("aria-valuenow")).toBe("26");

    // 実行
    await userEvent.keyboard("{ArrowLeft}");

    // 検証
    expect(slider.getAttribute("aria-valuenow")).toBe("25");
  });

  test("端のキーで最小値と最大値へ動かす", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25} min={0} max={100}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );
    const slider = screen.getByRole("slider").element();
    await screen.getByClassName("sui_slider_thumb").click();
    await vi.waitFor(() => {
      expect(document.activeElement).toBe(slider);
    });

    // 検証
    await userEvent.keyboard("{End}");
    expect(slider.getAttribute("aria-valuenow")).toBe("100");

    // 実行
    await userEvent.keyboard("{Home}");

    // 検証
    expect(slider.getAttribute("aria-valuenow")).toBe("0");
  });

  test("キーボード操作の理由を変更イベントへ渡す", async ({ expect }) => {
    // 準備
    const onValueChange =
      vi.fn<(value: number, eventDetails: SliderRootChangeEventDetails) => void>();
    const screen = await render(
      <SliderRoot defaultValue={25} onValueChange={onValueChange}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 実行
    const slider = screen.getByRole("slider").element();
    await screen.getByClassName("sui_slider_thumb").click();
    await vi.waitFor(() => {
      expect(document.activeElement).toBe(slider);
    });
    await userEvent.keyboard("{ArrowUp}");

    // 検証
    expect(onValueChange).toHaveBeenCalledWith(26, expect.objectContaining({ reason: "keyboard" }));
  });

  test("複数のつまみに添字を割り当てる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={[25, 75]}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb index={0} />
            <SliderThumb index={1} />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    const values = screen
      .getByRole("slider")
      .elements()
      .map((element) => element.getAttribute("aria-valuenow"));
    expect(values).toStrictEqual(["25", "75"]);
  });

  test("範囲外の値を範囲に収める", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={120} min={0} max={100}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByRole("slider").element().getAttribute("aria-valuenow")).toBe("100");
  });

  test("読み上げテキストを指定する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb aria-valuetext="25 デシベル" />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByRole("slider").element().getAttribute("aria-valuetext")).toBe("25 デシベル");
  });

  test("無効では操作できない状態にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb disabled />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByRole("slider").element().matches(":disabled")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb className="custom" />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    const thumb = screen.getByClassName("sui_slider_thumb").element();
    expect(thumb.classList.contains("custom")).toBe(true);
    expect(thumb.classList.contains("sui_slider_thumb")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb render={<span />} />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_slider_thumb").element().tagName).toBe("SPAN");
  });
});
