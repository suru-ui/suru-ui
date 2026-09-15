import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useComboboxContext } from "./combobox.context.js";

/**
 * {@link ComboboxPortal} が持つ状態です。
 */
export type ComboboxPortalState = Combobox.Portal.State;

export namespace ComboboxPortalProps {
  export type Render = RenderProps<ComboboxPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
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

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const ComboboxPortal: IComponent<ComboboxPortalProps> = function SuiComboboxPortal(props) {
  const { size, radius } = useComboboxContext();
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Combobox.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_combobox_portal",
        `sui_combobox_portal-size_${size}`,
        `sui_combobox_portal-radius_${radius}`,
      )}
      data-scope={dataScope}
    />
  );
};

export { ComboboxPortal as Portal };

/**
 * {@link ComboboxPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  export type State = ComboboxPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxPortalProps.Render;

    export type SuruUI = ComboboxPortalProps.SuruUI;

    export type BaseUI = ComboboxPortalProps.BaseUI;

    export type HTML = ComboboxPortalProps.HTML;
  }
}
