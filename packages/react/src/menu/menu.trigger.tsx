import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Menu } from "@base-ui/react/menu";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type MenuContext, useMenuContext } from "./menu.context.js";
import type { MenuHandle } from "./menu.handle.js";

/**
 * {@link MenuTrigger} が持つ状態です。
 */
export type MenuTriggerState = Override<MenuContext, Menu.Trigger.State>;

export namespace MenuTriggerProps {
  export type Render = Omit<RenderProps<MenuTriggerState>, "render">;

  export type SuruUI<TPayload = any> = {
    /**
     * トリガーとしてレンダリングする要素です。
     *
     * `render` props と同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<RenderProps<MenuTriggerState>["render"]>;

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

export interface IMenuTrigger extends IComponent<MenuTriggerProps> {
  /**
   * @template TPayload 開いたときに渡される値の型です。
   */
  <TPayload = any>(props: MenuTriggerProps<TPayload>): IComponent.Return;
}

/**
 * メニューを開くトリガーです。
 *
 * `children` には表示する内容ではなく、トリガーとしてレンダリングする要素を渡します。
 */
export const MenuTrigger: IMenuTrigger = function SuiMenuTrigger(props: MenuTriggerProps) {
  const ctx = useMenuContext(true);
  const { style, handle, children, className, ...otherProps } = props;

  return (
    <Menu.Trigger
      {...otherProps}
      handle={handle}
      {...proxyRenderProps<Menu.Trigger.State, MenuTriggerState>(
        (state) => ({
          size: "md",
          depth: 1,
          items: [],
          radius: "md",
          variant: "naked",
          outlined: false,
          ...ctx,
          ...state,
        }),
        {
          style,
          render: children,
          className: cn<MenuTriggerState>(
            className,
            "sui_menu_trigger",
            (state) => state.open && "sui_menu_trigger-open",
            (state) => state.disabled && "sui_menu_trigger-disabled",
            (state) => `sui_menu_trigger-size_${state.size}`,
            (state) => `sui_menu_trigger-radius_${state.radius}`,
            (state) => `sui_menu_trigger-variant_${state.variant}`,
            (state) => state.outlined && "sui_menu_trigger-outlined",
          ),
        },
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
