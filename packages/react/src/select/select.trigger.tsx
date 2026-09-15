import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import { useActionGroupContext } from "../action-group/action-group.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useSelectContext } from "./select.context.js";

/**
 * {@link SelectTrigger} が持つ状態です。
 */
export type SelectTriggerState = BaseSelect.Trigger.State;

export namespace SelectTriggerProps {
  export type Render = RenderProps<SelectTriggerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Trigger>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // SelectTriggerProps:
      | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Trigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectTrigger} に渡す props です。
 */
export type SelectTriggerProps = SelectTriggerProps.Render &
  SelectTriggerProps.SuruUI &
  SelectTriggerProps.BaseUI &
  SelectTriggerProps.HTML;

/**
 * Select ポップアップを開閉するボタン要素です。
 *
 * Root のスタイルプロパティーがこの要素へ適用されます。
 * キーボードでは `Enter` や `Space`、`ArrowDown` で開きます。
 */
export const SelectTrigger: IComponent<SelectTriggerProps> = function SuiSelectTrigger(props) {
  const actionGroup = useActionGroupContext(true);
  const ctx = useSelectContext(true);
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const size = actionGroup?.size ?? ctx?.size ?? "md";
  const radius = actionGroup?.radius ?? ctx?.radius ?? "md";
  const variant = actionGroup?.variant ?? ctx?.variant ?? "naked";
  const outlined = actionGroup?.outlined ?? ctx?.outlined ?? variant === "naked";

  return (
    <BaseSelect.Trigger
      {...otherProps}
      className={cn(
        className,
        "sui_select",
        "sui_action_group_item",
        `sui_select-size_${size}`,
        `sui_select-radius_${radius}`,
        `sui_select-variant_${variant}`,
        outlined && "sui_select-outlined",
        (state) => state.disabled && "sui_select-disabled",
        (state) => state.valid === false && "sui_select-invalid",
        (state) => state.open && "sui_select-open",
      )}
      data-scope={dataScope}
    />
  );
};

export { SelectTrigger as Trigger };

/**
 * {@link SelectTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  export type State = SelectTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectTriggerProps.Render;

    export type SuruUI = SelectTriggerProps.SuruUI;

    export type BaseUI = SelectTriggerProps.BaseUI;

    export type HTML = SelectTriggerProps.HTML;
  }
}
