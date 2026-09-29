import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { useFileUploadContext } from "./file-upload.context.js";

/**
 * {@link FileUploadTrigger} が持つ状態です。
 */
export type FileUploadTriggerState = {};

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
  const ctx = useFileUploadContext(true);
  const { disabled: disabledProp, ...otherButtonProps } = props;
  const disabled = ctx?.disabled || disabledProp || false;

  return useRender({
    props: [
      otherButtonProps,
      {
        type: "button",
        onClick() {
          if (!disabled) {
            ctx?.open();
          }
        },
        disabled,
        className: "sui_file_upload_trigger",
      },
    ],
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
