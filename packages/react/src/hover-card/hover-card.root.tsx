import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import type { IComponent } from "../types.js";
import type { HoverCardContextSize, HoverCardContextRadius } from "./hover-card.context.js";
import { HoverCardContext } from "./hover-card.context.js";
import type { HoverCardHandle } from "./hover-card.handle.js";

/**
 * {@link HoverCardRoot} を命令的に操作するためのオブジェクトです。
 */
export type HoverCardRootActions = PreviewCard.Root.Actions;

/**
 * {@link HoverCardRoot} の開閉状態を変更するイベントの詳細です。
 */
export type HoverCardRootChangeEventDetails = PreviewCard.Root.ChangeEventDetails;

/**
 * {@link HoverCardRoot} の開閉状態を変更する理由です。
 */
export type HoverCardRootChangeEventReason = PreviewCard.Root.ChangeEventReason;

/**
 * ホバーカードの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type HoverCardRootRadius = HoverCardContextRadius;

/**
 * ホバーカードの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type HoverCardRootSize = HoverCardContextSize;

/**
 * ホバーカードのルートに表示する内容をレンダリングする関数のインターフェイスです。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export interface IHoverCardRootRenderer<TPayload = any> {
  /**
   * 内容をレンダリングします。
   *
   * @param args レンダリングに必要な値です。
   * @returns レンダリングする内容です。
   */
  (args: { payload: TPayload | undefined }): React.ReactNode;
}

/**
 * {@link HoverCardRoot} が持つ状態です。
 */
export type HoverCardRootState = PreviewCard.Root.State;

export namespace HoverCardRootProps {
  export type Render = {};

  export type SuruUI<TPayload = any> = {
    /**
     * ホバーカードの内容です。
     *
     * 関数を指定した場合は、アクティブなトリガーの payload を受け取って内容を組み立てます。
     */
    children?: React.ReactNode | IHoverCardRootRenderer<TPayload> | undefined;

    /**
     * ホバーカードとトリガー ({@link Trigger}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
     */
    handle?: HoverCardHandle<TPayload> | undefined;

    /**
     * ホバーカードに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * ホバーカードの角丸を指定します。
     *
     * 既定値は {@link HoverCardRootProps.size|size} です。
     */
    radius?: HoverCardRootRadius | undefined;

    /**
     * ホバーカードの大きさを指定します。
     *
     * @default "md"
     */
    size?: HoverCardRootSize | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof PreviewCard.Root<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardRootProps:
      | "defaultOpen"
      | "open"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "actionsRef"
      | "triggerId"
      | "defaultTriggerId",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof PreviewCard.Root<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardRoot} に渡す props です。
 *
 * @template TPayload トリガーから受け取るデータの型です。
 */
export type HoverCardRootProps<TPayload = any> = HoverCardRootProps.Render &
  HoverCardRootProps.SuruUI<TPayload> &
  HoverCardRootProps.BaseUI<TPayload> &
  HoverCardRootProps.HTML<TPayload>;

/**
 * {@link HoverCardRoot} のコンポーネント型です。
 */
interface IHoverCardRoot extends IComponent<HoverCardRootProps> {
  /**
   * @template TPayload トリガーから受け取るデータの型です。
   */
  <TPayload = any>(props: HoverCardRootProps<TPayload>): IComponent.Return;
}

/**
 * ホバーカードのルートです。
 *
 * ホバーカードの開閉状態を管理し、各パーツをグループ化します。それ自身は HTML 要素をレンダリングしません。
 */
export const HoverCardRoot: IHoverCardRoot = function SuiHoverCardRoot<TPayload>(
  props: HoverCardRootProps<TPayload>,
) {
  const { size = "md", radius = size, outlined = false, ...otherProps } = props;
  const ctx = React.useMemo<HoverCardContext>(
    () => ({ size, radius, outlined }),
    [size, radius, outlined],
  );

  return (
    <HoverCardContext value={ctx}>
      <PreviewCard.Root {...otherProps} />
    </HoverCardContext>
  );
};

export { HoverCardRoot as Root };

export namespace Root {
  export type State = HoverCardRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = HoverCardRootProps.Render;

    export type SuruUI<TPayload = any> = HoverCardRootProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = HoverCardRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = HoverCardRootProps.HTML<TPayload>;
  }

  export type Actions = HoverCardRootActions;

  export type ChangeEventDetails = HoverCardRootChangeEventDetails;

  export type ChangeEventReason = HoverCardRootChangeEventReason;

  export type IRenderer<TPayload = any> = IHoverCardRootRenderer<TPayload>;

  export type Radius = HoverCardRootRadius;

  export type Size = HoverCardRootSize;
}
