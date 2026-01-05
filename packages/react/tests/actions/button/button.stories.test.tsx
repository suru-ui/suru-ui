import { HEIGHT_LIST } from "@suru-ui/theme";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import * as stories from "../../../stories/actions/button.stories.jsx";

const {
  Usage,
  Sizing,
} = stories;

describe("使い方", () => {
  test("見える状態にある", async ({ expect }) => {
    const { locator } = await render(<Usage.Component />);
    const button = locator.getByRole("button", { name: "ボタン" });

    expect(button).toBeVisible();
  });

  test("クリックで onClick イベントが発生する", async ({ expect }) => {
    const handleClick = vi.fn();
    const { locator } = await render(<Usage.Component onClick={handleClick} />);
    const button = locator.getByRole("button", { name: "ボタン" });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });
});

describe("大きさ", () => {
  test("見える状態にある", async ({ expect }) => {
    const { locator } = await render(<Sizing.Component />);
    const buttons = locator.getByRole("button", { name: "ボタン" }).all();

    expect(buttons).toHaveLength(HEIGHT_LIST.length);

    for (const button of buttons) {
      expect(button).toBeVisible();
    }
  });

  test("クリックで onClick イベントが発生する", async ({ expect }) => {
    const handleClick = vi.fn();
    const { locator } = await render(<Sizing.Component onClick={handleClick} />);
    const buttons = locator.getByRole("button", { name: "ボタン" }).all();

    for (const button of buttons) {
      handleClick.mockReset();
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledOnce();
    }
  });
});
