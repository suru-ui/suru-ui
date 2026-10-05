---
name: css
description: Suru UI のコンポーネント CSS を書くときに使用します。scope・layer・5区分・変数命名を定めます。
---

# コンポーネント CSS

基準となる実装は `packages/react/src/combobox/input-group/combobox.input-group.css` です。

## 全体構造

CSS はパートごとに `<パート>/<kebab>.<パート>.css` に分けます (例: `input-group/combobox.input-group.css`)。バレル (`<kebab>.parts.ts`) がパーツツリー順 (描画順) に import し、この順序がカスケード順になります。import の文順は自動整形でも変わりませんが、手でも並べ替えません。パーツ名の見出しコメント (`/* Input */` など) は書きません (ファイル名が示すため)。理由コメントと層マーカー (`/* disabled */`・`/* readonly */`) は残します。

```text
TriggerLabel → InputGroup → Input → Icon → Clear → Chips → Chip → ChipRemove → InputDisplay
→ Backdrop → Positioner → Popup → Arrow → Status → Empty → ScrollArea → Viewport
→ List → Group → GroupLabel → ItemIndicator → Separator
→ (各パート末尾に readonly → disabled)
```

## ブロックの書式

```css
@layer sui.component {
@scope (.sui_combobox_input) to ([data-scope]) {

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

- `@layer` は通常 `sui.component` です。読み取り専用は `sui.overrides`、無効状態は `sui.important` を末尾に置きます。詳しくは `## 読み取り専用` と `## 無効状態` に従います。
- `@scope` の始点は原則そのパーツ自身の基底クラス (`Input` なら `.sui_combobox_input`、`Root` なら `.sui_combobox`) にします。終点は原則 `to ([data-scope])` です。
- 祖先・兄弟・他パーツに依存する規則や、パーツ自身を起点にできない規則だけを例外として祖先起点の別ブロックに分けます。詳しくは `### スコープ起点の選び方` と `### 例外ブロック` に従います。
- ブロック内はすべて `:scope { ... }` に書きます。
- 閉じ括弧に `} /* @scope */` と `} /* @layer */` のコメントを付けます。
- 同じパーツでも例外は別ブロックに分けます。

```css
@layer sui.component {
@scope (.sui_combobox_input) to ([data-scope]) {
} /* @scope */
} /* @layer */

@layer sui.component {
@scope (.sui_combobox_input_display) to ([data-scope]) {
} /* @scope */
} /* @layer */
```

### スコープ起点の選び方

- パーツのブロックは、そのパーツの基底クラスを `@scope` の始点にします。`Root` は `.sui_combobox`、`Portal` は `.sui_combobox_portal`、`Input` は `.sui_combobox_input`、`TriggerLabel` は `.sui_combobox_trigger_label` です。
- 本文はパーツ自身とその子孫だけを表せるため、`:scope` はパーツ要素を指します。パーツ自身への宣言は `:scope { ... }`、自身の修飾は `:scope { &.sui_combobox_input-size_sm { ... } }`、子孫は `:scope { svg:not(.sui-ignore) { ... } }` のように書きます。
- パーツ自身が等価な状態クラスを持つ場合は、祖先を見ずに自身のクラスを使います。例: `.sui_combobox_item-highlighted` は `&.sui_combobox_item-highlighted` にします。
- `Portal` 自体は `ctx` の `size`・`radius` を `sui_combobox_portal-size_*`・`sui_combobox_portal-radius_*` として持ちます。ポップアップ系のパーツがポータルの修飾を受ける必要がある場合は、ポータル起点の例外ブロックで `&.sui_combobox_portal-size_sm` の形で受けます。
- パーツが別コンポーネント経由で描画され、そのコンポーネントが `data-scope` を持つ場合は、既存の起点と下限 (`### 下限の `:not()` 除外` / `### 例外スコープの分離`) を維持し、理由をコメントで残します。

### 例外ブロック

パーツ起点では表せない規則は、祖先パーツ起点の別ブロックに残します。迷ったら例外に残します。

- 兄弟・位置に依存する規則 (`+`・`~`・`:first-child`・`:last-child`・`:nth-child` など) は、パーツを内包する祖先 (通常はルート) 起点にします。パーツ起点の `:scope + :scope` はスコープの外を指せないため一致しません。
- 祖先パーツの状態に依存し、パーツ自身に等価なクラスが無い規則は、祖先起点の例外にします。パーツ自身に等価なクラスがある場合は自身のクラスを使います。
- 複数パーツにまたがる規則や、公開変数を兄弟パーツと共有する規則は、ルート起点の例外にまとめます。
- 例外ブロックには理由コメントを `@layer` の直上に書きます。例外ブロックは元のパーツブロックの直後に置き、パーツの並び順を維持します。

```css
/* 隣接する項目に依存するため、ルート起点の別ブロックにします。 */
@layer sui.component {
@scope (.sui_accordion) to ([data-scope]) {

/* 可変 */
:scope {
  .sui_accordion_item + .sui_accordion_item {
    border-top-color: var(--_sui_accordion_item-border_top_color, transparent);
  }
}

} /* @scope */
} /* @layer */
```

- 公開変数をルートで上書きできる必要がある場合は、`変数` (空宣言) と `代入` をルート起点の例外にまとめます。パーツ要素で空宣言すると、祖先から継承した代入値を遮蔽してしまうためです。
- 内包する別コンポーネントの規則に意図的に優先させる規則は、詳細度が1クラス分下がります。必要に応じて `&.sui_<パーツ>` を足すか、ルート起点の例外にして詳細度とスコープ近接を元の状態に保ちます。
- 代入が参照する変数の評価位置を変えないでください。関数 (`--sui-icon_color()` など) を含む代入は、参照先の変数が空の要素で評価されることを前提にしている場合があります。評価位置を維持するにはルート起点の例外にします。

### 下限の `:not()` 除外

内包先が `data-scope` を持つために下限で止まってしまう宣言は、下限に `:not()` を付けて除外します。理由をブロック直上にコメントで残します。

- `Popup` は入力グループを内包するため `to ([data-scope]:not(.sui_combobox))` にします。
- `ItemIndicator` は `Button` 経由で描画され `Button` が `data-scope` を持つため `to ([data-scope]:not(.sui_button))` にします。

```css
/* Button が data-scope を持つため、スコープの下限値から除外します。 */
@layer sui.component {
@scope (.sui_combobox_portal) to ([data-scope]:not(.sui_button)) {
} /* @scope */
} /* @layer */
```

### 例外スコープの分離

子孫の `[data-scope]` を跨いで適用する必要がある宣言だけを、下限なしの別ブロックに分離します。
境界を跨がない宣言は元のブロックに残し、影響範囲を最小化します。下限の `:not()` 除外で届く場合は分離せず、`:not()` を使います。

- 分離するブロックには理由をコメントで注記します。

```css
@layer sui.component {
@scope (.sui_combobox_portal) to ([data-scope]:not(.sui_button)) {

/* 可変 */
:scope {
  .sui_combobox_item_indicator {
    width: var(--sui_combobox_item_indicator-size);
  }
}

} /* @scope */
} /* @layer */

/* 項目は ButtonRoot 経由で描画され、ButtonRoot が data-scope を持つため、選択状態による表示切替だけ下限なしの別ブロックにします。 */
@layer sui.component {
@scope (.sui_combobox_portal) {

/* 変数 */
:scope {
  --sui_combobox_item_indicator-opacity: ;
}

/* 代入 */
:scope {
  --sui_combobox_item_indicator-opacity: 1;
}

/* 可変 */
:scope {
  .sui_combobox_item_indicator {
    opacity: var(--_sui_combobox_item_indicator-opacity,
               var(--sui_combobox_item_indicator-opacity)
             );
  }
}

/* 変異 */
:scope {
  .sui_combobox_item_indicator-unchecked {
    --_sui_combobox_item_indicator-opacity: 0;
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

- 基底は `sui_<コンポーネント>_<パーツ>` の snake_case です (`sui_combobox_input`、`sui_combobox_group_label`)。
- Root / Portal 自体はパーツ名なしです (`sui_combobox`、`sui_combobox_portal`)。Root が DOM を持たない場合、入力系の基底は `sui_combobox` (InputGroup 要素)、ポップアップ系の修飾受けは `sui_combobox_portal` になります。
- 値を持つ修飾は `sui_<基底>-<属性>_<値>` です。ハイフン 1 つで属性、`_` 1 つで値にします。
- 真偽値の修飾は値なしです。例: `sui_combobox-outlined`、`sui_combobox_popup-outlined` です。
- 状態はパーツの接尾に付けます。例: `sui_combobox_item-disabled`、`sui_combobox_item-selected`、`sui_combobox_item-highlighted`、`sui_combobox_trigger_label-disabled` です。3 値の `valid` は `sui_combobox-invalid` / `sui_combobox-valid` / `sui_combobox-unverified` にします。`popupSide` は `sui_combobox-popupside_top` のようにスネーク化します。
- 例: `sui_combobox-size_sm`、`sui_combobox-variant_naked`、`sui_combobox-radius_md`、`sui_combobox_popup-inputposition_top`、`sui_combobox_chip-color_blue`、`sui_combobox_portal-size_sm`。
- 独立装飾を持つ子 (`Chip`・`ChipRemove`) の修飾は子要素自身に付けます (`.sui_combobox_chip-color_grey` + ネスト `&.sui_combobox_chip-variant_solid`)。起点自身の `&.` と取り違えません。

### 公開変数 `--sui_...`

- 形式は `--sui_<基底>-<属性>(-<状態>)?(__<内側>-<属性>)?` です。
- 状態で値が変わる属性だけ `-状態` を付けます。例: `--sui_combobox_clear-color-hover` です。変わらない属性には付けません。例: `--sui_combobox_chips-row_gap` です。フォーカス枠は `-focus_visible` を使います (例: `--sui_combobox-border_color-focus_visible`)。
- インタラクティブな要素の状態は `-idle` / `-hover` / `-active` にします。デザインシステムの `-normal` / `-subtle` / `-strong` をそれぞれ割り当てます。

```css
&.sui_combobox-variant_naked {
  --sui_combobox_clear-color-idle: var(--sui-grey-naked-canvas_text-normal);
  --sui_combobox_clear-color-hover: var(--sui-grey-naked-canvas_text-subtle);
  --sui_combobox_clear-color-active: var(--sui-grey-naked-canvas_text-strong);
}
```
- 部品内の要素だけ `__<内側>` を付けます。例: `--sui_combobox_icon__svg-size` です。それ以外には付けません。
- `prop` に直接適用しない中間値だけ `-virtual_` を付けます。例: `--sui_combobox-button-virtual_padding_block`、`--sui_combobox_item_indicator-virtual_padding_block` です。`prop` に適用する値には付けません。
- `変数` 区分では空宣言 (`: ;`) します。利用者による変異点として列挙するのが目的です。`filter`・`virtual` を含め、参照・代入するすべての公開変数を宣言します。

### 私的変数 `--_sui_...`

- 先頭に `_` を 1 つ付けます (`--_sui_combobox_clear-color`)。
- `可変` で `var(--_sui_x, <フォールバック>)` として参照し、`変異` でだけ代入します。
- フォールバックは次から選びます。色は `transparent`、幅は `0px`、位置は `unset`、余白は `auto` です。`-idle` がある属性は公開変数の `-idle` にします。

```css
/* 可変 */
:scope {
  .sui_combobox_clear {
    color: var(--_sui_combobox_clear-color, var(--sui_combobox_clear-color-idle));
    outline-width: var(--_sui_combobox_clear-outline_width, 0px);
  }
}

/* 変異 */
:scope {
  &:not(.sui_combobox-disabled) .sui_combobox_clear {
    &:focus-visible {
      --_sui_combobox_clear-outline_width: var(--sui_combobox_clear-focusring_width);
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

- そのパーツの公開変数をすべて空宣言します。`filter`・`virtual` を含め、参照・代入する変数を落としません。

```css
/* 変数 */
:scope {
  --sui_combobox_backdrop-background_color: ;
  --sui_combobox_backdrop-filter: ;
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
- 例: `border-color: var(--_sui_combobox-border_color, transparent)`、`svg:not(.sui-ignore)` などです。これらのプロパティーが `固定` で使えないわけではありません。

```css
/* 可変 */
:scope {
  background-color: var(--sui_combobox-background_color);
  border-color: var(--_sui_combobox-border_color, transparent);
  border-width: var(--_sui_combobox-border_width, 0px);

  svg:not(.sui-ignore) {
    width: var(--sui_combobox_icon__svg-size);
    color: var(--sui_combobox_icon__svg-color);
  }
}
```

- 間隔は用途で関数を使い分けます。`gap` には `--sui-gap()`、余白・大きさには `--sui-space()` を使います。

### 代入

- 規則: 公開変数への代入と修飾クラス分岐を書きます。生の `prop` は書きません。
- 規則: 値はデザイントークンや動的関数を使います。`--sui-space()` / `--sui-gap()` / `--sui-border_width()` / `--sui-icon_color()` を使います。
- 規則: 1 つの公開変数には 1 つの値だけを代入します。ショートハンドに複数値をまとめず、ロングハンドごとに変数を分けます (`padding_block` を `padding_block_start` / `padding_block_end` に分ける場合を除き、`padding` と `padding-inline` に同じ変数を重ねません)。
- 規則: 修飾対象で分岐の書き方を使い分けます。起点自身は `&.`、起点が Portal で対象が子孫の場合は `&:has(...)`、独立装飾の子自身は `.sui_<子>-<属性>_<値>` (+ ネスト `&.sui_<子>-variant_*`) にします。
- 規則: 分岐は既定値の後に `size` → `radius` → `color` / `variant` の順に置きます。`color × variant` の組み合わせは省略せず全列挙します。

```css
&.sui_combobox-size_sm {
  --sui_combobox-padding_inline: --sui-space(2);
}

&.sui_combobox-radius_md {
  --sui_combobox-border_radius: var(--sui-radius-md);
}

&.sui_combobox-variant_naked {
  --sui_combobox-background_color: var(--sui-grey-naked-canvas-normal);
}
```

- 例: 派生値は `calc()` で求めます。`font_size * line_height` がテキスト高さになることを利用します。

```css
--sui_combobox-button-size: calc(
                              var(--sui_combobox-font_size)
                              * var(--sui_combobox-line_height)
                              + (var(--sui_combobox-button-virtual_padding_block) * 2)
                            );
--sui_combobox_chip__svg-size: calc(
                                 var(--sui_combobox_chip-font_size)
                                 * var(--sui_combobox_chip-line_height)
                               );
```

- 例: 起点が Portal で修飾対象が子孫の場合は `&:has(...)` を使います。Portal 自身の `size`・`radius` を子孫へ反映するのが定型です。

```css
&.sui_combobox_portal-size_sm {
  --sui_combobox_popup-padding: --sui-space(2);
  --sui_combobox_status-font_size: var(--sui-text-std-sm-n-font_size);
}
```

- 例: 独立装飾の子は自身の修飾クラスで分岐し、`color × variant` を全列挙します。

```css
.sui_combobox_chip-color_grey {
  &.sui_combobox_chip-variant_solid {
    --sui_combobox_chip-color: var(--sui-grey-solid-canvas_text-normal);
    --sui_combobox_chip-background_color: var(--sui-grey-solid-canvas-normal);
    --sui_combobox_chip-border_color: var(--sui-grey-solid-border-normal);
  }

  &.sui_combobox_chip-variant_naked {
    --sui_combobox_chip-color: var(--sui-grey-naked-canvas_text-normal);
    --sui_combobox_chip-background_color: var(--sui-grey-naked-canvas-normal);
    --sui_combobox_chip-border_color: var(--sui-grey-naked-border-normal);
  }
}
```

- 例: 親パーツの値を子が引き継ぐときはそのまま参照します。継承を強調する場合 (`Arrow` が `Popup` の背景・枠線を使う場合など) に限り、他パーツ変数の `代入` での直接参照を許します。

```css
--sui_combobox_arrow-background_color: var(--sui_combobox_popup-background_color);
--sui_combobox_arrow-border_color: var(--sui_combobox_popup-border_color);
--sui_combobox_arrow-border_width: var(--sui_combobox_popup-border_width);
```

- 例: 配置変数 (`--anchor-width`・`--available-width`・`--available-height`) を使う場合は要素セレクター配下に書きます。

```css
.sui_combobox_popup {
  --sui_combobox_popup-min_width: var(--anchor-width);
  --sui_combobox_popup-max_width: var(--available-width);
}

.sui_scroll_area {
  max-height: min(var(--sui_combobox_scroll_area-max_height), var(--available-height));
}
```

### 変異

- 規則: 私的変数への代入だけを書きます。公開変数への代入や生の `prop` は書きません。
- 規則: 状態変化による切替をここに集めます。
- 規則: 状態クラスはスタイル起点の要素に付けます。Portal で Root が DOM ルートでない場合、子が独立した状態を持つ場合 (例: Item ごとの `-disabled`・`-selected`・`-highlighted`)、兄弟起点の場合 (例: TriggerLabel) は例外とします。
- 例: `-outlined` による有効化、フォーカス・入力状態による切替などです。

```css
&.sui_combobox-outlined {
  --_sui_combobox-border_color: var(--sui_combobox-border_color-idle);
  --_sui_combobox-border_width: var(--sui_combobox-border_width-idle);
}
```

- 例: 入力欄の配置切替などです。`inputPosition` と反転 (`positioner-side_top`) の組み合わせを列挙します。

```css
.sui_combobox_popup-inputposition_top {
  --_sui_combobox_popup-areas: "input" "list";
}

&.sui_combobox_positioner-side_top .sui_combobox_popup-inputposition_start {
  --_sui_combobox_popup-areas: "list" "input";
}
```

- 例: 空状態の切替です。`Status` は読み上げ維持のため空でも非表示にせず、私的変数で高さを消します。`Empty` は `固定` の `:empty { display: none; }` で消します。

```css
.sui_combobox_status:empty {
  --_sui_combobox_status-min_height: 0px;
}
```

- インタラクティブな要素 (`button`、`a`、単体で操作できる chip など) の `:hover` / `:active` / `:focus-visible` は `&:not(.sui_<基底>-disabled)` 配下 + `@media (any-hover: hover)` (hover のみ) に置き、無効時に発火させません。`&:enabled` にしません。

```css
&:not(.sui_combobox-disabled) .sui_combobox_clear {
  @media (any-hover: hover) {
    &:hover {
      --_sui_combobox_clear-color: var(--sui_combobox_clear-color-hover);
    }
  }

  &:active {
    --_sui_combobox_clear-color: var(--sui_combobox_clear-color-active);
  }

  &:focus-visible {
    --_sui_combobox_clear-outline_width: var(--sui_combobox_clear-focusring_width);
  }
}
```

- フォーカス起点が子孫の場合は `&:has(.sui_combobox_input:focus-visible)` や `&:focus-within` で受けます。

## セレクターの改行と字下げ

長いセレクターは次の形に改行します。短いものは 1 行にします。

- 子孫結合子で連なる複合セレクターが 3 つ以上になる場合は、1 つずつ改行し、1 段ずつ深く字下げします。
- カンマ区切りのセレクターは 1 つずつ改行します。
- `:is()` / `:has()` / `:not()` の引数が長くなる場合は、1 つずつ改行します。

```css
  &.sui_combobox-variant_naked
    .sui_combobox_item-disabled
      .sui_combobox_input:not(.sui_combobox_input-unstyled) {
    color: var(--sui-disabled-naked-canvas_text);
  }

  .sui_combobox_status:empty {
    --_sui_combobox_status-min_height: 0px;
  }

  &.sui_combobox-variant_naked .sui_combobox_input:is(
    :not(:has(.sui_combobox_clear)),
    :has(.sui_combobox_clear-unstyled)
  ) {
```

## 定型パターン

該当する場合は次の形に従います。該当しない場合は書きません。

- 角丸がある場合は公開変数 `border_radius` と `radius_*` 修飾で切り替え、子は親の値を参照します。`radius_full` は `calc(<高さ> / 2)` にします (`--sui_combobox-border_radius: calc(var(--sui_combobox-min_height) / 2)`)。
- 枠線の有無切替がある場合は `固定` の線種 (`border-style: solid`、InputGroup / Popup は `&::after`) + `可変` の私的変数 + `代入` のトークン + `変異` の `-outlined` で有効化します。
- フォーカスリングがある場合は `focusring_width` / `focusring_color` / `focusring_offset` の 3 点を `可変` + `代入` + `変異` (`:focus-visible` / `:has(:focus-visible)` / `:focus-within`) で扱います。`outline-style: solid` は `固定` または `可変` に置きます。
- 文字がある場合は `font_family` / `font_size` / `font_weight` / `line_height` / `letter_spacing` / `color` を一式で持ちます。`line-height` プロパティー自体には `var(--sui_<部品>-line_height)` を直接指定します。`calc(<font_size> * <line_height>)` を使うのは、テキスト高さが必要な派生値 (`__svg-size` など) で `1lh` 相当を求めるときのみです。`1lh` は使いません。
- 色違い × 質感 (`color_*` × `variant_*`) がある場合はすべての組合せを列挙します。省略しません。
- `svg` がある場合は `svg:not(.sui-ignore)` にし、大きさと色を明示します。大きさは文字や箱に連動する `calc()` にします。色は `--sui-icon_color(<前景色>, <背景色>)` で計算します。状態で前景が変わる場合は私的変数経由で参照します。

```css
--sui_combobox_clear__svg-color: --sui-icon_color(
                                   var(--_sui_combobox_clear-color,
                                     var(--sui_combobox_clear-color-idle)
                                   ),
                                   var(--sui_combobox-background_color)
                                 );
```
- 適用外のクラスがある場合は `:not()` で除外します。
- 入力欄を内包するポップアップは `固定` で Grid 配置にし、`grid-template-areas` だけを私的変数で切り替えます (`--_sui_combobox_popup-areas`)。`inputPosition` と反転の組み合わせを `変異` に列挙します。
- スクロール範囲は `固定` の `height: fit-content` + `可変` の `max-height: min(var(--...), var(--available-height))` + `代入` の既定値 (`16em` など) にします。
- 末尾グループの区切り線は `固定` で消します (`.sui_combobox_group:last-child .sui_combobox_separator:last-child { display: none; }`)。グループ余白は `:not(:last-child):not(:has(> .sui_combobox_separator:last-child))` で調整します。
- 矢印の向きは `固定` の `rotate` で切り替え、位置は `可変` の `calc(size + 私的border)` で合わせます。表示は `変異` の `-outlined` で有効化します。

## 読み取り専用

- `readonly` は `@layer sui.overrides` の別ブロックにします。`sui.component` と `sui.important` の中間の優先度として使います。
- パーツ自身に `-readonly` クラスがある場合はパーツ起点のブロックにし、`&.sui_<パーツ>-readonly` で書きます。
- ルートの `-readonly` 状態に依存する場合や、パーツに `-readonly` クラスが無い場合は、ルート起点の例外ブロックにまとめます。他パーツの規則と混ぜず、そのパートのファイルにだけ書きます。
- 変数は使わず、生の `prop` と `-idle` トークンを直接書きます。無効になる要素すべてに `cursor: not-allowed` を付けます。

```css
/* readonly */
@layer sui.overrides {
@scope (.sui_combobox) to ([data-scope]) {

/* 削除ボタン自身に readonly クラスが無いため、ルート起点の別ブロックにします。 */
:scope {
  &.sui_combobox-readonly .sui_combobox_clear {
    color: var(--sui_combobox_clear-color-idle);
    cursor: not-allowed;
    background-color: var(--sui_combobox_clear-background_color-idle);
  }
}

} /* @scope */
} /* @layer */
```

## 無効状態

- 末尾に `@layer sui.important` ブロックを置きます。
- パーツ自身に `-disabled` クラスがある場合は、そのパーツ起点のブロックに `&.sui_<パーツ>-disabled` で書きます。パーツごとにブロックを分けて構いません。
- ルートの無効状態・外観に依存する場合や、パーツに `-disabled` クラスが無い場合は、ルート起点の例外ブロックにまとめます。他パーツの規則と混ぜず、そのパートのファイルにだけ書きます。
- 変数は使わず、生の `prop` と `var(--sui-disabled-*)` を直接書きます。
- `variant` があるパーツは `variant` ごとに書きます。`Chip`・`ChipRemove` は `variant_solid` / `variant_naked` / `variant_liquid` を全列挙し、`svg` の色も `--sui-icon_color()` で明示します。
- 無効になる要素すべてに `cursor: not-allowed` を付けます。

```css
/* disabled */
@layer sui.important {
@scope (.sui_combobox) to ([data-scope]) {

:scope {
  &.sui_combobox-disabled {
    cursor: not-allowed;
  }
}

} /* @scope */
} /* @layer */

/* disabled */
@layer sui.important {
@scope (.sui_combobox_input) to ([data-scope]) {

:scope {
  &.sui_combobox_input-disabled {
    cursor: not-allowed;
  }

  &.sui_combobox_input-disabled.sui_combobox_input-variant_naked {
    color: var(--sui-disabled-naked-canvas_text);

    &::placeholder {
      color: var(--sui-disabled-naked-canvas_text);
    }
  }
}

} /* @scope */
} /* @layer */

/* disabled */
/* ルートの無効状態と外観の組み合わせに依存し、アドオン自身に無効クラスが無いため、ルート起点の別ブロックにします。 */
@layer sui.important {
@scope (.sui_combobox) to ([data-scope]) {

:scope {
  &.sui_combobox-disabled.sui_combobox-variant_naked .sui_combobox_addon {
    color: var(--sui-disabled-naked-canvas_text);
    cursor: not-allowed;
  }
}

} /* @scope */
} /* @layer */
```

## 禁則

- `固定` に `var()` を書かない。`可変` に生の値を書かない。`代入` に生の `prop` を書かない。`変異` に公開変数への代入や生の `prop` を書かない。
- `変数` で宣言していない変数を参照・代入しない。ファイル内で宣言した変数に限ります。`filter`・`virtual` の宣言漏れを残さない。
- 私的変数 (`--_sui_...`) を `変異` 以外で代入しない。`Status:empty` のような私的代入も `変異` に置きます。
- 私的変数をフォールバックなしで参照しない。例: `var(--_sui_combobox-border_color, transparent)` のように書きます。
- `可変` で全体トークンを直接参照しない。例: `var(--sui-canvas-1)` や `var(--sui-radius-md)` は `代入` に書き、`可変` は自部品の変数を経由します。
- パーツごとにファイルと `@layer` + `@scope` ブロックを分ける。複数パーツを 1 ブロックにまとめない。パーツ名の見出しコメント (`/* Input */` など) は書かない (ファイル名が示すため)。バレルの CSS import 順序 (カスケード順) を変えない。原則はパーツ自身のクラス起点とし、祖先・兄弟依存の規則だけを理由コメント付きの例外ブロックに分けます。`[data-scope]` の下限の有無が異なるスタイルも、理由のコメント付きで別ブロックに分けます。分離するのは境界を跨ぐ宣言だけにし、適用する `可変` と `変異` はペアで移します。他パーツの私的変数を別ブロックの `変異` で代入しない。
- 祖先・兄弟・他パーツに依存する規則をパーツ起点のブロックに残さない。パーツ起点の `:scope + :scope` は一致しないため、ルート起点の例外にします。
- 状態クラスを子起点に分散させない。スタイル起点 (原則パーツ自身) に集約します (独立状態の子は例外)。
- 公開変数をパーツ要素で空宣言して、ルートで上書きされる代入値を遮蔽しない。ルートで受ける必要がある `変数` と `代入` はルート起点の例外にまとめます。
- 内包する別コンポーネントに意図的に優先させる規則から詳細度を落とさない。必要に応じて `&.sui_<パーツ>` で詳細度を上げるか、ルート起点の例外にします。
- 5 区分の順序を入れ替えない。
- 修飾の書き方を取り違えない。例: パーツ自身の修飾は `&.sui_combobox_input-size_sm`、ルート起点の例外での修飾は `&.sui_combobox-size_sm`、独立装飾の子自身は `.sui_combobox_chip-color_grey` (+ ネスト `&.sui_combobox_chip-variant_solid`) にします。
- 変数名・クラス名の綴りは `変数`・`可変`・`代入` で一致させる。例: 対応しない変数に代入しない。同一変数の重複宣言を残さない。
- 同一セレクターへの `代入` を重複させない。例: 同じ `&:has(...)` を二度書いて後の定義で上書きしない。
- 1 つの公開変数に複数の値を半角スペース区切りで代入しない。`padding_block_start` / `padding_block_end` のように変数を分けます。`padding` と `padding-inline` に同じ変数を重ねない。
- `svg` に素の `svg` セレクターを使わない。例: `svg:not(.sui-ignore)` にし、大きさと色を明示します。継承に任せない。
- インタラクティブな要素の状態名に `-idle` / `-hover` / `-active` 以外を使わない。デザインシステムの `-normal` / `-subtle` / `-strong` をそれぞれ割り当てます。フォーカス枠には `-focus_visible` を使います。
- `1lh` を使わない。`line-height` には変数を直接指定し、行の高さの計算が必要な派生値のみ `calc(<font_size> * <line_height>)` にします。
- `currentColor` を使わない。色は CSS 変数で明示します。
- (重要) 他パーツの変数を `可変` で直接参照しない。継承を強調する場合を除き、部品専用の変数を定義して `代入` で引き継ぎます。`Arrow` が `Popup` の値を `代入` で参照するのは許容します。
- 長いセレクターを 1 行に書かない。子孫の連なりは 1 つずつ改行して 1 段ずつ深く字下げし、カンマ区切りと関数引数は 1 つずつ改行します。
- インタラクティブな要素の `:hover` / `:active` / `:focus-visible` から `&:not(.sui_<基底>-disabled)` と `@media (any-hover: hover)` (hover) を外さない。`&:enabled` にしません。無効時に発火させないためです。
- `sui.component`・`sui.overrides`・`sui.important` 以外の層を使わない。`sui.overrides` を読み取り専用以外に使わない。`sui.important` を無効状態以外に使わない。
- `!important` を書かない。
