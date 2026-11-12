import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { FormatNumberRoot } from "./format-number.root.jsx";

describe("FormatNumberRoot", () => {
  test("指定したロケールで小数を書式化する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<FormatNumberRoot value={1234.5} locales="en-US" />);

    // 検証。
    expect(screen.container.textContent).toBe("1,234.5");
  });

  test("要素を描画せずテキストノードだけを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<FormatNumberRoot value={1234.5} locales="en-US" />);

    // 検証。
    expect(screen.container.childElementCount).toBe(0);
    expect(screen.container.textContent).toBe("1,234.5");
  });

  test("通貨を書式化する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      // oxlint-disable-next-line react/style-prop-object -- 数値の書式を指定する独自の style プロパティーです。
      <FormatNumberRoot style="currency" value={1234.5} locales="en-US" currency="USD" />,
    );

    // 検証。
    expect(screen.container.textContent).toBe("$1,234.50");
  });

  test("パーセントを書式化する", async ({ expect }) => {
    // 準備と実行。
    // oxlint-disable-next-line react/style-prop-object -- 数値の書式を指定する独自の style プロパティーです。
    const screen = await render(<FormatNumberRoot style="percent" value={0.25} locales="en-US" />);

    // 検証。
    expect(screen.container.textContent).toBe("25%");
  });

  test("単位を書式化する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      // oxlint-disable-next-line react/style-prop-object -- 数値の書式を指定する独自の style プロパティーです。
      <FormatNumberRoot unit="kilometer" style="unit" value={12} locales="en-US" />,
    );

    // 検証。
    expect(screen.container.textContent).toBe("12 km");
  });

  test("短縮表記で書式化する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FormatNumberRoot value={1_500_000} locales="en-US" notation="compact" />,
    );

    // 検証。
    expect(screen.container.textContent).toBe("1.5M");
  });

  test("位取りの区切りを無効化する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FormatNumberRoot value={1234.5} locales="en-US" useGrouping={false} />,
    );

    // 検証。
    expect(screen.container.textContent).toBe("1234.5");
  });

  test("常に符号を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FormatNumberRoot value={5} locales="en-US" signDisplay="always" />,
    );

    // 検証。
    expect(screen.container.textContent).toBe("+5");
  });

  test("bigint を書式化する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FormatNumberRoot value={12_345_678_901_234_567_890n} locales="en-US" />,
    );

    // 検証。
    expect(screen.container.textContent).toBe("12,345,678,901,234,567,890");
  });

  test("Intl.Locale をロケールに使う", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FormatNumberRoot value={1234.5} locales={new Intl.Locale("en-US")} />,
    );

    // 検証。
    expect(screen.container.textContent).toBe("1,234.5");
  });

  test("値の変更を描画に反映する", async ({ expect }) => {
    // 準備。
    const { rerender, container } = await render(<FormatNumberRoot value={1} locales="en-US" />);

    // 実行。
    await rerender(<FormatNumberRoot value={2} locales="en-US" />);

    // 検証。
    expect(container.textContent).toBe("2");
  });

  test("ロケールの変更を描画に反映する", async ({ expect }) => {
    // 準備。
    const { rerender, container } = await render(
      <FormatNumberRoot value={1234.5} locales="en-US" />,
    );

    // 実行。
    await rerender(<FormatNumberRoot value={1234.5} locales="de-DE" />);

    // 検証。
    expect(container.textContent).toBe("1.234,5");
  });
});
