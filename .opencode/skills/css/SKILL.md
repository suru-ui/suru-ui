---
name: css
description: Suru UI のコンポーネントスタイル (`packages/react/src/**/*.css`) を書く際に使用します。レイヤー、セクション構成、コメントと空行、変数グループの語彙、クラス命名、カスタムプロパティー命名、変数の参照、既定値設定、上書き設定、インタラクション、値と単位、セレクター、整形のルールと禁則をまとめています。
---

## CSS のコーディングスタイル

対象は `packages/react/src/**/*.css` のコンポーネントスタイルです。基準となる実例は `packages/react/src/buttons/button/button.css` です。このスキルと実例が矛盾するときは、このスキルの記述を優先します。このスキルの目的は、誰が書いても同じ CSS になることです。

### ツール

- oxfmt は CSS を対象外にしています。`.oxfmtrc.json` の `ignorePatterns` に `**/*.css` が含まれます。
- CSS の整形と検証は stylelint が担当します。`mise run format` が `format:stylelint` (`stylelint --fix`) を実行します。
- stylelint の設定は `.stylelintrc.json` で、`stylelint-config-recess-order` を拡張しています。プロパティーは recess order のグループ順に並べます。
- stylelint は宣言の順序だけを直します。列の揃え、改行、インデントは直さないため、このスキルの「整形」に従って手動で書きます。

### レイヤー

- ファイルはパーツごとにセクションへ分け、各セクションを `@layer sui.component` ブロックで包みます。同じレイヤー名のブロックは複数置けます。
- レイヤーの優先順位は `packages/theme/src/layers.css` で宣言されています。`sui.important` は `sui.component` より後にあります。
- 状態クラス (例: `sui_button-pending`, `sui_button-disabled`) の強制上書きは、ファイル末尾の `@layer sui.important` ブロックに `!important` 付きでまとめます。
- 禁止: レイヤー名を誤記しない (`sui.importnant` は禁止。正しい名前は `sui.important`)。
- 禁止: `sui.important` ブロックをファイルの途中に置かない。常にすべての `sui.component` ブロックが閉じた後に置きます。

### セクション構成

パーツごとのセクションには見出しコメントを付けます。見出しは英語のパーツ名で `/* Root */` の形にします。セクションの並びはコンポーネントのパーツツリー順です。ボタンの例では Root → Content → Pending → CircularProgress → CircularProgressTrack → CircularProgressFill の順です。

セクション内では同じセレクターを複数のルールに分け、ルールの直前にルール名のコメントを付けます。ルールの順序とコメントは次の通りです。

1. `/* リセット */` — ブラウザー既定値のリセットです。コンポーネントの実装の HTML タグに合わせてリセットします。全パーツで `box-sizing: border-box` を宣言します。このセクションは省略できません。リセット対象は、ブラウザーがそのタグに適用する既定値の打ち消しだけです (例: `margin: 0px`, `padding: 0px`, `border: 0px`, `outline: none`, `background-color: transparent`, `border-radius: 0px`, フォントの`inherit`)。
2. `/* 変数 */` — 公開カスタムプロパティー `--sui_<component>-*` を空の値で列挙します。後に「既定値設定」で代入される変数の目録です。
3. `/* 静的 */` — カスタムプロパティーを参照しない固定スタイルです。
4. `/* 動的 */` — カスタムプロパティーを `var()` で参照するスタイルです。
5. `/* 既定値設定: ここから */` … `/* 既定値設定: ここまで */` — 修飾クラスごとに公開変数へ既定値を代入します。派生変数の定義もここに置きます。
6. `/* 上書き設定: ここから */` … `/* 上書き設定: ここまで */` — 状態 (`:hover`, `:active`, `:focus-visible`) と修飾クラスで private 変数へ代入します。

省略規則:

- 「変数」は公開変数が 1 つもないとき、「静的」は固定スタイルがないとき、「動的」は `var()` 参照がないとき、「既定値設定」「上書き設定」は内容がないときに省略します。
- 省略したルール番号を飛ばしても、残ったルールの順序は変わりません。例: リセット → 静的 → 動的。
- 「動的」が存在するのに「変数」が存在することはありません。「動的」は「変数」の宣言を参照するためです。
- 「リセット」だけのパーツ (例: CircularProgress) も許されます。

禁止:

- セクション見出しをパーツ名以外にする (`/* root */`, `/* Root part */` など)。
- セクション見出しを日本語にする。
- パーツツリー順を崩す。
- ブラウザー既定値の打ち消しを「リセット」以外のセクションに書く。特に「動的」にリセット宣言を混ぜてはいけません (例: `outline: none` や `border: 0px solid transparent` は native input の既定値の打ち消しなので必ず「リセット」へ)。
- 「既定値設定」「上書き設定」の見出しに語を足さない (`/* 変数の既定値設定 */` などは禁止。正式名称はこの一覧のまま)。
- セクション内の各ルールの直前にコメントを付けないこと。複数のルールが 1 つのセクションに続く場合 (例: 「静的」内の `.sui_a { }` と `.sui_b { }`)、そのセクションのコメントは先頭のルールの直前に 1 つだけ置きます。

### コメントと空行

空行の有無はコメントの種類で決まります。

- ルール同士は空行 1 行で区切ります。
- `/* リセット */`, `/* 変数 */`, `/* 静的 */`, `/* 動的 */` の直後には空行を置かず、すぐルールを書きます。
- `/* 既定値設定: ここから */`, `/* 上書き設定: ここから */` の直前と直後には空行を 1 行置きます。
- `/* 既定値設定: ここまで */`, `/* 上書き設定: ここまで */` の直前と直後には空行を 1 行置きます。
- 変数グループのコメント (`/* 形状 */` など) の直前と直後には空行を置きません。
- セクション見出し (`/* Root */`) の直後には空行を置かず、すぐ `@layer` ブロックを開きます。
- `@layer` ブロックの閉じ括弧と次のセクション見出しの間には空行を 1 行置きます。
- ファイルの末尾は 1 つの改行で終わります。

禁止:

- `/* リセット */` や `/* 変数 */` とその直後のルールの間に空行を入れる。
- 変数グループコメントとその直後の宣言の間に空行を入れる。
- ルール同士を空行なしで続ける。
- ファイルの末尾に空行を重ねる。

### 変数グループの語彙

変数宣言 (カスタムプロパティーへの代入) をまとめるコメントには、次の 9 語の語彙だけを使います。

- `/* 形状 */` — 寸法・サイズ・比率。例: `--sui_button-min_height`, `--sui_checkbox-size`, `--sui_button_content_svg-size`, `--sui_checkbox-stroke_width`。
- `/* 空白 */` — 余白。例: `--sui_button-padding_inline`, `--sui_button_content-gap`。
- `/* 書体 */` — フォント関連。例: `--sui_button-font_size`, `--sui_button-letter_spacing`。
- `/* 背景 */` — 背景色。例: `--sui_button-background_color-normal`, `--sui_checkbox-canvas-normal`。
- `/* 枠線 */` — ボーダーとアウトライン。例: `--sui_button-border_color-normal`, `--sui_button-border_radius`, `--sui_button-outline_color`。
- `/* 前景 */` — 文字・アイコンの色。例: `--sui_button_content-color-normal`, `--sui_checkbox-canvas_text-checked`。
- `/* 位置 */` — 配置・位置。例: `--_sui_button_pending-position`。
- `/* 外観 */` — 見た目の状態。例: `--_sui_button_pending-visibility`。
- `/* 変形 */` — 変形。例: `--_sui_button_content-scale`。

適用範囲:

- 語彙コメントは、カスタムプロパティーへの代入宣言 (「変数」「既定値設定」「上書き設定」内の宣言) の直前にのみ付けます。
- 「リセット」「静的」「動的」のルールに含まれる通常のプロパティー宣言には付けません。例: `gap: var(--sui_button_content-gap);` や `position: relative;` の前に語彙コメントを置いてはいけません。
- どの語彙にも当てはまらない変数が生まれたら、語彙を増やさずに既存の語へ分類します。寸法・サイズは「形状」、色は「背景」「枠線」「前景」のいずれか、それ以外は「位置」「外観」「変形」から合う語を選びます。

禁止:

- 語彙以外のコメントを変数宣言のグループ付けに使う (例: `/* stroke */`)。
- 通常のプロパティー宣言に語彙コメントを付ける。
- 1 つのルール内で同じグループを 2 回に分ける。同じグループの変数宣言は連続させます。

グループ順とグループ内の順序:

- グループの順序は 形状 → 空白 → 書体 → 背景 → 枠線 → 前景 → 位置 → 外観 → 変形 の固定順です。使わないグループは飛ばします。
- グループ内の宣言の順序は「変数」の目録で確定し、「既定値設定」「上書き設定」でも同じ順序を保ちます。
- 色の変数は状態順に normal → subtle → action と並べます。checked 系の変数はその後に置きます (checkbox は `checked` → `subtle-checked` → `action-checked`、radio は `checked-normal` → `checked-subtle` → `checked-action` の語形)。語形は部品内で統一します。
- 「枠線」グループの目録は `border_color-*` → `border_width` → `border_radius` → `outline_color` → `outline_offset` の順です。

目録の実例 (`button.css` から):

```text
/* 変数 */
.sui_button {
  /* 形状 */
  --sui_button-min_height: ;
  /* 空白 */
  --sui_button-padding_inline: ;
  /* 書体 */
  --sui_button-font_size: ;
  --sui_button-font_weight: ;
  --sui_button-line_height: ;
  --sui_button-letter_spacing: ;
  /* 背景 */
  --sui_button-background_color-normal: ;
  --sui_button-background_color-subtle: ;
  --sui_button-background_color-action: ;
  /* 枠線 */
  --sui_button-border_color-normal: ;
  --sui_button-border_color-subtle: ;
  --sui_button-border_color-action: ;
  --sui_button-border_width: ;
  --sui_button-border_radius: ;
  --sui_button-outline_color: ;
  --sui_button-outline_offset: ;
}
```

### クラス命名

- パーツクラスは `sui_<component>_<part>` です。例: `sui_button_content`。
- 修飾子は `sui_<component>-<prop>_<value>` です。単語は `_` で区切り、コンポーネント名とプロパティー名は `-` で区切ります。例: `sui_button-size_sm`, `sui_button-color_red`, `sui_button-variant_solid`。
- 状態クラスは `sui_<component>-<state>` です。例: `sui_button-pending`, `sui_button-disabled`。
- 状態内部の修飾クラスは `sui_<component>_<part>-<state>` です。例: `sui_button_pending-overlay`。
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
- フォールバックには、必ず実在する変数か、既定値として定義済みの値を書きます。`auto` のような既定値を書くときは、「既定値設定」で公開変数に代入してから `var()` で参照します (例: `--sui_accordion_panel-height: auto;` を定義し `var(--sui_accordion_panel-height)` を既定値に使う)。
- 公開変数を参照するだけの場合はフォールバックを付けません。例: `min-height: var(--sui_button-min_height);`。
- 状態の上書きは private 変数への代入で行い、「動的」ルールがその変数を参照します。
- 禁止: テーマトークンを `var()` なしで書く。
- 禁止: ユーティリティー関数トークンを `var()` で包む。
- 禁止: 「動的」セクションの宣言にリテラル値を書く。「動的」の値はすべて `var()` 参照です。
- 禁止: private 変数の参照にフォールバックを付け忘れる。

### 既定値設定

- 公開変数 (`--sui_<component>-*`) への代入だけを書きます。
- 派生変数をここで定義します。
- ルールの順序: 全修飾クラス共通の既定値 (セレクター `.sui_<component>`) を最初に置き、次に修飾クラスを サイズ → 角丸 → バリアント → 色 の順に並べます。
- サイズは小 → 大 (sm → md → lg)、角丸は none → rounded → full、バリアントは solid → naked → liquid の順です。
- 色は grey → blue → purple → magenta → red → orange → yellow → green の順です。
- 色とバリアントのトークンが色ごとに変わる部品 (button) では、色のルールの中に `&.sui_button-variant_*` をネストします。バリアントが色に依存しない部品 (checkbox, radio) ではバリアントのルールを先に並べます。
- 禁止: 「既定値設定」で private 変数に代入する。
- 禁止: グループ順とグループ内の宣言順を「変数」の目録と変える。

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
- 単位を持たないプロパティー (scale, opacity, line-height, stroke-width, z-index) と比率 (aspect-ratio の `1 / 1`) は単位なしで書きます。
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
- 禁止: セレクターの長さに余白があるのに改行する。おおよそ 100 文字を超えたら改行します。

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

- 長い `var()` と `calc()` は引数ごとに改行します。ネストする関数と引数は、上の行の関数の開始列から 2 スペース後ろにインデントします。閉じ括弧は対応する関数の開始列に揃え、トップレベルの `var()` の終わり (`);`) は値の列に揃えます。例:

```text
.sui_button {
  padding-inline: var(--_sui_button-padding_inline,
                    calc(
                      var(--sui_button-padding_inline) - var(--_sui_button-border_width, 0px)
                    )
                  );
}
```

- border や outline などの複合値は、構成要素ごとに改行して値の列に揃えます。例:

```text
.sui_button {
  outline: var(--_sui_button-outline_width, 0px)
           solid
           var(--sui_button-outline_color);
}
```

- 禁止: 列揃えをタブで行う。
- 禁止: ルール内のプロパティー名を再び並べ替える。順序は stylelint (recess-order) が決めます。

### 検証

- 変更した CSS は次の順で検証します。検証せずに終わらせないでください。
  - stylelint: `npx stylelint --config ./.config/.stylelintrc.json 'src/**/*.css'` を `packages/react` ディレクトリーから実行し、エラーがないことを確認します。修正が必要なときは `--fix` 付きで実行し、その後にこのスキルの指示 (列の揃え、改行、セクション構成) に従って手で直します。
  - 目録との整合: 「変数」の目録に載っている公開変数が「既定値設定」で必ず代入されていることを確認します。目録に載っていない公開変数の代入がないか、目録の変数だけに共通しているか、代入の順序 (目録の順) を確認します。
  - 変更に値の変更が含まれないこと: git diff で、移動・並べ替え・コメントの追加以外に値の変化がないことを確認します。
  - テスト: 変更したコンポーネントのテスト (`*.client.test.tsx`, `*.server.test.ts`) が存在すれば実行して、回帰がないことを確認します。
  - ファイル末尾は 1 つの改行で終わることを確認します。
