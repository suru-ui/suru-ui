import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { useFileUploadItemContext } from "./file-upload.item.context.js";

/**
 * {@link FileUploadItemName} が持つ状態です。
 */
export type FileUploadItemNameState = {};

export namespace FileUploadItemNameProps {
  export type Render = RenderProps<FileUploadItemNameState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadItemName} に渡す props です。
 */
export type FileUploadItemNameProps = FileUploadItemNameProps.Render &
  FileUploadItemNameProps.SuruUI &
  FileUploadItemNameProps.BaseUI &
  FileUploadItemNameProps.HTML;

/**
 * ファイル名を表示するコンポーネントです。
 */
export const FileUploadItemName: IComponent<FileUploadItemNameProps> =
  function SuiFileUploadItemName(props) {
    const { file } = useFileUploadItemContext();
    const { children = file.name, ...otherSpanProps } = props;

    return useRender({
      props: [
        otherSpanProps,
        {
          children,
          className: "sui_file_upload_item_name",
        },
      ],
      defaultTagName: "span",
    });
  };

export { FileUploadItemName as ItemName };

export namespace ItemName {
  export type State = FileUploadItemNameState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemNameProps.Render;

    export type SuruUI = FileUploadItemNameProps.SuruUI;

    export type BaseUI = FileUploadItemNameProps.BaseUI;

    export type HTML = FileUploadItemNameProps.HTML;
  }
}
