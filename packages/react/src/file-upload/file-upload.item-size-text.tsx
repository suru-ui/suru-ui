import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { formatFileSize } from "./_file-upload.jsx";
import { useFileUploadItemContext } from "./file-upload.item.context.js";
import { type FileUploadItemState } from "./file-upload.item.jsx";

/**
 * {@link FileUploadItemSizeText} が持つ状態です。
 */
export type FileUploadItemSizeTextState = FileUploadItemState;

export namespace FileUploadItemSizeTextProps {
  export type Render = RenderProps<FileUploadItemSizeTextState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadItemSizeText} に渡す props です。
 */
export type FileUploadItemSizeTextProps = FileUploadItemSizeTextProps.Render &
  FileUploadItemSizeTextProps.SuruUI &
  FileUploadItemSizeTextProps.BaseUI &
  FileUploadItemSizeTextProps.HTML;

export type IFileUploadItemSizeText = IComponent<FileUploadItemSizeTextProps>;

/**
 * ファイルサイズを人間が読める形式で表示するコンポーネントです。
 */
export const FileUploadItemSizeText: IFileUploadItemSizeText = function SuiFileUploadItemSizeText(
  props,
) {
  const ctx = useFileUploadItemContext();
  const { children = formatFileSize(ctx.file.size), ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        children,
        className: "sui_file_upload_item_size_text",
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { FileUploadItemSizeText as ItemSizeText };

export namespace ItemSizeText {
  export type State = FileUploadItemSizeTextState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemSizeTextProps.Render;

    export type SuruUI = FileUploadItemSizeTextProps.SuruUI;

    export type BaseUI = FileUploadItemSizeTextProps.BaseUI;

    export type HTML = FileUploadItemSizeTextProps.HTML;
  }
}
