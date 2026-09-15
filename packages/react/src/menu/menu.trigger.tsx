import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Menu } from "@base-ui/react/menu";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type MenuHandle } from "./menu.handle.js";

/**
 * {@link MenuTrigger} が持つ状態です。
 */
export type MenuTriggerState = Menu.Trigger.State;

export namespace MenuTriggerProps {
  export type Render = RenderProps<MenuTriggerState>;

  export type SuruUI<TPayload = any> = {
    /**
     * トリガーとしてレンダリングする要素です。
     *
     * {@link Menu.Trigger} の `render` props と同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<Menu.Trigger.Props<TPayload>["render"]>;

    /**
     * メニュー ({@link Root}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
     */
    handle?: MenuHandle<TPayload> | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    Menu.Trigger.Props<TPayload>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // MenuTriggerProps:
      | "disabled"
      | "payload"
      | "delay"
      | "closeDelay"
      | "openOnHover",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    Menu.Trigger.Props<TPayload>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuTrigger} に渡す props です。
 *
 * @template TPayload 開いたときに渡される値の型です。
 */
export type MenuTriggerProps<TPayload = any> = MenuTriggerProps.Render &
  MenuTriggerProps.SuruUI<TPayload> &
  MenuTriggerProps.BaseUI<TPayload> &
  MenuTriggerProps.HTML<TPayload>;

interface IMenuTrigger extends IComponent<MenuTriggerProps> {
  /**
   * @template TPayload 開いたときに渡される値の型です。
   */
  <TPayload = any>(props: MenuTriggerProps<TPayload>): IComponent.Return;
}

/**
 * メニューを開くトリガーです。
 *
 * 子要素は追加のラッパーなしで `button` 要素に表示されます。
 */
export const MenuTrigger: IMenuTrigger = function SuiMenuTrigger(props: MenuTriggerProps) {
  const { handle, children, className, ...otherProps } = props;

  return (
    <Menu.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(
        className,
        "sui_menu_trigger",
        (state) => state.open && "sui_menu_trigger-open",
        (state) => state.disabled && "sui_menu_trigger-disabled",
      )}
    />
  );
};

export { MenuTrigger as Trigger };

export namespace Trigger {
  export type State = MenuTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = MenuTriggerProps.Render;

    export type SuruUI<TPayload = any> = MenuTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = MenuTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = MenuTriggerProps.HTML<TPayload>;
  }
}
