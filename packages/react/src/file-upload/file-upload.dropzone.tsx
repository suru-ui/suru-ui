import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type FileUploadContextState, useFileUploadContext } from "./file-upload.context.js";

/**
 * {@link FileUploadDropzone} が持つ状態です。
 */
export type FileUploadDropzoneState = Override<
  FileUploadContextState,
  {
    /**
     * このドロップゾーンを無効にするかどうかです。
     */
    readonly disabled: boolean;

    /**
     * ファイルがドラッグされているかどうかです。
     */
    readonly dragging: boolean;
  }
>;

export namespace FileUploadDropzoneProps {
  export type Render = RenderProps<FileUploadDropzoneState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadDropzone} に渡す props です。
 *
 * クリックと Enter・Space キーでファイル選択ダイアログを開きます。
 * `disabled` を指定しない場合、{@link FileUploadRootProps.disabled|Root の disabled} に従います。
 */
export type FileUploadDropzoneProps = FileUploadDropzoneProps.Render &
  FileUploadDropzoneProps.SuruUI &
  FileUploadDropzoneProps.BaseUI &
  FileUploadDropzoneProps.HTML;

export type IFileUploadDropzone = IComponent<FileUploadDropzoneProps>;

/**
 * ドラッグ&ドロップを受け付ける領域です。
 */
export const FileUploadDropzone: IFileUploadDropzone = function SuiFileUploadDropzone(props) {
  const ctx = useFileUploadContext();
  const { disabled: disabledProp, ...otherButtonProps } = props;
  const disabled = ctx.disabled || disabledProp || false;
  const [dragging, setDragging] = React.useState(false);
  const state = React.useMemo<FileUploadDropzoneState>(
    () => ({
      name: ctx.name,
      size: ctx.size,
      color: ctx.color,
      files: ctx.files,
      accept: ctx.accept,
      radius: ctx.radius,
      variant: ctx.variant,
      disabled,
      dragging,
      multiple: ctx.multiple,
      required: ctx.required,
    }),
    [ctx, disabled, dragging],
  );

  return useRender({
    props: [
      otherButtonProps,
      {
        type: "button",
        onDrop(event: React.DragEvent<HTMLButtonElement>) {
          event.preventDefault();
          setDragging(false);
          if (!disabled) {
            const droppedFiles = Array.from(event.dataTransfer?.files ?? []);
            ctx.selectFiles(droppedFiles);
          }
        },
        onClick() {
          if (!disabled) {
            ctx.open();
          }
        },
        disabled,
        className: cn<FileUploadDropzoneState>(
          "sui_file_upload_dropzone",
          (state) => state.dragging && "sui_file_upload_dropzone-dragover",
        ),
        onDragOver(event: React.DragEvent<HTMLButtonElement>) {
          event.preventDefault();
        },
        onDragEnter(event: React.DragEvent<HTMLButtonElement>) {
          event.preventDefault();
          if (!disabled) {
            setDragging(true);
          }
        },
        onDragLeave() {
          setDragging(false);
        },
      },
    ],
    state,
    defaultTagName: "button",
  });
};

export { FileUploadDropzone as Dropzone };

export namespace Dropzone {
  export type State = FileUploadDropzoneState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadDropzoneProps.Render;

    export type SuruUI = FileUploadDropzoneProps.SuruUI;

    export type BaseUI = FileUploadDropzoneProps.BaseUI;

    export type HTML = FileUploadDropzoneProps.HTML;
  }
}
