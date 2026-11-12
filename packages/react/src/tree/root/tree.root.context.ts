import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
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
 * {@link TreeRoot} が子パーツへ提供する状態です。
 */
export type TreeContextState = {
  /** キーボードフォーカスの対象になっているノードの識別子です。 */
  readonly activeId: string | null;

  /** 項目の配色です。 */
  readonly color: TreeRootColor;

  /** 展開されているノードの識別子の集合です。 */
  readonly expanded: ReadonlySet<string>;

  /** 項目の背景色を控えめにするかどうかです。 */
  readonly muted: boolean;

  /** 項目に枠線を表示するかどうかです。 */
  readonly outlined: boolean;

  /** 項目の角丸です。 */
  readonly radius: TreeRootRadius;

  /** 選択されているノードの識別子の集合です。 */
  readonly selected: ReadonlySet<string>;

  /** 項目の大きさです。 */
  readonly size: TreeRootSize;

  /** 項目の主な外観です。 */
  readonly variant: TreeRootVariant;
};

/**
 * {@link TreeRoot} が子パーツへ提供するコンテキストです。
 */
export type TreeContext = Readonly<
  Override<
    TreeContextState,
    {
      /** ツリーのルート要素へフォーカスを移動する関数です。 */
      readonly focus: () => void;

      /**
       * ノードの識別子から項目要素の DOM ID を作る関数です。
       *
       * @param itemId ノードの識別子です。
       */
      readonly getItemId: (itemId: string) => string;

      /**
       * ノードの識別子から選択状態を変更する関数です。
       *
       * @param itemId 選択状態を変更するノードの識別子です。
       * @param action 選択の変更方法です。
       * @param event 選択のきっかけになったイベントです。
       */
      readonly select: (
        itemId: string,
        action: TreeSelectAction,
        event: React.SyntheticEvent,
      ) => void;

      /**
       * キーボードフォーカスの対象にするノードを変更する関数です。
       *
       * @param itemId フォーカス対象にするノードの識別子です。
       */
      readonly setActive: (itemId: string) => void;

      /**
       * ノードの展開状態を切り替える関数です。
       *
       * @param itemId 展開状態を切り替えるノードの識別子です。
       * @param event 展開のきっかけになったイベントです。
       */
      readonly toggleExpansion: (itemId: string, event: React.SyntheticEvent) => void;
    }
  >
>;

/**
 * {@link TreeContext} です。
 */
export const TreeContext: React.Context<TreeContext | null> =
  React.createContext<TreeContext | null>(null);

export type IUseTreeContext = IUseContext<TreeContext>;

/**
 * {@link TreeContext} を読み取るフックです。
 */
export const useTreeContext: IUseTreeContext = (optional?: boolean): any => {
  const ctx = React.use(TreeContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "TreeContext",
      providerName: "TreeRoot",
    });
  }

  return ctx;
};

export { TreeContext as Context, useTreeContext as useContext };
export namespace Context {
  export type Color = TreeRootColor;

  export type Radius = TreeRootRadius;

  export type SelectAction = TreeSelectAction;

  export type Size = TreeRootSize;

  export type Variant = TreeRootVariant;
}
