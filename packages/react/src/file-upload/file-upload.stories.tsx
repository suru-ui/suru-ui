import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import {
  Item as FileUploadPartsItem,
  Root as FileUploadPartsRoot,
  Trigger as FileUploadPartsTrigger,
  Dropzone as FileUploadPartsDropzone,
  ItemName as FileUploadPartsItemName,
  ItemGroup as FileUploadPartsItemGroup,
  FileUpload,
  HiddenInput as FileUploadPartsHiddenInput,
  ClearTrigger as FileUploadPartsClearTrigger,
  ItemSizeText as FileUploadPartsItemSizeText,
  useFileUploadAPI,
  ItemDeleteTrigger as FileUploadPartsItemDeleteTrigger,
  useFileUploadContext,
} from "./index.js";

const COLORS: readonly FileUpload.Color[] = theme.COLORS;
const SIZES: readonly FileUpload.Size[] = theme.SIZES;
const RADII: readonly FileUpload.Radius[] = ["none", ...theme.SIZES, "full"];
const VARIANTS: readonly FileUpload.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "FileUpload",
  component: FileUpload,
});

export default meta;

const ctrl = controls(FileUpload, {
  name: {
    control: "text",
  },
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  accept: {
    control: "text",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  disabled: {
    control: "boolean",
  },
  maxFiles: {
    control: "number",
  },
  multiple: {
    control: "boolean",
  },
  required: {
    control: "boolean",
  },
  maxFileSize: {
    control: "number",
  },
  minFileSize: {
    control: "number",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    name: undefined,
    size: "md",
    color: "grey",
    accept: undefined,
    radius: undefined,
    variant: "naked",
    disabled: false,
    maxFiles: undefined,
    multiple: false,
    required: false,
    maxFileSize: undefined,
    minFileSize: undefined,
  }),
});

export const Multiple = meta.story({
  name: "複数選択",
  ...ctrl({
    name: undefined,
    size: "md",
    color: "grey",
    accept: undefined,
    radius: undefined,
    variant: "naked",
    disabled: false,
    maxFiles: undefined,
    multiple: true,
    required: false,
    maxFileSize: undefined,
    minFileSize: undefined,
  }),
});

export const WithAccept = meta.story({
  name: "ファイルの種類の絞り込み",
  ...ctrl({
    name: undefined,
    size: "md",
    color: "grey",
    accept: "image/*",
    radius: undefined,
    variant: "naked",
    disabled: false,
    maxFiles: undefined,
    multiple: true,
    required: false,
    maxFileSize: undefined,
    minFileSize: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-2">
        <FileUpload {...props} />
        <p className="text-sm text-slate-500">
          画像のみ受け付けます。ドラッグアンドドロップでも一致しないファイルは拒否され、onFileReject
          へ報告されます。
        </p>
      </div>
    );
  },
});

export const WithAcceptArray = meta.story({
  name: "配列での絞り込み",
  render() {
    return (
      <div className="w-80">
        <FileUpload accept={["image/png", ".pdf"]} multiple>
          PNG 画像か PDF を選択
        </FileUpload>
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御された選択",
  render() {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="flex w-80 flex-col gap-2">
        <FileUpload value={files} multiple onValueChange={setFiles} />
        <p className="text-sm text-slate-500">{files.length} 件選択中です。</p>
        <button type="button" onClick={() => setFiles([])} className="text-sm underline">
          リセット
        </button>
      </div>
    );
  },
});

export const WithValidation = meta.story({
  name: "検証と拒否の報告",
  render() {
    const [accepted, setAccepted] = React.useState<readonly File[]>([]);
    const [rejected, setRejected] = React.useState<readonly string[]>([]);

    return (
      <div className="flex w-80 flex-col gap-2">
        <FileUpload
          maxFiles={3}
          multiple
          maxFileSize={1024 * 1024}
          minFileSize={1}
          onFileAccept={(details) => setAccepted(details.files)}
          onFileReject={(details) => {
            setAccepted(details.acceptedFiles);
            setRejected(
              details.rejectedFiles.map((entry) => `${entry.file.name}: ${entry.reason}`),
            );
          }}
        />
        <p className="text-sm text-slate-500">最大 3 件、各 1B から 1MB まで受け付けます。</p>
        {accepted.length > 0 && (
          <p className="text-sm">受け入れ: {accepted.map((file) => file.name).join(", ")}</p>
        )}
        {rejected.length > 0 && (
          <ul className="text-sm text-red-600">
            {rejected.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}
      </div>
    );
  },
});

export const SingleReplace = meta.story({
  name: "単一選択の置き換え",
  render() {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="flex w-80 flex-col gap-2">
        <FileUpload value={files} onValueChange={setFiles} />
        <p className="text-sm text-slate-500">
          新しい選択で既存の選択を置き換えます。現在: {files[0]?.name ?? "未選択"}
        </p>
      </div>
    );
  },
});

export const WithClearTrigger = meta.story({
  name: "すべて削除ボタン",
  render() {
    return (
      <div className="w-80">
        <FileUploadPartsRoot multiple className="flex flex-col gap-2">
          <FileUploadPartsHiddenInput />
          <FileUploadPartsDropzone>ここにドラッグアンドドロップ</FileUploadPartsDropzone>
          <FileUploadPartsClearTrigger>すべて削除</FileUploadPartsClearTrigger>
          <PartsItems />
        </FileUploadPartsRoot>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効状態",
  ...ctrl({
    name: undefined,
    size: "md",
    color: "grey",
    accept: undefined,
    radius: undefined,
    variant: "naked",
    disabled: true,
    maxFiles: undefined,
    multiple: true,
    required: false,
    maxFileSize: undefined,
    minFileSize: undefined,
  }),
});

export const InForm = meta.story({
  name: "フォームでの利用",
  render() {
    return (
      <form onSubmit={(event) => event.preventDefault()} className="flex w-80 flex-col gap-2">
        <FileUpload name="attachments" multiple required />
        <button type="submit" className="text-sm underline">
          送信
        </button>
      </form>
    );
  },
});

export const WithSlotProps = meta.story({
  name: "slotPropsでの調整",
  render() {
    return (
      <div className="w-80">
        <FileUpload
          multiple
          slotProps={{
            dropzone: { "aria-label": "ファイルを添付" },
            itemDeleteTrigger: { "aria-label": "削除" },
          }}
        />
      </div>
    );
  },
});

export const WithAPI = meta.story({
  name: "APIフックの利用",
  render() {
    const api = useFileUploadAPI({ multiple: true });

    return (
      <FileUploadPartsRoot {...api.getRootProps()} className="flex w-80 flex-col gap-2">
        <FileUploadPartsHiddenInput {...api.getHiddenInputProps()} />
        <FileUploadPartsDropzone {...api.getDropzoneProps()} />
        <ApiItems api={api} />
      </FileUploadPartsRoot>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    name: undefined,
    size: "md",
    color: "grey",
    accept: undefined,
    radius: undefined,
    disabled: false,
    maxFiles: undefined,
    multiple: true,
    required: false,
    maxFileSize: undefined,
    minFileSize: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <div className="w-80">
              <FileUpload {...props} variant={variant} />
            </div>
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    name: undefined,
    size: "md",
    accept: undefined,
    radius: undefined,
    variant: "naked",
    disabled: false,
    maxFiles: undefined,
    multiple: true,
    required: false,
    maxFileSize: undefined,
    minFileSize: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col items-center gap-2">
            <span>{color}</span>
            <div className="w-80">
              <FileUpload {...props} color={color} />
            </div>
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    name: undefined,
    color: "grey",
    accept: undefined,
    radius: undefined,
    variant: "naked",
    disabled: false,
    maxFiles: undefined,
    multiple: true,
    required: false,
    maxFileSize: undefined,
    minFileSize: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <span>{size}</span>
            <div className="w-80">
              <FileUpload {...props} size={size} />
            </div>
          </div>
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    name: undefined,
    size: "md",
    color: "grey",
    accept: undefined,
    variant: "naked",
    disabled: false,
    maxFiles: undefined,
    multiple: true,
    required: false,
    maxFileSize: undefined,
    minFileSize: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-2">
            <span>{radius}</span>
            <div className="w-80">
              <FileUpload {...props} radius={radius} />
            </div>
          </div>
        ))}
      </div>
    );
  },
});

export const WithTriggers = meta.story({
  name: "トリガーとの組み合わせ",
  ...ctrl({
    name: undefined,
    size: "md",
    color: "grey",
    accept: undefined,
    radius: undefined,
    variant: "naked",
    disabled: false,
    maxFiles: undefined,
    multiple: true,
    required: false,
    maxFileSize: undefined,
    minFileSize: undefined,
  }),
  render(props) {
    return (
      <FileUploadPartsRoot {...props} className="flex flex-col gap-2">
        <FileUploadPartsHiddenInput />
        <FileUploadPartsTrigger>ファイルを選択</FileUploadPartsTrigger>
        <FileUploadPartsDropzone>ここにドラッグアンドドロップ</FileUploadPartsDropzone>
        <PartsItems />
      </FileUploadPartsRoot>
    );
  },
});

function PartsItems(): React.ReactElement | null {
  const { files } = useFileUploadContext();

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <FileUploadPartsClearTrigger>すべて削除</FileUploadPartsClearTrigger>
      <FileUploadPartsItemGroup>
        {files.map((file) => (
          <FileUploadPartsItem key={getFileKey(file)} file={file}>
            <FileUploadPartsItemName />
            <FileUploadPartsItemSizeText />
            <FileUploadPartsItemDeleteTrigger aria-label={`${file.name} を削除`}>
              ×
            </FileUploadPartsItemDeleteTrigger>
          </FileUploadPartsItem>
        ))}
      </FileUploadPartsItemGroup>
    </div>
  );
}

function ApiItems(props: {
  readonly api: ReturnType<typeof useFileUploadAPI>;
}): React.ReactElement | null {
  const { api } = props;
  const { files } = useFileUploadContext();

  if (files.length === 0) {
    return null;
  }

  return (
    <FileUploadPartsItemGroup {...api.getItemGroupProps()}>
      {files.map((file) => (
        <FileUploadPartsItem key={getFileKey(file)} {...api.getItemProps(file)}>
          <FileUploadPartsItemName {...api.getItemNameProps()} />
          <FileUploadPartsItemSizeText {...api.getItemSizeTextProps()} />
          <FileUploadPartsItemDeleteTrigger
            {...api.getItemDeleteTriggerProps()}
            aria-label={`${file.name} を削除`}
          >
            ×
          </FileUploadPartsItemDeleteTrigger>
        </FileUploadPartsItem>
      ))}
    </FileUploadPartsItemGroup>
  );
}

function getFileKey(file: File): string {
  return `${file.name}:${file.lastModified}:${file.size}`;
}
