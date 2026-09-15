import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useSelectContext } from "./select.context.js";

/**
 * {@link SelectPortal} が持つ状態です。
 */
export type SelectPortalState = BaseSelect.Portal.State;

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

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const SelectPortal: IComponent<SelectPortalProps> = function SuiSelectPortal(props) {
  const ctx = useSelectContext();
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <BaseSelect.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_select_portal",
        `sui_select_portal-size_${ctx.size}`,
        `sui_select_portal-radius_${ctx.radius}`,
      )}
      data-scope={dataScope}
    />
  );
};

export { SelectPortal as Portal };

/**
 * {@link SelectPortal} の状態やプロパティーをまとめた型名前空間です。
 */
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
