import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Button } from "../../src/buttons/button/index.js";

describe("Button", () => {
  test("ボタン要素をレンダリングする", async () => {
    // 実行
    const screen = await render(<Button>送信</Button>);

    // 検証
    const button = screen.getByRole("button", { name: "送信" });

    await expect.element(button).toHaveClass("sui_button");
    await expect.element(button).toHaveAttribute("type", "button");
    await expect.element(screen.getByText("送信")).toHaveClass("sui_button_content");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Button>送信</Button>);

    // 検証
    const button = screen.getByRole("button");

    await expect.element(button).toHaveClass("sui_button-size_md");
    await expect.element(button).toHaveClass("sui_button-color_grey");
    await expect.element(button).toHaveClass("sui_button-radius_rounded");
    await expect.element(button).toHaveClass("sui_button-variant_solid");
  });

  test("variant・color・size・radius を指定できる", async () => {
    // 実行
    const screen = await render(
      <Button variant="liquid" color="blue" size="lg" radius="full">
        送信
      </Button>,
    );

    // 検証
    const button = screen.getByRole("button");

    await expect.element(button).toHaveClass("sui_button-variant_liquid");
    await expect.element(button).toHaveClass("sui_button-color_blue");
    await expect.element(button).toHaveClass("sui_button-size_lg");
    await expect.element(button).toHaveClass("sui_button-radius_full");
  });

  test("outlined と squared を指定するとクラスが付与される", async () => {
    // 実行
    const screen = await render(
      <Button outlined squared>
        送信
      </Button>,
    );

    // 検証
    const button = screen.getByRole("button");

    await expect.element(button).toHaveClass("sui_button-outlined");
    await expect.element(button).toHaveClass("sui_button-squared");
  });

  test("type と className を指定できる", async () => {
    // 実行
    const screen = await render(
      <Button type="submit" className="my-button">
        送信
      </Button>,
    );

    // 検証
    const button = screen.getByRole("button");

    await expect.element(button).toHaveAttribute("type", "submit");
    await expect.element(button).toHaveClass("my-button");
  });

  test("クリックすると onClick が呼ばれる", async () => {
    // 準備
    let clickCount = 0;

    // 実行
    const screen = await render(<Button onClick={() => clickCount++}>送信</Button>);
    await userEvent.click(screen.getByRole("button"));

    // 検証
    expect(clickCount).toBe(1);
  });

  test("disabled を指定すると無効化される", async () => {
    // 実行
    const screen = await render(<Button disabled>送信</Button>);

    // 検証
    const button = screen.getByRole("button");

    await expect.element(button).toBeDisabled();
    await expect.element(button).toHaveClass("sui_button-disabled");
  });

  test("pending を指定すると無効化され、プログレスバーが表示される", async () => {
    // 実行
    const screen = await render(<Button pending>送信</Button>);

    // 検証
    const button = screen.getByRole("button");

    await expect.element(button).toBeDisabled();
    await expect.element(button).toHaveClass("sui_button-pending");

    const pending = screen.container.querySelector<HTMLElement>(".sui_button_pending");
    await expect.element(pending).toHaveClass("sui_button_pending-enabled");
    await expect.element(pending).toHaveClass("sui_button_pending-overlay");

    const progress = screen.container.querySelector<HTMLElement>(".sui_button_circular_progress");
    await expect.element(progress).toBeInTheDocument();
  });

  test("pending でないときはプログレスバーが表示されない", async () => {
    // 実行
    const screen = await render(<Button>送信</Button>);

    // 検証
    expect(screen.container.querySelector<HTMLElement>(".sui_button_pending")).toBeNull();
    expect(screen.container.querySelector<HTMLElement>(".sui_button_circular_progress")).toBeNull();
  });

  test("pending の defaultVisibility が hidden のときは非保留時も領域を保持する", async () => {
    // 実行
    const screen = await render(
      <Button slotProps={{ pending: { defaultVisibility: "hidden" } }}>送信</Button>,
    );

    // 検証
    const pending = screen.container.querySelector<HTMLElement>(".sui_button_pending");
    await expect.element(pending).toHaveClass("sui_button_pending-visibility_hidden");
  });

  test("percentage で進捗を表示する", async () => {
    // 実行
    const screen = await render(
      <Button pending percentage={75}>
        送信
      </Button>,
    );

    // 検証
    const fill = screen.container.querySelector<HTMLElement>(".sui_button_circular_progress_fill");
    await expect.element(fill).toHaveAttribute("stroke-dashoffset", "25");
  });

  test("indeterminate を指定すると回転アニメーションが有効になる", async () => {
    // 実行
    const screen = await render(
      <Button pending indeterminate>
        送信
      </Button>,
    );

    // 検証
    const rotation = screen.container.querySelector<HTMLElement>(
      ".sui_button_circular_progress_fill_rotation",
    );
    await expect.element(rotation).toBeInTheDocument();
    await expect.element(rotation).toHaveAttribute("repeatCount", "indefinite");
  });

  test("indeterminate でないときは回転アニメーションが無効になる", async () => {
    // 実行
    const screen = await render(
      <Button pending percentage={50}>
        送信
      </Button>,
    );

    // 検証
    expect(
      screen.container.querySelector<HTMLElement>(".sui_button_circular_progress_fill_rotation"),
    ).toBeNull();
  });

  test("slotProps が各パーツに適用される", async () => {
    // 実行
    const screen = await render(
      <Button
        pending
        slotProps={{
          content: { className: "my-content" },
          circularProgress: { className: "my-progress" },
          circularProgressFill: { className: "my-fill" },
          circularProgressTrack: { className: "my-track" },
        }}
      >
        送信
      </Button>,
    );

    // 検証
    await expect.element(screen.getByText("送信")).toHaveClass("my-content");
    const progress = screen.container.querySelector<HTMLElement>(".sui_button_circular_progress");
    await expect.element(progress).toHaveClass("my-progress");
    const fill = screen.container.querySelector<HTMLElement>(".sui_button_circular_progress_fill");
    await expect.element(fill).toHaveClass("my-fill");
    const track = screen.container.querySelector<HTMLElement>(
      ".sui_button_circular_progress_track",
    );
    await expect.element(track).toHaveClass("my-track");
  });
});
