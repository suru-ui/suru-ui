import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { IComponent } from "../../types.js";

/** ドロワーを命令的に操作するためのオブジェクトです。 */
export type DrawerRootActions = Drawer.Root.Actions;

/** ドロワーの開閉状態が変更されるイベントの詳細です。 */
export type DrawerRootChangeEventDetails = Drawer.Root.ChangeEventDetails;

/** ドロワーの開閉状態が変更される理由です。 */
export type DrawerRootChangeEventReason = Drawer.Root.ChangeEventReason;

/** ドロワーのスナップポイントです。 */
export type DrawerRootSnapPoint = Drawer.Root.SnapPoint;

/** ドロワーのスナップポイントが変更されるイベントの詳細です。 */
export type DrawerRootSnapPointChangeEventDetails = Drawer.Root.SnapPointChangeEventDetails;

/** ドロワーのスナップポイントが変更される理由です。 */
export type DrawerRootSnapPointChangeEventReason = Drawer.Root.SnapPointChangeEventReason;

/**
 * {@link DrawerRoot} が持つ状態です。
 */
export type DrawerRootState = Drawer.Root.State;

export namespace DrawerRootProps {
  export type Render = {};

  export type SuruUI = {};

  export type BaseUI<TPayload = any> = Omit<
    Pick<
      React.ComponentProps<typeof Drawer.Root<TPayload>>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // DrawerRootProps より :
      | "open"
      | "defaultOpen"
      | "modal"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "disablePointerDismissal"
      | "actionsRef"
      | "handle"
      | "triggerId"
      | "defaultTriggerId"
      | "children"
      | "swipeDirection"
      | "snapPoints"
      | "snapToSequentialPoints"
      | "snapPoint"
      | "defaultSnapPoint"
      | "onSnapPointChange"
    >,
    keyof Render
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Drawer.Root<TPayload>>,
    keyof Render | keyof BaseUI
  >;
}

/**
 * {@link DrawerRoot} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DrawerRootProps<TPayload = any> = DrawerRootProps.Render &
  DrawerRootProps.SuruUI &
  DrawerRootProps.BaseUI<TPayload> &
  DrawerRootProps.HTML<TPayload>;

export interface IDrawerRoot extends IComponent<DrawerRootProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: DrawerRootProps<TPayload>): IComponent.Return;
}

/**
 * ドロワーのルートコンポーネントです。
 *
 * ドロワーの開閉状態を管理し、各パーツをグループ化します。それ自身は HTML 要素をレンダリングしません。
 */
export const DrawerRoot: IDrawerRoot = (props: DrawerRootProps) => <Drawer.Root {...props} />;

export { DrawerRoot as Root };
export namespace Root {
  export type State = DrawerRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = DrawerRootProps.Render;

    export type SuruUI = DrawerRootProps.SuruUI;

    export type BaseUI<TPayload = any> = DrawerRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = DrawerRootProps.HTML<TPayload>;
  }

  export type Actions = DrawerRootActions;

  export type ChangeEventDetails = DrawerRootChangeEventDetails;

  export type ChangeEventReason = DrawerRootChangeEventReason;

  export type SnapPoint = DrawerRootSnapPoint;

  export type SnapPointChangeEventDetails = DrawerRootSnapPointChangeEventDetails;

  export type SnapPointChangeEventReason = DrawerRootSnapPointChangeEventReason;
}
