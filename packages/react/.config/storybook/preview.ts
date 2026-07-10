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
        ダーク: "dark",
        ライト: "light",
      },
      defaultTheme: "ダーク",
    }),
  ],
  addons: [addonDocs(), addonThemes(), addonVitest()],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
});

export default preview;

export function controls<TProps, TArg extends keyof TProps>(
  component: React.ComponentType<TProps>,
  argTypes: ArgTypes<Record<TArg, unknown>>,
): <TArgs extends Partial<Pick<TProps, TArg>>>(
  args: TArgs,
) => {
  argTypes: ArgTypes<Record<keyof TArgs, unknown>>;
  args: TArgs;
};

export function controls<TArg extends keyof any>(
  argTypes: ArgTypes<Record<TArg, unknown>>,
): <TArgs extends Partial<Record<TArg, unknown>>>(
  args: TArgs,
) => {
  argTypes: ArgTypes<Record<keyof TArgs, unknown>>;
  args: TArgs;
};

export function controls(arg0: any, argTypes: ArgTypes = arg0): any {
  return (args: any) => ({
    argTypes: Object.fromEntries(
      Object.keys(args)
        .filter((key) => key in argTypes)
        .map((key) => [key, argTypes[key]]),
    ),
    args,
  });
}
