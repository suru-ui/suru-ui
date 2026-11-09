# Skill: css

# コンポーネント CSS

## 前提

テーマの `@function` (`--sui-space()`・`--sui-gap()`・`--sui-border_width()`・`--sui-corner_radius()`・`--sui-icon_color()` など) が利用できることを前提にします。`@function` のフォールバックは書きません。既存コードにも `@supports` / `@property` による関数フォールバックはありません。

基準となる実装は `packages/react/src/combobox/input-group/combobox.input-group.css`・`packages/react/src/tabs/root/tabs.root.css`・`packages/react/src/switch/root/switch.root.css` です。

## 全体構造

CSS はパートごとに `<パート>/<kebab>.<パート>.css` に分けます (例: `input-group/combobox.input-group.css`)。バレル (`<kebab>.parts.ts`) がパーツツリー順 (描画順) に import し、この順序がカスケード順になります。import の文順は自動整形でも変わりませんが、手でも並べ替えません。DOM を持たない Root の CSS は末尾に置きます。パーツ名の見出しコメント (`/* Input */` など) は書きません (ファイル名が示すため)。理由コメントと層マーカー (`/* disabled */`・`/* readonly */`) は残します。

```text
TriggerLabel → InputGroup → Input → Addon → Icon → Clear → Chips → Chip → ChipRemove → InputDisplay
→ Backdrop → Positioner → Popup → Arrow → Status → Empty → ScrollArea → Viewport
→ List → Group → GroupLabel → Item → ItemIndicator → Separator
→ (Root が DOM を持たない場合は Root の CSS を末尾)
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

- `@layer` は通常 `sui.component` です。読み取り専用は `sui.overrides`、無効状態・保留状態は `sui.important` を末尾に置きます。詳しくは `## 読み取り専用` と `## 無効状態` に従います。
- `@scope` の始点は原則そのパーツ自身の基底クラス (`Input` なら `.sui_combobox_input`、`Root` なら `.sui_combobox`) にします。終点は原則 `to ([data-scope])` です。
- 祖先・兄弟・他パーツに依存する規則や、パーツ自身を起点にできない規則だけを例外として祖先起点の別ブロックに分けます。詳しくは `### スコープ起点の選び方` と `### 例外ブロック` に従います。
- ブロック内はすべて `:scope { ... }` に書きます。`DrawerSwipeArea` のように方向ごとに複数の `:scope.<修飾>` を並べる場合は例外とし、理由コメントを付けます (`drawer/swipe-area/drawer.swipe-area.css` を参照)。
- `@layer` の閉じ括弧に `} /* @layer */` を付けます。`@keyframes` だけを包む層は、既存の `skeleton`・`status` のように閉じコメントを省略する場合があります。
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

- アニメーションの `@keyframes` は `sui_<コンポーネント>-<名前>` にし、パーツブロックの後ろに置きます。`@scope` の中には置かず、`@layer sui.component` の中か外にまとめます。状態による開始は `animation-name` を私的変数にして `変異` で切り替えます (`skeleton/root/skeleton.root.css`・`status/indicator/status.indicator.css` を参照)。

### スコープ起点の選び方

- パーツのブロックは、そのパーツの基底クラスを `@scope` の始点にします。`Root` は `.sui_combobox`、`Portal` は `.sui_combobox_portal`、`Input` は `.sui_combobox_input`、`TriggerLabel` は `.sui_combobox_trigger_label` です。
- 本文はパーツ自身とその子孫だけを表せるため、`:scope` はパーツ要素を指します。パーツ自身への宣言は `:scope { ... }`、自身の修飾は `:scope { &.sui_combobox_input-size_sm { ... } }`、子孫は `:scope { svg:not(.sui-ignore) { ... } }` のように書きます。
- パーツ自身が等価な状態クラスを持つ場合は、祖先を見ずに自身のクラスを使います。例: `.sui_combobox_item-highlighted` は `&.sui_combobox_item-highlighted` にします。
- `Portal` 自体は `ctx` の `size`・`radius` を `sui_combobox_portal-size_*`・`sui_combobox_portal-radius_*` として持ちますが、現行 CSS ではポップアップ側の `.sui_combobox_popup-size_*` を起点にしています。ポータル起点の例外が必要な場合は `&.sui_combobox_portal-size_sm` の形で受けます。
- パーツが別コンポーネント経由で描画され、そのコンポーネントが `data-scope` を持つ場合は、既存の起点と下限 (`### 下限の `:not()` 除外` / `### 例外スコープの分離`) を維持し、理由をコメントで残します。
- Root が DOM を持たずスタイル起点が子 (`InputGroup`・`Portal`・`TriggerLabel` など) の場合、その子のクラスを起点にします。クラス名は Root と同じ `sui_<コンポーネント>` になることがあります。

### 例外ブロック

パーツ起点では表せない規則は、祖先パーツ起点の別ブロックに残します。迷ったら例外に残します。

- 兄弟・位置に依存する規則 (`+`・`~`・`:first-child`・`:last-child`・`:nth-child` など) は、パーツを内包する祖先 (通常はルート) 起点にします。パーツ起点の `:scope + :scope` はスコープの外を指せないため一致しません。
- 祖先パーツの状態に依存し、パーツ自身に等価なクラスが無い規則は、祖先起点の例外にします。パーツ自身に等価なクラスがある場合は自身のクラスを使います。
- 複数パーツにまたがる規則や、公開変数を兄弟パーツと共有する規則は、ルート起点の例外にまとめます。
- 下限なしのブロックは、`select/item-indicator`・`toast/content`・`aspect-ratio/root` のように、内包先の `[data-scope]` を跨ぐ宣言だけに使います。
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

- `Popup` は入力グループを内包するため `to ([data-scope]:not(.sui_combobox))` にします。`Autocomplete` は `to ([data-scope]:not(.sui_autocomplete))`、`AvatarGroup` は `to ([data-scope]:not(.sui_avatar))` です。
- 他のパーツがボタンなどの `data-scope` 付き要素を内包する場合は、内包先のクラスを `:not()` で除外します。理由をブロック直上にコメントで残します。

```css
/* 入力グループが data-scope を持つため、スコープの下限値から除外します。 */
@layer sui.component {
@scope (.sui_combobox_popup) to ([data-scope]:not(.sui_combobox)) {
} /* @scope */
} /* @layer */
```

### 例外スコープの分離

子孫の `[data-scope]` を跨いで適用する必要がある宣言だけを、下限なしの別ブロックに分離します。
境界を跨がない宣言は元のブロックに残し、影響範囲を最小化します。下限の `:not()` 除外で届く場合は分離せず、`:not()` を使います。

- 分離するブロックには理由をコメントで注記します。
- 子が別コンポーネント経由で描画され、そのコンポーネントが `data-scope` を持つ場合は、パーツ自身のクラスを下限なしの起点にします (`collapsible/indicator/collapsible.indicator.css`・`tree/item/tree.item.css`・`toast/content/toast.content.css` を参照)。

```css
@layer sui.component {
@scope (.sui_select_item_indicator) to ([data-scope]) {

/* 固定 */
:scope {
  display: inline-flex;
}

/* 変数 */
:scope {
  --sui_select_item_indicator-opacity: ;
}

/* 可変 */
:scope {
  opacity: var(--_sui_select_item_indicator-opacity, var(--sui_select_item_indicator-opacity));
}

/* 代入 */
:scope {
  --sui_select_item_indicator-opacity: 1;
}

} /* @scope */
} /* @layer */

/* 項目の選択状態に依存し、表示要素自身に等価なクラスが無いため、ポータル起点の別ブロックにします。 */
@layer sui.component {
@scope (.sui_select_portal) {

/* 変異 */
:scope {
  .sui_select_item:not(.sui_select_item-selected) .sui_select_item_indicator {
    --_sui_select_item_indicator-opacity: 0;
  }
}

} /* @scope */
} /* @layer */
```

## 5 区分

`:scope` は次の順で置きます。1 区分に `:scope` は 1 つだけ置きます。

- 使わない区分は省略します。例: `combobox/list` は `固定` のみです。`TabsList`・`SegmentsList` のように `変数`・`可変`・`代入` を持つ一覧パーツもあります。`Backdrop` は `変異` を持つ場合があります。
- 省略しても順序は変えません。例外として `combobox/popup`・`autocomplete/popup` は、ポータル連携の `変数`・`代入` を先に置いたあと、本体を `固定` → `可変` → `変数` → `代入` → `変異` の順で書いています。既存の例外を踏襲し、新設では原則の順にします。

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

### 既存の例外

現行コードには、区分の原則から外れた箇所があります。新しい実装では原則に従い、同様の例外を増やす場合は理由をコメントに残します。

- `drawer/popup/drawer.popup.css` の `overflow` は `固定` で私的変数を参照しています。
- `alert-dialog/icon/alert-dialog.icon.css` はヘッダー起点の `固定` ブロックで公開変数を参照しています。
- `card/action/card.action.css` は `変異` で公開変数を代入しています。
- `combobox/popup/combobox.popup.css` の `input_position` による `--_sui_...-direction` は `代入` で代入しています。
- `button/root/button.root.css` の `&.sui_button-item[data-highlighted]` は理由コメントなしで Base UI の `data-*` を参照しています。
- `button/root/button.root.css`・`button/addon/button.addon.css`・`button/content/button.content.css` は `pending` 状態を `sui.important` に置いています。

## 命名

### クラス名

- 基底は `sui_<コンポーネント>_<パーツ>` の snake_case です (`sui_combobox_input`、`sui_combobox_group_label`)。
- Root / Portal 自体はパーツ名なしです (`sui_combobox`、`sui_combobox_portal`)。Root が DOM を持たない場合、入力系の基底は `sui_combobox` (InputGroup 要素)、ポップアップ系の修飾受けは `sui_combobox_portal` になります。
- 値を持つ修飾は `sui_<基底>-<属性>_<値>` です。ハイフン 1 つで属性、`_` 1 つで値にします。
- 真偽値の修飾は値なしです。例: `sui_combobox-outlined`、`sui_combobox_popup-outlined` です。
- 属性名・状態名が複数語になる場合は snake_case にします。例: `sui_combobox-popup_side_top`、`sui_combobox-list_empty`、`sui_menu_popup-transition_status_starting`、`sui_tabs-active_variant_liquid`、`sui_tabs-tab_activation_direction_left`、`sui_drawer_popup-swipe_direction_down`、`sui_menubar-has_submenu_open`。
- 状態はパーツの接尾に付けます。例: `sui_combobox_item-disabled`、`sui_combobox_item-selected`、`sui_combobox_item-highlighted`、`sui_combobox_trigger_label-disabled` です。3 値の `valid` は `sui_combobox-invalid` / `sui_combobox-valid` / `sui_combobox-unverified` にします。`popupSide` は `sui_combobox-popup_side_top` のようにスネーク化します。
- 例: `sui_combobox-size_sm`、`sui_combobox-variant_naked`、`sui_combobox-radius_md`、`sui_combobox_popup-input_position_top`、`sui_combobox_chip-color_blue`、`sui_combobox_popup-size_sm`。
- 独立装飾を持つ子 (`Chip`・`ChipRemove`) の修飾は子要素自身に付けます (`.sui_combobox_chip-color_grey` + ネスト `&.sui_combobox_chip-variant_solid`)。起点自身の `&.` と取り違えません。

### 公開変数 `--sui_...`

- 形式は `--sui_<基底>-<属性>(-<状態>)?(__<内側>-<属性>)?` です。
- 状態で値が変わる属性だけ `-状態` を付けます。例: `--sui_combobox_clear-color-hover`、`--sui_switch-canvas-idle-checked` です。変わらない属性には付けません。例: `--sui_combobox_chips-row_gap` です。フォーカス枠は `-focus_visible` を使います (例: `--sui_combobox-border_color-focus_visible`)。
- 状態の語彙はクラス名と同じにします。`-idle` / `-hover` / `-active` / `-checked` / `-invalid` / `-open` / `-closed` など、実際に切り替わる状態だけを使います。インタラクティブな要素の基本状態は `-idle` / `-hover` / `-active` にし、デザインシステムの `-normal` / `-subtle` / `-strong` をそれぞれ割り当てます。

```css
&.sui_combobox-variant_naked {
  --sui_combobox_clear-color-idle: var(--sui-grey-naked-canvas_text-normal);
  --sui_combobox_clear-color-hover: var(--sui-grey-naked-canvas_text-subtle);
  --sui_combobox_clear-color-active: var(--sui-grey-naked-canvas_text-strong);
}
```

- 部品内の要素だけ `__<内側>` を付けます。例: `--sui_badge__svg-size`、`--sui_button__svg-stroke_width` です。それ以外には付けません。
- `-virtual_` は、実際の要素の寸法ではなく計算用の仮想値に付けます。`prop` に直接適用する場合もあります (`--sui_badge-virtual_text_height`・`--sui_combobox_popup-virtual_padding_block` を参照)。
- `変数` 区分では空宣言 (`: ;`) します。利用者による変異点として列挙するのが目的です。`filter`・`virtual` を含め、参照・代入するすべての公開変数を宣言します。
- `変数` の宣言順は `mise run format:style` (`sort-css-variables`) が整えます。手で並べ替えません。CSS プロパティーを判定できた変数は CSS プロパティー順 (stylelint-config-recess-order) に、判定できない変数は `idle` → `hover` → `active` → `checked` の固定順と名前順に並びます。固定順が常に適用されるわけではありません。
- 角丸を持つ場合は `border_radius` と `corner_shape` の関係を意識します。`--sui-corner_radius()` と `superellipse(var(--sui-superellipse))` を使うコンポーネントは、既定の `代入` か各 `radius_*` で `corner_shape` を設定します。単純な pill / circle (`999px`・高さの半分) や、`radius` 修飾で形状が変わらないコンポーネントは `corner_shape` を省略できます。

### 私的変数 `--_sui_...`

- 先頭に `_` を 1 つ付けます (`--_sui_combobox_clear-color`)。
- `可変` で `var(--_sui_x, <フォールバック>)` として参照し、`変異` でだけ代入します。
- フォールバックは次から選びます。色は `transparent`、幅・高さは `0px`、位置は `unset`、余白は `auto` です。`-idle` がある属性は公開変数の `-idle` にします。

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
  &:not(.sui_combobox_clear-disabled) {
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
- 例: `position`、`display`、`flex` / `grid`、`overflow`、`cursor`、`touch-action`、`border-style`、`outline-style`、`line-break`、`corner-shape` の初期値などです。これらのプロパティーが `可変` で使えないわけではありません。
- `corner-shape` を修飾で切り替える場合は、`固定` に `superellipse(...)` を直書きせず、`可変` で変数を適用し、`代入` で値を入れます。

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
  border-radius: var(--sui_combobox-border_radius);
  corner-shape: var(--sui_combobox-corner_shape);

  svg:not(.sui-ignore) {
    width: var(--sui_combobox_clear__svg-size);
    height: var(--sui_combobox_clear__svg-size);
    color: var(--sui_combobox_clear__svg-color);
  }
}
```

- 間隔は用途で関数を使い分けます。`gap` には `--sui-gap()`、余白・大きさには `--sui-space()` を基本とします。角丸は `--sui-corner_radius()`、枠線幅は `--sui-border_width()`、SVG の色は `--sui-icon_color()`、明暗の切替は `--sui-light-dark()` を使います。`--sui-rem()` はテーマ定義にありますが、コンポーネントでは使いません。

### 代入

- 規則: 公開変数への代入と修飾クラス分岐を書きます。生の `prop` は書きません。
- 規則: 値はデザイントークンや動的関数を使います。`--sui-space()` / `--sui-gap()` / `--sui-border_width()` / `--sui-corner_radius()` / `--sui-icon_color()` を使います。
- 規則: 1 つの公開変数には 1 つの値だけを代入します。ショートハンドに複数値をまとめず、ロングハンドごとに変数を分けます (`padding_block` を `padding_block_start` / `padding_block_end` に分ける場合を除き、`padding` と `padding-inline` に同じ変数を重ねません)。
- 規則: 修飾対象で分岐の書き方を使い分けます。起点自身は `&.`、起点が Portal で対象が子孫の場合は `:scope` 内の子孫セレクター、独立装飾の子自身は `.sui_<子>-<属性>_<値>` (+ ネスト `&.sui_<子>-variant_*`) にします。
- 規則: 分岐は既定値の後に `size` → `radius` → `color` / `variant` の順に置きます。`color × variant` の組み合わせは省略せず全列挙します。

```css
&.sui_combobox-size_sm {
  --sui_combobox-padding_inline: --sui-space(2);
}

&.sui_combobox-radius_md {
  --sui_combobox-border_radius: --sui-corner_radius(2);
  --sui_combobox-corner_shape: superellipse(var(--sui-superellipse));
}

&.sui_combobox-variant_naked {
  --sui_combobox-background_color: var(--sui-grey-naked-canvas-normal);
}
```

- 角丸は `radius_none` / `radius_sm` / `radius_md` / `radius_lg` / `radius_full` / `radius_circle` を、コンポーネントが持つ値だけ定義します。`radius_sm`〜`lg` はコンポーネントの段階に合わせた `--sui-corner_radius(<段階>)` を使います。`radius_full` はコンポーネントごとの「最大の丸み」で、入力系・バッジは `calc(<高さ> / 2)` + `superellipse`、ポップアップは `--sui-corner_radius(<段階>)` + `superellipse`、ラジオ・スライダーのつまみは `calc(<高さ> / 2)` + `none` のように定義します。`radius_circle` は完全な円形で、高さの半分 + `none` が基本ですが、ポップアップのように `--sui-corner_radius(<段階>)` + `none` を使う場合があります。`radius_none` は `border_radius: 0px` だけを代入し、`corner_shape` は既定のままにします。

```css
&.sui_badge-radius_full {
  --sui_badge-border_radius: calc(var(--sui_badge-min_size) / 2);
  --sui_badge-corner_shape: superellipse(var(--sui-superellipse));
}

&.sui_badge-radius_circle {
  --sui_badge-border_radius: calc(var(--sui_badge-min_size) / 2);
  --sui_badge-corner_shape: none;
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

- 例: 起点が Portal で修飾対象が子孫の場合は、子孫セレクターで受けます。ポップアップの `size` はポップアップ自身の修飾クラスで受けます。

```css
&.sui_combobox_popup-size_sm {
  --sui_combobox_popup-virtual_padding_block: --sui-space(calc(1.5 / 2));
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

- 例: `@function` はテーマで定義済みの前提です。コンポーネント CSS ではフォールバックを書きません。

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

- 例: 入力状態・アウトラインによる切替です。

```css
&:has(.sui_combobox_input:focus-visible) {
  --_sui_combobox-outline_width: var(--sui_combobox-focusring_width);
}

&.sui_combobox-outlined {
  --_sui_combobox-border_color: var(--sui_combobox-border_color-idle);
  --_sui_combobox-border_width: var(--sui_combobox-border_width-idle);

  @media (any-hover: hover) {
    &:hover {
      --_sui_combobox-border_color: var(--sui_combobox-border_color-hover);
    }
  }

  &:focus-within {
    --_sui_combobox-border_color: var(--sui_combobox-border_color-focus_visible);
  }
}
```

- 例: 入力欄の配置切替 (`input_position`) は、既存の `combobox/popup` では `代入` に置いています (`--_sui_combobox_popup-direction`)。状態変化ではない静的な修飾なので、`変異` ではなく `代入` にまとめます。

- 例: 空状態の切替です。`Status` は読み上げ維持のため空でも非表示にせず、私的変数で高さを消します。`Empty` は `固定` の `:empty { display: none; }` で消します。

```css
.sui_combobox_status:empty {
  --_sui_combobox_status-min_height: 0px;
}
```

- インタラクティブな要素 (`button`、`a`、単体で操作できる chip など) の `:hover` / `:active` / `:focus-visible` は無効時に発火させません。パーツ自身の `-disabled` クラスがある場合は `&:not(.sui_<基底>-disabled)` 配下に、ネイティブの `disabled` がそのまま効く `button` などは `&:enabled` 配下に置きます。`Chip` のように `&:is(button, a[href]):not(:disabled)` を使う場合もあります。hover だけは `@media (any-hover: hover)` で囲みます。同じパーツ内で `&:enabled` と `&:not(.-disabled)` を混在させません。

```css
&:not(.sui_combobox_clear-disabled) {
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

```css
/* ネイティブ button は `:enabled` で無効状態を判定します。 */
&:enabled {
  @media (any-hover: hover) {
    &:not(.sui_segments_item-active):hover {
      --_sui_segments_item-color: var(--sui_segments_item-color-hover);
    }
  }

  &:focus-visible {
    --_sui_segments_item-outline_width: var(--sui_segments_item-focusring_width);
  }
}
```

- フォーカス起点が子孫の場合は `&:has(.sui_combobox_input:focus-visible)` や `&:focus-within` で受けます。
- アニメーションを持つ場合は `@media (prefers-reduced-motion: reduce)` で遷移時間を `0ms` または `none` にすることを検討します。現行では `tabs/indicator`・`segments/indicator`・`accordion/content` が対応しています。

```css
@media (prefers-reduced-motion: reduce) {
  --_sui_tabs_indicator-transition: none;
}
```

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

- 角丸がある場合は公開変数 `border_radius` と `corner_shape` を持ち、`radius_*` 修飾で切り替えます。`--sui-corner_radius()` と `superellipse(var(--sui-superellipse))` を使う場合は、既定の `代入` か各 `radius_*` で `corner_shape` を設定します。`radius_full` は「最大の丸み」としてコンポーネントごとに定義し、`radius_circle` は `corner_shape: none` にする指定です (`calc(<高さ> / 2)` で円形にする場合と、ポップアップのように `--sui-corner_radius(...)` で円弧角にする場合があります)。単純な pill / circle や形状が変わらないコンポーネントは `corner_shape` を省略できます。子が親の角丸を引き継ぐ場合は `border_radius` と `corner_shape` の両方を参照します。
- 枠線の有無切替がある場合は `固定` の線種 (`border-style: solid`、InputGroup / Popup は `&::after`) + `可変` の私的変数 + `代入` のトークン + `変異` の `-outlined` で有効化します。枠線幅は `--sui-border_width()` を使います。
- フォーカスリングがある場合は `focusring_width` / `focusring_color` / `focusring_offset` の 3 点を `可変` + `代入` + `変異` (`:focus-visible` / `:has(:focus-visible)` / `:focus-within`) で扱います。`outline-style: solid` は `固定` または `可変` に置きます。
- 文字がある場合は `font_family` / `font_size` / `font_weight` / `line_height` / `letter_spacing` / `color` を一式で持ちます。`line-height` プロパティー自体には `var(--sui_<部品>-line_height)` を直接指定します。`calc(<font_size> * <line_height>)` を使うのは、テキスト高さが必要な派生値 (`__svg-size`・`virtual_text_height` など) で `1lh` 相当を求めるときのみです。`1lh` は使いません。
- 色違い × 質感 (`color_*` × `variant_*`) がある場合はすべての組合せを列挙します。省略しません。`variant` が `ColorTemplate` (`solid` / `naked` / `liquid`) と一致する場合は、その 3 つを全列挙します。
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
- 入力欄を内包するポップアップは `固定` で Flex 配置にし、`flex-direction` だけを私的変数で切り替えます (`--_sui_combobox_popup-direction`)。`input_position` と反転 (`side_top`) の組み合わせを `代入` に列挙します (`combobox/popup/combobox.popup.css` を参照)。
- スクロール範囲は `固定` の `height: fit-content` + `可変` の `max-height: min(var(--...), var(--available-height))` + `代入` の既定値 (`16em` など) にします。
- 末尾グループの区切り線は `固定` で消します (`.sui_combobox_group:last-child .sui_combobox_separator:last-child { display: none; }`)。グループ余白は `:not(:last-child):not(:has(> .sui_combobox_separator:last-child))` で調整します。
- 矢印の向きは `固定` の `rotate` で切り替え、位置は `可変` の `calc(size + 私的border)` で合わせます。表示は `変異` の `-outlined` で有効化します。
- レスポンシブな値は `代入` の `@media` で公開変数を上書きするのが基本です。`固定` の構造値 (`text-align` など) を切り替える場合は `固定` に直接書く例もあります (`drawer/header/drawer.header.css`・`drawer/popup/drawer.popup.css` を参照)。既存のブレークポイント (`640px`・`768px` など) に合わせます。
- 状態を CSS だけで判定できず、外部ライブラリや内包先の Base UI が `data-*` を出す場合だけ、理由コメント付きで属性セレクターを使います (`resizable/handle/resizable.handle.css` の `[data-separator]`、`button/root/button.root.css` の `[data-highlighted]` を参照)。

## 読み取り専用

- `readonly` は `@layer sui.overrides` の別ブロックにします。`sui.component` と `sui.important` の中間の優先度として使います。
- パーツ自身に `-readonly` クラスがある場合はパーツ起点のブロックにし、`&.sui_<パーツ>-readonly` で書きます。
- ルートの `-readonly` 状態に依存する場合や、パーツに `-readonly` クラスが無い場合は、ルート起点の例外ブロックにまとめます。他パーツの規則と混ぜず、そのパートのファイルにだけ書きます。
- 私的変数や代入は使わず、公開変数の `-idle` を直接参照します。無効になる要素すべてに `cursor: not-allowed` を付けます。

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

- 末尾に `@layer sui.important` ブロックを置きます。無効状態に加え、`Button` の `pending` のような操作を止める保留状態もここに置きます (`button/root/button.root.css`・`button/addon/button.addon.css` を参照)。
- パーツ自身に `-disabled` クラスがある場合は、そのパーツ起点のブロックに `&.sui_<パーツ>-disabled` で書きます。パーツごとにブロックを分けて構いません。
- ルートの無効状態・外観に依存する場合や、パーツに `-disabled` クラスが無い場合は、ルート起点の例外ブロックにまとめます。他パーツの規則と混ぜず、そのパートのファイルにだけ書きます。
- 私的変数への代入は原則行わず、生の `prop` と `var(--sui-disabled-*)` を直接書きます。`Button` の `--_sui_button-border_width` のような無効時の例外は、既存の実装に合わせて理由を残します。
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

- `固定` に `var()` を書かない。`可変` に生の値を書かない。`代入` に生の `prop` を書かない。`変異` に公開変数への代入や生の `prop` を書かない。既存の例外は `### 既存の例外` を参照し、新設しません。
- `変数` で宣言していない変数を参照・代入しない。参照する公開変数は、そのファイルの `変数` か、継承元の祖先パーツで宣言されたものに限ります。兄弟パーツの公開変数を `可変` で直接参照しません。現行コードには宣言漏れ (`combobox/item-indicator` の `line_height`、`combobox/addon` の `line_height`、`card/action` の `position` など) がありますが、新規では `変数` に漏れなく宣言します。
- 私的変数 (`--_sui_...`) を `変異` 以外で代入しない。`Status:empty` のような私的代入も `変異` に置きます。既存の例外は `### 既存の例外` を参照し、新設しません。
- 私的変数をフォールバックなしで参照しない。例: `var(--_sui_combobox-border_color, transparent)` のように書きます。
- `可変` で全体トークンを直接参照しない。例: `var(--sui-canvas-1)` や `var(--sui-radius-md)` は `代入` に書き、`可変` は自部品の変数を経由します。
- 角丸を持つパーツで `border_radius` と `corner_shape` を扱う場合、既定の `代入` と形状が変わる修飾の関係を崩さない。`radius_sm`〜`lg` と `radius_full` はコンポーネントの定義に従い、`radius_circle` は `corner_shape: none` にします。単純な pill / circle や形状が変わらないコンポーネントでは `corner_shape` を省略できます。
- パーツごとにファイルと `@layer` + `@scope` ブロックを分ける。複数パーツを 1 ブロックにまとめない。パーツ名の見出しコメント (`/* Input */` など) は書かない (ファイル名が示すため)。バレルの CSS import 順序 (カスケード順) を変えない。原則はパーツ自身のクラス起点とし、祖先・兄弟依存の規則だけを理由コメント付きの例外ブロックに分けます。`[data-scope]` の下限の有無が異なるスタイルも、理由のコメント付きで別ブロックに分けます。分離するのは境界を跨ぐ宣言だけにし、適用する `可変` と `変異` はペアで移します。他パーツの私的変数を別ブロックの `変異` で代入しない。
- 祖先・兄弟・他パーツに依存する規則をパーツ起点のブロックに残さない。パーツ起点の `:scope + :scope` は一致しないため、ルート起点の例外にします。
- 状態クラスを子起点に分散させない。スタイル起点 (原則パーツ自身) に集約します (独立状態の子は例外)。
- 公開変数をパーツ要素で空宣言して、ルートで上書きされる代入値を遮蔽しない。ルートで受ける必要がある `変数` と `代入` はルート起点の例外にまとめます。
- 内包する別コンポーネントに意図的に優先させる規則から詳細度を落とさない。必要に応じて `&.sui_<パーツ>` で詳細度を上げるか、ルート起点の例外にします。
- 5 区分の順序を入れ替えない。既存の `combobox/popup`・`autocomplete/popup` の例外は踏襲し、新設しません。
- 修飾の書き方を取り違えない。例: パーツ自身の修飾は `&.sui_combobox_input-size_sm`、ルート起点の例外での修飾は `&.sui_combobox-size_sm`、独立装飾の子自身は `.sui_combobox_chip-color_grey` (+ ネスト `&.sui_combobox_chip-variant_solid`) にします。
- 変数名・クラス名の綴りは `変数`・`可変`・`代入` で一致させる。例: 対応しない変数に代入しない。同一変数の重複宣言を残さない。
- 同一セレクターへの `代入` を重複させない。例: 同じ `&:has(...)` を二度書いて後の定義で上書きしない。
- 1 つの公開変数に複数の値を半角スペース区切りで代入しない。`padding_block_start` / `padding_block_end` のように変数を分けます。`padding` と `padding-inline` に同じ変数を重ねない。
- `svg` に素の `svg` セレクターを使わない。例: `svg:not(.sui-ignore)` にし、大きさと色を明示します。継承に任せません。
- インタラクティブな要素の状態名に `-idle` / `-hover` / `-active` 以外を使わない。デザインシステムの `-normal` / `-subtle` / `-strong` をそれぞれ割り当てます。フォーカス枠には `-focus_visible` を使います。状態クラス名は複数語を snake_case にします。
- `1lh` を使わない。`line-height` には変数を直接指定し、行の高さの計算が必要な派生値のみ `calc(<font_size> * <line_height>)` にします。
- `currentColor` を使わない。色は CSS 変数で明示します。
- (重要) 他パーツの変数を `可変` で直接参照しない。継承を強調する場合を除き、部品専用の変数を定義して `代入` で引き継ぎます。`Arrow` が `Popup` の値を `代入` で参照するのは許容します。他パーツの私的変数を別ブロックの `変異` で代入する例 (`combobox/popup` の `--_sui_combobox_input-padding_inline`) は例外です。理由コメントを残すことが望ましいですが、現行はコメントなしです。
- 長いセレクターを 1 行に書かない。子孫の連なりは 1 つずつ改行して 1 段ずつ深く字下げし、カンマ区切りと関数引数は 1 つずつ改行します。
- インタラクティブな要素の `:hover` / `:active` / `:focus-visible` から無効時のガードと `@media (any-hover: hover)` (hover) を外さない。無効時に発火させないためです。ネイティブの `disabled` が効く要素は `&:enabled`、独自の `-disabled` クラスを持つ要素は `&:not(.sui_<基底>-disabled)`、`Chip` のように子の操作要素を持つ場合は `&:is(button, a[href]):not(:disabled)` を使います。同じパーツ内で混在させません。
- `sui.component`・`sui.overrides`・`sui.important` 以外の層を使わない。`sui.overrides` を読み取り専用以外に使わない。`sui.important` を無効状態・保留状態以外に使わない。
- Base UI の `data-*` 属性を状態セレクターに使わない。使えるのは `[data-scope]` と、内包先・外部ライブラリの都合でクラスを付けられない場合の理由コメント付き例外だけです。
- `@property` を通常の変数宣言に使わない。`@function` は常に利用できる前提なので、フォールバックのためにも使いません。
- `@supports` は機能検出にだけ使い、`@function` のフォールバックには使いません。
- `!important` を書かない。
