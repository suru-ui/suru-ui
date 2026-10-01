import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type FileUploadContextState, useFileUploadContext } from "./file-upload.context.js";

/**
 * {@link FileUploadTrigger} が持つ状態です。
 */
export type FileUploadTriggerState = Override<
  FileUploadContextState,
  {
    /**
     * このボタンを無効にするかどうかです。
     */
    readonly disabled: boolean;
  }
>;

export namespace FileUploadTriggerProps {
  export type Render = RenderProps<FileUploadTriggerState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、{@link FileUploadRootProps.disabled|Root の disabled} に従います。
 */
export type FileUploadTriggerProps = FileUploadTriggerProps.Render &
  FileUploadTriggerProps.SuruUI &
  FileUploadTriggerProps.BaseUI &
  FileUploadTriggerProps.HTML;

export type IFileUploadTrigger = IComponent<FileUploadTriggerProps>;

/**
 * ファイル選択ダイアログを開くボタンです。
 */
export const FileUploadTrigger: IFileUploadTrigger = function SuiFileUploadTrigger(props) {
  const ctx = useFileUploadContext();
  const { disabled: disabledProp, ...otherButtonProps } = props;
  const disabled = ctx.disabled || disabledProp || false;
  const state = React.useMemo<FileUploadTriggerState>(
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
            ctx.open();
          }
        },
        disabled,
        className: cn<FileUploadTriggerState>(
          "sui_file_upload_trigger",
          (state) => `sui_file_upload_trigger-size_${state.size}`,
          (state) => `sui_file_upload_trigger-color_${state.color}`,
          (state) => `sui_file_upload_trigger-radius_${state.radius}`,
          (state) => `sui_file_upload_trigger-variant_${state.variant}`,
          (state) => state.disabled && "sui_file_upload_trigger-disabled",
          (state) => state.multiple && "sui_file_upload_trigger-multiple",
          (state) => state.required && "sui_file_upload_trigger-required",
        ),
      },
    ],
    state,
    defaultTagName: "button",
  });
};

export { FileUploadTrigger as Trigger };

export namespace Trigger {
  export type State = FileUploadTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadTriggerProps.Render;

    export type SuruUI = FileUploadTriggerProps.SuruUI;

    export type BaseUI = FileUploadTriggerProps.BaseUI;

    export type HTML = FileUploadTriggerProps.HTML;
  }
}
