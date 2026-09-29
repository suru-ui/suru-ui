import * as theme from "@suru-ui/theme";
import { Trash2Icon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { AlertDialog } from "../src/alert-dialog/index.js";
import { Button } from "../src/button/index.js";

const SIZES: readonly AlertDialog.Size[] = theme.SIZES;
const RADII: readonly AlertDialog.Radius[] = ["none", ...theme.SIZES];
const VARIANTS: readonly AlertDialog.Variant[] = ["default", "stacked"];

const meta = preview.meta({
  title: "AlertDialog",
  component: AlertDialog,
});

export default meta;

const ctrl = controls(AlertDialog, {
  description: {
    control: "text",
  },
  icon: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  showCancelIconButton: {
    control: "boolean",
  },
  size: {
    control: "select",
    options: SIZES,
  },
  title: {
    control: "text",
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description:
      "このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。",
    // defaultOpen: true,
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon && <Trash2Icon />}
        cancel={
          <Button variant="liquid" outlined>
            キャンセル
          </Button>
        }
        confirm={<Button color="red">削除する</Button>}
        trigger={<Button color="red">プロジェクトを削除</Button>}
        onConfirm={(evt) => {
          evt.preventBaseUIHandler();
        }}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      />
    );
  },
});

export const Stacked = meta.story({
  name: "積み上げ式",
  ...ctrl({
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description:
      "このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。",
    // defaultOpen: true,
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon && <Trash2Icon />}
        cancel={
          <Button variant="liquid" outlined>
            キャンセル
          </Button>
        }
        confirm={<Button color="red">削除する</Button>}
        trigger={<Button color="red">プロジェクトを削除</Button>}
        variant="stacked"
        onConfirm={(evt) => {
          evt.preventBaseUIHandler();
        }}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      />
    );
  },
});

export const WithIcon = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    title: "プロジェクトを削除しますか？",
    description:
      "このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。",
    // defaultOpen: true,
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={<Trash2Icon />}
        cancel={
          <Button variant="liquid" outlined>
            キャンセル
          </Button>
        }
        confirm={<Button color="red">削除する</Button>}
        trigger={<Button color="red">プロジェクトを削除</Button>}
        onConfirm={(evt) => {
          evt.preventBaseUIHandler();
        }}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      />
    );
  },
});

export const StackedWithIcon = meta.story({
  name: "アイコン付きの積み上げ式",
  ...ctrl({
    radius: "md",
    outlined: true,
    showCancelIconButton: false,
    title: "プロジェクトを削除しますか？",
    description:
      "このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。",
    // defaultOpen: true,
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={<Trash2Icon />}
        cancel={
          <Button variant="liquid" outlined>
            キャンセル
          </Button>
        }
        confirm={<Button color="red">削除する</Button>}
        trigger={<Button color="red">プロジェクトを削除</Button>}
        variant="stacked"
        onConfirm={(evt) => {
          evt.preventBaseUIHandler();
        }}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      />
    );
  },
});

export const WithCancelIconButton = meta.story({
  name: "隅に閉じるアイコンを表示",
  ...ctrl({
    variant: "default",
    radius: "md",
    outlined: true,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description:
      "このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。",
    // defaultOpen: true,
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon && <Trash2Icon />}
        cancel={
          <Button variant="liquid" outlined>
            キャンセル
          </Button>
        }
        confirm={<Button color="red">削除する</Button>}
        trigger={<Button color="red">プロジェクトを削除</Button>}
        onConfirm={(evt) => {
          evt.preventBaseUIHandler();
        }}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
        showCancelIconButton
      />
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    variant: "default",
    radius: "md",
    showCancelIconButton: false,
    icon: false,
    title: "プロジェクトを削除しますか？",
    description:
      "このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。",
    // defaultOpen: true,
  }),
  render(props) {
    return (
      <AlertDialog
        {...props}
        icon={props.icon && <Trash2Icon />}
        cancel={
          <Button variant="liquid" outlined>
            キャンセル
          </Button>
        }
        confirm={<Button color="red">削除する</Button>}
        trigger={<Button color="red">プロジェクトを削除</Button>}
        outlined
        onConfirm={(evt) => {
          evt.preventBaseUIHandler();
        }}
        slotProps={{
          icon: {
            color: "red",
            muted: true,
          },
        }}
      />
    );
  },
});
