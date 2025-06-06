import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import useControlledState from "./../../src/utils/use-controlled-state";

describe("use-controlled-state", () => {
  describe("制御モード", () => {
    test("controlledValue を返し、状態更新時に onChange を呼び出す。", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControlledState({ controlledValue: "test", initialValue: "initial", onChange })
      );

      const [value, setValue] = result.current;

      // 制御されているので controlledValue が返される。
      expect(value).toBe("test");

      // 状態を更新する。
      act(() => {
        setValue("new value");
      });

      // onChange が新しい値で呼び出される。
      expect(onChange).toHaveBeenCalledWith("new value");
    });

    test("controlledValue が提供されている場合、内部状態を更新しない。", () => {
      const onChange = vi.fn();
      const { result, rerender } = renderHook(
        ({ controlledValue }) =>
          useControlledState({ controlledValue, initialValue: "initial", onChange }),
        { initialProps: { controlledValue: "first" } },
      );

      // 最初の値を確認する。
      expect(result.current[0]).toBe("first");

      // 新しい値で状態を更新しようとする。
      act(() => {
        const [, setValue] = result.current;
        setValue("updated");
      });

      // onChange は呼ばれるが、内部状態は変わらない。
      expect(onChange).toHaveBeenCalledWith("updated");
      expect(result.current[0]).toBe("first"); // 依然として最初の props の値

      // props 経由で値を更新する。
      rerender({ controlledValue: "second" });

      // 値が更新されたことを確認する。
      expect(result.current[0]).toBe("second");
    });
  });

  describe("非制御モード", () => {
    test("initialValue を返し、内部で状態を更新できる。", () => {
      const { result } = renderHook(() => useControlledState({ initialValue: "initial" }));

      const [value, setValue] = result.current;

      // 初期値が返される。
      expect(value).toBe("initial");

      // 状態を更新。
      act(() => {
        setValue("new value");
      });

      // 値が更新される。
      expect(result.current[0]).toBe("new value");
    });

    test("状態更新時に onChange コールバックを呼び出す。", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControlledState({ initialValue: "initial", onChange })
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("new value");
      });

      // onChange が呼び出されたことを確認する。
      expect(onChange).toHaveBeenCalledWith("new value");
    });
  });

  describe("エラーシナリオ", () => {
    test("制御モードから非制御モードへの切り替えでエラーを投げる。", () => {
      const { rerender } = renderHook(
        ({ controlledValue }) => useControlledState({ controlledValue, initialValue: "initial" }),
        { initialProps: { controlledValue: "test" } },
      );

      // rerenderでエラーがスローされることを確認
      // @ts-expect-error
      expect(() => rerender({ controlledValue: undefined })).toThrow(
        "suru-ui(core): 制御された状態から制御されていない状態に変更することはできません。",
      );
    });

    test("非制御モードから制御モードへの切り替えでエラーを投げる。", () => {
      const { rerender } = renderHook(
        ({ controlledValue }) => useControlledState({ controlledValue, initialValue: "initial" }),
        { initialProps: { controlledValue: undefined } },
      );

      // rerenderでエラーがスローされることを確認
      // @ts-expect-error
      expect(() => rerender({ controlledValue: "test" })).toThrow(
        "suru-ui(core): 制御されていない状態から制御された状態に変更することはできません。",
      );
    });
  });
});
