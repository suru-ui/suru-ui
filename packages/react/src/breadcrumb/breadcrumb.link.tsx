import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type BreadcrumbContext, useBreadcrumbContext } from "./breadcrumb.context.js";

/**
 * {@link BreadcrumbLink} が持つ状態です。
 */
export type BreadcrumbLinkState = Override<
  BreadcrumbContext,
  {
    /**
     * 現在のページかどうかです。
     */
    readonly current: boolean;

    /**
     * リンクが無効かどうかです。
     */
    readonly disabled: boolean;
  }
>;

export namespace BreadcrumbLinkProps {
  export type Render = RenderProps<BreadcrumbLinkState>;

  export type SuruUI = {
    /**
     * 現在のページかどうかを指定します。
     *
     * `true` の場合、リンクではなく現在位置を示す要素として描画します。
     *
     * @default false
     */
    current?: boolean | undefined;

    /**
     * リンクを無効にするかどうかを指定します。
     *
     * `true` の場合、リンク先へ遷移できなくなります。
     *
     * @default false
     */
    disabled?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"a", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link BreadcrumbLink} に渡す props です。
 */
export type BreadcrumbLinkProps = BreadcrumbLinkProps.Render &
  BreadcrumbLinkProps.SuruUI &
  BreadcrumbLinkProps.BaseUI &
  BreadcrumbLinkProps.HTML;

export type IBreadcrumbLink = IComponent<BreadcrumbLinkProps>;

/**
 * パンくずのリンクコンポーネントです。
 *
 * `current` が `true` の場合はリンクにせず、`aria-current="page"` を持つ要素として描画します。
 */
export const BreadcrumbLink: IBreadcrumbLink = function SuiBreadcrumbLink(props) {
  const ctx = useBreadcrumbContext();
  const { href, current = false, onClick, disabled = false, tabIndex, ...otherAnchorProps } = props;
  const handleOnClick: NonNullable<BreadcrumbLinkProps["onClick"]> = (event) => {
    onClick?.(event);
    if (disabled && !event.defaultPrevented) {
      event.preventDefault();
    }
  };

  return useRender({
    props: [
      otherAnchorProps,
      {
        href: current || disabled ? undefined : href,
        onClick: handleOnClick,
        tabIndex: disabled && !current ? -1 : tabIndex,
        className: cn<BreadcrumbLinkState>(
          "sui_breadcrumb_link",
          (state) => state.current && "sui_breadcrumb_link-current",
          (state) => state.disabled && "sui_breadcrumb_link-disabled",
          (state) => `sui_breadcrumb_link-size_${state.size}`,
          (state) => `sui_breadcrumb_link-color_${state.color}`,
        ),
        "aria-current": current ? "page" : undefined,
        "aria-disabled": disabled || undefined,
        "data-href": current || disabled ? href : undefined,
      },
    ],
    state: { ...ctx, current, disabled },
    defaultTagName: current ? "span" : "a",
  });
};

export { BreadcrumbLink as Link };

export namespace Link {
  export type State = BreadcrumbLinkState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = BreadcrumbLinkProps.Render;

    export type SuruUI = BreadcrumbLinkProps.SuruUI;

    export type BaseUI = BreadcrumbLinkProps.BaseUI;

    export type HTML = BreadcrumbLinkProps.HTML;
  }
}
