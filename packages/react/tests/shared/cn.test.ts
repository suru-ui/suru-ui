import { describe, test } from "vitest";
import cn from "../../src/shared/cn.js";

describe("静的なクラス名のみを指定した場合", () => {
  test("複数の文字列を渡したとき、スペース区切りで結合された文字列を返す", ({ expect }) => {
    // Arrange
    const class1 = "foo";
    const class2 = "bar";

    // Act
    const result = cn(class1, class2);

    // Assert
    expect(result).toBe("foo bar");
  });

  test("falsy な値が含まれているとき、それらを除外して結合した文字列を返す", ({ expect }) => {
    // Arrange
    const class1 = "foo";
    const class2 = null;
    const class3 = undefined;
    const class4 = false;
    const class5 = 0;
    const class6 = "bar";

    // Act
    const result = cn(class1, class2, class3, class4, class5, class6);

    // Assert
    expect(result).toBe("foo bar");
  });

  test("空の引数を渡したとき、空文字列を返す", ({ expect }) => {
    // Act
    const result = cn();

    // Assert
    expect(result).toBe("");
  });
});

describe("クラス名ファクトリー関数（動的なクラス名）が含まれる場合", () => {
  test("関数を渡したとき、新しいファクトリー関数を返す", ({ expect }) => {
    // Arrange
    const factory = () => "dynamic";

    // Act
    const result = cn(factory);

    // Assert
    expect(typeof result).toBe("function");
  });

  test("返されたファクトリー関数を実行したとき、状態に応じたクラス名が結合される", ({ expect }) => {
    // Arrange
    type State = { active: boolean };
    const staticClass = "static";
    const factory = (state: State) => (state.active ? "is-active" : "is-inactive");

    // Act
    const combinedFactory = cn<State>(staticClass, factory);
    const result = typeof combinedFactory === "function" ? combinedFactory({ active: true }) : "";

    // Assert
    expect(result).toBe("static is-active");
  });

  test("複数のファクトリー関数と文字列が混在するとき、順序を維持して結合される", ({ expect }) => {
    // Arrange
    type State = { theme: "dark" | "light" };
    const factory1 = (state: State) => state.theme;
    const factory2 = () => "constant-dynamic";

    // Act
    const combinedFactory = cn<State>("prefix", factory1, "middle", factory2, "suffix");
    const result = typeof combinedFactory === "function"
      ? combinedFactory({ theme: "dark" })
      : "";

    // Assert
    expect(result).toBe("prefix dark middle constant-dynamic suffix");
  });

  test("ファクトリー関数が undefined を返したとき、その部分は結合結果に含まれない", ({ expect }) => {
    // Arrange
    type State = { hidden: boolean };
    const factory = (state: State) => (state.hidden ? undefined : "visible");

    // Act
    const combinedFactory = cn<State>("box", factory);
    const result = typeof combinedFactory === "function" ? combinedFactory({ hidden: true }) : "";

    // Assert
    expect(result).toBe("box");
  });

  test("すべての結果が空になったとき、undefined を返す", ({ expect }) => {
    // Arrange
    const factory = () => undefined;

    // Act
    const combinedFactory = cn(factory, undefined);
    const result = typeof combinedFactory === "function" ? combinedFactory({}) : "fail";

    // Assert
    expect(result).toBeUndefined();
  });
});
