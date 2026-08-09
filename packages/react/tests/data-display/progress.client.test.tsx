import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Progress } from "../../src/data-display/progress/index.js";

describe("Progress", () => {
  test("進捗をレンダリングする", async () => {
    // 実行
    const screen = await render(<Progress value={24} />);

    // 検証
    const progress = screen.getByRole("progressbar");

    await expect.element(progress).toHaveAttribute("aria-valuenow", "24");
    await expect.element(progress).toHaveAttribute("aria-valuemin", "0");
    await expect.element(progress).toHaveAttribute("aria-valuemax", "100");
    await expect.element(progress).toHaveAttribute("data-progressing", "");
    await expect.element(progress).toHaveClass("sui_progress");
    await expect.element(progress).toHaveClass("sui_progress-size_md");
    await expect.element(progress).toHaveClass("sui_progress-color_grey");
    await expect.element(progress).toHaveClass("sui_progress-radius_full");
    await expect.element(progress).toHaveClass("sui_progress-variant_liquid");
  });

  test("value が null の場合は不確定状態になる", async () => {
    // 実行
    const screen = await render(<Progress value={null} />);

    // 検証
    const progress = screen.getByRole("progressbar");

    await expect.element(progress).not.toHaveAttribute("aria-valuenow");
    await expect.element(progress).toHaveAttribute("data-indeterminate", "");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_progress_track"))
      .toHaveAttribute("data-indeterminate", "");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_progress_indicator"))
      .toHaveAttribute("data-indeterminate", "");
  });

  test("max と同じ値の場合は完了状態になる", async () => {
    // 実行
    const screen = await render(<Progress value={100} />);

    // 検証
    await expect.element(screen.getByRole("progressbar")).toHaveAttribute("data-complete", "");
  });

  test("size・color・variant・radius・outlined のクラスを適用する", async () => {
    // 実行
    const screen = await render(
      <Progress
        value={50}
        size="lg"
        color="red"
        variant="naked"
        radius="rounded"
        outlined={true}
      />,
    );

    // 検証
    const progress = screen.getByRole("progressbar");

    await expect.element(progress).toHaveClass("sui_progress-size_lg");
    await expect.element(progress).toHaveClass("sui_progress-color_red");
    await expect.element(progress).toHaveClass("sui_progress-variant_naked");
    await expect.element(progress).toHaveClass("sui_progress-radius_rounded");
    await expect.element(progress).toHaveClass("sui_progress-outlined");
  });

  test("Indicator に現在値の割合を反映する", async () => {
    // 実行
    const screen = await render(<Progress value={24} />);

    // 検証
    const indicator = screen.container.querySelector<HTMLElement>(".sui_progress_indicator");

    await expect.element(indicator).toHaveStyle({ width: "24%" });
  });

  test("slotProps でラベル、現在値、Track、Indicator を設定する", async () => {
    // 実行
    const screen = await render(
      <Progress
        value={24}
        slotProps={{
          label: { children: "データを書き出しています", className: "custom-label" },
          value: { className: "custom-value" },
          track: { className: "custom-track" },
          indicator: { className: "custom-indicator" },
        }}
      />,
    );

    // 検証
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_progress_label"))
      .toHaveClass("custom-label");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_progress_value"))
      .toHaveTextContent("24%");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_progress_value"))
      .toHaveClass("custom-value");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_progress_track"))
      .toHaveClass("custom-track");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_progress_indicator"))
      .toHaveClass("custom-indicator");
  });
});
