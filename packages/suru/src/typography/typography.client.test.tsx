/// <reference types="@vitest/browser/providers/playwright" />

import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Typography from ".";

test("テキストが表示される", async () => {
  const testId = Math.random().toString(36).slice(2);
  render(<Typography data-testid={testId}>TEXT</Typography>);

  expect(screen.getByTestId(testId)).toHaveTextContent("TEXT");
});
