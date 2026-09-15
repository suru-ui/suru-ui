import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { formatFileSize } from "./_file-upload.jsx";
import { useFileUploadItemContext } from "./file-upload.item.context.js";

/**
 * {@link FileUploadItemSizeText} が持つ状態です。
 */
export type FileUploadItemSizeTextState = {};

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

/**
 * ファイルサイズを人間が読める形式で表示するコンポーネントです。
 */
export const FileUploadItemSizeText: IComponent<FileUploadItemSizeTextProps> =
  function SuiFileUploadItemSizeText(props) {
    const { file } = useFileUploadItemContext();

    return useRender({
      props: [
        props,
        {
          children: formatFileSize(file.size),
          className: "sui_file_upload_item_size_text",
        },
      ],
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
