import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type FileUploadContextState, useFileUploadContext } from "./file-upload.context.js";

/**
 * {@link FileUploadClearTrigger} が持つ状態です。
 */
export type FileUploadClearTriggerState = Override<
  FileUploadContextState,
  {
    /**
     * このボタンを無効にするかどうかです。
     */
    readonly disabled: boolean;
  }
>;

export namespace FileUploadClearTriggerProps {
  export type Render = RenderProps<FileUploadClearTriggerState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadClearTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、ファイルが選択されていないときと {@link FileUploadRootProps.disabled|Root の disabled} のときに無効化されます。
 */
export type FileUploadClearTriggerProps = FileUploadClearTriggerProps.Render &
  FileUploadClearTriggerProps.SuruUI &
  FileUploadClearTriggerProps.BaseUI &
  FileUploadClearTriggerProps.HTML;

export type IFileUploadClearTrigger = IComponent<FileUploadClearTriggerProps>;

/**
 * 選択済みのファイルをすべて削除するボタンです。
 */
export const FileUploadClearTrigger: IFileUploadClearTrigger = function SuiFileUploadClearTrigger(
  props,
) {
  const ctx = useFileUploadContext();
  const { disabled: disabledProp, ...otherButtonProps } = props;
  const disabled = ctx.disabled || (disabledProp ?? false) || ctx.files.length === 0;
  const state = React.useMemo<FileUploadClearTriggerState>(
    () => ({
      name: ctx.name,
      size: ctx.size,
      color: ctx.color,
      files: ctx.files,
      accept: ctx.accept,
      radius: ctx.radius,
      variant: ctx.variant,
      disabled,
      multiple: ctx.multiple,
      required: ctx.required,
    }),
    [ctx, disabled],
  );

  return useRender({
    props: [
      otherButtonProps,
      {
        type: "button",
        onClick() {
          if (!disabled) {
            ctx.clear();
          }
        },
        disabled,
        className: cn<FileUploadClearTriggerState>(
          "sui_file_upload_clear_trigger",
          (state) => `sui_file_upload_clear_trigger-size_${state.size}`,
          (state) => `sui_file_upload_clear_trigger-color_${state.color}`,
          (state) => `sui_file_upload_clear_trigger-radius_${state.radius}`,
          (state) => `sui_file_upload_clear_trigger-variant_${state.variant}`,
          (state) => state.disabled && "sui_file_upload_clear_trigger-disabled",
          (state) => state.multiple && "sui_file_upload_clear_trigger-multiple",
          (state) => state.required && "sui_file_upload_clear_trigger-required",
        ),
      },
    ],
    state,
    defaultTagName: "button",
  });
};

export { FileUploadClearTrigger as ClearTrigger };

export namespace ClearTrigger {
  export type State = FileUploadClearTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadClearTriggerProps.Render;

    export type SuruUI = FileUploadClearTriggerProps.SuruUI;

    export type BaseUI = FileUploadClearTriggerProps.BaseUI;

    export type HTML = FileUploadClearTriggerProps.HTML;
  }
}
