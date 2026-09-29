import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { useFileUploadContext } from "./file-upload.context.js";

/**
 * {@link FileUploadHiddenInput} が持つ状態です。
 */
export type FileUploadHiddenInputState = {};

export namespace FileUploadHiddenInputProps {
  export type Render = RenderProps<FileUploadHiddenInputState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"input", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadHiddenInput} に渡す props です。
 *
 * `type`、`accept`、`multiple`、`required`、`name`、`onChange` はルートの設定から自動的に与えられます。
 */
export type FileUploadHiddenInputProps = FileUploadHiddenInputProps.Render &
  FileUploadHiddenInputProps.SuruUI &
  FileUploadHiddenInputProps.BaseUI &
  FileUploadHiddenInputProps.HTML;

export type IFileUploadHiddenInput = IComponent<FileUploadHiddenInputProps>;

/**
 * ファイル選択ダイアログの実体になる隠し input 要素です。
 *
 * {@link FileUploadRoot} の子として配置し、スクリーンリーダーとフォーム送信のために DOM に残ります。
 */
export const FileUploadHiddenInput: IFileUploadHiddenInput = function SuiFileUploadHiddenInput(
  props,
) {
  const ctx = useFileUploadContext();

  return useRender({
    props: [
      props,
      {
        ref: ctx.setInputElement,
        name: ctx.name,
        type: "file",
        accept: ctx.accept,
        disabled: ctx.disabled,
        multiple: ctx.multiple,
        onChange(event: React.ChangeEvent<HTMLInputElement>) {
          const selectedFiles = Array.from(event.target.files ?? []);
          // 同じファイルを再度選んでも change イベントが発火するように、値を必ずリセットします。
          event.target.value = "";
          ctx.selectFiles(selectedFiles);
        },
        required: ctx.required,
        className: "sui_file_upload_hidden_input",
      },
    ],
    defaultTagName: "input",
  });
};

export { FileUploadHiddenInput as HiddenInput };

export namespace HiddenInput {
  export type State = FileUploadHiddenInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadHiddenInputProps.Render;

    export type SuruUI = FileUploadHiddenInputProps.SuruUI;

    export type BaseUI = FileUploadHiddenInputProps.BaseUI;

    export type HTML = FileUploadHiddenInputProps.HTML;
  }
}
