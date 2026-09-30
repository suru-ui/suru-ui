import addonDocs from "@storybook/addon-docs";
import addonThemes, { withThemeByDataAttribute } from "@storybook/addon-themes";
import addonVitest from "@storybook/addon-vitest";
import { type ArgTypes, definePreview } from "@storybook/react-vite";
import type * as React from "react";

import "@suru-ui/theme/suru.css";
import "./preview.css";
import "virtual:uno.css";

export const preview = definePreview({
  decorators: [
    withThemeByDataAttribute({
      themes: {
        ライト: "light",
        ダーク: "dark",
      },
      defaultTheme: "ライト",
    }),
  ],
  addons: [
    addonDocs(),
    // @ts-ignore addonThemes は呼び出し可能ではないという方エラーが出るので回避する。
    addonThemes(),
    addonVitest(),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
});

export default preview;

export function controls<TProps>(
  component: React.ComponentType<TProps>,
  argTypes: Partial<ArgTypes<Record<keyof TProps | (string & {}), unknown>>>,
): <TArgs extends Partial<TProps> & Record<string & {}, unknown>>(
  args: TArgs,
) => {
  argTypes: ArgTypes<Record<keyof TArgs, unknown>>;
  args: TArgs;
};

export function controls(_: any, argTypes: any): any {
  return (args: any) => ({
    argTypes: Object.fromEntries(
      Object.keys(args).map((key) => [key, argTypes[key] || { control: false }]),
    ),
    args,
  });
}
