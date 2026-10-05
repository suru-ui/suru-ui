import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { Toast } from "./index.js";

const COLORS: readonly Toast.Color[] = theme.COLORS;
const RADII: readonly Toast.Radius[] = ["none", ...theme.SIZES];
const SIZES: readonly Toast.Size[] = theme.SIZES;
const VARIANTS: readonly Toast.Variant[] = ["muted", "naked", "liquid"];

const meta = preview.meta({
  title: "Toast",
});

export default meta;

const ctrl = controls(Toast.Provider, {
  size: {
    control: "select",
    options: SIZES,
  },
  type: {
    control: "text",
  },
  color: {
    control: "select",
    options: COLORS,
  },
  limit: {
    control: "number",
  },
  title: {
    control: "text",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  timeout: {
    control: "number",
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  outlined: {
    control: "boolean",
  },
  description: {
    control: "text",
  },
});

type Props = {
  color: Toast.Color | undefined;
  description: string;
  limit: number;
  outlined: boolean;
  radius: Toast.Radius;
  size: Toast.Size;
  timeout: number;
  title: string;
  type: string | undefined;
  variant: Toast.Variant;
};

function CreateToastButton(props: {
  description: string;
  title: string;
  type: string | undefined;
}) {
  const t = Toast.useClient();
  const countRef = React.useRef(0);

  return (
    <Button
      type="button"
      onClick={() => {
        t.add({
          type: props.type,
          title: `${props.title} ${++countRef.current}`,
          description: props.description,
        });
      }}
    >
      通知を追加
    </Button>
  );
}

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    type: undefined,
    limit: 3,
    title: "通知",
    timeout: 5000,
    description: "通知メセージです。",
  }),
  render(props) {
    const { type, limit, title, timeout, description } = props as Props;

    return (
      <Toast.Provider limit={limit} timeout={timeout}>
        <CreateToastButton type={type} title={title} description={description} />
        <Toast.List />
      </Toast.Provider>
    );
  },
});

export const Styled = meta.story({
  name: "トーストの外観設定",
  ...ctrl({
    size: "md",
    type: undefined,
    color: undefined,
    limit: 3,
    title: "通知",
    radius: undefined,
    timeout: 5000,
    variant: "muted",
    outlined: false,
    description: "通知メセージです。",
  }),
  render(props) {
    const { size, type, color, limit, title, radius, timeout, variant, outlined, description } =
      props as Props;

    return (
      <Toast.Provider limit={limit} timeout={timeout}>
        <CreateToastButton type={type} title={title} description={description} />
        <Toast.List>
          {(t) => (
            <Toast
              key={t.id}
              size={size}
              color={color}
              toast={t}
              radius={radius}
              variant={variant}
              outlined={outlined}
            />
          )}
        </Toast.List>
      </Toast.Provider>
    );
  },
});
