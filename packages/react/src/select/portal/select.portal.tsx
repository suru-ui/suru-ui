import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type SelectContext, useSelectContext } from "../root/select.root.context.js";
import { SelectPortalContext } from "./select.portal.context.js";

/**
 * {@link SelectPortal} が持つ状態です。
 */
export type SelectPortalState = Override<SelectContext, BaseSelect.Portal.State>;

export namespace SelectPortalProps {
  export type Render = RenderProps<SelectPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectPortalProps:
      "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectPortal} に渡す props です。
 */
export type SelectPortalProps = SelectPortalProps.Render &
  SelectPortalProps.SuruUI &
  SelectPortalProps.BaseUI &
  SelectPortalProps.HTML;

export type ISelectPortal = IComponent<SelectPortalProps>;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const SelectPortal: ISelectPortal = function SuiSelectPortal(props) {
  const ctx = useSelectContext();
  const {
    style,
    render,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <BaseSelect.Portal
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Portal.State, SelectPortalState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectPortalContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectPortalContext>
          ),
          className: cn<SelectPortalState>(
            className,
            "sui_select_portal",
            (state) => `sui_select_portal-size_${state.size}`,
            (state) => `sui_select_portal-radius_${state.radius}`,
            (state) => `sui_select_portal-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_portal-outlined",
          ),
        },
      )}
      data-scope={dataScope}
    />
  );
};

export { SelectPortal as Portal };

export namespace Portal {
  export type State = SelectPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectPortalProps.Render;

    export type SuruUI = SelectPortalProps.SuruUI;

    export type BaseUI = SelectPortalProps.BaseUI;

    export type HTML = SelectPortalProps.HTML;
  }
}
