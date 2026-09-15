import { Drawer } from "@base-ui/react/drawer";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type DrawerHandle } from "./drawer.handle.js";

/**
 * {@link DrawerTrigger} が持つ状態です。
 */
export type DrawerTriggerState = Drawer.Trigger.State;

export namespace DrawerTriggerProps {
  export type Render = RenderProps<DrawerTriggerState>;

  export type SuruUI<TPayload = any> = {
    /**
     * ボタンとしてレンダリングする要素です。
     */
    children: NonNullable<React.ComponentProps<typeof Drawer.Trigger>["render"]>;

    /**
     * トリガーとドロワーに関連付けるためのハンドルです。
     */
    handle: DrawerHandle<TPayload>;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof Drawer.Trigger<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // DrawerTriggerProps:
      | "payload"
      | "id",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Drawer.Trigger<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerTrigger} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DrawerTriggerProps<TPayload = any> = DrawerTriggerProps.Render &
  DrawerTriggerProps.SuruUI<TPayload> &
  DrawerTriggerProps.BaseUI<TPayload> &
  DrawerTriggerProps.HTML<TPayload>;

interface IDrawerTrigger extends IComponent<DrawerTriggerProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: DrawerTriggerProps<TPayload>): IComponent.Return;
}

/**
 * ドロワーを開くボタンコンポーネントです。
 */
export const DrawerTrigger: IDrawerTrigger = function SuiDrawerTrigger(props: DrawerTriggerProps) {
  const { handle, children, className, ...otherProps } = props;

  return (
    <Drawer.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(className, "sui_drawer_trigger")}
    />
  );
};

export { DrawerTrigger as Trigger };

export namespace Trigger {
  export type State = DrawerTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = DrawerTriggerProps.Render;

    export type SuruUI<TPayload = any> = DrawerTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = DrawerTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = DrawerTriggerProps.HTML<TPayload>;
  }
}
