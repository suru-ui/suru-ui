import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Chip } from "../../src/data-display/chip/index.js";
import * as ChipParts from "../../src/data-display/chip/index.js";

test("既定のスタイルでチップを表示する", async () => {
  // 準備と実行
  const screen = await render(<Chip>新着</Chip>);

  // 検証
  const chip = screen.getByText("新着");
  await expect.element(chip).toHaveClass("sui_chip");
  await expect.element(chip).toHaveClass("sui_chip-size_sm");
  await expect.element(chip).toHaveClass("sui_chip-color_grey");
  await expect.element(chip).toHaveClass("sui_chip-variant_liquid");
  await expect.element(chip).toHaveClass("sui_chip-radius_full");
});

test("スタイルプロパティーを上書きする", async () => {
  // 準備と実行
  const screen = await render(
    <Chip color="red" outlined radius="md" size="lg" variant="solid">
      警告
    </Chip>,
  );

  // 検証
  const chip = screen.getByText("警告");
  await expect.element(chip).toHaveClass("sui_chip-color_red");
  await expect.element(chip).toHaveClass("sui_chip-radius_md");
  await expect.element(chip).toHaveClass("sui_chip-size_lg");
  await expect.element(chip).toHaveClass("sui_chip-variant_solid");
  await expect.element(chip).toHaveClass("sui_chip-outlined");
});

test("Root パーツを直接表示する", async () => {
  // 準備と実行
  const screen = await render(<ChipParts.Root>直接表示</ChipParts.Root>);

  // 検証
  await expect.element(screen.getByText("直接表示")).toHaveClass("sui_chip");
});
