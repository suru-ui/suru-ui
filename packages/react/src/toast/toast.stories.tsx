import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { Toast } from "./index.js";

// oxlint-disable typescript/no-unsafe-type-assertion -- Storybook の args は緩い型で渡されるため。

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
  size: Toast.Size;
  type: string | undefined;
  color: Toast.Color | undefined;
  limit: number;
  title: string;
  radius: Toast.Radius;
  timeout: number;
  variant: Toast.Variant;
  outlined: boolean;
  description: string;
};

function CreateToastButton(props: {
  type: string | undefined;
  title: string;
  description: string;
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
    outlined: true,
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
