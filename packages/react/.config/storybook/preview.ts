import addonDocs from "@storybook/addon-docs";
import addonThemes, { withThemeByDataAttribute } from "@storybook/addon-themes";
import addonVitest from "@storybook/addon-vitest";
import { type ArgTypes, definePreview } from "@storybook/react-vite";
import type * as React from "react";

import "@suru-ui/theme/suru.css";
import "./preview.css";
import "virtual:uno.css";

export const preview = definePreview({
  tags: ["autodocs"],
  addons: [addonDocs(), addonThemes(), addonVitest()],
  decorators: [
    withThemeByDataAttribute({
      themes: {
        ダーク: "dark",
        ライト: "light",
      },
      defaultTheme: "ライト",
    }),
  ],
  parameters: {
    layout: "centered",
  },
});

export default preview;

export function controls<TProps>(
  component: React.ComponentType<TProps>,
  argTypes: Partial<ArgTypes<Record<keyof TProps | (string & {}), unknown>>>,
): <TArgs extends Partial<TProps> & Record<string & {}, unknown>>(
  args: TArgs,
) => {
  args: TArgs;
  argTypes: ArgTypes<Record<keyof TArgs, unknown>>;
};
export function controls(_: any, argTypes: any): any {
  return (args: any) => ({
    args,
    argTypes: Object.fromEntries(
      Object.keys(args).map((key) => [key, argTypes[key] ?? { control: false }]),
    ),
  });
}
