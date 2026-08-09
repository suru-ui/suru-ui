import * as React from "react";

import type { Component } from "../../types.js";
import * as ScrollAreaParts from "./scroll-area.parts.jsx";

export type ScrollAreaSlotProps = {
  readonly viewport?: ScrollAreaParts.Viewport.Props | undefined;
  readonly content?: ScrollAreaParts.Content.Props | undefined;
  readonly scrollbar?: ScrollAreaParts.Scrollbar.Props | undefined;
  readonly horizontalScrollbar?: ScrollAreaParts.Scrollbar.Props | undefined;
  readonly thumb?: ScrollAreaParts.Thumb.Props | undefined;
  readonly horizontalThumb?: ScrollAreaParts.Thumb.Props | undefined;
  readonly corner?: ScrollAreaParts.Corner.Props | undefined;
};

export type ScrollAreaProps = ScrollAreaParts.Root.Props & {
  children?: React.ReactNode | undefined;
  slotProps?: ScrollAreaSlotProps | undefined;
  horizontal?: boolean | undefined;
};

export const ScrollArea: Component<ScrollAreaProps> = function SuiScrollArea(props) {
  const {
    children,
    horizontal = false,
    slotProps: {
      viewport: viewportProps,
      content: contentProps,
      scrollbar: scrollbarProps,
      horizontalScrollbar: horizontalScrollbarProps,
      thumb: thumbProps,
      horizontalThumb: horizontalThumbProps,
      corner: cornerProps,
    } = {},
    ...rootProps
  } = props;

  return (
    <ScrollAreaParts.Root {...rootProps}>
      <ScrollAreaParts.Viewport {...viewportProps}>
        <ScrollAreaParts.Content {...contentProps}>{children}</ScrollAreaParts.Content>
      </ScrollAreaParts.Viewport>
      <ScrollAreaParts.Scrollbar {...scrollbarProps}>
        <ScrollAreaParts.Thumb {...thumbProps} />
      </ScrollAreaParts.Scrollbar>
      {horizontal && (
        <ScrollAreaParts.Scrollbar {...horizontalScrollbarProps} orientation="horizontal">
          <ScrollAreaParts.Thumb {...horizontalThumbProps} />
        </ScrollAreaParts.Scrollbar>
      )}
      <ScrollAreaParts.Corner {...cornerProps} />
    </ScrollAreaParts.Root>
  );
};
