import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Toast } from "../src/toast/index.js";

const COLORS: readonly Toast.Color[] = theme.COLORS;
const RADII: readonly Toast.Radius[] = ["none", ...theme.SIZES];
const SIZES: readonly Toast.Size[] = theme.SIZES;
const VARIANTS: readonly Toast.Variant[] = ["muted", "naked", "liquid"];

const meta = preview.meta({
  title: "Toast",
});

export default meta;

const ctrl = controls(Toast.Provider, {
  color: {
    control: "select",
    options: COLORS,
  },
  description: {
    control: "text",
  },
  limit: {
    control: "number",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  size: {
    control: "select",
    options: SIZES,
  },
  timeout: {
    control: "number",
  },
  title: {
    control: "text",
  },
  type: {
    control: "text",
  },
  variant: {
    control: "select",
    options: VARIANTS,
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
    title: "通知",
    description: "通知メセージです。",
    limit: 3,
    timeout: 5000,
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
    type: undefined,
    title: "通知",
    description: "通知メセージです。",
    limit: 3,
    timeout: 5000,
    variant: "muted",
    color: undefined,
    size: "md",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    const { type, limit, title, timeout, description, variant, color, size, radius, outlined } =
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
