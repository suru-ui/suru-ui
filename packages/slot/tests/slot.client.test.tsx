import { userEvent } from "@vitest/browser/context";
import { beforeEach, describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Slot } from "../src";

describe("Slot に onClick ハンドラが渡されている", () => {
  const handleClick = vi.fn();

  beforeEach(async () => {
    handleClick.mockReset();
    const renderResult = render(
      <Slot onClick={handleClick}>
        <button type="button" />
      </Slot>,
    );
    await userEvent.click(renderResult.getByRole("button"));
    renderResult.unmount();
  });

  test("onClick ハンドラが呼び出される", ({ expect }) => {
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("Slot の子要素に onClick ハンドラが渡されている", () => {
  const handleClick = vi.fn();

  beforeEach(async () => {
    handleClick.mockReset();
    const renderResult = render(
      <Slot>
        <button type="button" onClick={handleClick} />
      </Slot>,
    );
    await userEvent.click(renderResult.getByRole("button"));
    renderResult.unmount();
  });

  test("onClick ハンドラが呼び出される", ({ expect }) => {
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("Slot と子要素の両方に onClick ハンドラが渡されている", () => {
  const slotHandleClick = vi.fn();
  const childHandleClick = vi.fn();

  beforeEach(async () => {
    slotHandleClick.mockReset();
    childHandleClick.mockReset();
    const renderResult = render(
      <Slot onClick={slotHandleClick}>
        <button type="button" onClick={childHandleClick} />
      </Slot>,
    );
    await userEvent.click(renderResult.getByRole("button"));
    renderResult.unmount();
  });

  test("Slot の onClick ハンドラが呼び出される", ({ expect }) => {
    expect(slotHandleClick).toHaveBeenCalledTimes(1);
  });

  test("子要素の onClick ハンドラが呼び出される", ({ expect }) => {
    expect(childHandleClick).toHaveBeenCalledTimes(1);
  });
});

describe("Slot と子要素の両方に /^on[A-Z]/ に一致しないハンドラが渡されている", () => {
  const slotHandleClick = vi.fn();
  const childHandleClick = vi.fn();

  beforeEach(async () => {
    slotHandleClick.mockReset();
    childHandleClick.mockReset();
    const Button: React.FC<{ click: any }> = ({ click }) => (
      <button type="button" onClick={click} />
    );
    const renderResult = render(
      <Slot click={slotHandleClick}>
        <Button click={childHandleClick} />
      </Slot>,
    );
    await userEvent.click(renderResult.getByRole("button"));
    renderResult.unmount();
  });

  test("Slot の onClick ハンドラが呼び出されない", ({ expect }) => {
    expect(slotHandleClick).toHaveBeenCalledTimes(0);
  });

  test("子要素の onClick ハンドラが呼び出される", ({ expect }) => {
    expect(childHandleClick).toHaveBeenCalledTimes(1);
  });
});
