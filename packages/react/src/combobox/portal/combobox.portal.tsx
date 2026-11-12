import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useComboboxContext } from "../root/combobox.root.context.js";
import type { ComboboxPortalContext } from "./combobox.portal.context.js";

/**
 * {@link ComboboxPortal} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxPortalState<TItem = any> = Override<
  ComboboxPortalContext<TItem>,
  Combobox.Portal.State
>;

export namespace ComboboxPortalProps {
  export type Render<TItem = any> = RenderProps<ComboboxPortalState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Portal>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxPortalProps より :
      "keepMounted" | "container"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxPortal} に渡す props です。
 */
export type ComboboxPortalProps = ComboboxPortalProps.Render &
  ComboboxPortalProps.SuruUI &
  ComboboxPortalProps.BaseUI &
  ComboboxPortalProps.HTML;

export type IComboboxPortal = IComponent<ComboboxPortalProps>;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const ComboboxPortal: IComboboxPortal = (props) => {
  const ctx = useComboboxContext();
  const {
    style,
    render,
    className,
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Combobox.Portal
      {...otherProps}
      {...proxyRenderProps<Combobox.Portal.State, ComboboxPortalState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render,
          className: cn<ComboboxPortalState>(
            className,
            "sui_combobox_portal",
            (state) => `sui_combobox_portal-size_${state.size}`,
            (state) => `sui_combobox_portal-radius_${state.radius}`,
            (state) => `sui_combobox_portal-color_${state.color}`,
            (state) => `sui_combobox_portal-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_portal-outlined",
            (state) => state.multiple && "sui_combobox_portal-multiple",
          ),
        },
      )}
      data-scope={dataScope}
    />
  );
};

export { ComboboxPortal as Portal };
export namespace Portal {
  export type State<TItem = any> = ComboboxPortalState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxPortalProps.Render<TItem>;

    export type SuruUI = ComboboxPortalProps.SuruUI;

    export type BaseUI = ComboboxPortalProps.BaseUI;

    export type HTML = ComboboxPortalProps.HTML;
  }
}
