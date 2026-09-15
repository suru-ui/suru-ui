import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
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
 * {@link HoverCardRoot} が持つ状態です。
 */
export type HoverCardRootState = PreviewCard.Root.State;

export namespace HoverCardRootProps {
  export type Render = RenderProps<HoverCardRootState>;

  export type SuruUI<TPayload = any> = {
    /**
     * ホバーカードとトリガー ({@link Trigger}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
     */
    handle?: HoverCardHandle<TPayload> | undefined;
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
      | "children"
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
export interface HoverCardRootComponent extends IComponent<HoverCardRootProps> {
  <TPayload = any>(props: HoverCardRootProps<TPayload>): React.ReactElement | null;
}

/**
 * ホバーカードのルートです。
 *
 * ホバーカードの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const HoverCardRoot: HoverCardRootComponent = function SuiHoverCardRoot<TPayload>(
  props: HoverCardRootProps<TPayload>,
) {
  return <PreviewCard.Root {...props} />;
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
}
