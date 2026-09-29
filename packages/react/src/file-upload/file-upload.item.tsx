import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { FileUploadItemContext } from "./file-upload.item.context.js";

/**
 * {@link FileUploadItem} が持つ状態です。
 */
export type FileUploadItemState = {};

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
 * 子パーツへファイルを伝播します。
 */
export const FileUploadItem: IFileUploadItem = function SuiFileUploadItem(props) {
  const { file, ...otherLiProps } = props;
  const ctx = React.useMemo<FileUploadItemContext>(() => ({ file }), [file]);
  const element = useRender({
    props: [
      otherLiProps,
      {
        className: "sui_file_upload_item",
      },
    ],
    defaultTagName: "li",
  });

  return <FileUploadItemContext value={ctx}>{element}</FileUploadItemContext>;
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
