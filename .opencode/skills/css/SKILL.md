# Skill: css

## CSS のコーディングスタイル

対象は `packages/react/src/**/*.css` のコンポーネントスタイルです。基準となる実例は `packages/react/src/accordion/accordion.css` と `packages/react/src/button/button.css` です。このスキルと実例が矛盾するときは、このスキルの記述を優先します。このスキルの目的は、誰が書いても同じ CSS になることです。

### ツールと自動整形

CSS の整形は `packages/react` ディレクトリーでの `mise run format` が担当します。

禁止:

- 通常のプロパティーや CSS 変数の並び順を手動で整えること (自動整形に任せる)。

### レイヤーと @scope

- ファイルはパーツごとにセクションへ分け、各セクションを `@layer sui.component` ブロックで包みます。さらにブロックの中を `@scope (.sui_<component>) to ([data-scope])` で包みます。同じレイヤー名のブロックは複数置けます。

```css
/* Root */
@layer sui.component {
@scope (.sui_button) to ([data-scope]) {

/* 変数 */
:scope {
  /* ... */
}

} /* @scope */
} /* @layer */
```

- `@layer` と `@scope` の行、および `} /* @scope */` と `} /* @layer */` の行はインデントしません (すべて列 0)。ブロック内のルールもインデントを深くしません。
- 閉じ括弧には `/* @scope */` と `/* @layer */` のコメントを付けます。
- `@scope` の対象はルートクラス 1 つです。`to ([data-scope])` により、ネストした別コンポーネント (子の中に置かれた別の Suru UI コンポーネント) の内部へスタイルが漏れるのを防ぎます。対応する Root パーツは、ルート要素に `data-scope=""` を付ける必要があります (`../new-component/SKILL.md` 参照)。
- ルート自身のスタイルは `:scope { ... }` に直接書き、子パーツは `:scope { .sui_button_content { ... } }` のようにネストして選択します。
- レイヤーの優先順位は `packages/theme/src/layers.css` で宣言されています。`sui.important` は `sui.component` より後にあります。
- 状態クラス (例: `sui_button-pending`, `sui_button-disabled`) の強制上書きは、ファイル末尾の `@layer sui.important` ブロックにまとめます。このブロックも `@scope` で包みます。
- 禁止: レイヤー名を誤記しない (`sui.importnant` は禁止。正しい名前は `sui.important`)。
- 禁止: `sui.important` ブロックをファイルの途中に置かない。常にすべての `sui.component` ブロックが閉じた後に置きます。

### セクション構成

パーツごとのセクションには見出しコメントを付けます。見出しは英語のパーツ名で `/* Root */` の形にします。セクションの並びはコンポーネントのパーツツリー順です。ボタンの例では Root → Content → Pending → CircularProgressTrack → CircularProgressFill の順です。

セクション内では同じセレクターを複数のルールに分け、ルールの直前にルール名のコメントを付けます。ルールの順序とコメントは次の通りです。

1. `/* 変数 */` — 公開カスタムプロパティー `--sui_<component>-*` を列挙する目録です。後に「既定値」で代入される変数の目録です。
2. `/* 静的 */` — カスタムプロパティーを参照しない固定スタイルです。
3. `/* 動的 */` — カスタムプロパティーを `var()` で参照するスタイルです。
4. `/* 既定値 */` — 修飾クラスごとに公開変数へ既定値を代入します。派生変数の定義もここに置きます。
5. `/* 上書き */` — 状態 (`:hover`, `:active`, `:focus-visible`) と修飾クラスで private 変数へ代入します。

省略規則:

- 省略したルールを飛ばしても、残ったルールの順序は変わりません。例: 変数 → 静的 → 動的 → 既定値 → 上書き。
- 「動的」が存在するのに「変数」が存在することはほとんどありません。基本的に「動的」は「変数」の宣言を参照するためです。

禁止:

- セクション見出しをパーツ名以外にする (`/* root */`, `/* Root part */` など)。
- セクション見出しを日本語にする。
- パーツツリー順を崩す。
- ルール名のコメントに語を足さない (`/* 変数の既定値 */`、`/* 既定値設定: ここから */` などは禁止。正式名称は上の一覧のまま)。
- 複数のルールが 1 つのルール名コメントに続く場合、そのコメントは先頭のルールの直前に 1 つだけ置きます (通常はルール名コメント 1 つに `:scope { ... }` ルール 1 つを対応させます)。

### コメントと空行

空行の有無はコメントの種類で決まります。

- ルール同士は空行 1 行で区切ります。
- `/* 変数 */`, `/* 静的 */`, `/* 動的 */`, `/* 既定値 */`, `/* 上書き */` の直後には空行を置かず、すぐルールを書きます。
- セクション見出し (`/* Root */`) の直後には空行を置かず、すぐ `@layer` ブロックを開きます。
- `@scope (.sui_<component>) to ([data-scope]) {` の直後には空行を 1 行置きます。
- `} /* @scope */` の直前には空行を 1 行置きます。`} /* @scope */` と `} /* @layer */` の間には空行を置きません。
- `} /* @layer */` と次のセクション見出しの間には空行を 1 行置きます。
- ファイルの末尾は 1 つの改行で終わります。

禁止:

- `/* 変数 */` や `/* 静的 */` とその直後のルールの間に空行を入れる。
- ルール同士を空行なしで続ける。
- ファイルの末尾に空行を重ねる。

### 色系変数の状態サフィックス

背景・枠線・前景などの色変数は、状態をサフィックスで区別します。サフィックスは部品が必要とするものだけを使い、部品内で語形を統一します。

- インタラクション: `normal` → `hover` → `active` → `focus_visible` の順に並べます (例: `--sui_button-background_color-normal` / `-hover` / `-active`)。
- フォーム検証: `invalid` (例: `--sui_input-border_color-invalid`)。
- 選択・無効などの部品固有状態: `checked`, `indeterminate`, `disabled` など。語形は部品内で統一します。

禁止

- 同一部品内でサフィックスの語形を混在させる (`subtle` と `hover` を併用するなど)。

### クラス命名

- パーツクラスは `sui_<component>_<part>` です。例: `sui_button_content`。
- 修飾子は `sui_<component>-<prop>_<value>` です。単語は `_` で区切り、コンポーネント名とプロパティー名は `-` で区切ります。例: `sui_button-size_sm`, `sui_button-color_red`, `sui_button-variant_solid`。
- ブール値の修飾子は `sui_<component>-<prop>` です。例: `sui_button-muted`, `sui_button-outlined`, `sui_accordion-separator`。
- 状態クラスは `sui_<component>-<state>` です。例: `sui_button-pending`, `sui_button-disabled`。パーツ単位の状態は `sui_<component>_<part>-<state>` です。例: `sui_button_pending-overlay`, `sui_accordion_item-open`, `sui_accordion_content-transition_status_starting`。
- Base UI 由来の状態は data 属性セレクターで受けて、Suru UI 固有の状態クラスへ反映します (実装側では `(state) => state.disabled && "sui_accordion-disabled"` のように render props で付与)。
- スタイルを無効化する脱出ハッチが必要な場合は `sui_<component>_<part>-unstyled` のようなクラスを付け、スタイル側は `:not(.sui_accordion_trigger-unstyled)` の形で除外します。
- 禁止: セパレーターを混同する (`sui_button-size-sm` のように `-` だけで区切る、`sui_button_size_sm` のように `_` だけにする)。

### カスタムプロパティー命名

- 公開変数は `--sui_<component>-<prop>` です。プロパティー名の単語区切りは `_` です。例: `--sui_button-background_color`。
- コンポーネント内部の上書き用変数は先頭に `_` を付けます。例: `--_sui_button-background_color`。
- 子パーツが読む変数は `--sui_<component>_<part>-<prop>` の形にし、宣言セレクターはルート (`:scope`) です。例: `--sui_button_content-gap`。
- 派生変数 (例: `--sui_button-padding_block`) は「既定値」で計算式とともに定義します。
- 目録 (`/* 変数 */`) の宣言は原則として空の値 (`--sui_button-min_height: ;`) です。既定値が固定の変数は、目録に値付きで宣言してもかまいません (例: `--sui_button_content-active-scale: 0.98;`)。
- 補助的な変数は、目録に載せずに「既定値」で直接定義してもかまいません (例: `--sui_accordion_content-letter_spacing`)。

禁止:

- 目録に載せた公開変数を「既定値」で代入し忘れる。
- 目録に private 変数を載せる。
- 「既定値」以外で派生変数を定義する。
- 公開変数と private 変数の `_` の数を間違える (private は先頭に 1 個だけ)。
- `--sui_*` や `--_sui_*` の接頭辞を持たない変数を参照する (`--accordion-panel-height` のような名前は作らない。接頭辞を付けた公開変数を「既定値」で定義してから参照する)。

### 変数の参照

- 値を参照するときは常に `var()` を使います。テーマトークンも同じです。例: `var(--sui-size-sm)`, `var(--sui-focusring_color)`。
- ユーティリティー関数トークンは `var()` を付けずに呼び出します。例: `--sui_button-padding_inline: --sui-space(4);`。関数の定義は `packages/theme/src/utilities.css` にあります。
- private 変数の参照にはフォールバックを付けます。フォールバックは公開変数か既定の計算式です。例: `var(--_sui_button-background_color, var(--sui_button-background_color-normal))`。
- フォールバックには、必ず実在する変数か、既定値として定義済みの値を書きます。`auto` のような既定値を書くときは、「既定値」で公開変数に代入してから `var()` で参照します。
- 公開変数を参照するだけの場合はフォールバックを付けません。例: `min-height: var(--sui_button-min_height);`。
- 状態の上書きは private 変数への代入で行い、「動的」ルールがその変数を参照します。

禁止:

- テーマトークンを `var()` なしで書く。
- ユーティリティー関数トークンを `var()` で包む。
- 「動的」セクションの宣言にリテラル値を書く。「動的」の値はすべて `var()` 参照です。
- private 変数の参照にフォールバックを付け忘れる。

### アイコン

- SVG アイコンのサイズと色は、`svg:not(.sui-ignore)` セレクターで変数化します。`sui-ignore` クラスを付けた SVG は対象外です (利用者が自前でサイズを指定できる抜け道です)。

```css
/* 動的 */
:scope {
  .sui_button_content {
    svg:not(.sui-ignore) {
      width: var(--sui_button_content_icon-size);
      height: var(--sui_button_content_icon-size);
      color: var(--sui_button_content_icon-color);
    }
  }
}
```

- 既定のアイコンサイズは `1lh` にします (テキストの行の高さに揃えます)。

### フォーカスリング

- フォーカスリングは outline で表現します。「静的」に `outline-style: solid;` を置き、幅・色・オフセットは「動的」で private 変数 (`--_sui_<component>-outline_width` など) 経由にします。既定は幅 `0px`・色 `transparent`・オフセット `0px` で、`:focus-visible` の「上書き」で有効化します。
- フォーカスリングのトークンはテーマの `--sui-focusring_width`, `--sui-focusring_color`, `--sui-focusring_offset` を公開変数 (`--sui_<component>_focusring_*`) に代入してから使います。

```css
/* 静的 */
:scope {
  outline-style: solid;
}

/* 動的 */
:scope {
  outline-width: var(--_sui_button-outline_width, 0px);
  outline-color: var(--_sui_button-outline_color, transparent);
  outline-offset: var(--_sui_button-outline_offset, 0px);
}

/* 上書き */
:scope {
  &:focus-visible {
    --_sui_button-outline_width: var(--sui_button-focusring_width);
    --_sui_button-outline_color: var(--sui_button-focusring_color);
    --_sui_button-outline_offset: var(--sui_button-focusring_offset);
  }
}
```

### 既定値

- 公開変数 (`--sui_<component>-*`) への代入と、派生変数の定義だけを書きます。
- ルールの順序: 全修飾クラス共通の既定値 (セレクター `:scope`) を最初に置き、次に修飾クラスを サイズ → 角丸 → バリアント → 色 の順に並べます。
- サイズは sm → md → lg、角丸は none → sm → md → lg → full、バリアントは solid → naked → liquid の順です。
- 色は grey → blue → purple → magenta → red → orange → yellow → green の順です。
- 色とバリアントの両方に依存するトークンは、色のルールの中に `&.<コンポーネント>-variant_*` をネストします。バリアントだけに依存する部品ではバリアントのルールを先に並べます (accordion の Heading/Trigger/Content は variant だけに依存するため、size の後に variant を並べます)。
- `muted` のようなブール修飾による例外は、色ルールの後ろに置きます (button の `&.sui_button-muted:not(.sui_button-color_grey)` の形)。
- 各ルール内の宣言の並びは自動整形されます (「ツールと自動整形」参照)。

禁止:

- 「既定値」で private 変数に代入する。private 変数をフォールバック付きで「参照」するのはかまいません。

### 上書き

- private 変数 (`--_sui_<component>-*`) への代入だけを書きます。
- ルールの順序: 状態のルールを先に、修飾クラスのルールを後に置きます。
- 状態のルール内の順序は `@media (any-hover: hover)` の `&:hover` → `&:active` → `&:focus-visible` です。該当する状態だけを書きます。
- 修飾クラスの中にさらに状態を書くときは、`&.sui_button-outlined { ... @media (any-hover: hover) { &:hover { ... } } }` のようにネストします。

禁止:

- 「上書き」で公開変数に代入する。
- `:hover` を `@media (any-hover: hover)` で囲まずに書く。

### インタラクションの記述

- hover は `@media (any-hover: hover)` の中に `&:hover` をネストします。タッチ環境で hover スタイルが固定されるのを防ぎます。
- `:active` と `:focus-visible` は直接書きます。
- 複合セレクターは `&` でネストします。例: 状態セクションの `&.sui_accordion-disabled { &.sui_accordion-outlined { ... } }`。
- Base UI 由来の開閉状態は data 属性セレクターか、render props で付けた状態クラスで書きます。例: `.sui_accordion_item-open .sui_accordion_indicator`。
- 同じ宣言を複数のセレクターで共有するときは、カンマ区切りのセレクターリストにしてよいです。セレクターは 1 行に 1 つずつ並べます。

```css
&:not(:has(.sui_accordion_trigger)),
&:has(.sui_accordion_trigger-unstyled) {
  padding: var(--sui_accordion_heading-padding);
  background-color: var(--sui_accordion_heading-background_color);
}
```

- `:is()` の引数が長いときは、引数ごとに改行し、開き括弧の次の行からインデントします。

```css
&.sui_accordion-variant_naked .sui_accordion_heading:is(
  :not(:has(.sui_accordion_trigger)),
  :has(.sui_accordion_trigger-unstyled)
) {
  background-color: var(--sui-disabled-naked-canvas);
}
```

- hover / active / focus-visible で要素を手前に出すときは、`z-index` を private 変数 (`--_sui_button-z_index`, 既定 `0` → `1`) で制御します。
- `!important` は書きません。優先度はレイヤー (`sui.important`) の順序で担保します。

禁止:

- 疑似クラスを `&` なしでネストする (`:hover { }` を直接置く)。
- `(any-hover: hover)` 以外のメディアクエリーを使う (幅ベースのブレークポイントは使わない)。

### 値と単位

- 長さには単位を明示します (`0px`)。`0` だけは書きません。
- 単位を持たないプロパティー (scale, opacity, z-index) と比率 (aspect-ratio の `1 / 1`) は単位なしで書きます。line-height は `1lh` のように単位付きで書きます。
- 角度には `deg` を付けます (`-90deg`, `180deg`)。
- パーセンテージは必要時に `%` を付けます (`75%`)。
- 色のリテラルは `transparent` と `currentColor` だけを使えます。他の色はテーマトークンを参照します。

禁止:

- 長さの `0` を単位なしで書く。
- 比率を `1/1` のようにスペースなしで書く。

### セレクター

- 原則として、ルールには 1 つのセレクターだけを書きます。同じ宣言を共有する複数のセレクターはカンマで並べてよいです (「インタラクションの記述」参照)。
- 複合は `&` ネストで書きます。
- セレクターが長い場合は、結合子 (`>`, 子孫結合子) の前で改行し、継続行を 2 スペースインデントします。例:

```text
.sui_accordion_item:first-child:not(.sui_accordion_item-open)
  .sui_accordion_trigger:not(.sui_accordion_trigger-unstyled) {
  border-top-left-radius: var(--sui_accordion_trigger-border_radius);
  border-top-right-radius: var(--sui_accordion_trigger-border_radius);
}
```

禁止:

- 結合子以外の位置でセレクターを改行する。
- おおよそ 100 文字を超えるセレクターを改行しない。

### 状態セクション (`@layer sui.important`)

- ファイル末尾に、状態ごとに 1 ブロックを置きます。見出しは小文字の状態名で `/* pending */`, `/* disabled */` の形にします。状態の並びは部品の状態定義順です。
- ブロックも `@layer sui.important` の中に `@scope (.sui_<component>) to ([data-scope])` で包みます。
- ブロックの中はパーツのサブ見出し (`/* Root */`, `/* Content */`) をパーツツリー順に並べ、上書きが必要なパーツだけ書きます。
- 宣言は private 変数への代入ではなく、プロパティーへの直接の代入で書きます。無効状態の色はテーマの `--sui-disabled-*` トークンを使います。
- 状態クラスは `:scope { &.sui_button-pending { ... } }` の形で書き、バリアントは `&.sui_button-variant_solid` でネストします。
- 宣言に `!important` は付けません。優先度はレイヤーの順序で担保します。

禁止:

- レイヤー名の誤字 (`sui.importnant`)。
- 状態セクションでパーツツリー順を崩す。
- `sui.important` ブロック内で `!important` 宣言を書く。

### 整形

- インデントは 2 スペースです。ネスト (`&`, `@media`) ごとに 2 スペース追加します。`{` はセレクターと同じ行に置き、`}` は単独の行に置きます。
- `@layer` と `@scope` のブロックはインデントを深くしません (「レイヤーと @scope」参照)。
- 宣言の値は、その宣言の `プロパティー名: ` の直後の列から始めます。複数の宣言を縦の列で揃えようとしないでください (プロパティー名ごとに値の開始位置は個別です)。例:

```text
/* 静的 */
:scope {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

- 長い `var()` と `calc()` は引数ごとに改行します。ネストする関数と引数は、上の行の関数の開始列から 2 スペース後ろにインデントします。閉じ括弧は対応する関数の開始列に揃えます。例:

```text
:scope {
  --sui_button-padding_block: calc(
                                (var(--sui_button-min_height) - 1lh) / 2
                                - var(--_sui_button-border_width, 0px)
                              );
}
```

- border などの複合値やフォールバック付きの `var()` を改行するときも、継続行を値の開始列に揃えます。短ければ 1 行で構いません。

```text
background-color: var(--_sui_accordion_trigger-background_color,
                    var(--sui_accordion_trigger-background_color-normal)
                  );
```

- 禁止: 列揃えをタブで行う。

### 検証

変更した CSS は次の順で検証します。検証せずに終わらせないでください。

1. 自動整形: `packages/react` ディレクトリーで `mise run format` を実行し、stylelint と sort スクリプトに直させる。
2. stylelint: `npx stylelint --config ./.config/.stylelintrc.json 'src/**/*.css'` でエラーが残っていないことを確認する。
3. 目録との整合: 「変数」の目録に載っている公開変数が「既定値」で必ず代入されていることを確認する。
4. git diff で、意図しない値の変化がないことを確認する (移動・並べ替え・コメントの追加以外)。
5. 変更したコンポーネントのテストが存在すれば実行して、回帰がないことを確認する。
6. ファイル末尾が 1 つの改行で終わることを確認する。
