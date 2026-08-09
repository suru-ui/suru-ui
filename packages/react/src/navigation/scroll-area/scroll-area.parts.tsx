import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./scroll-area.css";

// Root
// ----

export type ScrollAreaRootState = BaseScrollArea.Root.State;
export type ScrollAreaRootProps = React.ComponentProps<typeof BaseScrollArea.Root>;

export const ScrollAreaRoot: Component<ScrollAreaRootProps> = function SuiScrollAreaRoot(props) {
  const { className, ...otherProps } = props;
  return <BaseScrollArea.Root {...otherProps} className={cn(className, "sui_scroll_area")} />;
};

export namespace Root {
  export type State = ScrollAreaRootState;
  export type Props = ScrollAreaRootProps;
}

export const Root: Component<Root.Props> = ScrollAreaRoot;

// Viewport
// --------

export type ScrollAreaViewportState = BaseScrollArea.Viewport.State;
export type ScrollAreaViewportProps = React.ComponentProps<typeof BaseScrollArea.Viewport>;

export const ScrollAreaViewport: Component<ScrollAreaViewportProps> =
  function SuiScrollAreaViewport(props) {
    const { className, ...otherProps } = props;
    return (
      <BaseScrollArea.Viewport
        {...otherProps}
        className={cn(className, "sui_scroll_area_viewport")}
      />
    );
  };

export namespace Viewport {
  export type State = ScrollAreaViewportState;
  export type Props = ScrollAreaViewportProps;
}

export const Viewport: Component<Viewport.Props> = ScrollAreaViewport;

// Content
// -------

export type ScrollAreaContentState = BaseScrollArea.Content.State;
export type ScrollAreaContentProps = React.ComponentProps<typeof BaseScrollArea.Content>;

export const ScrollAreaContent: Component<ScrollAreaContentProps> = function SuiScrollAreaContent(
  props,
) {
  const { className, ...otherProps } = props;
  return (
    <BaseScrollArea.Content {...otherProps} className={cn(className, "sui_scroll_area_content")} />
  );
};

export namespace Content {
  export type State = ScrollAreaContentState;
  export type Props = ScrollAreaContentProps;
}

export const Content: Component<Content.Props> = ScrollAreaContent;

// Scrollbar
// ---------

export type ScrollAreaScrollbarState = BaseScrollArea.Scrollbar.State;
export type ScrollAreaScrollbarProps = React.ComponentProps<typeof BaseScrollArea.Scrollbar> &
  ScrollAreaDataAttributes;

export const ScrollAreaScrollbar: Component<ScrollAreaScrollbarProps> =
  function SuiScrollAreaScrollbar(props) {
    const { className, ...otherProps } = props;
    return (
      <BaseScrollArea.Scrollbar
        {...otherProps}
        className={cn(className, "sui_scroll_area_scrollbar")}
      />
    );
  };

export namespace Scrollbar {
  export type State = ScrollAreaScrollbarState;
  export type Props = ScrollAreaScrollbarProps;
}

export const Scrollbar: Component<Scrollbar.Props> = ScrollAreaScrollbar;

// Thumb
// -----

export type ScrollAreaThumbState = BaseScrollArea.Thumb.State;
export type ScrollAreaThumbProps = React.ComponentProps<typeof BaseScrollArea.Thumb> &
  ScrollAreaDataAttributes;

export const ScrollAreaThumb: Component<ScrollAreaThumbProps> = function SuiScrollAreaThumb(props) {
  const { className, ...otherProps } = props;
  return (
    <BaseScrollArea.Thumb {...otherProps} className={cn(className, "sui_scroll_area_thumb")} />
  );
};

export namespace Thumb {
  export type State = ScrollAreaThumbState;
  export type Props = ScrollAreaThumbProps;
}

export const Thumb: Component<Thumb.Props> = ScrollAreaThumb;

type ScrollAreaDataAttributes = {
  [attribute: `data-${string}`]: string | undefined;
};

// Corner
// ------

export type ScrollAreaCornerState = BaseScrollArea.Corner.State;
export type ScrollAreaCornerProps = React.ComponentProps<typeof BaseScrollArea.Corner>;

export const ScrollAreaCorner: Component<ScrollAreaCornerProps> = function SuiScrollAreaCorner(
  props,
) {
  const { className, ...otherProps } = props;
  return (
    <BaseScrollArea.Corner {...otherProps} className={cn(className, "sui_scroll_area_corner")} />
  );
};

export namespace Corner {
  export type State = ScrollAreaCornerState;
  export type Props = ScrollAreaCornerProps;
}

export const Corner: Component<Corner.Props> = ScrollAreaCorner;
