---
name: css
description: Suru UI のコンポーネント CSS を書くときに使用します。scope・layer・5区分・変数命名を定めます。
---

# コンポーネント CSS

基準となる実装は次の 2 ファイルです。

- `packages/react/src/accordion/accordion.css`
- `packages/react/src/alert-dialog/alert-dialog.css`

## 全体構造

パーツごとに `/* パーツ名 */` + `@layer` + `@scope` のブロックを置きます。パーツツリー順に並べます。

```css
/* Root */
@layer sui.component {
@scope (.sui_accordion) to ([data-scope]) {

/* 固定 */
:scope {
}

/* 変数 */
:scope {
}

/* 可変 */
:scope {
}

/* 代入 */
:scope {
}

/* 変異 */
:scope {
}

} /* @scope */
} /* @layer */
```

- `@layer` は通常 `sui.component` です。無効状態だけ `sui.important` を末尾に 1 つ置きます。
- `@scope` の始点は Root 要素 (`.sui_accordion`) か Portal (`.sui_alert_dialog_portal`) です。終点は原則 `to ([data-scope])` です。子孫の `[data-scope]` を跨ぐ宣言の扱いは `### 例外スコープの分離` に従います。
- ブロック内はすべて `:scope { ... }` に書きます。
- 閉じ括弧に `} /* @scope */` と `} /* @layer */` のコメントを付けます。
- 同じ起点でもパーツごとにブロックを分けます。

```css
/* Root */
@layer sui.component {
@scope (.sui_accordion) to ([data-scope]) {
} /* @scope */
} /* @layer */

/* Item */
@layer sui.component {
@scope (.sui_accordion) to ([data-scope]) {
} /* @scope */
} /* @layer */
```

### 例外スコープの分離

子孫の `[data-scope]` (例: 項目内の `ButtonRoot`) を跨いで適用する必要がある宣言だけを、下限なしの別ブロックに分離します。
境界を跨がない宣言は元のブロックに残し、影響範囲を最小化します。

- 分離するブロックには理由をコメントで注記します。

```css
/* ItemIndicator */
@layer sui.component {
@scope (.sui_context_menu_portal) to ([data-scope]) {

/* 可変 */
:scope {
  .sui_context_menu_item_indicator {
    width: var(--sui_context_menu_item_indicator-size);
  }
}

} /* @scope */
} /* @layer */

/* ItemIndicator */
/* 項目は ButtonRoot 経由で描画され、ButtonRoot が data-scope を持つため、選択状態による表示切替だけ下限なしの別ブロックにします。 */
@layer sui.component {
@scope (.sui_context_menu_portal) {

/* 変数 */
:scope {
  --sui_context_menu_item_indicator-opacity: ;
}

/* 代入 */
:scope {
  --sui_context_menu_item_indicator-opacity: 1;
}

/* 可変 */
:scope {
  .sui_context_menu_item_indicator {
    opacity: var(--_sui_context_menu_item_indicator-opacity,
               var(--sui_context_menu_item_indicator-opacity)
             );
  }
}

/* 変異 */
:scope {
  .sui_context_menu_item_indicator-unchecked {
    --_sui_context_menu_item_indicator-opacity: 0;
  }
}

} /* @scope */
} /* @layer */
```

## 5 区分

`:scope` は次の順で置きます。1 区分に `:scope` は 1 つだけ置きます。

- 使わない区分は省略します。例: Portal は `固定` のみ、Backdrop は `変異` なしです。
- 省略しても順序は変えません。

| 区分 | 役割 | 書く内容 |
| --- | --- | --- |
| 固定 | コンポーネントによって固定されているスタイル | `var()` は使わない |
| 変数 | 公開カスタムプロパティーの宣言 | `--sui_<部品>-<属性>: ;` の空宣言のみ |
| 可変 | CSS 変数によるスタイリング | `prop: var(--sui_...)` のみ。条件付きは私的変数経由 |
| 代入 | 代入と修飾クラス | 公開変数への代入 + 修飾クラスによる分岐 |
| 変異 | 状態による変異 | 私的変数 `--_sui_...` への代入のみ |

区分の判断はプロパティー名ではなく次の問いで行います。同じプロパティー名が複数の区分に現れても構いません。

1. 利用者が変数で変えられるべきか。いいえ → `固定` に直接書きます。はい → 次へ進みます。
2. 状態で切り替わるか。いいえ → 公開変数を `変数` で宣言し、`可変` で適用し、`代入` で値を入れます。はい → 公開変数に加えて私的変数を `可変` でフォールバック付きで参照し、切替は `変異` に集めます。

## 命名

### クラス名

- 基底は `sui_<コンポーネント>_<パーツ>` の snake_case です (`sui_accordion_trigger`、`sui_alert_dialog_content`)。
- Root / Portal 自体はパーツ名なしです (`sui_accordion`、`sui_alert_dialog_portal`)。
- 値を持つ修飾は `sui_<基底>-<属性>_<値>` です。ハイフン 1 つで属性、`_` 1 つで値にします。
- 真偽値の修飾は値なしです。例: `sui_accordion-outlined`、`sui_accordion-separator` です。
- 状態はパーツの接尾に付けます。例: `sui_accordion_item-open`、`sui_accordion_item-disabled`、`sui_accordion_trigger-unstyled` です。
- 例: `sui_accordion-size_sm`、`sui_accordion-variant_naked`、`sui_accordion-radius_md`、`sui_alert_dialog_content-variant_stacked`、`sui_alert_dialog_icon-color_blue`、`sui_alert_dialog_controls-absolute`。

### 公開変数 `--sui_...`

- 形式は `--sui_<基底>-<属性>(-<状態>)?(__<内側>-<属性>)?` です。
- 状態で値が変わる属性だけ `-状態` を付けます。例: `--sui_accordion_trigger-background_color-hover` です。変わらない属性には付けません。例: `--sui_accordion_heading-gap` です。
- インタラクティブな要素の状態は `-idle` / `-hover` / `-active` にします。デザインシステムの `-normal` / `-subtle` / `-strong` をそれぞれ割り当てます。

```css
&.sui_chip-variant_solid {
  --sui_chip-color-idle: var(--sui-grey-solid-canvas_text-normal);
  --sui_chip-color-hover: var(--sui-grey-solid-canvas_text-subtle);
  --sui_chip-color-active: var(--sui-grey-solid-canvas_text-strong);
}
```
- 部品内の要素だけ `__<内側>` を付けます。例: `--sui_alert_dialog_icon__svg-size` です。それ以外には付けません。
- `prop` に直接適用しない中間値だけ `-virtual_` を付けます。例: `--sui_alert_dialog_content-virtual_margin_block` です。`prop` に適用する値には付けません。
- `変数` 区分では空宣言 (`: ;`) します。利用者による変異点として列挙するのが目的です。

### 私的変数 `--_sui_...`

- 先頭に `_` を 1 つ付けます (`--_sui_accordion_trigger-background_color`)。
- `可変` で `var(--_sui_x, <フォールバック>)` として参照し、`変異` でだけ代入します。
- フォールバックは次から選びます。色は `transparent`、幅は `0px`、位置は `unset`、余白は `auto` です。`-idle` がある属性は公開変数の `-idle` にします。

```css
/* 可変 */
:scope {
  .sui_accordion_trigger:not(.sui_accordion_trigger-unstyled) {
    outline-width: var(--_sui_accordion_trigger-outline_width, 0px);
    background-color: var(--_sui_accordion_trigger-background_color,
                        var(--sui_accordion_trigger-background_color-idle)
                      );
  }
}

/* 変異 */
:scope {
  .sui_accordion_trigger {
    &:active {
      --_sui_accordion_trigger-background_color:
        var(--sui_accordion_trigger-background_color-active);
    }

    &:focus-visible {
      --_sui_accordion_trigger-outline_width: var(--sui_accordion_trigger-focusring_width);
    }
  }
}
```

## 区分ごとの書き方

### 固定

- 規則: コンポーネントの構造や振る舞いを決める値は直接書きます。デザイントークンや代入値、利用者による変更を介さないものが対象です。
- 規則: `var()` は使いません。
- 例: `position`、`display`、`flex` / `grid`、`overflow`、`cursor`、`touch-action`、`border-style`、`outline-style`、`line-break` などです。これらのプロパティーが `可変` で使えないわけではありません。

```css
/* 固定 */
:scope {
  position: fixed;
  inset: 0;
  z-index: calc(infinity);
  min-height: 100dvh;

  /* iOS 26以降: 背景が画面全体を覆うようにします。 */
  @supports (-webkit-touch-callout: none) {
    position: absolute;
  }
}
```

### 変数

- そのパーツの公開変数をすべて空宣言します。

```css
/* 変数 */
:scope {
  --sui_accordion-border_color: ;
  --sui_accordion-border_width: ;
  --sui_accordion-border_radius: ;
}
```

### 可変

- 規則: デザイントークンや代入値、利用者による変更を受けられるよう、公開変数・私的変数を `prop` へ適用します。
- 規則: 生の値や生トークンは書きません。必ず自部品の変数を経由します。他パーツの変数を直接参照しません。継承を強調する場合を除き、部品専用の変数を定義し、`代入` で値を引き継ぎます。

```css
/* 変数 */
:scope {
  --sui_combobox_input-color: ;
}

/* 可変 */
:scope {
  .sui_combobox_input {
    color: var(--sui_combobox_input-color);
    caret-color: var(--sui_combobox_input-color);
  }
}

/* 代入 */
:scope {
  --sui_combobox_input-color: var(--sui_combobox-color);
}
```

- 規則: 条件付きで変わる値は私的変数 + フォールバックにします。
- 例: `border-color: var(--_sui_accordion-border_color, transparent)`、`svg:not(.sui-ignore)` などです。これらのプロパティーが `固定` で使えないわけではありません。

```css
/* 可変 */
:scope {
  background-color: var(--sui_accordion-background_color);
  border-color: var(--_sui_accordion-border_color, transparent);
  border-width: var(--_sui_accordion-border_width, 0px);

  svg:not(.sui-ignore) {
    width: var(--sui_accordion_trigger__svg-size);
    color: var(--sui_accordion_trigger__svg-color);
  }
}
```

### 代入

- 規則: 公開変数への代入と修飾クラス分岐を書きます。生の `prop` は書きません。
- 規則: 値はデザイントークンや動的関数を使います。
- 規則: 1 つの公開変数には 1 つの値だけを代入します。ショートハンドに複数値をまとめず、ロングハンドごとに変数を分けます。
- 規則: 修飾対象が起点自身か子孫かで分岐の書き方を使い分けます。起点自身は `&.`、子孫は `&:has(...)` にします。
- 規則: 分岐は既定値の後に `size` → `radius` → `color` / `variant` の順に置きます。

```css
&.sui_accordion-size_sm {
  --sui_accordion_heading-gap: --sui-gap(2);
}

&.sui_accordion-variant_naked {
  --sui_accordion_heading-background_color: var(--sui-grey-naked-canvas-normal);
}
```

- 例: 上下で値が異なる余白は `padding_block_start` / `padding_block_end` に分けます (alert)。

```css
&.sui_alert-size_sm:has(.sui_alert_title, .sui_alert_content) {
  --sui_alert_actions-padding_block_start: --sui-gap(4);
  --sui_alert_actions-padding_block_end: --sui-gap(3);
}
```

- 例: 起点が Portal で修飾対象が子孫の場合は `&:has(...)` を使います (alert-dialog)。

```css
&:has(.sui_alert_dialog_icon-size_sm) {
  --sui_alert_dialog_icon-size: calc(
                                  var(--sui-size-sm)
                                  + var(--sui_alert_dialog_icon-virtual_padding) * 2
                                );
}

&:has(.sui_alert_dialog_icon-color_blue.sui_alert_dialog_icon-variant_solid) {
  --sui_alert_dialog_icon-color: var(--sui-blue-solid-canvas_text-normal);
}
```

- 例: 親パーツの値を子が引き継ぐときはそのまま参照します。

### 変異

- 規則: 私的変数への代入だけを書きます。公開変数への代入や生の `prop` は書きません。
- 規則: 状態変化による切替をここに集めます。
- 規則: 状態クラスは DOM ツリー上のルート起点で付けます (例: `.sui_collapsible-transition_status_*`)。Portal で Root が DOM ルートでない場合や、子が独立した状態を持つ場合 (例: Item ごとの `-disabled`) は例外とします。
- 例: `-outlined` による有効化、開閉や遷移状態による切替などです。

```css
&.sui_accordion-outlined {
  --_sui_accordion-border_color: var(--sui_accordion-border_color);
  --_sui_accordion-border_width: var(--sui_accordion-border_width);
}
```

- 例: 開閉・遷移・位置調整などです。遷移状態はルート起点で書きます。項目が独立した状態を持つ場合 (例: アコーディオンの各 Item) は、その状態を持つ要素起点で書きます。

```css
.sui_accordion_item-open .sui_accordion_indicator {
  --_sui_accordion_indicator-rotate: var(--sui_accordion_indicator-rotate-open);
}

.sui_collapsible-transition_status_starting,
.sui_collapsible-transition_status_ending {
  --_sui_collapsible_content-height: 0px;
}
```

- インタラクティブな要素 (`button`、`a`、単体で操作できる chip など) の `:hover` / `:active` / `:focus-visible` は `&:enabled` 配下に置き、無効時に発火させません。

## セレクターの改行と字下げ

長いセレクターは次の形に改行します。短いものは 1 行にします。

- 子孫結合子で連なる複合セレクターが 3 つ以上になる場合は、1 つずつ改行し、1 段ずつ深く字下げします。
- カンマ区切りのセレクターは 1 つずつ改行します。
- `:is()` / `:has()` / `:not()` の引数が長くなる場合は、1 つずつ改行します。

```css
  &.sui_accordion-variant_naked
    .sui_accordion_item-disabled
      .sui_accordion_trigger:not(.sui_accordion_trigger-unstyled) {
    color: var(--sui-disabled-naked-canvas_text);
  }

  .sui_accordion_content-transition_status_starting,
  .sui_accordion_content-transition_status_ending {
    --_sui_accordion_content-height: 0px;
  }

  &.sui_accordion-variant_naked .sui_accordion_heading:is(
    :not(:has(.sui_accordion_trigger)),
    :has(.sui_accordion_trigger-unstyled)
  ) {
```

## 定型パターン

該当する場合は次の形に従います。該当しない場合は書きません。

- 角丸がある場合は公開変数 `border_radius` と `radius_*` 修飾で切り替え、子は親の値を参照します。
- 枠線の有無切替がある場合は `固定` の線種 + `可変` の私的変数 + `代入` のトークン + `変異` の `-outlined` で有効化します。
- フォーカスリングがある場合は `focusring_width` / `focusring_color` / `focusring_offset` の 3 点を `可変` + `代入` + `変異` (`:focus-visible`) で扱います。`outline-style: solid` は `固定` に置きます。
- 文字がある場合は `font_family` / `font_size` / `font_weight` / `line_height` / `letter_spacing` / `color` を一式で持ちます。`line-height` プロパティー自体には `var(--sui_<部品>-line_height)` を直接指定します。`calc(<font_size> * <line_height>)` を使うのは、テキスト高さが必要な派生値 (`-virtual_text_height`、`__svg-size` など) で `1lh` 相当を求めるときのみです。`1lh` は使いません。
- 色違い × 質感 (`color_*` × `variant_*`) がある場合はすべての組合せを列挙します。省略しません。
- `svg` がある場合は `svg:not(.sui-ignore)` にし、大きさと色を明示します。大きさは文字や箱に連動する `calc()` にします。色は `--sui-icon_color(<前景色>, <背景色>)` で計算します。

```css
--sui_combobox_clear__svg-color: --sui-icon_color(
                                   var(--sui_combobox_clear-color-idle),
                                   var(--sui_combobox-background_color)
                                 );
```
- 適用外のクラスがある場合は `:not()` で除外します。

## 無効状態

- 末尾に 1 つの `@layer sui.important` ブロックを置きます。パーツごとに `/* Root */` などの小見出しを付け、小見出しごとに `:scope` を 1 つ置きます。
- 変数は使わず、生の `prop` と `var(--sui-disabled-*)` を直接書きます。
- 対象は Root の無効クラスと各パーツの無効クラスです。`variant` があるパーツは `variant` ごとに書きます。
- 無効になる要素すべてに `cursor: not-allowed` を付けます。

```css
/* disabled */
@layer sui.important {
@scope (.sui_accordion) to ([data-scope]) {

/* Root */
:scope {
  &.sui_accordion-disabled {
    cursor: not-allowed;
  }
}

/* Trigger */
:scope {
  .sui_accordion_item-disabled .sui_accordion_trigger {
    cursor: not-allowed;
  }

  &.sui_accordion-variant_naked
    .sui_accordion_item-disabled
      .sui_accordion_trigger:not(.sui_accordion_trigger-unstyled) {
    color: var(--sui-disabled-naked-canvas_text);
    background-color: var(--sui-disabled-naked-canvas);
  }
}

} /* @scope */
} /* @layer */
```

## 禁則

- `固定` に `var()` を書かない。`可変` に生の値を書かない。`代入` に生の `prop` を書かない。`変異` に公開変数への代入や生の `prop` を書かない。
- `変数` で宣言していない変数を参照・代入しない。ファイル内で宣言した変数に限ります。
- 私的変数 (`--_sui_...`) を `変異` 以外で代入しない。
- 私的変数をフォールバックなしで参照しない。例: `var(--_sui_accordion-border_color, transparent)` のように書きます。
- `可変` で全体トークンを直接参照しない。例: `var(--sui-canvas-1)` や `var(--sui-radius-md)` は `代入` に書き、`可変` は自部品の変数を経由します。
- パーツごとに `@layer` + `@scope` ブロックを分ける。複数パーツを 1 ブロックにまとめない。ただし `[data-scope]` の下限の有無が異なるスタイルは、理由のコメント付きで別ブロックに分けます。分離するのは境界を跨ぐ宣言だけにし、適用する `可変` と `変異` はペアで移します。
- 状態クラスを子起点に分散させない。DOM ツリー上のルート起点にします (Portal や独立状態の子は例外)。
- 5 区分の順序を入れ替えない。例: Footer のように `変数` を `固定` より先に置かない。
- 修飾の書き方を取り違えない。例: 起点自身の修飾は `&.sui_accordion-size_sm`、子孫の修飾は `&:has(.sui_alert_dialog_icon-size_sm)` にします。
- 変数名・クラス名の綴りは `変数`・`可変`・`代入` で一致させる。例: 対応しない変数に代入しない (`size_lg` の代入先が `min_height` になっているような不一致を残さない)。
- 同一セレクターへの `代入` を重複させない。例: 同じ `&:has(...)` を二度書いて後の定義で上書きしない。
- 1 つの公開変数に複数の値を半角スペース区切りで代入しない。例: `--sui_alert_actions-padding_block: --sui-gap(4) --sui-gap(3)` は禁止。`padding_block_start` / `padding_block_end` のように変数を分けます。
- `svg` に素の `svg` セレクターを使わない。例: `svg:not(.sui-ignore)` にし、大きさと色を明示します。継承に任せない。
- インタラクティブな要素の状態名に `-idle` / `-hover` / `-active` 以外を使わない。デザインシステムの `-normal` / `-subtle` / `-strong` をそれぞれ割り当てます。
- `1lh` を使わない。`line-height` には変数を直接指定し、行の高さの計算が必要な派生値のみ `calc(<font_size> * <line_height>)` にします (例: `--sui_chip-virtual_text_height`)。
- `currentColor` を使わない。色は CSS 変数で明示します。
- (重要) 他パーツの変数を `可変` で直接参照しない。継承を強調する場合を除き、部品専用の変数を定義して `代入` で引き継ぎます。
- 長いセレクターを 1 行に書かない。子孫の連なりは 1 つずつ改行して 1 段ずつ深く字下げし、カンマ区切りと関数引数は 1 つずつ改行します。
- インタラクティブな要素の `:hover` / `:active` / `:focus-visible` から `&:enabled` を外さない。無効時に発火させないためです。
- `sui.important` を無効状態以外に使わない。
- `!important` を書かない。
