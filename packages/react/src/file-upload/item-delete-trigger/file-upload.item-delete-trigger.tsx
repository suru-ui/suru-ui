import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useFileUploadItemContext } from "../item/file-upload.item.context.js";
import type { FileUploadItemState } from "../item/file-upload.item.jsx";
import { useFileUploadContext } from "../root/file-upload.root.context.js";

/**
 * {@link FileUploadItemDeleteTrigger} が持つ状態です。
 */
export type FileUploadItemDeleteTriggerState = Override<
  FileUploadItemState,
  {
    /** このボタンを無効にするかどうかです。 */
    readonly disabled: boolean;
  }
>;

export namespace FileUploadItemDeleteTriggerProps {
  export type Render = RenderProps<FileUploadItemDeleteTriggerState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link FileUploadItemDeleteTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、{@link FileUploadRootProps.disabled|Root の disabled} に従います。
 */
export type FileUploadItemDeleteTriggerProps = FileUploadItemDeleteTriggerProps.Render &
  FileUploadItemDeleteTriggerProps.SuruUI &
  FileUploadItemDeleteTriggerProps.BaseUI &
  FileUploadItemDeleteTriggerProps.HTML;

export type IFileUploadItemDeleteTrigger = IComponent<FileUploadItemDeleteTriggerProps>;

/** 対象のファイルを選択済みリストから削除するボタンです。 */
export const FileUploadItemDeleteTrigger: IFileUploadItemDeleteTrigger = (props) => {
  const ctx = useFileUploadContext();
  const itemCtx = useFileUploadItemContext();
  const { file } = itemCtx;
  const { disabled: disabledProp, ...otherButtonProps } = props;
  const disabled = ctx.disabled || (disabledProp ?? false);
  const state = React.useMemo<FileUploadItemDeleteTriggerState>(
    () => ({
      file: itemCtx.file,
      name: itemCtx.name,
      size: itemCtx.size,
      color: itemCtx.color,
      files: itemCtx.files,
      accept: itemCtx.accept,
      radius: itemCtx.radius,
      variant: itemCtx.variant,
      disabled,
      multiple: itemCtx.multiple,
      required: itemCtx.required,
    }),
    [disabled, itemCtx],
  );

  return useRender({
    props: [
      otherButtonProps,
      {
        type: "button",
        onClick() {
          if (!disabled) {
            ctx.remove(file);
          }
        },
        disabled,
        className: cn<FileUploadItemDeleteTriggerState>(
          "sui_file_upload_item_delete_trigger",
          (currentState) => `sui_file_upload_item_delete_trigger-size_${currentState.size}`,
          (currentState) => `sui_file_upload_item_delete_trigger-color_${currentState.color}`,
          (currentState) => `sui_file_upload_item_delete_trigger-radius_${currentState.radius}`,
          (currentState) => `sui_file_upload_item_delete_trigger-variant_${currentState.variant}`,
          (currentState) => currentState.disabled && "sui_file_upload_item_delete_trigger-disabled",
          (currentState) => currentState.multiple && "sui_file_upload_item_delete_trigger-multiple",
          (currentState) => currentState.required && "sui_file_upload_item_delete_trigger-required",
        ),
      },
    ],
    state,
    defaultTagName: "button",
  });
};

export { FileUploadItemDeleteTrigger as ItemDeleteTrigger };
export namespace ItemDeleteTrigger {
  export type State = FileUploadItemDeleteTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemDeleteTriggerProps.Render;

    export type SuruUI = FileUploadItemDeleteTriggerProps.SuruUI;

    export type BaseUI = FileUploadItemDeleteTriggerProps.BaseUI;

    export type HTML = FileUploadItemDeleteTriggerProps.HTML;
  }
}
