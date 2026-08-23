---
name: css
description: Suru UI のコンポーネントスタイル (`packages/react/src/**/*.css`) を書くときに使用します。
---

## CSS のコーディングスタイル

対象は `packages/react/src/**/*.css` のコンポーネントスタイルです。基準となる実例は `packages/react/src/buttons/button/button.css` と `packages/react/src/forms/input/input.css` です。このスキルと実例が矛盾するときは、このスキルの記述を優先します。このスキルの目的は、誰が書いても同じ CSS になることです。

### ツールと自動整形

CSS の整形は `packages/react` ディレクトリーでの `mise run format` が担当します。何が自動で直るかを把握し、手作業と自動作業を混同しないことが重要です。

- oxfmt は CSS を対象外にしています。`.config/.oxfmtrc.json` の `ignorePatterns` に `**/*.css` が含まれます。
- `format:stylelint` (`npx stylelint --config ./.config/.stylelintrc.json --fix 'src/**/*.css'`) が、通常のプロパティー宣言の並び順 (recess order) を自動修正します。
- `format:sort-css-variables` (`node scripts/sort-css-variables.ts`) が、CSS 変数 (`--sui_*`, `--_sui_*`) の宣言を recess order のプロパティー順に自動並べ替えします。
  - 変数名の接尾部分を CSS プロパティー名と照合して並べます (例: `--sui_button-border_radius` → `border-radius`)。
  - 同じプロパティーに対応する変種 (`normal` / `hover` / `active` など) の相対的な順序は元のまま維持されます。
  - プロパティー判定できない変数はブロックの末尾に移動し、変数名順に並びます。
  - 対象は CSS 変数の宣言だけで構成されるルールです。通常のプロパティーが混ざるルールは変更されません。
- stylelint も sort スクリプトも宣言の順序しか直しません。列の揃え、改行、インデント、セクション構成、セレクターの順序はこのスキルに従って手動で書きます。

したがって、ルール内の宣言の並び順を手動で管理する必要はありません。変数を追加するときは、同一プロパティーの変種 (例: `-normal` / `-hover` / `-active`) を隣接させておけば、あとは自動整形が整列します。

禁止:

- 通常のプロパティーや CSS 変数の並び順を手動で整えること (自動整形に任せる)。

### レイヤー

- ファイルはパーツごとにセクションへ分け、各セクションを `@layer sui.component` ブロックで包みます。同じレイヤー名のブロックは複数置けます。
- レイヤーの優先順位は `packages/theme/src/layers.css` で宣言されています。`sui.important` は `sui.component` より後にあります。
- 状態クラス (例: `sui_button-pending`, `sui_button-disabled`) の強制上書きは、ファイル末尾の `@layer sui.important` ブロックに `!important` 付きでまとめます。
- 禁止: レイヤー名を誤記しない (`sui.importnant` は禁止。正しい名前は `sui.important`)。
- 禁止: `sui.important` ブロックをファイルの途中に置かない。常にすべての `sui.component` ブロックが閉じた後に置きます。

### セクション構成

パーツごとのセクションには見出しコメントを付けます。見出しは英語のパーツ名で `/* Root */` の形にします。セクションの並びはコンポーネントのパーツツリー順です。ボタンの例では Root → Content → Pending → CircularProgress → CircularProgressTrack → CircularProgressFill の順です。

セクション内では同じセレクターを複数のルールに分け、ルールの直前にルール名のコメントを付けます。ルールの順序とコメントは次の通りです。

1. `/* リセット */` — ブラウザー既定値の打ち消しが必要なときだけ置きます。現在のコンポーネントでは多くの場合不要で、要素の既定スタイルを持つ部品 (例: action-group の `box-sizing: border-box`) でのみ使われています。
2. `/* 変数 */` — 公開カスタムプロパティー `--sui_<component>-*` を空の値で列挙する目録です。後に「既定値設定」で代入される変数の目録です。
3. `/* 静的 */` — カスタムプロパティーを参照しない固定スタイルです。
4. `/* 動的 */` — カスタムプロパティーを `var()` で参照するスタイルです。
5. `/* 既定値設定: ここから */` … `/* 既定値設定: ここまで */` — 修飾クラスごとに公開変数へ既定値を代入します。派生変数の定義もここに置きます。
6. `/* 上書き設定: ここから */` … `/* 上書き設定: ここまで */` — 状態 (`:hover`, `:active`, `:focus-visible`) と修飾クラスで private 変数へ代入します。

省略規則:

- 「リセット」は打ち消すべき既定値がないときに省略します。「変数」は公開変数が 1 つもないとき、「静的」は固定スタイルがないとき、「動的」は `var()` 参照がないとき、「既定値設定」「上書き設定」は内容がないときに省略します。
- 省略したルール番号を飛ばしても、残ったルールの順序は変わりません。例: 変数 → 静的 → 動的。
- 「動的」が存在するのに「変数」が存在することはありません。「動的」は「変数」の宣言を参照するためです。
- 「リセット」だけのパーツも許されます。

禁止:

- セクション見出しをパーツ名以外にする (`/* root */`, `/* Root part */` など)。
- セクション見出しを日本語にする。
- パーツツリー順を崩す。
- ブラウザー既定値の打ち消しを「リセット」以外のセクションに書く。特に「動的」にリセット宣言を混ぜてはいけません (例: native input の `outline: none` や `border: 0px solid transparent` は必ず「リセット」へ)。
- 「既定値設定」「上書き設定」の見出しに語を足さない (`/* 変数の既定値設定 */` などは禁止。正式名称はこの一覧のまま)。
- 複数のルールが 1 つのセクションに続く場合 (例: 「静的」内の `.sui_a { }` と `.sui_b { }`)、そのセクションのコメントは先頭のルールの直前に 1 つだけ置きます。

### コメントと空行

空行の有無はコメントの種類で決まります。

- ルール同士は空行 1 行で区切ります。
- `/* リセット */`, `/* 変数 */`, `/* 静的 */`, `/* 動的 */` の直後には空行を置かず、すぐルールを書きます。
- `/* 既定値設定: ここから */`, `/* 上書き設定: ここから */` の直前と直後には空行を 1 行置きます。
- `/* 既定値設定: ここまで */`, `/* 上書き設定: ここまで */` の直前と直後には空行を 1 行置きます。
- セクション見出し (`/* Root */`) の直後には空行を置かず、すぐ `@layer` ブロックを開きます。
- `@layer` ブロックの閉じ括弧と次のセクション見出しの間には空行を 1 行置きます。
- ファイルの末尾は 1 つの改行で終わります。

禁止:

- `/* リセット */` や `/* 変数 */` とその直後のルールの間に空行を入れる。
- ルール同士を空行なしで続ける。
- ファイルの末尾に空行を重ねる。

### 色系変数の状態サフィックス

背景・枠線・前景などの色変数は、状態をサフィックスで区別します。サフィックスは部品が必要とするものだけを使い、部品内で語形を統一します。

- インタラクション: `normal` → `hover` → `active` → `focus_visible` の順に並べます (例: `--sui_button-background_color-normal` / `-hover` / `-active`)。
- フォーム検証: `invalid` (例: `--sui_input-border_color-invalid`)。
- 選択・無効などの部品固有状態: `checked`, `indeterminate`, `disabled` など。語形は部品内で統一します。

禁止: 同一部品内でサフィックスの語形を混在させる (`subtle` と `hover` を併用するなど)。

### クラス命名

- パーツクラスは `sui_<component>_<part>` です。例: `sui_button_content`。
- 修飾子は `sui_<component>-<prop>_<value>` です。単語は `_` で区切り、コンポーネント名とプロパティー名は `-` で区切ります。例: `sui_button-size_sm`, `sui_button-color_red`, `sui_button-variant_solid`。
- ブール値の修飾子は `sui_<component>-<prop>` です。例: `sui_button-muted`, `sui_button-outlined`。
- 状態クラスは `sui_<component>-<state>` です。例: `sui_button-pending`, `sui_button-disabled`。
- 状態内部の修飾クラスは `sui_<component>_<part>-<state>` です。例: `sui_button_pending-overlay`。
- Base UI 由来の状態は data 属性セレクターで受けて、Suru UI 固有の状態クラスへ反映します (実装側では `(state) => state.checked && "sui_checkbox-checked"` のように render props で付与)。
- 禁止: セパレーターを混同する (`sui_button-size-sm` のように `-` だけで区切る、`sui_button_size_sm` のように `_` だけにする)。

### カスタムプロパティー命名

- 公開変数は `--sui_<component>-<prop>` です。プロパティー名の単語区切りは `_` です。例: `--sui_button-background_color`。
- コンポーネント内部の上書き用変数は先頭に `_` を付けます。例: `--_sui_button-background_color`。
- 子パーツが読む変数はルートの `.sui_<component>` に宣言します。子パーツのセクションでも宣言セレクターはルートです。
- 派生変数 (例: `--sui_button-text_height`) は「変数」の目録には載せず、「既定値設定」で計算式とともに定義します。
- 禁止: 目録 (`/* 変数 */`) の宣言に値を書く。目録の宣言は常に空の値 (`--sui_button-min_height: ;`) です。
- 禁止: 目録に private 変数を載せる。
- 禁止: 「既定値設定」以外で派生変数を定義する。
- 禁止: 公開変数と private 変数の `_` の数を間違える (private は先頭に 1 個だけ)。
- 禁止: `--sui_*` や `--_sui_*` の接頭辞を持たない変数を参照する (`--accordion-panel-height` のような名前は作らない。接頭辞を付けた公開変数を「既定値設定」で定義してから参照する)。
- 禁止: 「変数」の目録に載っていない公開変数を「既定値設定」で代入する。目録に空宣言を入れてから使う。

### 変数の参照

- 値を参照するときは常に `var()` を使います。テーマトークンも同じです。例: `var(--sui-size-sm)`, `var(--sui-focusring_color)`。
- ユーティリティー関数トークンは `var()` を付けずに呼び出します。例: `--sui_button-padding_inline: --sui-space(4);`。関数の定義は `packages/theme/src/utilities.css` にあります。
- private 変数の参照にはフォールバックを付けます。フォールバックは公開変数か既定の計算式です。例: `var(--_sui_button-background_color, var(--sui_button-background_color-normal))`。
- フォールバックには、必ず実在する変数か、既定値として定義済みの値を書きます。`auto` のような既定値を書くときは、「既定値設定」で公開変数に代入してから `var()` で参照します。
- 公開変数を参照するだけの場合はフォールバックを付けません。例: `min-height: var(--sui_button-min_height);`。
- 状態の上書きは private 変数への代入で行い、「動的」ルールがその変数を参照します。
- 禁止: テーマトークンを `var()` なしで書く。
- 禁止: ユーティリティー関数トークンを `var()` で包む。
- 禁止: 「動的」セクションの宣言にリテラル値を書く。「動的」の値はすべて `var()` 参照です。
- 禁止: private 変数の参照にフォールバックを付け忘れる。

### 既定値設定

- 公開変数 (`--sui_<component>-*`) への代入と、派生変数の定義だけを書きます。
- ルールの順序: 全修飾クラス共通の既定値 (セレクター `.sui_<component>`) を最初に置き、次に修飾クラスを サイズ → 角丸 → バリアント → 色 の順に並べます。
- サイズは sm → md → lg、角丸は none → sm → md → lg → full、バリアントは solid → naked → liquid の順です。
- 色は grey → blue → purple → magenta → red → orange → yellow → green の順です。
- 色とバリアントの両方に依存するトークンは、色のルールの中に `&.<コンポーネント>-variant_*` をネストします。バリアントが色に依存しない部品ではバリアントのルールを先に並べます。
- `muted` のようなブール修飾による例外は、色ルールの後ろに置きます (button の `.sui_button-muted:not(.sui_button-color_grey)` の形)。
- 各ルール内の宣言の並びは自動整形されます (「ツールと自動整形」参照)。
- 禁止: 「既定値設定」で private 変数に代入する。

### 上書き設定

- private 変数 (`--_sui_<component>-*`) への代入だけを書きます。
- ルールの順序: 状態のルールを先に、修飾クラスのルールを後に置きます。
- 状態のルール内の順序は 基本の代入 → `@media (any-hover: hover)` の `&:hover` → `&:active` → `&:focus-visible` です。該当する状態だけを書きます。
- 禁止: 「上書き設定」で公開変数に代入する。
- 禁止: `:hover` を `@media (any-hover: hover)` で囲まずに書く。

### インタラクションの記述

- hover は `@media (any-hover: hover)` の中に `&:hover` をネストします。タッチ環境で hover スタイルが固定されるのを防ぎます。
- `:active` と `:focus-visible` は直接書きます。
- 複合セレクターは `&` でネストします。例: `.sui_button-radius_rounded { &.sui_button-size_sm { ... } }`。
- checked や indeterminate などの状態は data 属性セレクターで書きます。例: `.sui_checkbox:not([data-checked], [data-indeterminate])`, `.sui_checkbox:is([data-checked], [data-indeterminate])`。
- `!important` はファイル末尾の状態セクション (`@layer sui.important`) に限定します。
- 禁止: 疑似クラスを `&` なしでネストする (`:hover { }` を直接置く)。
- 禁止: `sui.component` レイヤーで `!important` を使う。
- 禁止: `(any-hover: hover)` 以外のメディアクエリーを使う (幅ベースのブレークポイントは使わない)。

### 値と単位

- 長さには単位を明示します (`0px`)。`0` だけは書きません。
- 単位を持たないプロパティー (scale, opacity, z-index) と比率 (aspect-ratio の `1 / 1`) は単位なしで書きます。line-height は `1lh` のように単位付きで書きます。
- 角度には `deg` を付けます (`-90deg`)。
- パーセンテージは必要時に `%` を付けます (`75%`)。
- 色のリテラルは `transparent` と `currentColor` だけを使えます。他の色はテーマトークンを参照します。
- 禁止: 長さの `0` を単位なしで書く。
- 禁止: 比率を `1/1` のようにスペースなしで書く。

### セレクター

- ルールには 1 つのセレクターだけを書きます。
- 複合は `&` ネストで書きます。
- セレクターが長い場合は、結合子 (`>`) の前で改行し、継続行を 2 スペースインデントします。例:

```text
.sui_button_group.sui_button_group-orientation_horizontal
  > .sui_button:not(:first-child):not(:last-child) {
  border-radius: 0px;
}
```

- 禁止: カンマで複数のセレクターを並べる (セレクターリスト)。
- 禁止: 結合子以外の位置でセレクターを改行する。
- 禁止: おおよそ 100 文字を超えるセレクターを改行しない。

### 状態セクション (`@layer sui.important`)

- ファイル末尾に、状態ごとに 1 ブロックを置きます。見出しは小文字の状態名で `/* pending */`, `/* disabled */` の形にします。状態の並びは部品の状態定義順です。
- ブロックの中はパーツのサブ見出し (`/* Root */`, `/* Content */`) をパーツツリー順に並べ、上書きが必要なパーツだけ書きます。
- 状態クラスは `.sui_button-pending` など単一のセレクターで書き、バリアントは `&.sui_button-variant_solid` でネストします。
- すべての宣言に `!important` を付けます。
- 禁止: レイヤー名の誤字 (`sui.importnant`)。
- 禁止: `!important` を付け忘れる。
- 禁止: 状態セクションでパーツツリー順を崩す。

### 整形

- インデントは 2 スペースです。ネスト (`&`, `@media`) ごとに 2 スペース追加します。`{` はセレクターと同じ行に置き、`}` は単独の行に置きます。
- 宣言の値は、その宣言の `プロパティー名: ` の直後の列から始めます。複数の宣言を縦の列で揃えようとしないでください (プロパティー名ごとに値の開始位置は個別です)。例:

```text
/* 静的 */
.sui_button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

- 長い `var()` と `calc()` は引数ごとに改行します。ネストする関数と引数は、上の行の関数の開始列から 2 スペース後ろにインデントします。閉じ括弧は対応する関数の開始列に揃えます。例:

```text
.sui_input {
  --sui_input-padding_block: round(
                               down,
                               calc(
                                 (var(--sui_input-min_height) - 1lh) / 2
                                 - var(--_sui_input-border_width, 0px)
                               ),
                               1px
                             );
}
```

- border などの複合値を改行するときも、継続行を値の開始列に揃えます。短ければ 1 行で構いません。

```text
.sui_button::after {
  border: var(--_sui_button-border_color, transparent)
          solid
          var(--_sui_button-border_width, 0px);
}
```

- 禁止: 列揃えをタブで行う。

### 検証

変更した CSS は次の順で検証します。検証せずに終わらせないでください。

1. 自動整形: `packages/react` ディレクトリーで `mise run format` を実行し、stylelint と sort スクリプトに直させる。
2. stylelint: `npx stylelint --config ./.config/.stylelintrc.json 'src/**/*.css'` でエラーが残っていないことを確認する。
3. 目録との整合: 「変数」の目録に載っている公開変数が「既定値設定」で必ず代入されていること、目録に載っていない公開変数の代入がないことを確認する。
4. git diff で、意図しない値の変化がないことを確認する (移動・並べ替え・コメントの追加以外)。
5. 変更したコンポーネントのテストが存在すれば実行して、回帰がないことを確認する。
6. ファイル末尾が 1 つの改行で終わることを確認する。
