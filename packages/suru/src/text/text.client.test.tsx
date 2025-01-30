/// <reference types="@vitest/browser/providers/playwright" />

import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Text from ".";

test("テキストが表示される", async () => {
  render(<Text data-testid="text">TEXT</Text>);

  expect(screen.getByTestId("text")).toHaveTextContent("TEXT");
});
