import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";
import type { TreeRootSize, TreeRootColor, TreeRootRadius, TreeRootVariant } from "./tree.root.jsx";

/**
 * 項目の選択を変更するアクションです。
 *
 * - `"only"`: 指定した項目だけを選択する
 * - `"toggle"`: 指定した項目の選択を切り替える
 * - `"range"`: 起点から指定した項目までの表示中の項目を選択する
 * - `"add-range"`: 起点から指定した項目までの表示中の項目を選択状態に追加する
 */
export type TreeSelectAction = "only" | "toggle" | "range" | "add-range";

/**
 * {@link TreeRoot} が子パーツへ提供するコンテキストです。
 */
export type TreeContext = {
  /**
   * キーボードフォーカスの対象になっているノードの識別子です。
   */
  readonly activeId: string | null;

  /**
   * 項目の配色です。
   */
  readonly color: TreeRootColor;

  /**
   * 展開されているノードの識別子の集合です。
   */
  readonly expanded: ReadonlySet<string>;

  /**
   * ツリーのルート要素へフォーカスを移動する関数です。
   */
  readonly focus: () => void;

  /**
   * ノードの識別子から項目要素の DOM ID を作る関数です。
   *
   * @param itemId ノードの識別子です。
   */
  readonly getItemId: (itemId: string) => string;

  /**
   * 項目の背景色を控えめにするかどうかです。
   */
  readonly muted: boolean;

  /**
   * 項目に枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 項目の角丸です。
   */
  readonly radius: TreeRootRadius;

  /**
   * ノードの識別子から選択状態を変更する関数です。
   *
   * @param itemId 選択状態を変更するノードの識別子です。
   * @param action 選択の変更方法です。
   * @param event 選択のきっかけになったイベントです。
   */
  readonly select: (itemId: string, action: TreeSelectAction, event: React.SyntheticEvent) => void;

  /**
   * 選択されているノードの識別子の集合です。
   */
  readonly selected: ReadonlySet<string>;

  /**
   * キーボードフォーカスの対象にするノードを変更する関数です。
   *
   * @param itemId フォーカス対象にするノードの識別子です。
   */
  readonly setActive: (itemId: string) => void;

  /**
   * 項目の大きさです。
   */
  readonly size: TreeRootSize;

  /**
   * ノードの展開状態を切り替える関数です。
   *
   * @param itemId 展開状態を切り替えるノードの識別子です。
   * @param event 展開のきっかけになったイベントです。
   */
  readonly toggleExpansion: (itemId: string, event: React.SyntheticEvent) => void;

  /**
   * 項目の主な外観です。
   */
  readonly variant: TreeRootVariant;
};

/**
 * {@link TreeContext} です。
 */
export const TreeContext: React.Context<TreeContext | null> =
  React.createContext<TreeContext | null>(null);

function useSuiTreeContext(optional?: false): TreeContext;
function useSuiTreeContext(optional?: boolean): TreeContext | null;
function useSuiTreeContext(optional?: boolean): TreeContext | null {
  const ctx = React.use(TreeContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TreeContext",
      providerName: "TreeRoot",
    });
  }

  return ctx;
}

/**
 * {@link TreeContext} を読み取るフックです。
 */
export const useTreeContext: IUseContext<TreeContext> = useSuiTreeContext;

export { TreeContext as Context, useTreeContext as useContext };

export namespace Context {
  export type SelectAction = TreeSelectAction;
}
