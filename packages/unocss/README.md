# @suru-ui/unocss

`@suru-ui/theme` のデザイントークンを UnoCSS のユーティリティーとして使うためのプリセットです。ルールの定義は `src/rules.ts`、接頭辞と値の対応表は `src/constants.ts` にあります。

## 使い方

```ts
import { presetSuruUI } from "@suru-ui/unocss";
import { defineConfig } from "unocss";

export default defineConfig({
  presets: [presetSuruUI()],
});
```

生成したユーティリティーは `--sui-space()` などの CSS 関数やカスタムプロパティーを参照するため、`@suru-ui/theme/suru.css` も併せて読み込んでください。

## 名前空間とレイヤー

| 項目               | 内容                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| 命名規則           | `{接頭辞}-sui-{値}`（既定）                                                                                         |
| 区切り文字         | 既定は `-sui-`。`namespace: false` の場合は `-`                                                                     |
| 出力レイヤー       | 既定は `sui.utilities`。`namespace: false` の場合は `utilities`                                                     |
| 名前空間を外す用途 | 他のプリセットのルールを上書きできます。`presetSuruUI({ namespace: false })` を他のプリセットより後に置いてください |

## 色

接頭辞と CSS プロパティー:

| 接頭辞       | CSS プロパティー        | 例                            |
| ------------ | ----------------------- | ----------------------------- |
| `bg`         | `background-color`      | `bg-sui-blue-60`              |
| `text`       | `color`                 | `text-sui-canvas_text-1`      |
| `border`     | `border-color`          | `border-sui-red-alpha-20`     |
| `outline`    | `outline-color`         | `outline-sui-focusring_color` |
| `fill`       | `fill`                  | `fill-sui-green-40`           |
| `stroke`     | `stroke`                | `stroke-sui-grey-50`          |
| `caret`      | `caret-color`           | `caret-sui-blue-60`           |
| `accent`     | `accent-color`          | `accent-sui-blue-60`          |
| `decoration` | `text-decoration-color` | `decoration-sui-red-60`       |

値のパターン:

| クラス名の型                                    | 適用される値                                                   |
| ----------------------------------------------- | -------------------------------------------------------------- |
| `bg-sui-{color}-{step}`                         | `var(--sui-{color}-{step})`                                    |
| `bg-sui-{color}-alpha-{step}`                   | `var(--sui-{color}-alpha-{step})`                              |
| `bg-sui-{color}-{template}-{part}-{prominence}` | `var(--sui-{color}-{template}-{part}-{prominence})`            |
| `bg-sui-disabled-{template}-{part}`             | `var(--sui-disabled-{template}-{part})`                        |
| `bg-sui-{基本トークン}`                         | `var(--sui-{基本トークン})`                                    |
| `bg-sui-{トークン}/{0〜100}`                    | `color-mix(in oklab, var(--sui-{トークン}) {n}%, transparent)` |

| 要素         | 値                                                                                                                                                                                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`      | `grey`, `blue`, `purple`, `magenta`, `red`, `orange`, `yellow`, `green`                                                                                                                                                                   |
| `step`       | `5`, `10`, `15`, `20`, `30`, `40`, `50`, `60`, `70`, `80`, `85`, `90`, `95`（`grey` のみ `0` と `100` も）                                                                                                                                |
| `template`   | `solid`, `naked`, `liquid`                                                                                                                                                                                                                |
| `part`       | `canvas`, `border`, `canvas_text`                                                                                                                                                                                                         |
| `prominence` | `normal`, `subtle`, `strong`                                                                                                                                                                                                              |
| 基本トークン | `canvas-1`, `canvas-2`, `canvas_text-1`〜`3`, `disabled-canvas-1`, `disabled-canvas-2`, `disabled-canvas_text-1`, `disabled-canvas_text-2`, `tooltip-canvas`, `tooltip-canvas_text`, `border-1`〜`3`, `backdrop-color`, `focusring_color` |

不透明度に `101` 以上を指定した場合や、存在しない色トークンを指定した場合、そのユーティリティーは生成されません。

## 余白

| 接頭辞                                              | CSS プロパティー                                                                                                                                             | 負の値           |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `p`, `px`, `py`, `ps`, `pe`, `pt`, `pr`, `pb`, `pl` | `padding`, `padding-inline`, `padding-block`, `padding-inline-start`, `padding-inline-end`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left` | 不可             |
| `m`, `mx`, `my`, `ms`, `me`, `mt`, `mr`, `mb`, `ml` | `margin`, `margin-inline`, `margin-block`, `margin-inline-start`, `margin-inline-end`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`          | 可（`-m-sui-2`） |

適用される値は `--sui-space({段階})` です。たとえば `p-sui-2` は `padding:--sui-space(2)`、`-m-sui-2` は `margin:--sui-space(-2)` を生成します。

## ギャップ

| 接頭辞  | CSS プロパティー |
| ------- | ---------------- |
| `gap`   | `gap`            |
| `gap-x` | `column-gap`     |
| `gap-y` | `row-gap`        |

適用される値は `--sui-gap({段階})` です。負の値は受け付けません。

## 大きさ

| 接頭辞  | CSS プロパティー    | `sm` / `md` / `lg`     | 数値                  |
| ------- | ------------------- | ---------------------- | --------------------- |
| `h`     | `height`            | `var(--sui-size-{値})` | `--sui-space({段階})` |
| `size`  | `width` と `height` | `var(--sui-size-{値})` | `--sui-space({段階})` |
| `min-h` | `min-height`        | `var(--sui-size-{値})` | `--sui-space({段階})` |
| `max-h` | `max-height`        | `var(--sui-size-{値})` | `--sui-space({段階})` |

名前付きの大きさは `sm`, `md`, `lg` のみです。

## コンテナー

| 接頭辞       | CSS プロパティー  | サイズ名                    | 数値                  |
| ------------ | ----------------- | --------------------------- | --------------------- |
| `w`          | `width`           | `var(--sui-container-{値})` | `--sui-space({段階})` |
| `basis`      | `flex-basis`      | `var(--sui-container-{値})` | `--sui-space({段階})` |
| `min-w`      | `min-width`       | `var(--sui-container-{値})` | `--sui-space({段階})` |
| `max-w`      | `max-width`       | `var(--sui-container-{値})` | `--sui-space({段階})` |
| `min-inline` | `min-inline-size` | `var(--sui-container-{値})` | `--sui-space({段階})` |
| `max-inline` | `max-inline-size` | `var(--sui-container-{値})` | `--sui-space({段階})` |

サイズ名は `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl` です。`sm` / `md` / `lg` は `w-*` ではコンテナーのサイズに、`h-*` では大きさのトークンになります。

## 位置

| 接頭辞    | CSS プロパティー     |
| --------- | -------------------- |
| `inset`   | `inset`              |
| `inset-x` | `inset-inline`       |
| `inset-y` | `inset-block`        |
| `top`     | `top`                |
| `right`   | `right`              |
| `bottom`  | `bottom`             |
| `left`    | `left`               |
| `start`   | `inset-inline-start` |
| `end`     | `inset-inline-end`   |

適用される値は `--sui-space(±{段階})` です。すべての接頭辞で負の値を受け付けます。

## 枠線・アウトライン

| 接頭辞     | CSS プロパティー            | 備考                                                                     |
| ---------- | --------------------------- | ------------------------------------------------------------------------ |
| `border`   | `border-width`              | 段階を省略すると `1` になり、`border-style: solid` も付与されます        |
| `border-x` | `border-inline-width`       | 同上                                                                     |
| `border-y` | `border-block-width`        | 同上                                                                     |
| `border-t` | `border-top-width`          | 同上                                                                     |
| `border-r` | `border-right-width`        | 同上                                                                     |
| `border-b` | `border-bottom-width`       | 同上                                                                     |
| `border-l` | `border-left-width`         | 同上                                                                     |
| `border-s` | `border-inline-start-width` | 同上                                                                     |
| `border-e` | `border-inline-end-width`   | 同上                                                                     |
| `outline`  | `outline-width`             | `--sui-border_width({段階})` のみを設定し、`border-style` は付与しません |

幅には `--sui-border_width({段階})` を使用します。段階を省略する場合は `border-sui` のように末尾の `-` を付けません。`border-sui-blue-60` のように色トークンを指定した場合は、幅ではなく色として解決されます。

## 角丸

| 接頭辞                                                    | CSS プロパティー                          |
| --------------------------------------------------------- | ----------------------------------------- |
| `rounded`                                                 | `border-radius`                           |
| `rounded-t` / `rounded-r` / `rounded-b` / `rounded-l`     | 各辺の 2 つの `border-*-radius`           |
| `rounded-s` / `rounded-e`                                 | 論理方向の各辺の 2 つの `border-*-radius` |
| `rounded-tl` / `rounded-tr` / `rounded-br` / `rounded-bl` | 各角の `border-*-radius`                  |
| `rounded-ss` / `rounded-se` / `rounded-ee` / `rounded-es` | 各論理角の `border-*-radius`              |

適用される値は `--sui-corner_radius({段階})` で、段階を省略すると `1` になります。`corner-shape: superellipse(var(--sui-superellipse))` も併せて付与されます。段階を省略する場合は `rounded-sui` のように末尾の `-` を付けません。

## ドロップシャドウ

| 接頭辞        | CSS プロパティー |
| ------------- | ---------------- |
| `drop-shadow` | `filter`         |

クラス名は `drop-shadow-sui-{大きさ}`（中立）または `drop-shadow-sui-{色}-{大きさ}`（色ごと）です。`filter: drop-shadow(var(--sui-...))` を生成します。たとえば `drop-shadow-sui-sm` は `filter:drop-shadow(var(--sui-drop_shadow-sm))`、`drop-shadow-sui-blue-md` は `filter:drop-shadow(var(--sui-blue-drop_shadow-md))` になります。

| 要素     | 値                                                                            |
| -------- | ----------------------------------------------------------------------------- |
| `色`     | `blue`, `purple`, `magenta`, `red`, `orange`, `yellow`, `green`（中立は省略） |
| `大きさ` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`                                           |

## フォント

| クラス名        | 適用される値                       |
| --------------- | ---------------------------------- |
| `font-sui-sans` | `font-family:var(--sui-font-sans)` |
| `font-sui-mono` | `font-family:var(--sui-font-mono)` |

## 文字スタイル

クラス名は `text-sui-{family}-{size}-{weight}` です。

| 要素     | 値                                                           |
| -------- | ------------------------------------------------------------ |
| `family` | `dns`, `oln`, `std`（`dns` は `weight` に `m` を持ちません） |
| `size`   | `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`                  |
| `weight` | `n`（標準）, `m`（中太）, `b`（太字）                        |

`font-size`, `font-weight`, `letter-spacing`, `line-height` を設定します。たとえば `text-sui-oln-md-m` は `var(--sui-text-oln-md-m-font_size)` などのトークンを参照します。
