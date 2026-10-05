import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { FormatNumberRoot } from "../../../src/format-number/root/format-number.root.jsx";

describe("FormatNumberRoot", () => {
  test("指定したロケールで小数を書式化する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FormatNumberRoot locales="en-US" value={1234.5} />);

    // 検証
    expect(screen.container.textContent).toBe("1,234.5");
  });

  test("要素を描画せずテキストノードだけを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FormatNumberRoot locales="en-US" value={1234.5} />);

    // 検証
    expect(screen.container.childElementCount).toBe(0);
    expect(screen.container.textContent).toBe("1,234.5");
  });

  test("通貨を書式化する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FormatNumberRoot currency="USD" locales="en-US" style="currency" value={1234.5} />,
    );

    // 検証
    expect(screen.container.textContent).toBe("$1,234.50");
  });

  test("パーセントを書式化する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FormatNumberRoot locales="en-US" style="percent" value={0.25} />);

    // 検証
    expect(screen.container.textContent).toBe("25%");
  });

  test("単位を書式化する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FormatNumberRoot locales="en-US" style="unit" unit="kilometer" value={12} />,
    );

    // 検証
    expect(screen.container.textContent).toBe("12 km");
  });

  test("短縮表記で書式化する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FormatNumberRoot locales="en-US" notation="compact" value={1500000} />,
    );

    // 検証
    expect(screen.container.textContent).toBe("1.5M");
  });

  test("位取りの区切りを無効化する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FormatNumberRoot locales="en-US" useGrouping={false} value={1234.5} />,
    );

    // 検証
    expect(screen.container.textContent).toBe("1234.5");
  });

  test("常に符号を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FormatNumberRoot locales="en-US" signDisplay="always" value={5} />,
    );

    // 検証
    expect(screen.container.textContent).toBe("+5");
  });

  test("bigint を書式化する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FormatNumberRoot locales="en-US" value={12345678901234567890n} />);

    // 検証
    expect(screen.container.textContent).toBe("12,345,678,901,234,567,890");
  });

  test("Intl.Locale をロケールに使う", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FormatNumberRoot locales={new Intl.Locale("en-US")} value={1234.5} />,
    );

    // 検証
    expect(screen.container.textContent).toBe("1,234.5");
  });

  test("値の変更を描画に反映する", async ({ expect }) => {
    // 準備
    const { container, rerender } = await render(<FormatNumberRoot locales="en-US" value={1} />);

    // 実行
    await rerender(<FormatNumberRoot locales="en-US" value={2} />);

    // 検証
    expect(container.textContent).toBe("2");
  });

  test("ロケールの変更を描画に反映する", async ({ expect }) => {
    // 準備
    const { container, rerender } = await render(
      <FormatNumberRoot locales="en-US" value={1234.5} />,
    );

    // 実行
    await rerender(<FormatNumberRoot locales="de-DE" value={1234.5} />);

    // 検証
    expect(container.textContent).toBe("1.234,5");
  });
});
