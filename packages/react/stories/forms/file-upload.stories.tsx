import { SIZES, COLORS } from "@suru-ui/theme";
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
  ItemDeleteTrigger as FileUploadPartsItemDeleteTrigger,
  useFileUploadContext,
} from "../../src/forms/file-upload/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

const meta = preview.meta({
  title: "Forms / FileUpload",
  component: FileUpload,
});

export default meta;

const ctrl = controls(FileUpload, {
  accept: {
    control: "text",
  },
  color: {
    options: COLORS,
    control: "select",
  },
  disabled: {
    control: "boolean",
  },
  maxFileSize: {
    control: "number",
  },
  maxFiles: {
    control: "number",
  },
  minFileSize: {
    control: "number",
  },
  multiple: {
    control: "boolean",
  },
  name: {
    control: "text",
  },
  radius: {
    options: RADII,
    control: "select",
  },
  required: {
    control: "boolean",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  variant: {
    options: VARIANTS,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    disabled: false,
    required: false,
    multiple: false,
    accept: undefined,
    minFileSize: undefined,
    maxFileSize: undefined,
    maxFiles: undefined,
    name: undefined,
  }),
});

export const Multiple = meta.story({
  name: "複数選択",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    disabled: false,
    required: false,
    multiple: true,
    accept: undefined,
    minFileSize: undefined,
    maxFileSize: undefined,
    maxFiles: undefined,
    name: undefined,
  }),
});

export const WithAccept = meta.story({
  name: "ファイルの種類の絞り込み",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    disabled: false,
    required: false,
    multiple: false,
    accept: "image/*",
    minFileSize: undefined,
    maxFileSize: undefined,
    maxFiles: undefined,
    name: undefined,
  }),
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    disabled: false,
    required: false,
    multiple: true,
    accept: undefined,
    minFileSize: undefined,
    maxFileSize: undefined,
    maxFiles: undefined,
    name: undefined,
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
    variant: "liquid",
    size: "md",
    radius: undefined,
    disabled: false,
    required: false,
    multiple: true,
    accept: undefined,
    minFileSize: undefined,
    maxFileSize: undefined,
    maxFiles: undefined,
    name: undefined,
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
    variant: "liquid",
    color: "grey",
    radius: undefined,
    disabled: false,
    required: false,
    multiple: true,
    accept: undefined,
    minFileSize: undefined,
    maxFileSize: undefined,
    maxFiles: undefined,
    name: undefined,
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

export const WithTriggers = meta.story({
  name: "トリガーとの組み合わせ",
  ...ctrl({
    variant: "naked",
    color: "grey",
    size: "md",
    radius: undefined,
    disabled: false,
    required: false,
    multiple: true,
    accept: undefined,
    minFileSize: undefined,
    maxFileSize: undefined,
    maxFiles: undefined,
    name: undefined,
  }),
  render(props) {
    return (
      <FileUploadPartsRoot {...props} className="flex flex-col gap-2">
        <FileUploadPartsHiddenInput />
        <FileUploadPartsTrigger>ファイルを選択</FileUploadPartsTrigger>
        <FileUploadPartsDropzone>ここにドラッグ&ドロップ</FileUploadPartsDropzone>
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

function getFileKey(file: File): string {
  return `${file.name}:${file.lastModified}:${file.size}`;
}
