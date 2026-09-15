import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ToastRoot} に渡す通知オブジェクトの型です。
 *
 * @template TData 通知に含める追加データの型です。
 */
export type ToastRootToastObject<TData extends object = any> = Toast.Root.ToastObject<TData>;

/**
 * {@link ToastRoot} が持つ状態です。
 */
export type ToastRootState = Toast.Root.State;

export namespace ToastRootProps {
  export type Render = RenderProps<ToastRootState>;

  export type SuruUI<TData extends object = any> = {
    /**
     * 表示する通知オブジェクトです。
     */
    toast: ToastRootToastObject<TData>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Toast.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ToastRootProps:
      "swipeDirection",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Toast.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToastRoot} に渡す props です。
 *
 * @template TData 通知に含める追加データの型です。
 */
export type ToastRootProps<TData extends object = any> = ToastRootProps.Render &
  ToastRootProps.SuruUI<TData> &
  ToastRootProps.BaseUI &
  ToastRootProps.HTML;

/**
 * {@link ToastRoot} のコンポーネント型です。
 */
export interface IToastRoot extends IComponent<ToastRootProps> {
  /**
   * @template TData 通知に含める追加データの型です。
   */
  <TData extends object = any>(props: ToastRootProps<TData>): IComponent.Return;
}

/**
 * 個別の通知をグループ化するルート要素です。
 *
 * `toast` は {@link useToastClient} から取得した通知オブジェクトを渡します。
 */
export const ToastRoot: IToastRoot = function SuiToastRoot<TData extends object = any>(
  props: ToastRootProps<TData>,
) {
  const { className, ...otherProps } = props;

  return (
    <Toast.Root
      {...otherProps}
      className={cn(
        className,
        "sui_toast",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_toast-transition_status_${state.transitionStatus}`,
        (state) => state.limited && "sui_toast-limited",
        (state) => state.type !== undefined && `sui_toast-type_${CSS.escape(state.type)}`,
        (state) => state.swiping && "sui_toast-swiping",
        (state) =>
          state.swipeDirection !== undefined && `sui_toast-swipe_direction_${state.swipeDirection}`,
      )}
    />
  );
};

export { ToastRoot as Root };

export namespace Root {
  export type State = ToastRootState;

  export type Props<TData extends object = any> = Props.Render &
    Props.SuruUI<TData> &
    Props.BaseUI &
    Props.HTML;

  export namespace Props {
    export type Render = ToastRootProps.Render;

    export type SuruUI<TData extends object = any> = ToastRootProps.SuruUI<TData>;

    export type BaseUI = ToastRootProps.BaseUI;

    export type HTML = ToastRootProps.HTML;
  }

  export type ToastObject<TData extends object = any> = ToastRootToastObject<TData>;
}
