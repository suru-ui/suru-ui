import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type FileUploadContextState, useFileUploadContext } from "./file-upload.context.js";
import { FileUploadItemContext } from "./file-upload.item.context.js";

/**
 * {@link FileUploadItem} が持つ状態です。
 */
export type FileUploadItemState = Override<
  FileUploadContextState,
  {
    /**
     * 表示対象のファイルです。
     */
    readonly file: File;
  }
>;

export namespace FileUploadItemProps {
  export type Render = RenderProps<FileUploadItemState>;

  export type SuruUI = {
    /**
     * 表示するファイルを指定します。
     */
    readonly file: File;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"li", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadItem} に渡す props です。
 */
export type FileUploadItemProps = FileUploadItemProps.Render &
  FileUploadItemProps.SuruUI &
  FileUploadItemProps.BaseUI &
  FileUploadItemProps.HTML;

export type IFileUploadItem = IComponent<FileUploadItemProps>;

/**
 * 選択済みファイル 1 件を表示する項目です。
 *
 * 子パーツへファイルとルートの状態を伝播します。
 */
export const FileUploadItem: IFileUploadItem = function SuiFileUploadItem(props) {
  const ctx = useFileUploadContext();
  const { file, ...otherLiProps } = props;
  const state = React.useMemo<FileUploadItemState>(
    () => ({
      file,
      name: ctx.name,
      size: ctx.size,
      color: ctx.color,
      files: ctx.files,
      accept: ctx.accept,
      radius: ctx.radius,
      variant: ctx.variant,
      disabled: ctx.disabled,
      multiple: ctx.multiple,
      required: ctx.required,
    }),
    [ctx, file],
  );
  const element = useRender({
    props: [
      otherLiProps,
      {
        className: cn<FileUploadItemState>(
          "sui_file_upload_item",
          (state) => `sui_file_upload_item-size_${state.size}`,
          (state) => `sui_file_upload_item-color_${state.color}`,
          (state) => `sui_file_upload_item-radius_${state.radius}`,
          (state) => `sui_file_upload_item-variant_${state.variant}`,
          (state) => state.disabled && "sui_file_upload_item-disabled",
          (state) => state.multiple && "sui_file_upload_item-multiple",
          (state) => state.required && "sui_file_upload_item-required",
        ),
      },
    ],
    state,
    defaultTagName: "li",
  });

  return <FileUploadItemContext value={state}>{element}</FileUploadItemContext>;
};

export { FileUploadItem as Item };

export namespace Item {
  export type State = FileUploadItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemProps.Render;

    export type SuruUI = FileUploadItemProps.SuruUI;

    export type BaseUI = FileUploadItemProps.BaseUI;

    export type HTML = FileUploadItemProps.HTML;
  }
}
