import { describe, expect, it } from "vitest";

import { sortCssVariables } from "../../scripts/sort-css-variables.js";

describe("sortCssVariables", () => {
  it("CSS プロパティーを stylelint の並び順に従って並べ替える", () => {
    const source = `.sui_button {
  --sui_button-border_radius: ;
  --sui_button-color: ;
  --sui_button-padding_inline: ;
  --sui_button-background: ;
}
`;
    const expected = `.sui_button {
  --sui_button-padding_inline: ;
  --sui_button-color: ;
  --sui_button-background: ;
  --sui_button-border_radius: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  it("アンダースコア区切りのプロパティー (`border_radius`) を判定する", () => {
    const source = `.sui_button {
  --sui_button-border_radius: ;
  --sui_button-border_color: ;
  --sui_button-background_color: ;
}
`;
    const expected = `.sui_button {
  --sui_button-background_color: ;
  --sui_button-border_color: ;
  --sui_button-border_radius: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  it("`size` を `width` / `height` と同じ位置として扱う", () => {
    const source = `.sui_button {
  --sui_button-padding_inline: ;
  --sui_button-min_height: ;
  --sui_button-size: ;
}
`;
    const expected = `.sui_button {
  --sui_button-size: ;
  --sui_button-min_height: ;
  --sui_button-padding_inline: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  it("CSS プロパティーを判定できない変数を末尾へ移動する", () => {
    const source = `.sui_button {
  --sui_button-unknown: ;
  --sui_button-color: ;
}
`;
    const expected = `.sui_button {
  --sui_button-color: ;
  --sui_button-unknown: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  it("判定できない変数同士を名前順で並べ替える", () => {
    const source = `.sui_button {
  --sui_button-zzz: ;
  --sui_button-aaa: ;
  --sui_button-mmm: ;
}
`;
    const expected = `.sui_button {
  --sui_button-aaa: ;
  --sui_button-mmm: ;
  --sui_button-zzz: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  it("同一 CSS プロパティーのバリアントは元の順序を維持する", () => {
    const source = `.sui_button {
  --sui_button-color-hover: ;
  --sui_button-background-strong: ;
  --sui_button-color-normal: ;
  --sui_button-background-subtle: ;
  --sui_button-color-active: ;
  --sui_button-background-normal: ;
}
`;
    const expected = `.sui_button {
  --sui_button-color-hover: ;
  --sui_button-color-normal: ;
  --sui_button-color-active: ;
  --sui_button-background-strong: ;
  --sui_button-background-subtle: ;
  --sui_button-background-normal: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  it("対象外の CSS 変数が混在するブロックは変更しない", () => {
    const source = `.sui_button {
  --sui_button-border_radius: ;
  --other_prop: ;
  --sui_button-color: ;
}
`;
    expect(sortCssVariables(source)).toBe(source);
  });

  it("対象外の接頭辞を持つ CSS 変数のみのブロックは変更しない", () => {
    const source = `.sui_theme {
  --sui-color: ;
  --sui-display: ;
}
`;
    expect(sortCssVariables(source)).toBe(source);
  });

  it("CSS 変数以外の宣言を含むブロックは変更しない", () => {
    const source = `.sui_button {
  --sui_button-color: ;
  color: red;
  --sui_button-display: ;
}
`;
    expect(sortCssVariables(source)).toBe(source);
  });

  it("@media やネストしたルール内のブロックも並べ替える", () => {
    const source = `@layer sui.component {
  .sui_button {
    @media (any-hover: hover) {
      &:hover {
        --sui_button-color: ;
        --sui_button-display: ;
      }
    }
  }
}
`;
    const expected = `@layer sui.component {
  .sui_button {
    @media (any-hover: hover) {
      &:hover {
        --sui_button-display: ;
        --sui_button-color: ;
      }
    }
  }
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  it("コメントや複数行の値を含むブロックの既存のコードを壊さない", () => {
    const source = `.sui_button {
  /* コメント A */
  --sui_button-padding_inline: round(
                                down,
                                calc((1px / 2))
                              );
  /* コメント B */
  --sui_button-display: ;
}
`;
    const expected = `.sui_button {
  /* コメント A */
  --sui_button-display: ;
  /* コメント B */
  --sui_button-padding_inline: round(
                                down,
                                calc((1px / 2))
                              );
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  it("並べ替えが不要な場合は元の文字列をそのまま返す", () => {
    const source = `.sui_button {
  --sui_button-display: ;
  --sui_button-color: ;
}

.sui_other {
  color: red;
}
`;
    expect(sortCssVariables(source)).toBe(source);
  });
});
