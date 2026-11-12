import { test, describe } from "vite-plus/test";

import { sortCssVariables } from "../../scripts/sort-css-variables.js";

describe("sortCssVariables", () => {
  test("CSS プロパティーを stylelint の並び順に従って並べ替える", ({ expect }) => {
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

  test("アンダースコア区切りのプロパティー (`border_radius`) を判定する", ({ expect }) => {
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

  test("`size` を `width` / `height` と同じ位置として扱う", ({ expect }) => {
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

  test("`virtual_` を取り除いて CSS プロパティーを判定する", ({ expect }) => {
    const source = `.sui_button {
  --sui_button-border_radius: ;
  --sui_button-background_color: ;
  --sui_button-virtual_margin_block: ;
}
`;
    const expected = `.sui_button {
  --sui_button-virtual_margin_block: ;
  --sui_button-background_color: ;
  --sui_button-border_radius: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("`virtual_` 付きの変数のバリアントを判定する", ({ expect }) => {
    const source = `.sui_button {
  --sui_button-color-hover: ;
  --sui_button-color-normal: ;
  --sui_button-virtual_margin_block-normal: ;
}
`;
    const expected = `.sui_button {
  --sui_button-virtual_margin_block-normal: ;
  --sui_button-color-hover: ;
  --sui_button-color-normal: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("`virtual_` を取り除いた名前でエイリアスを解決する", ({ expect }) => {
    const source = `.sui_button {
  --sui_button-padding_inline: ;
  --sui_button-min_height: ;
  --sui_button-virtual_size: ;
}
`;
    const expected = `.sui_button {
  --sui_button-virtual_size: ;
  --sui_button-min_height: ;
  --sui_button-padding_inline: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("ネストが深いコンポーネントの変数を下に移動する", ({ expect }) => {
    const source = `.sui_alert_dialog_icon {
  --sui_alert_dialog_icon__svg-size: ;
  --sui_alert_dialog_icon-margin_right: ;
}
`;
    const expected = `.sui_alert_dialog_icon {
  --sui_alert_dialog_icon-margin_right: ;
  --sui_alert_dialog_icon__svg-size: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("同じ深さではプロパティーの並び順に従う", ({ expect }) => {
    const source = `.sui_badge {
  --sui_aaa-color: ;
  --sui_zzz-virtual_margin: ;
}
`;
    const expected = `.sui_badge {
  --sui_zzz-virtual_margin: ;
  --sui_aaa-color: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("判定できない変数は深さ順にし同じ深さでは名前順にする", ({ expect }) => {
    const source = `.sui_button {
  --sui_button__icon-zzz: ;
  --sui_button-mmm: ;
  --sui_button__icon-aaa: ;
  --sui_button-zzz: ;
}
`;
    const expected = `.sui_button {
  --sui_button-mmm: ;
  --sui_button-zzz: ;
  --sui_button__icon-aaa: ;
  --sui_button__icon-zzz: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("判定できない変数でも深さが浅ければ先に移動する", ({ expect }) => {
    const source = `.sui_alert_dialog_icon {
  --sui_alert_dialog_icon__svg-size: ;
  --sui_alert_dialog_icon-floating: ;
}
`;
    const expected = `.sui_alert_dialog_icon {
  --sui_alert_dialog_icon-floating: ;
  --sui_alert_dialog_icon__svg-size: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("CSS プロパティーを判定できない変数を末尾へ移動する", ({ expect }) => {
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

  test("判定できない変数同士を名前順で並べ替える", ({ expect }) => {
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

  test("判定できない変数の状態を固定順 (idle → hover → active → checked) で並べ替える", ({
    expect,
  }) => {
    const source = `.sui_checkbox {
  --sui_checkbox-canvas-active: ;
  --sui_checkbox-canvas-active-checked: ;
  --sui_checkbox-canvas-hover: ;
  --sui_checkbox-canvas-hover-checked: ;
  --sui_checkbox-canvas-idle: ;
  --sui_checkbox-canvas-idle-checked: ;
}
`;
    const expected = `.sui_checkbox {
  --sui_checkbox-canvas-idle: ;
  --sui_checkbox-canvas-idle-checked: ;
  --sui_checkbox-canvas-hover: ;
  --sui_checkbox-canvas-hover-checked: ;
  --sui_checkbox-canvas-active: ;
  --sui_checkbox-canvas-active-checked: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("固定順のセグメントを持つ変数を名前順より先に並べ替える", ({ expect }) => {
    const source = `.sui_badge {
  --sui_badge-aaa: ;
  --sui_badge-zzz-idle: ;
}
`;
    const expected = `.sui_badge {
  --sui_badge-zzz-idle: ;
  --sui_badge-aaa: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("固定順のセグメントを持つ変数でも CSS プロパティーを判定できた変数を先に置く", ({
    expect,
  }) => {
    const source = `.sui_chip {
  --sui_chip-canvas-idle: ;
  --sui_chip-color: ;
}
`;
    const expected = `.sui_chip {
  --sui_chip-color: ;
  --sui_chip-canvas-idle: ;
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("同一 CSS プロパティーのバリアントは元の順序を維持する", ({ expect }) => {
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

  test("対象外の CSS 変数が混在するブロックは変更しない", ({ expect }) => {
    const source = `.sui_button {
  --sui_button-border_radius: ;
  --other_prop: ;
  --sui_button-color: ;
}
`;
    expect(sortCssVariables(source)).toBe(source);
  });

  test("対象外の接頭辞を持つ CSS 変数のみのブロックは変更しない", ({ expect }) => {
    const source = `.sui_theme {
  --sui-color: ;
  --sui-display: ;
}
`;
    expect(sortCssVariables(source)).toBe(source);
  });

  test("CSS 変数以外の宣言を含むブロックは変更しない", ({ expect }) => {
    const source = `.sui_button {
  --sui_button-color: ;
  color: red;
  --sui_button-display: ;
}
`;
    expect(sortCssVariables(source)).toBe(source);
  });

  test("@media やネストしたルール内のブロックも並べ替える", ({ expect }) => {
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

  test("宣言とネストしたルールが混在するブロックでも宣言を並べ替える", ({ expect }) => {
    const source = `@scope (.sui_accordion) to ([data-scope]) {
:scope {
  --sui_accordion-border_radius: var(--sui-radius-md);
  --sui_accordion-background_color: var(--sui-canvas-1);

  &.sui_accordion-radius_none {
    --sui_accordion-border_radius: 0px;
  }

  &.sui_accordion-size_sm {
    --sui_accordion_trigger-line_height: ;
    --sui_accordion_trigger-gap: ;
    --sui_accordion_trigger-padding: ;
  }
}
}
`;
    const expected = `@scope (.sui_accordion) to ([data-scope]) {
:scope {
  --sui_accordion-background_color: var(--sui-canvas-1);
  --sui_accordion-border_radius: var(--sui-radius-md);

  &.sui_accordion-radius_none {
    --sui_accordion-border_radius: 0px;
  }

  &.sui_accordion-size_sm {
    --sui_accordion_trigger-gap: ;
    --sui_accordion_trigger-padding: ;
    --sui_accordion_trigger-line_height: ;
  }
}
}
`;
    expect(sortCssVariables(source)).toBe(expected);
  });

  test("ネストしたルールをまたいで宣言を移動しない", ({ expect }) => {
    const source = `.sui_accordion {
  --sui_button-border_radius: ;
  &.sui_accordion-radius_none {
    --sui_accordion-border_radius: 0px;
  }
  --sui_button-background_color: ;
}
`;
    expect(sortCssVariables(source)).toBe(source);
  });

  test("コメントや複数行の値を含むブロックの既存のコードを壊さない", ({ expect }) => {
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

  test("並べ替えが不要な場合は元の文字列をそのまま返す", ({ expect }) => {
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
