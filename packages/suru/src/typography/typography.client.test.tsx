/// <reference types="@vitest/browser/providers/playwright" />

import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import * as Typography from ".";

test("Typography", async () => {
  const testId = Math.random().toString(36).slice(2);
  render(<Typography.Root data-testid={testId}>TEXT</Typography.Root>);

  expect(screen.getByTestId(testId)).toHaveTextContent("TEXT");
});
